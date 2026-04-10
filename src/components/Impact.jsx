import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function Impact() {
  const t = useTranslation();

  return (
    <section id="impact" className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_30%_60%,rgba(2,117,46,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(255,102,2,0.1),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-lime block mb-3">{t.impact.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-cream">
            {t.impact.headline.split(' ').slice(0, -1).join(' ')}{' '}
            <strong className="font-semibold text-lime">{t.impact.headline.split(' ').slice(-1)}</strong>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-px bg-lime/10 rounded-lg overflow-hidden mb-10">
          {t.impact.stats.map((stat, i) => (
            <ScrollReveal key={i}>
              <div className="bg-navy/80 p-8 md:p-10 text-center hover:bg-green/10 transition-colors">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-none mb-2">{stat.number}</div>
                <div className="text-xs tracking-[0.12em] uppercase text-white/40 font-medium mb-3">{stat.label}</div>
                <p className="text-sm text-white/55 leading-relaxed max-w-xs mx-auto">{stat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="flex justify-center gap-3 flex-wrap">
          {t.impact.supplies.map((supply, i) => (
            <span key={i} className="flex items-center gap-2 bg-lime-soft text-lime text-xs font-medium tracking-wide px-4 py-2 rounded-full border border-lime/20">
              {supply}
            </span>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
