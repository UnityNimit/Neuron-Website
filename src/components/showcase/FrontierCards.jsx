import React, { useState } from 'react';
import { ChevronDown, Check, Terminal, Bot } from 'lucide-react';

export default function FrontierCards() {
  const [selectedModel, setSelectedModel] = useState('Gemini 3.8 Flash');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const models = [
    { name: 'Gemini 3.8 Flash' },
    { name: 'Gemini 3.7 Flash' },
    { name: 'Gemini 3.6 Flash' },
    { name: 'Gemini 3.1 Pro' },
    { name: 'Claude Sonnet 4.6 (Thinking)' },
    { name: 'Claude Opus 4.6 (Thinking)' },
    { name: 'GPT-OSS 120B (Medium)' },
    { name: 'Ollama (qwen2.5-coder)' }
  ];

  return (
    <section className="mb-36 md:mb-48 w-full text-left">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
          Stay on the frontier
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* ========================================================================= */}
        {/* CARD 1: Model Orchestration (Single clean card, model in middle)          */}
        {/* ========================================================================= */}
        <div className="bg-[#0b0c10] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/15 transition-all min-h-[300px] relative">
          <div>
            <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
              Bring your own key or run locally
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Neuron does not vend or host AI models. Connect your personal API keys for Google Gemini, Anthropic Claude, or run offline locally with Ollama.
            </p>
          </div>

          {/* Model Selector in the Middle (Clean single-layer input, no nested boxes) */}
          <div className="relative z-20 my-auto py-3">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-2 text-slate-200 cursor-pointer hover:border-white/20 transition-colors font-mono text-xs"
            >
              <span className="flex items-center gap-2">
                <Bot size={14} className="text-[#60A5FA]" />
                <span>Agent</span>
              </span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="truncate max-w-[130px]">{selectedModel}</span>
                <ChevronDown size={12} />
              </div>
            </div>

            {/* Absolute Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#141720] border border-white/[0.14] rounded-xl shadow-2xl p-1 z-50 space-y-0.5 font-mono max-h-60 overflow-y-auto">
                {models.map(m => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => {
                      setSelectedModel(m.name);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] flex items-center justify-between cursor-pointer transition-colors ${
                      selectedModel === m.name ? 'text-[#60A5FA] bg-white/[0.08] font-medium' : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{m.name}</span>
                    {selectedModel === m.name && <Check size={11} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: Autonomous Spatial Agents (Single clean card, no nested boxes)    */}
        {/* ========================================================================= */}
        <div className="bg-[#0b0c10] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/15 transition-all min-h-[300px]">
          <div>
            <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
              Build with autonomous agents
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Launch agents that traverse dependency trees, evaluate cyclomatic risk, and verify refactors before you commit.
            </p>
          </div>

          {/* Clean task list without nested inner box */}
          <div className="space-y-2.5 my-auto py-3 font-mono text-xs">
            <div className="text-slate-500 uppercase text-[10px] tracking-wider font-bold">Active Refactors</div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shrink-0" />
              <span className="truncate">AST parser conduit cache</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shrink-0" />
              <span className="truncate">Louvain modularity clusters</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shrink-0" />
              <span className="truncate">Resolve circular imports</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: 100% Localhost Execution (Single clean card, no nested boxes)     */}
        {/* ========================================================================= */}
        <div className="bg-[#0b0c10] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/15 transition-all min-h-[300px]">
          <div>
            <h3 className="text-lg font-medium text-white mb-2 tracking-tight">
              Develop enduring software
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              100% localhost engine. AST parsing, graph relaxation, and code execution run strictly on your local CPU & GPU.
            </p>
          </div>

          {/* Clean pointwise specifications without nested inner box */}
          <div className="space-y-2.5 my-auto py-3 font-mono text-xs">
            <div className="text-slate-500 uppercase text-[10px] tracking-wider font-bold">Privacy Architecture</div>
            <div className="text-slate-300 text-[11px] leading-relaxed">
              <span className="font-semibold text-white">Local AST execution:</span> Tree-Sitter daemon parses solely on local RAM.
            </div>
            <div className="text-slate-300 text-[11px] leading-relaxed">
              <span className="font-semibold text-white">Zero cloud telemetry:</span> No source code or tokens leave your workstation.
            </div>
            <div className="text-slate-300 text-[11px] leading-relaxed">
              <span className="font-semibold text-white">Direct client isolation:</span> 100% offline execution for private repos.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
