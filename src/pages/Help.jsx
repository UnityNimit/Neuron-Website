import React, { useState } from 'react';
import { Mail, Check, Send, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';

const FAQS = [
  {
    q: 'How does the 2D spatial canvas differ from a conventional file tree?',
    a: 'Traditional file trees present code as static hierarchical folders on disk. Neuron parses your abstract syntax trees using Tree-Sitter and renders functions, classes, and modules as topological nodes connected by actual runtime call conduits, Louvain modularity clusters, and cyclomatic risk indicators.'
  },
  {
    q: 'Does Neuron upload code, embeddings, or AST graphs to remote servers?',
    a: 'Zero cloud ingestion. All parsing, graph physics relaxation, vector embeddings, and AST mutations run strictly on your local CPU and GPU. The local FastAPI daemon communicates via local 127.0.0.1 IPC sockets.'
  },
  {
    q: 'Does Neuron vend or host AI models, or do I bring my own keys?',
    a: 'Neuron does not vend, host, or proxy any AI models. You bring your own API keys (BYOK) for providers like Google Gemini (3.8, 3.7, 3.6, 3.1 Pro), Anthropic Claude (Sonnet 4.6, Opus 4.6), OpenAI, or run completely offline and private using local runtimes like Ollama and vLLM.'
  },
  {
    q: 'How does bidirectional synchronization maintain code correctness?',
    a: 'When you modify files on disk or in the editor, Tree-Sitter re-indexes AST nodes in under 4ms. Conversely, when you link nodes or accept refactors on the spatial canvas, LibCST transforms the code while strictly preserving indentation, comments, and docstrings.'
  },
  {
    q: 'What are the system prerequisites for running the desktop installer?',
    a: 'Neuron runs on 64-bit Windows 10 and 11. It leverages hardware WebGPU acceleration for high-framerate graph physics. The standalone installer bundles all required dependencies.'
  },
  {
    q: 'How do I report bugs or submit feature proposals?',
    a: 'You can submit technical queries directly using the form below or open an issue on our official GitHub repository at https://github.com/UnityNimit/Neuron/issues.'
  }
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Architecture & AST Engine',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    
    const subject = encodeURIComponent(`[Neuron Query] ${formState.topic} - ${formState.name}`);
    const body = encodeURIComponent(formState.message);
    const mailtoUrl = `mailto:support@neuron.sh?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between pt-14">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06)_0%,transparent_60%)]" />

      <main className="relative z-10 pt-20 pb-24 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full">
        <div className="text-left mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-[#60A5FA] mb-2 font-medium">
            Support & Inquiries
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Help & Queries
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Find answers to common technical questions about the spatial engine, localhost runtime, and submit inquiries directly to the team.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-6">
            Frequently Answered Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#0b0c10] border border-white/[0.08] hover:border-white/[0.14] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-white leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#60A5FA]' : ''}`} 
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[#0b0c10] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[#60A5FA] text-xs font-mono mb-2">
              <Mail size={14} />
              <span>Direct Communication</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2">
              Mail Your Queries to Us
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Have an architectural question, enterprise setup inquiry, or specific feature query? Send a message directly to our core developers.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check size={18} />
              </div>
              <h3 className="text-base font-semibold text-white">Inquiry Prepared</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Your email draft has been generated. If your email client did not automatically open, write directly to <span className="text-[#60A5FA] font-mono">support@neuron.sh</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs font-mono text-slate-300 hover:text-white underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[11px] block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-[#111217] border border-white/[0.08] focus:border-[#60A5FA]/60 rounded-lg px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[11px] block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-[#111217] border border-white/[0.08] focus:border-[#60A5FA]/60 rounded-lg px-3.5 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-[11px] block">Topic</label>
                <select
                  value={formState.topic}
                  onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                  className="w-full bg-[#111217] border border-white/[0.08] focus:border-[#60A5FA]/60 rounded-lg px-3.5 py-2.5 text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="Architecture & AST Engine">Architecture & AST Engine</option>
                  <option value="Autonomous Agents">Autonomous Agents</option>
                  <option value="Windows Desktop Setup">Windows Desktop Setup</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-[11px] block">Your Query / Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your query, repository structure, or technical question..."
                  className="w-full bg-[#111217] border border-white/[0.08] focus:border-[#60A5FA]/60 rounded-lg p-3.5 text-slate-200 placeholder-slate-600 focus:outline-none leading-relaxed resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-sans">
                  Direct email: <a href="mailto:support@neuron.sh" className="text-slate-300 hover:text-white underline">support@neuron.sh</a>
                </div>

                <button
                  type="submit"
                  className="h-10 px-6 rounded-lg bg-white text-black font-semibold text-xs hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Send size={13} />
                  <span>Send Query</span>
                </button>
              </div>
            </form>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}