import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function Downloads() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between transition-colors duration-200">

      <main className="relative z-10 pt-[72px] pb-8 px-6 sm:px-8 md:px-12 w-full max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
            {t('versions.title', 'Versions')}
          </h1>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            {t('versions.desc', 'Release history and downloads for Neuron. All versions run locally on your workstation.')}
          </p>
        </div>

        {/* Minimal Version Row - Strictly v1.0.0 Beta Release */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
              {t('versions.latestRelease', 'v1.0.0 Beta Release')}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {t('versions.releaseDate', 'September 2026')}
            </span>
          </div>

          <a
            href="https://github.com/UnityNimit/Neuron/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe"
            download="Neuron-Setup.exe"
            className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center self-start sm:self-auto cursor-pointer active:scale-[0.98] shadow-sm"
          >
            <span>{t('hero.downloadWindows', 'Download for Windows')}</span>
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
