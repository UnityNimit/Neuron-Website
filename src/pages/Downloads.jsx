import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const REPO_OWNER = 'UnityNimit';
const REPO_NAME = 'Neuron';
const RELEASES_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`;
const CACHE_KEY = 'neuron_github_releases_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL to preserve 60 req/hr rate limits

const FALLBACK_RELEASES = [
  {
    id: 1319035123,
    tag_name: 'v1.0.0',
    name: 'Neuron Beta Release (v1.0.0)',
    published_at: '2026-09-24T13:00:52Z',
    html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/v1.0.0`,
    prerelease: false,
    body: `Welcome to the initial beta release of Neuron. This marks the first official Windows setup executable distribution.\n\nNeuron is a powerful, locally-run desktop application designed to interface with your codebase using advanced AI agents and spatial/graph-based code representations.\n\n### Key Features & Capabilities\n- Local AI Engine: Integrated Google Antigravity AI Engine for intelligent, context-aware codebase interactions.\n- Multi-Language AST Parsing: Full tree-sitter integration to syntactically parse and map Python, JavaScript, TypeScript, C, C++, and Java codebases.\n- Graph Machine Learning: Highly optimized graph processing powered by NetworkX to map codebase architecture, dependency trees, and relationships.\n- Native Desktop Experience: Built natively with Tauri and Rust for a lightweight, secure, and performant Windows client.\n- Self-Contained Architecture: Embedded Python backend sidecar ensuring zero external Python dependencies are required on the host environment.\n\n### Installation Instructions\n1. Download Neuron_1.0.0_x64-setup.exe from the installer download link.\n2. Run the installer and follow the standard installation prompts.\n3. Launch Neuron and begin interacting with your codebase.\n\n### Known Beta Limitations\nAs this is a beta release, you may encounter edge-case bugs or unoptimized performance on extremely large codebases. Please report any issues or submit feedback via our GitHub repository.`,
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

// Clean, unboxed markdown renderer for release changelogs
function ReleaseNotes({ body }) {
  if (!body || !body.trim()) {
    return (
      <p className="text-xs text-[var(--text-muted)] font-normal">
        Automated release build of Neuron.
      </p>
    );
  }

  const lines = body.split('\n');

  return (
    <div className="space-y-2 text-xs text-[var(--text-secondary)] font-normal leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Markdown headings: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-xs font-semibold text-[var(--text-primary)] pt-3 pb-1 tracking-tight">
              {trimmed.replace(/^###\s+/, '')}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-sm font-semibold text-[var(--text-primary)] pt-3 pb-1 tracking-tight">
              {trimmed.replace(/^##\s+/, '')}
            </h3>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-sm font-bold text-[var(--text-primary)] pt-3 pb-1 tracking-tight">
              {trimmed.replace(/^#\s+/, '')}
            </h2>
          );
        }

        // Numbered lists: 1. item
        if (/^\d+\.\s+/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          const num = numMatch ? numMatch[1] : '1';
          const itemText = numMatch ? numMatch[2] : trimmed;
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-0.5">
              <span className="text-[var(--text-muted)] font-mono text-[11px] select-none shrink-0 w-3.5">
                {num}.
              </span>
              <span className="flex-1">{renderInlineStyles(itemText)}</span>
            </div>
          );
        }

        // Bullet points: - item or * item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[-*]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5">
              <span className="text-[var(--text-muted)] select-none text-[11px] leading-relaxed">•</span>
              <span className="flex-1">{renderInlineStyles(itemText)}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {renderInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineStyles(text) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-primary)]">
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
  const [lastSynced, setLastSynced] = useState(new Date('2026-09-24T13:00:52Z'));
  const [syncNotice, setSyncNotice] = useState(null);

  const fetchReleases = useCallback(async (isManualRefresh = false) => {
    setIsLoading(true);

    try {
      const res = await fetch(RELEASES_API, {
        headers: { Accept: 'application/vnd.github.v3+json' }
      });

      if (res.status === 403) {
        // GitHub API unauthenticated 60 req/hr rate limit reached
        if (isManualRefresh) {
          setSyncNotice('GitHub rate limit reached (60/hr) · Serving cached release');
          setTimeout(() => setSyncNotice(null), 5000);
        }
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        if (data.length > 0) {
          setReleases(data);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
          } catch {
            // ignore
          }
        } else {
          setReleases([]);
        }
        setLastSynced(new Date());
        if (isManualRefresh) {
          setSyncNotice(null);
        }
      }
    } catch {
      // Fallback gracefully to cached release
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
        setSyncNotice('Sync unavailable · Serving latest cached release');
        setTimeout(() => setSyncNotice(null), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let hasFreshCache = false;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.data) && parsed.data.length > 0) {
          setReleases(parsed.data);
          if (parsed.timestamp) {
            setLastSynced(new Date(parsed.timestamp));
            if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
              hasFreshCache = true;
            }
          }
        }
      }
    } catch {
      // ignore
    }

    // Only auto-fetch if no fresh cache exists
    if (!hasFreshCache) {
      fetchReleases(false);
    }
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
              {t('versions.desc', 'Release history and workstation downloads for Neuron.')}
            </p>
          </div>

          {/* GitHub Sync Status: Only the icon and no text with the time only and no boxs */}
          <div className="flex flex-col items-start sm:items-end gap-1 self-start sm:self-auto shrink-0 pb-1">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
              <button
                onClick={() => fetchReleases(true)}
                disabled={isLoading}
                title="Refresh releases from GitHub"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer disabled:opacity-50 p-0 bg-transparent border-0 outline-none inline-flex items-center justify-center"
                aria-label="Refresh releases"
              >
                <RefreshCw size={13} className={isLoading ? 'animate-spin text-[var(--accent-color)]' : ''} />
              </button>
              {lastSynced && (
                <span className="text-xs text-[var(--text-muted)] select-none">
                  {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>

            {/* Pure, clean text notice: Zero boxes, zero containers */}
            {syncNotice && (
              <span className="text-[11px] font-mono text-[var(--text-muted)] transition-opacity select-none">
                {syncNotice}
              </span>
            )}
          </div>
        </div>

        {/* Releases List - Stretched to full width matching the header line, completely unboxed */}
        {releases.length === 0 ? (
          <div className="py-12 text-center text-[var(--text-muted)] text-sm w-full">
            <p>{t('versions.noReleases', 'No public releases found.')}</p>
            <a 
              href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--accent-color)] hover:underline"
            >
              <span>{t('versions.viewOnGithub', 'View on GitHub')}</span>
            </a>
          </div>
        ) : (
          <div className="w-full text-left space-y-12">
            {releases.map((rel) => {
              const winAsset = rel.assets?.find(a => a.name.endsWith('.exe') || a.name.endsWith('.msi')) || rel.assets?.[0];
              const winDownloadUrl = winAsset?.browser_download_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${rel.tag_name}/Neuron_1.0.0_x64-setup.exe`;

              return (
                <article
                  key={rel.id || rel.tag_name}
                  className="w-full pb-12 border-b border-[var(--border-subtle)] last:border-b-0 last:pb-0"
                >
                  {/* Release Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6 pb-3 border-b border-[var(--border-subtle)]/60">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-mono text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                        {rel.tag_name}
                      </span>

                      {rel.name && rel.name !== rel.tag_name && (
                        <span className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
                          {rel.name}
                        </span>
                      )}

                      {rel.prerelease && (
                        <span className="text-[11px] font-mono text-amber-500/90 font-medium">
                          (pre-release)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-mono">
                      <span>{formatDate(rel.published_at)}</span>
                      <a
                        href={rel.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors underline-offset-4 hover:underline"
                        title={t('versions.viewOnGithub', 'View on GitHub')}
                      >
                        {t('versions.viewOnGithub', 'View on GitHub')}
                      </a>
                    </div>
                  </div>

                  {/* Release Notes - Completely unboxed, clean typography */}
                  <div className="mb-6">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
                      {t('versions.releaseNotes', 'Release Notes')}
                    </h3>
                    <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <ReleaseNotes body={rel.body} />
                    </div>
                  </div>

                  {/* Single Download Button */}
                  <div className="pt-2 flex items-center">
                    <a
                      href={winDownloadUrl}
                      download
                      className="h-8 px-4 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold text-xs hover:opacity-90 transition-all inline-flex items-center justify-center cursor-pointer active:scale-[0.98] shadow-sm shrink-0"
                    >
                      <span>{t('hero.downloadWindows', 'Download for Windows')}</span>
                      {winAsset?.size && (
                        <span className="opacity-70 text-[10px] font-mono font-normal ml-1.5">
                          ({formatBytes(winAsset.size)})
                        </span>
                      )}
                    </a>
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
