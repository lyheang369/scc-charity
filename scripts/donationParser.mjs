const MONTHS = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

const PAYMENT_REGEX = /\$([\d,]+(?:\.\d{1,2})?)\s+paid by\s+(.+?)\s+\(\*(\d{3})\)\s+on\s+([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{1,2}):(\d{2})\s+(AM|PM)\s+via\s+(.+?)\s+at\s+(.+?)\.\s+Trx\. ID:\s*([A-Za-z0-9-]+),\s*APV:\s*([A-Za-z0-9-]+)/gi
const HEADER_REGEX = /\[(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s+at\s+(\d{1,2}):(\d{2}):(\d{2})/gi

function pad(value) {
  return String(value).padStart(2, '0')
}

function amountToCents(amount) {
  return Math.round(Number(amount) * 100)
}

function toLocalIso(year, monthIndex, day, hour12, minute, period, second = 0) {
  let hour = Number(hour12) % 12
  if (period.toUpperCase() === 'PM') hour += 12

  return `${year}-${pad(monthIndex + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}+07:00`
}

function getCambodiaDateParts(timestamp) {
  if (!timestamp) return null

  const date = new Date(Number(timestamp) * 1000)
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Phnom_Penh',
    year: 'numeric',
    second: '2-digit',
  })
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]))

  return {
    year: Number(parts.year),
    second: Number(parts.second),
  }
}

function findNearestHeader(text, offset) {
  const before = text.slice(0, offset)
  const headers = [...before.matchAll(HEADER_REGEX)]
  const latest = headers.at(-1)

  if (!latest) return null

  return {
    year: Number(latest[3]),
    second: Number(latest[6]),
  }
}

function extractMethod(rawMethod) {
  const bankMatch = rawMethod.match(/\(([^)]+)\)/)

  return {
    method: rawMethod.replace(/\s*\([^)]+\)/g, '').trim(),
    bank: bankMatch?.[1]?.trim() || '',
  }
}

function stableHash(value) {
  let hash = 0

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash).toString(36)
}

export function parseDonationMessages(text, options = {}) {
  const { defaultYear = new Date().getFullYear(), messageTimestamp = null } = options
  const messageDateParts = getCambodiaDateParts(messageTimestamp)
  const donations = []

  for (const match of text.matchAll(PAYMENT_REGEX)) {
    const [
      fullText,
      rawAmount,
      rawName,
      accountSuffix,
      rawMonth,
      rawDay,
      rawHour,
      rawMinute,
      period,
      rawMethod,
      rawRecipient,
      trxId,
      apv,
    ] = match

    const monthIndex = MONTHS[rawMonth.toLowerCase()]
    if (monthIndex === undefined) continue

    const header = findNearestHeader(text, match.index || 0)
    const year = header?.year || messageDateParts?.year || defaultYear
    const second = header?.second ?? messageDateParts?.second ?? 0
    const amount = Number(rawAmount.replace(/,/g, ''))
    const { method, bank } = extractMethod(rawMethod.trim())
    const paidAt = toLocalIso(year, monthIndex, Number(rawDay), Number(rawHour), Number(rawMinute), period, second)
    const id = trxId ? `trx-${trxId}` : `donation-${stableHash(fullText)}`

    donations.push({
      id,
      trxId,
      apv,
      donorName: rawName.trim().replace(/\s+/g, ' '),
      displayName: rawName.trim().replace(/\s+/g, ' '),
      accountSuffix,
      amount,
      currency: 'USD',
      method,
      bank,
      recipient: rawRecipient.trim(),
      paidAt,
    })
  }

  return applyDisplayNames(donations)
}

export function applyDisplayNames(donations) {
  const nameCounts = donations.reduce((counts, donation) => {
    const key = donation.donorName.trim().toLowerCase()
    counts.set(key, (counts.get(key) || 0) + 1)
    return counts
  }, new Map())

  return donations.map((donation) => {
    const nameKey = donation.donorName.trim().toLowerCase()
    const shouldAppendSuffix = nameCounts.get(nameKey) > 1 && donation.accountSuffix

    return {
      ...donation,
      displayName: shouldAppendSuffix ? `${donation.donorName} *${donation.accountSuffix}` : donation.donorName,
    }
  })
}

export function mergeDonations(existingDonations = [], incomingDonations = []) {
  const byId = new Map()

  for (const donation of [...existingDonations, ...incomingDonations]) {
    if (!donation?.id) continue
    byId.set(donation.id, donation)
  }

  return applyDisplayNames([...byId.values()].sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt)))
}

export function buildDonationPayload(donations, source = 'payment-data') {
  const normalizedDonations = applyDisplayNames(
    [...donations].sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt)),
  )
  const totalCents = normalizedDonations.reduce((sum, donation) => sum + amountToCents(donation.amount), 0)
  const supporterKeys = new Set(
    normalizedDonations.map((donation) => `${donation.displayName.toLowerCase()}-${donation.accountSuffix}`),
  )

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source,
    donations: normalizedDonations,
    summary: {
      totalAmount: totalCents / 100,
      currency: 'USD',
      donationCount: normalizedDonations.length,
      supporterCount: supporterKeys.size,
      lastDonationAt: normalizedDonations[0]?.paidAt || null,
    },
  }
}
