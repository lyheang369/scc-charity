import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const outputPath = resolve(root, 'public/data/donations.json')
const liveUrl = process.env.LIVE_DONATIONS_URL || 'https://scc-charity.com/data/donations.json'

const response = await fetch(`${liveUrl}?ts=${Date.now()}`, { cache: 'no-store' })

if (!response.ok) {
  throw new Error(`Could not fetch live donation data: HTTP ${response.status}`)
}

const payload = await response.json()

if (!payload || !Array.isArray(payload.donations) || !payload.summary) {
  throw new Error('Live donation data is not a donation payload')
}

const nextJson = JSON.stringify(payload, null, 2) + '\n'
let currentJson = ''

try {
  currentJson = readFileSync(outputPath, 'utf8')
} catch {
  currentJson = ''
}

if (currentJson === nextJson) {
  console.log('Live donation data is already current')
  process.exit(0)
}

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, nextJson)
console.log(`Imported ${payload.summary.donationCount} live donations from ${liveUrl}`)
