import React from 'react';
import { HelpCircle, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12 text-emerald-600 dark:text-emerald-400">Over het model</h1>
      
      <div className="space-y-6">
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
             <HelpCircle className="text-cyan-600 dark:text-cyan-400" />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Waarom deze flow?</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Het systeem zet arbeid om in kapitaal, gebruikt hefboom voor grotere investeringen, en solidificeert waarde in vastgoed. De huurwinst voedt de cyclus opnieuw. Het is ontworpen om lekken (onnodige kosten, belastingen zonder nut, consumptie) te minimaliseren en compounding (rente-op-rente) te maximaliseren.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
             <ShieldCheck className="text-emerald-600 dark:text-emerald-400" />
             <h3 className="text-xl font-bold text-slate-900 dark:text-white">Governance</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Toegang loopt uitsluitend via VVC. INVESTBOTIQ orkestreert de allocatie, Spontiva verzorgt hefboom, DJOBBA genereert TGC, ASH verankert waarde. Elk onderdeel is een separate entiteit met specifieke juridische kaders om risico's te scheiden.
          </p>
        </div>
      </div>
    </div>
  );
};