import React from 'react';
import { Briefcase, TrendingUp, ChevronRight, Zap } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface PitchProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

const icons = [Briefcase, Zap, TrendingUp];
const accents = ['pink', 'blue', 'cyan'];

const accentMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'hover:border-pink-500/40', glow: 'group-hover:shadow-pink-500/10' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'hover:border-blue-500/40', glow: 'group-hover:shadow-blue-500/10' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'hover:border-cyan-500/40', glow: 'group-hover:shadow-cyan-500/10' },
};

export const Pitch: React.FC<PitchProps> = ({ onNavigate, language }) => {
  const t = translations[language].pitch;
  const pink = "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500";

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16 min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-pink-500 dark:text-pink-400 tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          {t.badge}
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-[1.1] text-slate-900 dark:text-white tracking-tight">
          {t.title1}<span className={pink}>{t.titleHighlight1}</span>{t.title2}<span className={pink}>{t.titleHighlight2}</span>{t.title3}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-12 text-sm md:text-base">
          {t.subtitle}
        </p>
        
        <div className="grid md:grid-cols-3 gap-5 mb-14 text-left">
          {t.cards.map((card, idx) => {
            const a = accentMap[accents[idx]];
            const Icon = icons[idx];
            return (
              <div key={card.num} className={`group relative p-6 bg-white dark:bg-[#0F1623] rounded-2xl border border-slate-200 dark:border-white/5 ${a.border} transition-all duration-300 shadow-sm hover:shadow-xl ${a.glow} hover:-translate-y-1`}>
                <span className={`absolute top-4 right-4 text-[10px] font-bold tracking-widest ${a.text} opacity-40`}>{card.num}</span>
                <div className={`w-11 h-11 ${a.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`${a.text} w-5 h-5`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => onNavigate('basis')}
          className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white rounded-full font-bold text-base shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 hover:-translate-y-0.5"
        >
          {t.cta}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};