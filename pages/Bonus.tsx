import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface BonusProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const Bonus: React.FC<BonusProps> = ({ onNavigate, language }) => {
  const t = translations[language].bonus;
  const [placements, setPlacements] = useState(5);
  const bonusRate = 300;
  const income = placements * bonusRate;

  return (
    <div className="flex-grow px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)]">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Calculator */}
        <div className="order-2 md:order-1 sticky top-28">
          <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4">
              <h3 className="text-white font-bold text-lg">{t.calcTitle}</h3>
              <p className="text-white/70 text-xs">{t.calcSubtitle}</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-slate-500 dark:text-slate-400 text-sm">{t.placementsLabel}</label>
                  <span className="text-pink-500 dark:text-pink-400 font-bold text-2xl">{placements}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  step="1"
                  value={placements} 
                  onChange={(e) => setPlacements(parseInt(e.target.value))}
                  aria-label={t.placementsLabel}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                  <span>0</span>
                  <span>{t.placementsTarget}</span>
                  <span>20</span>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-500/20 p-6 rounded-xl text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">{t.resultLabel}</p>
                <p className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  €{income.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{placements} × €{bonusRate}/plaatsing</p>
              </div>

              <button 
                onClick={() => onNavigate('passief')}
                className="group w-full mt-6 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white rounded-xl font-bold transition-all duration-300 shadow-md shadow-pink-500/20 hover:shadow-pink-500/30 flex items-center justify-center gap-2"
              >
                {t.cta}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-pink-500 dark:text-pink-400 tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            {t.badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">{t.subtitle}</p>

          <div className="space-y-4">
            {t.cards.map((card, idx) => (
              <div key={idx} className="relative p-5 bg-white dark:bg-[#0F1623] rounded-xl border border-slate-200 dark:border-white/5 hover:border-pink-500/30 transition-all duration-200 pl-7">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-pink-500 to-rose-500 rounded-l-xl" />
                <h4 className="text-slate-900 dark:text-white font-bold mb-1">{card.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
