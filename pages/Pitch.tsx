import React from 'react';
import { ArrowRight, AlertTriangle, Lock, Target, Zap, TrendingUp, Cpu, CheckCircle2 } from 'lucide-react';

export const Pitch: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-24">
      
      {/* 1. Intro Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/5">
        <div className="space-y-4 max-w-3xl">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hard werken stopt waar kapitaal begint</div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Het fundamentele <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">probleem</span>
            </h1>
        </div>
        <button className="group flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-100 dark:bg-cyan-900/10 hover:bg-cyan-200 dark:hover:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 text-sm font-bold transition-all whitespace-nowrap">
           Bekijk de volledige pitch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 2. Problem Cards */}
      <div className="space-y-6">
        <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="bg-red-100 dark:bg-red-500/10 p-4 rounded-2xl shrink-0">
             <AlertTriangle className="text-red-500 dark:text-red-400 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">Gebroken belofte</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Het fundamentele probleem is een gebroken belofte. Ons economisch model zegt dat hard werken wordt beloond met vooruitgang. Maar in de praktijk wordt je arbeid omgezet in geld dat stopt met werken zodra jij stopt.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
           <div className="bg-orange-100 dark:bg-orange-500/10 p-4 rounded-2xl shrink-0">
             <Lock className="text-orange-500 dark:text-orange-400 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">Gesloten circuit</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              De echte waardegroei – in vastgoed, bedrijven, infrastructuur – is voorbehouden aan een gesloten circuit van gevestigde investeerders met kapitaal. Daardoor blijven de meeste mensen permanent buitenstaanders in het spel van vermogensopbouw.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-900/5 hover:bg-cyan-100 dark:hover:bg-cyan-900/10 transition-colors">
           <div className="bg-cyan-100 dark:bg-cyan-500/10 p-4 rounded-2xl shrink-0">
             <Target className="text-cyan-600 dark:text-cyan-400 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">Onze missie</h3>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Wij maken je van buitenstaander tot deelnemer en eigenaar. Wij automatiseren de route van arbeid naar bezit.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Deep Dive Question */}
      <div className="py-16 text-center space-y-10">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Heb je wel eens gedacht: <br/><span className="text-cyan-600 dark:text-cyan-400">Was ik maar rijk geboren?</span>
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-light">
          Waar gaat dat bruto geld eigenlijk heen? Wat komt er voor bruto of betalen zij mij uit hun eigen zak?
        </p>

        {/* Investigation Box */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 border border-indigo-200 dark:border-white/10 p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-left relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <p className="text-slate-500 dark:text-slate-300 text-sm mb-6 uppercase tracking-widest font-bold">Wij hebben het onderzoek voor jou gedaan.</p>
            
            <div className="pl-6 border-l-4 border-yellow-500 mb-8">
                <p className="text-2xl md:text-3xl italic text-slate-700 dark:text-slate-200 font-serif leading-relaxed">
                    "Hoe blijven rijke mensen rijk? Het standaard antwoord: ze laten het geld voor hun werken."
                </p>
            </div>
            
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Ja, maar hoe?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">En dan blijft het meestal stil. Of heel vaag. Of heel complex.</p>
        </div>
      </div>

      {/* 4. Insight Card */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 dark:from-[#0F1623] dark:to-[#1E293B] p-8 md:p-14 rounded-3xl border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.15)] overflow-hidden">
         {/* Background gradients */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-purple-600/10 via-indigo-600/5 to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-600/10 to-transparent"></div>

         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 fill-current" /> Het Inzicht
                </h3>
                <p className="text-white text-xl md:text-2xl leading-relaxed font-medium">
                    We hebben hier geen oplossing voor. Wel hebben we het inzicht. Je kan het landschap zien, maar inzicht bepaalt wat je eruit haalt.
                </p>
            </div>
         </div>
      </div>

      {/* 5. Usage of System */}
      <div className="text-center space-y-6 max-w-3xl mx-auto py-8">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Wij maken gebruik van het systeem</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Klinkt niet zo goed hè? Of misschien wel. We gebruiken in elk geval niks nieuws — we roeien met de riemen die we hebben.
          </p>
      </div>

      {/* 6. Time Gap Cashflow */}
      <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 border border-cyan-200 dark:border-cyan-500/30 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-300 dark:to-blue-300 mb-6 drop-shadow-lg">
                Time Gap Cashflow
            </h2>
            <p className="text-slate-700 dark:text-slate-200 text-xl mb-12 max-w-2xl mx-auto">
                De tijd die tussen elke betaling zit. Het geld dat dus stil staat.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                 <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600 dark:from-orange-300 dark:to-orange-500 drop-shadow-sm">60+</span>
                 <span className="text-center md:text-left text-slate-600 dark:text-slate-300 text-lg leading-tight font-medium">
                    verschillende manieren<br/>om daar bij te komen.
                 </span>
            </div>
          </div>
      </div>

      {/* 7. Automation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/5 p-10 rounded-3xl flex flex-col justify-center h-full hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-lg dark:shadow-none">
             <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-slate-600 dark:text-slate-300 w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Van cashflow naar passief inkomen</h3>
             <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                Dankzij Robert weten wij ook de manier om daar passief inkomen van te maken. Het is geen magie, het is financiële logica.
             </p>
          </div>

          <div className="bg-white dark:bg-[#0F1623] border border-emerald-500/20 p-10 rounded-3xl relative overflow-hidden group h-full hover:bg-emerald-50 dark:hover:bg-emerald-900/5 transition-colors shadow-lg dark:shadow-none">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
             
             <div className="relative z-10">
                 <p className="text-emerald-600 dark:text-emerald-500 text-xs uppercase font-bold tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Automatisering
                 </p>
                 <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">Daarom hebben wij het geautomatiseerd</h3>
                 <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    Klinkt als veel werk. Klopt. Het zijn stappen, het is een flow. Daarom hebben wij de hele keten gedigitaliseerd.
                 </p>
             </div>
          </div>
      </div>

      {/* 8. Call to Action Bridge */}
      <div className="text-center py-16">
         <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Wil je meer weten of heb je vragen?</h2>
         <p className="text-slate-500 mb-8 text-lg">Waarschijnlijk beide.</p>
         <p className="text-xl text-cyan-600 dark:text-cyan-400 font-medium inline-block border-b border-cyan-500/30 pb-1">
             Wil je met een AI praten of met een echt persoon — iemand van ons Team?
         </p>
      </div>

      {/* 9. Signup Form & AI Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left: Form */}
        <div className="bg-white/80 dark:bg-[#162032]/80 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl">
           <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Aanmelden als ZZP'er</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Vul in wat je wilt delen — alleen naam en e-mail zijn verplicht. Voor volledige toegang tot VVC is een intake vereist.
                </p>
           </div>
           
           <form className="space-y-5">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <input type="text" placeholder="Naam *" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />
               <input type="email" placeholder="E-mail *" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />
             </div>
             
             <input type="text" placeholder="Telefoonnummer" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />
             <input type="text" placeholder="Bedrijfsnaam" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" placeholder="KVK-nummer" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />
                <input type="text" placeholder="Sector / branche" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />
             </div>
             
             <input type="text" placeholder="Jaren als ZZP'er" className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all" />

             <div className="pt-2">
                <label className="text-xs text-slate-500 uppercase font-bold mb-3 block tracking-wide">Maandelijkse omzet (indicatie)</label>
                <div className="relative">
                    <select className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-700 dark:text-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full appearance-none cursor-pointer hover:bg-slate-100 dark:hover:bg-[#111a2c] transition-colors">
                        <option>-- Selecteer omzet --</option>
                        <option>€0 - €5.000</option>
                        <option>€5.000 - €10.000</option>
                        <option>€10.000+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
             </div>
             
             <div className="pt-2">
               <label className="text-xs text-slate-500 uppercase font-bold mb-3 block tracking-wide">Waar ben je in geïnteresseerd?</label>
               <div className="flex flex-wrap gap-2">
                 {['Time Gap Cashflow', 'Passief inkomen', 'Vastgoed', 'Automatisering', 'Netwerk/community'].map(tag => (
                   <label key={tag} className="flex items-center gap-2 bg-slate-50 dark:bg-[#0B1120] px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700/50 cursor-pointer hover:border-cyan-500/50 hover:bg-slate-100 dark:hover:bg-[#111a2c] transition-all group select-none">
                     <div className="w-4 h-4 rounded border border-slate-400 dark:border-slate-600 group-hover:border-cyan-400 flex items-center justify-center bg-white dark:bg-slate-800">
                        <div className="w-2 h-2 bg-cyan-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
                     </div>
                     <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-white transition-colors">{tag}</span>
                   </label>
                 ))}
               </div>
             </div>

             <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase font-bold block tracking-wide">Hoe heb je ons gevonden?</label>
                    <div className="relative">
                        <select className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-700 dark:text-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full appearance-none">
                            <option>--</option>
                            <option>Social Media</option>
                            <option>Via via</option>
                            <option>Advertentie</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase font-bold block tracking-wide">Voorkeur voor contact</label>
                    <div className="relative">
                        <select className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-700 dark:text-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full appearance-none">
                            <option>E-mail</option>
                            <option>Telefoon</option>
                            <option>Whatsapp</option>
                        </select>
                         <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                 </div>
             </div>

             <textarea placeholder="Je vraag of opmerking" rows={4} className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none w-full transition-all resize-none mt-2"></textarea>
             
             <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
               <Zap className="w-5 h-5 fill-current" /> Verstuur aanmelding
             </button>
           </form>
        </div>

        {/* Right: AI Chat Card */}
        <div className="bg-gradient-to-b from-blue-100 to-slate-50 dark:from-blue-900/20 dark:to-[#0B1120] rounded-[2rem] p-1 h-full min-h-[500px] flex flex-col relative overflow-hidden group border border-slate-200 dark:border-white/5 shadow-2xl sticky top-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.1)_0%,transparent_60%)]"></div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
                 <div className="w-24 h-24 bg-white dark:bg-[#0F1623] rounded-3xl flex items-center justify-center mb-8 ring-1 ring-cyan-500/30 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                    <Cpu className="text-cyan-600 dark:text-cyan-400 w-12 h-12 animate-pulse" />
                 </div>
                 
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Of praat met onze AI</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-base mb-10 max-w-xs mx-auto leading-relaxed">
                    Stel al je vragen aan onze getrainde chatbot die alles weet over het VVC model, de cashflow en de strategie.
                 </p>

                 <button className="px-8 py-4 border border-cyan-500/30 bg-cyan-100 dark:bg-cyan-900/10 text-cyan-700 dark:text-cyan-400 rounded-2xl hover:bg-cyan-500 hover:text-white transition-all text-sm font-bold flex items-center gap-3 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                    <TrendingUp className="w-5 h-5" />
                    Bekijk de motor
                 </button>
            </div>
        </div>
      </div>

    </div>
  );
};