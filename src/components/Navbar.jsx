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
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08]">
      <nav 
        className="h-14 w-full flex items-center justify-between px-4 sm:px-6 font-sans"
      >
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Neuron" className="h-6 w-6 object-contain" />
          <span className="font-semibold text-[#EDEDED] tracking-tight text-sm">NEURON</span>
        </Link>

        {/* Right Side Links - Visible across Desktop & Split Screen */}
        <div className="hidden min-[520px]:flex items-center gap-3 sm:gap-5 md:gap-7">
          <Link 
            to="/docs" 
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              isActive('/docs') ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Documentation
          </Link>
          <Link 
            to="/downloads" 
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              isActive('/downloads') ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Versions
          </Link>
          <Link 
            to="/help" 
            className={`text-xs sm:text-[13px] font-medium transition-colors ${
              isActive('/help') ? 'text-white font-semibold' : 'text-[#888888] hover:text-[#EDEDED]'
            }`}
          >
            Help
          </Link>
          <NavLink to="https://github.com/UnityNimit/Neuron" label="GitHub" isExternal />
          
          <a 
            href="/Neuron-Setup.exe"
            download="Neuron-Setup.exe"
            className="h-8 px-3 sm:px-4 rounded-lg bg-white text-black text-xs font-semibold hover:bg-slate-100 header-download-glow inline-flex items-center justify-center cursor-pointer transition-all active:scale-[0.98]"
          >
            Download
          </a>
        </div>

        {/* Mobile-only Menu Button (< 520px) */}
        <div className="min-[520px]:hidden flex items-center gap-2">
          <a 
            href="/Neuron-Setup.exe"
            download="Neuron-Setup.exe"
            className="h-7 px-2.5 rounded-md bg-white text-black text-xs font-semibold header-download-glow inline-flex items-center justify-center"
          >
            Download
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu (< 520px) */}
      {isMobileMenuOpen && (
        <div className="min-[520px]:hidden bg-[#050505] border-b border-white/[0.08] px-6 py-5 flex flex-col gap-3.5 text-xs font-sans">
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
            Versions
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
        </div>
      )}
    </header>
  );
}