import React from 'react';
import { ExternalLink, Cpu, GitBranch, Zap, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-slate-200 font-sans pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10 my-12">
        <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-800/50 text-blue-300 px-4 py-1.5 rounded-full text-xs font-mono mb-8">
          <Zap size={14} className="text-yellow-400" /> WebAssembly & Graph ML Powered Spatial IDE
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Code in 2D Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Real-Time AI</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Neuron transforms standard flat Python repositories into an interactive 2D spatial graph, featuring WebAssembly execution, UMAP clustering, and Impact Analysis.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a 
            href="https://neuron-dun.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-xl shadow-blue-600/25 hover:scale-105"
          >
            <span>Launch Neuron Online</span>
            <ExternalLink size={18} />
          </a>
          <Link 
            to="/downloads" 
            className="flex items-center gap-2 bg-[#1c1c1e] hover:bg-[#28282b] border border-slate-800 text-slate-200 px-8 py-3.5 rounded-xl font-semibold transition-all hover:border-slate-700"
          >
            <span>Local Daemon Setup</span>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 my-20 relative z-10">
        <div className="bg-[#141414] border border-slate-800/80 p-8 rounded-2xl flex flex-col gap-4">
          <div className="p-3 bg-blue-950/50 border border-blue-800/50 rounded-xl w-fit text-blue-400">
            <Cpu size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Browser WebAssembly Engine</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Execute Python code securely inside Chrome via Pyodide WebAssembly. Zero server cost, zero security vulnerabilities.
          </p>
        </div>

        <div className="bg-[#141414] border border-slate-800/80 p-8 rounded-2xl flex flex-col gap-4">
          <div className="p-3 bg-purple-950/50 border border-purple-800/50 rounded-xl w-fit text-purple-400">
            <GitBranch size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Node2Vec & UMAP Layouts</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Neural network graph embeddings project code functions onto 2D spatial coordinates based on structural dependency.
          </p>
        </div>

        <div className="bg-[#141414] border border-slate-800/80 p-8 rounded-2xl flex flex-col gap-4">
          <div className="p-3 bg-orange-950/50 border border-orange-800/50 rounded-xl w-fit text-orange-400">
            <Layers size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Impact Blast Radius</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Press Alt+I on any node to trigger Breadth-First Search traversal, highlighting downstream breaking changes in neon orange.
          </p>
        </div>
      </section>
    </div>
  );
}