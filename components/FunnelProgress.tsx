import React from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, HelpCircle } from 'lucide-react';
import { PageView, Language, CalculatorState } from '../types';

interface FunnelProgressProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  calcState: CalculatorState;
  language: Language;
}

export const FUNNEL_STEPS: { id: PageView; num: number; labelNl: string; labelEn: string; subtitleNl: string; subtitleEn: string }[] = [
  { id: 'pitch', num: 1, labelNl: 'Introductie', labelEn: 'Intro', subtitleNl: 'Drie Pijlers', subtitleEn: 'Three Pillars' },
  { id: 'basis', num: 2, labelNl: 'Basisvergoeding', labelEn: 'Base Salary', subtitleNl: '€30 per uur', subtitleEn: '€30 per hour' },
  { id: 'bonus', num: 3, labelNl: 'Plaatsingsbonus', labelEn: 'Deal Bonus', subtitleNl: '€300 per deal', subtitleEn: '€300 per deal' },
  { id: 'passief', num: 4, labelNl: 'Passief Inkomen', labelEn: 'Passive Residuals', subtitleNl: '€25/mnd recurring', subtitleEn: '€25/mo recurring' },
  { id: 'join', num: 5, labelNl: 'Join', labelEn: 'Join', subtitleNl: 'CRMos Direct', subtitleEn: 'CRMos Direct' },
];

export const FunnelProgress: React.FC<FunnelProgressProps> = ({
  currentPage,
  onNavigate,
  calcState,
  language,
}) => {
  const currentIndex = FUNNEL_STEPS.findIndex((s) => s.id === currentPage);
  if (currentIndex === -1) return null;

  const currentStep = FUNNEL_STEPS[currentIndex];
  const prevStep = currentIndex > 0 ? FUNNEL_STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < FUNNEL_STEPS.length - 1 ? FUNNEL_STEPS[currentIndex + 1] : null;

  // Calculate live cumulative total
  const basisIncome = calcState.hours * 30;
  const bonusIncome = calcState.placements * 300;
  const passiveMonthly = calcState.referrals * calcState.refValue;
  const totalMonthly = basisIncome + bonusIncome + passiveMonthly;

  const progressPercent = Math.round(((currentIndex + 1) / FUNNEL_STEPS.length) * 100);

  return (
    <aside aria-label="Pitch Funnel Voortgang" className="sticky top-20 z-40 bg-white/95 dark:bg-[#000000]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#1a1a1a] transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Previous Arrow + Step Badge */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevStep && onNavigate(prevStep.id)}
              disabled={!prevStep}
              title={prevStep ? `Vorige stap (←): ${prevStep.labelNl}` : 'Eerste stap'}
              className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                prevStep
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-[#111111] dark:hover:bg-[#1a1a1a] text-slate-700 dark:text-slate-200 cursor-pointer active:scale-95 border border-transparent dark:border-[#222222]'
                  : 'opacity-30 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-[#666666]">
                {language === 'nl' ? `Stap ${currentStep.num} van ${FUNNEL_STEPS.length}` : `Step ${currentStep.num} of ${FUNNEL_STEPS.length}`}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[140px]">
                {language === 'nl' ? currentStep.labelNl : currentStep.labelEn}
              </span>
            </div>
          </div>

          {/* Center: Funnel Stepper Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {FUNNEL_STEPS.map((step, idx) => {
              const isActive = step.id === currentPage;
              const isCompleted = idx < currentIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => onNavigate(step.id)}
                  className={`group relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#e6007e] text-white shadow-[0_4px_24px_rgba(230,0,126,0.45)] scale-105'
                      : isCompleted
                      ? 'bg-slate-100 dark:bg-[#0d0d0d] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#161616] border border-transparent dark:border-[#1c1c1c]'
                      : 'text-slate-400 dark:text-[#666666] hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform ${
                      isActive
                        ? 'bg-white text-[#e6007e] font-black shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-200 dark:bg-[#1a1a1a] text-slate-500 dark:text-[#666666]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : step.num}
                  </span>
                  <span className="hidden md:inline text-[11px] font-medium whitespace-nowrap">
                    {language === 'nl' ? step.labelNl : step.labelEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Cumulative Earnings Badge & Next Arrow */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Earnings Pill */}
            <div
              title={`Geschat Maandinkomen: €${totalMonthly.toLocaleString('nl-NL')}/mnd (Basis €${basisIncome} + Bonus €${bonusIncome} + Passief €${passiveMonthly})`}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0a0a0a] border border-[#222222] text-white font-bold text-xs shadow-sm hover:border-[#e6007e]/40 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e6007e] animate-pulse" />
              <div className="flex flex-col text-right leading-tight">
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#666666]">
                  {language === 'nl' ? 'Live Potentieel' : 'Live Projection'}
                </span>
                <span className="font-black text-white text-xs sm:text-sm">
                  €{totalMonthly.toLocaleString('nl-NL')}<span className="text-[10px] font-medium text-[#888888]">/mnd</span>
                </span>
              </div>
            </div>

            {/* Keyboard shortcut hint */}
            <span className="hidden xl:inline-flex items-center gap-1 text-[10px] text-[#666666] bg-[#0a0a0a] px-2 py-1 rounded-lg border border-[#1f1f1f]">
              <span>←</span>
              <span>→</span>
            </span>

            {/* Next Arrow */}
            <button
              onClick={() => nextStep && onNavigate(nextStep.id)}
              disabled={!nextStep}
              title={nextStep ? `Volgende stap (→): ${nextStep.labelNl}` : 'Laatste stap'}
              className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                nextStep
                  ? 'bg-[#e6007e] hover:bg-[#c00069] text-white shadow-md shadow-[#e6007e]/30 active:scale-95 cursor-pointer'
                  : 'opacity-30 text-slate-400 cursor-not-allowed bg-slate-100 dark:bg-[#111111]'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thin bottom progress bar line */}
        <div className="w-full bg-slate-100 dark:bg-[#1a1a1a] h-0.5 mt-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#e6007e] via-[#ff2a9d] to-[#e6007e] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(230,0,126,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
