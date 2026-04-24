import { createHash } from 'node:crypto'

const token = process.env.TG_API_BOT || process.env.TELEGRAM_BOT_TOKEN || ''
const webhookUrl = process.env.TG_WEBHOOK_URL || 'https://scc-charity.com/api/donations.php'
const secretToken = process.env.TG_WEBHOOK_SECRET || (token ? createHash('sha256').update(`scc-donations:${token}`).digest('hex') : '')

if (!token) {
  console.error('Missing TG_API_BOT or TELEGRAM_BOT_TOKEN')
  process.exit(1)
}

const params = new URLSearchParams({
  url: webhookUrl,
  allowed_updates: JSON.stringify(['message', 'channel_post']),
  drop_pending_updates: 'false',
})

if (secretToken) params.set('secret_token', secretToken)

const response = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: params,
})

const payload = await response.json()

if (!response.ok || !payload.ok) {
  console.error(`Telegram setWebhook failed: ${payload.description || response.status}`)
  process.exit(1)
}

console.log(`Telegram webhook configured for ${webhookUrl}`)
