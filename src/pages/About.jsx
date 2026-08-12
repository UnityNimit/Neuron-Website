import React from 'react';
import { Info, Github } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-slate-200 font-sans pt-24 pb-16 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
        <Info className="text-blue-400" /> About Neuron
      </h1>
      <p className="text-slate-400 mb-8 text-lg leading-relaxed">
        Neuron was created to solve the mental overhead of traditional text-based IDEs. By representing software as an interactive 2D spatial graph, engineers can visually map, refactor, and debug complex codebases without tab clutter.
      </p>

      <div className="bg-[#141414] border border-slate-800 p-8 rounded-2xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Project Information</h2>
        <div className="space-y-3 text-slate-300 text-sm">
          <p><strong>Lead Architect & Developer:</strong> UnityNimit</p>
          <p><strong>Primary Repository:</strong> <a href="https://github.com/UnityNimit/Neuron" target="_blank" rel="noreferrer" className="text-blue-400 underline">github.com/UnityNimit/Neuron</a></p>
          <p><strong>Live Web Application:</strong> <a href="https://neuron-dun.vercel.app" target="_blank" rel="noreferrer" className="text-blue-400 underline">neuron-dun.vercel.app</a></p>
        </div>
      </div>
    </div>
  );
}