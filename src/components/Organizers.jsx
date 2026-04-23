import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function Organizers() {
  const t = useTranslation();

  return (
    <section className="pt-4 pb-12 md:pb-16 bg-sand text-center">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted mb-8">
            {t.organizers.label}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="flex flex-col items-center gap-3 group">
              <img
                src={`${import.meta.env.BASE_URL}logos/scc.svg`}
                alt="Smile of Cambodian Children"
                width="96"
                height="96"
                className="rounded-xl drop-shadow-md group-hover:scale-105 transition-transform bg-white p-3"
              />
              <span className="text-sm font-medium text-navy">Smile of Cambodian Children (SCC)</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <img
                src={`${import.meta.env.BASE_URL}logos/CamEd_Logo.png`}
                alt="CamEd Business School"
                width="96"
                height="96"
                className="rounded-xl drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="text-sm font-medium text-navy">{t.organizers.camed}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
