import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const t = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#mission', label: t.nav.mission },
    { href: '#impact', label: t.nav.impact },
    { href: '#event', label: t.nav.event },
    { href: '#help', label: t.nav.help },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-18">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <img src={`${import.meta.env.BASE_URL}logos/scc-primary-logo.png`} alt="SCC Logo" width="40" height="40" className="rounded-lg" />
          <span className="font-display font-bold text-navy text-sm tracking-tight hidden sm:block">SCC</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs font-medium tracking-widest uppercase text-muted hover:text-navy transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href="#help" className="hidden sm:inline-flex items-center bg-gradient-to-r from-orange to-orange-dark text-white text-xs font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/25 transition-all hover:-translate-y-0.5">
            {t.nav.donate}
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-navy" aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-sand/50">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-navy py-2">
                {link.label}
              </a>
            ))}
            <a href="#help" onClick={() => setMenuOpen(false)} className="mt-2 text-center bg-gradient-to-r from-orange to-orange-dark text-white text-sm font-semibold py-3 rounded-full">
              {t.nav.donate}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
