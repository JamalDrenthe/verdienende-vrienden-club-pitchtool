import React from 'react';
import { Briefcase, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';
import { TiltCard } from '../components/TiltCard';
import { sfx } from '../lib/soundFx';

interface PitchProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

const icons = [Briefcase, Zap, TrendingUp];

export const Pitch: React.FC<PitchProps> = ({ onNavigate, language }) => {
  const t = translations[language].pitch;
  const magenta = "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]";

  const handleNext = () => {
    sfx.whoosh();
    onNavigate('basis');
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-16 min-h-[calc(100vh-80px)] relative overflow-hidden bg-[#000000]">
      {/* VVC Ambient glow & Game Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#e6007e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 game-spotlight pointer-events-none opacity-30" />

      <div className="max-w-5xl w-full text-center relative z-10 mx-auto">
        {/* Symmetrical Badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[11px] font-black text-white tracking-[0.25em] uppercase mb-8 shadow-[0_0_20px_rgba(230,0,126,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#e6007e] animate-pulse" />
          {t.badge}
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-[1.1] text-white tracking-tight text-balance">
          {t.title1}<span className={magenta}>{t.titleHighlight1}</span>{t.title2}<span className={magenta}>{t.titleHighlight2}</span>{t.title3}
        </h2>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#d4d4d8] max-w-xl mx-auto mb-14 font-normal leading-relaxed text-balance">
          {t.subtitle}
        </p>
        
        {/* Symmetrical 3 Levels Grid | Equal Heights */}
        <div className="grid md:grid-cols-3 gap-6 mb-14 text-left items-stretch">
          {t.cards.map((card, idx) => {
            const Icon = icons[idx];
            return (
              <TiltCard
                key={card.num}
                maxTilt={6}
                glowColor="magenta"
                className="group relative p-7 bg-[#0a0a0a] rounded-2xl border border-[#202020] shadow-xl hover:shadow-[0_8px_32px_-8px_rgba(230,0,126,0.4)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-[#e6007e]/12 border border-[#e6007e]/30 rounded-xl flex items-center justify-center group-hover:bg-[#e6007e] transition-colors shadow-inner">
                      <Icon className="text-[#e6007e] group-hover:text-white w-6 h-6 transition-colors" />
                    </div>
                    <span className="text-xs font-black tracking-[0.2em] text-[#e6007e] bg-[#e6007e]/15 px-2.5 py-1 rounded-full border border-[#e6007e]/30">
                      {card.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-2.5 tracking-tight">{card.title}</h3>
                  <p className="text-[#a1a1aa] text-sm leading-relaxed font-normal">{card.desc}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-bold text-white/50 group-hover:text-[#e6007e] transition-colors">
                  <span>Bekijk Level</span>
                  <span>→</span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Centered Symmetrical CTA */}
        <button 
          onClick={handleNext}
          className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#e6007e] hover:bg-[#c00069] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] shadow-[0_8px_32px_-8px_rgba(230,0,126,0.65)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.85)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          <span>{t.cta}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
