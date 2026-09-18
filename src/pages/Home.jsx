import { 
  Download, ExternalLink, ArrowRight
} from 'lucide-react';
import PixelBlast from '../components/PixelBlast';
import ScrambledText from '../components/ScrambledText';
import Footer from '../components/Footer';
import NeuronHeroEngine from '../components/graph/NeuronHeroEngine';
import AntigravityAgentShowcase from '../components/showcase/AntigravityAgentShowcase';
import NeuronThemeShowcase from '../components/showcase/NeuronThemeShowcase';
import FrontierCards from '../components/showcase/FrontierCards';
import ChangelogSection from '../components/showcase/ChangelogSection';
import TestimonialsGrid from '../components/showcase/TestimonialsGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white">
      
      {/* Fixed Ambient WebGL PixelBlast Background (Reduced blue by 30%, calibrated dark atmosphere) */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#3B82F6"
          patternScale={2}
          patternDensity={0.85}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.35}
          rippleThickness={0.12}
          rippleIntensityScale={0.7}
          liquid={false}
          speed={0.25}
          className="opacity-26"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-blue-600/[0.05] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/45 via-transparent to-[#050505]/70 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pt-32 pb-8 px-4 md:px-8 max-w-6xl mx-auto pointer-events-auto">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Cursor Utilitarian Standard: Show, Don't Tell)          */}
        {/* ========================================================================= */}
        <section className="flex flex-col items-center text-center mb-36 md:mb-48">

          {/* Headline & Bold Brand with Fluid Responsive Typography */}
          <div className="flex flex-col items-center gap-1.5 mb-6 pointer-events-auto max-w-5xl mx-auto px-2">
            <h1 
              style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.25rem)', lineHeight: 1.05 }}
              className="font-black tracking-tighter text-white uppercase select-none"
            >
              THE SPATIAL IDE
            </h1>
            <ScrambledText
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
              className="!m-0 !max-w-none !font-sans font-bold tracking-tighter text-[#60A5FA] mt-1"
              radius={150}
              duration={1.5}
              speed={0.4}
              scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            >
              Neuron
            </ScrambledText>
          </div>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 font-normal pointer-events-auto">
            An applied AI and graph machine learning visualizer mapping Python codebases onto a high-performance 2D spatial canvas.
          </p>

          {/* Utilitarian CTA (Single Direct Action with generous spacing) */}
          <div id="download-hero" className="flex flex-col items-center gap-3 mb-24 sm:mb-28 md:mb-36 w-full max-w-md">
            <a 
              href="/Neuron-Setup.exe"
              download="Neuron-Setup.exe"
              className="h-12 px-8 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all duration-200 flex items-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.18)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] cursor-pointer active:scale-[0.98]"
            >
              <Download size={16} />
              <span>Download for Windows</span>
            </a>
          </div>

          {/* 🌟 CENTERPIECE: Massive High-Framerate Interactive Hero Graph Canvas */}
          <div className="w-full text-left">
            <NeuronHeroEngine />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 🌟 AUTONOMOUS AGENTS (Interactive Agent Studio Showcase)                  */}
        {/* ========================================================================= */}
        <AntigravityAgentShowcase />

        {/* ========================================================================= */}
        {/* 🌟 THEME SHOWCASE (Calibrated Palettes directly below Autonomous Agents)   */}
        {/* ========================================================================= */}
        <NeuronThemeShowcase />

        {/* ========================================================================= */}
        {/* 🌟 STAY ON THE FRONTIER (Card Grid with Absolute Dropdown & Centered Local) */}
        {/* ========================================================================= */}
        <FrontierCards />

        {/* ========================================================================= */}
        {/* 🌟 CHANGELOG (Clean Release Feed matching Cursor Standard)                */}
        {/* ========================================================================= */}
        <ChangelogSection />

        {/* ========================================================================= */}
        {/* 🌟 TESTIMONIALS (Social Proof Grid)                                      */}
        {/* ========================================================================= */}
        <TestimonialsGrid />

        {/* ========================================================================= */}
        {/* 🌟 BOTTOM CALL-TO-ACTION                                                 */}
        {/* ========================================================================= */}
        <section className="text-center mb-16 md:mb-20 max-w-4xl mx-auto px-4">
          <h2 
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.25rem)', lineHeight: 1.05 }}
            className="font-black tracking-tighter text-white mb-5 select-none"
          >
            Try Neuron now.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl mb-9 max-w-xl mx-auto leading-relaxed font-normal">
            Free and open source. Built for developers exploring ambitious codebases in 2D space.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a 
              href="/Neuron-Setup.exe"
              download="Neuron-Setup.exe"
              className="h-11 px-7 rounded-lg bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.18)] hover:shadow-[0_0_35px_rgba(255,255,255,0.28)] active:scale-[0.98]"
            >
              <Download size={16} />
              <span>Download for Windows</span>
            </a>
            <a 
              href="https://github.com/UnityNimit/Neuron"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-lg bg-[#111216] hover:bg-[#181920] border border-white/[0.1] text-slate-200 font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>GitHub Repository</span>
              <ExternalLink size={14} className="text-slate-500" />
            </a>
          </div>
        </section>

      </main>

      {/* Utilitarian Footer */}
      <Footer />
    </div>
  );
}