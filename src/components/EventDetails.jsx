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
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(340px,1.15fr)] gap-8 lg:gap-14 items-start">
          <ScrollReveal>
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange block mb-3">{t.event.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-6 md:mb-8">{t.event.headline}</h2>
            <div className="space-y-7 md:space-y-5">
              {info.map(({ icon: Icon, label, isList }, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green shrink-0 mt-0.5"><Icon size={18} /></div>
                  {isList ? (
                    <ul className="text-sm md:text-base text-navy-light space-y-1.5 list-disc pl-5 pt-0.5">
                      {label.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm md:text-base text-navy-light">{label}</span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl bg-navy shadow-xl lg:sticky lg:top-28">
              <div className="bg-white">
                <img
                  src={`${import.meta.env.BASE_URL}img/event-poster.jpg`}
                  alt="Smile of Cambodian Children event poster"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-5 md:p-6 text-cream">
                <p className="text-xs uppercase tracking-[0.18em] text-lime mb-2">Featured Poster</p>
                <p className="text-sm text-white/75 leading-relaxed">
                  Official campaign poster highlighting the event, location, partners, and donation drive.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

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
