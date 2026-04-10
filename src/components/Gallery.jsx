import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function Gallery() {
  const t = useTranslation();

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-green block mb-3">{t.gallery.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-navy">{t.gallery.headline}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ScrollReveal key={i}>
              <div className="aspect-4/3 bg-sand rounded-lg flex items-center justify-center hover:bg-green/5 transition-colors">
                <span className="text-xs text-muted/50 font-medium tracking-wide">{t.gallery.placeholder}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
