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
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-[#000000]">

      {/* VVC Ambient Magenta Glow & 3D Stage Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#e6007e]/15 via-[#e6007e]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#e6007e]/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 game-spotlight pointer-events-none opacity-25" />

      {/* === HERO === */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-14 pb-10 text-center relative z-10 max-w-5xl mx-auto w-full">
        
        {/* VVC Brutalist Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d0d0d] border border-[#222222] text-white text-[11px] font-black tracking-[0.25em] mb-8 uppercase shadow-[0_0_25px_rgba(230,0,126,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#e6007e] animate-pulse" />
          {t.pill}
        </div>
        
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.08] text-balance">
          {t.titlePrefix}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>
          {t.titleSuffix}
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#d4d4d8] max-w-2xl mx-auto mb-10 leading-relaxed font-normal text-balance">
          {t.subtitle}
        </p>
        
        {/* Symmetrical CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          <button 
            onClick={handlePitchNav}
            className="group w-full sm:w-56 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#e6007e] hover:bg-[#c00069] rounded-2xl text-white font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_8px_32px_-8px_rgba(230,0,126,0.65)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.85)] hover:-translate-y-0.5 active:scale-95"
          >
            <span>{t.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleBasisNav}
            className="group w-full sm:w-56 inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0a0a0a] border border-[#262626] hover:border-[#404040] hover:bg-[#141414] rounded-2xl text-white font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 active:scale-95"
          >
            <span>{t.ctaSecondary}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Symmetrical Stats Bar — Grid with Equal 3-Columns */}
        <TiltCard maxTilt={4} glowColor="magenta" className="w-full max-w-3xl bg-[#0a0a0a] rounded-2xl border border-[#222222] shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-[#222222] py-4 px-2 sm:px-6">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center py-2 px-1 text-center">
                <p className="text-2xl sm:text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-sm">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#a1a1aa] font-black uppercase tracking-[0.2em] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </TiltCard>
      </section>

      {/* === FEATURES + PROMISE (Symmetrical & High Contrast) === */}
      <section className="relative z-10 px-4 sm:px-6 pb-16 max-w-5xl mx-auto w-full">
        
        {/* Symmetrical Section Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#333333]" />
          <h2 className="text-[11px] font-black text-[#a1a1aa] uppercase tracking-[0.25em]">{t.featuresTitle}</h2>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#333333]" />
        </div>

        {/* Symmetrical Features Grid — Equal Heights */}
        <div className="grid md:grid-cols-3 gap-5 mb-6 items-stretch">
          {t.features.map((feat, idx) => {
            const Icon = featureIcons[idx];
            return (
              <TiltCard
                key={idx}
                maxTilt={5}
                glowColor="magenta"
                className="group/card relative bg-[#0a0a0a] border border-[#202020] rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#e6007e]/12 border border-[#e6007e]/30 flex items-center justify-center mb-5 group-hover/card:bg-[#e6007e] transition-colors shadow-inner">
                    <Icon className="w-6 h-6 text-[#e6007e] group-hover/card:text-white transition-colors" />
                  </div>
                  <h3 className="font-extrabold text-white text-base sm:text-lg mb-2 tracking-tight">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-normal">{feat.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-bold text-[#e6007e]">
                  <span className="uppercase tracking-wider">Pijler {idx + 1}</span>
                  <span className="group-hover/card:translate-x-1 transition-transform">→</span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Symmetrical Promise Bar */}
        <TiltCard maxTilt={3} glowColor="magenta" className="bg-[#0a0a0a] rounded-2xl border border-[#202020] p-6 sm:p-7 text-center relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#e6007e]/60" />
            <h3 className="text-[11px] font-black text-[#e6007e] uppercase tracking-[0.25em]">{t.promiseTitle}</h3>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#e6007e]/60" />
          </div>
          <p className="text-[#a1a1aa] leading-relaxed text-xs sm:text-sm max-w-xl mx-auto font-normal text-balance">
            {t.promiseText} <strong className="text-white font-extrabold">{t.system}</strong>{t.promiseSuffix}
          </p>
        </TiltCard>
      </section>

    </div>
  );
};
