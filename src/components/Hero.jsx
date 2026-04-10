import { useTranslation } from '../hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(2,117,46,0.2),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(255,102,2,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_10%,rgba(126,225,16,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center pt-24 pb-16 md:pt-0 md:pb-0">
          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center gap-3 animate-[fadeUp_0.8s_0.2s_ease_both]">
              <span className="w-8 h-px bg-lime" />
              <span className="text-xs font-medium tracking-[0.18em] uppercase text-lime">{t.hero.eyebrow}</span>
            </div>
            <p className="font-khmer text-xl md:text-2xl lg:text-3xl font-semibold text-white/50 leading-relaxed animate-[fadeUp_0.8s_0.4s_ease_both]">
              {t.hero.headlineKhmer}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-cream leading-[1.05] tracking-tight animate-[fadeUp_0.8s_0.55s_ease_both]">
              {t.hero.headline}
            </h1>
            <p className="max-w-lg text-base md:text-lg text-white/60 leading-relaxed animate-[fadeUp_0.8s_0.7s_ease_both]">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-[fadeUp_0.8s_0.85s_ease_both]">
              <a href="#help" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange to-orange-dark text-white text-sm font-semibold tracking-wide uppercase px-7 py-3.5 rounded-full hover:shadow-xl hover:shadow-orange/30 transition-all hover:-translate-y-0.5">
                {t.hero.cta} <ArrowRight size={16} />
              </a>
              <a href="#about" className="text-sm font-medium tracking-wide uppercase text-white/60 border-b border-white/20 pb-0.5 hover:text-lime hover:border-lime transition-colors">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <p className="text-xs tracking-wide text-white/30 uppercase animate-[fadeUp_0.8s_1s_ease_both]">{t.hero.trust}</p>
          </div>

          <div className="md:col-span-2 flex md:justify-end animate-[fadeUp_0.8s_1s_ease_both]">
            <div className="flex flex-row md:flex-col gap-8 md:gap-10 border-t md:border-t-0 md:border-l border-lime/30 pt-6 md:pt-0 md:pl-10">
              <div>
                <div className="font-display text-5xl md:text-6xl font-bold text-cream leading-none">270<span className="text-orange">+</span></div>
                <p className="text-xs tracking-[0.1em] uppercase text-white/40 mt-1">Children Supported</p>
              </div>
              <div>
                <div className="font-display text-5xl md:text-6xl font-bold text-cream leading-none">3</div>
                <p className="text-xs tracking-[0.1em] uppercase text-white/40 mt-1">Day Campaign</p>
              </div>
              <div>
                <div className="font-display text-5xl md:text-6xl font-bold text-lime leading-none">&infin;</div>
                <p className="text-xs tracking-[0.1em] uppercase text-white/40 mt-1">Smiles Created</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-cream" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
    </section>
  );
}
