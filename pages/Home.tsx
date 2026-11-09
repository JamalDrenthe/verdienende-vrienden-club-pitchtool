import React from 'react';
import { ArrowRight, ChevronRight, Phone, Users, TrendingUp } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';
import { TiltCard } from '../components/TiltCard';
import { sfx } from '../lib/soundFx';

interface HomeProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

const featureIcons = [Phone, Users, TrendingUp];

export const Home: React.FC<HomeProps> = ({ onNavigate, language }) => {
  const t = translations[language].home;

  const handlePitchNav = () => {
    sfx.whoosh();
    onNavigate('pitch');
  };

  const handleBasisNav = () => {
    sfx.whoosh();
    onNavigate('basis');
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col overflow-hidden bg-[#000000]">

      {/* VVC Ambient Magenta Glow & 3D Stage Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#e6007e]/12 via-[#e6007e]/4 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#e6007e]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 game-spotlight pointer-events-none opacity-25" />

      {/* === HERO === */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center relative z-10">
        
        {/* VVC Brutalist Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0d0d] border border-[#222222] text-white text-[10px] font-black tracking-[0.25em] mb-8 uppercase shadow-[0_0_20px_rgba(230,0,126,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6007e] animate-pulse" />
          {t.pill}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-5 tracking-tight leading-[1.05]">
          {t.titlePrefix}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6007e] via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>
          {t.titleSuffix}
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#888888] max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          {t.subtitle}
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-14">
          <button 
            onClick={handlePitchNav}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#e6007e] hover:bg-[#c00069] rounded-full text-white font-extrabold text-sm transition-all duration-300 shadow-[0_8px_32px_-8px_rgba(230,0,126,0.6)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.8)] hover:-translate-y-0.5 active:scale-95"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleBasisNav}
            className="group inline-flex items-center gap-2 px-6 py-4 bg-[#0a0a0a] border border-[#222222] hover:border-[#333333] hover:bg-[#121212] rounded-full text-white font-bold text-sm transition-all duration-300"
          >
            <span>{t.ctaSecondary}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Stats Bar — VVC Brutalist Tilt Card */}
        <TiltCard maxTilt={5} glowColor="magenta" className="bg-[#0a0a0a] px-6 py-4 rounded-2xl border border-[#1c1c1c] shadow-lg">
          <div className="flex items-center gap-4 md:gap-8">
            {t.stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="w-px h-10 bg-[#222222]" />}
                <div className="text-center px-2">
                  <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-[#777777] font-black uppercase tracking-[0.2em] mt-0.5">{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </TiltCard>
      </section>

      {/* === FEATURES + PROMISE === */}
      <section className="relative z-10 px-4 pb-16 max-w-5xl mx-auto w-full">
        
        {/* Features Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#333333]" />
          <h2 className="text-[10px] font-black text-[#777777] uppercase tracking-[0.25em]">{t.featuresTitle}</h2>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#333333]" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {t.features.map((feat, idx) => {
            const Icon = featureIcons[idx];
            return (
              <TiltCard
                key={idx}
                maxTilt={6}
                glowColor="magenta"
                className="group/card relative bg-[#0a0a0a] border border-[#1c1c1c] rounded-2xl p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e6007e]/10 border border-[#e6007e]/20 flex items-center justify-center mb-4 group-hover/card:bg-[#e6007e] transition-colors shadow-inner">
                  <Icon className="w-5 h-5 text-[#e6007e] group-hover/card:text-white transition-colors" />
                </div>
                <h3 className="font-extrabold text-white text-base mb-1.5">{feat.title}</h3>
                <p className="text-xs text-[#888888] leading-relaxed font-medium">{feat.desc}</p>
              </TiltCard>
            );
          })}
        </div>

        {/* Promise Bar */}
        <TiltCard maxTilt={3} glowColor="magenta" className="bg-[#0a0a0a] rounded-2xl border border-[#1c1c1c] p-6 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#e6007e]/50" />
            <h3 className="text-[10px] font-black text-[#e6007e] uppercase tracking-[0.25em]">{t.promiseTitle}</h3>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#e6007e]/50" />
          </div>
          <p className="text-[#888888] leading-relaxed text-xs max-w-lg mx-auto font-medium">
            {t.promiseText} <strong className="text-white font-extrabold">{t.system}</strong>{t.promiseSuffix}
          </p>
        </TiltCard>
      </section>

    </div>
  );
};
