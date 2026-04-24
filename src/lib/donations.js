import initialDonationPayload from '../data/donations.generated.json'

export const DONATION_POLL_MS = 2000

const emptyPayload = {
  schemaVersion: 1,
  generatedAt: null,
  source: 'empty',
  donations: [],
  summary: {
    totalAmount: 0,
    currency: 'USD',
    donationCount: 0,
    supporterCount: 0,
    lastDonationAt: null,
  },
}

function applyDisplayNames(donations) {
  const counts = donations.reduce((map, donation) => {
    const key = donation.donorName?.trim().toLowerCase() || ''
    map.set(key, (map.get(key) || 0) + 1)
    return map
  }, new Map())

  return donations.map((donation) => {
    const key = donation.donorName?.trim().toLowerCase() || ''
    const shouldUseSuffix = counts.get(key) > 1 && donation.accountSuffix

    return {
      ...donation,
      displayName: shouldUseSuffix ? `${donation.donorName} *${donation.accountSuffix}` : donation.displayName || donation.donorName,
    }
  })
}

function summarize(donations) {
  const totalCents = donations.reduce((sum, donation) => sum + Math.round(Number(donation.amount || 0) * 100), 0)
  const supporters = new Set(donations.map((donation) => `${donation.displayName}-${donation.accountSuffix}`.toLowerCase()))

  return {
    totalAmount: totalCents / 100,
    currency: 'USD',
    donationCount: donations.length,
    supporterCount: supporters.size,
    lastDonationAt: donations[0]?.paidAt || null,
  }
}

export function normalizeDonationPayload(payload) {
  if (!payload || !Array.isArray(payload.donations)) return emptyPayload

  const donations = applyDisplayNames(
    payload.donations
      .filter((donation) => donation?.id && donation?.donorName && Number.isFinite(Number(donation.amount)))
      .map((donation) => ({
        ...donation,
        amount: Number(donation.amount),
        currency: donation.currency || 'USD',
      }))
      .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt)),
  )

  return {
    ...emptyPayload,
    ...payload,
    live: payload.live ?? String(payload.source || '').startsWith('telegram'),
    donations,
    summary: summarize(donations),
  }
}

export const initialDonations = normalizeDonationPayload(initialDonationPayload)

export function buildLeaderboard(donations) {
  const leaders = new Map()

  for (const donation of donations) {
    const key = `${donation.displayName}-${donation.accountSuffix}`
    const current = leaders.get(key) || {
      key,
      name: donation.displayName,
      accountSuffix: donation.accountSuffix,
      totalAmount: 0,
      donationCount: 0,
      latestPaidAt: donation.paidAt,
    }

    current.totalAmount += Number(donation.amount || 0)
    current.donationCount += 1
    if (new Date(donation.paidAt) > new Date(current.latestPaidAt)) current.latestPaidAt = donation.paidAt
    leaders.set(key, current)
  }

  return [...leaders.values()].sort((a, b) => {
    if (b.totalAmount !== a.totalAmount) return b.totalAmount - a.totalAmount
    return new Date(b.latestPaidAt) - new Date(a.latestPaidAt)
  })
}

export function formatDonationAmount(amount) {
  return `${Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USD`
}

export function formatRelativeTime(value, language = 'en', now = Date.now()) {
  if (!value) return ''

  const diffSeconds = Math.max(0, Math.floor((now - new Date(value).getTime()) / 1000))
  const units = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]

  if (diffSeconds < 45) return language === 'km' ? 'មុននេះបន្តិច' : 'just now'

  const [unit, seconds] = units.find(([, unitSeconds]) => diffSeconds >= unitSeconds) || ['minute', 60]
  const count = Math.max(1, Math.floor(diffSeconds / seconds))

  if (language === 'km') {
    const kmUnits = { day: 'ថ្ងៃ', hour: 'ម៉ោង', minute: 'នាទី' }
    return `${count} ${kmUnits[unit]}មុន`
  }

  return `${count} ${unit}${count === 1 ? '' : 's'} ago`
}

export function donationFingerprint(payload) {
  return `${payload.summary.donationCount}:${payload.summary.totalAmount}:${payload.summary.lastDonationAt || ''}:${payload.donations[0]?.id || ''}`
}

export async function fetchDonationPayload(signal) {
  const baseUrl = import.meta.env.BASE_URL
  const staticUrl = `${baseUrl}data/donations.json?ts=${Date.now()}`
  const apiUrl = `${baseUrl}api/donations.php?ts=${Date.now()}`

  try {
    const response = await fetch(staticUrl, { cache: 'no-store', signal })
    const contentType = response.headers.get('content-type') || ''

    if (response.ok && contentType.includes('application/json')) {
      return normalizeDonationPayload(await response.json())
    }
  } catch (error) {
    if (error.name === 'AbortError') throw error
  }

  const response = await fetch(apiUrl, { cache: 'no-store', signal })
  if (!response.ok) return emptyPayload

  return normalizeDonationPayload(await response.json())
}
