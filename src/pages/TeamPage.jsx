import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import Navbar from '../components/Navbar';

export default function TeamPage() {
  const t = useTranslation();
  const tm = t.team;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-navy pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_60%_50%,rgba(17,196,212,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(79,231,175,0.1),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <span className="text-xs font-medium tracking-[0.18em] uppercase text-lime block mb-3">{tm.eyebrow}</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-4">
            {tm.headline}
          </h1>
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            {tm.description}
          </p>
        </div>
      </div>

      {/* Group photo */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy/15 border border-navy/8">
          <img
            src={`${import.meta.env.BASE_URL}img/All_group_Members_image.JPEG`}
            alt={tm.photoCaption}
            className="w-full h-auto object-cover"
          />
        </div>
        <p className="text-center text-sm text-muted mt-4 tracking-wide">{tm.photoCaption}</p>

        {/* Back link */}
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}
            className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} /> {tm.backLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
