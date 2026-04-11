import { BookOpen, Pencil, ShoppingBag, Package } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import ScrollReveal from './ScrollReveal';

// Icon mapped by supply index — order matches content.js supplies array
const SUPPLY_ICONS = [BookOpen, Pencil, ShoppingBag, Package];

// Parses "270+" → { value: 270, suffix: "+" }
function parseStat(str) {
  const match = str.match(/^(\d+)(.*)$/);
  return match
    ? { value: parseInt(match[1], 10), suffix: match[2] }
    : { value: 0, suffix: str };
}

function StatCard({ stat, started }) {
  const { value, suffix } = parseStat(stat.number);
  const count = useCountUp(value, { started, duration: 1800 });

  return (
    <div className="bg-navy/80 p-8 md:p-10 text-center hover:bg-green/10 transition-colors">
      <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-none mb-2 tabular-nums">
        {count}<span>{suffix}</span>
      </div>
      <div className="text-xs tracking-[0.12em] uppercase text-white/40 font-medium mb-3">{stat.label}</div>
      <p className="text-sm text-white/55 leading-relaxed max-w-xs mx-auto">{stat.desc}</p>
    </div>
  );
}

export default function Impact() {
  const t = useTranslation();
  const { ref: statsRef, isInView } = useInView(0.25);

  return (
    <section id="impact" className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_30%_60%,rgba(17,196,212,0.2),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(12,129,228,0.12),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-lime block mb-3">{t.impact.eyebrow}</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-cream">
            {t.impact.headline.split(' ').slice(0, -1).join(' ')}{' '}
            <strong className="font-semibold text-lime">{t.impact.headline.split(' ').slice(-1)}</strong>
          </h2>
        </ScrollReveal>

        {/* Stats grid — single ref triggers all counters together */}
        <div
          ref={statsRef}
          className="grid md:grid-cols-3 gap-px bg-lime/10 rounded-lg overflow-hidden mb-10"
        >
          {t.impact.stats.map((stat, i) => (
            <StatCard key={i} stat={stat} started={isInView} />
          ))}
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.impact.supplies.map((supply, i) => {
              const Icon = SUPPLY_ICONS[i] ?? Package;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 bg-white/5 border border-lime/15 rounded-2xl p-6 hover:bg-lime/10 hover:border-lime/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-lime-soft flex items-center justify-center text-lime group-hover:scale-110 transition-transform duration-300">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-lime/80 text-center leading-snug tracking-wide">
                    {supply}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
