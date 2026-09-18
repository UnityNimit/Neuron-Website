import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'agent',
    time: '12:00',
    text: 'Hello! I can help you inspect code, navigate spatial conduits, and suggest edits. What would you like to explore?'
  }
];

const SUGGESTED_OPTIONS = [
  { id: 'opt-1', label: 'Fix alignment' },
  { id: 'opt-2', label: 'Explain code structure' },
  { id: 'opt-3', label: 'Find dependencies' }
];

export default function AntigravityAgentShowcase() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const messagesBoxRef = useRef(null);
  const idRef = useRef(100);

  const scrollToDownload = () => {
    const el = document.getElementById('download-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const executeAction = (promptText) => {
    idRef.current += 1;
    const userMsgId = `user-${idRef.current}`;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      time: '12:01',
      text: promptText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      idRef.current += 1;
      const agentMsg = {
        id: `agent-${idRef.current}`,
        sender: 'agent',
        time: '12:01',
        text: (
          <span className="flex items-center gap-1.5 text-slate-300">
            To interact with your codebase,{' '}
            <button
              onClick={scrollToDownload}
              className="text-[#60A5FA] underline hover:text-[#93c5fd] font-medium cursor-pointer transition-colors"
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

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="mb-24 sm:mb-28 w-full text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Simplified AI integration copy */}
        <div className="lg:col-span-5 text-left flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-snug">
            Integrate AI with your codebase
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
            Neuron connects AI assistance directly to your 2D spatial canvas. Query code relationships, inspect syntax trees, and evaluate changes without breaking flow.
          </p>
        </div>

        {/* RIGHT COLUMN: Clean Interactive Assistant Window */}
        <div className="lg:col-span-7 w-full">
          <div className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl font-sans text-xs text-slate-300 flex flex-col">
            
            {/* Header: Clean minimal title, no dots, no model selector */}
            <div className="h-10 bg-[#101116] border-b border-white/[0.06] px-4 flex items-center justify-between select-none">
              <span className="text-xs font-medium text-slate-300">AI Assistant</span>
              <span className="text-[11px] text-slate-500 font-mono">@App.jsx</span>
            </div>

            {/* Messages Flow */}
            <div ref={messagesBoxRef} className="p-4 space-y-3.5 max-h-[300px] min-h-[200px] overflow-y-auto bg-[#0a0b0e]">
              {messages.map(msg => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex flex-col items-end space-y-1">
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <span>You</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="bg-[#1e2027] border border-white/[0.08] text-slate-100 px-3.5 py-2 rounded-xl max-w-[85%] text-xs">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="space-y-1">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span>Assistant</span>
                      <span>{msg.time}</span>
                    </div>

                    <div className="bg-[#12141a] border border-white/[0.08] rounded-xl p-3 text-xs space-y-1.5 shadow-sm text-slate-200">
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggested Option Chips */}
            <div className="px-3 py-2 bg-[#0c0d12] border-t border-white/[0.05] flex flex-wrap gap-1.5 select-none">
              {SUGGESTED_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => executeAction(opt.label)}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-[11px] text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{opt.label}</span>
                  <span className="text-[#60A5FA]">→</span>
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#101117] border-t border-white/[0.06]">
              <div className="flex items-center gap-2 bg-[#0a0b0e] border border-white/[0.08] rounded-lg px-3 py-1.5 focus-within:border-white/[0.2] transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question or request an edit (Enter to send)..."
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-white text-black hover:bg-slate-200 transition-colors text-xs font-semibold cursor-pointer shrink-0"
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
