import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';

const NavLink = ({ to, label, isActive, isExternal = false }) => {
  if (isExternal) {
    return (
      <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[13px] font-medium text-[#888888] hover:text-[#EDEDED] transition-colors flex items-center gap-1.5"
      >
        <span>{label}</span>
        <ExternalLink size={11} className="opacity-50" />
      </a>
    );
  }
  return (
    <Link 
      to={to} 
      className={`text-[13px] font-medium transition-colors ${
        isActive ? 'text-[#EDEDED] font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
      }`}
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav 
        className="h-14 w-full bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between px-6 md:px-10 font-sans"
      >
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Neuron" className="h-6 w-6 object-contain" />
          <span className="font-semibold text-[#EDEDED] tracking-tight text-sm">NEURON</span>
        </Link>

        {/* Right Side Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          <Link 
            to="/" 
            className={`text-[13px] font-medium transition-colors ${
              location.pathname === '/' ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/docs" 
            className={`text-[13px] font-medium transition-colors ${
              isActive('/docs') ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Documentation
          </Link>
          <Link 
            to="/downloads" 
            className={`text-[13px] font-medium transition-colors ${
              isActive('/downloads') ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Downloads
          </Link>
          <Link 
            to="/help" 
            className={`text-[13px] font-medium transition-colors ${
              isActive('/help') ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Help
          </Link>
          <NavLink to="https://github.com/UnityNimit/Neuron" label="GitHub" isExternal />
          
          <a 
            href="/Neuron-Setup.exe"
            download="Neuron-Setup.exe"
            className="ml-2"
          >
            <button className="h-8 px-3.5 rounded-md bg-white text-black text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer">
              Download
            </button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <a 
            href="/Neuron-Setup.exe"
            download="Neuron-Setup.exe"
          >
            <button className="h-7 px-2.5 rounded bg-white text-black text-xs font-medium">
              Download
            </button>
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/[0.08] px-6 py-5 flex flex-col gap-4 text-xs font-mono">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-1.5 ${location.pathname === '/' ? 'text-white font-semibold' : 'text-[#888888] hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/docs" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-1.5 ${isActive('/docs') ? 'text-white font-semibold' : 'text-[#888888] hover:text-white'}`}
          >
            Documentation
          </Link>
          <Link 
            to="/downloads" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-1.5 ${isActive('/downloads') ? 'text-white font-semibold' : 'text-[#888888] hover:text-white'}`}
          >
            Downloads & Releases
          </Link>
          <Link 
            to="/help" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-1.5 ${isActive('/help') ? 'text-white font-semibold' : 'text-[#888888] hover:text-white'}`}
          >
            Help & Queries
          </Link>
          <a 
            href="https://github.com/UnityNimit/Neuron" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-1.5 text-[#888888] hover:text-white flex items-center justify-between"
          >
            <span>GitHub Repository</span>
            <ExternalLink size={12} className="opacity-50" />
          </a>
          <a 
            href="/Neuron-Setup.exe"
            download="Neuron-Setup.exe"
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-1.5 text-[#60A5FA] font-semibold"
          >
            Download for Windows
          </a>
        </div>
      )}
    </header>
  );
}