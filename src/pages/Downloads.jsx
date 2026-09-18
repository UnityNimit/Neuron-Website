import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import Footer from '../components/Footer';

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const RELEASES = [
  {
    version: 'v1.2.4',
    tag: 'Latest',
    date: 'September 10, 2026',
    summary: 'Bidirectional spatial canvas synchronization, 5 official IDE themes, and pure-RAM physics relaxation.',
    features: [
      { name: 'Spatial Engine Synchronization', desc: 'Full bidirectional mapping between filesystem trees and real-time 2D AST spatial canvases.' },
      { name: 'Calibrated Theme Engine', desc: '5 high-contrast themes (Obsidian, Zinc, Ruby, Cyan, Purple) with live hot-reloading.' },
      { name: 'Pure-RAM D3 Relaxation', desc: 'Zero-latency 60 FPS spring relaxation without canvas latency.' },
      { name: 'Static Daemon Logs', desc: 'Real-time Tree-Sitter extraction and Louvain modularity clustering logs.' }
    ]
  },
  {
    version: 'v1.2.0',
    tag: 'Stable',
    date: 'August 27, 2026',
    summary: 'Autonomous agent workspace, BYOK frontier model orchestration, and local AST mutation verification.',
    features: [
      { name: 'Autonomous Agent Studio', desc: 'Direct agent orchestration with full topological graph context.' },
      { name: 'Context @ Mentions', desc: 'Attach @files, @conduits, and @terminals directly to agent prompts.' },
      { name: 'Deterministic Local Verification', desc: 'Synthesizes diffs with automated AST sanity checks to prevent hallucinations.' },
      { name: 'BYOK Model Integration', desc: 'Bring your own keys for Gemini 3.8 Flash, Claude Sonnet 4.6, or local offline Ollama models.' }
    ]
  },
  {
    version: 'v1.1.0',
    tag: 'Stable',
    date: 'August 14, 2026',
    summary: 'Louvain modularity community partitioning, cyclomatic risk conduits, and multi-shell terminal emulation.',
    features: [
      { name: 'Louvain Modularity Partition', desc: 'Unsupervised community detection grouping related code into spatial visual clusters.' },
      { name: 'Cyclomatic Risk Conduits', desc: 'Real-time risk scoring for deep nested branches and potential God objects.' },
      { name: 'Multi-Shell Terminal', desc: 'Integrated PowerShell and Bash execution with persistent environment context.' },
      { name: 'In-Memory WASM Sandbox', desc: 'Isolated code execution for unit test validation.' }
    ]
  },
  {
    version: 'v1.0.0',
    tag: 'Initial Release',
    date: 'August 1, 2026',
    summary: 'Initial public release of the Neuron 2D spatial visualizer and 100% localhost core.',
    features: [
      { name: 'Spatial Codebase Visualizer', desc: 'Maps abstract syntax trees onto an interactive 2D spatial canvas.' },
      { name: 'Tree-Sitter Daemon', desc: 'Sub-4ms AST extraction for Python and JavaScript source trees.' },
      { name: 'Zero Cloud Ingestion', desc: '100% localhost engine execution with zero network telemetry.' },
      { name: 'Native Windows Desktop Installer', desc: 'Lightweight standalone executable ready to install.' }
    ]
  }
];

export default function Downloads() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between">
      
      {/* Subtle background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06)_0%,transparent_60%)]" />

      <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-left mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-[#60A5FA] mb-3">
            Releases & Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Downloads & Releases
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Download the latest installer for Neuron. All versions run as a 100% localhost engine with zero cloud telemetry.
          </p>
        </div>

        {/* Primary Latest Release Card */}
        <div className="bg-[#0b0c10] border border-white/[0.1] rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/30">
                  v1.2.4 Latest
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Released Sep 10, 2026
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Neuron for Windows (x64)
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/Neuron-Setup.exe"
                download="Neuron-Setup.exe"
                className="h-11 px-6 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.18)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] cursor-pointer active:scale-[0.98]"
              >
                <Download size={15} />
                <span>Download for Windows</span>
              </a>
              <a
                href="https://github.com/UnityNimit/Neuron"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-4 rounded-lg bg-[#111216] hover:bg-[#181920] border border-white/[0.1] text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
              >
                <GithubIcon size={14} />
                <span className="hidden sm:inline">Source</span>
                <ExternalLink size={13} className="text-slate-500" />
              </a>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block mb-1">Target Operating System</span>
              <span className="text-slate-200">Windows 10 / 11 (64-bit)</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Architecture</span>
              <span className="text-slate-200">Pure-RAM D3 & WebGPU</span>
            </div>
          </div>
        </div>

        {/* Timeline of All Versions */}
        <div className="space-y-6">
          <div className="text-left mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Release Timeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Chronological history of all Neuron releases and feature additions.
            </p>
          </div>

          <div className="space-y-6">
            {RELEASES.map((rel) => (
              <div 
                key={rel.version}
                className="bg-[#0b0c10] border border-white/[0.08] rounded-2xl p-6 sm:p-7 text-left transition-all hover:border-white/[0.14]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg font-mono font-bold text-white">
                      {rel.version}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.08]">
                      {rel.tag}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {rel.date}
                    </span>
                  </div>

                  <a
                    href="/Neuron-Setup.exe"
                    download="Neuron-Setup.exe"
                    className="h-8 px-3.5 rounded-md bg-white/[0.06] hover:bg-white text-slate-300 hover:text-black text-xs font-mono font-medium transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download for Windows</span>
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 font-sans leading-relaxed">
                  {rel.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
                  {rel.features.map((feat, fIdx) => (
                    <div 
                      key={fIdx}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-slate-300"
                    >
                      <div className="text-white font-medium text-[11px] mb-1">
                        ▪ {feat.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        {feat.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}