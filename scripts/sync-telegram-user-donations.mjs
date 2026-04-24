import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { buildDonationPayload, mergeDonations, parseDonationMessages } from './donationParser.mjs'
import { createTelegramClient, getTelegramConfig, readSession, resolveChatEntity } from './telegramUserClient.mjs'

const root = resolve(import.meta.dirname, '..')
const dataPath = resolve(root, 'public/data/donations.json')
const generatedModulePath = resolve(root, 'src/data/donations.generated.json')

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

async function main() {
  const session = readSession()

  if (!session) {
    throw new Error('Missing .telegram-user-session. Run npm run telegram:login first.')
  }

  const config = getTelegramConfig()
  const client = createTelegramClient(session)
  await client.connect()

  const chat = await resolveChatEntity(client, config.chatId)
  const messages = await client.getMessages(chat, { limit: config.limit })
  const incoming = []

  for (const message of messages) {
    const text = message.message || ''
    if (!text.includes('paid by') || !text.includes('Trx. ID')) continue

    incoming.push(...parseDonationMessages(text, {
      messageTimestamp: message.date,
      defaultYear: 2026,
    }))
  }

  await client.disconnect()

  const currentPayload = readJson(dataPath, buildDonationPayload([], 'telegram-user'))
  const mergedDonations = mergeDonations(currentPayload.donations || [], incoming)
  const nextPayload = buildDonationPayload(mergedDonations, incoming.length ? 'telegram-user' : currentPayload.source || 'telegram-user')

  if (incoming.length) {
    writeJson(dataPath, nextPayload)
    writeJson(generatedModulePath, nextPayload)
  }

  console.log(`Read ${messages.length} Telegram messages; parsed ${incoming.length} donation record(s); ${nextPayload.summary.donationCount} total`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
