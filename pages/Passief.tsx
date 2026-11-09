import React, { useState } from 'react';
import { Users, Server, Home as HomeIcon, ChevronRight, ChevronLeft, Check, Sparkles, TrendingUp, Layers, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageView, Language, CalculatorState } from '../types';
import { translations } from '../translations';

interface PassiefProps {
  onNavigate: (page: PageView) => void;
  proMode?: boolean;
  language: Language;
  calcState?: CalculatorState;
  setReferrals?: (referrals: number) => void;
}

export const Passief: React.FC<PassiefProps> = ({
  onNavigate,
  proMode,
  language,
  calcState,
  setReferrals,
}) => {
  const t = translations[language].passief;
  const [localReferrals, setLocalReferrals] = useState(120);
  const [useMining, setUseMining] = useState(false);
  const [useEstate, setUseEstate] = useState(false);
  const [years, setYears] = useState<1 | 3 | 5>(1);

  const totalReferrals = calcState ? calcState.referrals : localReferrals;
  // Vast bedrag per kandidaat: €25/mnd (mag niet aangepast worden)
  const refValue = 25;

  const handleReferralsChange = (val: number) => {
    if (setReferrals) setReferrals(val);
    else setLocalReferrals(val);
  };

  const miningValue = 50;
  const estateValue = 50;
  const totalMonths = years * 12;
  const refPerMonth = totalReferrals / 12;

  // Chart data calculations
  const data = [];
  let cumulativeRef = 0;
  for (let month = 1; month <= totalMonths; month++) {
    cumulativeRef += refPerMonth;
    const refIncome = Math.round(cumulativeRef * refValue);
    const miningIncome = useMining ? month * miningValue : 0;
    const estateIncome = useEstate ? month * estateValue : 0;
    const total = refIncome + miningIncome + estateIncome;

    data.push({
      name: `M${month}`,
      Referral: refIncome,
      Mining: miningIncome,
      Estate: estateIncome,
      Totaal: total,
    });
  }

  const lastMonthTotal = data[data.length - 1].Totaal;
  const periodTotal = data.reduce((sum, d) => sum + d.Totaal, 0);

  // Cumulative Grand Total
  const hours = calcState ? calcState.hours : 40;
  const placements = calcState ? calcState.placements : 5;
  const basisIncome = hours * 30;
  const bonusIncome = placements * 300;
  const passiveMonthly = totalReferrals * refValue;
  const grandTotal = basisIncome + bonusIncome + passiveMonthly;
  const annualTotal = grandTotal * 12;

  return (
    <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-cyan-500 dark:text-cyan-400 tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          {t.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">{t.titleHighlight}</span>{t.titleSuffix}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm max-w-lg mx-auto leading-relaxed">{t.subtitle}</p>
      </div>

      {/* Unified Cumulative Bar Across 3 Pillars */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-purple-900/40 border border-cyan-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                De 3 Pijlers Gecombineerd
              </div>
              <h3 className="text-lg font-extrabold text-white">Totale Maandelijkse Cashflow</h3>
              <p className="text-xs text-slate-300">
                Basis (€{basisIncome}) + Bonus (€{bonusIncome}) + Passief (€{passiveMonthly})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-end">
            <div className="text-center sm:text-right">
              <p className="text-[10px] text-cyan-300 uppercase font-bold tracking-widest">Geschat Maandinkomen</p>
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                €{grandTotal.toLocaleString('nl-NL')}
                <span className="text-sm font-semibold text-slate-300 ml-1">/mnd</span>
              </p>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="text-center sm:text-right">
              <p className="text-[10px] text-emerald-300 uppercase font-bold tracking-widest">Jaarbasis Prognose</p>
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 tracking-tight">
                €{annualTotal.toLocaleString('nl-NL')}
                <span className="text-sm font-semibold text-slate-300 ml-1">/jaar</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Column 1: Config */}
        <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-500 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg tracking-tight">{t.portfolioTitle}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{t.portfolioSubtitle}</p>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Pijler 3
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Program 1: Referral */}
              <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-2xl border border-slate-200 dark:border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                    <Users size={15} className="mr-2 text-cyan-500"/> {t.referralTitle}
                  </h4>
                  <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">
                    {totalReferrals} × €{refValue}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{t.referralDesc}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label htmlFor="passief-candidates-slider" className="text-[10px] text-slate-400 font-semibold uppercase">{t.candidatesLabel}</label>
                      <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">{totalReferrals}</span>
                    </div>
                    <input 
                      id="passief-candidates-slider"
                      type="range" min="0" max="240" step="12"
                      value={totalReferrals} 
                      onChange={(e) => handleReferralsChange(parseInt(e.target.value) || 0)}
                      aria-label={t.candidatesLabel}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                  {/* Vast Bedrag per Kandidaat (Vastgezet op €25/mnd, mag niet aangepast worden) */}
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                        <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-slate-800 dark:text-white">Bedrag per Kandidaat</span>
                          <span className="text-[9px] uppercase tracking-wider font-extrabold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 px-1.5 py-0.5 rounded">Vast</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Vaste maandelijkse commissie</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">€25</span>
                      <span className="text-[10px] text-slate-400 font-medium ml-0.5">/mnd</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Program 2: Mining */}
              <div 
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${useMining ? 'bg-purple-500/10 border-purple-500/40' : 'bg-slate-50 dark:bg-[#0d1525] border-slate-200 dark:border-white/5 hover:border-purple-500/20'}`}
                onClick={() => setUseMining(!useMining)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                    <Server size={15} className="mr-2 text-purple-500"/> {t.miningTitle}
                  </h4>
                  <span className="text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">€50 p/m</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1">{t.miningDesc1}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{t.miningDesc2}</p>
                <div className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold transition-all ${useMining ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  {useMining && <Check size={14} />}
                  {useMining ? t.active : t.activate}
                </div>
              </div>

              {/* Program 3: Real Estate */}
              <div 
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${useEstate ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-slate-50 dark:bg-[#0d1525] border-slate-200 dark:border-white/5 hover:border-emerald-500/20'}`}
                onClick={() => setUseEstate(!useEstate)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                    <HomeIcon size={15} className="mr-2 text-emerald-500"/> {t.estateTitle}
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">€50 p/m</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1">{t.estateDesc1}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{t.estateDesc2}</p>
                <div className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold transition-all ${useEstate ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  {useEstate && <Check size={14} />}
                  {useEstate ? t.active : t.activate}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-slate-100 dark:border-white/5">
            <button
              onClick={() => onNavigate('bonus')}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Vorige: Plaatsingsbonus</span>
            </button>
          </div>
        </div>

        {/* Column 2: Graph */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/10 rounded-3xl flex flex-col shadow-xl overflow-hidden justify-between">
          <div>
            {/* Period Selector + Graph Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.graphTitle} {years} {t.yearLabel}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.graphSubtitle}</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-[#0d1525] rounded-xl p-1 border border-slate-200 dark:border-white/5">
                  {([1, 3, 5] as const).map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        years === y
                          ? 'bg-white dark:bg-white/10 text-cyan-600 dark:text-cyan-400 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    >
                      {y} {t.yearLabel}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-6 justify-end">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.totalReceived}</p>
                  <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 tracking-tight">€{periodTotal.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.overMonths} {totalMonths} {t.months12.split(' ')[1]}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{t.month} {totalMonths}</p>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">€{lastMonthTotal.toLocaleString()}<span className="text-[10px] font-normal text-slate-400 ml-1">{t.perMonth}</span></p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.passiveIncome}</p>
                </div>
              </div>
            </div>
            
            <div className="min-h-[300px] p-6 pb-2">
              <ResponsiveContainer width="100%" height={290}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F1623', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', fontSize: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="Referral" stroke="#06b6d4" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="Mining" stroke="#a855f7" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Estate" stroke="#4ade80" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Totaal" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="px-6 py-3 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-center gap-6 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> {t.referralTitle} ({totalReferrals * years} {t.totalLabel})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> {t.miningTitle} (+1{t.perMonth})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.estateTitle} (+1{t.perMonth})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-slate-400 rounded" /> Totaal</span>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="p-6 border-t border-slate-100 dark:border-white/5 flex items-center gap-3">
            <button 
              onClick={() => onNavigate('bonus')}
              className="px-5 py-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Plaatsingsbonus</span>
            </button>
            <button 
              onClick={() => onNavigate('join')}
              className="group flex-1 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl font-extrabold text-sm transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2"
            >
              <span>{t.cta} — Direct Inschrijven</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
