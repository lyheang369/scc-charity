import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { buildDonationPayload, mergeDonations, parseDonationMessages } from './donationParser.mjs'

const DEFAULT_CHAT_ID = '-1003796814691'
const root = resolve(import.meta.dirname, '..')
const dataPath = resolve(root, 'public/data/donations.json')
const statePath = resolve(root, 'public/data/donations-state.json')
const args = new Set(process.argv.slice(2))
const watch = args.has('--watch')
const pollMs = Number(process.env.DONATION_POLL_MS || 6000)

function loadDotEnv() {
  const envPath = resolve(root, '.env')
  if (!existsSync(envPath)) return

  const lines = readFileSync(envPath, 'utf8').split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue

    const index = trimmed.indexOf('=')
    const key = trimmed.slice(0, index).trim()
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')

    if (!process.env[key]) process.env[key] = value
  }
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback

  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return fallback
  }
}

function writeJson(path, payload) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(payload, null, 2) + '\n')
}

async function fetchUpdates(token, offset) {
  const params = new URLSearchParams({
    timeout: '0',
    allowed_updates: JSON.stringify(['message', 'channel_post']),
  })

  if (offset) params.set('offset', String(offset))

  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Telegram getUpdates failed with HTTP ${response.status}`)
  }

  const payload = await response.json()

  if (!payload.ok) {
    throw new Error('Telegram getUpdates returned ok=false')
  }

  return payload.result || []
}

async function syncOnce() {
  loadDotEnv()

  const token = process.env.TG_API_BOT || process.env.TELEGRAM_BOT_TOKEN
  const chatId = String(process.env.TG_CHAT_ID || process.env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID)

  if (!token) {
    throw new Error('Missing TG_API_BOT in .env or environment')
  }

  const state = readJson(statePath, { offset: null })
  const currentPayload = readJson(dataPath, buildDonationPayload([], 'telegram'))
  const updates = await fetchUpdates(token, state.offset)
  let nextOffset = state.offset
  const incoming = []

  for (const update of updates) {
    if (Number.isFinite(update.update_id)) nextOffset = update.update_id + 1

    const message = update.message || update.channel_post
    if (!message || String(message.chat?.id) !== chatId) continue

    const text = message.text || message.caption || ''
    incoming.push(...parseDonationMessages(text, { messageTimestamp: message.date, defaultYear: 2026 }))
  }

  const mergedDonations = mergeDonations(currentPayload.donations || [], incoming)
  const nextPayload = buildDonationPayload(mergedDonations, incoming.length ? 'telegram' : currentPayload.source || 'telegram')

  if (incoming.length || !existsSync(dataPath)) {
    writeJson(dataPath, nextPayload)
  }

  writeJson(statePath, {
    offset: nextOffset,
    chatId,
    lastSyncAt: new Date().toISOString(),
  })

  console.log(`Synced ${incoming.length} new donation record(s); ${nextPayload.summary.donationCount} total`)
}

async function main() {
  do {
    try {
      await syncOnce()
    } catch (error) {
      console.error(error.message)
      if (!watch) process.exitCode = 1
    }

    if (watch) await new Promise((resolveTimer) => setTimeout(resolveTimer, pollMs))
  } while (watch)
}

main()
