import React, { useEffect, useRef } from 'react';
import { ScrollWriteHeading } from '../ScrollReveal';
import { polygonHull } from '../../utils/polygonHull';
import { useLanguage } from '../../context/LanguageContext';

// ============================================================================
// OFFICIAL NEURON ENGINE CONSTANTS (Matching NeuronHeroEngine & engineConfig.js)
// ============================================================================
const THEME = {
  background: '#121314',
  nodes: {
    folder: '#e4ef61',
    file: '#3b82f6',
    function: '#8b5cf6',
    riskHigh: '#ef4444',
    riskMedium: '#f59e0b'
  },
  labels: {
    folder: '#fde047',
    file: '#cbd5e1',
    function: '#a78bfa'
  },
  edges: {
    hierarchy: '#6d6d6d',
    call: '#9f00ad',
    bridge: '#00f0ff',
    hierarchyGlow: '#60a5fa',
    callGlow: '#c084fc'
  },
  nebula: [
    { fill: '#3b82f6', stroke: '#3b82f6' }, // 0: Core Backend (Blue)
    { fill: '#a855f7', stroke: '#a855f7' }, // 1: Graph ML (Purple)
    { fill: '#22c55e', stroke: '#22c55e' }, // 2: Services & AI (Green)
    { fill: '#ec4899', stroke: '#ec4899' }  // 3: Frontend (Pink)
  ]
};

// Helper to draw a Louvain Convex Hull Nebula
function drawNebula(ctx, nodes, pad, strokeWidth, fillColor, strokeColor, fillAlpha = 0.08, strokeAlpha = 0.22) {
  if (!nodes || nodes.length < 3) return;
  const pts = [];
  nodes.forEach(n => {
    pts.push([n.x - pad, n.y - pad]);
    pts.push([n.x + pad, n.y - pad]);
    pts.push([n.x - pad, n.y + pad]);
    pts.push([n.x + pad, n.y + pad]);
  });

  const hull = polygonHull(pts);
  if (!hull || hull.length < 3) return;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(hull[0][0], hull[0][1]);
  for (let i = 1; i < hull.length; i++) {
    ctx.lineTo(hull[i][0], hull[i][1]);
  }
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.globalAlpha = fillAlpha;
  ctx.fill();

  ctx.strokeStyle = strokeColor;
  ctx.globalAlpha = strokeAlpha;
  ctx.lineWidth = strokeWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
}

// Helper to draw an authentic Neuron node with crisp monospace label below
function drawNeuronNode(ctx, node, options = {}) {
  const {
    alpha = 1.0,
    isHighlighted = false,
    fillOverride = null,
    pulsePhase = 0,
    showRiskPulse = false,
    showLabel = true,
    zoom = 1.0
  } = options;

  if (node.radius <= 0.2) return;

  ctx.save();
  ctx.globalAlpha = alpha;

  const fill = fillOverride || node.color;

  // Highlight / Focus Aura
  if (isHighlighted) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1.8 / zoom;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius + 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(96, 165, 250, 0.14)';
    ctx.fill();
  }

  // High-Risk Pulsing Ring
  if (showRiskPulse) {
    const pulse = (Math.sin(pulsePhase) + 1) * 0.5;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius + 3 + pulse * 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
    ctx.lineWidth = 1.6 / zoom;
    ctx.stroke();
  }

  // Core Node Disc
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();

  // Monospace Label Below Node
  if (showLabel && node.label) {
    const isFolder = node.nodeType === 'folder';
    const isFile = node.nodeType === 'file';
    const fontSize = isFolder ? 12 : (isFile ? 10.5 : 9);
    const fontWeight = isFolder ? '600' : (isFile ? '500' : '400');

    ctx.font = `${fontWeight} ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const labelY = node.y + node.radius + 5;

    if (isHighlighted) {
      const metrics = ctx.measureText(node.label);
      const padX = 5;
      const padY = 2;
      ctx.fillStyle = 'rgba(10, 12, 16, 0.92)';
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.45)';
      ctx.lineWidth = 1 / zoom;
      ctx.beginPath();
      ctx.roundRect(
        node.x - metrics.width / 2 - padX,
        labelY - padY,
        metrics.width + padX * 2,
        fontSize + padY * 2 + 2,
        3
      );
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = isHighlighted
      ? '#ffffff'
      : (isFolder ? THEME.labels.folder : (isFile ? THEME.labels.file : THEME.labels.function));

    ctx.fillText(node.label, node.x, labelY);
  }

  ctx.restore();
}

// Helper to mix two hex colors
function lerpColor(hex1, hex2, t) {
  const c1 = parseInt(hex1.slice(1), 16);
  const c2 = parseInt(hex2.slice(1), 16);
  const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
  const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

// ============================================================================
// 1. CRITICAL HOTSPOT DETECTION (Pure Spatial Map View)
// ============================================================================
function HotspotDetectionBox() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const { t } = useLanguage();

  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const hoveredNodeRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const rawNodes = [
      // Folder Hubs
      { id: 'backend/core', label: 'core', nodeType: 'folder', radius: 18, color: THEME.nodes.folder, relX: -45, relY: 10 },
      { id: 'backend/api', label: 'api', nodeType: 'folder', radius: 16, color: THEME.nodes.folder, relX: -185, relY: -65 },
      { id: 'backend/ml', label: 'ml', nodeType: 'folder', radius: 16, color: THEME.nodes.folder, relX: 165, relY: -55 },

      // File Planets
      { id: 'parser.py', label: 'parser.py', nodeType: 'file', radius: 12, color: THEME.nodes.file, isHotspot: true, relX: 35, relY: -15 },
      { id: 'mutator.py', label: 'mutator.py', nodeType: 'file', radius: 10, color: THEME.nodes.riskMedium, isSecondaryHotspot: true, relX: -30, relY: -95 },
      { id: 'state.py', label: 'state.py', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, relX: -120, relY: 75 },
      { id: 'js_mutator.py', label: 'js_mutator.py', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, relX: 15, relY: 105 },
      { id: 'websocket_router.py', label: 'websocket_router.py', nodeType: 'file', radius: 10, color: THEME.nodes.file, relX: -155, relY: 10 },
      { id: 'analyzer.py', label: 'analyzer.py', nodeType: 'file', radius: 10.5, color: THEME.nodes.file, relX: 155, relY: 35 },

      // Orbiting Function Moons around parser.py & mutator.py
      { id: 'parse_ast', label: 'def parse_ast()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, relX: 95, relY: -68 },
      { id: 'extract_symbols', label: 'def extract_symbols()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, relX: 108, relY: -8 },
      { id: 'build_call_graph', label: 'def build_call_graph()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, relX: 82, relY: 52 },
      { id: 'apply_refactor', label: 'def apply_refactor()', nodeType: 'function', radius: 5, color: THEME.nodes.function, relX: -75, relY: -145 },
      { id: 'analyze_graph_ml', label: 'def analyze_graph_ml()', nodeType: 'function', radius: 5, color: THEME.nodes.function, relX: 225, relY: 5 }
    ];

    const rawEdges = [
      // Hierarchy
      { source: 'backend/core', target: 'parser.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'mutator.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'state.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'js_mutator.py', type: 'hierarchy' },
      { source: 'backend/api', target: 'websocket_router.py', type: 'hierarchy' },
      { source: 'backend/ml', target: 'analyzer.py', type: 'hierarchy' },
      { source: 'parser.py', target: 'parse_ast', type: 'hierarchy' },
      { source: 'parser.py', target: 'extract_symbols', type: 'hierarchy' },
      { source: 'parser.py', target: 'build_call_graph', type: 'hierarchy' },
      { source: 'mutator.py', target: 'apply_refactor', type: 'hierarchy' },
      { source: 'analyzer.py', target: 'analyze_graph_ml', type: 'hierarchy' },

      // Call conduits converging on parser.py (Hotspot)
      { source: 'websocket_router.py', target: 'parser.py', type: 'call', feedsHotspot: true },
      { source: 'mutator.py', target: 'parser.py', type: 'call', feedsHotspot: true },
      { source: 'analyzer.py', target: 'parser.py', type: 'call', feedsHotspot: true },
      { source: 'js_mutator.py', target: 'parser.py', type: 'call', feedsHotspot: true },
      { source: 'state.py', target: 'mutator.py', type: 'call' }
    ];

    nodesRef.current = rawNodes.map((n, idx) => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      seedX: idx * 19 + 7,
      seedY: idx * 29 + 13
    }));
    edgesRef.current = rawEdges;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let initializedPositions = false;

    const render = (now) => {
      const width = canvas.clientWidth || 640;
      const height = canvas.clientHeight || 440;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = THEME.background;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      if (!initializedPositions && width > 0) {
        nodes.forEach(n => {
          n.x = cx + n.relX;
          n.y = cy + n.relY;
        });
        initializedPositions = true;
      }

      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // Physics spring relaxation + subtle organic drift
      nodes.forEach(node => {
        if (draggedNodeRef.current?.id === node.id) return;
        const targetX = cx + node.relX + Math.sin(now * 0.0011 + node.seedX) * 4.5;
        const targetY = cy + node.relY + Math.cos(now * 0.0009 + node.seedY) * 4.5;
        node.vx += (targetX - node.x) * 0.045;
        node.vy += (targetY - node.y) * 0.045;
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Hotspot Animation Cycle (6.0s smooth loop)
      const cycle = (now % 6000) / 6000;
      // Smooth ramp up to red hotspot, hold, then cool down
      let heat = 0;
      if (cycle < 0.15) {
        heat = 0;
      } else if (cycle < 0.45) {
        const u = (cycle - 0.15) / 0.30;
        heat = u * u * (3 - 2 * u);
      } else if (cycle < 0.80) {
        heat = 1.0;
      } else {
        const u = (cycle - 0.80) / 0.20;
        heat = 1.0 - u * u * (3 - 2 * u);
      }

      // 1. Draw Louvain Community Nebulae
      const coreCluster = nodes.filter(n => ['backend/core', 'parser.py', 'mutator.py', 'state.py', 'js_mutator.py', 'parse_ast', 'extract_symbols', 'build_call_graph'].includes(n.id));
      const nebulaColor = heat > 0.35 ? lerpColor('#3b82f6', '#ef4444', (heat - 0.35) / 0.65) : '#3b82f6';
      drawNebula(ctx, coreCluster, 65, 68, nebulaColor, nebulaColor, 0.07 + heat * 0.04, 0.20 + heat * 0.08);

      // 2. Draw Edges & Incoming Load Pulses
      edges.forEach(edge => {
        const s = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!s || !tgt) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tgt.x, tgt.y);

        if (edge.feedsHotspot) {
          ctx.strokeStyle = heat > 0.2 ? lerpColor('#9f00ad', '#ef4444', heat) : THEME.edges.call;
          ctx.lineWidth = 1.5 + heat * 1.1;
          ctx.globalAlpha = 0.5 + heat * 0.4;
          ctx.stroke();

          // Traveling complexity load pulses into parser.py
          const pulseT = ((now * 0.00065) + (s.seedX * 0.1)) % 1.0;
          const px = s.x + (tgt.x - s.x) * pulseT;
          const py = s.y + (tgt.y - s.y) * pulseT;

          ctx.beginPath();
          ctx.arc(px, py, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = heat > 0.4 ? '#fca5a5' : '#e879f9';
          ctx.globalAlpha = 0.85;
          ctx.fill();
        } else {
          ctx.strokeStyle = edge.type === 'call' ? THEME.edges.call : THEME.edges.hierarchy;
          ctx.lineWidth = edge.type === 'call' ? 1.4 : 1.1;
          ctx.globalAlpha = edge.type === 'call' ? 0.5 : 0.42;
          ctx.stroke();
        }
        ctx.restore();
      });

      // 3. Draw Hotspot Sonar Rings around parser.py when heated
      const hotspotNode = nodeMap.get('parser.py');
      if (hotspotNode && heat > 0.25) {
        for (let rIdx = 0; rIdx < 2; rIdx++) {
          const ringProgress = ((now * 0.0008) + rIdx * 0.5) % 1.0;
          const ringRadius = hotspotNode.radius + 4 + ringProgress * 46;
          const ringAlpha = (1 - ringProgress) * 0.45 * heat;

          ctx.save();
          ctx.beginPath();
          ctx.arc(hotspotNode.x, hotspotNode.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 1.6;
          ctx.globalAlpha = ringAlpha;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 4. Draw Nodes
      nodes.forEach(node => {
        const isHovered = hoveredNodeRef.current?.id === node.id;
        let fillOverride = null;
        let currentRadius = node.radius;
        let showRiskPulse = false;

        if (node.isHotspot) {
          fillOverride = heat < 0.5
            ? lerpColor(THEME.nodes.file, THEME.nodes.riskMedium, heat * 2)
            : lerpColor(THEME.nodes.riskMedium, THEME.nodes.riskHigh, (heat - 0.5) * 2);
          currentRadius = node.radius + heat * 3.5;
          showRiskPulse = heat > 0.4;
        } else if (node.isSecondaryHotspot) {
          fillOverride = THEME.nodes.riskMedium;
        }

        drawNeuronNode(ctx, { ...node, radius: currentRadius }, {
          isHighlighted: isHovered || (node.isHotspot && heat > 0.65),
          fillOverride,
          pulsePhase: now * 0.006,
          showRiskPulse
        });
      });

      ctx.restore();

      if (isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(render);
        }
      });
    }, { rootMargin: '120px 0px 120px 0px' });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      if (Math.hypot(n.x - mx, n.y - my) <= n.radius + 10) {
        draggedNodeRef.current = n;
        break;
      }
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (draggedNodeRef.current) {
      const cx = canvas.clientWidth * 0.5;
      const cy = canvas.clientHeight * 0.5;
      draggedNodeRef.current.x = mx;
      draggedNodeRef.current.y = my;
      draggedNodeRef.current.relX = mx - cx;
      draggedNodeRef.current.relY = my - cy;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
      return;
    }

    let hovered = null;
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      if (Math.hypot(n.x - mx, n.y - my) <= n.radius + 8) {
        hovered = n;
        break;
      }
    }
    hoveredNodeRef.current = hovered;
  };

  const handlePointerUp = () => {
    draggedNodeRef.current = null;
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left">
        <ScrollWriteHeading
          text={t('showcase.hotspotTitle', 'Critical Hotspot Detection')}
          as="h2"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans leading-tight"
        />
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-2 tracking-normal">
          {t('showcase.hotspotDesc', 'Real-time architectural complexity identification')}
        </p>
      </div>

      <div className="lg:col-span-7 w-full">
        <div className="w-full bg-[#121314] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl h-[420px] sm:h-[460px] relative">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. INTERACTIVE COUPLING (Pure Spatial Map View)
// ============================================================================
function InteractiveCouplingBox() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const { t } = useLanguage();

  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const shockwavesRef = useRef([]);
  const dragConnectRef = useRef({
    isConnecting: false,
    fromNode: null,
    currentPos: { x: 0, y: 0 },
    hoverTarget: null
  });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const rawNodes = [
      // Left Cluster: Frontend (Community 3)
      { id: 'frontend/src', label: 'src', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, community: 3, relX: -165, relY: 0 },
      { id: 'useWorkspace.js', label: 'useWorkspace.js', nodeType: 'file', radius: 10.5, color: THEME.nodes.file, community: 3, relX: -85, relY: -55 },
      { id: 'CodeEditor.jsx', label: 'CodeEditor.jsx', nodeType: 'file', radius: 10.5, color: THEME.nodes.file, community: 3, relX: -95, relY: 55 },
      { id: 'usePhysicsEngine.js', label: 'usePhysicsEngine.js', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, community: 3, relX: -225, relY: -65 },
      { id: 'App.jsx', label: 'App.jsx', nodeType: 'file', radius: 10, color: THEME.nodes.file, community: 3, relX: -230, relY: 55 },
      { id: 'syncNodeMove', label: 'function syncNodeMove()', nodeType: 'function', radius: 5, color: THEME.nodes.function, community: 3, relX: -135, relY: -115 },

      // Right Cluster: Backend (Community 0)
      { id: 'backend/core', label: 'core', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, community: 0, relX: 165, relY: 0 },
      { id: 'websocket_router.py', label: 'websocket_router.py', nodeType: 'file', radius: 10.5, color: THEME.nodes.file, community: 0, relX: 85, relY: -55 },
      { id: 'mutator.py', label: 'mutator.py', nodeType: 'file', radius: 11, color: THEME.nodes.riskHigh, isCritical: true, community: 0, relX: 75, relY: 55 },
      { id: 'parser.py', label: 'parser.py', nodeType: 'file', radius: 10, color: THEME.nodes.file, community: 0, relX: 225, relY: -65 },
      { id: 'state.py', label: 'state.py', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, community: 0, relX: 225, relY: 60 },
      { id: 'ws_handler', label: 'def ws_handler()', nodeType: 'function', radius: 5, color: THEME.nodes.function, community: 0, relX: 135, relY: -115 }
    ];

    const initialLinks = [
      { source: 'frontend/src', target: 'useWorkspace.js', type: 'hierarchy' },
      { source: 'frontend/src', target: 'CodeEditor.jsx', type: 'hierarchy' },
      { source: 'frontend/src', target: 'usePhysicsEngine.js', type: 'hierarchy' },
      { source: 'frontend/src', target: 'App.jsx', type: 'hierarchy' },
      { source: 'useWorkspace.js', target: 'syncNodeMove', type: 'hierarchy' },
      { source: 'backend/core', target: 'websocket_router.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'mutator.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'parser.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'state.py', type: 'hierarchy' },
      { source: 'websocket_router.py', target: 'ws_handler', type: 'hierarchy' }
    ];

    nodesRef.current = rawNodes.map((n, idx) => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      seedX: idx * 17 + 5,
      seedY: idx * 23 + 11
    }));
    linksRef.current = initialLinks;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let initialized = false;
    let lastShockTime = 0;

    const render = (now) => {
      const width = canvas.clientWidth || 640;
      const height = canvas.clientHeight || 440;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = THEME.background;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const nodes = nodesRef.current;
      const links = linksRef.current;

      if (!initialized && width > 0) {
        nodes.forEach(n => {
          n.x = cx + n.relX;
          n.y = cy + n.relY;
        });
        initialized = true;
      }

      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // Gentle orbital breathing
      nodes.forEach(node => {
        const targetX = cx + node.relX + Math.sin(now * 0.001 + node.seedX) * 3.5;
        const targetY = cy + node.relY + Math.cos(now * 0.0009 + node.seedY) * 3.5;
        node.x += (targetX - node.x) * 0.08;
        node.y += (targetY - node.y) * 0.08;
      });

      // 1. Draw Left & Right Community Nebulae
      const leftNodes = nodes.filter(n => n.community === 3);
      const rightNodes = nodes.filter(n => n.community === 0);
      drawNebula(ctx, leftNodes, 55, 60, '#ec4899', '#ec4899', 0.07, 0.20);
      drawNebula(ctx, rightNodes, 55, 60, '#3b82f6', '#3b82f6', 0.07, 0.20);

      // 2. Draw Structural & User-Coupled Links
      const drawLaserBridge = (s, tgt, alpha = 1.0) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 8.0;
        ctx.globalAlpha = 0.18 * alpha;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2.4;
        ctx.globalAlpha = 0.95 * alpha;
        ctx.stroke();

        for (let pIdx = 0; pIdx < 2; pIdx++) {
          const photonT = ((now * 0.0012) + (pIdx * 0.5)) % 1.0;
          const px = s.x + (tgt.x - s.x) * photonT;
          const py = s.y + (tgt.y - s.y) * photonT;

          ctx.beginPath();
          ctx.arc(px, py, 6.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.globalAlpha = 0.35 * alpha;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.95 * alpha;
          ctx.fill();
        }
        ctx.restore();
      };

      links.forEach(l => {
        const s = nodeMap.get(l.source);
        const tgt = nodeMap.get(l.target);
        if (!s || !tgt) return;

        if (l.isLaserBridge) {
          drawLaserBridge(s, tgt, 1.0);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tgt.x, tgt.y);
          ctx.strokeStyle = THEME.edges.hierarchy;
          ctx.lineWidth = 1.1;
          ctx.globalAlpha = 0.45;
          ctx.stroke();
          ctx.restore();
        }
      });

      // 3. Automated Two-Phase Coupling Choreography (when user is not actively dragging)
      // Cycle = 7000ms:
      // 0 - 1400ms: Tether drags from useWorkspace.js -> websocket_router.py
      // 1400 - 4200ms: Valid Laser Bridge active with streaming photons!
      // 4200 - 5600ms: Tether attempts CodeEditor.jsx -> mutator.py (turns red near target)
      // 5600 - 6600ms: CSP rejection shockwave + recoil snap back
      const cycle = (now % 7000);
      const wsFront = nodeMap.get('useWorkspace.js');
      const wsBack = nodeMap.get('websocket_router.py');
      const editorNode = nodeMap.get('CodeEditor.jsx');
      const critNode = nodeMap.get('mutator.py');

      if (!dragConnectRef.current.isConnecting && wsFront && wsBack && editorNode && critNode) {
        if (cycle < 1400) {
          const u = cycle / 1400;
          const p = 1 - Math.pow(1 - u, 2.2);
          const curX = wsFront.x + (wsBack.x - wsFront.x) * p;
          const curY = wsFront.y + (wsBack.y - wsFront.y) * p;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(wsFront.x, wsFront.y);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2.2;
          ctx.setLineDash([5, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.fill();
          ctx.restore();
        } else if (cycle >= 1400 && cycle < 4200) {
          // Active Laser Bridge
          const fade = cycle > 3800 ? 1 - (cycle - 3800) / 400 : 1.0;
          drawLaserBridge(wsFront, wsBack, fade);
        } else if (cycle >= 4200 && cycle < 5600) {
          // Attempting connection to protected mutator.py
          const u = (cycle - 4200) / 1400;
          const p = 1 - Math.pow(1 - u, 2.2);
          const curX = editorNode.x + (critNode.x - editorNode.x) * p;
          const curY = editorNode.y + (critNode.y - editorNode.y) * p;
          const isNear = u > 0.7;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(editorNode.x, editorNode.y);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = isNear ? '#ef4444' : '#00f0ff';
          ctx.lineWidth = 2.2;
          ctx.setLineDash([5, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isNear ? '#ef4444' : '#00f0ff';
          ctx.fill();
          ctx.restore();
        } else if (cycle >= 5600 && cycle < 6500) {
          // Rejection shockwave & recoil
          if (now - lastShockTime > 700) {
            lastShockTime = now;
            shockwavesRef.current.push({
              x: critNode.x,
              y: critNode.y,
              radius: critNode.radius + 4,
              maxRadius: 95,
              alpha: 0.9
            });
          }

          const u = (cycle - 5600) / 900;
          const recoil = Math.max(0, 1 - Math.pow(u, 1.8));
          const curX = editorNode.x + (critNode.x - editorNode.x) * recoil;
          const curY = editorNode.y + (critNode.y - editorNode.y) * recoil;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(editorNode.x, editorNode.y);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = '#ef4444';
          ctx.globalAlpha = recoil;
          ctx.lineWidth = 1.8;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 4. Render Expanding Rejection Shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += 2.6;
        sw.alpha -= 0.025;
        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ef4444';
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw User Interactive Drag Tether
      if (dragConnectRef.current.isConnecting && dragConnectRef.current.fromNode) {
        const from = dragConnectRef.current.fromNode;
        const cur = dragConnectRef.current.currentPos;
        const target = dragConnectRef.current.hoverTarget;
        const isBlocked = Boolean(from.isCritical || target?.isCritical);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.strokeStyle = isBlocked ? '#ef4444' : '#00f0ff';
        ctx.lineWidth = 2.4;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(cur.x, cur.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isBlocked ? '#ef4444' : '#00f0ff';
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw Nodes
      nodes.forEach(node => {
        const isTarget = dragConnectRef.current.hoverTarget?.id === node.id;
        const isAutoActive =
          (!dragConnectRef.current.isConnecting) &&
          ((cycle < 4200 && (node.id === 'useWorkspace.js' || node.id === 'websocket_router.py')) ||
           (cycle >= 4200 && cycle < 6500 && (node.id === 'CodeEditor.jsx' || node.id === 'mutator.py')));

        drawNeuronNode(ctx, node, {
          isHighlighted: isTarget || isAutoActive,
          pulsePhase: now * 0.006,
          showRiskPulse: Boolean(node.isCritical)
        });
      });

      ctx.restore();

      if (isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(render);
        }
      });
    }, { rootMargin: '120px 0px 120px 0px' });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      if (Math.hypot(n.x - mx, n.y - my) <= n.radius + 10) {
        dragConnectRef.current = {
          isConnecting: true,
          fromNode: n,
          currentPos: { x: mx, y: my },
          hoverTarget: null
        };
        break;
      }
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !dragConnectRef.current.isConnecting) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    dragConnectRef.current.currentPos = { x: mx, y: my };
    const from = dragConnectRef.current.fromNode;
    let target = null;
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      if (n.id !== from?.id && Math.hypot(n.x - mx, n.y - my) <= n.radius + 12) {
        target = n;
        break;
      }
    }
    dragConnectRef.current.hoverTarget = target;
  };

  const handlePointerUp = () => {
    if (dragConnectRef.current.isConnecting) {
      const { fromNode, hoverTarget } = dragConnectRef.current;
      if (fromNode && hoverTarget && fromNode.id !== hoverTarget.id) {
        if (fromNode.isCritical || hoverTarget.isCritical) {
          shockwavesRef.current.push({
            x: hoverTarget.x,
            y: hoverTarget.y,
            radius: hoverTarget.radius + 4,
            maxRadius: 95,
            alpha: 0.95
          });
        } else {
          linksRef.current.push({
            source: fromNode.id,
            target: hoverTarget.id,
            isLaserBridge: true
          });
        }
      }
    }
    dragConnectRef.current = {
      isConnecting: false,
      fromNode: null,
      currentPos: { x: 0, y: 0 },
      hoverTarget: null
    };
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="lg:col-span-7 w-full order-2 lg:order-1">
        <div className="w-full bg-[#121314] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl h-[420px] sm:h-[460px] relative">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="w-full h-full block touch-none cursor-crosshair"
          />
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left order-1 lg:order-2">
        <ScrollWriteHeading
          text={t('showcase.couplingTitle', 'Interactive Coupling')}
          as="h2"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans leading-tight"
        />
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-2 tracking-normal">
          {t('showcase.couplingDesc', 'Visual drag-and-drop structural cross-linking')}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 3. DEEP CODE INSPECTION (Pure Spatial Map View - Animated Camera & Ray-Trace Focus)
// ============================================================================
const INSPECTION_GRAPH = {
  nodes: [
    // Folders
    { id: 'backend/core', label: 'core', nodeType: 'folder', radius: 18, color: THEME.nodes.folder, community: 0, x: -75, y: 5 },
    { id: 'backend/ml', label: 'ml', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, community: 1, x: 120, y: -30 },

    // Files
    { id: 'parser.py', label: 'parser.py', nodeType: 'file', radius: 11.5, color: THEME.nodes.riskHigh, risk: 'high', community: 0, x: -10, y: -45 },
    { id: 'mutator.py', label: 'mutator.py', nodeType: 'file', radius: 10.5, color: THEME.nodes.riskMedium, community: 0, x: -95, y: -78 },
    { id: 'state.py', label: 'state.py', nodeType: 'file', radius: 10, color: THEME.nodes.file, community: 0, x: -135, y: 68 },
    { id: 'websocket_router.py', label: 'websocket_router.py', nodeType: 'file', radius: 10.5, color: THEME.nodes.file, community: 0, x: -10, y: 78 },
    { id: 'analyzer.py', label: 'analyzer.py', nodeType: 'file', radius: 11.5, color: THEME.nodes.file, community: 1, x: 105, y: 45 },

    // Function Moons (Tier 2 AST Symbols)
    { id: 'parse_ast', label: 'def parse_ast()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 0, x: 32, y: -95 },
    { id: 'extract_symbols', label: 'def extract_symbols()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 0, x: 52, y: -42 },
    { id: 'build_call_graph', label: 'def build_call_graph()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 0, x: -28, y: -102 },
    { id: 'apply_refactor', label: 'def apply_refactor()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 0, x: -152, y: -108 },
    { id: 'rollback_state', label: 'def rollback_state()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 0, x: -92, y: -132 },
    { id: 'ws_handler', label: 'def ws_handler()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 0, x: -12, y: 132 },
    { id: 'analyze_graph_ml', label: 'def analyze_graph_ml()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 1, x: 168, y: 28 },
    { id: 'compute_entropy', label: 'def compute_shannon_entropy()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 1, x: 158, y: 88 },
    { id: 'detect_communities', label: 'def detect_communities()', nodeType: 'function', radius: 5.5, color: THEME.nodes.function, community: 1, x: 88, y: 105 }
  ],
  edges: [
    { source: 'backend/core', target: 'parser.py', type: 'hierarchy' },
    { source: 'backend/core', target: 'mutator.py', type: 'hierarchy' },
    { source: 'backend/core', target: 'state.py', type: 'hierarchy' },
    { source: 'backend/core', target: 'websocket_router.py', type: 'hierarchy' },
    { source: 'backend/ml', target: 'analyzer.py', type: 'hierarchy' },

    // AST Symbol Moons
    { source: 'parser.py', target: 'parse_ast', type: 'hierarchy' },
    { source: 'parser.py', target: 'extract_symbols', type: 'hierarchy' },
    { source: 'parser.py', target: 'build_call_graph', type: 'hierarchy' },
    { source: 'mutator.py', target: 'apply_refactor', type: 'hierarchy' },
    { source: 'mutator.py', target: 'rollback_state', type: 'hierarchy' },
    { source: 'websocket_router.py', target: 'ws_handler', type: 'hierarchy' },
    { source: 'analyzer.py', target: 'analyze_graph_ml', type: 'hierarchy' },
    { source: 'analyzer.py', target: 'compute_entropy', type: 'hierarchy' },
    { source: 'analyzer.py', target: 'detect_communities', type: 'hierarchy' },

    // Cross-Module Call Conduits
    { source: 'websocket_router.py', target: 'analyzer.py', type: 'call' },
    { source: 'analyzer.py', target: 'parser.py', type: 'call' },
    { source: 'mutator.py', target: 'parser.py', type: 'call' },
    { source: 'mutator.py', target: 'state.py', type: 'call' }
  ]
};

const FOCUS_TOUR = ['parser.py', 'analyzer.py', 'mutator.py', 'websocket_router.py'];

function DeepCodeInspectionBox() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const { t } = useLanguage();

  const selectedIdRef = useRef(null);
  const lastUserClickTimeRef = useRef(0);
  const camRef = useRef({ x: 0, y: 0, zoom: 1.25 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (now) => {
      const width = canvas.clientWidth || 640;
      const height = canvas.clientHeight || 440;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = THEME.background;
      ctx.fillRect(0, 0, width, height);

      // Determine active inspected node (auto-cycles every 3.2s unless user clicked recently)
      const userOverrideActive = (now - lastUserClickTimeRef.current) < 7000 && selectedIdRef.current;
      const tourIdx = Math.floor(now / 3200) % FOCUS_TOUR.length;
      const activeId = userOverrideActive ? selectedIdRef.current : FOCUS_TOUR[tourIdx];

      // Compute dynamic node positions with gentle harmonic motion
      const nodes = INSPECTION_GRAPH.nodes.map((n, idx) => ({
        ...n,
        x: n.x + Math.sin(now * 0.0011 + idx * 1.7) * 3.0,
        y: n.y + Math.cos(now * 0.0009 + idx * 2.3) * 3.0
      }));
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      const targetNode = nodeMap.get(activeId) || nodes[2];

      // Smoothly pan & zoom camera toward the currently inspected node
      const targetZoom = 1.38;
      camRef.current.x += (targetNode.x - camRef.current.x) * 0.055;
      camRef.current.y += (targetNode.y - camRef.current.y) * 0.055;
      camRef.current.zoom += (targetZoom - camRef.current.zoom) * 0.055;

      // Build 1-hop ray-traced focus set
      const focusedNodeIds = new Set([activeId]);
      const focusedEdges = new Set();

      INSPECTION_GRAPH.edges.forEach((e, idx) => {
        if (e.source === activeId) {
          focusedNodeIds.add(e.target);
          focusedEdges.add(idx);
        } else if (e.target === activeId) {
          focusedNodeIds.add(e.source);
          focusedEdges.add(idx);
        }
      });

      ctx.save();
      ctx.translate(width * 0.5, height * 0.5);
      ctx.scale(camRef.current.zoom, camRef.current.zoom);
      ctx.translate(-camRef.current.x, -camRef.current.y);

      // 1. Draw Louvain Community Nebulae
      const comm0 = nodes.filter(n => n.community === 0);
      const comm1 = nodes.filter(n => n.community === 1);
      drawNebula(ctx, comm0, 55, 60, '#3b82f6', '#3b82f6', 0.06, 0.16);
      drawNebula(ctx, comm1, 55, 60, '#a855f7', '#a855f7', 0.06, 0.16);

      // 2. Draw Edges (Focused edges glow brightly, others dim to 0.08)
      INSPECTION_GRAPH.edges.forEach((e, idx) => {
        const s = nodeMap.get(e.source);
        const tgt = nodeMap.get(e.target);
        if (!s || !tgt) return;

        const isFocused = focusedEdges.has(idx);
        const isCall = e.type === 'call';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tgt.x, tgt.y);

        if (isFocused) {
          ctx.strokeStyle = isCall ? THEME.edges.callGlow : THEME.edges.hierarchyGlow;
          ctx.lineWidth = (isCall ? 2.4 : 2.0) / camRef.current.zoom;
          ctx.globalAlpha = 0.95;
          ctx.stroke();

          // Signal particle traveling along inspected AST conduit
          const pT = ((now * 0.0011) + idx * 0.25) % 1.0;
          const px = s.x + (tgt.x - s.x) * pT;
          const py = s.y + (tgt.y - s.y) * pT;
          ctx.beginPath();
          ctx.arc(px, py, 2.6 / camRef.current.zoom, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else {
          ctx.strokeStyle = isCall ? THEME.edges.call : THEME.edges.hierarchy;
          ctx.lineWidth = 1.0 / camRef.current.zoom;
          ctx.globalAlpha = 0.10;
          ctx.stroke();
        }
        ctx.restore();
      });

      // 3. Draw Nodes (Inspected node + 1-hop AST symbols stay crisp, others dim)
      nodes.forEach(node => {
        const isPrimary = node.id === activeId;
        const isNeighbor = focusedNodeIds.has(node.id);

        drawNeuronNode(ctx, node, {
          alpha: isNeighbor ? 1.0 : 0.12,
          isHighlighted: isPrimary,
          pulsePhase: now * 0.006,
          showRiskPulse: node.risk === 'high' && isNeighbor,
          showLabel: isNeighbor || node.nodeType === 'folder',
          zoom: camRef.current.zoom
        });
      });

      ctx.restore();
      ctx.restore();

      if (isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(render);
        }
      });
    }, { rootMargin: '120px 0px 120px 0px' });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const wx = camRef.current.x + (mx - width * 0.5) / camRef.current.zoom;
    const wy = camRef.current.y + (my - height * 0.5) / camRef.current.zoom;

    for (let i = INSPECTION_GRAPH.nodes.length - 1; i >= 0; i--) {
      const n = INSPECTION_GRAPH.nodes[i];
      if (Math.hypot(n.x - wx, n.y - wy) <= n.radius + 12) {
        selectedIdRef.current = n.id;
        lastUserClickTimeRef.current = performance.now();
        break;
      }
    }
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left">
        <ScrollWriteHeading
          text={t('showcase.inspectionTitle', 'Deep Code Inspection')}
          as="h2"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans leading-tight"
        />
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-2 tracking-normal">
          {t('showcase.inspectionDesc', 'High-precision AST symbol analysis')}
        </p>
      </div>

      <div className="lg:col-span-7 w-full">
        <div className="w-full bg-[#121314] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl h-[420px] sm:h-[460px] relative">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            className="w-full h-full block touch-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 4. CLUSTER DETECTION (Pure Spatial Map View - Louvain Modularity Nebulae)
// ============================================================================
function ClusterDetectionBox() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const { t } = useLanguage();

  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const hoveredNodeRef = useRef(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const rawNodes = [
      // Community 0: Core Backend (Blue #3b82f6)
      { id: 'backend/core', label: 'core', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, isHub: true, community: 0, relX: -145, relY: -55 },
      { id: 'parser.py', label: 'parser.py', nodeType: 'file', radius: 10.5, color: THEME.nodes.riskHigh, risk: 'high', community: 0, relX: -205, relY: -95 },
      { id: 'mutator.py', label: 'mutator.py', nodeType: 'file', radius: 9.5, color: THEME.nodes.riskMedium, community: 0, relX: -85, relY: -98 },
      { id: 'state.py', label: 'state.py', nodeType: 'file', radius: 9, color: THEME.nodes.file, community: 0, relX: -195, relY: -12 },
      { id: 'parse_ast', label: 'def parse_ast()', nodeType: 'function', radius: 5, color: THEME.nodes.function, community: 0, relX: -145, relY: -125 },

      // Community 1: Graph ML (Purple #a855f7)
      { id: 'backend/ml', label: 'ml', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, isHub: true, community: 1, relX: 145, relY: -60 },
      { id: 'analyzer.py', label: 'analyzer.py', nodeType: 'file', radius: 10.5, color: THEME.nodes.file, community: 1, relX: 85, relY: -95 },
      { id: 'modularity.py', label: 'modularity.py', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, community: 1, relX: 205, relY: -98 },
      { id: 'layout.py', label: 'layout.py', nodeType: 'file', radius: 9, color: THEME.nodes.file, community: 1, relX: 195, relY: -15 },
      { id: 'detect_communities', label: 'def detect_communities()', nodeType: 'function', radius: 5, color: THEME.nodes.function, community: 1, relX: 145, relY: -125 },

      // Community 2: Services & AI (Green #22c55e)
      { id: 'backend/services', label: 'services', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, isHub: true, community: 2, relX: 135, relY: 82 },
      { id: 'websocket_router.py', label: 'websocket_router.py', nodeType: 'file', radius: 10, color: THEME.nodes.file, community: 2, relX: 65, relY: 58 },
      { id: 'ai_service.py', label: 'ai_service.py', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, community: 2, relX: 198, relY: 55 },
      { id: 'terminal_service.py', label: 'terminal_service.py', nodeType: 'file', radius: 9, color: THEME.nodes.file, community: 2, relX: 138, relY: 135 },

      // Community 3: Frontend (Pink #ec4899)
      { id: 'frontend/src', label: 'src', nodeType: 'folder', radius: 17, color: THEME.nodes.folder, isHub: true, community: 3, relX: -135, relY: 82 },
      { id: 'useWorkspace.js', label: 'useWorkspace.js', nodeType: 'file', radius: 10, color: THEME.nodes.file, community: 3, relX: -65, relY: 58 },
      { id: 'CodeEditor.jsx', label: 'CodeEditor.jsx', nodeType: 'file', radius: 9.5, color: THEME.nodes.file, community: 3, relX: -198, relY: 55 },
      { id: 'App.jsx', label: 'App.jsx', nodeType: 'file', radius: 9, color: THEME.nodes.file, community: 3, relX: -138, relY: 135 }
    ];

    const links = [
      // Community 0
      { source: 'backend/core', target: 'parser.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'mutator.py', type: 'hierarchy' },
      { source: 'backend/core', target: 'state.py', type: 'hierarchy' },
      { source: 'parser.py', target: 'parse_ast', type: 'hierarchy' },
      { source: 'mutator.py', target: 'parser.py', type: 'call' },

      // Community 1
      { source: 'backend/ml', target: 'analyzer.py', type: 'hierarchy' },
      { source: 'backend/ml', target: 'modularity.py', type: 'hierarchy' },
      { source: 'backend/ml', target: 'layout.py', type: 'hierarchy' },
      { source: 'analyzer.py', target: 'detect_communities', type: 'hierarchy' },
      { source: 'analyzer.py', target: 'modularity.py', type: 'call' },

      // Community 2
      { source: 'backend/services', target: 'websocket_router.py', type: 'hierarchy' },
      { source: 'backend/services', target: 'ai_service.py', type: 'hierarchy' },
      { source: 'backend/services', target: 'terminal_service.py', type: 'hierarchy' },

      // Community 3
      { source: 'frontend/src', target: 'useWorkspace.js', type: 'hierarchy' },
      { source: 'frontend/src', target: 'CodeEditor.jsx', type: 'hierarchy' },
      { source: 'frontend/src', target: 'App.jsx', type: 'hierarchy' },

      // Cross-Community Conduits & Laser Bridges
      { source: 'useWorkspace.js', target: 'websocket_router.py', type: 'network_bridge' },
      { source: 'websocket_router.py', target: 'analyzer.py', type: 'network_bridge' },
      { source: 'analyzer.py', target: 'parser.py', type: 'call' },
      { source: 'ai_service.py', target: 'mutator.py', type: 'call' }
    ];

    nodesRef.current = rawNodes.map((n, idx) => ({
      ...n,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      seedX: idx * 15 + 3,
      seedY: idx * 21 + 9
    }));
    linksRef.current = links;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let initialized = false;

    const render = (now) => {
      const width = canvas.clientWidth || 640;
      const height = canvas.clientHeight || 440;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = THEME.background;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const nodes = nodesRef.current;
      const links = linksRef.current;

      if (!initialized && width > 0) {
        nodes.forEach(n => {
          n.x = cx + n.relX;
          n.y = cy + n.relY;
        });
        initialized = true;
      }

      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // Smooth cluster breathing and spring restoration
      nodes.forEach(node => {
        if (draggedNodeRef.current?.id === node.id) return;
        const commWaveX = Math.sin(now * 0.0008 + node.community * 1.6) * 5.0;
        const commWaveY = Math.cos(now * 0.0007 + node.community * 1.6) * 5.0;
        const targetX = cx + node.relX + commWaveX + Math.sin(now * 0.0013 + node.seedX) * 2.5;
        const targetY = cy + node.relY + commWaveY + Math.cos(now * 0.0011 + node.seedY) * 2.5;

        node.vx += (targetX - node.x) * 0.05;
        node.vy += (targetY - node.y) * 0.05;
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx;
        node.y += node.vy;
      });

      // 1. Draw All 4 Louvain Community Nebulae
      for (let cId = 0; cId < 4; cId++) {
        const commNodes = nodes.filter(n => n.community === cId);
        const col = THEME.nebula[cId];
        const pulse = (Math.sin(now * 0.0015 + cId * 1.4) + 1) * 0.5;
        drawNebula(
          ctx,
          commNodes,
          44,
          52,
          col.fill,
          col.stroke,
          0.065 + pulse * 0.025,
          0.18 + pulse * 0.06
        );
      }

      // 2. Draw Edges & Laser Bridges
      links.forEach(edge => {
        const s = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!s || !tgt) return;

        ctx.save();
        if (edge.type === 'network_bridge') {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tgt.x, tgt.y);
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 7.0;
          ctx.globalAlpha = 0.16;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tgt.x, tgt.y);
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = 0.9;
          ctx.stroke();

          for (let pIdx = 0; pIdx < 2; pIdx++) {
            const photonT = ((now * 0.001) + (pIdx * 0.5)) % 1.0;
            const px = s.x + (tgt.x - s.x) * photonT;
            const py = s.y + (tgt.y - s.y) * photonT;

            ctx.beginPath();
            ctx.arc(px, py, 6.0, 0, Math.PI * 2);
            ctx.fillStyle = '#00f0ff';
            ctx.globalAlpha = 0.35;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px, py, 3.0, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = 0.95;
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tgt.x, tgt.y);
          ctx.strokeStyle = edge.type === 'call' ? THEME.edges.call : THEME.edges.hierarchy;
          ctx.lineWidth = edge.type === 'call' ? 1.4 : 1.1;
          ctx.globalAlpha = edge.type === 'call' ? 0.52 : 0.42;
          ctx.stroke();
        }
        ctx.restore();
      });

      // 3. Draw Nodes
      nodes.forEach(node => {
        const isHovered = hoveredNodeRef.current?.id === node.id;
        drawNeuronNode(ctx, node, {
          isHighlighted: isHovered,
          pulsePhase: now * 0.006,
          showRiskPulse: node.risk === 'high'
        });
      });

      ctx.restore();

      if (isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(render);
        }
      });
    }, { rootMargin: '120px 0px 120px 0px' });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      if (Math.hypot(n.x - mx, n.y - my) <= n.radius + 10) {
        draggedNodeRef.current = n;
        break;
      }
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (draggedNodeRef.current) {
      const dragged = draggedNodeRef.current;
      const dx = mx - dragged.x;
      const dy = my - dragged.y;
      const cx = canvas.clientWidth * 0.5;
      const cy = canvas.clientHeight * 0.5;

      dragged.x = mx;
      dragged.y = my;
      dragged.relX = mx - cx;
      dragged.relY = my - cy;
      dragged.vx = 0;
      dragged.vy = 0;

      if (dragged.isHub) {
        nodesRef.current.forEach(n => {
          if (n.community === dragged.community && n.id !== dragged.id) {
            n.x += dx;
            n.y += dy;
            n.relX = n.x - cx;
            n.relY = n.y - cy;
          }
        });
      }
      return;
    }

    let hovered = null;
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      if (Math.hypot(n.x - mx, n.y - my) <= n.radius + 8) {
        hovered = n;
        break;
      }
    }
    hoveredNodeRef.current = hovered;
  };

  const handlePointerUp = () => {
    draggedNodeRef.current = null;
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className="lg:col-span-7 w-full order-2 lg:order-1">
        <div className="w-full bg-[#121314] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl h-[420px] sm:h-[460px] relative">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
          />
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left order-1 lg:order-2">
        <ScrollWriteHeading
          text={t('showcase.clusterTitle', 'Cluster Detection')}
          as="h2"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans leading-tight"
        />
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-2 tracking-normal">
          {t('showcase.clusterDesc', 'Automated Architectural Community Discovery')}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN EXPORT: ALL 4 PURE SPATIAL MAP VIEWS
// ============================================================================
export default function SpatialSnippetsShowcase() {
  return (
    <section className="mb-24 sm:mb-32 w-full space-y-20 sm:space-y-28 text-left">
      <HotspotDetectionBox />
      <InteractiveCouplingBox />
      <DeepCodeInspectionBox />
      <ClusterDetectionBox />
    </section>
  );
}
