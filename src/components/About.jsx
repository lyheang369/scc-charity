import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const t = useTranslation();

  return (
    <section id="about" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          <ScrollReveal className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium tracking-[0.18em] uppercase text-green">{t.about.eyebrow}</span>
              <span className="flex-1 h-px bg-green/20" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy leading-tight">
              {t.about.headline.split(',')[0]},
              <strong className="font-semibold text-green block">{t.about.headline.split(',')[1] || 'not a privilege.'}</strong>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-3">
            <p className="text-base md:text-lg leading-relaxed text-navy-light mb-5">{t.about.p1}</p>
            <p className="text-base md:text-lg leading-relaxed text-navy-light mb-6">{t.about.p2}</p>
            <div className="flex flex-wrap gap-2">
              {t.about.tags.map((tag, i) => (
                <span key={i} className={`text-xs font-medium tracking-wide px-3.5 py-1.5 rounded-sm text-white ${i === 0 ? 'bg-green' : i === 1 ? 'bg-orange' : 'bg-navy'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
