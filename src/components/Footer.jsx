import { Send, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const t = useTranslation();

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#mission', label: t.nav.mission },
    { href: '#impact', label: t.nav.impact },
    { href: '#event', label: t.nav.event },
    { href: '#help', label: t.nav.help },
  ];

  return (
    <footer className="bg-navy pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={`${import.meta.env.BASE_URL}logos/scc-white.svg`} alt="SCC" width="36" height="36" className="rounded-lg" />
              <span className="font-display font-bold text-cream text-sm">Smile of Cambodian Children</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.12em] uppercase text-white/30 mb-4">{t.footer.links}</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/55 hover:text-lime transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.12em] uppercase text-white/30 mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://t.me/thearysrms" className="flex items-center gap-3 text-sm text-white/55 hover:text-lime transition-colors">
                  <Send size={14} /> @thearysrms
                </a>
              </li>
              <li>
                <a href="mailto:ssotheary26@cam-ed.com" className="flex items-center gap-3 text-sm text-white/55 hover:text-lime transition-colors">
                  <Mail size={14} /> ssotheary26@cam-ed.com
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/18Ws4jj6ht/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/55 hover:text-lime transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {t.help.facebookPage}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/8">
          <p className="text-xs text-white/25">{t.footer.copyright}</p>
          <p className="text-xs text-white/20">{t.footer.camed}</p>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-navy-light border border-white/15" />
            <span className="w-2 h-2 rounded-full bg-green" />
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="w-2 h-2 rounded-full bg-lime" />
          </div>
        </div>
      </div>
    </footer>
  );
}
