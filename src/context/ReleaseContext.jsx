import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const REPO_OWNER = 'UnityNimit';
const REPO_NAME = 'Neuron';
const RELEASES_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`;
const CACHE_KEY = 'neuron_github_releases_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

export function formatBytes(bytes) {
  if (!bytes || typeof bytes !== 'number') return '';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function formatDate(dateString) {
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

export function getAssetMeta(name) {
  if (name.endsWith('.exe')) {
    return {
      platform: 'Windows',
      displayName: 'Windows Setup (.exe)',
      desc: 'Windows 10/11 x64 Installer',
      isPrimaryFor: 'windows'
    };
  }
  if (name.endsWith('.msi')) {
    return {
      platform: 'Windows',
      displayName: 'Windows MSI (.msi)',
      desc: 'Windows x64 Enterprise Package',
      isPrimaryFor: null
    };
  }
  if (name.endsWith('.dmg')) {
    return {
      platform: 'macOS',
      displayName: 'macOS Disk Image (.dmg)',
      desc: 'Apple Silicon (aarch64)',
      isPrimaryFor: 'mac'
    };
  }
  if (name.includes('.app.tar.gz') || (name.endsWith('.tar.gz') && name.includes('app'))) {
    return {
      platform: 'macOS',
      displayName: 'macOS App Archive (.app.tar.gz)',
      desc: 'Apple Silicon Standalone Bundle',
      isPrimaryFor: null
    };
  }
  if (name.endsWith('.AppImage')) {
    return {
      platform: 'Linux',
      displayName: 'Linux Universal (.AppImage)',
      desc: 'x64 Standalone Executable',
      isPrimaryFor: 'linux'
    };
  }
  if (name.endsWith('.deb')) {
    return {
      platform: 'Linux',
      displayName: 'Linux Debian / Ubuntu (.deb)',
      desc: 'Debian / Ubuntu Package',
      isPrimaryFor: null
    };
  }
  if (name.endsWith('.rpm')) {
    return {
      platform: 'Linux',
      displayName: 'Linux Fedora / RHEL (.rpm)',
      desc: 'Fedora / Red Hat / openSUSE Package',
      isPrimaryFor: null
    };
  }
  if (name === 'Source code (zip)' || name.endsWith('.zip')) {
    return {
      platform: 'Source',
      displayName: 'Source Code (.zip)',
      desc: 'Source Archive (Zip)',
      isPrimaryFor: null
    };
  }
  if (name === 'Source code (tar.gz)' || name.endsWith('.tar.gz')) {
    return {
      platform: 'Source',
      displayName: 'Source Code (.tar.gz)',
      desc: 'Source Archive (Tarball)',
      isPrimaryFor: null
    };
  }
  return {
    platform: 'Other',
    displayName: name,
    desc: 'Binary Asset',
    isPrimaryFor: null
  };
}

export const FALLBACK_RELEASES = [
  {
    id: 412111329,
    tag_name: 'v1.2.0',
    name: 'Neuron IDE v1.2.0',
    published_at: '2026-10-13T21:07:59Z',
    html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/v1.2.0`,
    zipball_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v1.2.0.zip`,
    tarball_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v1.2.0.tar.gz`,
    prerelease: false,
    body: 'Automated release build of Neuron IDE for Windows, Linux, and macOS with native Python sidecar engine.',
    assets: [
      {
        id: 640946033,
        name: 'Neuron_1.2.0_x64-setup.exe',
        size: 59878208,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron_1.2.0_x64-setup.exe`
      },
      {
        id: 640945925,
        name: 'Neuron_1.2.0_x64_en-US.msi',
        size: 60436480,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron_1.2.0_x64_en-US.msi`
      },
      {
        id: 640943640,
        name: 'Neuron_1.2.0_aarch64.dmg',
        size: 53483295,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron_1.2.0_aarch64.dmg`
      },
      {
        id: 640943766,
        name: 'Neuron_aarch64.app.tar.gz',
        size: 53226376,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron_aarch64.app.tar.gz`
      },
      {
        id: 640957848,
        name: 'Neuron_1.2.0_amd64.AppImage',
        size: 165202424,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron_1.2.0_amd64.AppImage`
      },
      {
        id: 640957321,
        name: 'Neuron_1.2.0_amd64.deb',
        size: 84806830,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron_1.2.0_amd64.deb`
      },
      {
        id: 640957621,
        name: 'Neuron-1.2.0-1.x86_64.rpm',
        size: 84807570,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.2.0/Neuron-1.2.0-1.x86_64.rpm`
      }
    ]
  },
  {
    id: 399946483,
    tag_name: 'v1.1.0',
    name: 'Neuron Beta Release v1.1.0',
    published_at: '2026-10-02T21:33:17Z',
    html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/v1.1.0`,
    zipball_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v1.1.0.zip`,
    tarball_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v1.1.0.tar.gz`,
    prerelease: false,
    body: `Key Changes in v1.1.0\n\n> Autonomous LOD Animation: Crossing the zoom threshold triggers an autonomous procedural animation that completes smoothly.\n> Granular Line Thickness: Independent controls for selected blue lines, bridging lines, and purple call lines.\n> Separate Label Distances: Independent camera distance thresholds for folder names, file names, and function names.\n> Vector SVG Branding: Official scalable SVG logo replacing all legacy bitmap logos and icons.`,
    assets: [
      {
        id: 597143128,
        name: 'Neuron_1.1.0_x64-setup.exe',
        size: 73918531,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.1.0/Neuron_1.1.0_x64-setup.exe`
      }
    ]
  },
  {
    id: 394983417,
    tag_name: 'v1.0.0',
    name: 'Neuron Beta Release (v1.0.0)',
    published_at: '2026-09-23T19:20:20Z',
    html_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/tag/v1.0.0`,
    zipball_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v1.0.0.zip`,
    tarball_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/tags/v1.0.0.tar.gz`,
    prerelease: false,
    body: 'Initial release of Neuron for Windows.',
    assets: [
      {
        id: 584436594,
        name: 'Neuron_1.0.0_x64-setup.exe',
        size: 55689126,
        browser_download_url: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.0.0/Neuron_1.0.0_x64-setup.exe`
      }
    ]
  }
];

export function detectPlatformInfo() {
  if (typeof window === 'undefined') {
    return { platform: 'windows', isMobile: false };
  }

  const nav = window.navigator;
  const ua = nav.userAgent || '';
  const platform = nav.platform || '';
  const maxTouchPoints = nav.maxTouchPoints || 0;

  // Mobile Detection: Android, iOS (iPhone, iPad, iPod)
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (platform === 'MacIntel' && maxTouchPoints > 1);
  const isMobileUA = /Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isClientHintsMobile = Boolean(nav.userAgentData?.mobile);

  if (isAndroid || isIOS || isMobileUA || isClientHintsMobile) {
    return { platform: 'mobile', isMobile: true };
  }

  // Desktop Client Hints
  const uadPlatform = (nav.userAgentData?.platform || '').toLowerCase();
  if (uadPlatform.includes('win')) {
    return { platform: 'windows', isMobile: false };
  }
  if (uadPlatform.includes('mac')) {
    return { platform: 'mac', isMobile: false };
  }
  if (uadPlatform.includes('linux')) {
    return { platform: 'linux', isMobile: false };
  }

  // Desktop User-Agent & Platform checks
  if (/Macintosh|Mac OS X/i.test(ua) || /MacIntel|MacPPC/i.test(platform)) {
    return { platform: 'mac', isMobile: false };
  }
  if (/Linux/i.test(ua) || /Linux/i.test(platform)) {
    return { platform: 'linux', isMobile: false };
  }
  if (/Win/i.test(ua) || /Win/i.test(platform)) {
    return { platform: 'windows', isMobile: false };
  }

  return { platform: 'windows', isMobile: false };
}

const ReleaseContext = createContext({
  releases: FALLBACK_RELEASES,
  latestRelease: FALLBACK_RELEASES[0],
  downloads: {},
  isLoading: false,
  lastSynced: null,
  syncNotice: null,
  userPlatform: 'windows',
  isMobile: false,
  fetchReleases: () => {}
});

export function ReleaseProvider({ children }) {
  const [releases, setReleases] = useState(FALLBACK_RELEASES);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [syncNotice, setSyncNotice] = useState(null);
  const [platformInfo] = useState(() => detectPlatformInfo());
  const userPlatform = platformInfo.platform;
  const isMobile = platformInfo.isMobile;

  const fetchReleases = useCallback(async (isManualRefresh = false) => {
    setIsLoading(true);
    setSyncNotice(null);

    try {
      const response = await fetch(RELEASES_API, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setReleases(data);
        const now = new Date();
        setLastSynced(now);

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: now.getTime(),
            data
          }));
        } catch {
          // ignore storage quota errors
        }

        if (isManualRefresh) {
          setSyncNotice('Releases synchronized with GitHub');
          setTimeout(() => setSyncNotice(null), 3000);
        }
      }
    } catch {
      // Fallback to cache or bundled data
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed?.data) && parsed.data.length > 0) {
            setReleases(parsed.data);
            if (parsed.timestamp) setLastSynced(new Date(parsed.timestamp));
          }
        }
      } catch {
        // use default fallback
      }
      if (isManualRefresh) {
        setSyncNotice('Sync unavailable · Serving latest cached release data');
        setTimeout(() => setSyncNotice(null), 5000);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch with cache check
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

    if (!hasFreshCache) {
      fetchReleases(false);
    }
  }, [fetchReleases]);

  // Derive latest release and download targets dynamically
  const { latestRelease, downloads } = useMemo(() => {
    const latest = releases[0] || FALLBACK_RELEASES[0];
    const assets = latest.assets || [];

    // Find best asset for each platform
    const windowsExe = assets.find(a => a.name.endsWith('.exe'));
    const windowsMsi = assets.find(a => a.name.endsWith('.msi'));
    const macDmg = assets.find(a => a.name.endsWith('.dmg'));
    const macTar = assets.find(a => a.name.includes('.app.tar.gz'));
    const linuxAppImage = assets.find(a => a.name.endsWith('.AppImage'));
    const linuxDeb = assets.find(a => a.name.endsWith('.deb'));
    const linuxRpm = assets.find(a => a.name.endsWith('.rpm'));

    // Construct download object
    const winAsset = windowsExe || windowsMsi || assets[0];
    const macAsset = macDmg || macTar;
    const linAsset = linuxAppImage || linuxDeb || linuxRpm;

    return {
      latestRelease: latest,
      downloads: {
        windows: {
          name: winAsset?.name || 'Neuron_1.2.0_x64-setup.exe',
          url: winAsset?.browser_download_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${latest.tag_name}/Neuron_1.2.0_x64-setup.exe`,
          size: winAsset?.size,
          version: latest.tag_name
        },
        mac: {
          name: macAsset?.name || 'Neuron_1.2.0_aarch64.dmg',
          url: macAsset?.browser_download_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${latest.tag_name}/Neuron_1.2.0_aarch64.dmg`,
          size: macAsset?.size,
          version: latest.tag_name
        },
        linux: {
          name: linAsset?.name || 'Neuron_1.2.0_amd64.AppImage',
          url: linAsset?.browser_download_url || `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${latest.tag_name}/Neuron_1.2.0_amd64.AppImage`,
          size: linAsset?.size,
          version: latest.tag_name
        }
      }
    };
  }, [releases]);

  const value = {
    releases,
    latestRelease,
    downloads,
    isLoading,
    lastSynced,
    syncNotice,
    userPlatform,
    isMobile,
    fetchReleases
  };

  return (
    <ReleaseContext.Provider value={value}>
      {children}
    </ReleaseContext.Provider>
  );
}

export function useReleases() {
  const context = useContext(ReleaseContext);
  if (!context) {
    throw new Error('useReleases must be used within a ReleaseProvider');
  }
  return context;
}
