import { Radio } from 'lucide-react'
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'
import { useDonations } from '../hooks/useDonations'
import { formatRelativeTime } from '../lib/donations'
import ScrollReveal from './ScrollReveal'
import { DonationSummary } from './DonationHonorRoll'

export default function LiveDonations() {
  const t = useTranslation()
  const { language } = useContext(LanguageContext)
  const { summary, generatedAt, syncedAt, checkedAt, loading } = useDonations()
  const labels = t.donations
  const updatedAt = checkedAt || syncedAt || generatedAt || summary.lastDonationAt

  return (
    <section id="donations" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-end mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-orange mb-3">{labels.eyebrow}</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy leading-tight mb-4">
              {labels.headline}
            </h2>
            <p className="text-base md:text-lg text-muted leading-relaxed">{labels.description}</p>
          </div>

          <div className="lg:justify-self-end w-full lg:max-w-xl">
            <DonationSummary summary={summary} labels={labels} />
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <Radio size={14} className="text-orange" />
              <span>
                {loading ? labels.loading : labels.updated}{' '}
                {updatedAt ? formatRelativeTime(updatedAt, language) : ''}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
