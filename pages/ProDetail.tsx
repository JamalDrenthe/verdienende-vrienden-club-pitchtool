import React, { useState } from 'react';

export const ProDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('VVC');

  const tabs = ['VVC', 'INVESTBOTIQ', 'SPONTIVA', 'DJOBBA', 'AfterStudentHousing', 'FAQ'];

  const content: Record<string, any> = {
    'VVC': {
      title: 'VVC - De Toegangspoort',
      focus: ['Instroom en gating van leden', 'Kwaliteit/fit-scan', 'Conversie naar kernmotor'],
      metrics: { 'Leden': 124, 'Conversie': '85%', 'Wachtlijst': 45 }
    },
    'INVESTBOTIQ': {
      title: 'INVESTBOTIQ - Allocatie Intelligence',
      focus: ['Deal throughput', 'IRR-targets', 'Risicoprofiel per deal'],
      metrics: { 'Active Deals': 3, 'Avg ARR': '12%', 'Volume': '€2.4M' }
    },
    'SPONTIVA': {
      title: 'SPONTIVA - Leverage',
      focus: ['Hefboom ratio', 'Funding partners', 'Rente marges'],
      metrics: { 'LTV': '65%', 'Rente': '4.2%', 'Partners': 4 }
    },
    'DJOBBA': {
      title: 'DJOBBA - Cashflow Engine',
      focus: ['Arbeid efficiency', 'Facturabiliteit', 'TGC output'],
      metrics: { 'Billable': '92%', 'Cash Cycle': '30d', 'Margin': '22%' }
    },
    'AfterStudentHousing': {
      title: 'ASH - Asset Management',
      focus: ['Bezetting', 'Onderhoudskosten', 'Waardestijging'],
      metrics: { 'Units': 85, 'Occupancy': '99%', 'Appreciation': '5.4%' }
    },
    'FAQ': {
      title: 'Veelgestelde Vragen (Pro)',
      faq: [
        { q: "Waarom een gesloten motor?", a: "Controle over de flow: instroom via VVC, allocatie via INVESTBOTIQ, hefboom via Spontiva, cashflow uit DJOBBA, waarde-anker in ASH, huurwinst terug." },
        { q: "Hoe waarborg je risicobeheer?", a: "Gate via VVC, besliskaders in INVESTBOTIQ, gescheiden diensten, hefboom met plafonds, vastgoed als collateral." },
        { q: "Hoe schaal je dit?", a: "Meer leden → meer kansen → grotere hefbomen → meer cashflow → extra vastgoed → sterkere terugstroom." }
      ]
    }
  };

  const activeData = content[activeTab];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Sub Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-6 py-4 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded transition-colors ${
                  activeTab === tab 
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-500/30' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="glass-card p-8 rounded-2xl border-t-4 border-emerald-500">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{activeData.title}</h2>
          
          {activeData.faq ? (
            <div className="space-y-6">
              {activeData.faq.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">{item.q}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-4">
                  ✨ Pro focus
                </h3>
                <ul className="space-y-3">
                  {activeData.focus.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-bold mb-4 uppercase text-xs tracking-widest">Live Metrics (Demo)</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(activeData.metrics).map(([key, value]) => (
                    <div key={key} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-center border border-slate-200 dark:border-slate-700">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {value as React.ReactNode}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};