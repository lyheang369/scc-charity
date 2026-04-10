import { Heart, Handshake, Share2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

const icons = [Heart, Handshake, Share2];
const styles = [
  { bg: 'bg-orange/10', icon: 'text-orange', cta: 'bg-gradient-to-r from-orange to-orange-dark text-white hover:shadow-orange/25' },
  { bg: 'bg-green/10', icon: 'text-green', cta: 'bg-green text-white hover:shadow-green/25' },
  { bg: 'bg-lime-soft', icon: 'text-lime', cta: 'bg-navy text-white hover:shadow-navy/25' },
];

export default function HowToHelp() {
  const t = useTranslation();

  return (
    <section id="help" className="section-padding bg-sand">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <ScrollReveal className="max-w-2xl mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-navy leading-tight mb-4">{t.help.headline}</h2>
          <p className="text-base md:text-lg text-muted leading-relaxed">{t.help.description}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {t.help.cards.map((card, i) => {
            const Icon = icons[i];
            const style = styles[i];
            return (
              <ScrollReveal key={i}>
                <div className="bg-cream rounded-lg p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${style.bg} ${style.icon}`}><Icon size={22} /></div>
                  <h3 className="font-display text-xl font-semibold text-navy mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 flex-1">{card.desc}</p>
                  <a href="#" className={`inline-flex items-center justify-center text-xs font-semibold tracking-wide uppercase px-5 py-3 rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5 ${style.cta}`}>
                    {card.cta}
                  </a>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 md:mt-16">
          <div className="glass-dark rounded-lg p-8 md:p-10 grid md:grid-cols-3 gap-6">
            <a href="https://t.me/thearysrms" className="flex items-center gap-4 text-cream hover:text-lime transition-colors">
              <div className="w-10 h-10 rounded-full bg-lime-soft flex items-center justify-center shrink-0"><span className="text-lg">✈</span></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/35">Telegram</div>
                <div className="text-sm font-medium">@thearysrms</div>
              </div>
            </a>
            <a href="mailto:ssotheary26@cam-ed.com" className="flex items-center gap-4 text-cream hover:text-lime transition-colors">
              <div className="w-10 h-10 rounded-full bg-lime-soft flex items-center justify-center shrink-0"><span className="text-lg">✉</span></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/35">Email</div>
                <div className="text-sm font-medium">ssotheary26@cam-ed.com</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-4 text-cream hover:text-lime transition-colors">
              <div className="w-10 h-10 rounded-full bg-lime-soft flex items-center justify-center shrink-0"><span className="text-lg">f</span></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/35">Facebook</div>
                <div className="text-sm font-medium font-khmer">{'\u179f\u17d2\u1793\u17b6\u1798\u1789\u1789\u17b9\u1798\u1793\u17c3\u1780\u17bb\u1798\u17b6\u179a\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6'}</div>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
