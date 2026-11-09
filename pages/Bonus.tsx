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
    <div className="flex-grow px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)] bg-[#000000] relative">
      {/* 3D Stage Spotlight Effect */}
      <div className="absolute inset-0 game-spotlight pointer-events-none opacity-30" />

      <div className="grid md:grid-cols-2 gap-12 items-start relative z-10">
        
        {/* Left: Calculator */}
        <div className="order-2 md:order-1 sticky top-32">
          <TiltCard maxTilt={6} glowColor="magenta" className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#e6007e] via-[#c00069] to-[#800045] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg tracking-tight">{t.calcTitle}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{t.calcSubtitle}</p>
                </div>
                <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  Pijler 2
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <label htmlFor="bonus-placements-slider" className="text-[#888888] text-[10px] font-black uppercase tracking-[0.2em]">{t.placementsLabel}</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-black text-3xl tracking-tight">{placements}</span>
                    <span className="text-xs text-[#666666] font-medium">deals / mnd</span>
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
                <div className="flex justify-between text-[11px] text-[#666666] mt-2 font-medium">
                  <span>0 deals</span>
                  <span>5 ({t.placementsTarget})</span>
                  <span>20 deals</span>
                </div>
              </div>

              {/* Result Card */}
              <div className="relative bg-[#0d0d0d] border border-[#1f1f1f] p-6 rounded-2xl text-center overflow-hidden mb-5">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#e6007e]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl pointer-events-none" />
                <p className="text-[#777777] text-[10px] uppercase tracking-[0.25em] font-black mb-1">{t.resultLabel}</p>
                <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(230,0,126,0.6)]">
                  €{bonusIncome.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs text-[#888888] mt-1 font-medium">{placements} succesvolle plaatsingen × €{bonusRate}/deal</p>
              </div>

              {/* Gamified Level Rank Badge */}
              <div className="mb-5">
                <GameRankBadge monthlyTotal={grandTotal} />
              </div>

              {/* Cumulative Subtotal (Pijler 1 + 2) */}
              <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f] mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#888888] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#e6007e]" />
                    Directe Maandinkomsten (Basis + Bonus):
                  </span>
                  <span className="font-black text-white text-sm">
                    €{directSubtotal.toLocaleString('nl-NL')}<span className="text-[10px] text-[#666666] font-normal">/mnd</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#666666]">
                  <span>Basis: €{basisIncome} ({hours}u)</span>
                  <span>+</span>
                  <span className="text-[#e6007e] font-bold">Bonus: €{bonusIncome} ({placements} deals)</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Totaal incl. passief: €{grandTotal}</span>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sfx.whoosh();
                    onNavigate('basis');
                  }}
                  className="px-4 py-3.5 rounded-xl border border-[#222222] bg-[#0d0d0d] hover:bg-[#141414] text-white font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Basis</span>
                </button>
                <button 
                  onClick={handleNextClick}
                  className="group flex-1 py-3.5 bg-[#e6007e] hover:bg-[#c00069] text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_32px_-8px_rgba(230,0,126,0.6)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.8)] flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.01]"
                >
                  <span>{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right: Content */}
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[10px] font-black text-white tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(230,0,126,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e6007e] animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-3 text-white tracking-tight">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>
          </h2>
          <p className="text-[#888888] mb-8 text-sm leading-relaxed font-medium">{t.subtitle}</p>

          <div className="space-y-4">
            {t.cards.map((card, idx) => (
              <TiltCard key={idx} maxTilt={4} glowColor="magenta" className="p-5 bg-[#0a0a0a] rounded-2xl border border-[#1c1c1c] pl-7 shadow-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#e6007e] rounded-l-2xl shadow-[0_0_10px_rgba(230,0,126,0.5)]" />
                <h3 className="text-white font-extrabold mb-1 text-sm">{card.title}</h3>
                <p className="text-xs text-[#888888] leading-relaxed font-medium">{card.text}</p>
              </TiltCard>
            ))}
          </div>

          {/* Bonus tier badge — Brutalist style */}
          <div className="mt-8 p-4 rounded-2xl bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[#e6007e]" />
              <span className="text-xs font-bold text-[#888888] uppercase tracking-wider">Directe Fee per afgeronde deal:</span>
            </div>
            <span className="text-sm font-black text-white">€300,- netto bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
