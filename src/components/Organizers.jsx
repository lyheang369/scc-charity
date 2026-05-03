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
      bg: 'bg-white p-3',
    },
    {
      role: o.supportedBy,
      name: o.camed,
      src: `${import.meta.env.BASE_URL}logos/CamEd_Logo.png`,
      alt: 'CamEd Business School',
      bg: '',
    },
  ];

  return (
    <section className="pt-4 pb-12 md:pb-16 bg-sand text-center">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-start justify-center gap-10 md:gap-16">
            {entries.map((e) => (
              <div key={e.alt} className="flex flex-col items-center gap-3 group max-w-xs">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-orange">
                  {e.role}
                </span>
                <img
                  src={e.src}
                  alt={e.alt}
                  width="96"
                  height="96"
                  className={`rounded-xl drop-shadow-md group-hover:scale-105 transition-transform ${e.bg}`}
                />
                <span className="text-sm font-medium text-navy">{e.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
