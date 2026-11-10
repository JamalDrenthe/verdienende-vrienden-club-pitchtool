import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Sparkles, DollarSign, Users, ShieldCheck, Zap, ArrowRight, ChevronDown, ChevronUp, X } from 'lucide-react';

interface VVCChatbotProps {
  onClose: () => void;
}

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

const knowledgeBase = [
  {
    keywords: ['verdien', 'geld', 'salaris', 'inkomen', 'betaald', '30', '300', 'finance'],
    response: "Het VVC Verdienmodel bestaat uit drie levels:\n\n1. **Uurvergoeding:** €30 per uur gegarandeerd tijdens acquisitie.\n2. **Plaatsingsbonus:** €300 bonus per afgeronde plaatsing direct uitbetaald.\n3. **Passief Portfolio:** €25 per maand per actieve geplaatste kandidaat.\n\nRekenvoorbeeld: 120 plaatsingen per jaar levert €3.000 per maand passief inkomen op."
  },
  {
    keywords: ['cultuur', 'waarden', 'sfeer', 'normen', 'dna'],
    response: "De kernwaarden van de VVC:\n\n1. **Loyaliteit:** Wij werken als vaste partners samen.\n2. **Executie:** Concrete resultaten en duidelijke afspraken.\n3. **Eigenaarschap:** Zelfstandig ondernemen met professionele clubondersteuning."
  },
  {
    keywords: ['wat is vvc', 'over ons', 'wie zijn jullie', 'bedrijf', 'club'],
    response: "De Verdienende Vrienden Club is een besloten netwerk van commerciële professionals. Wij koppelen specialisten aan vacatures en projecten met vaste uurvergoedingen, plaatsingsbonussen en maandelijks passief inkomen."
  },
  {
    keywords: ['diensten', 'wat doen jullie', 'klanten', 'aanbod', 'product'],
    response: "Onze operationele diensten voor partners:\n\n• **Werving & Selectie:** Selectie en plaatsing van kandidaten op openstaande rollen.\n• **Procesoptimalisatie:** Systemen stroomlijnen binnen organisaties.\n• **Kwaliteitscontrole:** Directe analyse van klantervaring en conversie."
  },
  {
    keywords: ['double', 'team', 'pilot', 'duo', 'samenwerken'],
    response: "**Double Team Formule**\n\nSamenwerking tussen twee specialisten:\n\n1. **Netwerker:** Legt contacten en opent deuren.\n2. **Closer:** Rondt het contract af.\n\nResultaat: Directe fee verdeling en structurele opbouw van passief inkomen."
  },
  {
    keywords: ['passief', 'sneeuwbal', 'toekomst', 'pensioen'],
    response: "**Passief Inkomen Model**\n\nElke geplaatste kandidaat levert maandelijks €25 op zolang de plaatsing actief blijft.\n\n• 10 kandidaten: €250 per maand\n• 120 kandidaten: €3.000 per maand\n\nDit inkomen keert maandelijks terug bovenop uw uren en plaatsingsbonussen."
  }
];

const suggestions = [
  { label: "Verdienmodel", icon: <DollarSign size={12} /> },
  { label: "Double Team", icon: <Users size={12} /> },
  { label: "Passief Inkomen", icon: <Zap size={12} /> },
  { label: "Kernwaarden", icon: <ShieldCheck size={12} /> },
];

export const VVCChatbot: React.FC<VVCChatbotProps> = ({ onClose }) => {
  const initialMessage: Message = {
    id: 1,
    sender: 'bot',
    text: 'Welkom bij de Verdienende Vrienden Club.\n\nStel hier uw vragen over het verdienmodel (€30 per uur, €300 bonus, €25 per maand passief), de Double Team opzet of onze intake procedure.'
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const processInput = (text: string): string => {
    const lowerText = text.toLowerCase();
    for (const entry of knowledgeBase) {
      if (entry.keywords.some(keyword => lowerText.includes(keyword))) {
        return entry.response;
      }
    }
    return "Onderwerp niet herkend. Vraag gerust naar:\n• Uurvergoeding (€30 per uur)\n• Plaatsingsbonus (€300 per deal)\n• Passief inkomen (€25 per maand per kandidaat)\n• Double Team samenwerking";
  };

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (msg.trim() === '') return;

    const userMessage: Message = { id: Date.now(), sender: 'user', text: msg };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = { id: Date.now() + 1, sender: 'bot', text: processInput(msg) };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] z-[60] flex flex-col bg-white dark:bg-[#0F1623] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden chat-slide-up">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/5 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Sparkles size={16} className="text-yellow-300" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">VVC Support</h3>
            <p className="text-white/60 text-[10px]">Online • Direct antwoord</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([initialMessage])}
            className="text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            Reset
          </button>
          <button aria-label="Sluit chat" onClick={onClose} className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} chat-msg-enter`}
          >
            <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5'
              }`}>
                {msg.sender === 'user' ? <User size={13} /> : <Sparkles size={13} className="text-yellow-500" />}
              </div>

              {/* Bubble */}
              <div className={`relative p-3.5 text-[13px] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm'
                  : 'bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-white/5 rounded-2xl rounded-tl-sm'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') ? (
                      <span className="block mb-1 font-semibold">{line}</span>
                    ) : (
                      <span className="block mb-1.5">{line}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Typing */}
        {isTyping && (
          <div className="flex justify-start w-full">
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5 flex items-center justify-center">
                <Sparkles size={13} className="text-yellow-500" />
              </div>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce chat-bounce-delay-1" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce chat-bounce-delay-2" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions + Input */}
      <div className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#0F1623] px-4 pt-3 pb-4">
        {/* Toggle */}
        <div className="flex justify-between items-center mb-1.5">
          <span className={`text-[9px] font-bold uppercase tracking-widest text-slate-400 transition-opacity ${showSuggestions ? 'opacity-100' : 'opacity-0'}`}>
            Suggesties
          </span>
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
          >
            {showSuggestions ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>
        </div>

        {/* Chips */}
        <div className={`transition-all duration-300 overflow-hidden ${showSuggestions ? 'max-h-20 opacity-100 mb-2' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="flex gap-1.5 overflow-x-auto pb-1 chat-scrollbar-hide">
            {suggestions.map((sugg, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sugg.label)}
                className="group flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all whitespace-nowrap"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{sugg.icon}</span>
                {sugg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-1.5 focus-within:border-indigo-500/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Typ uw bericht..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border-none px-3 py-2 text-sm font-medium outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
              input.trim()
                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105 active:scale-95'
                : 'bg-slate-200 dark:bg-white/10 text-slate-300 dark:text-slate-600 cursor-default'
            }`}
          >
            {input.trim() ? <Send size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
