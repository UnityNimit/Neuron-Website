import PixelBlast from '../components/PixelBlast';
import ScrambledText from '../components/ScrambledText';
import Footer from '../components/Footer';
import NeuronHeroEngine from '../components/graph/NeuronHeroEngine';
import SpatialSnippetsShowcase from '../components/showcase/SpatialSnippetsShowcase';
import AntigravityAgentShowcase from '../components/showcase/AntigravityAgentShowcase';
import NeuronThemeShowcase from '../components/showcase/NeuronThemeShowcase';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white">

      {/* Interactive WebGL Background (Original PixelBlast) */}
      <div className="fixed inset-0 z-0 opacity-60 md:opacity-75 pointer-events-auto">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/30 to-[#050505] z-10 pointer-events-none" />
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#60A5FA"
          patternScale={2}
          patternDensity={1.2}
          pixelSizeJitter={0}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          speed={0.5}
          edgeFade={0.2}
          transparent={true}
          className="w-full h-full"
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 pb-8 px-4 sm:px-6 w-full pointer-events-auto">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="flex flex-col items-center text-center mb-20 sm:mb-24">

          {/* Headline & Bold Brand */}
          <div className="flex flex-col items-center gap-1.5 mb-8 pointer-events-auto max-w-5xl mx-auto px-2">
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

          {/* Utilitarian CTA (Uniform button styling) */}
          <div id="download-hero" className="flex flex-col items-center gap-3 mb-16 sm:mb-20 w-full max-w-md">
            <a 
              href="/Neuron-Setup.exe"
              download="Neuron-Setup.exe"
              className="h-8 px-4 rounded-lg bg-white text-black font-semibold text-xs hover:bg-slate-100 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98] shadow-sm"
            >
              <span>Download for Windows</span>
            </a>
          </div>

          {/* CENTERPIECE: Massive High-Framerate Interactive Hero Graph Canvas */}
          <div className="w-full text-left">
            <NeuronHeroEngine />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SPATIAL OBSERVABILITY FEATURE SNIPPETS WALKTHROUGH                         */}
        {/* ========================================================================= */}
        <SpatialSnippetsShowcase />

        {/* ========================================================================= */}
        {/* AI INTEGRATION SHOWCASE                                                   */}
        {/* ========================================================================= */}
        <AntigravityAgentShowcase />

        {/* ========================================================================= */}
        {/* THEME SHOWCASE                                                            */}
        {/* ========================================================================= */}
        <NeuronThemeShowcase />

        {/* ========================================================================= */}
        {/* BOTTOM CALL-TO-ACTION                                                     */}
        {/* ========================================================================= */}
        <section className="text-center mb-16 max-w-3xl mx-auto px-4">
          <h2 
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
            className="font-black tracking-tighter text-white mb-6 select-none"
          >
            Try Neuron now.
          </h2>
          <div className="flex items-center justify-center">
            <a 
              href="/Neuron-Setup.exe"
              download="Neuron-Setup.exe"
              className="h-8 px-4 rounded-lg bg-white text-black font-semibold text-xs hover:bg-slate-100 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98] shadow-sm"
            >
              <span>Download for Windows</span>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}