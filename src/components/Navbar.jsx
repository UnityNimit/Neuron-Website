import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, Download, BookOpen, Info, Home as HomeIcon } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="h-16 border-b border-slate-800 bg-[#121212]/80 backdrop-blur-md fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 font-sans text-slate-300">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <img src="/logo.png" alt="Neuron" className="h-8 w-8 object-contain transition-transform group-hover:scale-110" />
        <span className="font-bold text-white tracking-wider text-lg">NEURON</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className={`flex items-center gap-1.5 transition-colors ${isActive('/') ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}>
          <HomeIcon size={16} /> Home
        </Link>
        <Link to="/docs" className={`flex items-center gap-1.5 transition-colors ${isActive('/docs') ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}>
          <BookOpen size={16} /> Documentation
        </Link>
        <Link to="/downloads" className={`flex items-center gap-1.5 transition-colors ${isActive('/downloads') ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}>
          <Download size={16} /> Downloads
        </Link>
        <Link to="/about" className={`flex items-center gap-1.5 transition-colors ${isActive('/about') ? 'text-blue-400 font-semibold' : 'hover:text-white'}`}>
          <Info size={16} /> About
        </Link>
      </div>

      {/* CTA Button: Launch Web App */}
      <a 
        href="https://neuron-dun.vercel.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 hover:scale-105"
      >
        <span>Launch Web IDE</span>
        <ExternalLink size={14} />
      </a>
    </nav>
  );
}