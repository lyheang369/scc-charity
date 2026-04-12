import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function Team() {
  const t = useTranslation();
  const tm = t.team;

  return (
    <section id="team" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange block mb-3">{tm.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy">
            {tm.headline.split(' ').slice(0, -1).join(' ')}{' '}
            <strong className="font-semibold">{tm.headline.split(' ').slice(-1)}</strong>
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-xl mx-auto mt-4">{tm.description}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-navy/10 border border-navy/6 max-w-3xl mx-auto">
            <img
              src={`${import.meta.env.BASE_URL}img/All_group_Members_image.JPEG`}
              alt={tm.photoCaption}
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-center text-sm text-muted mt-4 tracking-wide">{tm.photoCaption}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
