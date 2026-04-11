import { Heart, Handshake, Share2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import ScrollReveal from './ScrollReveal';

const icons = [Heart, Handshake, Share2];
const styles = [
  { bg: 'bg-orange/10', icon: 'text-orange', cta: 'bg-linear-to-r from-orange to-orange-dark text-white hover:shadow-orange/25' },
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
              <div className="w-10 h-10 rounded-full bg-lime-soft flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/35">Telegram</div>
                <div className="text-sm font-medium">@thearysrms</div>
              </div>
            </a>
            <a href="mailto:ssotheary26@cam-ed.com" className="flex items-center gap-4 text-cream hover:text-lime transition-colors">
              <div className="w-10 h-10 rounded-full bg-lime-soft flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/35">Email</div>
                <div className="text-sm font-medium">ssotheary26@cam-ed.com</div>
              </div>
            </a>
            <a href="https://www.facebook.com/share/18Ws4jj6ht/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-cream hover:text-lime transition-colors">
              <div className="w-10 h-10 rounded-full bg-lime-soft flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/35">Facebook</div>
                <div className="text-sm font-medium">{t.help.facebookPage}</div>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
