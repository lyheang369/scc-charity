import { Heart, Sparkles } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';
import ResponsiveImage from './ResponsiveImage';

export default function Sponsors() {
  const t = useTranslation();
  const s = t.sponsors;

  const typeMeta = {
    inKind: {
      label: s.typeInKind,
      icon: Sparkles,
      badge: 'bg-lime-soft text-navy',
      ring: 'ring-lime/30',
    },
    financial: {
      label: s.typeFinancial,
      icon: Heart,
      badge: 'bg-orange/15 text-orange',
      ring: 'ring-orange/25',
    },
  };

  return (
    <section id="sponsors" className="section-padding bg-warm-gray">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange block mb-3">{s.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy">
            {s.headline.split(' ').slice(0, -1).join(' ')}{' '}
            <strong className="font-semibold">{s.headline.split(' ').slice(-1)}</strong>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-2xl mx-auto mt-4">{s.description}</p>
        </ScrollReveal>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {s.brands.map((brand) => {
            const meta = typeMeta[brand.type];
            const Icon = meta.icon;
            return (
              <ScrollReveal key={brand.key}>
                <div className={`group h-full bg-white rounded-2xl p-6 md:p-8 shadow-md shadow-navy/5 ring-1 ${meta.ring} hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300`}>
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start">
                    <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-cream flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                      <ResponsiveImage
                        webpSrc={`${import.meta.env.BASE_URL}logos/${brand.key}.webp`}
                        fallbackSrc={`${import.meta.env.BASE_URL}logos/${brand.key}.png`}
                        alt={`${brand.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full mb-2.5 ${meta.badge}`}>
                        <Icon size={11} strokeWidth={2.5} />
                        {meta.label}
                      </span>
                      <h3 className="font-display font-semibold text-navy text-xl md:text-2xl mb-2">{brand.name}</h3>
                      <p className="text-sm md:text-base text-muted leading-relaxed">{brand.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
