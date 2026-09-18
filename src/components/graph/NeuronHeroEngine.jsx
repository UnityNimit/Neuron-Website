import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Folder, FileCode2, Network, ZoomIn, ZoomOut, RotateCcw,
  Sparkles, Terminal as TerminalIcon,
  Trash2, ChevronDown, ChevronRight, Type, Files, GitBranch, Settings
} from 'lucide-react';

// =========================================================================
// 1. AUTHENTIC TOPOLOGY DIRECT FROM media_1789748470023.png
// Directory Folders (Large Bright Yellow Suns: #facc15 / #fde047)
// Files (Standard: Blue #3b82f6 / #60a5fa, Entry/Key: Orange #f97316)
// Thin connecting conduits with celestial birth growth animation
// =========================================================================

const RAW_GRAPH_DATA = {
  // Directory Folders (Large Bright Yellow Suns: #facc15)
  folders: [
    { id: 'neuron', label: 'neuron', parent: null, x: 550, y: 130, radius: 24 },
    { id: 'engine', label: 'engine', parent: 'neuron', x: 550, y: 280, radius: 24 },
    { id: 'canvas', label: 'canvas', parent: 'engine', x: 670, y: 200, radius: 22 },
    { id: 'parser', label: 'parser', parent: 'engine', x: 740, y: 310, radius: 22 },
    { id: 'parser/ast', label: 'ast', parent: 'parser', x: 890, y: 300, radius: 20 },
    { id: 'agent', label: 'agent', parent: 'engine', x: 360, y: 370, radius: 22 },
    { id: 'agent/byok', label: 'byok', parent: 'agent', x: 300, y: 240, radius: 20 },
    { id: 'physics', label: 'physics', parent: 'agent', x: 180, y: 320, radius: 20 },
    { id: 'runtime', label: 'runtime', parent: 'agent', x: 330, y: 500, radius: 20 }
  ],

  // Files strictly matching real engine components
  files: [
    // Under neuron root
    { id: 'Cargo.toml', label: 'Cargo.toml', folder: 'neuron', color: '#3b82f6', radius: 8 },
    { id: 'pyproject.toml', label: 'pyproject.toml', folder: 'neuron', color: '#3b82f6', radius: 8 },
    { id: 'README.md', label: 'README.md', folder: 'neuron', color: '#3b82f6', radius: 8 },
    { id: 'server.py', label: 'server.py', folder: 'neuron', color: '#3b82f6', radius: 8.5 },
    { id: 'daemon.rs', label: 'daemon.rs', folder: 'neuron', color: '#3b82f6', radius: 8 },

    // Under engine
    { id: 'spatial_canvas.tsx', label: 'spatial_canvas.tsx', folder: 'engine', color: '#f97316', radius: 9.5 },
    { id: 'conduit_router.ts', label: 'conduit_router.ts', folder: 'engine', color: '#3b82f6', radius: 8.5 },
    { id: 'viewport_camera.ts', label: 'viewport_camera.ts', folder: 'engine', color: '#3b82f6', radius: 8 },
    { id: 'event_bus.ts', label: 'event_bus.ts', folder: 'engine', color: '#3b82f6', radius: 8 },

    // Under canvas
    { id: 'webgpu_pipeline.ts', label: 'webgpu_pipeline.ts', folder: 'canvas', color: '#3b82f6', radius: 8.5 },

    // Under parser
    { id: 'ast_scanner.py', label: 'ast_scanner.py', folder: 'parser', color: '#f97316', radius: 9 },
    { id: 'tree_sitter_bridge.rs', label: 'tree_sitter_bridge.rs', folder: 'parser', color: '#3b82f6', radius: 8.5 },
    { id: 'louvain_modularity.py', label: 'louvain_modularity.py', folder: 'parser', color: '#f97316', radius: 9 },
    { id: 'symbol_table.rs', label: 'symbol_table.rs', folder: 'parser', color: '#3b82f6', radius: 8 },

    // Under parser/ast
    { id: 'cst_transformer.py', label: 'cst_transformer.py', folder: 'parser/ast', color: '#3b82f6', radius: 8 },
    { id: 'type_inference.rs', label: 'type_inference.rs', folder: 'parser/ast', color: '#3b82f6', radius: 8 },
    { id: 'call_hierarchy.py', label: 'call_hierarchy.py', folder: 'parser/ast', color: '#3b82f6', radius: 8 },
    { id: 'cyclomatic_risk.py', label: 'cyclomatic_risk.py', folder: 'parser/ast', color: '#3b82f6', radius: 8 },

    // Under agent
    { id: 'orchestrator.py', label: 'orchestrator.py', folder: 'agent', color: '#f97316', radius: 9 },
    { id: 'tool_executor.py', label: 'tool_executor.py', folder: 'agent', color: '#3b82f6', radius: 8 },
    { id: 'prompt_composer.ts', label: 'prompt_composer.ts', folder: 'agent', color: '#3b82f6', radius: 8 },
    { id: 'diff_patcher.py', label: 'diff_patcher.py', folder: 'agent', color: '#3b82f6', radius: 8 },

    // Under agent/byok
    { id: 'key_manager.ts', label: 'key_manager.ts', folder: 'agent/byok', color: '#3b82f6', radius: 8.5 },

    // Under physics
    { id: 'd3_force_worker.js', label: 'd3_force_worker.js', folder: 'physics', color: '#3b82f6', radius: 9 },
    { id: 'coulomb_repulsion.js', label: 'coulomb_repulsion.js', folder: 'physics', color: '#3b82f6', radius: 8.5 },
    { id: 'spring_relaxation.js', label: 'spring_relaxation.js', folder: 'physics', color: '#3b82f6', radius: 8.5 },
    { id: 'quadtree_bounds.js', label: 'quadtree_bounds.js', folder: 'physics', color: '#3b82f6', radius: 8 },

    // Under runtime
    { id: 'sandbox_isolate.rs', label: 'sandbox_isolate.rs', folder: 'runtime', color: '#3b82f6', radius: 7.5 },
    { id: 'sqlite_cache.py', label: 'sqlite_cache.py', folder: 'runtime', color: '#3b82f6', radius: 7.5 },
    { id: 'process_supervisor.rs', label: 'process_supervisor.rs', folder: 'runtime', color: '#3b82f6', radius: 7.5 }
  ],

  // Tier 4: Multi-tier Symbols / Functions branching from files
  symbols: [
    // from spatial_canvas.tsx
    { id: 'SC:renderSpatialWorld', label: 'renderSpatialWorld()', parentFile: 'spatial_canvas.tsx', color: '#a855f7', radius: 5.5 },
    { id: 'SC:SpatialViewport', label: 'SpatialViewport', parentFile: 'spatial_canvas.tsx', color: '#a855f7', radius: 6 },
    { id: 'SC:useForceGraph', label: 'useForceGraph()', parentFile: 'spatial_canvas.tsx', color: '#a855f7', radius: 6 },
    { id: 'SC:activeTheme', label: 'activeTheme', parentFile: 'spatial_canvas.tsx', color: '#818cf8', radius: 5 },

    // from d3_force_worker.js
    { id: 'Physics:d3Force', label: 'd3Force()', parentFile: 'd3_force_worker.js', color: '#a855f7', radius: 6 },
    { id: 'Physics:tickSimulation', label: 'tickSimulation()', parentFile: 'd3_force_worker.js', color: '#a855f7', radius: 6 },
    { id: 'Physics:emitCelestialBirth', label: 'emitCelestialBirth()', parentFile: 'd3_force_worker.js', color: '#a855f7', radius: 5.5 },

    // from ast_scanner.py
    { id: 'AST:extract_symbols', label: 'extract_symbols()', parentFile: 'ast_scanner.py', color: '#a855f7', radius: 6 },
    { id: 'AST:TreeSitterScanner', label: 'TreeSitterScanner', parentFile: 'ast_scanner.py', color: '#a855f7', radius: 5.5 },
    { id: 'AST:LouvainCommunities', label: 'LouvainCommunities', parentFile: 'ast_scanner.py', color: '#a855f7', radius: 5.5 },

    // from server.py
    { id: 'Server:parse_ast', label: 'parse_ast()', parentFile: 'server.py', color: '#a855f7', radius: 6 },
    { id: 'Server:fastapi_app', label: 'fastapi_app', parentFile: 'server.py', color: '#a855f7', radius: 6 },
    { id: 'Server:ws_broadcast', label: 'ws_broadcast()', parentFile: 'server.py', color: '#818cf8', radius: 5.5 },

    // from orchestrator.py
    { id: 'Agent:dispatch_tool', label: 'dispatch_tool()', parentFile: 'orchestrator.py', color: '#a855f7', radius: 5.5 },
    { id: 'Agent:stream_tokens', label: 'stream_tokens()', parentFile: 'orchestrator.py', color: '#a855f7', radius: 5.5 },

    // from key_manager.ts
    { id: 'BYOK:resolveProvider', label: 'resolveProvider()', parentFile: 'key_manager.ts', color: '#a855f7', radius: 5.5 },
    { id: 'BYOK:validateApiKey', label: 'validateApiKey()', parentFile: 'key_manager.ts', color: '#818cf8', radius: 5 }
  ],

  // Tier 5: Sub-Symbols branching from Tier 4 symbols
  subSymbols: [
    // from SpatialViewport
    { id: 'VP:cameraTransform', label: 'cameraTransform()', parentSymbol: 'SC:SpatialViewport', color: '#06b6d4', radius: 3.8 },
    { id: 'VP:screenToWorld', label: 'screenToWorld()', parentSymbol: 'SC:SpatialViewport', color: '#06b6d4', radius: 3.8 },
    { id: 'VP:worldToScreen', label: 'worldToScreen()', parentSymbol: 'SC:SpatialViewport', color: '#06b6d4', radius: 3.8 },

    // from useForceGraph
    { id: 'FG:coulombRepulsion', label: 'coulombRepulsion()', parentSymbol: 'SC:useForceGraph', color: '#34d399', radius: 3.8 },
    { id: 'FG:requestAnimation', label: 'requestAnimation()', parentSymbol: 'SC:useForceGraph', color: '#34d399', radius: 3.8 },

    // from d3Force
    { id: 'DF:chargeDistance', label: 'chargeDistance()', parentSymbol: 'Physics:d3Force', color: '#f43f5e', radius: 3.8 },
    { id: 'DF:linkDistance', label: 'linkDistance()', parentSymbol: 'Physics:d3Force', color: '#f43f5e', radius: 3.8 },

    // from tickSimulation
    { id: 'TS:applyVelocity', label: 'applyVelocity()', parentSymbol: 'Physics:tickSimulation', color: '#06b6d4', radius: 3.8 },
    { id: 'TS:dampenInertia', label: 'dampenInertia()', parentSymbol: 'Physics:tickSimulation', color: '#06b6d4', radius: 3.8 },
    { id: 'TS:boundaryCollisions', label: 'boundaryCollisions()', parentSymbol: 'Physics:tickSimulation', color: '#06b6d4', radius: 3.8 },

    // from TreeSitterScanner
    { id: 'TSS:parseSyntaxNodes', label: 'parseSyntaxNodes()', parentSymbol: 'AST:TreeSitterScanner', color: '#f43f5e', radius: 3.8 },
    { id: 'TSS:buildImportGraph', label: 'buildImportGraph()', parentSymbol: 'AST:TreeSitterScanner', color: '#f43f5e', radius: 3.8 }
  ]
};

// Assemble complete multi-tier node and edge pools
function buildInitialTopology() {
  const nodes = [];
  const edges = [];

  // 1. Folders (Big Yellow Balls #facc15)
  RAW_GRAPH_DATA.folders.forEach(f => {
    nodes.push({
      id: f.id,
      label: f.label,
      type: 'folder',
      x: f.x,
      y: f.y,
      baseRadius: f.radius,
      radius: f.radius,
      color: '#facc15', // Bright Yellow
      folderId: f.parent,
      spawnProgress: 1, // Folders anchor early
      isSpawned: true,
      vx: 0,
      vy: 0,
      isPinned: false
    });

    if (f.parent) {
      edges.push({
        id: `e-folder-${f.parent}-${f.id}`,
        source: f.parent,
        target: f.id,
        type: 'folder-conduit'
      });
    }
  });

  // 2. Files (Blue #3b82f6 & Orange #f97316)
  RAW_GRAPH_DATA.files.forEach((f, idx) => {
    const parent = RAW_GRAPH_DATA.folders.find(fold => fold.id === f.folder);
    const angle = (idx * 0.9) % (Math.PI * 2);
    const dist = 48 + (idx % 3) * 15;

    nodes.push({
      id: f.id,
      label: f.label,
      type: 'file',
      x: (parent?.x || 550) + Math.cos(angle) * dist,
      y: (parent?.y || 280) + Math.sin(angle) * dist,
      baseRadius: f.radius,
      radius: f.radius,
      color: f.color,
      folderId: f.folder,
      spawnProgress: 0,
      isSpawned: false,
      vx: 0,
      vy: 0,
      isPinned: false
    });

    edges.push({
      id: `e-file-${f.folder}-${f.id}`,
      source: f.folder,
      target: f.id,
      type: 'file-conduit'
    });
  });

  // 3. Tier 4: Functions & Symbols (Purple #a855f7 & Indigo #818cf8)
  RAW_GRAPH_DATA.symbols.forEach((s, idx) => {
    const parentFile = nodes.find(n => n.id === s.parentFile);
    const angle = (idx * 1.35) % (Math.PI * 2);
    const dist = 32 + (idx % 2) * 10;

    nodes.push({
      id: s.id,
      label: s.label,
      type: 'symbol',
      x: (parentFile?.x || 550) + Math.cos(angle) * dist,
      y: (parentFile?.y || 280) + Math.sin(angle) * dist,
      baseRadius: s.radius,
      radius: s.radius,
      color: s.color,
      folderId: s.parentFile,
      spawnProgress: 0,
      isSpawned: false,
      vx: 0,
      vy: 0,
      isPinned: false
    });

    edges.push({
      id: `e-sym-${s.parentFile}-${s.id}`,
      source: s.parentFile,
      target: s.id,
      type: 'symbol-conduit'
    });
  });

  // 4. Tier 5: Sub-Symbols & Inner Calls (Cyan #06b6d4, Emerald #34d399, Rose #f43f5e)
  RAW_GRAPH_DATA.subSymbols.forEach((sub, idx) => {
    const parentSymbol = nodes.find(n => n.id === sub.parentSymbol);
    const angle = (idx * 1.7) % (Math.PI * 2);
    const dist = 22 + (idx % 2) * 8;

    nodes.push({
      id: sub.id,
      label: sub.label,
      type: 'subsymbol',
      x: (parentSymbol?.x || 550) + Math.cos(angle) * dist,
      y: (parentSymbol?.y || 280) + Math.sin(angle) * dist,
      baseRadius: sub.radius,
      radius: sub.radius,
      color: sub.color,
      folderId: sub.parentSymbol,
      spawnProgress: 0,
      isSpawned: false,
      vx: 0,
      vy: 0,
      isPinned: false
    });

    edges.push({
      id: `e-sub-${sub.parentSymbol}-${sub.id}`,
      source: sub.parentSymbol,
      target: sub.id,
      type: 'subsymbol-conduit'
    });
  });

  return { nodes, edges };
}

export default function NeuronHeroEngine() {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const animFrameRef = useRef(null);

  // Viewport Zoom & Pan (Optimized for full constellation visibility)
  const [zoom, setZoom] = useState(0.78);
  const [pan, setPan] = useState({ x: 30, y: 20 });
  const zoomRef = useRef(0.78);
  const panRef = useRef({ x: 30, y: 20 });

  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { panRef.current = pan; }, [pan]);

  const [selectedNode, setSelectedNode] = useState(null);
  const selectedNodeRef = useRef(null);
  useEffect(() => { selectedNodeRef.current = selectedNode; }, [selectedNode]);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const showLabelsRef = useRef(true);
  useEffect(() => { showLabelsRef.current = showLabels; }, [showLabels]);

  const [expandedFolders, setExpandedFolders] = useState({
    engine: true,
    parser: true,
    agent: true,
    physics: true
  });

  // Interactive Drag-to-Connect state (from media_1789748557370.png)
  const [connectingNode, setConnectingNode] = useState(null);
  const connectingNodeRef = useRef(null);
  useEffect(() => { connectingNodeRef.current = connectingNode; }, [connectingNode]);

  const mouseRef = useRef({
    screenX: -1000,
    screenY: -1000,
    worldX: -1000,
    worldY: -1000,
    isDown: false,
    isPanning: false,
    panStart: { x: 0, y: 0 },
    draggedNode: null
  });

  // Terminal state
  const [activeTerminalTab, setActiveTerminalTab] = useState('output');
  const [psHistory, setPsHistory] = useState([]);
  const [psInput, setPsInput] = useState('');
  const psContainerRef = useRef(null);

  const scrollToDownload = () => {
    const el = document.getElementById('download-hero');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePsSubmit = (e) => {
    e?.preventDefault();
    const cmd = psInput.trim();
    if (!cmd) return;

    setPsHistory(prev => [
      ...prev,
      { type: 'cmd', text: `PS C:\\Users\\neuron\\Neuron> ${cmd}` },
      { type: 'response' }
    ]);
    setPsInput('');
  };

  useEffect(() => {
    if (activeTerminalTab === 'powershell' && psContainerRef.current) {
      psContainerRef.current.scrollTop = psContainerRef.current.scrollHeight;
    }
  }, [psHistory, activeTerminalTab]);

  const terminalLogs = [
    'Neuron Neural Engine v1.2.4 (x64_windows)',
    '[TreeSitter] AST parsed: 36 nodes, 34 call conduits indexed.',
    '[Louvain] Community modularity Q = 0.88 (5 clusters detected).',
    '[WebGPU] Spatial physics relaxation initialized (60 FPS).'
  ];

  // =========================================================================
  // 🌟 CELESTIAL GROWTH / SPAWN ANIMATION (Direct from usePhysicsEngine.js)
  // Nodes sequentially birth from their parent yellow ball and expand outwards!
  // =========================================================================
  const startCelestialGrowthAnimation = useCallback(() => {
    const { nodes, edges } = buildInitialTopology();
    nodesRef.current = nodes;
    edgesRef.current = edges;

    // 1. Folders are born immediately
    nodes.filter(n => n.type === 'folder').forEach(f => {
      f.isSpawned = true;
      f.spawnProgress = 1;
      f.radius = f.baseRadius;
    });

    // 2. Files birth sequentially from their parent yellow folder ball
    const unspawnedFiles = nodes.filter(n => n.type === 'file');
    unspawnedFiles.forEach((file, idx) => {
      const parent = nodes.find(p => p.id === file.folderId);
      if (parent) {
        file.x = parent.x;
        file.y = parent.y;
      }
      file.isSpawned = false;
      file.spawnProgress = 0;
      file.radius = 0;

      setTimeout(() => {
        if (!parent) return;
        const angle = Math.random() * Math.PI * 2;
        const speed = 4.0 + Math.random() * 2.2;

        file.isSpawned = true;
        file.x = parent.x + Math.cos(angle) * 12;
        file.y = parent.y + Math.sin(angle) * 12;
        file.vx = Math.cos(angle) * speed;
        file.vy = Math.sin(angle) * speed;
      }, 50 + idx * 30);
    });

    // 3. Symbols birth sequentially from their parent file
    const unspawnedSymbols = nodes.filter(n => n.type === 'symbol');
    unspawnedSymbols.forEach((sym, idx) => {
      const parentFile = nodes.find(p => p.id === sym.folderId);
      if (parentFile) {
        sym.x = parentFile.x;
        sym.y = parentFile.y;
      }
      sym.isSpawned = false;
      sym.spawnProgress = 0;
      sym.radius = 0;

      setTimeout(() => {
        if (!parentFile) return;
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 1.5;

        sym.isSpawned = true;
        sym.x = parentFile.x + Math.cos(angle) * 8;
        sym.y = parentFile.y + Math.sin(angle) * 8;
        sym.vx = Math.cos(angle) * speed;
        sym.vy = Math.sin(angle) * speed;
      }, 200 + idx * 25);
    });

    // 4. SubSymbols birth sequentially from their parent symbol moon
    const unspawnedSub = nodes.filter(n => n.type === 'subsymbol');
    unspawnedSub.forEach((sub, idx) => {
      const parentSym = nodes.find(p => p.id === sub.folderId);
      if (parentSym) {
        sub.x = parentSym.x;
        sub.y = parentSym.y;
      }
      sub.isSpawned = false;
      sub.spawnProgress = 0;
      sub.radius = 0;

      setTimeout(() => {
        if (!parentSym) return;
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 1.2;

        sub.isSpawned = true;
        sub.x = parentSym.x + Math.cos(angle) * 5;
        sub.y = parentSym.y + Math.sin(angle) * 5;
        sub.vx = Math.cos(angle) * speed;
        sub.vy = Math.sin(angle) * speed;
      }, 380 + idx * 18);
    });

    // Default select App.jsx
    setTimeout(() => {
      const app = nodesRef.current.find(n => n.id === 'App.jsx');
      if (app) setSelectedNode(app);
    }, 1200);
  }, []);

  useEffect(() => {
    startCelestialGrowthAnimation();
  }, [startCelestialGrowthAnimation]);

  // Click file in explorer: Center and highlight on spatial canvas (NO CODE TAB)
  const handleSelectFile = (fileName) => {
    const matching = nodesRef.current.find(n => n.id === fileName || n.label === fileName);
    if (matching) {
      setSelectedNode(matching);
      if (canvasRef.current) {
        const w = canvasRef.current.offsetWidth || 800;
        const h = canvasRef.current.offsetHeight || 500;
        setPan({
          x: w / 2 - matching.x * zoomRef.current,
          y: h / 2 - matching.y * zoomRef.current
        });
      }
    }
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  // =========================================================================
  // 60 FPS MAIN RENDER & RELAXATION SIMULATION
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const loop = () => {
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const curSelected = selectedNodeRef.current;
      const curShowLabels = showLabelsRef.current;
      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;
      const activeConnecting = connectingNodeRef.current;

      // 1. Animate Celestial Growth Progress
      nodes.forEach(n => {
        if (n.isSpawned && n.spawnProgress < 1) {
          n.spawnProgress = Math.min(1, n.spawnProgress + 0.05);
          n.radius = n.baseRadius * n.spawnProgress;
        }
      });

      // 2. Physics Relaxation: Hooke Springs + Coulomb Repulsion
      const DAMPING = 0.88;
      const SPRING_K = 0.0035;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a.isSpawned) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b.isSpawned) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          let extraDist;
          if (a.type === 'folder' || b.type === 'folder') extraDist = 48;
          else if (a.type === 'file' || b.type === 'file') extraDist = 24;
          else if (a.type === 'symbol' || b.type === 'symbol') extraDist = 13;
          else extraDist = 8;

          const minDist = (a.radius + b.radius) + extraDist;

          if (dist < minDist) {
            const force = (minDist - dist) * 0.04;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            if (!a.isPinned) { a.vx -= fx; a.vy -= fy; }
            if (!b.isPinned) { b.vx += fx; b.vy += fy; }
          }
        }
      }

      edges.forEach(e => {
        const src = nodes.find(n => n.id === e.source);
        const tgt = nodes.find(n => n.id === e.target);
        if (!src || !tgt || !src.isSpawned || !tgt.isSpawned) return;

        const dx = tgt.x - src.x;
        const dy = tgt.y - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        let restLen = 65;
        if (src.type === 'folder' && tgt.type === 'folder') restLen = 140;
        else if (src.type === 'folder' || tgt.type === 'folder') restLen = 65;
        else if (src.type === 'symbol' || tgt.type === 'symbol') restLen = 36;
        else if (src.type === 'subsymbol' || tgt.type === 'subsymbol') restLen = 22;

        const delta = dist - restLen;
        const force = delta * SPRING_K;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (!src.isPinned) { src.vx += fx; src.vy += fy; }
        if (!tgt.isPinned) { tgt.vx -= fx; tgt.vy -= fy; }
      });

      // Calming center gravity toward (550, 300)
      nodes.forEach(n => {
        if (!n.isPinned && n.isSpawned) {
          n.vx += (550 - n.x) * 0.00012;
          n.vy += (300 - n.y) * 0.00012;
          n.vx *= DAMPING;
          n.vy *= DAMPING;
          n.x += n.vx;
          n.y += n.vy;
        }
      });

      // 3. Clear Screen
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(currentPan.x, currentPan.y);
      ctx.scale(currentZoom, currentZoom);

      // A. Atmospheric Nebula Clouds
      const gradPurple = ctx.createRadialGradient(550, 300, 60, 550, 300, 480);
      gradPurple.addColorStop(0, 'rgba(147, 51, 234, 0.07)');
      gradPurple.addColorStop(0.6, 'rgba(59, 130, 246, 0.04)');
      gradPurple.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradPurple;
      ctx.beginPath();
      ctx.arc(550, 300, 480, 0, Math.PI * 2);
      ctx.fill();

      // Compute 1-hop connected subgraph when a node is clicked/selected
      const connectedNodeIds = new Set();
      if (curSelected) {
        connectedNodeIds.add(curSelected.id);
        edges.forEach(e => {
          if (e.source === curSelected.id) connectedNodeIds.add(e.target);
          if (e.target === curSelected.id) connectedNodeIds.add(e.source);
        });
      }

      // B. Thin Connecting Conduits with Focus Isolation
      edges.forEach(e => {
        const src = nodes.find(n => n.id === e.source);
        const tgt = nodes.find(n => n.id === e.target);
        if (!src || !tgt || !src.isSpawned || !tgt.isSpawned) return;

        const isConnectedToSelected = curSelected && (curSelected.id === src.id || curSelected.id === tgt.id);

        ctx.save();
        if (curSelected) {
          if (isConnectedToSelected) {
            // Electric Sky Blue Connected Conduit
            ctx.globalAlpha = 1.0;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.moveTo(src.x, src.y);
            ctx.lineTo(tgt.x, tgt.y);
            ctx.stroke();
          } else {
            // Unrelated edges blurred and deeply dimmed into background
            ctx.globalAlpha = 0.04;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(src.x, src.y);
            ctx.lineTo(tgt.x, tgt.y);
            ctx.stroke();
          }
        } else {
          // Normal state: clean thin conduits
          const alpha = Math.min(src.spawnProgress, tgt.spawnProgress);
          ctx.globalAlpha = alpha * 0.45;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(src.x, src.y);
          ctx.lineTo(tgt.x, tgt.y);
          ctx.stroke();
        }
        ctx.restore();
      });

      // C. Interactive Drag-to-Connect Live Line
      if (activeConnecting) {
        ctx.save();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(activeConnecting.x, activeConnecting.y);
        ctx.lineTo(mouseRef.current.worldX, mouseRef.current.worldY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseRef.current.worldX, mouseRef.current.worldY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.restore();
      }

      // D. Render Nodes (Folders, Files, Symbols, Sub-symbols)
      nodes.forEach(node => {
        if (!node.isSpawned || node.radius <= 0) return;

        const isSelected = curSelected?.id === node.id;
        const isNeighbor = curSelected && connectedNodeIds.has(node.id);
        const isHovered = hoveredNode?.id === node.id;
        const isFolder = node.type === 'folder';

        ctx.save();

        // 1. Focus Isolation Alpha: Unrelated nodes are dimmed/blurred to 0.07 alpha!
        if (curSelected) {
          if (isSelected || isNeighbor) {
            ctx.globalAlpha = 1.0;
          } else {
            ctx.globalAlpha = 0.07;
          }
        } else {
          ctx.globalAlpha = Math.max(0.2, node.spawnProgress);
        }

        // Exactly ONE single circle per node - zero double/triple glow, zero white circles!
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? node.radius + 2 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#38bdf8' : node.color;
        ctx.fill();

        // 5. Clean labels
        // When focused: ONLY display labels for the selected node and its direct neighbors!
        // When normal: display labels for folders, files, and hovered symbols.
        const shouldShowLabel = curSelected
          ? (isSelected || isNeighbor)
          : (curShowLabels && (isFolder || node.type === 'file' || isHovered));

        if (shouldShowLabel) {
          ctx.font = isFolder ? 'bold 11px monospace' : (node.type === 'subsymbol' ? '8px monospace' : '9px monospace');
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillStyle = isSelected 
            ? '#38bdf8' 
            : (isNeighbor ? '#ffffff' : (isFolder ? '#ffffff' : 'rgba(226, 232, 240, 0.85)'));
          ctx.fillText(node.label, node.x, node.y + node.radius + 4);
        }

        ctx.restore();
      });

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hoveredNode]);

  // Viewport Controls
  const handleZoomIn = () => setZoom(prev => Math.min(2.4, +(prev * 1.2).toFixed(2)));
  const handleZoomOut = () => setZoom(prev => Math.max(0.4, +(prev / 1.2).toFixed(2)));
  const handleResetZoom = () => {
    setZoom(0.78);
    setPan({ x: 30, y: 20 });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(2.4, Math.max(0.35, +(zoomRef.current * zoomFactor).toFixed(2)));

    const newPanX = mouseX - (mouseX - panRef.current.x) * (newZoom / zoomRef.current);
    const newPanY = mouseY - (mouseY - panRef.current.y) * (newZoom / zoomRef.current);

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  const handlePointerDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    const worldX = (screenX - panRef.current.x) / zoomRef.current;
    const worldY = (screenY - panRef.current.y) / zoomRef.current;

    mouseRef.current.worldX = worldX;
    mouseRef.current.worldY = worldY;

    const clicked = nodesRef.current.find(n => n.isSpawned && Math.hypot(n.x - worldX, n.y - worldY) <= Math.max(n.radius + 6, 12));

    if (clicked) {
      if (e.shiftKey) {
        // Shift + Click initiates connection dragging
        setConnectingNode(clicked);
      } else {
        mouseRef.current.draggedNode = clicked;
        clicked.isPinned = true;
        setSelectedNode(clicked);
      }
    } else {
      mouseRef.current.isPanning = true;
      mouseRef.current.panStart = { x: screenX - panRef.current.x, y: screenY - panRef.current.y };
      setSelectedNode(null);
    }

    mouseRef.current.isDown = true;
  };

  const handlePointerMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    const worldX = (screenX - panRef.current.x) / zoomRef.current;
    const worldY = (screenY - panRef.current.y) / zoomRef.current;

    mouseRef.current.screenX = screenX;
    mouseRef.current.screenY = screenY;
    mouseRef.current.worldX = worldX;
    mouseRef.current.worldY = worldY;

    if (mouseRef.current.isPanning) {
      setPan({
        x: screenX - mouseRef.current.panStart.x,
        y: screenY - mouseRef.current.panStart.y
      });
      return;
    }

    if (mouseRef.current.draggedNode) {
      mouseRef.current.draggedNode.x = worldX;
      mouseRef.current.draggedNode.y = worldY;
      return;
    }

    const hovered = nodesRef.current.find(n => n.isSpawned && Math.hypot(n.x - worldX, n.y - worldY) <= Math.max(n.radius + 6, 12));
    setHoveredNode(hovered || null);
  };

  const handlePointerUp = () => {
    if (connectingNodeRef.current) {
      const target = hoveredNode;
      if (target && target.id !== connectingNodeRef.current.id) {
        // Establish permanent spring link
        edgesRef.current.push({
          id: `e-interactive-${connectingNodeRef.current.id}-${target.id}`,
          source: connectingNodeRef.current.id,
          target: target.id,
          type: 'interactive'
        });
      }
      setConnectingNode(null);
    }

    if (mouseRef.current.draggedNode) {
      mouseRef.current.draggedNode.isPinned = false;
    }
    mouseRef.current.draggedNode = null;
    mouseRef.current.isPanning = false;
    mouseRef.current.isDown = false;
  };

  return (
    <div 
      className="w-full rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] select-none font-mono flex flex-col h-[540px] md:h-[560px] border border-white/[0.08] transition-colors duration-700 relative backdrop-blur-xl text-left bg-[#08090c]"
    >
      {/* 1. TOP WINDOW BAR: Clean "Neuron IDE" + Logo */}
      <div className="h-9 border-b border-white/[0.08] px-4 flex items-center justify-between z-20 text-xs select-none bg-[#11131a] text-left">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-xs tracking-wide font-sans">
            Neuron IDE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Neuron" 
            className="w-4 h-4 object-contain opacity-90 hover:opacity-100 transition-opacity" 
          />
        </div>
      </div>

      {/* 2. MAIN WORKBENCH: Activity Bar + Full Matching Explorer + Central Canvas */}
      <div className="flex-1 flex flex-row overflow-hidden relative text-left bg-[#08090c]">
        {/* Left Activity Bar */}
        <div className="w-11 border-r border-white/[0.08] flex flex-col items-center justify-between py-3 shrink-0 z-30 bg-[#0d0e13]">
          <div className="flex flex-col items-center gap-3.5 text-slate-400">
            <button className="p-1.5 rounded text-white bg-white/[0.08]" title="Explorer">
              <Files size={16} />
            </button>
            <button className="p-1.5 rounded text-slate-500 hover:text-white" title="Source Control">
              <GitBranch size={16} />
            </button>
            <button className="p-1.5 rounded text-slate-500 hover:text-[#60A5FA]" title="AI Agent">
              <Sparkles size={16} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 text-slate-500">
            <button className="p-1.5 rounded hover:text-white" title="Settings">
              <Settings size={15} />
            </button>
          </div>
        </div>

        {/* Explorer Sidebar: 100% Matching Graph Toplogy from Image 2 */}
        <div className="w-52 border-r border-white/[0.08] flex flex-col shrink-0 hidden sm:flex text-left bg-[#0d0e13]">
          <div className="px-3 py-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold border-b border-white/[0.04] uppercase tracking-wider">
            <span>Explorer</span>
          </div>

          <div className="p-2 text-xs text-slate-400 space-y-1 overflow-y-auto font-mono text-[11px]">
            {/* Root: neuron */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 px-1 py-0.5 text-slate-200 font-bold text-[11px]">
                <ChevronDown size={12} />
                <Folder size={12} className="text-[#facc15]" />
                <span>neuron</span>
              </div>

              {/* Root Files */}
              <div className="pl-4 space-y-0.5">
                {['Cargo.toml', 'pyproject.toml', 'README.md', 'server.py', 'daemon.rs'].map(name => (
                  <div
                    key={name}
                    onClick={() => handleSelectFile(name)}
                    className={`px-2 py-0.5 rounded cursor-pointer truncate transition-colors flex items-center gap-1.5 ${
                      selectedNode?.id === name ? 'bg-white/[0.1] text-[#38bdf8]' : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode2 size={11} className="text-[#3b82f6] shrink-0" />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>

              {/* Folder: engine */}
              <div className="pl-2 pt-1 space-y-0.5">
                <div 
                  onClick={() => toggleFolder('engine')}
                  className="flex items-center gap-1.5 px-1 py-0.5 text-slate-300 font-medium cursor-pointer hover:text-white"
                >
                  {expandedFolders['engine'] ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={12} className="text-[#facc15]" />
                  <span>engine</span>
                </div>

                {expandedFolders['engine'] && (
                  <div className="pl-4 space-y-0.5">
                    {[
                      { name: 'spatial_canvas.tsx', color: '#f97316' },
                      { name: 'conduit_router.ts', color: '#3b82f6' },
                      { name: 'viewport_camera.ts', color: '#3b82f6' },
                      { name: 'event_bus.ts', color: '#3b82f6' }
                    ].map(f => (
                      <div
                        key={f.name}
                        onClick={() => handleSelectFile(f.name)}
                        className={`px-2 py-0.5 rounded cursor-pointer truncate transition-colors flex items-center gap-1.5 ${
                          selectedNode?.id === f.name ? 'bg-white/[0.1] text-[#38bdf8]' : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <FileCode2 size={11} className="shrink-0" style={{ color: f.color }} />
                        <span className="truncate">{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Folder: parser */}
              <div className="pl-2 pt-1 space-y-0.5">
                <div 
                  onClick={() => toggleFolder('parser')}
                  className="flex items-center gap-1.5 px-1 py-0.5 text-slate-300 font-medium cursor-pointer hover:text-white"
                >
                  {expandedFolders['parser'] ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={12} className="text-[#facc15]" />
                  <span>parser</span>
                </div>

                {expandedFolders['parser'] && (
                  <div className="pl-4 space-y-0.5">
                    {[
                      { name: 'ast_scanner.py', color: '#f97316' },
                      { name: 'tree_sitter_bridge.rs', color: '#3b82f6' },
                      { name: 'louvain_modularity.py', color: '#f97316' },
                      { name: 'symbol_table.rs', color: '#3b82f6' }
                    ].map(f => (
                      <div
                        key={f.name}
                        onClick={() => handleSelectFile(f.name)}
                        className={`px-2 py-0.5 rounded cursor-pointer truncate transition-colors flex items-center gap-1.5 ${
                          selectedNode?.id === f.name ? 'bg-white/[0.1] text-[#38bdf8]' : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <FileCode2 size={11} className="shrink-0" style={{ color: f.color }} />
                        <span className="truncate">{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Folder: agent */}
              <div className="pl-2 pt-1 space-y-0.5">
                <div 
                  onClick={() => toggleFolder('agent')}
                  className="flex items-center gap-1.5 px-1 py-0.5 text-slate-300 font-medium cursor-pointer hover:text-white"
                >
                  {expandedFolders['agent'] ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={12} className="text-[#facc15]" />
                  <span>agent</span>
                </div>

                {expandedFolders['agent'] && (
                  <div className="pl-4 space-y-0.5">
                    {[
                      { name: 'orchestrator.py', color: '#f97316' },
                      { name: 'tool_executor.py', color: '#3b82f6' },
                      { name: 'prompt_composer.ts', color: '#3b82f6' },
                      { name: 'key_manager.ts', color: '#3b82f6' }
                    ].map(f => (
                      <div
                        key={f.name}
                        onClick={() => handleSelectFile(f.name)}
                        className={`px-2 py-0.5 rounded cursor-pointer truncate transition-colors flex items-center gap-1.5 ${
                          selectedNode?.id === f.name ? 'bg-white/[0.1] text-[#38bdf8]' : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <FileCode2 size={11} className="shrink-0" style={{ color: f.color }} />
                        <span className="truncate">{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Folder: physics */}
              <div className="pl-2 pt-1 space-y-0.5">
                <div 
                  onClick={() => toggleFolder('physics')}
                  className="flex items-center gap-1.5 px-1 py-0.5 text-slate-300 font-medium cursor-pointer hover:text-white"
                >
                  {expandedFolders['physics'] ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={12} className="text-[#facc15]" />
                  <span>physics</span>
                </div>

                {expandedFolders['physics'] && (
                  <div className="pl-4 space-y-0.5">
                    {[
                      { name: 'd3_force_worker.js', color: '#3b82f6' },
                      { name: 'coulomb_repulsion.js', color: '#3b82f6' },
                      { name: 'spring_relaxation.js', color: '#3b82f6' }
                    ].map(f => (
                      <div
                        key={f.name}
                        onClick={() => handleSelectFile(f.name)}
                        className={`px-2 py-0.5 rounded cursor-pointer truncate transition-colors flex items-center gap-1.5 ${
                          selectedNode?.id === f.name ? 'bg-white/[0.1] text-[#38bdf8]' : 'hover:bg-white/[0.04] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <FileCode2 size={11} className="shrink-0" style={{ color: f.color }} />
                        <span className="truncate">{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Central Spatial Canvas Viewport */}
        <div className="flex-1 flex flex-col relative overflow-hidden text-left bg-[#08090c]">
          {/* Canvas HUD Header */}
          <div className="h-8 border-b border-white/[0.08] flex items-center justify-between px-3 text-xs bg-[#11131a]">
            <div className="flex items-center gap-2">
              <Network size={13} className="text-[#3b82f6]" />
              <span className="text-white text-[11px] font-medium font-sans">Neuron Spatial Universe</span>
            </div>

            {/* HUD Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer flex items-center gap-1 ${
                  showLabels 
                    ? 'bg-white/[0.08] text-white border-white/[0.15]' 
                    : 'bg-white/[0.02] text-slate-500 border-white/[0.06] hover:text-slate-300'
                }`}
                title="Toggle node label visibility"
              >
                <Type size={11} />
                <span>{showLabels ? 'Labels: ON' : 'Labels: OFF'}</span>
              </button>

              <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded">
                <button
                  onClick={handleZoomIn}
                  className="p-1 hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom in"
                >
                  <ZoomIn size={12} />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="p-1 hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom out"
                >
                  <ZoomOut size={12} />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-1.5 py-0.5 text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer border-l border-white/[0.08]"
                  title="Reset zoom"
                >
                  {Math.round(zoom * 100)}%
                </button>
              </div>

              <button
                onClick={handleResetZoom}
                className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 transition-colors cursor-pointer"
                title="Reset positions"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Canvas Viewport with WebGL/2D Particle Canvas */}
          <div className="flex-1 w-full h-full relative backdrop-blur-md bg-[#08090c]/80">
            <canvas
              ref={canvasRef}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
            />

            {/* Hint overlay at bottom left */}
            <div className="absolute bottom-2 left-3 pointer-events-none text-[10px] font-mono text-slate-500">
              Shift + Drag to draw conduits between nodes
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM PANEL: Terminal / Interactive PowerShell (Left-aligned) */}
      <div className="h-32 sm:h-36 border-t border-white/[0.08] flex flex-col z-20 shrink-0 text-left bg-[#0d0e13]">
        <div className="h-7 border-b border-white/[0.08] px-3 flex items-center justify-between text-[11px] bg-[#11131a] text-left">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTerminalTab('output')}
              className={`h-7 px-2.5 border-b flex items-center gap-1.5 transition-colors cursor-pointer text-[10px] font-mono uppercase tracking-wider ${
                activeTerminalTab === 'output'
                  ? 'border-b-[#60A5FA] text-white font-medium bg-white/[0.04]'
                  : 'border-b-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <TerminalIcon size={11} />
              <span>OUTPUT</span>
            </button>

            <button
              onClick={() => setActiveTerminalTab('powershell')}
              className={`h-7 px-2.5 border-b flex items-center gap-1.5 transition-colors cursor-pointer text-[10px] font-mono uppercase tracking-wider ${
                activeTerminalTab === 'powershell'
                  ? 'border-b-[#60A5FA] text-white font-medium bg-white/[0.04]'
                  : 'border-b-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <TerminalIcon size={11} className="text-[#60A5FA]" />
              <span>POWERSHELL</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <button 
              onClick={() => {
                if (activeTerminalTab === 'powershell') {
                  setPsHistory([]);
                }
              }}
              className="p-0.5 hover:text-white transition-colors cursor-pointer" 
              title="Clear Terminal"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {activeTerminalTab === 'output' ? (
          <div className="flex-1 p-2.5 overflow-hidden font-mono text-[11px] leading-snug text-slate-300 space-y-1 select-none text-left">
            {terminalLogs.map((log, index) => (
              <div key={index} className="flex items-center gap-2 truncate text-left">
                <span className="text-slate-600 select-none">&gt;</span>
                <span className="text-slate-300 font-mono text-left">{log}</span>
              </div>
            ))}
          </div>
        ) : (
          <div ref={psContainerRef} className="flex-1 p-2.5 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 space-y-1 bg-[#090a0d] text-left">
            {psHistory.map((item, idx) => {
              if (item.type === 'cmd') {
                return (
                  <div key={idx} className="text-slate-400 font-mono text-left w-full truncate">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-400 text-left w-full pl-2 py-0.5 flex items-center gap-1.5 font-mono">
                  <span>To try Neuron IDE,</span>
                  <button
                    onClick={scrollToDownload}
                    className="text-[#60A5FA] underline hover:text-[#93c5fd] font-semibold cursor-pointer"
                  >
                    download Neuron
                  </button>
                </div>
              );
            })}

            <form onSubmit={handlePsSubmit} className="flex items-center gap-1.5 pt-0.5 text-slate-300 w-full text-left font-mono">
              <span className="text-slate-400 select-none shrink-0 font-medium text-left">PS C:\\Users\\neuron\\Neuron&gt;</span>
              <input
                type="text"
                value={psInput}
                onChange={(e) => setPsInput(e.target.value)}
                placeholder="Type command and press Enter..."
                className="flex-1 bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none font-mono text-[11px] text-left"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
