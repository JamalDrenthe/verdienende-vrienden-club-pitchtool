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
    <div className="flex-grow px-4 py-12 max-w-7xl mx-auto w-full bg-[#000000]">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#0d0d0d] border border-[#222222] rounded-full px-4 py-1.5 text-[10px] font-black text-white tracking-[0.25em] uppercase mb-5 shadow-[0_0_20px_rgba(230,0,126,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6007e] animate-pulse" />
          {t.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          {t.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ff2a9d] to-[#e6007e]">{t.titleHighlight}</span>{t.titleSuffix}
        </h2>
        <p className="text-[#888888] mt-3 text-sm max-w-lg mx-auto leading-relaxed font-medium">{t.subtitle}</p>
      </div>

      {/* Unified Cumulative Bar Across 3 Pillars — Brutalist Terminal Style */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-[#1f1f1f] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e6007e]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e6007e] flex items-center justify-center text-white shadow-lg shadow-[#e6007e]/30 shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#e6007e] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#e6007e]" />
                De 3 Pijlers Gecombineerd
              </div>
              <h3 className="text-lg font-black text-white">Totale Maandelijkse Cashflow</h3>
              <p className="text-xs text-[#888888] font-medium">
                Basis (€{basisIncome}) + Bonus (€{bonusIncome}) + Passief (€{passiveMonthly})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-end">
            <div className="text-center sm:text-right">
              <p className="text-[10px] text-[#777777] uppercase font-black tracking-[0.2em]">Geschat Maandinkomen</p>
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tighter">
                €{grandTotal.toLocaleString('nl-NL')}
                <span className="text-sm font-semibold text-[#888888] ml-1">/mnd</span>
              </p>
            </div>
            <div className="h-10 w-px bg-[#222222] hidden sm:block" />
            <div className="text-center sm:text-right">
              <p className="text-[10px] text-[#e6007e] uppercase font-black tracking-[0.2em]">Jaarbasis Prognose</p>
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ff47ab] tracking-tighter">
                €{annualTotal.toLocaleString('nl-NL')}
                <span className="text-sm font-semibold text-[#888888] ml-1">/jaar</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Column 1: Config */}
        <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-gradient-to-r from-[#e6007e] via-[#c00069] to-[#800045] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg tracking-tight">{t.portfolioTitle}</h3>
                  <p className="text-white/80 text-xs mt-0.5">{t.portfolioSubtitle}</p>
                </div>
                <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                  Pijler 3
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Program 1: Referral */}
              <div className="p-4 bg-[#0d0d0d] rounded-2xl border border-[#1c1c1c]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white flex items-center text-sm">
                    <Users size={15} className="mr-2 text-[#e6007e]"/> {t.referralTitle}
                  </h4>
                  <span className="text-[10px] font-black bg-[#e6007e]/20 text-white px-2.5 py-0.5 rounded-full border border-[#e6007e]/40 shadow-sm">
                    {totalReferrals} × €{refValue} = <span className="text-[#e6007e]">€{(totalReferrals * refValue).toLocaleString('nl-NL')}/mnd</span>
                  </span>
                </div>
                <p className="text-[11px] text-[#777777] mb-3 font-medium">{t.referralDesc}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <label htmlFor="passief-candidates-slider" className="text-[10px] text-[#888888] font-black uppercase tracking-wider">{t.candidatesLabel}</label>
                      <span className="text-white font-black text-sm">{totalReferrals}</span>
                    </div>
                    <input 
                      id="passief-candidates-slider"
                      type="range" min="0" max="240" step="12"
                      value={totalReferrals} 
                      onChange={(e) => handleReferralsChange(parseInt(e.target.value) || 0)}
                      aria-label={t.candidatesLabel}
                      className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Vast Bedrag per Kandidaat (Vastgezet op €25/mnd, mag niet aangepast worden) */}
                  <div className="p-3.5 rounded-xl bg-[#0a0a0a] border border-[#222222] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#e6007e]/15 text-[#e6007e] flex items-center justify-center shrink-0 border border-[#e6007e]/30">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-white">Bedrag per Kandidaat</span>
                          <span className="text-[9px] uppercase tracking-wider font-black bg-[#e6007e]/20 text-[#e6007e] px-1.5 py-0.5 rounded">Vast</span>
                        </div>
                        <p className="text-[10px] text-[#777777]">Vaste maandelijkse commissie</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-white">€25</span>
                      <span className="text-[10px] text-[#777777] font-medium ml-0.5">/mnd</span>
                    </div>
                  </div>

                  {/* TOTAAL BEDRAG PASSIEF INKOMEN DISPLAY */}
                  <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-[#e6007e]/20 via-[#c00069]/15 to-[#0a0a0a] border border-[#e6007e]/40 flex items-center justify-between shadow-[0_4px_20px_rgba(230,0,126,0.15)]">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e6007e]">
                        Totaal Passief Bedrag
                      </span>
                      <p className="text-[11px] text-[#888888] font-medium mt-0.5">
                        {totalReferrals} kandidaten × €25/mnd
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
                        €{(totalReferrals * refValue).toLocaleString('nl-NL')}
                        <span className="text-xs font-semibold text-[#888888] ml-1">/mnd</span>
                      </div>
                      <div className="text-[11px] text-[#ff2a9d] font-black tracking-tight">
                        €{((totalReferrals * refValue) * 12).toLocaleString('nl-NL')} <span className="text-[9px] text-[#888888] font-normal">/jaar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Program 2: Mining */}
              <div 
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${useMining ? 'bg-purple-950/20 border-purple-500/40' : 'bg-[#0d0d0d] border-[#1c1c1c] hover:border-[#333333]'}`}
                onClick={() => setUseMining(!useMining)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white flex items-center text-sm">
                    <Server size={15} className="mr-2 text-purple-400"/> {t.miningTitle}
                  </h4>
                  <span className="text-[10px] font-black bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">€50 p/m</span>
                </div>
                <p className="text-[11px] text-[#777777] mb-1 font-medium">{t.miningDesc1}</p>
                <p className="text-[11px] text-[#777777] mb-3 font-medium">{t.miningDesc2}</p>
                <div className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-black transition-all ${useMining ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'bg-[#1a1a1a] text-[#888888]'}`}>
                  {useMining && <Check size={14} />}
                  {useMining ? t.active : t.activate}
                </div>
              </div>

              {/* Program 3: Real Estate */}
              <div 
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${useEstate ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-[#0d0d0d] border-[#1c1c1c] hover:border-[#333333]'}`}
                onClick={() => setUseEstate(!useEstate)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white flex items-center text-sm">
                    <HomeIcon size={15} className="mr-2 text-emerald-400"/> {t.estateTitle}
                  </h4>
                  <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">€50 p/m</span>
                </div>
                <p className="text-[11px] text-[#777777] mb-1 font-medium">{t.estateDesc1}</p>
                <p className="text-[11px] text-[#777777] mb-3 font-medium">{t.estateDesc2}</p>
                <div className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-black transition-all ${useEstate ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'bg-[#1a1a1a] text-[#888888]'}`}>
                  {useEstate && <Check size={14} />}
                  {useEstate ? t.active : t.activate}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-[#1a1a1a]">
            <button
              onClick={() => onNavigate('bonus')}
              className="w-full py-3 rounded-xl border border-[#222222] bg-[#0d0d0d] hover:bg-[#141414] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Vorige: Plaatsingsbonus</span>
            </button>
          </div>
        </div>

        {/* Column 2: Graph */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl flex flex-col shadow-xl overflow-hidden justify-between">
          <div>
            {/* Period Selector + Graph Header */}
            <div className="px-6 py-5 border-b border-[#1a1a1a]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-white">{t.graphTitle} {years} {t.yearLabel}</h3>
                  <p className="text-xs text-[#777777] mt-0.5 font-medium">{t.graphSubtitle}</p>
                </div>
                <div className="flex bg-[#0d0d0d] rounded-xl p-1 border border-[#1f1f1f]">
                  {([1, 3, 5] as const).map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                        years === y
                          ? 'bg-[#e6007e] text-white shadow-sm'
                          : 'text-[#666666] hover:text-white'
                      }`}
                    >
                      {y} {t.yearLabel}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-end gap-6 justify-end">
                <div className="text-right">
                  <p className="text-[10px] text-[#777777] uppercase tracking-[0.2em] font-black">{t.totalReceived}</p>
                  <p className="text-2xl font-black text-white tracking-tighter">€{periodTotal.toLocaleString()}</p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{t.overMonths} {totalMonths} {t.months12.split(' ')[1]}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#777777] uppercase tracking-[0.2em] font-black">{t.month} {totalMonths}</p>
                  <p className="text-2xl font-black text-[#e6007e] tracking-tighter">€{lastMonthTotal.toLocaleString()}<span className="text-[10px] font-normal text-[#888888] ml-1">{t.perMonth}</span></p>
                  <p className="text-[10px] text-[#666666] mt-0.5">{t.passiveIncome}</p>
                </div>
              </div>
            </div>
            
            <div className="min-h-[300px] p-6 pb-2">
              <ResponsiveContainer width="100%" height={290}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                  <XAxis dataKey="name" stroke="#555555" fontSize={11} />
                  <YAxis stroke="#555555" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #222222', borderRadius: '14px', fontSize: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="Referral" stroke="#e6007e" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="Mining" stroke="#a855f7" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Estate" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Totaal" stroke="#ffffff" strokeWidth={2} strokeDasharray="5 5" dot={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="px-6 py-3 border-t border-[#1a1a1a] flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#e6007e]" /> {t.referralTitle} ({totalReferrals * years} {t.totalLabel})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> {t.miningTitle} (+1{t.perMonth})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.estateTitle} (+1{t.perMonth})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-white rounded" /> Totaal</span>
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="p-6 border-t border-[#1a1a1a] flex items-center gap-3">
            <button 
              onClick={() => onNavigate('bonus')}
              className="px-5 py-4 rounded-xl border border-[#222222] bg-[#0d0d0d] hover:bg-[#141414] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Plaatsingsbonus</span>
            </button>
            <button 
              onClick={() => onNavigate('join')}
              className="group flex-1 py-4 bg-[#e6007e] hover:bg-[#c00069] text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_32px_-8px_rgba(230,0,126,0.6)] hover:shadow-[0_8px_32px_rgba(230,0,126,0.8)] flex items-center justify-center gap-2 active:scale-95"
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
