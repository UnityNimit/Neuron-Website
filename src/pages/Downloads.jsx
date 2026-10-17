import { RefreshCw } from 'lucide-react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { useReleases, formatBytes, formatDate, getAssetMeta } from '../context/ReleaseContext';

const REPO_OWNER = 'UnityNimit';
const REPO_NAME = 'Neuron';

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
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="font-mono text-[var(--text-muted)] text-[11px] shrink-0 select-none">
                {num}.
              </span>
              <span>{itemText}</span>
            </div>
          );
        }

        // Unordered lists: - item or * item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[var(--text-muted)] select-none shrink-0">•</span>
              <span>{trimmed.replace(/^[-*]\s+/, '')}</span>
            </div>
          );
        }

        // Blockquotes: > item
        if (trimmed.startsWith('> ')) {
          return (
            <div key={idx} className="pl-3 border-l border-[var(--border-strong)] text-[var(--text-muted)] italic my-1 font-sans">
              {trimmed.replace(/^>\s+/, '')}
            </div>
          );
        }

        // Regular paragraph text
        return (
          <p key={idx}>
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function Downloads() {
  const { t } = useLanguage();
  const { releases, isLoading, lastSynced, syncNotice, fetchReleases } = useReleases();

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between transition-colors duration-200">

      <main 
        className="relative z-10 pt-[72px] pb-16 px-4 sm:px-8 md:px-12 w-full max-w-7xl mx-auto flex-1"
        style={{
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))'
        }}
      >
        
        {/* Header with Title and GitHub Sync Status */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-subtle)]">
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {t('versions.title', 'Versions')}
            </h1>
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
              const tag = rel.tag_name;
              return (
                <article
                  key={rel.id || tag}
                  className="w-full pb-12 border-b border-[var(--border-subtle)] last:border-b-0 last:pb-0"
                >
                  {/* Release Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-6 pb-3 border-b border-[var(--border-subtle)]/60">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-mono text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                        {tag}
                      </span>

                      {rel.name && rel.name !== tag && (
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
                  <div className="mb-8">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
                      {t('versions.releaseNotes', 'Release Notes')}
                    </h3>
                    <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <ReleaseNotes body={rel.body} />
                    </div>
                  </div>

                  {/* Minimalistic Downloads List: Zero containers, zero boxes, simple highlighted text links */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium mb-3">
                      Available Downloads
                    </h3>
                    <div className="flex flex-col divide-y divide-[var(--border-subtle)]/40">
                      {/* Release Binary Assets */}
                      {rel.assets && rel.assets.length > 0 ? (
                        rel.assets.map((asset) => {
                          const meta = getAssetMeta(asset.name);
                          return (
                            <a
                              key={asset.id || asset.name}
                              href={asset.browser_download_url}
                              download
                              className="group py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 transition-colors cursor-pointer"
                            >
                              <div className="flex items-baseline gap-2.5 flex-wrap">
                                <span className="font-mono text-xs font-semibold text-[var(--accent-color)] group-hover:underline break-all sm:break-normal">
                                  {asset.name}
                                </span>
                                <span className="text-[11px] font-sans text-[var(--text-secondary)]">
                                  {meta.desc}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-3 text-[11px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors shrink-0">
                                <span>{meta.platform}</span>
                                {asset.size && (
                                  <span>{formatBytes(asset.size)}</span>
                                )}
                              </div>
                            </a>
                          );
                        })
                      ) : null}

                      {/* Source Code Archives */}
                      <a
                        href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/${tag}.zip`}
                        download
                        className="group py-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 transition-colors cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] group-hover:underline transition-colors">
                            Source code (zip)
                          </span>
                          <span className="text-[11px] font-sans text-[var(--text-muted)]">
                            Complete repository source code archive
                          </span>
                        </div>
                        <div className="flex items-baseline gap-3 text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                          <span>Source</span>
                          <span>.zip</span>
                        </div>
                      </a>

                      <a
                        href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/${tag}.tar.gz`}
                        download
                        className="group py-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 transition-colors cursor-pointer"
                      >
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                          <span className="font-mono text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-color)] group-hover:underline transition-colors">
                            Source code (tar.gz)
                          </span>
                          <span className="text-[11px] font-sans text-[var(--text-muted)]">
                            Gzipped tarball source archive
                          </span>
                        </div>
                        <div className="flex items-baseline gap-3 text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                          <span>Source</span>
                          <span>.tar.gz</span>
                        </div>
                      </a>
                    </div>
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
