import { ArrowLeft, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import Navbar from '../components/Navbar';

const telegramIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const facebookIcon = (size = 5) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`w-${size} h-${size}`}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const instagramIcon = (size = 5) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`w-${size} h-${size}`}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const tiktokIcon = (size = 5) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`w-${size} h-${size}`}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export default function DonatePage() {
  const t = useTranslation();
  const d = t.donate;

  const socials = [
    {
      key: 'facebook',
      icon: facebookIcon(5),
      href: 'https://www.facebook.com/share/18Ws4jj6ht/?mibextid=wwXIfr',
      color: 'text-[#1877F2]',
      bg: 'bg-[#1877F2]/10',
      handle: t.help.facebookPage,
    },
    {
      key: 'instagram',
      icon: instagramIcon(5),
      href: 'https://www.instagram.com/scc._charity',
      color: 'text-[#E1306C]',
      bg: 'bg-[#E1306C]/10',
      handle: '@scc._charity',
    },
    {
      key: 'tiktok',
      icon: tiktokIcon(5),
      href: 'https://www.tiktok.com/@smileofcambodianchild',
      color: 'text-[#010101]',
      bg: 'bg-[#010101]/8',
      handle: '@smileofcambodianchild',
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-navy pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_60%_50%,rgba(17,196,212,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(79,231,175,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-lime block mb-3">{d.eyebrow}</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
            {d.headline}
          </h1>
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            {d.description}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20">

        {/* KHQR donation */}
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] gap-6 md:gap-10 items-center rounded-3xl bg-white p-6 md:p-8 shadow-xl shadow-navy/8 mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-orange mb-3">{d.khqr.scanLabel}</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-3">{d.khqr.headline}</h2>
            <p className="text-muted text-sm md:text-base leading-relaxed">{d.khqr.description}</p>
          </div>
          <div className="rounded-2xl bg-cream p-4 border border-navy/8">
            <img
              src={`${import.meta.env.BASE_URL}img/khqr-donation.png`}
              alt={d.khqr.imageAlt}
              className="w-full rounded-xl bg-white"
            />
          </div>
        </div>

        {/* Primary contact — Telegram & Email */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-2">{d.contactHeadline}</h2>
          <p className="text-muted text-sm md:text-base">{d.contactDesc}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {/* Telegram */}
          <a
            href="https://t.me/thearysrms"
            className="group flex flex-col items-center text-center gap-5 p-10 rounded-2xl border bg-[#229ED9]/8 border-[#229ED9]/20 text-[#229ED9] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#229ED9]/15 group-hover:scale-110 transition-transform duration-300">
              {telegramIcon}
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.12em] uppercase opacity-60 mb-1">{d.telegram.label}</div>
              <div className="font-display font-bold text-navy text-xl mb-1">{d.telegram.value}</div>
              <div className="text-sm text-muted">{d.telegram.note}</div>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:support@scc-charity.com"
            className="group flex flex-col items-center text-center gap-5 p-10 rounded-2xl border bg-orange/8 border-orange/20 text-orange hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-orange/15 group-hover:scale-110 transition-transform duration-300">
              <Mail size={32} />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.12em] uppercase opacity-60 mb-1">{d.email.label}</div>
              <div className="font-display font-bold text-navy text-base mb-1">{d.email.value}</div>
              <div className="text-sm text-muted">{d.email.note}</div>
            </div>
          </a>
        </div>

        {/* Social links */}
        <div className="border-t border-navy/8 pt-10">
          <p className="text-center text-xs font-semibold tracking-[0.15em] uppercase text-muted mb-6">{d.socialHeadline}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {socials.map(({ key, icon, href, color, bg, handle }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 flex-1 px-5 py-3.5 rounded-xl ${bg} ${color} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
              >
                <div className="shrink-0">{icon}</div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold tracking-[0.12em] uppercase opacity-60">{d[key].label}</div>
                  <div className="text-sm font-medium text-navy truncate">{handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} /> {d.backLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
