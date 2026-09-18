import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050505] pt-14 pb-12 px-4 md:px-8 text-xs font-sans relative z-10 text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Left: Brand Column */}
        <div className="flex flex-col gap-3 max-w-xs">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Neuron" className="h-6 w-6 object-contain" />
            <span className="font-semibold text-white tracking-wide text-sm font-mono">NEURON</span>
          </Link>
          <p className="text-slate-500 text-xs leading-relaxed font-mono">
            Local-first spatial code intelligence and interactive graph runtime.
          </p>
        </div>

        {/* Right: Small Links Grouped on the Right Side */}
        <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-16 md:gap-20 justify-end text-left">
          {/* Navigation */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Navigation
            </div>
            <Link to="/" className="text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/docs" className="text-slate-400 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link to="/downloads" className="text-slate-400 hover:text-white transition-colors">
              Downloads
            </Link>
            <Link to="/help" className="text-slate-400 hover:text-white transition-colors">
              Help & Support
            </Link>
          </div>

          {/* Core Modules */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Architecture
            </div>
            <Link to="/docs" className="text-slate-400 hover:text-white transition-colors">
              Quickstart Guide
            </Link>
            <Link to="/docs" className="text-slate-400 hover:text-white transition-colors">
              Spatial Architecture
            </Link>
            <Link to="/docs" className="text-slate-400 hover:text-white transition-colors">
              Louvain Partitioning
            </Link>
            <Link to="/docs" className="text-slate-400 hover:text-white transition-colors">
              Agent Studio
            </Link>
          </div>

          {/* Community & Project */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Community
            </div>
            <a
              href="https://github.com/UnityNimit/Neuron"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon size={13} />
              <span>GitHub Repository</span>
              <ExternalLink size={10} className="opacity-50" />
            </a>
            <a
              href="https://github.com/UnityNimit/Neuron/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Issue Tracker</span>
              <ExternalLink size={10} className="opacity-50" />
            </a>
            <Link to="/help" className="text-slate-400 hover:text-white transition-colors">
              Contact & Mail Queries
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}