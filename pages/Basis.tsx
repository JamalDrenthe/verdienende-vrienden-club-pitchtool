import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { PageView, Language, CalculatorState } from '../types';
import { translations } from '../translations';
import { TiltCard } from '../components/TiltCard';
import { GameRankBadge } from '../components/GameRankBadge';
import { sfx } from '../lib/soundFx';
import { fireConfetti } from '../lib/confetti';

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
    sfx.tick();
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

  const handleNextClick = () => {
    sfx.whoosh();
    fireConfetti();
    onNavigate('bonus');
  };

  return (
    <div className="flex-grow px-4 sm:px-6 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)] bg-[#000000] relative">
      {/* 3D Stage Spotlight Effect */}
      <div className="absolute inset-0 game-spotlight pointer-events-none opacity-30" />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start relative z-10">
        
        {/* Left Column: Content (Symmetrical & High Contrast) */}
        <div>
          <div className="inline-flex items-center gap-2.5 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[11px] font-black text-white tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(230,0,126,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#e6007e] animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl sm:text-5xl font-black mb-4 text-white tracking-tight leading-[1.1] text-balance">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>
          </h2>
          <p className="text-[#d4d4d8] mb-8 text-sm sm:text-base leading-relaxed font-normal">{t.subtitle}</p>
          
          <div className="space-y-4">
            {t.steps.map((step) => (
              <TiltCard key={step.num} maxTilt={3} glowColor="magenta" className="p-6 bg-[#0a0a0a] rounded-2xl border border-[#202020] shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#e6007e] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#e6007e]/35">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-white font-black mb-1.5 text-base tracking-tight">{step.title}</h3>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed font-normal">{step.text}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Quick Value Banner | Symmetrical Brutalist VVC Style */}
          <div className="mt-8 p-5 rounded-2xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#e6007e] shadow-[0_0_10px_rgba(230,0,126,0.8)]" />
              <span className="text-xs sm:text-sm font-bold text-[#a1a1aa] uppercase tracking-wider">Uurvergoeding:</span>
            </div>
            <span className="text-base sm:text-lg font-black text-white tabular-nums tracking-tight">€30,- per uur</span>
          </div>
        </div>

        {/* Right Column: Calculator (Symmetrical, High Contrast & Tabular) */}
        <div className="sticky top-28">
          <TiltCard maxTilt={5} glowColor="magenta" className="bg-[#0a0a0a] border border-[#222222] rounded-3xl shadow-2xl overflow-hidden">
            {/* Calculator Header */}
            <div className="bg-gradient-to-r from-[#e6007e] via-[#c00069] to-[#800045] px-6 sm:px-8 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl tracking-tight">{t.calcTitle}</h3>
                  <p className="text-white/85 text-xs sm:text-sm mt-0.5">{t.calcSubtitle}</p>
                </div>
                <span className="bg-black/35 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  Level 1
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Slider Section */}
              <div className="mb-7">
                <div className="flex justify-between items-baseline mb-3">
                  <label htmlFor="basis-hours-slider" className="text-[#a1a1aa] text-xs font-black uppercase tracking-[0.2em]">{t.hoursLabel}</label>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white font-black text-3xl sm:text-4xl tracking-tight tabular-nums">{hours}</span>
                    <span className="text-xs text-[#a1a1aa] font-medium">uur / week</span>
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
                  className="w-full h-2.5 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#e6007e]"
                />
                <div className="flex justify-between text-xs text-[#a1a1aa] mt-2.5 font-semibold">
                  <span>0 uur</span>
                  <span>40u ({t.hoursMin})</span>
                  <span>160u ({t.hoursFull})</span>
                </div>
              </div>

              {/* Symmetrical Result Card */}
              <div className="relative bg-[#0d0d0d] border border-[#222222] p-6 rounded-2xl text-center overflow-hidden mb-6 shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6007e]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                <p className="text-[#a1a1aa] text-[11px] uppercase tracking-[0.25em] font-black mb-1.5">{t.resultLabel}</p>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(230,0,126,0.5)]">
                  €{income.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2 font-medium">
                  {hours} uur × €{hourlyRate}/uur basis per maand
                </p>
              </div>

              {/* Gamified Level Rank Badge */}
              <div className="mb-6">
                <GameRankBadge monthlyTotal={grandTotal} />
              </div>

              {/* Cumulative Combined Projection Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0d0d0d] border border-[#222222] mb-6">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5">
                  <span className="font-bold text-[#a1a1aa] flex items-center gap-2 uppercase tracking-wider text-xs">
                    <Sparkles className="w-4 h-4 text-[#e6007e] animate-pulse" />
                    Prognose:
                  </span>
                  <span className="font-black text-white text-base sm:text-lg tabular-nums">
                    €{grandTotal.toLocaleString('nl-NL')}<span className="text-xs text-[#a1a1aa] font-medium">/mnd</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#a1a1aa] flex-wrap">
                  <span className="text-[#e6007e] font-bold">Basis: €{income}</span>
                  <span>•</span>
                  <span>Bonus: €{bonusIncome} ({placements} deals)</span>
                  <span>•</span>
                  <span>Passief: €{passiveMonthly}</span>
                </div>
              </div>

              {/* Symmetrical Navigation CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sfx.whoosh();
                    onNavigate('pitch');
                  }}
                  className="px-5 py-4 rounded-2xl border border-[#262626] bg-[#0d0d0d] hover:bg-[#161616] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Intro</span>
                </button>
                <button 
                  onClick={handleNextClick}
                  className="group flex-1 py-4 bg-[#e6007e] hover:bg-[#c00069] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_8px_32px_-8px_rgba(230,0,126,0.65)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.85)] flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.01]"
                >
                  <span>{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
