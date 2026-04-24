import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createHash } from 'node:crypto'

const root = resolve(import.meta.dirname, '..')
const outputPath = resolve(root, 'dist/api/donations.php')
const token = process.env.TG_API_BOT || process.env.TELEGRAM_BOT_TOKEN || ''
const chatId = process.env.TG_CHAT_ID || process.env.TELEGRAM_CHAT_ID || '-1003796814691'
const webhookSecret = process.env.TG_WEBHOOK_SECRET || (token ? createHash('sha256').update(`scc-donations:${token}`).digest('hex') : '')

function phpString(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

const php = `<?php
declare(strict_types=1);

$botToken = ${phpString(token)};
$chatId = ${phpString(chatId)};
$webhookSecret = ${phpString(webhookSecret)};
$dataDir = dirname(__DIR__) . '/data';
$cacheFile = $dataDir . '/donations.json';
$stateFile = $dataDir . '/donations-state.json';
$cacheTtl = 5;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

function read_json_file(string $path, array $fallback): array
{
    if (!is_file($path)) {
        return $fallback;
    }

    $decoded = json_decode((string) file_get_contents($path), true);
    return is_array($decoded) ? $decoded : $fallback;
}

function write_json_file(string $path, array $payload): void
{
    $dir = dirname($path);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    file_put_contents($path, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . PHP_EOL, LOCK_EX);
}

function empty_payload(string $source = 'empty'): array
{
    return [
        'schemaVersion' => 1,
        'generatedAt' => gmdate('c'),
        'source' => $source,
        'donations' => [],
        'summary' => [
            'totalAmount' => 0,
            'currency' => 'USD',
            'donationCount' => 0,
            'supporterCount' => 0,
            'lastDonationAt' => null,
        ],
    ];
}

function respond_with_cache(string $cacheFile, array $extra = []): void
{
    $payload = read_json_file($cacheFile, empty_payload('fallback'));
    echo json_encode(array_merge($payload, $extra), JSON_UNESCAPED_SLASHES);
    exit;
}

function http_json(string $url): ?array
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 4,
            CURLOPT_TIMEOUT => 8,
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($body === false) {
            return null;
        }

        $decoded = json_decode((string) $body, true);
        if (is_array($decoded)) {
            $decoded['_httpStatus'] = $status;
        }

        return is_array($decoded) ? $decoded : null;
    }

    $context = stream_context_create(['http' => ['timeout' => 8]]);
    $body = @file_get_contents($url, false, $context);
    $decoded = $body === false ? null : json_decode((string) $body, true);
    return is_array($decoded) ? $decoded : null;
}

function cambodia_year_second(?int $timestamp): array
{
    if (!$timestamp) {
        return ['year' => (int) gmdate('Y'), 'second' => 0];
    }

    $date = new DateTime('@' . $timestamp);
    $date->setTimezone(new DateTimeZone('Asia/Phnom_Penh'));

    return [
        'year' => (int) $date->format('Y'),
        'second' => (int) $date->format('s'),
    ];
}

function nearest_header(string $text, int $offset): ?array
{
    $before = substr($text, 0, $offset);
    preg_match_all('/\\[(\\d{1,2})\\s+([A-Za-z]{3})\\s+(\\d{4})\\s+at\\s+(\\d{1,2}):(\\d{2}):(\\d{2})/i', $before, $headers, PREG_SET_ORDER);

    if (!$headers) {
        return null;
    }

    $latest = $headers[count($headers) - 1];

    return [
        'year' => (int) $latest[3],
        'second' => (int) $latest[6],
    ];
}

function local_iso(int $year, int $month, int $day, int $hour12, int $minute, string $period, int $second): string
{
    $hour = $hour12 % 12;
    if (strtoupper($period) === 'PM') {
        $hour += 12;
    }

    return sprintf('%04d-%02d-%02dT%02d:%02d:%02d+07:00', $year, $month, $day, $hour, $minute, $second);
}

function parse_donations(string $text, ?int $messageDate): array
{
    $pattern = '/\\$([\\d,]+(?:\\.\\d{1,2})?)\\s+paid by\\s+(.+?)\\s+\\(\\*(\\d{3})\\)\\s+on\\s+([A-Za-z]{3})\\s+(\\d{1,2}),\\s+(\\d{1,2}):(\\d{2})\\s+(AM|PM)\\s+via\\s+(.+?)\\s+at\\s+(.+?)\\.\\s+Trx\\. ID:\\s*([A-Za-z0-9-]+),\\s*APV:\\s*([A-Za-z0-9-]+)/i';
    $months = ['jan' => 1, 'feb' => 2, 'mar' => 3, 'apr' => 4, 'may' => 5, 'jun' => 6, 'jul' => 7, 'aug' => 8, 'sep' => 9, 'oct' => 10, 'nov' => 11, 'dec' => 12];
    $fallbackDate = cambodia_year_second($messageDate);
    preg_match_all($pattern, $text, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE);
    $donations = [];

    foreach ($matches as $match) {
        $month = $months[strtolower($match[4][0])] ?? null;
        if (!$month) {
            continue;
        }

        $header = nearest_header($text, $match[0][1]);
        $year = $header['year'] ?? $fallbackDate['year'];
        $second = $header['second'] ?? $fallbackDate['second'];
        $rawMethod = trim($match[9][0]);
        $bank = '';

        if (preg_match('/\\(([^)]+)\\)/', $rawMethod, $bankMatch)) {
            $bank = trim($bankMatch[1]);
        }

        $method = trim(preg_replace('/\\s*\\([^)]+\\)/', '', $rawMethod));
        $trxId = trim($match[11][0]);
        $donorName = preg_replace('/\\s+/', ' ', trim($match[2][0]));
        $accountSuffix = trim($match[3][0]);

        $donations[] = [
            'id' => 'trx-' . $trxId,
            'trxId' => $trxId,
            'apv' => trim($match[12][0]),
            'donorName' => $donorName,
            'displayName' => $donorName,
            'accountSuffix' => $accountSuffix,
            'amount' => (float) str_replace(',', '', $match[1][0]),
            'currency' => 'USD',
            'method' => $method,
            'bank' => $bank,
            'recipient' => trim($match[10][0]),
            'paidAt' => local_iso($year, $month, (int) $match[5][0], (int) $match[6][0], (int) $match[7][0], $match[8][0], $second),
        ];
    }

    return $donations;
}

function apply_display_names(array $donations): array
{
    $counts = [];
    foreach ($donations as $donation) {
        $key = strtolower(trim((string) ($donation['donorName'] ?? '')));
        $counts[$key] = ($counts[$key] ?? 0) + 1;
    }

    foreach ($donations as &$donation) {
        $key = strtolower(trim((string) ($donation['donorName'] ?? '')));
        $suffix = (string) ($donation['accountSuffix'] ?? '');
        $donation['displayName'] = (($counts[$key] ?? 0) > 1 && $suffix !== '')
            ? $donation['donorName'] . ' *' . $suffix
            : $donation['donorName'];
    }

    return $donations;
}

function build_payload(array $donations, string $source): array
{
    $byId = [];
    foreach ($donations as $donation) {
        if (!isset($donation['id'])) {
            continue;
        }
        $byId[(string) $donation['id']] = $donation;
    }

    $donations = array_values($byId);
    usort($donations, fn ($a, $b) => strcmp((string) ($b['paidAt'] ?? ''), (string) ($a['paidAt'] ?? '')));
    $donations = apply_display_names($donations);

    $totalCents = 0;
    $supporters = [];
    foreach ($donations as $donation) {
        $totalCents += (int) round(((float) ($donation['amount'] ?? 0)) * 100);
        $supporters[strtolower((string) ($donation['displayName'] ?? '') . '-' . (string) ($donation['accountSuffix'] ?? ''))] = true;
    }

    return [
        'schemaVersion' => 1,
        'generatedAt' => gmdate('c'),
        'source' => $source,
        'donations' => $donations,
        'summary' => [
            'totalAmount' => $totalCents / 100,
            'currency' => 'USD',
            'donationCount' => count($donations),
            'supporterCount' => count($supporters),
            'lastDonationAt' => $donations[0]['paidAt'] ?? null,
        ],
    ];
}

if ($botToken === '') {
    respond_with_cache($cacheFile, ['live' => false, 'status' => 'missing-token']);
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    if ($webhookSecret !== '' && ($_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] ?? '') !== $webhookSecret) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'status' => 'invalid-secret']);
        exit;
    }

    $update = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($update)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'status' => 'invalid-json']);
        exit;
    }

    $payload = read_json_file($cacheFile, empty_payload('telegram-webhook'));
    $donations = $payload['donations'] ?? [];
    $message = $update['message'] ?? $update['channel_post'] ?? null;
    $parsed = [];

    if ($message && (string) ($message['chat']['id'] ?? '') === $chatId) {
        $text = (string) ($message['text'] ?? $message['caption'] ?? '');
        $parsed = parse_donations($text, isset($message['date']) ? (int) $message['date'] : null);
    }

    if (count($parsed) > 0) {
        $payload = build_payload(array_merge($donations, $parsed), 'telegram-webhook');
        write_json_file($cacheFile, $payload);
    }

    echo json_encode(array_merge($payload, [
        'ok' => true,
        'live' => true,
        'source' => count($parsed) > 0 ? 'telegram-webhook' : (string) ($payload['source'] ?? 'telegram-webhook'),
        'newDonationCount' => count($parsed),
        'syncedAt' => gmdate('c'),
    ]), JSON_UNESCAPED_SLASHES);
    exit;
}

$state = read_json_file($stateFile, ['offset' => null, 'lastSyncAt' => null]);
$lastSync = isset($state['lastSyncAt']) ? strtotime((string) $state['lastSyncAt']) : false;

if ($lastSync && time() - $lastSync < $cacheTtl) {
    respond_with_cache($cacheFile, ['live' => true, 'cached' => true, 'syncedAt' => $state['lastSyncAt']]);
}

$params = [
    'timeout' => '0',
    'allowed_updates' => json_encode(['message', 'channel_post']),
];
if (!empty($state['offset'])) {
    $params['offset'] = (string) $state['offset'];
}

$response = http_json('https://api.telegram.org/bot' . $botToken . '/getUpdates?' . http_build_query($params));
if (!$response || empty($response['ok'])) {
    $description = (string) ($response['description'] ?? '');
    if (($response['_httpStatus'] ?? 0) === 409 || str_contains($description, 'webhook')) {
        respond_with_cache($cacheFile, ['live' => true, 'status' => 'webhook-active']);
    }

    respond_with_cache($cacheFile, ['live' => false, 'status' => 'telegram-unavailable']);
}

$payload = read_json_file($cacheFile, empty_payload('telegram'));
$donations = $payload['donations'] ?? [];
$nextOffset = $state['offset'] ?? null;
$newDonationCount = 0;

foreach (($response['result'] ?? []) as $update) {
    if (isset($update['update_id'])) {
        $nextOffset = ((int) $update['update_id']) + 1;
    }

    $message = $update['message'] ?? $update['channel_post'] ?? null;
    if (!$message || (string) ($message['chat']['id'] ?? '') !== $chatId) {
        continue;
    }

    $text = (string) ($message['text'] ?? $message['caption'] ?? '');
    $parsed = parse_donations($text, isset($message['date']) ? (int) $message['date'] : null);
    $newDonationCount += count($parsed);
    $donations = array_merge($donations, $parsed);
}

$syncedAt = gmdate('c');
$state = [
    'offset' => $nextOffset,
    'chatId' => $chatId,
    'lastSyncAt' => $syncedAt,
];

if ($newDonationCount > 0 || !is_file($cacheFile)) {
    $payload = build_payload($donations, 'telegram');
    write_json_file($cacheFile, $payload);
}

write_json_file($stateFile, $state);

echo json_encode(array_merge($payload, [
    'live' => true,
    'cached' => false,
    'syncedAt' => $syncedAt,
    'newDonationCount' => $newDonationCount,
]), JSON_UNESCAPED_SLASHES);
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, php)

console.log(token ? `Wrote Telegram donation API to ${outputPath}` : `Wrote disabled donation API to ${outputPath}; TG_API_BOT is not set`)
