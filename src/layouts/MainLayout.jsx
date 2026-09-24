import Navbar from '../components/Navbar';
import { DocsSearchProvider } from '../context/DocsSearchContext';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

export default function MainLayout({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DocsSearchProvider>
          <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative flex flex-col transition-colors duration-200">
            {/* Global Background Grid Accent */}
            <div 
              className="fixed inset-0 pointer-events-none z-0 opacity-80"
              style={{
                backgroundImage: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />

            {/* Navigation */}
            <Navbar />

            {/* Content Container */}
            <div className="relative z-10 flex-1 flex flex-col">
              {children}
            </div>
          </div>
        </DocsSearchProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}