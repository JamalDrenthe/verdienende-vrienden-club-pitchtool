import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Award, TrendingUp } from 'lucide-react';
import { PageView, Language, CalculatorState } from '../types';
import { translations } from '../translations';

interface BonusProps {
  onNavigate: (page: PageView) => void;
  language: Language;
  calcState?: CalculatorState;
  setPlacements?: (placements: number) => void;
}

export const Bonus: React.FC<BonusProps> = ({ onNavigate, language, calcState, setPlacements }) => {
  const t = translations[language].bonus;
  const [localPlacements, setLocalPlacements] = useState(5);

  const placements = calcState ? calcState.placements : localPlacements;
  const handlePlacementsChange = (val: number) => {
    if (setPlacements) setPlacements(val);
    else setLocalPlacements(val);
  };

  const bonusRate = 300;
  const bonusIncome = placements * bonusRate;

  // Cumulative metrics
  const hours = calcState ? calcState.hours : 40;
  const referrals = calcState ? calcState.referrals : 120;
  const refValue = calcState ? calcState.refValue : 25;
  const basisIncome = hours * 30;
  const passiveMonthly = referrals * refValue;
  const directSubtotal = basisIncome + bonusIncome;
  const grandTotal = directSubtotal + passiveMonthly;

  return (
    <div className="flex-grow px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)]">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Calculator */}
        <div className="order-2 md:order-1 sticky top-32">
          <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-rose-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight">{t.calcTitle}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{t.calcSubtitle}</p>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Pijler 2
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <label htmlFor="bonus-placements-slider" className="text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{t.placementsLabel}</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-pink-500 dark:text-pink-400 font-extrabold text-3xl">{placements}</span>
                    <span className="text-xs text-slate-400 font-medium">deals / mnd</span>
                  </div>
                </div>
                <input 
                  id="bonus-placements-slider"
                  type="range" 
                  min="0" 
                  max="20" 
                  step="1"
                  value={placements} 
                  onChange={(e) => handlePlacementsChange(parseInt(e.target.value) || 0)}
                  aria-label={t.placementsLabel}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-rose-400 transition-all"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                  <span>0 deals</span>
                  <span>5 ({t.placementsTarget})</span>
                  <span>20 deals</span>
                </div>
              </div>

              {/* Result Card */}
              <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/30 border border-pink-200 dark:border-pink-500/20 p-6 rounded-2xl text-center overflow-hidden mb-5">
                <div className="absolute top-0 right-0 w-28 h-28 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-extrabold mb-1">{t.resultLabel}</p>
                <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  €{bonusIncome.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{placements} succesvolle plaatsingen × €{bonusRate}/deal</p>
              </div>

              {/* Cumulative Subtotal (Pijler 1 + 2) */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-pink-500" />
                    Directe Maandinkomsten (Basis + Bonus):
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                    €{directSubtotal.toLocaleString('nl-NL')}<span className="text-[10px] text-slate-400 font-normal">/mnd</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                  <span>Basis: €{basisIncome} ({hours}u)</span>
                  <span>+</span>
                  <span className="text-pink-500 font-semibold">Bonus: €{bonusIncome} ({placements} deals)</span>
                  <span>•</span>
                  <span className="text-emerald-500">Totaal incl. passief: €{grandTotal}</span>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('basis')}
                  className="px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Basis</span>
                </button>
                <button 
                  onClick={() => onNavigate('passief')}
                  className="group flex-1 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 flex items-center justify-center gap-2"
                >
                  <span>{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-pink-500 dark:text-pink-400 tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">{t.subtitle}</p>

          <div className="space-y-4">
            {t.cards.map((card, idx) => (
              <div key={idx} className="relative p-5 bg-white dark:bg-[#0F1623] rounded-2xl border border-slate-200 dark:border-white/5 hover:border-pink-500/30 transition-all duration-200 pl-7 shadow-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-pink-500 to-rose-500 rounded-l-2xl" />
                <h3 className="text-slate-900 dark:text-white font-bold mb-1 text-sm">{card.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Bonus tier badge */}
          <div className="mt-8 p-4 rounded-2xl bg-pink-500/5 border border-pink-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-pink-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Directe plaatsingsfee per afgeronde deal:</span>
            </div>
            <span className="text-sm font-extrabold text-pink-600 dark:text-pink-400">€300,- netto bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
