import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';
import ResponsiveImage from './ResponsiveImage';

export default function SponsorStrip() {
  const t = useTranslation();
  const s = t.sponsors;

  const typeLabel = {
    inKind: s.typeInKind,
    financial: s.typeFinancial,
  };

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-6 md:mb-8">
          <span className="text-[11px] md:text-xs font-medium tracking-[0.22em] uppercase text-orange">
            {s.stripEyebrow}
          </span>
        </ScrollReveal>
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 gap-y-6">
            {s.brands.map((brand) => (
              <a
                key={brand.key}
                href="#sponsors"
                className="group flex items-center gap-3 md:gap-4"
              >
                <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-cream flex items-center justify-center p-2 group-hover:-translate-y-0.5 transition-transform duration-200">
                  <ResponsiveImage
                    webpSrc={`${import.meta.env.BASE_URL}logos/${brand.key}.webp`}
                    fallbackSrc={`${import.meta.env.BASE_URL}logos/${brand.key}.png`}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-navy text-sm md:text-base leading-tight group-hover:text-orange transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-muted mt-1">
                    {typeLabel[brand.type]}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
