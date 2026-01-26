import React from 'react';
import { MessageSquare, Shield, Handshake } from 'lucide-react';

export const OtherEngines: React.FC = () => {
  const engines = [
    {
      title: "Spraakzaam Samen",
      role: "Communicatie en community support.",
      icon: MessageSquare,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Cybersecurity 31 RJP",
      role: "Beveiliging en digitale weerbaarheid.",
      icon: Shield,
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Angels Mediate",
      role: "Mediatie en begeleiding bij samenwerkingen.",
      icon: Handshake,
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Overige Motoren</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Beschikbaar via VVC, ondersteunen de totale machine met communicatie, security en mediatie.
          Deze diensten zorgen dat de kernmachine ongestoord kan draaien.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {engines.map((engine, index) => (
          <div key={index} className="glass-card p-8 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer group">
            <div className="mb-6 bg-slate-100 dark:bg-slate-900/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <engine.icon className={`w-8 h-8 ${engine.color}`} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{engine.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{engine.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};