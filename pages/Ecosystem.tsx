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
      position: { top: '15%', left: '50%' }
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
      position: { top: '40%', left: '50%' }
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
      position: { top: '60%', left: '85%' }
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
      position: { top: '85%', left: '50%' }
    },
    {
      id: 'ash',
      title: 'AfterStudentHousing',
      subtitle: 'Het Onroerendgoed',
      shortRole: 'Waarde Anker',
      description: 'De ultieme bestemming: waardevast vastgoed.',
      why: 'Brandstof wordt gestold in steen. Dit bezit genereert via verhuur nieuwe inkomsten die terugvloeien naar INVESTBOTIQ: de cirkel rond.',
      icon: Building,
      color: 'emerald-400',
      position: { top: '60%', left: '15%' }
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Diagram Area - Spans 8 cols */}
        <div className="lg:col-span-8 space-y-6">
           {/* Header inside diagram area for mobile flow, but distinct in layout */}
           <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                 Ecosysteem Overzicht
              </h2>
           </div>

          <EcosystemDiagram 
            nodes={nodes} 
            selectedNodeId={selectedNodeId} 
            onNodeSelect={setSelectedNodeId} 
          />
        </div>

        {/* Info Panel - Spans 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Active Node Detail Card */}
          <div className={`flex-1 bg-white/90 dark:bg-[#0F1623]/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-colors duration-300`}>
             <div className={`absolute top-0 left-0 w-full h-1 bg-${selectedNode.color} shadow-[0_0_15px_rgba(6,182,212,0.5)]`}></div>
             
             <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded bg-${selectedNode.color}/10 text-${selectedNode.color} border border-${selectedNode.color}/20 uppercase tracking-wider`}>
                        Geselecteerd
                    </span>
                    <selectedNode.icon className={`w-6 h-6 text-${selectedNode.color}`} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{selectedNode.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">{selectedNode.subtitle}</p>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-[#162032] rounded-xl border border-slate-200 dark:border-white/5 transition-colors">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Info className="w-3 h-3 text-cyan-500 dark:text-cyan-400" /> Functie
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedNode.description}
                    </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-[#162032] rounded-xl border border-slate-200 dark:border-white/5 transition-colors">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Lock className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> Waarom deze stap?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {selectedNode.why}
                    </p>
                </div>
             </div>

             {proMode && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                    <button 
                        onClick={() => onNavigate('pro')}
                        className="w-full py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors flex items-center justify-center gap-2"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Bekijk Governance & Metrics
                    </button>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Cycle Cards - The "Look like this" section */}
      <div className="bg-white/90 dark:bg-[#0F1623]/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-xl dark:shadow-2xl transition-colors duration-300">
         <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-white/5 pb-4">
             <ArrowRight className="w-4 h-4 text-slate-500" />
             <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">De Complete Cyclus</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-50 dark:bg-[#162032] p-5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-colors group">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase mb-3 border border-cyan-500/20">
                    VVC → INVESTBOTIQ
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                    VVC start de motor. Het brengt nieuwe leden/brandstof binnen en stuurt alles via INVESTBOTIQ voor allocatie.
                </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#162032] p-5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-colors group">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase mb-3 border border-indigo-500/20">
                    INVESTBOTIQ → SPONTIVA
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                    INVESTBOTIQ vindt de deal maar heeft hefboom nodig. Spontiva regelt extra kapitaal voor grotere, lucratievere investeringen.
                </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#162032] p-5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase mb-3 border border-blue-500/20">
                    SPONTIVA → DJOBBA
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                    Spontiva vraagt TGC aan bij DJOBBA: de cashflow-generator uit arbeid. Dit tankt de brandstof voor het plan.
                </p>
            </div>

             <div className="bg-slate-50 dark:bg-[#162032] p-5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-colors group">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase mb-3 border border-emerald-500/20">
                    INVESTBOTIQ → ASH
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                   Kapitaal wordt gestold in vastgoed. Het bezit genereert huurwinst, die terugvloeit om leningen af te lossen.
                </p>
            </div>

         </div>
      </div>

    </div>
  );
};