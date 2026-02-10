import React, { useState } from 'react';
import { EcosystemDiagram } from '../components/EcosystemDiagram';
import { EcosystemNode, PageView } from '../types';
import { Users, Lock, TrendingUp, Zap, Building, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface EcosystemProps {
  proMode: boolean;
  onNavigate: (page: PageView) => void;
}

export const Ecosystem: React.FC<EcosystemProps> = ({ proMode, onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('vvc');

  // Updated coordinates for Top-Center-Left-Right-Bottom layout
  // Shifted everything down by ~5% to give VVC more headroom (top 15% instead of 10%)
  const nodes: EcosystemNode[] = [
    {
      id: 'vvc',
      title: 'VVC',
      subtitle: 'De Toegangspoort',
      shortRole: 'Community & Gate',
      description: 'De enige toegangspoort voor gebruikers en de startknop van de motor.',
      why: 'VVC is de brandstoftoevoer (nieuwe leden). Het biedt toegang tot zowel de servicebedrijven als de exclusieve financiële kern.',
      icon: Users,
      color: 'cyan-400',
      position: { top: '18%', left: '50%' }
    },
    {
      id: 'investbotiq',
      title: 'INVESTBOTIQ',
      subtitle: 'De Motorcomputer',
      shortRole: 'Intelligence & Allocatie',
      description: 'Het intelligente brein dat bepaalt hoeveel kapitaal waar nodig is.',
      why: 'Analyseert kansen en zet de opdracht uit: "Ik heb een investering, maar meer slagkracht nodig." Stuurt door naar Spontiva.',
      icon: Lock,
      color: 'indigo-400',
      position: { top: '42%', left: '50%' }
    },
    {
      id: 'spontiva',
      title: 'SPONTIVA',
      subtitle: 'De Finan. Hefboom',
      shortRole: 'Financiering',
      description: 'Creëert financiële hefboomwerking en vraagt financiering aan.',
      why: 'Fungeert als de financiële pomp. Regelt kapitaal voor de grotere investeringen die INVESTBOTIQ identificeert door TGC aan te vragen bij DJOBBA.',
      icon: TrendingUp,
      color: 'blue-500',
      position: { top: '65%', left: '82%' }
    },
    {
      id: 'djobba',
      title: 'DJOBBA',
      subtitle: 'De Generator',
      shortRole: 'Time Gap Cashflow',
      description: 'Generator die vloeibare brandstof (cashflow) produceert uit werk.',
      why: 'Zet arbeid om in kapitaal (TGC). De winst (TGA) wordt niet uitgekeerd, maar direct ingezet om vastgoed te kopen.',
      icon: Zap,
      color: 'yellow-400',
      position: { top: '82%', left: '50%' }
    },
    {
      id: 'woningvry',
      title: 'WoningVry',
      subtitle: 'Het Onroerendgoed',
      shortRole: 'Waarde Anker',
      description: 'De ultieme bestemming: waardevast vastgoed.',
      why: 'Brandstof wordt gestold in steen. Dit bezit genereert via verhuur nieuwe inkomsten die terugvloeien naar INVESTBOTIQ: de cirkel rond.',
      icon: Building,
      color: 'emerald-400',
      position: { top: '65%', left: '18%' }
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 rounded-full px-4 py-1.5 text-xs font-bold text-cyan-500 dark:text-cyan-400 tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            Pro Modus
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Ecosysteem Overzicht</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Diagram Area */}
        <div className="lg:col-span-8 space-y-6">
          <EcosystemDiagram 
            nodes={nodes} 
            selectedNodeId={selectedNodeId} 
            onNodeSelect={setSelectedNodeId} 
          />

          {/* Cycle Cards */}
          <div className="bg-white dark:bg-[#0F1623] rounded-2xl border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-3">
                 <ArrowRight className="w-4 h-4 text-cyan-500" />
                 <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">De Complete Cyclus</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                
                <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-200 group">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase mb-3">
                        VVC → INVESTBOTIQ
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        VVC start de motor. Het brengt nieuwe leden/brandstof binnen en stuurt alles via INVESTBOTIQ voor allocatie.
                    </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-200 group">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase mb-3">
                        INVESTBOTIQ → SPONTIVA
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        INVESTBOTIQ vindt de deal maar heeft hefboom nodig. Spontiva regelt extra kapitaal voor grotere, lucratievere investeringen.
                    </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-200 group">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase mb-3">
                        SPONTIVA → DJOBBA
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        Spontiva vraagt TGC aan bij DJOBBA: de cashflow-generator uit arbeid. Dit tankt de brandstof voor het plan.
                    </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-200 group">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase mb-3">
                        INVESTBOTIQ → WONINGVRY
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                       Kapitaal wordt gestold in vastgoed. Het bezit genereert huurwinst, die terugvloeit om leningen af te lossen.
                    </p>
                </div>

             </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          <div className="flex-1 bg-white dark:bg-[#0F1623] rounded-2xl border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden transition-colors duration-300">
             <div className={`absolute top-0 left-0 w-full h-1 bg-${selectedNode.color}`} />
             
             <div className="p-6">
               <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg bg-${selectedNode.color}/10 text-${selectedNode.color} border border-${selectedNode.color}/20 uppercase tracking-wider`}>
                          Geselecteerd
                      </span>
                      <selectedNode.icon className={`w-6 h-6 text-${selectedNode.color}`} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">{selectedNode.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">{selectedNode.subtitle}</p>
               </div>

               <div className="space-y-3">
                  <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5">
                      <h4 className="text-[10px] font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Info className="w-3 h-3" /> Functie
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedNode.description}
                      </p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-[#0d1525] rounded-xl border border-slate-200 dark:border-white/5">
                      <h4 className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Lock className="w-3 h-3" /> Waarom deze stap?
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {selectedNode.why}
                      </p>
                  </div>
               </div>

               {proMode && (
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/5">
                      <button 
                          onClick={() => onNavigate('pro')}
                          className="group w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-xl text-xs font-bold transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                      >
                          <ShieldCheck className="w-4 h-4" />
                          Bekijk Governance & Metrics
                      </button>
                  </div>
               )}
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};