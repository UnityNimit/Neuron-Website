import { ChevronDown } from 'lucide-react';
import PixelBlast from '../components/PixelBlast';
import ScrambledText from '../components/ScrambledText';
import Footer from '../components/Footer';
import NeuronHeroEngine from '../components/graph/NeuronHeroEngine';
import SpatialSnippetsShowcase from '../components/showcase/SpatialSnippetsShowcase';
import AntigravityAgentShowcase from '../components/showcase/AntigravityAgentShowcase';
import NeuronThemeShowcase from '../components/showcase/NeuronThemeShowcase';
import { ScrollReveal, ScrollWriteHeading } from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const scrollToDemo = () => {
    const demoEl = document.getElementById('demo-viewport');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white transition-colors duration-200">

      {/* Interactive WebGL Background */}
      <div 
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-60 md:opacity-75' : 'opacity-40 md:opacity-50'}`}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          contain: 'strict'
        }}
      >
        {/* Gradient Overlay dynamically adapting to active theme */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-colors duration-200" 
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, transparent, rgba(5, 5, 5, 0.4) 60%, var(--bg-app) 100%)'
              : 'linear-gradient(to bottom, transparent, rgba(248, 250, 252, 0.6) 60%, var(--bg-app) 100%)'
          }}
        />
        <PixelBlast
          variant="square"
          pixelSize={4}
          color={isDark ? "#60A5FA" : "#3b82f6"}
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
          antialias={false}
          className="w-full h-full"
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full pointer-events-auto">
        
        {/* ========================================================================= */}
        {/* 1. HERO VIEWPORT (Only Brand & Download visible on initial load)          */}
        {/* ========================================================================= */}
        <section className="min-h-[100dvh] max-w-7xl mx-auto flex flex-col justify-between items-center text-center px-6 sm:px-8 md:px-12 pt-20 pb-6 relative">
          
          {/* Centered Brand & Utilitarian Download Button - Positioned Higher */}
          <div className="flex flex-col items-center max-w-5xl mx-auto mt-6 sm:mt-10 md:mt-14 mb-auto w-full">
            
            {/* Headline & Bold Brand */}
            <div className="flex flex-col items-center gap-1.5 mb-8 pointer-events-auto max-w-5xl mx-auto px-2">
              <h1 
                style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6.25rem)', lineHeight: 1.05 }}
                className="font-black tracking-tighter text-[var(--text-primary)] uppercase select-none"
              >
                {t('hero.spatialIde', 'THE SPATIAL IDE')}
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

            {/* Utilitarian CTA Button */}
            <div id="download-hero" className="flex flex-col items-center gap-3 w-full max-w-md pointer-events-auto">
              <a 
                href="https://github.com/UnityNimit/Neuron/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe"
                download="Neuron-Setup.exe"
                className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98] shadow-sm"
              >
                <span>{t('hero.downloadWindows', 'Download for Windows')}</span>
              </a>
            </div>
          </div>

          {/* Super Cool Minimalist Scroll Indicator (Pure arrow, no circle boundary) */}
          <div className="w-full flex flex-col items-center justify-center pb-8 pointer-events-auto shrink-0 select-none">
            <button
              onClick={scrollToDemo}
              className="group flex flex-col items-center cursor-pointer focus:outline-none p-2 transition-transform duration-300 hover:translate-y-1"
              aria-label={t('hero.scrollExplore', 'Scroll down to explore Neuron')}
            >
              <div className="animate-scroll-arrow flex flex-col items-center text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                <ChevronDown 
                  size={32} 
                  className="stroke-[1.75] group-hover:stroke-[2.25] text-[var(--text-muted)] group-hover:text-[#60A5FA] transition-all drop-shadow-[0_0_10px_rgba(96,165,250,0.35)]" 
                />
              </div>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SPATIAL IDE DEMO WINDOW (Revealed smoothly upon scrolling)              */}
        {/* ========================================================================= */}
        <ScrollReveal>
          <section id="demo-viewport" className="w-full max-w-7xl mx-auto mb-20 sm:mb-28 px-6 sm:px-8 md:px-12 pt-4">
            <div className="w-full text-left">
              <NeuronHeroEngine />
            </div>
          </section>
        </ScrollReveal>

        {/* Container for remaining showcase sections */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* ========================================================================= */}
          {/* SPATIAL OBSERVABILITY FEATURE SNIPPETS WALKTHROUGH                         */}
          {/* ========================================================================= */}
          <ScrollReveal>
            <SpatialSnippetsShowcase />
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* AI INTEGRATION SHOWCASE                                                   */}
          {/* ========================================================================= */}
          <ScrollReveal>
            <AntigravityAgentShowcase />
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* THEME SHOWCASE                                                            */}
          {/* ========================================================================= */}
          <ScrollReveal>
            <NeuronThemeShowcase />
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* BOTTOM CALL-TO-ACTION WITH WRITE ANIMATION                                 */}
          {/* ========================================================================= */}
          <ScrollReveal>
            <section className="text-center mb-16 max-w-3xl mx-auto px-4">
              <ScrollWriteHeading
                text={t('home.tryNow', 'Try Neuron now.')}
                as="h2"
                speed={35}
                delay={100}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
                className="font-black tracking-tighter text-[var(--text-primary)] mb-6 select-none"
              />
              <div className="flex items-center justify-center">
                <a 
                  href="https://github.com/UnityNimit/Neuron/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe"
                  download="Neuron-Setup.exe"
                  className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98] shadow-sm"
                >
                  <span>{t('hero.downloadWindows', 'Download for Windows')}</span>
                </a>
              </div>
            </section>
          </ScrollReveal>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
