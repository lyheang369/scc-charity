import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function Organizers() {
  const t = useTranslation();
  const o = t.organizers;

  const entries = [
    {
      role: o.organizedBy,
      name: o.scc,
      src: `${import.meta.env.BASE_URL}logos/scc.svg`,
      alt: 'Smile of Cambodian Children',
      pill: 'bg-orange/10 text-orange',
    },
    {
      role: o.supportedBy,
      name: o.camed,
      src: `${import.meta.env.BASE_URL}logos/CamEd_Logo.png`,
      alt: 'CamEd Business School',
      pill: 'bg-green/10 text-green',
    },
  ];

  return (
    <section className="pt-4 pb-12 md:pb-16 bg-sand">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-start justify-center gap-10 md:gap-16">
            {entries.map((e) => (
              <div
                key={e.alt}
                className="flex flex-col items-center text-center gap-4 group max-w-xs"
              >
                <span
                  className={`inline-block text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full ${e.pill}`}
                >
                  {e.role}
                </span>
                <img
                  src={e.src}
                  alt={e.alt}
                  width="96"
                  height="96"
                  className="group-hover:scale-105 transition-transform"
                />
                <span className="text-sm md:text-base font-semibold text-navy">{e.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
