import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import ThemeLangControls from './ThemeLangControls';
import { useLanguage } from '../context/LanguageContext';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const XIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const RedditIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87s-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.249-.562 1.249-1.25 0-.69-.56-1.25-1.25-1.25zm5.5 0c-.687 0-1.248.56-1.248 1.25 0 .688.561 1.25 1.249 1.25.688 0 1.249-.562 1.249-1.25 0-.69-.56-1.25-1.249-1.25zm-5.466 3.99a.327.327 0 0 0-.231.095.326.326 0 0 0 0 .463c.844.845 2.21 1.05 2.947 1.05.736 0 2.103-.205 2.947-1.05a.326.326 0 0 0 0-.463.327.327 0 0 0-.463 0c-.642.64-1.772.825-2.484.825-.713 0-1.843-.185-2.484-.825a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const YouTubeIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Footer({ className = "mt-4 sm:mt-6" }) {
  const [activeLegal, setActiveLegal] = useState(null);
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    if (!activeLegal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveLegal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLegal]);

  const LEGAL_DOCS = {
    tos: {
      title: t('footer.tos', 'Terms of Service'),
      content: `Neuron is completely free and open source under the permissive MIT License. You are welcome to use, explore, modify, fork, or build upon the software however you like.

Everything in Neuron runs directly on your computer. You retain full ownership and control over your source code, your projects, and your personal data.

The software is provided as is without warranties of any kind. We work continuously to ensure Neuron is fast, secure, and reliable, and we encourage you to use it responsibly.`
    },
    aup: {
      title: t('footer.aup', 'Acceptable Use Policy'),
      content: `We built Neuron to give developers a faster and more intuitive way to navigate complex codebases. We want our tools and community to remain safe and productive for everyone.

Please do not use Neuron or its local analysis tools to compromise software systems or inspect private codebases without proper authorization.

Keep your local connections safe and private. If you distribute modified versions of Neuron, please keep the original MIT license and copyright notices intact.`
    },
    privacy: {
      title: t('footer.privacy', 'Privacy Policy'),
      content: `Your privacy is our core priority. Neuron operates entirely on a local first model, meaning your code never leaves your own computer.

We do not collect telemetry, analytics, or background usage data. We never track your keystrokes, your file paths, or the projects you open.

Our website contains no tracking pixels, advertising cookies, or third party data collection scripts. When you use Neuron, your work stays entirely your own.`
    },
    data: {
      title: t('footer.data', 'Data Use'),
      content: `Neuron parses and indexes your code directly on your machine. All file inspection and graph visualizations happen in local memory and are never uploaded to any remote server.

Project caches and graph layouts are saved locally on your device so that your workspaces open quickly. You can clear or remove this cached data at any time.

If you choose to use AI features, requests are sent directly to your chosen provider using your own API key or local model. We never store, inspect, or intercept your prompts.`
    },
    security: {
      title: t('footer.security', 'Security'),
      content: `Security is fundamental to Neuron. All background processes and communication channels bind strictly to your local machine using secure loopback connections.

Neuron runs with your standard operating system permissions and never requests elevated administrative access. Terminals and scripts execute with the exact same permissions you already have.

If you discover a security issue or have any concerns, please reach out directly to neuron.spatial.ide@gmail.com and our team will address it promptly.`
    }
  };

  const openLegalModal = (key) => {
    setActiveLegal(LEGAL_DOCS[key] || null);
  };

  return (
    <footer 
      className={`border-t border-[var(--border-subtle)] bg-[var(--bg-footer)] pt-10 pb-8 px-4 sm:px-8 md:px-12 w-full text-xs font-sans relative z-10 text-[var(--text-muted)] transition-colors duration-200 ${className}`}
      style={{
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))'
      }}
    >
      
      {/* Top Grid: Brand, Navigation, Legal, Socials */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-10">
        
        {/* Left: Brand Column */}
        <div className="flex flex-col gap-3 max-w-sm">
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5 cursor-pointer">
            <img src="/logo.svg" alt="Neuron" className="h-6 w-6 object-contain brand-logo" />
            <span className="font-semibold text-[var(--text-primary)] tracking-wide text-sm">Neuron</span>
          </Link>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
            {t('footer.brandDesc', 'The better and cooler IDE.')}
          </p>
        </div>

        {/* Right Columns: Navigation, Legal, Socials */}
        <div className="flex flex-wrap gap-12 sm:gap-16 md:gap-20 justify-start lg:justify-end text-left">
          
          {/* Navigation */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1">
              {t('footer.navigation', 'Navigation')}
            </div>
            <Link to="/docs" onClick={scrollToTop} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              {t('nav.docs', 'Documentation')}
            </Link>
            <Link to="/versions" onClick={scrollToTop} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              {t('nav.versions', 'Versions')}
            </Link>
            <Link to="/help" onClick={scrollToTop} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
              {t('nav.help', 'Help')}
            </Link>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1">
              {t('footer.legal', 'Legal')}
            </div>
            <button
              onClick={() => openLegalModal('tos')}
              className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t('footer.tos', 'Terms of Service')}
            </button>
            <button
              onClick={() => openLegalModal('aup')}
              className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t('footer.aup', 'Acceptable Use Policy')}
            </button>
            <button
              onClick={() => openLegalModal('privacy')}
              className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t('footer.privacy', 'Privacy Policy')}
            </button>
            <button
              onClick={() => openLegalModal('data')}
              className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t('footer.data', 'Data Use')}
            </button>
            <button
              onClick={() => openLegalModal('security')}
              className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t('footer.security', 'Security')}
            </button>
          </div>

          {/* Socials & Community */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1">
              {t('footer.socials', 'Socials')}
            </div>
            <a
              href="https://www.linkedin.com/in/neuron-spatial-ide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <LinkedInIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/SpatialIDE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <XIcon size={13} />
              <span>X (Twitter)</span>
            </a>
            <a
              href="https://www.reddit.com/user/Neuron_Spatial_IDE/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <RedditIcon size={14} />
              <span>Reddit</span>
            </a>
            <a
              href="https://www.youtube.com/@Neuron-Spatial-IDE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <YouTubeIcon size={14} />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/neuron_spatial_ide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <InstagramIcon size={14} />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/UnityNimit/Neuron"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Professional Open-Source Note & Interactive Theme/Language Controls */}
      <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-[11px] text-[var(--text-muted)] text-center sm:text-left">
          <span className="font-semibold text-[var(--text-primary)]">
            {t('footer.copyrightYear', '© 2026 Neuron.')}
          </span>
          <span className="hidden sm:inline text-[var(--text-muted)]">•</span>
          <span className="text-[var(--text-secondary)]">
            {t('footer.openSourceNote', 'Completely free and open source under the MIT License.')}
          </span>
        </div>

        {/* Pixel-Perfect Theme & Language Controls */}
        <div className="shrink-0">
          <ThemeLangControls />
        </div>
      </div>

      {/* Interactive Legal Document Modal */}
      {activeLegal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setActiveLegal(null)}
        >
          <div 
            className="relative border border-[var(--border-subtle)] bg-[var(--modal-bg)] rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cross close button */}
            <button
              onClick={() => setActiveLegal(null)}
              className="absolute top-5 right-5 p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Document Title */}
            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] tracking-tight mb-4 pr-8">
              {activeLegal.title}
            </h3>

            {/* Simple Human-Written Text */}
            <div className="text-[var(--text-secondary)] text-xs sm:text-[13px] leading-relaxed space-y-3.5">
              {activeLegal.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}