import { Eye, Target } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

export default function VisionMission() {
  const t = useTranslation();

  const cards = [
    { data: t.vision, icon: Eye, accent: 'green', topBar: 'bg-green' },
    { data: t.mission, icon: Target, accent: 'orange', topBar: 'bg-orange' },
  ];

  return (
    <section id="mission" className="section-padding bg-sand">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-orange block mb-3">What Drives Us</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy">
            Our <strong className="font-semibold">Vision</strong> & Mission
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {cards.map(({ data, icon: Icon, accent, topBar }, i) => (
            <ScrollReveal key={i}>
              <div className="relative bg-cream rounded-lg p-8 md:p-10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${topBar}`} />
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${accent === 'green' ? 'bg-green/10 text-green' : 'bg-orange/10 text-orange'}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-navy mb-3">{data.title}</h3>
                <p className="text-sm leading-relaxed text-muted mb-5">{data.text}</p>
                <ul className="space-y-3">
                  {data.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-navy-light leading-relaxed">
                      <span className={`mt-0.5 shrink-0 ${accent === 'green' ? 'text-green' : 'text-orange'}`}>&rarr;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
