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
      logoBg: 'bg-white p-3',
      pill: 'bg-orange/10 text-orange',
    },
    {
      role: o.supportedBy,
      name: o.camed,
      src: `${import.meta.env.BASE_URL}logos/CamEd_Logo.png`,
      alt: 'CamEd Business School',
      logoBg: '',
      pill: 'bg-green/10 text-green',
    },
  ];

  return (
    <section className="pt-4 pb-12 md:pb-16 bg-sand">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {entries.map((e) => (
              <div
                key={e.alt}
                className="bg-white rounded-2xl px-6 py-7 md:py-8 shadow-sm shadow-navy/5 flex flex-col items-center text-center gap-4 group hover:-translate-y-0.5 transition-transform duration-200"
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
                  className={`rounded-xl drop-shadow-md group-hover:scale-105 transition-transform ${e.logoBg}`}
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
