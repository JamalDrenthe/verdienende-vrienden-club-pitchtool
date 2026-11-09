import React from 'react';
import { Briefcase, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface PitchProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

const icons = [Briefcase, Zap, TrendingUp];

export const Pitch: React.FC<PitchProps> = ({ onNavigate, language }) => {
  const t = translations[language].pitch;
  const magenta = "text-transparent bg-clip-text bg-gradient-to-r from-[#e6007e] via-[#ff2a9d] to-[#e6007e]";

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16 min-h-[calc(100vh-80px)] relative overflow-hidden bg-[#000000]">
      {/* VVC Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e6007e]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[10px] font-black text-white tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(230,0,126,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6007e] animate-pulse" />
          {t.badge}
        </div>

        <h2 className="text-4xl md:text-6xl font-black mb-4 leading-[1.1] text-white tracking-tight">
          {t.title1}<span className={magenta}>{t.titleHighlight1}</span>{t.title2}<span className={magenta}>{t.titleHighlight2}</span>{t.title3}
        </h2>
        <p className="text-[#888888] max-w-lg mx-auto mb-12 text-sm md:text-base font-medium">
          {t.subtitle}
        </p>
        
        <div className="grid md:grid-cols-3 gap-5 mb-14 text-left">
          {t.cards.map((card, idx) => {
            const Icon = icons[idx];
            return (
              <div 
                key={card.num} 
                className="group relative p-6 bg-[#0a0a0a] rounded-2xl border border-[#1c1c1c] hover:border-[#e6007e]/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_32px_-8px_rgba(230,0,126,0.35)] hover:-translate-y-1"
              >
                <span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.2em] text-[#e6007e] opacity-60">{card.num}</span>
                <div className="w-11 h-11 bg-[#e6007e]/10 border border-[#e6007e]/25 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#e6007e] transition-colors">
                  <Icon className="text-[#e6007e] group-hover:text-white w-5 h-5 transition-colors" />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-2">{card.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed font-medium">{card.desc}</p>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => onNavigate('basis')}
          className="group inline-flex items-center gap-2 px-10 py-4 bg-[#e6007e] hover:bg-[#c00069] text-white rounded-full font-black text-sm uppercase tracking-wider shadow-[0_8px_32px_-8px_rgba(230,0,126,0.6)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.8)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          <span>{t.cta}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
