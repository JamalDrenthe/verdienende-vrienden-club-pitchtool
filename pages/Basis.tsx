import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface BasisProps {
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const Basis: React.FC<BasisProps> = ({ onNavigate, language }) => {
  const t = translations[language].basis;
  const [hours, setHours] = useState(40);
  const hourlyRate = 30;
  const income = hours * hourlyRate;

  return (
    <div className="flex-grow px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-80px)]">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-blue-500 dark:text-blue-400 tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {t.badge}
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">
            {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">{t.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">{t.subtitle}</p>
          
          <div className="space-y-4">
            {t.steps.map((step) => (
              <div key={step.num} className="group flex gap-4 p-4 bg-white dark:bg-[#0F1623] rounded-xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Calculator */}
        <div className="sticky top-28">
          <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
            {/* Calculator Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4">
              <h3 className="text-white font-bold text-lg">{t.calcTitle}</h3>
              <p className="text-white/70 text-xs">{t.calcSubtitle}</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-slate-500 dark:text-slate-400 text-sm">{t.hoursLabel}</label>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-2xl">{hours}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="160" 
                  step="1"
                  value={hours} 
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  aria-label={t.hoursLabel}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                  <span>0</span>
                  <span>{t.hoursMin}</span>
                  <span>{t.hoursFull}</span>
                </div>
              </div>

              {/* Result */}
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-500/20 p-6 rounded-xl text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">{t.resultLabel}</p>
                <p className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  €{income.toLocaleString('nl-NL')}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{hours} uur × €{hourlyRate}/uur</p>
              </div>

              <button 
                onClick={() => onNavigate('bonus')}
                className="group w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-bold transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                {t.cta}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
