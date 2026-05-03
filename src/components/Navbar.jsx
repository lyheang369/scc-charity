import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const t = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // sync on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#mission', label: t.nav.mission },
    { href: '#impact', label: t.nav.impact },
    { href: '#event', label: t.nav.event },
    { href: '#help', label: t.nav.help },
    { href: '#team', label: t.nav.team },
  ];

  const closeMenu = () => setMenuOpen(false);

  // true = sitting on a dark surface (hero bg or open overlay)
  const isDark = menuOpen || !scrolled;

  const barColor = isDark ? 'bg-white' : 'bg-navy';

  return (
    <>
      {/* ── Top bar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${menuOpen ? 'bg-navy' : ''}`}>
        {/* Glass overlay — fades in/out via opacity so backdrop-filter doesn't flash */}
        {!menuOpen && (
          <div
            className={`absolute inset-0 -z-10 glass shadow-sm transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 gap-3">

          {/* ── Logo + event name ── */}
          <a href="#" onClick={closeMenu} className="flex items-center gap-2.5 shrink-0 min-w-0">
            <img
              src={`${import.meta.env.BASE_URL}logos/${isDark ? 'scc-white.svg' : 'scc.svg'}`}
              alt="SCC Logo"
              width="36"
              height="36"
              className="rounded-lg shrink-0 transition-opacity duration-300"
            />
            {/* Vertical rule separator */}
            <span className={`hidden xs:block h-7 w-px transition-colors duration-300 ${isDark ? 'bg-white/20' : 'bg-navy/20'}`} />
            {/* Two-line event name */}
            <div className="leading-none min-w-0">
              <span className={`block font-display text-[9px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${isDark ? 'text-lime' : 'text-green'}`}>
                Smile of
              </span>
              <span className={`block font-display text-[11px] md:text-xs font-bold tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-navy'}`}>
                Cambodian Children
              </span>
            </div>
          </a>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                  scrolled ? 'text-muted hover:text-navy' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2.5 shrink-0">
            <LanguageToggle dark={isDark} />

            <a
              href="#donate"
              className="hidden md:inline-flex items-center bg-linear-to-r from-orange to-orange-dark text-white text-xs font-semibold tracking-wide uppercase px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange/25 transition-all hover:-translate-y-0.5"
            >
              {t.nav.donate}
            </a>

            {/* Animated hamburger — 3 bars morph into × */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`block h-[2px] rounded-full origin-center transition-all duration-300 ease-in-out ${barColor} ${menuOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-6'}`} />
              <span className={`block h-[2px] rounded-full transition-all duration-200 ease-in-out mt-[5px] ${barColor} ${menuOpen ? 'w-0 opacity-0' : 'w-5'}`} />
              <span className={`block h-[2px] rounded-full origin-center transition-all duration-300 ease-in-out mt-[5px] ${barColor} ${menuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-6'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile overlay ── */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-navy flex flex-col md:hidden transition-opacity duration-500 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Nav links — stagger slide up */}
        <div className="flex flex-col px-7 pt-24 flex-1 overflow-y-auto">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center justify-between border-b border-white/10 py-5 group"
              style={{
                transition: `opacity 0.45s ease ${menuOpen ? i * 60 + 80 : 0}ms, transform 0.45s ease ${menuOpen ? i * 60 + 80 : 0}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <span className="text-[1.6rem] font-display font-bold text-white leading-tight group-hover:text-orange transition-colors duration-200">
                {link.label}
              </span>
              <span className="text-white/30 group-hover:text-orange transition-colors duration-200 text-lg">→</span>
            </a>
          ))}
        </div>

        {/* Bottom section — donate CTA */}
        <div
          className="px-7 pb-12 pt-6 shrink-0"
          style={{
            transition: `opacity 0.45s ease ${menuOpen ? '380ms' : '0ms'}, transform 0.45s ease ${menuOpen ? '380ms' : '0ms'}`,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <a
            href="#donate"
            onClick={closeMenu}
            className="block text-center bg-linear-to-r from-orange to-orange-dark text-white text-sm font-semibold tracking-widest uppercase py-4 rounded-full shadow-lg shadow-orange/20 active:scale-95 transition-transform"
          >
            {t.nav.donate}
          </a>
          <p className="text-center text-white/25 text-[10px] tracking-[0.2em] uppercase mt-6 font-medium">
            Smile of Cambodian Children
          </p>
        </div>
      </div>
    </>
  );
}
