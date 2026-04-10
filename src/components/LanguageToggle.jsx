import { useContext, useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'km', label: 'ខ្មែរ' },
];

/**
 * @param {{ dark?: boolean }} props
 * dark=true  → shown on dark navbar (hero / open menu)
 * dark=false → shown on light navbar (scrolled over cream/sand sections)
 */
export default function LanguageToggle({ dark = true }) {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LANGS.find((l) => l.code === language);

  const select = (code) => {
    if (code !== language) toggleLanguage();
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
          dark
            ? 'border-white/25 text-white hover:bg-white/10'
            : 'border-navy/20 text-navy hover:bg-navy/8'
        } ${open ? (dark ? 'bg-white/10' : 'bg-navy/8') : ''}`}
      >
        <Globe size={13} strokeWidth={2} />
        <span className="uppercase">{current.code}</span>
        <ChevronDown
          size={11}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Language options"
        className={`absolute right-0 top-[calc(100%+8px)] w-36 rounded-xl overflow-hidden shadow-xl border transition-all duration-200 origin-top-right z-50 ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        } bg-white border-navy/10`}
      >
        {/* Header */}
        <div className="px-3.5 pt-3 pb-2 border-b border-navy/8">
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-muted">Language</p>
        </div>

        {/* Options */}
        {LANGS.map(({ code, label }) => {
          const isActive = language === code;
          return (
            <button
              key={code}
              role="option"
              aria-selected={isActive}
              onClick={() => select(code)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-navy/5 text-navy font-semibold'
                  : 'text-muted hover:bg-sand hover:text-navy'
              }`}
            >
              <span>{label}</span>
              {isActive && <Check size={13} strokeWidth={2.5} className="text-green shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
