import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, TrendingUp } from 'lucide-react';
import { PageView, Language, CalculatorState } from '../types';
import { translations } from '../translations';

interface BasisProps {
  onNavigate: (page: PageView) => void;
  language: Language;
  calcState?: CalculatorState;
  setHours?: (hours: number) => void;
}

export const Basis: React.FC<BasisProps> = ({ onNavigate, language, calcState, setHours }) => {
  const t = translations[language].basis;
  const [localHours, setLocalHours] = useState(40);
  
  const hours = calcState ? calcState.hours : localHours;
  const handleHoursChange = (val: number) => {
    if (setHours) setHours(val);
    else setLocalHours(val);
  };

  const hourlyRate = 30;
  const income = hours * hourlyRate;

  // Cumulative metrics
  const placements = calcState ? calcState.placements : 5;
  const referrals = calcState ? calcState.referrals : 120;
  const refValue = calcState ? calcState.refValue : 25;
  const bonusIncome = placements * 300;
  const passiveMonthly = referrals * refValue;
  const grandTotal = income + bonusIncome + passiveMonthly;

  return (
    <div className="flex-grow px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)]">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">{t.subtitle}</p>
          
          <div className="space-y-4">
            {t.steps.map((step) => (
              <div key={step.num} className="group flex gap-4 p-4 bg-white dark:bg-[#0F1623] rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-200 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold mb-1 text-sm">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick value banner */}
          <div className="mt-8 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Gegarandeerde uurvergoeding:</span>
            </div>
            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">€30,- ex. btw / uur</span>
          </div>
        </div>

        {/* Right: Calculator */}
        <div className="sticky top-32">
          <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Calculator Header */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight">{t.calcTitle}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{t.calcSubtitle}</p>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Pijler 1
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <label htmlFor="basis-hours-slider" className="text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">{t.hoursLabel}</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold text-3xl">{hours}</span>
                    <span className="text-xs text-slate-400 font-medium">uur / week</span>
                  </div>
                </div>
                <input 
                  id="basis-hours-slider"
                  type="range" 
                  min="0" 
                  max="160" 
                  step="1"
                  value={hours} 
                  onChange={(e) => handleHoursChange(parseInt(e.target.value) || 0)}
                  aria-label={t.hoursLabel}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-cyan-400 transition-all"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                  <span>0 uur</span>
                  <span>40u ({t.hoursMin})</span>
                  <span>160u ({t.hoursFull})</span>
                </div>
              </div>

              {/* Result Card */}
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-500/20 p-6 rounded-2xl text-center overflow-hidden mb-5">
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-extrabold mb-1">{t.resultLabel}</p>
                <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  €{income.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{hours} uur × €{hourlyRate}/uur basis per maand</p>
              </div>

              {/* Cumulative Combined Projection Bar */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    Totale Maandprognose (3 pijlers):
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                    €{grandTotal.toLocaleString('nl-NL')}<span className="text-[10px] text-slate-400 font-normal">/mnd</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                  <span className="text-blue-500 font-semibold">Basis: €{income}</span>
                  <span>•</span>
                  <span>Bonus: €{bonusIncome} ({placements} deals)</span>
                  <span>•</span>
                  <span>Passief: €{passiveMonthly}</span>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('pitch')}
                  className="px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Intro</span>
                </button>
                <button 
                  onClick={() => onNavigate('bonus')}
                  className="group flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
                >
                  <span>{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
