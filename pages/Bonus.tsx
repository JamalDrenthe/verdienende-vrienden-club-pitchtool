import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Award, TrendingUp } from 'lucide-react';
import { PageView, Language, CalculatorState } from '../types';
import { translations } from '../translations';
import { TiltCard } from '../components/TiltCard';
import { GameRankBadge } from '../components/GameRankBadge';
import { sfx } from '../lib/soundFx';
import { fireConfetti } from '../lib/confetti';

interface BonusProps {
  onNavigate: (page: PageView) => void;
  language: Language;
  calcState?: CalculatorState;
  setPlacements?: (placements: number) => void;
}

export const Bonus: React.FC<BonusProps> = ({ onNavigate, language, calcState, setPlacements }) => {
  const t = translations[language].bonus;
  const [localPlacements, setLocalPlacements] = useState(0);

  const placements = calcState ? calcState.placements : localPlacements;
  const handlePlacementsChange = (val: number) => {
    sfx.tick();
    if (setPlacements) setPlacements(val);
    else setLocalPlacements(val);
  };

  const bonusRate = 300;
  const bonusIncome = placements * bonusRate;

  // Cumulative metrics - default to 0
  const hours = calcState ? calcState.hours : 0;
  const referrals = calcState ? calcState.referrals : 0;
  const refValue = 25;
  const basisIncome = hours * 30;
  const passiveMonthly = referrals * refValue;
  const directSubtotal = basisIncome + bonusIncome;
  const grandTotal = directSubtotal + passiveMonthly;

  const handleNextClick = () => {
    sfx.whoosh();
    fireConfetti();
    onNavigate('passief');
  };

  return (
    <div className="flex-grow px-4 sm:px-6 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)] bg-[#000000] relative">
      {/* 3D Stage Spotlight Effect */}
      <div className="absolute inset-0 game-spotlight pointer-events-none opacity-30" />

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start relative z-10">
        
        {/* Left Column: Calculator (Symmetrical & High Contrast) */}
        <div className="order-2 lg:order-1 sticky top-28">
          <TiltCard maxTilt={5} glowColor="magenta" className="bg-[#0a0a0a] border border-[#222222] rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#e6007e] via-[#c00069] to-[#800045] px-6 sm:px-8 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl tracking-tight">{t.calcTitle}</h3>
                  <p className="text-white/85 text-xs sm:text-sm mt-0.5">{t.calcSubtitle}</p>
                </div>
                <span className="bg-black/35 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  Level 2
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Slider Section */}
              <div className="mb-7">
                <div className="flex justify-between items-baseline mb-3">
                  <label htmlFor="bonus-placements-slider" className="text-[#a1a1aa] text-xs font-black uppercase tracking-[0.2em]">{t.placementsLabel}</label>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white font-black text-3xl sm:text-4xl tracking-tight tabular-nums">{placements}</span>
                    <span className="text-xs text-[#a1a1aa] font-medium">deals / mnd</span>
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
                  className="w-full h-2.5 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#e6007e]"
                />
                <div className="flex justify-between text-xs text-[#a1a1aa] mt-2.5 font-semibold">
                  <span>0 deals</span>
                  <span>5 ({t.placementsTarget})</span>
                  <span>20 deals</span>
                </div>
              </div>

              {/* Symmetrical Result Card */}
              <div className="relative bg-[#0d0d0d] border border-[#222222] p-6 rounded-2xl text-center overflow-hidden mb-6 shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6007e]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
                <p className="text-[#a1a1aa] text-[11px] uppercase tracking-[0.25em] font-black mb-1.5">{t.resultLabel}</p>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(230,0,126,0.5)]">
                  €{bonusIncome.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2 font-medium">
                  {placements} succesvolle plaatsingen × €{bonusRate}/deal
                </p>
              </div>

              {/* Gamified Level Rank Badge */}
              <div className="mb-6">
                <GameRankBadge monthlyTotal={grandTotal} />
              </div>

              {/* Cumulative Subtotal (Level 1 + 2) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0d0d0d] border border-[#222222] mb-6">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5">
                  <span className="font-bold text-[#a1a1aa] flex items-center gap-2 uppercase tracking-wider text-xs">
                    <TrendingUp className="w-4 h-4 text-[#e6007e]" />
                    Basis + Bonus:
                  </span>
                  <span className="font-black text-white text-base sm:text-lg tabular-nums">
                    €{directSubtotal.toLocaleString('nl-NL')}<span className="text-xs text-[#a1a1aa] font-medium">/mnd</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#a1a1aa] flex-wrap">
                  <span>Basis: €{basisIncome} ({hours}u)</span>
                  <span>+</span>
                  <span className="text-[#e6007e] font-bold">Bonus: €{bonusIncome} ({placements} deals)</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">Totaal incl. passief: €{grandTotal}</span>
                </div>
              </div>

              {/* Symmetrical Navigation CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sfx.whoosh();
                    onNavigate('basis');
                  }}
                  className="px-5 py-4 rounded-2xl border border-[#262626] bg-[#0d0d0d] hover:bg-[#161616] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Basis</span>
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

        {/* Right Column: Content (Symmetrical & High Contrast) */}
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2.5 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[11px] font-black text-white tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(230,0,126,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#e6007e] animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl sm:text-5xl font-black mb-4 text-white tracking-tight leading-[1.1] text-balance">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>
          </h2>
          <p className="text-[#d4d4d8] mb-8 text-sm sm:text-base leading-relaxed font-normal">{t.subtitle}</p>

          <div className="space-y-4">
            {t.cards.map((card, idx) => (
              <TiltCard key={idx} maxTilt={3} glowColor="none" className="relative p-6 bg-[#0a0a0a] rounded-2xl border border-[#202020] shadow-md">
                <div className="relative z-10">
                  <h3 className="text-white font-black mb-1.5 text-base tracking-tight">{card.title}</h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed font-normal">{card.text}</p>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Symmetrical Bonus Tier Badge */}
          <div className="mt-8 p-5 rounded-2xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#e6007e] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-[#a1a1aa] uppercase tracking-wider">Directe Fee per afgeronde deal:</span>
            </div>
            <span className="text-base sm:text-lg font-black text-white tabular-nums tracking-tight">€300 netto bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
