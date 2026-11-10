import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Sparkles, DollarSign, Users, Zap, ShieldCheck, ChevronDown, ChevronUp, X, Bot, ArrowRight } from 'lucide-react';
import { askGemini, ChatMessage } from '../lib/geminiChat';
import { sfx } from '../lib/soundFx';

interface VVCChatbotProps {
  onClose: () => void;
}

const suggestions = [
  { label: 'Rekenvoorbeeld 10 deals', prompt: 'Reken exact voor hoeveel ik verdien bij 10 plaatsingen per maand en 20 uur per week.', icon: <DollarSign size={13} /> },
  { label: 'Wat is Double Team?', prompt: 'Hoe werkt de Double Team formule tussen Netwerker en Closer precies?', icon: <Users size={13} /> },
  { label: 'Hoe werkt passief inkomen?', prompt: 'Leg uit hoe het passief inkomen van €25 per maand per kandidaat cumulatief opbouwt.', icon: <Zap size={13} /> },
  { label: 'Hoe meld ik me aan?', prompt: 'Wat is de procedure om toe te treden als partner via de JOIN knop?', icon: <ShieldCheck size={13} /> },
];

export const VVCChatbot: React.FC<VVCChatbotProps> = ({ onClose }) => {
  const initialMessage: ChatMessage = {
    id: 1,
    sender: 'bot',
    text: 'Welkom bij de Verdienende Vrienden Club.\n\nIk ben de officiële VVC AI Assistent. Stel gerust elke vraag over onze inkomstenlevels (€30/uur basis, €300 plaatsingsbonus, €25/mnd passief), de Double Team formule of je aanmelding.',
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt || input).trim();
    if (!textToSend || isTyping) return;

    sfx.tick();
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsTyping(true);

    try {
      const botReplyText = await askGemini(textToSend, newHistory);
      sfx.pop();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReplyText,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Er trad een verbindingsfout op. Het VVC model bestaat uit: €30 per uur basis, €300 plaatsingsbonus en €25 per maand passief per kandidaat.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 sm:right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] z-[60] flex flex-col bg-[#0a0a0a] border border-[#262626] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden chat-slide-up">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f] bg-gradient-to-r from-[#141414] via-[#0d0d0d] to-[#0a0a0a] relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e6007e] to-transparent opacity-80" />
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#e6007e]/20 border border-[#e6007e]/40 rounded-xl flex items-center justify-center text-[#e6007e] shadow-[0_0_15px_rgba(230,0,126,0.3)]">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-black text-sm tracking-tight">VVC AI Assistent</h3>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[#a1a1aa] text-[11px] font-medium">Gemini 3.5 Intelligentie</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sfx.click();
              setMessages([initialMessage]);
            }}
            title="Wis gespreksgeschiedenis"
            className="text-[#a1a1aa] hover:text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            Reset
          </button>
          <button
            aria-label="Sluit chat"
            onClick={() => {
              sfx.whoosh();
              onClose();
            }}
            className="text-[#a1a1aa] hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
            >
              <div className={`flex max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2.5`}>
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isUser
                      ? 'bg-[#e6007e] text-white shadow-md shadow-[#e6007e]/30'
                      : 'bg-[#141414] border border-[#262626] text-[#e6007e]'
                  }`}
                >
                  {isUser ? <User size={13} /> : <Bot size={13} />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-3.5 text-xs sm:text-[13px] leading-relaxed rounded-2xl ${
                    isUser
                      ? 'bg-[#e6007e] text-white rounded-tr-sm font-medium shadow-md shadow-[#e6007e]/20'
                      : 'bg-[#0f0f0f] text-[#f4f4f5] border border-[#222222] rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) {
                      return <div key={i} className="h-2" />;
                    }
                    if (trimmed.startsWith('* ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                      const itemText = trimmed.replace(/^[\*•\-]\s*/, '');
                      return (
                        <div key={i} className="flex items-start gap-1.5 my-1">
                          <span className="text-[#e6007e] font-black leading-tight">•</span>
                          <span className="flex-1 leading-snug">{renderInlineStyles(itemText)}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="mb-1.5 last:mb-0">
                        {renderInlineStyles(line)}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start w-full animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-[#141414] border border-[#262626] text-[#e6007e] flex items-center justify-center shrink-0">
                <Sparkles size={13} className="text-[#e6007e] animate-pulse" />
              </div>
              <div className="bg-[#0f0f0f] border border-[#222222] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#a1a1aa] mr-1">VVC AI denkt na</span>
                <span className="w-1.5 h-1.5 bg-[#e6007e] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#e6007e] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#e6007e] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips & Input */}
      <div className="border-t border-[#1c1c1c] bg-[#0a0a0a] px-3.5 pt-3 pb-3.5">
        {/* Toggle Suggestions */}
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a1a1aa]">
            Directe Vragen
          </span>
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-[#a1a1aa] hover:text-white transition-colors p-0.5 rounded"
          >
            {showSuggestions ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>

        {/* Suggestion Pills */}
        {showSuggestions && (
          <div className="flex gap-1.5 overflow-x-auto pb-2 chat-scrollbar-hide">
            {suggestions.map((sugg, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => handleSend(sugg.prompt)}
                className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#e6007e]/60 rounded-full text-[11px] font-bold text-[#d4d4d8] hover:text-white transition-all whitespace-nowrap active:scale-95 disabled:opacity-40"
              >
                <span className="text-[#e6007e] group-hover:scale-110 transition-transform">{sugg.icon}</span>
                <span>{sugg.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Text Input Row */}
        <div className="flex items-center gap-2 bg-[#121212] border border-[#262626] focus-within:border-[#e6007e] focus-within:shadow-[0_0_15px_rgba(230,0,126,0.3)] rounded-2xl p-1.5 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isTyping ? 'VVC AI typt een antwoord...' : 'Stel je vraag over het verdienmodel...'}
            className="flex-1 bg-transparent text-white placeholder-[#71717a] border-none px-3 py-2 text-xs sm:text-sm font-medium outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            aria-label="Verstuur bericht"
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
              input.trim() && !isTyping
                ? 'bg-[#e6007e] hover:bg-[#c00069] text-white shadow-md shadow-[#e6007e]/35 hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-[#1c1c1c] text-[#52525b] cursor-default'
            }`}
          >
            {input.trim() ? <Send size={15} /> : <ArrowRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to render basic inline markdown bold tags like **text**
function renderInlineStyles(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
