import React from 'react';
import { BookOpen, Terminal, Code, Cpu } from 'lucide-react';

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-slate-200 font-sans pt-24 pb-16 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
        <BookOpen className="text-blue-400" /> Documentation & Architecture
      </h1>
      <p className="text-slate-400 mb-10 text-lg">
        System Overview and Academic Mapping for Project Neuron.
      </p>

      <div className="space-y-8">
        <section className="bg-[#141414] border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Terminal size={20} className="text-green-400" /> Local Daemon Quickstart
          </h2>
          <div className="bg-[#1e1e1e] p-4 rounded-xl font-mono text-sm text-slate-300 space-y-2 border border-slate-800">
            <p className="text-slate-500"># 1. Clone the repository</p>
            <p className="text-green-400">git clone https://github.com/UnityNimit/Neuron.git</p>
            <p className="text-slate-500"># 2. Start the Python AI Daemon</p>
            <p className="text-green-400">cd backend && python main.py</p>
          </div>
        </section>

        <section className="bg-[#141414] border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Cpu size={20} className="text-purple-400" /> Syllabus Mapping
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
            <li><strong>CSE2032 Machine Learning:</strong> Node2Vec embeddings + UMAP 2D dimensionality reduction + DBSCAN clustering.</li>
            <li><strong>CSEXXXX Artificial Intelligence:</strong> A* Manhattan edge pathfinding + NetworkX directed graph BFS traversal.</li>
            <li><strong>CSE3005 Software Engineering:</strong> Tree-Sitter AST parsing + LibCST bidirectional code mutations.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}