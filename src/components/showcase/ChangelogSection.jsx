import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CHANGELOG_ITEMS = [
  {
    date: 'Sep 10, 2026',
    title: 'Neuron Projects & Spatial Engine',
    desc: 'Full synchronization between filesystem trees and real-time 2D AST spatial canvases.'
  },
  {
    date: 'Sep 2, 2026',
    title: 'Self-hosted local machines',
    desc: '100% localhost daemon execution for Tree-Sitter parsing and NetworkX modularity clustering.'
  },
  {
    date: 'Aug 27, 2026',
    title: 'Autonomous agent supervisor',
    desc: 'Topological agent execution with automated AST mutation and local verification.'
  },
  {
    date: 'Aug 19, 2026',
    title: 'Dynamic themes & WebGPU acceleration',
    desc: 'High-contrast color palettes with Pure-RAM D3 physics and zero-latency raycasting.'
  }
];

export default function ChangelogSection() {
  return (
    <section id="changelog" className="mb-36 md:mb-48 w-full text-left">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white">
          Changelog
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {CHANGELOG_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#0b0c10] border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-5 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="text-[11px] font-mono text-slate-500 mb-2">
                {item.date}
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-[#60A5FA] transition-colors mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Link
          to="/downloads"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#60A5FA] hover:text-[#93c5fd] transition-colors cursor-pointer"
        >
          <span>See what's new in Neuron</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}
