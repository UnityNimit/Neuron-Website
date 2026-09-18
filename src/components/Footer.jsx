import { Link } from 'react-router-dom';

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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="mt-4 sm:mt-6 border-t border-white/[0.08] bg-[#050505] pt-5 pb-6 px-4 sm:px-6 text-xs font-sans relative z-10 text-slate-400">
      <div className="w-full flex flex-col md:flex-row items-start gap-12 sm:gap-16 md:gap-24">
        
        {/* Left: Brand Column */}
        <div className="flex flex-col gap-2 min-w-[120px]">
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5 cursor-pointer">
            <img src="/logo.png" alt="Neuron" className="h-6 w-6 object-contain" />
            <span className="font-semibold text-white tracking-wide text-sm">NEURON</span>
          </Link>
        </div>

        {/* Links Grouped Naturally */}
        <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-16 md:gap-20 text-left">
          {/* Navigation */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Navigation
            </div>
            <Link to="/docs" onClick={scrollToTop} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              Documentation
            </Link>
            <Link to="/downloads" onClick={scrollToTop} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              Downloads
            </Link>
            <Link to="/help" onClick={scrollToTop} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              Help & Queries
            </Link>
          </div>

          {/* Socials & Community */}
          <div className="flex flex-col gap-2.5">
            <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Socials
            </div>
            <a
              href="https://www.linkedin.com/in/neuron-spatial-ide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <LinkedInIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/SpatialIDE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <XIcon size={13} />
              <span>X (Twitter)</span>
            </a>
            <a
              href="https://www.reddit.com/user/Neuron_Spatial_IDE/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <RedditIcon size={14} />
              <span>Reddit</span>
            </a>
            <a
              href="https://github.com/UnityNimit/Neuron"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}