import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { TelegramClient, Api } from 'telegram'
import { StringSession } from 'telegram/sessions/index.js'

const root = resolve(import.meta.dirname, '..')
const envPath = resolve(root, '.env')

export const DEFAULT_CHAT_ID = '-1003796814691'

export function loadDotEnv() {
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

export function upsertDotEnv(values) {
  const lines = existsSync(envPath) ? readFileSync(envPath, 'utf8').split(/\r?\n/) : []
  const seen = new Set()
  const nextLines = lines.map((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) return line

    const index = line.indexOf('=')
    const key = line.slice(0, index).trim()

    if (!Object.prototype.hasOwnProperty.call(values, key)) return line

    seen.add(key)
    return `${key}=${values[key]}`
  })

  for (const [key, value] of Object.entries(values)) {
    if (!seen.has(key)) nextLines.push(`${key}=${value}`)
  }

  writeFileSync(envPath, nextLines.filter((line, index, list) => line || index < list.length - 1).join('\n') + '\n')
}

export function getSessionPath() {
  return resolve(root, process.env.TG_USER_SESSION_FILE || '.telegram-user-session')
}

export function readSession() {
  if (process.env.TG_USER_SESSION || process.env.TELEGRAM_USER_SESSION) {
    return (process.env.TG_USER_SESSION || process.env.TELEGRAM_USER_SESSION).trim()
  }

  const sessionPath = getSessionPath()
  return existsSync(sessionPath) ? readFileSync(sessionPath, 'utf8').trim() : ''
}

export function writeSession(session) {
  writeFileSync(getSessionPath(), `${session}\n`, { mode: 0o600 })
}

export function getTelegramConfig() {
  loadDotEnv()

  const apiId = Number(process.env.TG_API_ID || process.env.TELEGRAM_API_ID)
  const apiHash = process.env.TG_API_HASH || process.env.TELEGRAM_API_HASH

  if (!Number.isFinite(apiId) || !apiHash) {
    throw new Error('Missing TG_API_ID and TG_API_HASH in .env')
  }

  return {
    apiId,
    apiHash,
    chatId: process.env.TG_USER_CHAT_ID || process.env.TG_CHAT_ID || process.env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID,
    limit: Number(process.env.TG_USER_SYNC_LIMIT || 100),
  }
}

export function createTelegramClient(session = readSession()) {
  const { apiId, apiHash } = getTelegramConfig()

  return new TelegramClient(new StringSession(session), apiId, apiHash, {
    connectionRetries: 5,
  })
}

export async function resolveChatEntity(client, chatId) {
  const candidates = [chatId]

  if (/^-?\d+$/.test(String(chatId))) {
    candidates.push(Number(chatId))

    if (String(chatId).startsWith('-100')) {
      candidates.push(new Api.PeerChannel({ channelId: Number(String(chatId).slice(4)) }))
    }
  }

  for (const candidate of candidates) {
    try {
      return await client.getEntity(candidate)
    } catch {
      // Try the next accepted GramJS entity format.
    }
  }

  throw new Error(`Could not resolve Telegram chat ${chatId}`)
}
