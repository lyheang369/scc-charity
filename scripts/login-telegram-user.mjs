import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { createTelegramClient, getSessionPath, upsertDotEnv, writeSession } from './telegramUserClient.mjs'

upsertDotEnv({
  TG_USER_SESSION_FILE: '.telegram-user-session',
  TG_USER_CHAT_ID: '-1003796814691',
})

const rl = readline.createInterface({ input, output })
const client = createTelegramClient('')

await client.start({
  phoneNumber: async () => rl.question('Telegram phone number: '),
  password: async () => rl.question('Two-step password, if enabled: '),
  phoneCode: async () => rl.question('Telegram login code: '),
  onError: (error) => console.error(error.message),
})

writeSession(client.session.save())
await client.disconnect()
rl.close()

console.log(`Telegram user session saved to ${getSessionPath()}`)
