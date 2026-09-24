import { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronLeft, ChevronRight, Menu, X, Copy, Check
} from 'lucide-react';
import Footer from '../components/Footer';
import { useDocsSearch } from '../context/DocsSearchContext';
import { useLanguage } from '../context/LanguageContext';
import { DOCS_DATA, DOCS_NAV_GROUPS } from '../data/docs';

const ALL_DOC_IDS = DOCS_NAV_GROUPS.flatMap(g => g.items.map(i => i.id));

// Helper for comprehensive deep text search across all paragraphs, tables, code blocks, and bullet points
const docMatchesQuery = (doc, q) => {
  if (!doc) return false;
  if (doc.title?.toLowerCase().includes(q)) return true;
  if (doc.subtitle?.toLowerCase().includes(q)) return true;
  if (doc.category?.toLowerCase().includes(q)) return true;
  if (Array.isArray(doc.sections)) {
    for (const sec of doc.sections) {
      if (sec.title?.toLowerCase().includes(q)) return true;
      if (sec.desc?.toLowerCase().includes(q)) return true;
      if (Array.isArray(sec.paragraphs)) {
        for (const p of sec.paragraphs) {
          if (p?.toLowerCase().includes(q)) return true;
        }
      }
      if (Array.isArray(sec.points)) {
        for (const pt of sec.points) {
          if (pt.label?.toLowerCase().includes(q)) return true;
          if (pt.text?.toLowerCase().includes(q)) return true;
        }
      }
      if (Array.isArray(sec.codeBlocks)) {
        for (const cb of sec.codeBlocks) {
          if (cb.label?.toLowerCase().includes(q)) return true;
          if (cb.code?.toLowerCase().includes(q)) return true;
        }
      }
      if (sec.table) {
        if (Array.isArray(sec.table.headers) && sec.table.headers.some(h => h?.toLowerCase().includes(q))) return true;
        if (Array.isArray(sec.table.rows)) {
          for (const row of sec.table.rows) {
            if (Array.isArray(row) && row.some(cell => cell?.toLowerCase().includes(q))) return true;
          }
        }
      }
    }
  }
  return false;
};

function CodeSnippetBlock({ block }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!block?.code) return;
    navigator.clipboard?.writeText(block.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="my-5 border-l-2 border-[#3B82F6]/60 pl-4 py-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
          {block.label || block.language || 'Specification'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          title="Copy snippet"
        >
          {copied ? <Check size={12} className="text-[#60A5FA]" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="text-xs font-mono text-[var(--text-primary)] leading-relaxed overflow-x-auto whitespace-pre py-1 scrollbar-thin">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}

export default function Docs() {
  const getInitialDocId = () => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').trim();
      if (ALL_DOC_IDS.includes(hash)) {
        return hash;
      }
    }
    return 'welcome';
  };

  const [activeDocId, setActiveDocId] = useState(getInitialDocId);
  const { searchQuery, setSearchQuery } = useDocsSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Sync hash to activeDocId and listen to back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && ALL_DOC_IDS.includes(hash)) {
        setActiveDocId(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (activeDocId && window.location.hash !== `#${activeDocId}`) {
      window.location.hash = activeDocId;
    }
  }, [activeDocId]);

  const selectDoc = (id) => {
    setActiveDocId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (secId) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeDoc = DOCS_DATA[activeDocId] || DOCS_DATA['welcome'];

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return DOCS_NAV_GROUPS;
    const q = searchQuery.toLowerCase().trim();
    return DOCS_NAV_GROUPS.map(group => {
      const items = group.items.filter(item => {
        const doc = DOCS_DATA[item.id];
        return (
          item.label.toLowerCase().includes(q) ||
          group.category.toLowerCase().includes(q) ||
          docMatchesQuery(doc, q)
        );
      });
      return { ...group, items };
    }).filter(group => group.items.length > 0);
  }, [searchQuery]);

  // Previous and Next navigation
  const currentIndex = ALL_DOC_IDS.indexOf(activeDocId);
  const prevDocId = currentIndex > 0 ? ALL_DOC_IDS[currentIndex - 1] : null;
  const nextDocId = currentIndex < ALL_DOC_IDS.length - 1 ? ALL_DOC_IDS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between transition-colors duration-200">
      
      {/* Edge-to-edge full-width container */}
      <div className="w-full flex-1 flex flex-col md:flex-row px-0 pt-14 pb-0">
        
        {/* LEFT SIDEBAR (Desktop - Docked flush to left edge) */}
        <aside className="w-60 lg:w-68 border-r border-[var(--border-subtle)] hidden md:flex flex-col justify-between pt-6 pb-10 px-5 shrink-0 font-sans text-xs sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div>
            {filteredGroups.length === 0 ? (
              <div className="py-8 px-2 text-center text-[var(--text-muted)] text-xs space-y-2">
                <p className="text-[var(--text-primary)] font-medium">No results found for &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Try keywords like WebGPU, Tree-Sitter, Isolation Forest, LibCST, or Ollama.</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 inline-block text-[11px] text-[#60A5FA] hover:underline cursor-pointer"
                >
                  {t('nav.searchClear', 'Clear search')}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredGroups.map(group => (
                  <div key={group.category} className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold px-2 mb-1.5">
                      {group.category}
                    </div>
                    <div className="space-y-0.5">
                      {group.items.map(item => {
                        const isActive = activeDocId === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => selectDoc(item.id)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer flex items-center justify-between ${
                              isActive
                                ? 'text-[var(--text-primary)] font-semibold bg-[var(--border-subtle)]'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Header / Drawer Toggle */}
        <div className="md:hidden w-full py-2.5 px-4 border-b border-[var(--border-subtle)] flex items-center justify-between mb-2">
          <div className="text-xs text-[var(--text-muted)] flex items-center gap-2 truncate pr-2">
            <span>Docs</span>
            <span>/</span>
            <span className="text-[#60A5FA] font-medium truncate">{activeDoc.title}</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
            aria-label="Toggle docs navigation"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Horizontal Doc Tabs */}
        <div className="md:hidden w-full overflow-x-auto flex items-center gap-1.5 px-4 pb-2 mb-4 scrollbar-none border-b border-[var(--border-subtle)]">
          {ALL_DOC_IDS.map(id => {
            const doc = DOCS_DATA[id];
            if (!doc) return null;
            const isActive = activeDocId === id;
            return (
              <button
                key={id}
                onClick={() => selectDoc(id)}
                className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                  isActive
                    ? 'text-[var(--text-primary)] font-medium bg-[var(--border-subtle)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--border-subtle)]/40'
                }`}
              >
                {doc.title}
              </button>
            );
          })}
        </div>

        {/* Mobile Drawer with Search */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-14 bg-[var(--bg-app)] z-40 p-6 overflow-y-auto">
            <div className="mb-6 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs (e.g. WebGPU, Tree-Sitter)..."
                className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-[#60A5FA]/50 rounded-lg pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
              />
            </div>

            {filteredGroups.length === 0 ? (
              <div className="py-6 px-2 text-center text-[var(--text-muted)] text-xs space-y-2">
                <p className="text-[var(--text-primary)] font-medium">No results found for &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs text-[#60A5FA] hover:underline cursor-pointer"
                >
                  {t('nav.searchClear', 'Clear search')}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredGroups.map(group => (
                  <div key={group.category} className="space-y-1">
                    <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2">
                      {group.category}
                    </div>
                    <div className="space-y-1 pl-2">
                      {group.items.map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            selectDoc(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left py-1.5 text-sm ${
                            activeDocId === item.id ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MAIN DOCUMENTATION CONTENT */}
        <main className="flex-1 px-6 sm:px-10 md:px-14 lg:px-18 pt-8 pb-16 min-h-[calc(100vh-12rem)] flex flex-col justify-between max-w-5xl">
          <div>
            {/* Category Header + Divider matching Versions & Help pages */}
            <div className="pb-6 mb-8 border-b border-[var(--border-subtle)]">
              <div className="text-[11px] font-mono text-[#60A5FA] mb-2 font-medium uppercase tracking-widest">
                {activeDoc.category}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3 leading-tight">
                {activeDoc.title}
              </h1>

              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed font-normal">
                {activeDoc.subtitle}
              </p>
            </div>

            {/* Document Sections */}
            <div className="space-y-14">
              {activeDoc.sections.map(sec => (
                <section key={sec.id} id={sec.id} className="scroll-mt-24 pb-10 border-b border-[var(--border-subtle)]/60 last:border-b-0 last:pb-0">
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
                    {sec.title}
                  </h2>

                  {sec.desc && (
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 font-normal">
                      {sec.desc}
                    </p>
                  )}

                  {/* Extended Multi-Paragraph Deep Explanations */}
                  {Array.isArray(sec.paragraphs) && sec.paragraphs.length > 0 && (
                    <div className="space-y-3.5 mb-5">
                      {sec.paragraphs.map((para, idx) => (
                        <p key={idx} className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Unboxed Minimalist Technical Specification Table */}
                  {sec.table && Array.isArray(sec.table.headers) && Array.isArray(sec.table.rows) && (
                    <div className="my-6 overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border-subtle)] text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                            {sec.table.headers.map((hdr, hIdx) => (
                              <th key={hIdx} className="py-2.5 pr-4 font-semibold">
                                {hdr}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)]/50">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="align-top">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`py-3 pr-4 leading-relaxed whitespace-pre-line ${
                                    cIdx === 0
                                      ? 'font-mono text-xs text-[var(--text-primary)] font-medium'
                                      : 'text-xs sm:text-sm text-[var(--text-secondary)]'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Unboxed Minimalist Code / Config / Formula Blocks */}
                  {Array.isArray(sec.codeBlocks) && sec.codeBlocks.length > 0 && (
                    <div className="space-y-4 my-5">
                      {sec.codeBlocks.map((cb, cbIdx) => (
                        <CodeSnippetBlock key={cbIdx} block={cb} />
                      ))}
                    </div>
                  )}

                  {/* Pointwise Specification */}
                  {Array.isArray(sec.points) && sec.points.length > 0 && (
                    <ul className="space-y-3 pl-1 mt-4">
                      {sec.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                          <span className="text-[#60A5FA] mr-2.5 select-none font-bold">•</span>
                          <div>
                            <strong className="text-[var(--text-primary)] font-medium mr-1.5">{pt.label}:</strong>
                            <span>{pt.text}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Bottom Pagination */}
          <div className="mt-14 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
            {prevDocId ? (
              <button
                onClick={() => selectDoc(prevDocId)}
                className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>{DOCS_DATA[prevDocId]?.title}</span>
              </button>
            ) : <div />}

            {nextDocId ? (
              <button
                onClick={() => selectDoc(nextDocId)}
                className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <span>{DOCS_DATA[nextDocId]?.title}</span>
                <ChevronRight size={14} />
              </button>
            ) : <div />}
          </div>
        </main>

        {/* RIGHT SIDEBAR: "On This Page" Section Anchor Navigation (Wide Desktop) */}
        {activeDoc.sections && activeDoc.sections.length > 1 && (
          <aside className="hidden xl:block w-56 pt-8 pr-6 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-3">
              On This Page
            </div>
            <ul className="space-y-2 border-l border-[var(--border-subtle)] pl-3">
              {activeDoc.sections.map(sec => (
                <li key={sec.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className="text-left text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors leading-snug cursor-pointer"
                  >
                    {sec.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {/* Global Website Footer */}
      <Footer />
    </div>
  );
}