import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
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
  const [localHours, setLocalHours] = useState(0);
  
  const hours = calcState ? calcState.hours : localHours;
  const handleHoursChange = (val: number) => {
    if (setHours) setHours(val);
    else setLocalHours(val);
  };

  const hourlyRate = 30;
  const income = hours * hourlyRate;

  // Cumulative metrics - default to 0
  const placements = calcState ? calcState.placements : 0;
  const referrals = calcState ? calcState.referrals : 0;
  const refValue = 25;
  const bonusIncome = placements * 300;
  const passiveMonthly = referrals * refValue;
  const grandTotal = income + bonusIncome + passiveMonthly;

  return (
    <div className="flex-grow px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)] bg-[#000000]">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[10px] font-black text-white tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(230,0,126,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e6007e] animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-3 text-white tracking-tight">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>
          </h2>
          <p className="text-[#888888] mb-8 text-sm leading-relaxed font-medium">{t.subtitle}</p>
          
          <div className="space-y-4">
            {t.steps.map((step) => (
              <div key={step.num} className="group flex gap-4 p-5 bg-[#0a0a0a] rounded-2xl border border-[#1c1c1c] hover:border-[#333333] transition-all duration-200 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e6007e] flex items-center justify-center text-white font-black text-xs shadow-md shadow-[#e6007e]/30">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-white font-extrabold mb-1 text-sm">{step.title}</h3>
                  <p className="text-xs text-[#888888] leading-relaxed font-medium">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick value banner — Brutalist VVC style */}
          <div className="mt-8 p-4 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e6007e]" />
              <span className="text-xs font-bold text-[#888888] uppercase tracking-wider">Gegarandeerde Uurvergoeding:</span>
            </div>
            <span className="text-sm font-black text-white">€30,- ex. btw / uur</span>
          </div>
        </div>

        {/* Right: Calculator */}
        <div className="sticky top-32">
          <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl shadow-2xl overflow-hidden">
            {/* Calculator Header */}
            <div className="bg-gradient-to-r from-[#e6007e] via-[#c00069] to-[#800045] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg tracking-tight">{t.calcTitle}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{t.calcSubtitle}</p>
                </div>
                <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  Pijler 1
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <label htmlFor="basis-hours-slider" className="text-[#888888] text-[10px] font-black uppercase tracking-[0.2em]">{t.hoursLabel}</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-black text-3xl tracking-tight">{hours}</span>
                    <span className="text-xs text-[#666666] font-medium">uur / week</span>
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
                  className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#666666] mt-2 font-medium">
                  <span>0 uur</span>
                  <span>40u ({t.hoursMin})</span>
                  <span>160u ({t.hoursFull})</span>
                </div>
              </div>

              {/* Result Card */}
              <div className="relative bg-[#0d0d0d] border border-[#1f1f1f] p-6 rounded-2xl text-center overflow-hidden mb-5">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#e6007e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl pointer-events-none" />
                <p className="text-[#777777] text-[10px] uppercase tracking-[0.25em] font-black mb-1">{t.resultLabel}</p>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">
                  €{income.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs text-[#888888] mt-1 font-medium">{hours} uur × €{hourlyRate}/uur basis per maand</p>
              </div>

              {/* Cumulative Combined Projection Bar */}
              <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#888888] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#e6007e]" />
                    Totale Maandprognose:
                  </span>
                  <span className="font-black text-white text-sm">
                    €{grandTotal.toLocaleString('nl-NL')}<span className="text-[10px] text-[#666666] font-normal">/mnd</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#666666]">
                  <span className="text-[#e6007e] font-bold">Basis: €{income}</span>
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
                  className="px-4 py-3.5 rounded-xl border border-[#222222] bg-[#0d0d0d] hover:bg-[#141414] text-white font-bold text-xs flex items-center gap-1 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Intro</span>
                </button>
                <button 
                  onClick={() => onNavigate('bonus')}
                  className="group flex-1 py-3.5 bg-[#e6007e] hover:bg-[#c00069] text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_32px_-8px_rgba(230,0,126,0.6)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.8)] flex items-center justify-center gap-2 active:scale-95"
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
