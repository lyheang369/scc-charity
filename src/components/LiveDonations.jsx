import { ArrowRight, Radio } from 'lucide-react'
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'
import { useDonations } from '../hooks/useDonations'
import { formatRelativeTime } from '../lib/donations'
import ScrollReveal from './ScrollReveal'
import { DonationSummary, LeaderboardList, RecentDonationList } from './DonationHonorRoll'

export default function LiveDonations() {
  const t = useTranslation()
  const { language } = useContext(LanguageContext)
  const { donations, summary, generatedAt, syncedAt, checkedAt, live, loading } = useDonations()
  const labels = t.donations
  const updatedAt = checkedAt || syncedAt || generatedAt || summary.lastDonationAt

  return (
    <section id="donations" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-end mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy mb-4">
              <span className={`w-2 h-2 rounded-full ${live ? 'bg-lime' : 'bg-orange'}`} />
              {live ? labels.statusLive : labels.statusFallback}
            </div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-orange mb-3">{labels.eyebrow}</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy leading-tight mb-4">
              {labels.headline}
            </h2>
            <p className="text-base md:text-lg text-muted leading-relaxed">{labels.description}</p>
          </div>

          <div className="lg:justify-self-end w-full lg:max-w-xl">
            <DonationSummary summary={summary} labels={labels} />
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <Radio size={14} className={live ? 'text-lime' : 'text-orange'} />
              <span>
                {loading ? labels.loading : labels.updated}{' '}
                {updatedAt ? formatRelativeTime(updatedAt, language) : ''}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] gap-6">
          <ScrollReveal>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-2xl font-semibold text-navy">{labels.recentTitle}</h3>
              <a href="#donors" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-orange hover:text-orange-dark transition-colors">
                {labels.viewAll} <ArrowRight size={14} />
              </a>
            </div>
            <RecentDonationList donations={donations} labels={labels} language={language} limit={5} />
          </ScrollReveal>

          <ScrollReveal delay="lg:delay-100">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-display text-2xl font-semibold text-navy">{labels.leaderboardTitle}</h3>
              <a href="#donate" className="text-xs font-semibold uppercase tracking-wide text-navy/55 hover:text-navy transition-colors">
                {labels.donateNow}
              </a>
            </div>
            <LeaderboardList donations={donations} labels={labels} limit={5} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
