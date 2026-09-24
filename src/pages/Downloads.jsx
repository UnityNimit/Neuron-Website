import { useState, useEffect, useCallback } from 'react';
import { Download, ExternalLink, RefreshCw, CheckCircle2, Tag, Calendar, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const REPO_OWNER = 'UnityNimit';
const REPO_NAME = 'Neuron';
const RELEASES_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`;
const CACHE_KEY = 'neuron_github_releases_cache';

const FALLBACK_RELEASES = [
  {
    id: 1,
    tag_name: 'v1.0.0',
    name: 'Initial Release (v1.0.0)',
    published_at: '2026-09-24T00:00:00Z',
    html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/v1.0.0`,
    prerelease: false,
    body: 'Automated clean build of the Neuron App on Windows.\n\n- Zero-lag PixiJS v8 2D canvas & spatial graph topology.\n- Procedural Louvain modularity clustering and community nebulae detection.\n- Interactive cross-domain AST linking with CSP Guard protection.\n- Localhost offline intelligence and real-time AST symbol inspector.',
    assets: [
      {
        id: 101,
        name: 'Neuron_1.0.0_x64-setup.exe',
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe`,
        size: 89400000
      }
    ]
  }
];

function formatBytes(bytes) {
  if (!bytes || typeof bytes !== 'number') return '';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Simple, clean markdown-to-JSX renderer for release bodies
function ReleaseNotes({ body }) {
  if (!body || !body.trim()) {
    return (
      <p className="text-xs text-[var(--text-muted)] italic">
        Automated clean release build of Neuron.
      </p>
    );
  }

  const lines = body.split('\n');

  return (
    <div className="space-y-1.5 text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Markdown headings: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-xs font-semibold text-[var(--text-primary)] mt-3 mb-1">
              {trimmed.replace(/^###\s+/, '')}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-sm font-bold text-[var(--text-primary)] mt-3 mb-1">
              {trimmed.replace(/^##\s+/, '')}
            </h3>
          );
        }

        // Bullet points: - item or * item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[-*]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-[var(--accent-color)] select-none leading-none mt-1">•</span>
              <span className="flex-1">{renderInlineStyles(itemText)}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-xs text-[var(--text-secondary)]">
            {renderInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Helper for backticks code and bold text
function renderInlineStyles(text) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1 py-0.5 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-primary)]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Downloads() {
  const { t } = useLanguage();
  const [releases, setReleases] = useState(FALLBACK_RELEASES);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [syncError, setSyncError] = useState(null);

  const fetchReleases = useCallback(async (isManualRefresh = false) => {
    setIsLoading(true);
    setSyncError(null);

    try {
      const res = await fetch(RELEASES_API, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      });

      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setReleases(data);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
          } catch {
            // local storage write fallback
          }
        } else {
          // Empty release array on GitHub
          setReleases([]);
        }
        setLastSynced(new Date());
      } else {
        throw new Error('Unexpected response format from GitHub');
      }
    } catch (err) {
      // Fallback to cache if available
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed?.data)) {
            setReleases(parsed.data);
            if (parsed.timestamp) setLastSynced(new Date(parsed.timestamp));
          }
        }
      } catch {
        // use default fallback
      }
      if (isManualRefresh) {
        setSyncError(err.message || 'Failed to sync with GitHub API');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch from cache then network
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.data)) {
          setReleases(parsed.data);
          if (parsed.timestamp) setLastSynced(new Date(parsed.timestamp));
        }
      }
    } catch {
      // ignore
    }
    fetchReleases(false);
  }, [fetchReleases]);

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between transition-colors duration-200">

      <main className="relative z-10 pt-[72px] pb-16 px-6 sm:px-8 md:px-12 w-full max-w-7xl mx-auto">
        
        {/* Header with Title and GitHub Sync Status */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
              {t('versions.title', 'Versions')}
            </h1>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
              {t('versions.desc', 'Release history and downloads for Neuron. All versions run locally on your workstation.')}
            </p>
          </div>

          {/* GitHub Sync Status & Refresh Button */}
          <div className="flex items-center gap-2.5 text-xs text-[var(--text-muted)] self-start sm:self-auto shrink-0 font-mono">
            <button
              onClick={() => fetchReleases(true)}
              disabled={isLoading}
              title="Refresh releases from GitHub"
              className="p-1.5 rounded-md hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin text-[var(--accent-color)]' : ''} />
              <span className="hidden sm:inline text-[11px]">{t('versions.syncStatus', 'Synced with GitHub Releases')}</span>
            </button>
            {lastSynced && (
              <span className="text-[10px] hidden md:inline text-[var(--text-muted)]">
                {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>

        {syncError && (
          <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{syncError} (Serving latest cached release data)</span>
          </div>
        )}

        {/* Releases List */}
        {releases.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] text-sm">
            <p>{t('versions.noReleases', 'No public releases found.')}</p>
            <a 
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--accent-color)] hover:underline"
            >
              <span>{t('versions.viewOnGithub', 'View on GitHub')}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl text-left">
            {releases.map((rel, index) => {
              const isLatest = index === 0 && !rel.prerelease;
              const winAsset = rel.assets?.find(a => a.name.endsWith('.exe') || a.name.endsWith('.msi'));
              const macAsset = rel.assets?.find(a => a.name.endsWith('.dmg') || a.name.endsWith('.pkg'));
              const linuxAsset = rel.assets?.find(a => a.name.endsWith('.AppImage') || a.name.endsWith('.deb') || a.name.endsWith('.rpm') || a.name.endsWith('.tar.gz'));

              // Default download URL for windows
              const winDownloadUrl = winAsset?.browser_download_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${rel.tag_name}/Neuron_1.0.0_x64-setup.exe`;

              return (
                <article
                  key={rel.id || rel.tag_name}
                  className="rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-7 shadow-sm transition-all hover:border-[var(--border-hover)]"
                >
                  {/* Release Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-bold text-[var(--text-primary)]">
                        <Tag size={15} className="text-[var(--accent-color)]" />
                        <span>{rel.tag_name}</span>
                      </div>

                      {rel.name && rel.name !== rel.tag_name && (
                        <span className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)]">
                          {rel.name}
                        </span>
                      )}

                      {isLatest && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Latest
                        </span>
                      )}

                      {rel.prerelease && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          Pre-release
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{formatDate(rel.published_at)}</span>
                      </div>
                      <a
                        href={rel.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
                        title={t('versions.viewOnGithub', 'View on GitHub')}
                      >
                        <span className="hidden sm:inline">{t('versions.viewOnGithub', 'View on GitHub')}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Release Changelog Body ("What's Changed in this version") */}
                  <div className="mb-6">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-2.5">
                      {t('versions.whatsChanged', "What's Changed")}
                    </h3>
                    <div className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                      <ReleaseNotes body={rel.body} />
                    </div>
                  </div>

                  {/* 3 Download Buttons Side-by-Side (Windows, Mac, Linux) */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {/* Windows: Active Download */}
                    <a
                      href={winDownloadUrl}
                      download
                      className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-sm shrink-0"
                    >
                      <Download size={13} />
                      <span>{t('hero.downloadWindows', 'Download for Windows')}</span>
                      {winAsset?.size && (
                        <span className="opacity-70 text-[10px] font-mono font-normal">
                          ({formatBytes(winAsset.size)})
                        </span>
                      )}
                    </a>

                    {/* Mac Download or Coming Soon */}
                    {macAsset ? (
                      <a
                        href={macAsset.browser_download_url}
                        download
                        className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-sm shrink-0"
                      >
                        <Download size={13} />
                        <span>{t('hero.downloadMac', 'Download for Mac')}</span>
                        {macAsset.size && (
                          <span className="opacity-70 text-[10px] font-mono font-normal">
                            ({formatBytes(macAsset.size)})
                          </span>
                        )}
                      </a>
                    ) : (
                      <button
                        disabled
                        title={t('hero.comingSoon', 'Coming Soon')}
                        className="h-8 px-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60 font-medium text-xs inline-flex items-center justify-center gap-1.5 cursor-not-allowed select-none transition-all shrink-0"
                      >
                        <span>{t('hero.downloadMac', 'Download for Mac')}</span>
                        <span className="text-[9.5px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-muted)] leading-none">
                          {t('hero.comingSoon', 'Coming Soon')}
                        </span>
                      </button>
                    )}

                    {/* Linux Download or Coming Soon */}
                    {linuxAsset ? (
                      <a
                        href={linuxAsset.browser_download_url}
                        download
                        className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-sm shrink-0"
                      >
                        <Download size={13} />
                        <span>{t('hero.downloadLinux', 'Download for Linux')}</span>
                        {linuxAsset.size && (
                          <span className="opacity-70 text-[10px] font-mono font-normal">
                            ({formatBytes(linuxAsset.size)})
                          </span>
                        )}
                      </a>
                    ) : (
                      <button
                        disabled
                        title={t('hero.comingSoon', 'Coming Soon')}
                        className="h-8 px-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] opacity-60 font-medium text-xs inline-flex items-center justify-center gap-1.5 cursor-not-allowed select-none transition-all shrink-0"
                      >
                        <span>{t('hero.downloadLinux', 'Download for Linux')}</span>
                        <span className="text-[9.5px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--border-subtle)] text-[var(--text-muted)] leading-none">
                          {t('hero.comingSoon', 'Coming Soon')}
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
