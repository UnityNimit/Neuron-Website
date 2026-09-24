import { useState, useRef, useEffect } from 'react';
import { Monitor, Sun, Moon, Globe, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ThemeLangControls({ className = '' }) {
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, languages, currentLanguageObj, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center gap-2.5 font-sans select-none relative ${className}`}>
      {/* 1. Theme Selector Pill (Exact pixel match to design reference) */}
      <div 
        className="border p-0.5 rounded-full flex items-center shadow-inner transition-colors duration-200"
        style={{
          backgroundColor: 'var(--pill-bg)',
          borderColor: 'var(--pill-border)'
        }}
      >
        <button
          type="button"
          onClick={() => setTheme('system')}
          title={t('nav.system', 'System theme')}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            theme === 'system'
              ? 'shadow-sm text-[var(--text-primary)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          style={{
            backgroundColor: theme === 'system' ? 'var(--pill-btn-active)' : 'transparent'
          }}
          aria-label={t('nav.system', 'System theme')}
        >
          <Monitor size={14} className="stroke-[2]" />
        </button>

        <button
          type="button"
          onClick={() => setTheme('light')}
          title={t('nav.light', 'Light theme')}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            theme === 'light'
              ? 'shadow-sm text-amber-500'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          style={{
            backgroundColor: theme === 'light' ? 'var(--pill-btn-active)' : 'transparent'
          }}
          aria-label={t('nav.light', 'Light theme')}
        >
          <Sun size={14} className="stroke-[2]" />
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          title={t('nav.dark', 'Dark theme')}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            theme === 'dark'
              ? 'shadow-sm text-[var(--accent-color)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          style={{
            backgroundColor: theme === 'dark' ? 'var(--pill-btn-active)' : 'transparent'
          }}
          aria-label={t('nav.dark', 'Dark theme')}
        >
          <Moon size={14} className="stroke-[2]" />
        </button>
      </div>

      {/* 2. Language Selector Pill with Smooth Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="border px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium transition-all cursor-pointer shadow-inner"
          style={{
            backgroundColor: 'var(--pill-bg)',
            borderColor: 'var(--pill-border)',
            color: 'var(--text-primary)'
          }}
          aria-haspopup="true"
          aria-expanded={isLangOpen}
        >
          <Globe size={14} className="text-[#60A5FA]" />
          <span>{currentLanguageObj.label}</span>
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${
              isLangOpen ? 'rotate-180 text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
            }`}
          />
        </button>

        {/* Dropdown Menu (Floats upward from footer) */}
        {isLangOpen && (
          <div 
            className="absolute bottom-full right-0 mb-2 w-36 border rounded-xl py-1.5 shadow-2xl z-50 animate-fadeIn font-sans"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)] px-3 py-1">
              {t('footer.selectLanguage', 'Select Language')}
            </div>
            {languages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'font-medium bg-[var(--border-subtle)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`}
                >
                  <span>{l.label}</span>
                  {isSelected && <Check size={12} className="text-[#60A5FA]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
