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
  { id: 'join', num: 5, labelNl: 'Inschrijven', labelEn: 'Join Club', subtitleNl: 'CRMos Direct', subtitleEn: 'CRMos Direct' },
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
    <aside aria-label="Pitch Funnel Voortgang" className="sticky top-20 z-40 bg-white/90 dark:bg-[#060a12]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 transition-all duration-300 shadow-sm">
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
                  ? 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 cursor-pointer active:scale-95'
                  : 'opacity-30 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 scale-105'
                      : isCompleted
                      ? 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform ${
                      isActive
                        ? 'bg-white text-blue-600 font-extrabold shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-500'
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
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <div className="flex flex-col text-right leading-tight">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {language === 'nl' ? 'Live Potentieel' : 'Live Projection'}
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  €{totalMonthly.toLocaleString('nl-NL')}<span className="text-[10px] font-medium text-slate-400">/mnd</span>
                </span>
              </div>
            </div>

            {/* Keyboard shortcut hint */}
            <span className="hidden xl:inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg border border-slate-200 dark:border-white/5">
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
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer'
                  : 'opacity-30 text-slate-400 cursor-not-allowed bg-slate-100 dark:bg-white/5'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thin bottom progress bar line */}
        <div className="w-full bg-slate-100 dark:bg-white/5 h-0.5 mt-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
