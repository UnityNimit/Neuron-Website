import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LANGUAGES, translations } from '../i18n/translations';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  languages: LANGUAGES,
  currentLanguageObj: LANGUAGES[0]
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('neuron_lang');
      if (saved && translations[saved]) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLanguage = useCallback((code) => {
    if (!translations[code]) return;
    setLanguageState(code);
    try {
      localStorage.setItem('neuron_lang', code);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Update HTML lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  // Robust nested translation lookup with fallback chain
  const t = useCallback((key, fallback) => {
    if (!key) return '';
    const parts = key.split('.');

    // 1. Try active language
    let current = translations[language];
    let found = true;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        found = false;
        break;
      }
    }

    if (found && current !== undefined && current !== null) {
      return current;
    }

    // 2. Try default English
    let enFallback = translations.en;
    let enFound = true;
    for (const part of parts) {
      if (enFallback && typeof enFallback === 'object' && part in enFallback) {
        enFallback = enFallback[part];
      } else {
        enFound = false;
        break;
      }
    }

    if (enFound && enFallback !== undefined && enFallback !== null) {
      return enFallback;
    }

    // 3. Fallback string provided by caller or raw key
    return fallback !== undefined ? fallback : key;
  }, [language]);

  const currentLanguageObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      languages: LANGUAGES,
      currentLanguageObj
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
