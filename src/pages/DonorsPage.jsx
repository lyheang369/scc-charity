import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DonationSummary } from '../components/DonationHonorRoll'
import { LanguageContext } from '../context/LanguageContext'
import { useDonations } from '../hooks/useDonations'
import { useTranslation } from '../hooks/useTranslation'
import { formatRelativeTime } from '../lib/donations'

export default function DonorsPage() {
  const t = useTranslation()
  const { language } = useContext(LanguageContext)
  const { summary, generatedAt, syncedAt, checkedAt, live, loading, refresh } = useDonations()
  const labels = t.donations
  const updatedAt = checkedAt || syncedAt || generatedAt || summary.lastDonationAt

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <section className="bg-navy pt-28 pb-14 md:pt-36 md:pb-18 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_70%_45%,rgba(17,196,212,0.2),transparent_70%)]" />
          <div className="relative max-w-7xl mx-auto px-5 md:px-8">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault()
                window.location.hash = ''
              }}
              className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-lime transition-colors mb-8"
            >
              <ArrowLeft size={16} /> {labels.backHome}
            </a>

            <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-lime mb-4">
                  <span className={`w-2 h-2 rounded-full ${live ? 'bg-lime' : 'bg-orange'}`} />
                  {live ? labels.statusLive : labels.statusFallback}
                </div>
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-lime mb-3">{labels.pageEyebrow}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
                  {labels.pageHeadline}
                </h1>
                <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl">{labels.pageDescription}</p>
              </div>

              <div className="lg:justify-self-end w-full lg:max-w-xl">
                <DonationSummary summary={summary} labels={labels} />
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/45">
                  <span>{loading ? labels.loading : labels.updated} {updatedAt ? formatRelativeTime(updatedAt, language) : ''}</span>
                  <button
                    type="button"
                    onClick={refresh}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-white/70 hover:bg-white/12 hover:text-lime transition-colors"
                  >
                    <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> {labels.refresh}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
