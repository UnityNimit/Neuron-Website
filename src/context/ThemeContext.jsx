import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'dark',
  isDark: true,
  setTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('neuron_theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch {
      // Fallback if localStorage is unavailable
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('neuron_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Fallback
    }
    return 'dark';
  });

  // Calculate resolved theme based on preference and system setting
  useEffect(() => {
    const updateResolvedTheme = () => {
      let resolved = 'dark';
      if (theme === 'light') {
        resolved = 'light';
      } else if (theme === 'dark') {
        resolved = 'dark';
      } else {
        // System preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          resolved = 'light';
        } else {
          resolved = 'dark';
        }
      }

      setResolvedTheme(resolved);

      const root = document.documentElement;
      if (resolved === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      }
    };

    updateResolvedTheme();

    // Listen for system changes if theme is 'system'
    if (theme === 'system' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    if (newTheme !== 'system' && newTheme !== 'light' && newTheme !== 'dark') return;
    setThemeState(newTheme);
    try {
      localStorage.setItem('neuron_theme', newTheme);
    } catch {
      // Ignore localStorage errors
    }
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, isDark, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
