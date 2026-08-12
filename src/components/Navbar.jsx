import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SpecularButton from './SpecularButton';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Reusable NavLink to handle active/inactive sleek text states
  const NavLinkText = ({ to, label }) => (
    <Link 
      to={to} 
      className={`transition-colors text-sm font-medium ${
        isActive(to) 
          ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
          : 'text-slate-400 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );

  return (
    /* Edge-to-Edge Fixed Wrapper */
    <div className="fixed top-0 left-0 w-full z-50">
      
      <nav 
        className="h-[72px] w-full bg-black border-b border-white/10 flex items-center justify-between px-6 md:px-10 font-sans"
      >
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Neuron" className="h-7 w-7 object-contain transition-transform group-hover:scale-110" />
          <span className="font-bold text-white tracking-wider text-base md:text-lg">NEURON</span>
        </Link>

        {/* Right Side: Links & Specular Button */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinkText to="/repo" label="Repo" />
          <NavLinkText to="/docs" label="Docs" />
          <NavLinkText to="/help" label="Help" />
          <NavLinkText to="/signin" label="Sign in" />
          
          <Link to="/downloads" className="ml-2">
            <SpecularButton
              size="sm"
              radius={8}
              tint="#ffffff"
              tintOpacity={0.03}
              blur={0}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#1e293b"
              intensity={1.5}
              shineSize={12}
              shineFade={30}
              thickness={1.5}
              speed={0.4}
              followMouse
              proximity={250}
              autoAnimate={false}
            >
              Download
            </SpecularButton>
          </Link>
        </div>
      </nav>
    </div>
  );
}