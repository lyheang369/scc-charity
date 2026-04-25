import { Banknote } from 'lucide-react'
import { buildLeaderboard, formatDonationAmount, formatRelativeTime } from '../lib/donations'

export function DonationSummary({ summary, labels }) {
  const items = [
    { icon: Banknote, label: labels.totalRaised, value: formatDonationAmount(summary.totalAmount) },
  ]

  return (
    <div className="grid gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-lg border border-navy/8 bg-white px-4 py-4">
          <div className="flex items-center gap-2 text-muted mb-2">
            <Icon size={16} />
            <span className="text-[10px] uppercase tracking-[0.14em]">{label}</span>
          </div>
          <div className="font-display text-3xl md:text-4xl font-bold text-navy">{value}</div>
        </div>
      ))}
    </div>
  )
}

export function RecentDonationList({ donations, labels, language, limit = 5 }) {
  const visibleDonations = donations.slice(0, limit)

  if (!visibleDonations.length) {
    return <p className="rounded-lg border border-dashed border-navy/15 px-4 py-6 text-sm text-muted">{labels.noDonations}</p>
  }

  return (
    <div className="space-y-3">
      {visibleDonations.map((donation) => (
        <div key={donation.id} className="rounded-lg border border-navy/8 bg-white px-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="min-w-0">
              <p className="text-sm md:text-base text-text leading-relaxed">
                <span className="font-semibold text-navy break-words">{donation.displayName}</span>{' '}
                <span>{labels.donated}</span>{' '}
                <span className="font-semibold text-orange">{formatDonationAmount(donation.amount)}</span>{' '}
                <span className="text-muted">{formatRelativeTime(donation.paidAt, language)}</span>
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                <span className="rounded-full bg-sand px-2.5 py-1">{donation.method}</span>
                {donation.bank && <span className="rounded-full bg-lime-soft px-2.5 py-1">{donation.bank}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LeaderboardList({ donations, labels, limit = 5 }) {
  const leaders = buildLeaderboard(donations).slice(0, limit)

  if (!leaders.length) {
    return <p className="rounded-lg border border-dashed border-navy/15 px-4 py-6 text-sm text-muted">{labels.noDonations}</p>
  }

  return (
    <div className="divide-y divide-navy/8 rounded-lg border border-navy/8 bg-white overflow-hidden">
      {leaders.map((leader, index) => (
        <div key={leader.key} className="flex items-center gap-3 px-4 py-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            index === 0 ? 'bg-orange text-white' : 'bg-sand text-navy'
          }`}>
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-navy truncate">{leader.name}</p>
            <p className="text-[11px] text-muted">
              {leader.donationCount} {leader.donationCount === 1 ? labels.gift : labels.giftsLower}
            </p>
          </div>
          <div className="text-sm font-semibold text-orange shrink-0">{formatDonationAmount(leader.totalAmount)}</div>
        </div>
      ))}
    </div>
  )
}
