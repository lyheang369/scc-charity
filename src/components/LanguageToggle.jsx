import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center rounded-full text-xs font-medium tracking-wide overflow-hidden"
      aria-label="Toggle language"
    >
      <span
        className={`px-2.5 py-1.5 transition-colors ${
          language === 'en' ? 'bg-navy text-white' : 'bg-sand text-muted'
        }`}
      >
        EN
      </span>
      <span
        className={`px-2.5 py-1.5 transition-colors ${
          language === 'km' ? 'bg-navy text-white' : 'bg-sand text-muted'
        }`}
      >
        KM
      </span>
    </button>
  );
}
