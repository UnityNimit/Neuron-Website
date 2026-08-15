// src/pages/Docs.jsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Terminal, Cpu, Network, Zap, 
  ChevronRight, Search, Menu, X, Box, Code2
} from 'lucide-react';
import GlassPanel from '../components/GlassPanel';

// --- NAVIGATION SCHEMA ---
// This defines the entire structure of the massive documentation.
const DOCS_NAVIGATION = [
  {
    category: "Getting Started",
    items: [
      { id: "intro", label: "Introduction", icon: BookOpen },
      { id: "install", label: "Installation & Setup", icon: Terminal },
      { id: "quickstart", label: "Quickstart Guide", icon: Zap },
    ]
  },
  {
    category: "Core Architecture",
    items: [
      { id: "spatial-engine", label: "Spatial Rendering Engine", icon: Box },
      { id: "physics", label: "D3 Physics & Gravity", icon: Network },
      { id: "ast-parser", label: "AST Multi-Modal Parser", icon: Code2 },
    ]
  },
  {
    category: "Machine Learning",
    items: [
      { id: "ml-overview", label: "AI & ML Overview", icon: Cpu },
      { id: "louvain", label: "Louvain Community Nebulas", icon: Network },
      { id: "risk-model", label: "Random Forest Risk Heuristics", icon: Zap },
      { id: "llm-peel", label: "Local LLM Semantic Peel", icon: BookOpen },
    ]
  }
];

export default function Docs() {
  const [activePage, setActivePage] = useState('intro');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => document.body.style.overflow = 'auto';
  }, [isMobileNavOpen]);

  // --- THE SIDEBAR COMPONENT ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Doc Search Bar */}
      <div className="mb-8 relative group">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Search documentation..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#111111] border border-white/10 focus:border-blue-500/50 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 shadow-inner"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto pr-2 pb-20 space-y-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10">
        {DOCS_NAVIGATION.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] mb-3 ml-2">
              {section.category}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = activePage === item.id;
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActivePage(item.id);
                        setIsMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-500/10 text-blue-400 shadow-[inset_2px_0_0_0_#3b82f6]' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} className={isActive ? "opacity-100" : "opacity-50"} />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans relative flex pt-16">
      
      {/* Background ambient glow */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* MOBILE NAV TOGGLE */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-500"
        >
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileNavOpen(false)} />
          <GlassPanel className="w-80 h-full max-h-screen relative flex flex-col p-6 rounded-none border-y-0 border-l-0 border-r-white/10">
            <SidebarContent />
          </GlassPanel>
        </div>
      )}

      {/* DESKTOP LEFT SIDEBAR */}
      <aside className="hidden lg:block w-72 h-[calc(100vh-4rem)] sticky top-16 border-r border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md px-6 py-8 z-20 shrink-0">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 lg:px-12 xl:px-20 relative z-10 min-h-screen">
        
        {/* Dynamic Content Router */}
        {activePage === 'intro' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-blue-400 mb-4 font-mono text-sm">
              <span>Documentation</span> <ChevronRight size={14} /> <span>Getting Started</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
              Introduction to Neuron
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              Neuron is a next-generation Spatial Intelligence IDE that abandons traditional text-based file trees in favor of a mathematically accurate, Machine Learning-driven physical universe.
            </p>
            
            <GlassPanel className="p-8 rounded-2xl mb-12 border-blue-500/20 bg-blue-500/5">
              <h3 className="text-white font-medium text-lg mb-2">Notice</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                You are currently viewing the placeholder content for the master routing shell. In the next step, we will extract this into dedicated modular files to build out the full, hyper-detailed documentation architecture.
              </p>
            </GlassPanel>
          </div>
        )}

        {/* Catch-all for unbuilt pages */}
        {activePage !== 'intro' && (
          <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center h-96 text-slate-500 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
            <BookOpen size={48} className="mb-4 opacity-20" />
            <h2 className="text-xl font-medium text-white mb-2">Page Under Construction</h2>
            <p className="text-sm">The documentation for "{DOCS_NAVIGATION.flatMap(c => c.items).find(i => i.id === activePage)?.label}" is being written.</p>
          </div>
        )}

      </main>

      {/* DESKTOP RIGHT SIDEBAR (Table of Contents Placeholder) */}
      <aside className="hidden xl:block w-64 h-[calc(100vh-4rem)] sticky top-16 py-12 pr-8 shrink-0">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">On this page</h4>
        <ul className="space-y-3 text-sm text-slate-400 border-l border-white/10">
          <li className="pl-4 border-l border-transparent hover:text-white cursor-pointer transition-colors">Overview</li>
          <li className="pl-4 border-l border-blue-500 text-blue-400 font-medium cursor-pointer transition-colors">Core Concepts</li>
          <li className="pl-4 border-l border-transparent hover:text-white cursor-pointer transition-colors">Machine Learning Pipeline</li>
          <li className="pl-4 border-l border-transparent hover:text-white cursor-pointer transition-colors">Next Steps</li>
        </ul>
      </aside>

    </div>
  );
}