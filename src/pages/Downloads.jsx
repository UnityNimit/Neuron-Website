import Footer from '../components/Footer';

const LATEST_RELEASE = {
  version: 'v1.2.4',
  tag: 'Latest',
  date: 'September 10, 2026'
};

export default function Downloads() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans relative selection:bg-[#3B82F6]/30 selection:text-white flex flex-col justify-between">

      <main className="relative z-10 pt-[72px] pb-8 px-4 sm:px-6 w-full">
        
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Versions
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
            Release history and downloads for Neuron. All versions run locally on your workstation.
          </p>
        </div>

        {/* Minimal Timeline */}
        <div className="relative pl-6 border-l border-white/[0.1] max-w-3xl">
          
          {/* Timeline Node Indicator */}
          <div className="absolute -left-1.5 top-2.5 w-3 h-3 rounded-full bg-[#3B82F6] ring-4 ring-[#050505]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white tracking-tight">
                {LATEST_RELEASE.version}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded border font-medium bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/30">
                {LATEST_RELEASE.tag}
              </span>
              <span className="text-xs text-slate-400">
                {LATEST_RELEASE.date}
              </span>
            </div>

            <a
              href="/Neuron-Setup.exe"
              download="Neuron-Setup.exe"
              className="h-8 px-4 rounded-lg bg-white text-black font-semibold text-xs hover:bg-slate-100 transition-all inline-flex items-center justify-center self-start sm:self-auto cursor-pointer active:scale-[0.98] shadow-sm"
            >
              <span>Download for Windows</span>
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}