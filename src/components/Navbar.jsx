import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const isDocs = pathname.startsWith('/docs');
  const isVersions = pathname.startsWith('/versions');
  const isHelp = pathname.startsWith('/help');

  const getLinkClasses = (isActive) =>
    `text-xs sm:text-[13px] transition-colors ${
      isActive 
        ? 'font-semibold text-white' 
        : 'font-medium text-slate-400 hover:text-white'
    }`;

  const getMobileLinkClasses = (isActive) =>
    `py-1.5 transition-colors ${
      isActive 
        ? 'font-semibold text-white' 
        : 'font-medium text-slate-400 hover:text-white'
    }`;

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
            className={getLinkClasses(isDocs)}
          >
            Documentation
          </Link>
          <Link 
            to="/versions" 
            className={getLinkClasses(isVersions)}
          >
            Versions
          </Link>
          <Link 
            to="/help" 
            className={getLinkClasses(isHelp)}
          >
            Help
          </Link>
          <a 
            href="https://github.com/UnityNimit/Neuron" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs sm:text-[13px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            <span>GitHub</span>
            <ExternalLink size={11} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
          
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
            className={getMobileLinkClasses(isDocs)}
          >
            Documentation
          </Link>
          <Link 
            to="/versions" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={getMobileLinkClasses(isVersions)}
          >
            Versions
          </Link>
          <Link 
            to="/help" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={getMobileLinkClasses(isHelp)}
          >
            Help & Queries
          </Link>
          <a 
            href="https://github.com/UnityNimit/Neuron" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="py-1.5 font-medium text-slate-400 hover:text-white transition-colors flex items-center justify-between"
          >
            <span>GitHub Repository</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      )}
    </header>
  );
}