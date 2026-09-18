import React from 'react';

const TESTIMONIALS = [
  {
    quote: "Seeing an entire codebase as a 2D spatial graph completely changes architectural comprehension. We pinpointed circular dependency bottlenecks in minutes that months of flat file review missed.",
    author: "Elena Rostova",
    role: "Principal Systems Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "Neuron's local-first engine is blindingly fast. Parsing 100,000 AST nodes with Tree-Sitter and rendering Louvain clusters without sending a byte of proprietary code to the cloud is game-changing.",
    author: "Marcus Vance",
    role: "VP of Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "The best developer tools give you spatial intuition. In Neuron, you can trace cross-boundary conduits visually before refactoring, or let Neuron agents run multi-file migrations autonomously.",
    author: "Kavita Chen",
    role: "Staff Infrastructure Engineer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "Standard IDEs hide the blast radius of changes behind nested folders. With Neuron, hovering over any function instantly highlights every downstream breaking change across the repository.",
    author: "Liam O'Connor",
    role: "Core Open Source Maintainer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "The spatial mental model feels like the transition from terminal line editing to modern GUI. There is no going back to flat, disconnected file trees.",
    author: "Tariq Al-Mansoor",
    role: "Lead Compiler Researcher",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "Neuron understands actual syntax trees instead of superficial tokens. It proposed clean architectural diffs across 14 modules with zero hallucinations.",
    author: "Sarah Lindqvist",
    role: "Director of Software Engineering",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
  }
];

export default function TestimonialsGrid() {
  return (
    <section className="mb-36 md:mb-48 w-full text-left">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
          The new way to build software.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Trusted by engineers, architects, and researchers building complex software systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#0b0c10] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all group"
          >
            <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-6 font-normal">
              "{t.quote}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
              />
              <div className="truncate">
                <div className="text-white text-xs font-medium truncate">{t.author}</div>
                <div className="text-slate-500 text-[11px] truncate">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
