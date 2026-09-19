import { useState, useRef, useEffect, useCallback } from 'react';

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

const DEMO_COMMAND = "Fix alignment";
const DEMO_RESPONSE = "Alignment is fixed across all spatial nodes.";
const DOWNLOAD_FULL_TEXT = "To interact with your codebase, download Neuron";
const PREFIX = "To interact with your codebase, ";

export default function AntigravityAgentShowcase() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTypingAnimation, setIsTypingAnimation] = useState(false);
  const [options, setOptions] = useState([]);
  const [userInteracted, setUserInteracted] = useState(false);

  const messagesBoxRef = useRef(null);
  const idRef = useRef(100);
  const typewriterTimeoutRef = useRef(null);
  const sectionRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const scrollToDownload = () => {
    const el = document.getElementById('download-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, inputValue, options]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
    };
  }, []);

  // Stream assistant response character-by-character
  const streamAgentResponse = useCallback((fullText, isDownload = false, onDone) => {
    idRef.current += 1;
    const agentMsgId = `agent-${idRef.current}`;

    const agentMsg = {
      id: agentMsgId,
      sender: 'agent',
      time: '12:01',
      isDownload,
      displayedText: ''
    };

    setMessages(prev => [...prev, agentMsg]);

    let charIndex = 0;
    const streamTick = () => {
      if (charIndex < fullText.length) {
        charIndex += Math.min(2, fullText.length - charIndex);
        const currentSlice = fullText.slice(0, charIndex);
        setMessages(prev =>
          prev.map(m => (m.id === agentMsgId ? { ...m, displayedText: currentSlice } : m))
        );
        typewriterTimeoutRef.current = setTimeout(streamTick, 18);
      } else {
        setMessages(prev =>
          prev.map(m => (m.id === agentMsgId ? { ...m, displayedText: fullText } : m))
        );
        if (onDone) onDone();
      }
    };

    typewriterTimeoutRef.current = setTimeout(streamTick, 30);
  }, []);

  // Execute user action (from chip click or input submission) -> streams "To interact with your codebase, download Neuron"
  const executeUserAction = useCallback((promptText) => {
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setIsTypingAnimation(false);
    setOptions([]); // hide chips when action is executed

    idRef.current += 1;
    const userMsg = {
      id: `user-${idRef.current}`,
      sender: 'user',
      time: '12:01',
      text: promptText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    typewriterTimeoutRef.current = setTimeout(() => {
      streamAgentResponse(DOWNLOAD_FULL_TEXT, true);
    }, 280);
  }, [streamAgentResponse]);

  // Automated Typewriter Demo on scroll:
  // 1. Types "Fix alignment" into input
  // 2. Submits user message
  // 3. Types response: "Alignment is fixed across all spatial nodes."
  // 4. AFTER response is finished typing, reveals the 3 command chips!
  const startTypewriterDemo = useCallback(() => {
    setIsTypingAnimation(true);
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex < DEMO_COMMAND.length) {
        charIndex += 1;
        setInputValue(DEMO_COMMAND.slice(0, charIndex));
        typewriterTimeoutRef.current = setTimeout(typeNextChar, 50);
      } else {
        // Finished typing command in input
        typewriterTimeoutRef.current = setTimeout(() => {
          setIsTypingAnimation(false);
          setInputValue('');

          idRef.current += 1;
          const userMsg = {
            id: `user-${idRef.current}`,
            sender: 'user',
            time: '12:01',
            text: DEMO_COMMAND
          };

          setMessages(prev => [...prev, userMsg]);

          // Typewrite the alignment fixed response
          typewriterTimeoutRef.current = setTimeout(() => {
            streamAgentResponse(DEMO_RESPONSE, false, () => {
              // After typing finishes, reveal the three command chips!
              setTimeout(() => {
                setOptions(SUGGESTED_OPTIONS);
              }, 200);
            });
          }, 300);
        }, 350);
      }
    };

    typewriterTimeoutRef.current = setTimeout(typeNextChar, 350);
  }, [streamAgentResponse]);

  // Trigger typewriter demo when user scrolls down to this section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScrollCheck = () => {
      if (hasTriggeredRef.current || userInteracted) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= viewportHeight * 0.75 && rect.bottom >= viewportHeight * 0.25) {
        hasTriggeredRef.current = true;
        setTimeout(() => {
          startTypewriterDemo();
        }, 300);
        window.removeEventListener('scroll', handleScrollCheck);
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    setTimeout(handleScrollCheck, 400);

    return () => {
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, [startTypewriterDemo, userInteracted]);

  // User manually clicking a suggested chip -> streams try Neuron
  const handleSelectOption = (label) => {
    setUserInteracted(true);
    hasTriggeredRef.current = true;
    executeUserAction(label);
  };

  // User manually typing and submitting -> streams try Neuron
  const handleSendMessage = (e) => {
    e?.preventDefault();
    setUserInteracted(true);
    hasTriggeredRef.current = true;
    const text = inputValue.trim();
    if (!text) return;
    executeUserAction(text);
  };

  const handleInputChange = (e) => {
    setUserInteracted(true);
    hasTriggeredRef.current = true;
    if (typewriterTimeoutRef.current) {
      clearTimeout(typewriterTimeoutRef.current);
    }
    setIsTypingAnimation(false);
    setInputValue(e.target.value);
  };

  return (
    <section ref={sectionRef} className="mb-24 sm:mb-28 w-full text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Simplified AI integration copy */}
        <div className="lg:col-span-5 text-left flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 leading-snug">
            Integrate AI with your codebase
          </h2>
        </div>

        {/* RIGHT COLUMN: Clean Interactive Assistant Window (Fixed height matching theme box) */}
        <div className="lg:col-span-7 w-full">
          <div className="w-full bg-[#0d0e12] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl font-sans text-xs text-slate-300 flex flex-col h-[460px] sm:h-[480px] justify-between">
            
            {/* Header: Clean minimal title matching reference image */}
            <div className="h-10 bg-[#101116] border-b border-white/[0.06] px-4 flex items-center justify-between select-none shrink-0">
              <span className="text-xs font-medium text-slate-300">AI Assistant</span>
              <span className="text-[11px] text-slate-500 font-mono">@App.jsx</span>
            </div>

            {/* Messages Flow - Fixed scrollable body that never causes outer box to jump or resize */}
            <div ref={messagesBoxRef} className="flex-1 p-4 sm:p-5 space-y-3.5 overflow-y-auto bg-[#0a0b0e] scrollbar-thin">
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

                const currentText = msg.displayedText ?? msg.text ?? '';

                return (
                  <div key={msg.id} className="space-y-1">
                    <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span>Assistant</span>
                      <span>{msg.time}</span>
                    </div>

                    <div className="bg-[#12141a] border border-white/[0.08] rounded-xl p-3 text-xs space-y-1.5 shadow-sm text-slate-200">
                      {msg.isDownload ? (
                        <span className="flex items-center gap-1 flex-wrap text-slate-200">
                          {(() => {
                            if (currentText.length <= PREFIX.length) {
                              return <span>{currentText}</span>;
                            }
                            const linkText = currentText.slice(PREFIX.length);
                            return (
                              <>
                                <span>{PREFIX}</span>
                                <button
                                  onClick={scrollToDownload}
                                  className="text-[#3b82f6] underline hover:text-[#60a5fa] font-medium cursor-pointer transition-colors"
                                >
                                  {linkText}
                                </button>
                              </>
                            );
                          })()}
                        </span>
                      ) : (
                        currentText
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggested Option Chips: Only shown after alignment response finishes typing */}
            {options.length > 0 && (
              <div className="px-3 py-2 bg-[#0c0d12] border-t border-white/[0.05] flex flex-wrap gap-1.5 select-none shrink-0 transition-opacity duration-300">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.label)}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-[11px] text-slate-300 transition-all cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>{opt.label}</span>
                    <span className="text-[#60A5FA]">→</span>
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#101117] border-t border-white/[0.06] shrink-0">
              <div className="flex items-center gap-2 bg-[#0a0b0e] border border-white/[0.08] rounded-lg px-3 py-1.5 focus-within:border-white/[0.2] transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask a question or request an edit (Enter to send)..."
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-600 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  disabled={isTypingAnimation}
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
