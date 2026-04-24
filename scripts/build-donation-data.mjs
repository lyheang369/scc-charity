import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { buildDonationPayload, parseDonationMessages } from './donationParser.mjs'

const root = resolve(import.meta.dirname, '..')
const sourcePath = resolve(root, process.argv[2] || 'payment-data.txt')
const outputPath = resolve(root, process.argv[3] || 'public/data/donations.json')
const generatedModulePath = resolve(root, 'src/data/donations.generated.json')

if (!existsSync(sourcePath)) {
  if (!existsSync(outputPath)) {
    mkdirSync(dirname(outputPath), { recursive: true })
    writeFileSync(outputPath, JSON.stringify(buildDonationPayload([], 'empty'), null, 2) + '\n')
  }

  console.log(`Donation source not found at ${sourcePath}; keeping existing ${outputPath}`)
  process.exit(0)
}

const paymentText = readFileSync(sourcePath, 'utf8')
const donations = parseDonationMessages(paymentText, { defaultYear: 2026 })
const payload = buildDonationPayload(donations, 'payment-data.txt')
const currentPayload = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, 'utf8')) : null

if (currentPayload?.donations && JSON.stringify(currentPayload.donations) === JSON.stringify(payload.donations)) {
  payload.generatedAt = currentPayload.generatedAt || payload.generatedAt
}

const nextJson = JSON.stringify(payload, null, 2) + '\n'
const currentJson = existsSync(outputPath) ? readFileSync(outputPath, 'utf8') : ''

mkdirSync(dirname(outputPath), { recursive: true })
mkdirSync(dirname(generatedModulePath), { recursive: true })

if (currentJson !== nextJson) {
  writeFileSync(outputPath, nextJson)
}

writeFileSync(generatedModulePath, nextJson)

console.log(`Wrote ${payload.summary.donationCount} donations to ${outputPath}`)
