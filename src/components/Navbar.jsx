import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Search, Sun, Moon, Monitor } from 'lucide-react';
import { useDocsSearch } from '../context/DocsSearchContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeLangControls from './ThemeLangControls';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const searchInputRef = useRef(null);

  const { searchQuery, setSearchQuery } = useDocsSearch();
  const { theme, setTheme, isDark } = useTheme();
  const { t } = useLanguage();

  const isDocs = pathname.startsWith('/docs');
  const isVersions = pathname.startsWith('/versions');
  const isHelp = pathname.startsWith('/help');

  // Shortcut key: Ctrl+K / Cmd+K to focus search when on docs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        if (isDocs && searchInputRef.current) {
          e.preventDefault();
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDocs]);

  const getLinkClasses = (isActive) =>
    `text-xs sm:text-[13px] transition-colors ${
      isActive 
        ? 'font-semibold text-[var(--text-primary)]' 
        : 'font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]'
    }`;

  const getMobileLinkClasses = (isActive) =>
    `py-1.5 transition-colors ${
      isActive 
        ? 'font-semibold text-[var(--text-primary)]' 
        : 'font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]'
    }`;

  const toggleThemeQuick = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-200">
      <nav 
        className="h-14 w-full flex items-center justify-between px-4 font-sans relative"
      >
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img src="/logo.png" alt="Neuron" className="h-6 w-6 object-contain" />
            <span className="font-semibold text-[var(--text-primary)] tracking-tight text-sm">Neuron</span>
          </Link>
        </div>

        {/* Center: Perfectly Centered Animated Docs Search */}
        {isDocs && (
          <div className="hidden sm:flex items-center absolute left-1/2 -translate-x-1/2 transition-all duration-300 animate-docs-search z-20 pointer-events-auto">
            <div className="relative w-64 sm:w-72 md:w-80 lg:w-96">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder', 'Search docs...')}
                className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[var(--accent-color)] rounded-md pl-7 pr-12 py-1 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-all shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 cursor-pointer"
                    title={t('nav.searchClear', 'Clear search')}
                  >
                    <X size={11} />
                  </button>
                ) : (
                  <kbd className="hidden md:inline-block px-1 py-0.2 text-[8.5px] font-mono text-[var(--text-muted)] bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded select-none">
                    {t('nav.ctrlK', 'Ctrl K')}
                  </kbd>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right Side Links - Visible across Desktop & Split Screen */}
        <div className="hidden min-[520px]:flex items-center gap-3 sm:gap-5 md:gap-7">
          <Link 
            to="/docs" 
            className={getLinkClasses(isDocs)}
          >
            {t('nav.docs', 'Documentation')}
          </Link>
          <Link 
            to="/versions" 
            className={getLinkClasses(isVersions)}
          >
            {t('nav.versions', 'Versions')}
          </Link>
          <Link 
            to="/help" 
            className={getLinkClasses(isHelp)}
          >
            {t('nav.help', 'Help')}
          </Link>
          <a 
            href="https://github.com/UnityNimit/Neuron" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs sm:text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 group"
          >
            <span>{t('nav.github', 'GitHub')}</span>
            <ExternalLink size={11} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Quick Header Theme Toggle Icon */}
          <button
            type="button"
            onClick={toggleThemeQuick}
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
            title={`${t('nav.theme', 'Theme')}: ${theme === 'system' ? t('nav.system', 'System') : (theme === 'light' ? t('nav.light', 'Light') : t('nav.dark', 'Dark'))}`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Sun size={15} className="text-amber-500" />
            ) : theme === 'dark' ? (
              <Moon size={15} className="text-[var(--accent-color)]" />
            ) : (
              <Monitor size={15} />
            )}
          </button>
          
          <a 
            href="https://github.com/UnityNimit/Neuron/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe"
            download="Neuron-Setup.exe"
            className="h-8 px-3 sm:px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-xs font-semibold hover:opacity-90 header-download-glow inline-flex items-center justify-center cursor-pointer transition-all active:scale-[0.98]"
          >
            {t('nav.download', 'Download')}
          </a>
        </div>

        {/* Mobile-only Menu Button (< 520px) */}
        <div className="min-[520px]:hidden flex items-center gap-2">
          {/* Quick Header Theme Toggle Icon */}
          <button
            type="button"
            onClick={toggleThemeQuick}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Sun size={16} className="text-amber-500" />
            ) : theme === 'dark' ? (
              <Moon size={16} className="text-[var(--accent-color)]" />
            ) : (
              <Monitor size={16} />
            )}
          </button>

          <a 
            href="https://github.com/UnityNimit/Neuron/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe"
            download="Neuron-Setup.exe"
            className="h-7 px-2.5 rounded-md bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] text-xs font-semibold header-download-glow inline-flex items-center justify-center"
          >
            {t('nav.download', 'Download')}
          </a>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu (< 520px) */}
      {isMobileMenuOpen && (
        <div className="min-[520px]:hidden bg-[var(--bg-header)] border-b border-[var(--border-subtle)] px-6 py-5 flex flex-col gap-3.5 text-xs font-sans">
          {isDocs && (
            <div className="relative w-full mb-1">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder', 'Search docs...')}
                className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md pl-8 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
              />
            </div>
          )}

          <Link 
            to="/docs" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={getMobileLinkClasses(isDocs)}
          >
            {t('nav.docs', 'Documentation')}
          </Link>
          <Link 
            to="/versions" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={getMobileLinkClasses(isVersions)}
          >
            {t('nav.versions', 'Versions')}
          </Link>
          <Link 
            to="/help" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={getMobileLinkClasses(isHelp)}
          >
            {t('nav.help', 'Help')}
          </Link>
          <a 
            href="https://github.com/UnityNimit/Neuron" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="py-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-between"
          >
            <span>{t('nav.github', 'GitHub')}</span>
            <ExternalLink size={12} />
          </a>

          {/* Theme & Language Controls in Mobile Menu */}
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-muted)] font-medium">
              {t('nav.theme', 'Theme')} &amp; Language
            </span>
            <ThemeLangControls />
          </div>
        </div>
      )}
    </header>
  );
}
