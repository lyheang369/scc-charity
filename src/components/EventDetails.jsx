import { Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function EventDetails() {
  const t = useTranslation();

  const info = [
    { icon: MapPin, label: t.event.location, isList: Array.isArray(t.event.location) },
    { icon: Calendar, label: t.event.date, isList: false },
    { icon: Users, label: t.event.organizer, isList: Array.isArray(t.event.organizer) },
  ];

  return (
    <section id="event" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange block mb-3">{t.event.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6 md:mb-8">{t.event.headline}</h2>
            <div className="space-y-4 md:space-y-5">
              {info.map(({ icon: Icon, label, isList }, i) => (
                <div key={i} className="grid grid-cols-[3.5rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)] gap-4 md:gap-5 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green/10 flex items-center justify-center text-green shrink-0">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  {isList ? (
                    <ul className="text-base md:text-lg text-navy-light leading-relaxed space-y-1.5 pt-1">
                      {label.map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-navy-light/80 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-base md:text-lg text-navy-light leading-relaxed pt-3">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3 mt-8 md:mt-12">
          {t.event.days.map((day, i) => (
            <ScrollReveal key={i}>
              <div className="h-full bg-warm-gray rounded-lg p-6 md:p-7 hover:-translate-y-0.5 hover:shadow-md transition-all">
                <div className="flex items-start gap-5 md:block">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange to-orange-dark text-white font-display font-bold text-lg flex items-center justify-center shrink-0 md:mb-5">{i + 1}</div>
                  <div>
                    <h4 className="font-display font-semibold text-navy text-lg">
                      {day.title}<span className="block text-muted font-normal mt-0.5">{day.subtitle}</span>
                    </h4>
                    <p className="text-sm text-muted leading-relaxed mt-2">{day.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
