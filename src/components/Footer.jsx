import { Send, Mail, Globe } from 'lucide-react';
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
              <img src="/logos/scc-primary-logo.png" alt="SCC" width="36" height="36" className="rounded-lg" />
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
                <a href="#" className="flex items-center gap-3 text-sm text-white/55 hover:text-lime transition-colors">
                  <Globe size={14} /> {'\u179f\u17d2\u1793\u17b6\u1798\u1789\u1789\u17b9\u1798\u1793\u17c3\u1780\u17bb\u1798\u17b6\u179a\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6'}
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
