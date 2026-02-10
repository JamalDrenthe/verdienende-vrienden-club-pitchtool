import React, { useState } from 'react';
import { Users, Server, Home as HomeIcon, ChevronRight, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface PassiefProps {
  onNavigate: (page: PageView) => void;
  proMode?: boolean;
  language: Language;
}

export const Passief: React.FC<PassiefProps> = ({ onNavigate, proMode, language }) => {
  const t = translations[language].passief;
  const [totalReferrals, setTotalReferrals] = useState(120);
  const [refValue, setRefValue] = useState(25);
  const [useMining, setUseMining] = useState(false);
  const [useEstate, setUseEstate] = useState(false);
  const [years, setYears] = useState<1 | 3 | 5>(1);
  const miningValue = 50;
  const estateValue = 50;

  const totalMonths = years * 12;
  const refPerMonth = totalReferrals / 12;

  const data = [];
  let cumulativeRef = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    cumulativeRef += refPerMonth;
    const refIncome = Math.round(cumulativeRef * refValue);
    const miningIncome = useMining ? month * miningValue : 0;
    const estateIncome = useEstate ? month * estateValue : 0;
    const total = refIncome + miningIncome + estateIncome;

    data.push({
      name: years === 1 ? `M${month}` : `M${month}`,
      Referral: refIncome,
      Mining: miningIncome,
      Estate: estateIncome,
      Totaal: total
    });
  }

  const lastMonthTotal = data[data.length - 1].Totaal;
  const periodTotal = data.reduce((sum, d) => sum + d.Totaal, 0);

  return (
    <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-cyan-500 dark:text-cyan-400 tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          {t.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">{t.titleHighlight}</span>{t.titleSuffix}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm max-w-lg mx-auto">{t.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Column 1: Config */}
        <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-500 px-6 py-4">
            <h3 className="text-white font-bold text-lg">{t.portfolioTitle}</h3>
            <p className="text-white/70 text-xs">{t.portfolioSubtitle}</p>
          </div>

          <div className="p-5 space-y-4">
            {/* Program 1: Referral */}
            <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                  <Users size={14} className="mr-2 text-cyan-500"/> {t.referralTitle}
                </h4>
                <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full">{totalReferrals} × €{refValue}</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{t.referralDesc}</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-slate-400 font-medium">{t.candidatesLabel}</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">{totalReferrals}</span>
                  </div>
                  <input 
                    type="range" min="0" max="240" step="12"
                    value={totalReferrals} 
                    onChange={(e) => setTotalReferrals(parseInt(e.target.value))}
                    aria-label={t.candidatesLabel}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-slate-400 font-medium">{t.amountLabel}</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">€{refValue}</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" step="5"
                    value={refValue} 
                    onChange={(e) => setRefValue(parseInt(e.target.value))}
                    aria-label={t.amountLabel}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Program 2: Mining */}
            <div 
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${useMining ? 'bg-purple-500/5 dark:bg-purple-900/20 border-purple-500/30' : 'bg-slate-50 dark:bg-[#0d1525] border-slate-200 dark:border-white/5 hover:border-purple-500/20'}`}
              onClick={() => setUseMining(!useMining)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                  <Server size={14} className="mr-2 text-purple-500"/> {t.miningTitle}
                </h4>
                <span className="text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">€50 p/m</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1">{t.miningDesc1}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{t.miningDesc2}</p>
              <div className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-bold transition-all ${useMining ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                {useMining && <Check size={14} />}
                {useMining ? t.active : t.activate}
              </div>
            </div>

            {/* Program 3: Real Estate */}
            <div 
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${useEstate ? 'bg-emerald-500/5 dark:bg-emerald-900/20 border-emerald-500/30' : 'bg-slate-50 dark:bg-[#0d1525] border-slate-200 dark:border-white/5 hover:border-emerald-500/20'}`}
              onClick={() => setUseEstate(!useEstate)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm">
                  <HomeIcon size={14} className="mr-2 text-emerald-500"/> {t.estateTitle}
                </h4>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">€50 p/m</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-1">{t.estateDesc1}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">{t.estateDesc2}</p>
              <div className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-bold transition-all ${useEstate ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                {useEstate && <Check size={14} />}
                {useEstate ? t.active : t.activate}
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Graph */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col shadow-xl overflow-hidden">
          {/* Period Selector + Graph Header */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.graphTitle} {years} {t.yearLabel}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.graphSubtitle}</p>
              </div>
              {proMode ? (
                <div className="flex bg-slate-100 dark:bg-[#0d1525] rounded-xl p-1 border border-slate-200 dark:border-white/5">
                  {([1, 3, 5] as const).map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        years === y
                          ? 'bg-white dark:bg-white/10 text-cyan-600 dark:text-cyan-400 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                    >
                      {y} {t.yearLabel}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-[#0d1525] border border-slate-200 dark:border-white/5 rounded-lg px-3 py-1.5 font-bold">{t.months12}</span>
              )}
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
          
          <div className="flex-grow min-h-[300px] p-6 pb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" className="hidden dark:block" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--tooltip-bg, #ffffff)', border: '1px solid var(--tooltip-border, #e2e8f0)', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: 'var(--tooltip-text, #1e293b)' }}
                />
                <Line type="monotone" dataKey="Referral" stroke="#06b6d4" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Mining" stroke="#a855f7" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Estate" stroke="#4ade80" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Totaal" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="px-6 py-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> {t.referralTitle} ({totalReferrals * years} {t.totalLabel})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> {t.miningTitle} (+1{t.perMonth})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.estateTitle} (+1{t.perMonth})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-slate-400 rounded" /> Totaal</span>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <button 
              onClick={() => onNavigate('join')}
              className="group w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              {t.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
