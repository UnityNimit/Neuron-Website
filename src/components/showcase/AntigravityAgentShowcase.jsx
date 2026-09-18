import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'agent',
    time: '05:03',
    type: 'welcome',
    showThinking: false,
    content: (
      <div className="space-y-3 font-sans text-xs">
        <p className="text-slate-200">
          Welcome to <strong className="text-white font-semibold">Neuron Spatial Agent</strong>.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Neuron does not host or vend AI models. Connect your own API keys for{' '}
          <span className="bg-[#182338] text-[#93c5fd] px-2 py-0.5 rounded border border-[#1e3a5f] text-[11px] font-mono">
            Gemini 3.8 Flash
          </span>
          ,{' '}
          <span className="bg-[#182338] text-[#93c5fd] px-2 py-0.5 rounded border border-[#1e3a5f] text-[11px] font-mono">
            Claude Sonnet 4.6
          </span>
          , or run offline locally with{' '}
          <span className="bg-[#182338] text-[#93c5fd] px-2 py-0.5 rounded border border-[#1e3a5f] text-[11px] font-mono">
            Ollama
          </span>
          .
        </p>
        <p className="text-slate-400 leading-relaxed">
          Ask architectural questions, request refactors with explicit change approval, or inspect code dependencies in real time.
        </p>
      </div>
    )
  },
  {
    id: 'msg-2',
    sender: 'user',
    time: '05:13',
    text: 'hello'
  },
  {
    id: 'msg-3',
    sender: 'agent',
    time: '05:13',
    type: 'response',
    text: 'Hello! I am your AI agent inside Neuron IDE. How can I assist you with your code?'
  }
];

const SUGGESTED_OPTIONS = [
  { id: 'opt-1', label: 'Refactor @App.jsx spatial canvas hooks' },
  { id: 'opt-2', label: 'Trace cyclomatic call conduits' },
  { id: 'opt-3', label: 'Run unsupervised Louvain partition' }
];

export default function AntigravityAgentShowcase() {
  const [selectedModel, setSelectedModel] = useState('Gemini 3.8 Flash');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);
  const messagesBoxRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  const availableModels = [
    'Gemini 3.8 Flash',
    'Gemini 3.7 Flash',
    'Gemini 3.6 Flash',
    'Gemini 3.1 Pro',
    'Claude Sonnet 4.6 (Thinking)',
    'Claude Opus 4.6 (Thinking)',
    'GPT-OSS 120B (Medium)',
    'Ollama (qwen2.5-coder)'
  ];

  const scrollToDownload = () => {
    const el = document.getElementById('download-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const executeAction = (promptText) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      time: timeStr,
      text: promptText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      const responseTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const agentMsg = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        time: responseTime,
        type: 'response',
        text: (
          <span className="flex items-center gap-1 text-slate-300">
            To chat,{' '}
            <button
              onClick={scrollToDownload}
              className="text-[#60A5FA] underline hover:text-[#93c5fd] font-semibold cursor-pointer transition-colors"
            >
              download Neuron
            </button>
          </span>
        )
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 400);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    executeAction(text);
  };

  // Scroll listener: trigger initial subtle demonstration on first view
  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimatedIn || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        setHasAnimatedIn(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimatedIn]);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section ref={sectionRef} className="mb-36 md:mb-48 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Classy, Utilitarian Copy (Zero Emojis, Zero Glowing Slop)    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 text-left flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-5 leading-[1.12]">
            Agents that turn ideas into code
          </h2>
          
          <p className="text-[#8e96a4] text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Neuron provides an autonomous agent engine integrated directly into your spatial codebase graph. Rather than superficial autocomplete, it perceives your entire abstract syntax tree and project invariants.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-white font-medium">Topological Graph Context</span>
              <span className="text-xs text-[#808794] leading-relaxed">
                Queries dependencies, imports, and Louvain modularity clusters before drafting modifications.
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-white font-medium">Frontier Model Orchestration</span>
              <span className="text-xs text-[#808794] leading-relaxed">
                Seamless access to Gemini 3.8 Flash, Claude Sonnet 4.6 (Thinking), and high-throughput local weights.
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-white font-medium">Deterministic Local Verification</span>
              <span className="text-xs text-[#808794] leading-relaxed">
                Synthesizes diffs with automated AST sanity checks to eliminate hallucinations.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Interactive Antigravity Studio (Clean Header, Single Tab)   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 w-full">
          <div className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.7)] font-mono text-xs text-slate-300 flex flex-col">
            
            {/* 1. Header Bar: Clean minimal bar with window dots and model selector (No title text!) */}
            <div className="h-11 bg-[#101116] border-b border-white/[0.06] px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              </div>

              {/* Model Dropdown Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#13151b] hover:bg-[#181b24] border border-white/[0.08] text-[11px] text-slate-200 transition-colors cursor-pointer"
                >
                  <span>{selectedModel}</span>
                  <ChevronDown size={11} className="text-slate-400" />
                </button>

                {isModelDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-60 bg-[#12141a] border border-white/[0.12] rounded-lg shadow-2xl py-1 z-30 max-h-60 overflow-y-auto">
                    {availableModels.map(m => (
                      <button
                        key={m}
                        onClick={() => {
                          setSelectedModel(m);
                          setIsModelDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-[11px] transition-colors flex items-center justify-between cursor-pointer ${
                          selectedModel === m ? 'bg-white/[0.08] text-[#60A5FA]' : 'text-slate-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{m}</span>
                        {selectedModel === m && <Check size={12} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Messages Flow */}
            <div ref={messagesBoxRef} className="p-4 space-y-4 max-h-[360px] overflow-y-auto bg-[#0a0b0e]">
              {messages.map(msg => {
                if (msg.type === 'welcome') {
                  return (
                    <div key={msg.id} className="space-y-1.5">
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <span>Agent</span>
                        <span>{msg.time}</span>
                      </div>
                      
                      <div className="bg-[#12141a] border border-white/[0.08] rounded-xl p-4 text-[12px] space-y-3 shadow-sm">
                        {/* Collapsible Thought Trace Header */}
                        <div 
                          onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                          className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-[10px] text-slate-400 cursor-pointer hover:text-slate-200 select-none"
                        >
                          <div className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-slate-400">
                            <span className="text-[9px]">{isThinkingExpanded ? '▼' : '▶'}</span>
                            <span>THINKING PROCESS</span>
                          </div>
                          <span className="text-slate-600 font-mono tracking-widest text-[9px] uppercase">
                            THOUGHT TRACE
                          </span>
                        </div>

                        {isThinkingExpanded && (
                          <div className="bg-[#0c0d12] p-2.5 rounded border border-white/[0.04] text-[10px] text-slate-400 space-y-1 font-mono">
                            <div>• Initialized AST symbol index for workspace.</div>
                            <div>• Cross-referencing 24 nodes with Louvain clusters.</div>
                            <div>• Verified zero cyclic imports in dependency graph.</div>
                          </div>
                        )}

                        {msg.content}
                      </div>
                    </div>
                  );
                }

                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex flex-col items-end space-y-1">
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <span>You</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="bg-[#1e2027] border border-white/[0.08] text-slate-100 px-4 py-2 rounded-2xl max-w-[80%] text-[12px]">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="space-y-1.5">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span>Agent</span>
                      <span>{msg.time}</span>
                    </div>

                    <div className="bg-[#12141a] border border-white/[0.08] rounded-xl p-3.5 text-[12px] space-y-2 shadow-sm">
                      <div className="text-slate-200 font-sans text-xs">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 4. Interactive Suggestion Option Chips inside Chatbot */}
            <div className="px-3 pt-2.5 pb-2 bg-[#0c0d12] border-t border-white/[0.05] flex flex-wrap gap-1.5 select-none">
              {SUGGESTED_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => executeAction(opt.label)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-[#60A5FA]/50 text-[11px] text-slate-300 transition-all cursor-pointer font-mono flex items-center gap-1.5"
                >
                  <span>{opt.label}</span>
                  <span className="text-[#60A5FA] font-bold">→</span>
                </button>
              ))}
            </div>

            {/* Context Tag Bar */}
            <div className="px-4 py-1.5 bg-[#0d0e14] border-t border-white/[0.05] flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Context:</span>
                <span className="bg-[#161922] border border-white/[0.1] text-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                  @App.jsx
                </span>
              </div>
              <span className="text-[10px] text-slate-500 select-none">
                Attached
              </span>
            </div>

            {/* 5. Interactive Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#101117] border-t border-white/[0.06]">
              <div className="flex items-center gap-2 bg-[#0a0b0e] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-white/[0.2] transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Neuron or request refactor (Enter to send)..."
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors text-[11px] font-medium cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
