import { Calendar, MapPin, Users } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function EventDetails() {
  const t = useTranslation();

  const info = [
    { icon: MapPin, label: t.event.location },
    { icon: Calendar, label: t.event.date },
    { icon: Users, label: t.event.organizer },
  ];

  return (
    <section id="event" className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <ScrollReveal>
            <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange block mb-3">{t.event.eyebrow}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight mb-8">{t.event.headline}</h2>
            <div className="space-y-5">
              {info.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green shrink-0"><Icon size={18} /></div>
                  <span className="text-sm md:text-base text-navy-light">{label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {t.event.days.map((day, i) => (
              <ScrollReveal key={i}>
                <div className="bg-warm-gray rounded-lg p-6 md:p-8 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-orange-dark text-white font-display font-bold text-lg flex items-center justify-center shrink-0">{i + 1}</div>
                    <div>
                      <h4 className="font-display font-semibold text-navy text-lg">
                        {day.title}<span className="text-muted font-normal ml-2">&mdash; {day.subtitle}</span>
                      </h4>
                      <p className="text-sm text-muted leading-relaxed mt-1">{day.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
