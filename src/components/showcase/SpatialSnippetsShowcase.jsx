import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, CheckCircle2 } from 'lucide-react';

// =========================================================================
// NEURON FEATURE SHOWCASE: 3 DEDICATED LEFT/RIGHT INTERACTIVE SECTIONS
// -------------------------------------------------------------------------
// Feature 1: Critical Hotspot Detection (Bullet line trajectory -> ball turns red)
// Feature 2: Interactive Coupling (Drag to connect, one critical blocked node)
// Feature 3: Deep Code Inspection (Zoomed node with live code summary card)
//
// Rules strictly enforced:
// - NO "SPATIAL OBSERVABILITY" kicker text anywhere
// - NO zoom percentage labels ("remov eht xxoom thing")
// - NO word "telemetry" anywhere
// - NO "Neuron v0.9.4"
// - NO green dots in headers
// - Bottom trays: "OUTPUT" and "powershell" only with clean PS prompt (no text walls)
// - Realistic file names (ast_scanner.py, etc.)
// - Solid colors: crisp yellow (#facc15), blue (#38bdf8), red (#ef4444) without blurry glowing bloom
// =========================================================================

// -------------------------------------------------------------------------
// COMPONENT 1: CRITICAL HOTSPOT DETECTION
// -------------------------------------------------------------------------
function HotspotDetectionBox() {
  const [activeTab, setActiveTab] = useState('powershell');
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const nodesRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const hoveredNodeRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startTimeRef = useRef(performance.now());
  const isVisibleRef = useRef(false);

  // Scroll-triggered activation: animation triggers only when user scrolls on it
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            startTimeRef.current = performance.now();
          } else {
            isVisibleRef.current = false;
          }
        });
      },
      { threshold: 0.20 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 420;
    const cy = height * 0.50;

    // GIGANTIC Yellow Folder Sun (Affixated / pinned permanently at the left edge of the box)
    const folderNode = {
      id: 'folder_parser',
      label: 'parser',
      type: 'folder',
      radius: 68, // Biggest ball in the box!
      color: '#facc15',
      x: 55, // Anchored at the left edge of the box
      y: cy,
      baseX: 55,
      baseY: cy,
      isFixed: true, // AFFIXATED - Immovable
      vx: 0,
      vy: 0,
      seedX: 14,
      seedY: 28
    };

    // Reduced satellite files: only 2 huge blue balls + 1 huge target red ball!
    const files = [
      { name: 'ast_scanner.py', relX: 320, relY: -10, radius: 30, isTarget: true },
      { name: 'token_stream.py', relX: 200, relY: -95, radius: 24, isTarget: false },
      { name: 'syntax_tree.py', relX: 190, relY: 95, radius: 24, isTarget: false }
    ];

    const childNodes = files.map((f, idx) => {
      const tx = folderNode.x + f.relX;
      const ty = folderNode.y + f.relY;
      return {
        id: `file_${idx}`,
        label: f.name,
        type: 'file',
        radius: f.radius, // All balls are huge!
        color: '#38bdf8',
        isTarget: f.isTarget,
        x: tx,
        y: ty,
        baseX: tx,
        baseY: ty,
        restDist: Math.hypot(f.relX, f.relY),
        vx: 0,
        vy: 0,
        seedX: 30 + idx * 17,
        seedY: 50 + idx * 23
      };
    });

    nodesRef.current = [folderNode, ...childNodes];
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let prevTime = performance.now();

    const render = (now) => {
      prevTime = now;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep space canvas background
      ctx.fillStyle = '#08090c';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid coordinate lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const nodes = nodesRef.current;
      if (nodes.length === 0) {
        animFrameRef.current = requestAnimationFrame(render);
        ctx.restore();
        return;
      }

      const folder = nodes[0];
      const satellites = nodes.slice(1);

      // Red ball slowly turning red animation (only triggers when user scrolls onto the box)
      const loopTime = 6500;
      const elapsed = isVisibleRef.current ? ((now - startTimeRef.current) % loopTime) : 0;
      let ballRedProgress = 0;

      if (isVisibleRef.current) {
        if (elapsed >= 1000 && elapsed < 3500) {
          // Slowly turning red
          const u = (elapsed - 1000) / 2500;
          ballRedProgress = 1 - Math.pow(1 - u, 2.2);
        } else if (elapsed >= 3500 && elapsed < 5500) {
          // Deep solid red
          ballRedProgress = 1.0;
        } else if (elapsed >= 5500) {
          // Return to blue
          const u = (elapsed - 5500) / 1000;
          ballRedProgress = 1.0 - u;
        }
      }

      // Physics update (folder is affixated at edge, satellite files can be dragged)
      nodes.forEach(node => {
        if (node.isFixed) {
          node.x = node.baseX;
          node.y = node.baseY;
          node.vx = 0;
          node.vy = 0;
          return;
        }

        if (draggedNodeRef.current?.id === node.id) return;

        const dx = node.x - folder.x;
        const dy = node.y - folder.y;
        const dist = Math.hypot(dx, dy) || 1;
        const delta = dist - node.restDist;
        node.vx -= (dx / dist) * delta * 0.035;
        node.vy -= (dy / dist) * delta * 0.035;

        if (isVisibleRef.current) {
          node.vx += Math.sin(now * 0.0012 + node.seedX) * 0.02;
          node.vy += Math.cos(now * 0.0010 + node.seedY) * 0.02;
        }
        node.vx *= 0.88;
        node.vy *= 0.88;
        node.x += node.vx;
        node.y += node.vy;
      });

      // Atmospheric Cosmic Background Gradients behind the balls (just like main graph)
      const targetSat = satellites.find(s => s.isTarget) || satellites[0];
      if (targetSat) {
        const redGrad = ctx.createRadialGradient(targetSat.x, targetSat.y, 15, targetSat.x, targetSat.y, 185);
        redGrad.addColorStop(0, 'rgba(239, 68, 68, 0.22)');
        redGrad.addColorStop(0.50, 'rgba(220, 38, 38, 0.08)');
        redGrad.addColorStop(0.80, 'rgba(185, 28, 28, 0.02)');
        redGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = redGrad;
        ctx.beginPath();
        ctx.arc(targetSat.x, targetSat.y, 185, 0, Math.PI * 2);
        ctx.fill();
      }

      const yelGrad = ctx.createRadialGradient(folder.x, folder.y, 25, folder.x, folder.y, 195);
      yelGrad.addColorStop(0, 'rgba(250, 204, 21, 0.20)');
      yelGrad.addColorStop(0.50, 'rgba(250, 204, 21, 0.07)');
      yelGrad.addColorStop(0.80, 'rgba(250, 204, 21, 0.015)');
      yelGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
      ctx.fillStyle = yelGrad;
      ctx.beginPath();
      ctx.arc(folder.x, folder.y, 195, 0, Math.PI * 2);
      ctx.fill();

      // Draw Conduit Lines (clean conduits, no laser shooting)
      satellites.forEach(sat => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(folder.x, folder.y);
        ctx.lineTo(sat.x, sat.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      });

      // Draw Satellite File Balls (Huge balls)
      satellites.forEach(sat => {
        ctx.save();
        let fillColor = sat.color;
        if (sat.isTarget && ballRedProgress > 0) {
          const r = Math.round(56 + (239 - 56) * ballRedProgress);
          const g = Math.round(189 + (68 - 189) * ballRedProgress);
          const b = Math.round(248 + (68 - 248) * ballRedProgress);
          fillColor = `rgb(${r}, ${g}, ${b})`;
        }

        // Clean solid vector disc (NO double border)
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, sat.radius, 0, Math.PI * 2);
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.restore();
      });

      // Draw Gigantic Affixated Simple Yellow Ball at the Edge of the Box
      ctx.save();
      ctx.beginPath();
      ctx.arc(folder.x, folder.y, folder.radius, 0, Math.PI * 2);
      ctx.fillStyle = folder.color;
      ctx.fill();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
      ctx.restore();
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (node.isFixed) continue; // Yellow ball is affixated - cannot be dragged!
      if (Math.hypot(node.x - mx, node.y - my) <= node.radius + 8) {
        draggedNodeRef.current = node;
        isDraggingRef.current = true;
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDraggingRef.current && draggedNodeRef.current) {
      draggedNodeRef.current.x = mx;
      draggedNodeRef.current.y = my;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
      return;
    }

    const nodes = nodesRef.current;
    let found = null;
    for (let i = nodes.length - 1; i >= 0; i--) {
      if (Math.hypot(nodes[i].x - mx, nodes[i].y - my) <= nodes[i].radius + 8) {
        found = nodes[i];
        break;
      }
    }
    hoveredNodeRef.current = found;
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Left Column: Single Heading (matching chatbot layout) */}
      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
          Critical Hotspot Detection
        </h2>
      </div>

      {/* Right Column: Interactive Box (as big as chatbot box: h-[460px] sm:h-[480px]) */}
      <div className="lg:col-span-7 w-full">
        <div className="w-full bg-[#08090c] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[460px] sm:h-[480px] relative font-sans text-left">
          {/* Header */}
          <div className="h-9 bg-[#0e1017] border-b border-white/[0.08] px-4 flex items-center justify-between text-xs text-slate-400 select-none shrink-0">
            <span className="text-slate-300 font-mono text-[11px] font-medium">
              Critical Hotspot Detection
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-slate-500">parser</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">ast</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 w-full relative overflow-hidden bg-[#08090c]">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Bottom Tray */}
          <div className="h-20 bg-[#090b10] border-t border-white/[0.08] flex flex-col shrink-0 select-none">
            <div className="h-6 bg-[#0c0e14] border-b border-white/[0.06] px-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('OUTPUT')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'OUTPUT' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <Terminal size={10} />
                  <span>OUTPUT</span>
                </button>
                <button
                  onClick={() => setActiveTab('powershell')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'powershell' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <span>powershell</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-2.5 font-mono text-[11px] text-slate-300 flex items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">PS C:\Neuron\parser&gt;</span>
                <span className="w-1.5 h-3 bg-[#38bdf8] animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// COMPONENT 2: INTERACTIVE COUPLING (Connecting balls, critical node blocked)
// -------------------------------------------------------------------------
function InteractiveCouplingBox() {
  const [activeTab, setActiveTab] = useState('powershell');
  const [showHarmfulPopup, setShowHarmfulPopup] = useState(false);
  const showHarmfulPopupRef = useRef(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const dragConnectRef = useRef({
    isConnecting: false,
    fromNode: null,
    currentPos: { x: 0, y: 0 },
    hoverTarget: null,
    isBlockedTarget: false
  });
  const startTimeRef = useRef(performance.now());
  const isVisibleRef = useRef(false);

  // Scroll-triggered activation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
            startTimeRef.current = performance.now();
          } else {
            isVisibleRef.current = false;
            setShowHarmfulPopup(false);
            showHarmfulPopupRef.current = false;
          }
        });
      },
      { threshold: 0.20 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 420;
    const cx = width * 0.48;
    const cy = height * 0.50;

    // Huge Yellow Folder Hubs (radius: 48) and satellite balls
    const yellowHub1 = {
      id: 'dir_engine',
      label: 'engine',
      type: 'folder',
      radius: 48,
      color: '#facc15',
      x: cx - 145,
      y: cy - 20,
      vx: 0,
      vy: 0,
      seedX: 11,
      seedY: 21
    };

    const yellowHub2 = {
      id: 'dir_runtime',
      label: 'runtime',
      type: 'folder',
      radius: 48,
      color: '#facc15',
      x: cx + 145,
      y: cy + 20,
      vx: 0,
      vy: 0,
      seedX: 33,
      seedY: 44
    };

    // Blue satellite file balls (Richly populated: 12 nodes total)
    const blueNodes = [
      // Left Engine Cluster
      { id: 'f_viewport', label: 'viewport.ts', x: cx - 75, y: cy - 95, radius: 21, color: '#38bdf8', parent: 'dir_engine', seedX: 12, seedY: 14 },
      { id: 'f_renderer', label: 'renderer.ts', x: cx - 225, y: cy - 70, radius: 21, color: '#38bdf8', parent: 'dir_engine', seedX: 18, seedY: 22 },
      { id: 'f_pipeline', label: 'pipeline.ts', x: cx - 200, y: cy + 85, radius: 21, color: '#38bdf8', parent: 'dir_engine', seedX: 25, seedY: 31 },
      { id: 'f_shaders', label: 'shaders.wgsl', x: cx - 110, y: cy + 105, radius: 19, color: '#38bdf8', parent: 'dir_engine', seedX: 29, seedY: 36 },
      { id: 'f_canvas', label: 'canvas.ts', x: cx - 245, y: cy + 15, radius: 19, color: '#38bdf8', parent: 'dir_engine', seedX: 34, seedY: 42 },
      { id: 'f_events', label: 'events.ts', x: cx - 155, y: cy - 110, radius: 19, color: '#38bdf8', parent: 'dir_engine', seedX: 39, seedY: 47 },

      // Right Runtime Cluster
      { id: 'f_vfs', label: 'vfs.ts', x: cx + 75, y: cy + 95, radius: 21, color: '#38bdf8', parent: 'dir_runtime', seedX: 51, seedY: 58 },
      { id: 'f_db_pool', label: 'db_pool.ts', x: cx + 225, y: cy + 70, radius: 21, color: '#38bdf8', parent: 'dir_runtime', seedX: 56, seedY: 63 },
      { id: 'f_sandbox', label: 'sandbox.ts', x: cx + 195, y: cy - 80, radius: 21, color: '#38bdf8', parent: 'dir_runtime', seedX: 62, seedY: 69 },
      { id: 'f_sqlite', label: 'sqlite.rs', x: cx + 115, y: cy - 105, radius: 19, color: '#38bdf8', parent: 'dir_runtime', seedX: 67, seedY: 74 },
      { id: 'f_cache', label: 'cache.ts', x: cx + 250, y: cy - 10, radius: 19, color: '#38bdf8', parent: 'dir_runtime', seedX: 72, seedY: 79 },
      { id: 'f_wasm', label: 'wasm.ts', x: cx + 155, y: cy + 115, radius: 19, color: '#38bdf8', parent: 'dir_runtime', seedX: 77, seedY: 84 }
    ];

    // ONE Critical Node that cannot be connected in either direction!
    const criticalNode = {
      id: 'f_critical',
      label: 'core_alloc.rs',
      type: 'critical',
      radius: 23,
      color: '#ef4444',
      isCritical: true,
      x: cx,
      y: cy - 10,
      vx: 0,
      vy: 0,
      seedX: 88,
      seedY: 99
    };

    const initialLinks = [
      { source: 'dir_engine', target: 'f_viewport' },
      { source: 'dir_engine', target: 'f_renderer' },
      { source: 'dir_engine', target: 'f_pipeline' },
      { source: 'dir_engine', target: 'f_shaders' },
      { source: 'dir_engine', target: 'f_canvas' },
      { source: 'dir_engine', target: 'f_events' },
      { source: 'dir_runtime', target: 'f_vfs' },
      { source: 'dir_runtime', target: 'f_db_pool' },
      { source: 'dir_runtime', target: 'f_sandbox' },
      { source: 'dir_runtime', target: 'f_sqlite' },
      { source: 'dir_runtime', target: 'f_cache' },
      { source: 'dir_runtime', target: 'f_wasm' }
    ];

    nodesRef.current = [yellowHub1, yellowHub2, ...blueNodes, criticalNode];
    linksRef.current = initialLinks;
    startTimeRef.current = performance.now();
  }, []);

  // 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (now) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep space canvas background
      ctx.fillStyle = '#08090c';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const nodes = nodesRef.current;
      const links = linksRef.current;
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // Automated joining demonstration when user is idle
      const loopTime = 3200;
      const elapsed = isVisibleRef.current ? ((now - startTimeRef.current) % loopTime) : 0;
      let isAutoDemo = !dragConnectRef.current.isConnecting && isVisibleRef.current;

      const originNode = nodeMap.get('f_viewport') || nodes[2];
      const critNode = nodeMap.get('f_critical');

      // Check for blocked coupling attempt to trigger "Harmful Coupling" popup
      const isAutoBlocked = isAutoDemo && (elapsed >= 1700 && elapsed < 2650);
      const isUserBlocked = dragConnectRef.current.isConnecting && dragConnectRef.current.isBlockedTarget;
      const shouldShowBlocked = isVisibleRef.current && (isAutoBlocked || isUserBlocked);

      if (shouldShowBlocked !== showHarmfulPopupRef.current) {
        showHarmfulPopupRef.current = shouldShowBlocked;
        setShowHarmfulPopup(shouldShowBlocked);
      }

      // Physics micro-drift
      if (isVisibleRef.current) {
        nodes.forEach(node => {
          node.vx += Math.sin(now * 0.0012 + (node.seedX || 0)) * 0.015;
          node.vy += Math.cos(now * 0.0010 + (node.seedY || 0)) * 0.015;
          node.vx *= 0.88;
          node.vy *= 0.88;
          node.x += node.vx;
          node.y += node.vy;
        });
      }

      // Atmospheric Cosmic Background Gradients behind the clusters (just like main graph)
      const hubEngine = nodeMap.get('dir_engine');
      const hubRuntime = nodeMap.get('dir_runtime');
      if (hubEngine) {
        const gradEngine = ctx.createRadialGradient(hubEngine.x, hubEngine.y, 20, hubEngine.x, hubEngine.y, 185);
        gradEngine.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        gradEngine.addColorStop(0.50, 'rgba(6, 182, 212, 0.07)');
        gradEngine.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = gradEngine;
        ctx.beginPath();
        ctx.arc(hubEngine.x, hubEngine.y, 185, 0, Math.PI * 2);
        ctx.fill();
      }

      if (hubRuntime) {
        const gradRuntime = ctx.createRadialGradient(hubRuntime.x, hubRuntime.y, 20, hubRuntime.x, hubRuntime.y, 185);
        gradRuntime.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        gradRuntime.addColorStop(0.50, 'rgba(56, 189, 248, 0.07)');
        gradRuntime.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = gradRuntime;
        ctx.beginPath();
        ctx.arc(hubRuntime.x, hubRuntime.y, 185, 0, Math.PI * 2);
        ctx.fill();
      }

      if (critNode) {
        const gradCrit = ctx.createRadialGradient(critNode.x, critNode.y, 10, critNode.x, critNode.y, 110);
        gradCrit.addColorStop(0, 'rgba(239, 68, 68, 0.22)');
        gradCrit.addColorStop(0.50, 'rgba(239, 68, 68, 0.06)');
        gradCrit.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = gradCrit;
        ctx.beginPath();
        ctx.arc(critNode.x, critNode.y, 110, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Existing Links
      links.forEach(l => {
        const s = nodeMap.get(l.source);
        const t = nodeMap.get(l.target);
        if (!s || !t) return;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = l.isCoupled ? '#38bdf8' : 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = l.isCoupled ? 2.2 : 1.2;
        ctx.stroke();
      });

      // Automated Demo: Repeatedly attempts to connect to the red ball, recoiling upon rejection
      if (isAutoDemo && originNode && critNode) {
        if (elapsed >= 300 && elapsed < 2100) {
          // Tether reaching out towards red ball
          const u = (elapsed - 300) / 1800;
          const p = 1 - Math.pow(1 - u, 2.2);
          const curX = originNode.x + (critNode.x - originNode.x) * p;
          const curY = originNode.y + (critNode.y - originNode.y) * p;
          const isNearCrit = u > 0.75;

          ctx.beginPath();
          ctx.moveTo(originNode.x, originNode.y);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = isNearCrit ? '#ef4444' : '#38bdf8';
          ctx.lineWidth = 2.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = isNearCrit ? '#ef4444' : '#38bdf8';
          ctx.fill();
        } else if (elapsed >= 2100 && elapsed < 2650) {
          // Rejection recoil / snap back
          const u = (elapsed - 2100) / 550;
          const recoilProgress = 1.0 - Math.pow(u, 2.2);
          const curX = originNode.x + (critNode.x - originNode.x) * recoilProgress;
          const curY = originNode.y + (critNode.y - originNode.y) * recoilProgress;

          ctx.beginPath();
          ctx.moveTo(originNode.x, originNode.y);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.65)';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.beginPath();
          ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        }
      }

      // Draw User Live Interactive Dragging Tether
      if (dragConnectRef.current.isConnecting && dragConnectRef.current.fromNode) {
        const from = dragConnectRef.current.fromNode;
        const cur = dragConnectRef.current.currentPos;
        const isBlocked = dragConnectRef.current.isBlockedTarget;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(cur.x, cur.y);
        ctx.strokeStyle = isBlocked ? '#ef4444' : '#38bdf8';
        ctx.lineWidth = 2.4;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Tether bead (no text)
        ctx.beginPath();
        ctx.arc(cur.x, cur.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = isBlocked ? '#ef4444' : '#38bdf8';
        ctx.fill();
        ctx.restore();
      }

      // Draw Nodes (Yellow hubs, blue files, one critical red - NO text, NO double borders)
      nodes.forEach(node => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // User Drag & Connect Interaction
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (Math.hypot(node.x - mx, node.y - my) <= node.radius + 8) {
        dragConnectRef.current.isConnecting = true;
        dragConnectRef.current.fromNode = node;
        dragConnectRef.current.currentPos = { x: mx, y: my };
        dragConnectRef.current.isBlockedTarget = node.isCritical || false;
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (dragConnectRef.current.isConnecting) {
      dragConnectRef.current.currentPos = { x: mx, y: my };

      const nodes = nodesRef.current;
      const from = dragConnectRef.current.fromNode;
      let target = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (n.id !== from?.id && Math.hypot(n.x - mx, n.y - my) <= n.radius + 12) {
          target = n;
          break;
        }
      }
      dragConnectRef.current.hoverTarget = target;
      // Prohibit connection in BOTH directions if either from or target is critical!
      dragConnectRef.current.isBlockedTarget = Boolean(from?.isCritical || target?.isCritical);
    }
  };

  const handleMouseUp = () => {
    if (dragConnectRef.current.isConnecting) {
      const target = dragConnectRef.current.hoverTarget;
      const from = dragConnectRef.current.fromNode;

      if (target && from && target.id !== from.id) {
        // Disallow coupling if either node is critical!
        const isBlocked = from.isCritical || target.isCritical;
        if (!isBlocked) {
          linksRef.current.push({
            source: from.id,
            target: target.id,
            isCoupled: true
          });
        }
      }
    }

    dragConnectRef.current.isConnecting = false;
    dragConnectRef.current.fromNode = null;
    dragConnectRef.current.hoverTarget = null;
    dragConnectRef.current.isBlockedTarget = false;
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Box on Left on desktop (order-2 on mobile, lg:order-1 on desktop) */}
      <div className="lg:col-span-7 w-full order-2 lg:order-1">
        <div className="w-full bg-[#08090c] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[460px] sm:h-[480px] relative font-sans text-left">
          {/* Header */}
          <div className="h-9 bg-[#0e1017] border-b border-white/[0.08] px-4 flex items-center justify-between text-xs text-slate-400 select-none shrink-0">
            <span className="text-slate-300 font-mono text-[11px] font-medium">
              Interactive Coupling
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-slate-500">topology</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">conduits</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 w-full relative overflow-hidden bg-[#08090c]">
            {/* Harmful Coupling Popup Pill (Clean single border, no double borders) */}
            {showHarmfulPopup && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18080a]/95 border border-red-500/40 text-red-200 text-xs font-mono shadow-lg shadow-red-950/50 backdrop-blur-sm transition-all duration-150 animate-in fade-in">
                <ShieldAlert size={14} className="text-red-400 shrink-0" />
                <span>Harmful Coupling: This cannot be done</span>
              </div>
            )}
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full block touch-none cursor-crosshair"
            />
          </div>

          {/* Bottom Tray */}
          <div className="h-20 bg-[#090b10] border-t border-white/[0.08] flex flex-col shrink-0 select-none">
            <div className="h-6 bg-[#0c0e14] border-b border-white/[0.06] px-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('OUTPUT')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'OUTPUT' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <Terminal size={10} />
                  <span>OUTPUT</span>
                </button>
                <button
                  onClick={() => setActiveTab('powershell')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'powershell' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <span>powershell</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-2.5 font-mono text-[11px] text-slate-300 flex items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">PS C:\Neuron\coupling&gt;</span>
                <span className="w-1.5 h-3 bg-[#38bdf8] animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heading on Right on desktop (order-1 on mobile, lg:order-2 on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left order-1 lg:order-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
          Interactive Coupling
        </h2>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// COMPONENT 3: DEEP CODE INSPECTION (Click to inspect, focused ball highlights, others dull)
// -------------------------------------------------------------------------
const INSPECTION_NODES_DATA = [
  {
    id: 'ast_scanner',
    label: 'ast_scanner.py',
    relX: 0,
    relY: 0,
    radius: 26,
    color: '#38bdf8',
    summary: [
      'Recursively parses abstract syntax trees',
      'into spatial graph nodes, mapping cross-file',
      'dependencies and structural complexity.'
    ]
  },
  {
    id: 'tokens',
    label: 'tokens.rs',
    relX: -92,
    relY: -68,
    radius: 20,
    color: '#38bdf8',
    summary: [
      'High-performance lexical token stream',
      'providing zero-copy byte slicing and syntax',
      'token categorization for the parser.'
    ]
  },
  {
    id: 'visitor',
    label: 'visitor.py',
    relX: -85,
    relY: 75,
    radius: 20,
    color: '#38bdf8',
    summary: [
      'Traverses syntax tree nodes using depth-first',
      'search, emitting symbol references and call',
      'hierarchies to the engine.'
    ]
  },
  {
    id: 'grammar',
    label: 'grammar.g4',
    relX: 82,
    relY: -72,
    radius: 20,
    color: '#38bdf8',
    summary: [
      'Formal context-free grammar definition',
      'specifying language precedence rules,',
      'statement blocks, and expression syntax.'
    ]
  },
  {
    id: 'semantic',
    label: 'semantic_pass.py',
    relX: 92,
    relY: 68,
    radius: 20,
    color: '#38bdf8',
    summary: [
      'Resolves type inference, scope visibility,',
      'and symbol lifetimes across interconnected',
      'module boundaries.'
    ]
  }
];

const INSPECTION_LINKS = [
  { source: 'tokens', target: 'ast_scanner' },
  { source: 'ast_scanner', target: 'visitor' },
  { source: 'ast_scanner', target: 'semantic' },
  { source: 'tokens', target: 'grammar' }
];

function DeepCodeInspectionBox() {
  const [activeTab, setActiveTab] = useState('powershell');
  const [activeFile, setActiveFile] = useState('ast_scanner.py');
  const [isHoveringBall, setIsHoveringBall] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const focusedIdRef = useRef('ast_scanner');
  const userClickedRef = useRef(false);
  const camXRef = useRef(0);
  const camYRef = useRef(0);
  const zoomRef = useRef(1.0);
  const cardAlphaRef = useRef(0);
  const isVisibleRef = useRef(false);

  // Dragging support: balls only move when touched/dragged!
  const draggedNodeRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Scroll-triggered activation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
          } else {
            isVisibleRef.current = false;
          }
        });
      },
      { threshold: 0.20 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isFirst = true;

    const render = (now) => {
      const width = canvas.clientWidth || 600;
      const height = canvas.clientHeight || 420;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep space background
      ctx.fillStyle = '#08090c';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const baseCx = width * 0.28;
      const baseCy = height * 0.50;

      // Nodes do not move on their own - only when touched or dragged!
      const nodes = INSPECTION_NODES_DATA.map(f => ({
        ...f,
        x: baseCx + f.relX,
        y: baseCy + f.relY
      }));
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      const focusedNode = nodeMap.get(focusedIdRef.current) || nodes[0];

      if (isFirst) {
        camXRef.current = focusedNode.x;
        camYRef.current = focusedNode.y;
        zoomRef.current = 1.85;
        cardAlphaRef.current = 1.0;
        isFirst = false;
      }

      // Smooth camera lerp to centered focused node
      const targetCamX = focusedNode.x;
      const targetCamY = focusedNode.y;
      const targetZoom = 1.85;

      camXRef.current += (targetCamX - camXRef.current) * 0.085;
      camYRef.current += (targetCamY - camYRef.current) * 0.085;
      zoomRef.current += (targetZoom - zoomRef.current) * 0.085;
      cardAlphaRef.current += (1.0 - cardAlphaRef.current) * 0.1;

      const screenTargetX = width * 0.26;
      const screenTargetY = height * 0.50;

      // Cosmic Nebula Background Gradient behind inspection cluster (like main graph)
      const gradInspect = ctx.createRadialGradient(screenTargetX, screenTargetY, 20, screenTargetX, screenTargetY, 210);
      gradInspect.addColorStop(0, 'rgba(56, 189, 248, 0.20)');
      gradInspect.addColorStop(0.50, 'rgba(14, 165, 233, 0.06)');
      gradInspect.addColorStop(0.85, 'rgba(2, 132, 199, 0.015)');
      gradInspect.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = gradInspect;
      ctx.beginPath();
      ctx.arc(screenTargetX, screenTargetY, 210, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(screenTargetX, screenTargetY);
      ctx.scale(zoomRef.current, zoomRef.current);
      ctx.translate(-camXRef.current, -camYRef.current);

      // 1. Draw Conduits between nodes (clean sparse tree, not all interconnected)
      INSPECTION_LINKS.forEach(link => {
        const s = nodeMap.get(link.source);
        const t = nodeMap.get(link.target);
        if (!s || !t) return;
        const isLinkedToFocus = s.id === focusedNode.id || t.id === focusedNode.id;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = isLinkedToFocus ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = (isLinkedToFocus ? 1.6 : 0.8) / zoomRef.current;
        ctx.stroke();
      });

      // 2. Draw Balls (Focused ball highlights, other balls become dull, NO double borders)
      nodes.forEach(n => {
        const isFocused = n.id === focusedNode.id;
        ctx.save();

        if (isFocused) {
          // Highlighted focused ball: pure solid vector disc (NO double border)
          ctx.globalAlpha = 1.0;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = n.color; // #38bdf8
          ctx.fill();

          // Clean white label under focused ball
          ctx.font = '600 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + n.radius + 12 / zoomRef.current);
        } else {
          // Dull dimmed ball: low opacity, muted
          ctx.globalAlpha = 0.20;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();

          // Subtle label
          ctx.font = '400 8.5px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.fillStyle = '#64748b';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + n.radius + 11 / zoomRef.current);
        }

        ctx.restore();
      });

      ctx.restore();

      // 3. Draw Sleek AI Summary Window for the Focused Ball (beside the zoomed ball)
      if (cardAlphaRef.current > 0.05) {
        ctx.save();
        ctx.globalAlpha = cardAlphaRef.current;

        const cardX = Math.max(width * 0.48, 280);
        const cardY = height * 0.20;
        const cardW = Math.min(width * 0.46, 260);
        const cardH = 125;

        // Card backdrop (clean subtle border, NO double borders)
        ctx.fillStyle = 'rgba(10, 12, 18, 0.94)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardW, cardH, 8);
        ctx.fill();
        ctx.stroke();

        // Card header: AI SUMMARY badge and clicked file name
        ctx.fillStyle = '#38bdf8';
        ctx.font = '700 9px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText('AI SUMMARY', cardX + 14, cardY + 20);

        ctx.fillStyle = '#f1f5f9';
        ctx.font = '600 12px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText(focusedNode.label, cardX + 14, cardY + 36);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(cardX + 14, cardY + 44);
        ctx.lineTo(cardX + cardW - 14, cardY + 44);
        ctx.stroke();

        // Concise summary of what this file does
        ctx.font = '400 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillStyle = '#94a3b8';
        focusedNode.summary.forEach((line, idx) => {
          ctx.fillText(line, cardX + 14, cardY + 62 + idx * 16);
        });

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pointer Click & Drag on Any Ball to Focus & Zoom
  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const baseCx = width * 0.28;
    const baseCy = height * 0.50;
    const screenTargetX = width * 0.26;
    const screenTargetY = height * 0.50;

    const curZoom = zoomRef.current || 1.85;
    const curCamX = camXRef.current || baseCx;
    const curCamY = camYRef.current || baseCy;

    const wx = curCamX + (mx - screenTargetX) / curZoom;
    const wy = curCamY + (my - screenTargetY) / curZoom;

    for (let i = INSPECTION_NODES_DATA.length - 1; i >= 0; i--) {
      const f = INSPECTION_NODES_DATA[i];
      const nx = baseCx + f.relX;
      const ny = baseCy + f.relY;
      if (Math.hypot(nx - wx, ny - wy) <= f.radius + 12) {
        userClickedRef.current = true;
        focusedIdRef.current = f.id;
        setActiveFile(f.label);
        draggedNodeRef.current = f;
        isDraggingRef.current = true;
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

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const baseCx = width * 0.28;
    const baseCy = height * 0.50;
    const screenTargetX = width * 0.26;
    const screenTargetY = height * 0.50;

    const curZoom = zoomRef.current || 1.85;
    const curCamX = camXRef.current || baseCx;
    const curCamY = camYRef.current || baseCy;

    const wx = curCamX + (mx - screenTargetX) / curZoom;
    const wy = curCamY + (my - screenTargetY) / curZoom;

    if (isDraggingRef.current && draggedNodeRef.current) {
      draggedNodeRef.current.relX = wx - baseCx;
      draggedNodeRef.current.relY = wy - baseCy;
      return;
    }

    let hit = false;
    for (let i = INSPECTION_NODES_DATA.length - 1; i >= 0; i--) {
      const f = INSPECTION_NODES_DATA[i];
      const nx = baseCx + f.relX;
      const ny = baseCy + f.relY;
      if (Math.hypot(nx - wx, ny - wy) <= f.radius + 12) {
        hit = true;
        break;
      }
    }
    setIsHoveringBall(hit);
  };

  const handlePointerUp = () => {
    draggedNodeRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Left Column: Heading with AI Summary */}
      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
          Deep Code Inspection
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-sans mt-2 tracking-normal">
          Interactive AI Summary & AST Topology
        </p>
      </div>

      {/* Right Column: Interactive Box */}
      <div className="lg:col-span-7 w-full">
        <div className="w-full bg-[#08090c] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[460px] sm:h-[480px] relative font-sans text-left">
          {/* Header */}
          <div className="h-9 bg-[#0e1017] border-b border-white/[0.08] px-4 flex items-center justify-between text-xs text-slate-400 select-none shrink-0">
            <span className="text-slate-300 font-mono text-[11px] font-medium">
              Deep Code Inspection: AI Summary
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-slate-500">parser</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{activeFile}</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 w-full relative overflow-hidden bg-[#08090c]">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className={`w-full h-full block touch-none ${isHoveringBall ? 'cursor-pointer' : 'cursor-default'}`}
            />
            {/* Subtle instructional hint */}
            <div className="absolute bottom-2.5 right-3 pointer-events-none text-[10px] font-mono text-slate-500/70 select-none">
              click any node to inspect
            </div>
          </div>

          {/* Bottom Tray */}
          <div className="h-20 bg-[#090b10] border-t border-white/[0.08] flex flex-col shrink-0 select-none">
            <div className="h-6 bg-[#0c0e14] border-b border-white/[0.06] px-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('OUTPUT')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'OUTPUT' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <Terminal size={10} />
                  <span>OUTPUT</span>
                </button>
                <button
                  onClick={() => setActiveTab('powershell')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'powershell' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <span>powershell</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-2.5 font-mono text-[11px] text-slate-300 flex items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">PS C:\Neuron\inspect\{activeFile}&gt;</span>
                <span className="w-1.5 h-3 bg-[#38bdf8] animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// COMPONENT 4: CLUSTER DETECTION (Louvain Community Modularity, Huge Gradients)
// -------------------------------------------------------------------------
function ClusterDetectionBox() {
  const [activeTab, setActiveTab] = useState('powershell');
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const nodesRef = useRef([]);
  const linksRef = useRef([]);
  const draggedNodeRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startTimeRef = useRef(performance.now());
  const isVisibleRef = useRef(false);

  // Scroll-triggered activation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisibleRef.current = true;
          } else {
            isVisibleRef.current = false;
          }
        });
      },
      { threshold: 0.20 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 420;
    const cx = width * 0.48;
    const cy = height * 0.50;

    // Cluster 1 Center (Purple Community, Left)
    const c1x = cx - 135;
    const c1y = cy;

    // Cluster 2 Center (Azure Blue Community, Right)
    const c2x = cx + 135;
    const c2y = cy;

    // Yellow Hub 1 (Cluster 1: Parser & Compiler)
    const hub1 = {
      id: 'c1_hub',
      label: 'parser',
      type: 'folder',
      radius: 46,
      color: '#facc15',
      x: c1x,
      y: c1y,
      vx: 0,
      vy: 0,
      seedX: 15,
      seedY: 25,
      isHub: true,
      clusterId: 1
    };

    // Yellow Hub 2 (Cluster 2: Runtime & Storage)
    const hub2 = {
      id: 'c2_hub',
      label: 'runtime',
      type: 'folder',
      radius: 46,
      color: '#facc15',
      x: c2x,
      y: c2y,
      vx: 0,
      vy: 0,
      seedX: 35,
      seedY: 45,
      isHub: true,
      clusterId: 2
    };

    // Purple Cluster 1 Nodes
    const cluster1Nodes = [
      { id: 'c1_1', x: c1x - 70, y: c1y - 65, radius: 21, color: '#a855f7', seedX: 11, seedY: 13, clusterId: 1 },
      { id: 'c1_2', x: c1x - 85, y: c1y + 60, radius: 20, color: '#a855f7', seedX: 17, seedY: 19, clusterId: 1 },
      { id: 'c1_3', x: c1x - 45, y: c1y + 85, radius: 19, color: '#a855f7', seedX: 23, seedY: 29, clusterId: 1 },
      { id: 'c1_4', x: c1x - 30, y: c1y - 85, radius: 20, color: '#a855f7', seedX: 31, seedY: 37, clusterId: 1 },
      { id: 'c1_5', x: c1x - 110, y: c1y - 15, radius: 19, color: '#a855f7', seedX: 41, seedY: 43, clusterId: 1 },
      { id: 'c1_6', x: c1x + 35, y: c1y - 75, radius: 19, color: '#a855f7', seedX: 47, seedY: 53, clusterId: 1 },
      { id: 'c1_7', x: c1x + 40, y: c1y + 70, radius: 20, color: '#a855f7', seedX: 59, seedY: 61, clusterId: 1 }
    ];

    // Azure Blue Cluster 2 Nodes
    const cluster2Nodes = [
      { id: 'c2_1', x: c2x + 70, y: c2y - 65, radius: 21, color: '#38bdf8', seedX: 67, seedY: 71, clusterId: 2 },
      { id: 'c2_2', x: c2x + 85, y: c2y + 60, radius: 20, color: '#38bdf8', seedX: 73, seedY: 79, clusterId: 2 },
      { id: 'c2_3', x: c2x + 45, y: c2y + 85, radius: 19, color: '#38bdf8', seedX: 83, seedY: 89, clusterId: 2 },
      { id: 'c2_4', x: c2x + 30, y: c2y - 85, radius: 20, color: '#38bdf8', seedX: 97, seedY: 101, clusterId: 2 },
      { id: 'c2_5', x: c2x + 110, y: c2y - 15, radius: 19, color: '#38bdf8', seedX: 103, seedY: 107, clusterId: 2 },
      { id: 'c2_6', x: c2x - 35, y: c2y - 75, radius: 19, color: '#38bdf8', seedX: 109, seedY: 113, clusterId: 2 },
      { id: 'c2_7', x: c2x - 40, y: c2y + 70, radius: 20, color: '#38bdf8', seedX: 127, seedY: 131, clusterId: 2 }
    ];

    // 2 Cross-Cluster Bridge Nodes (Different Colors: Amber & Coral)
    const bridgeNodes = [
      { id: 'br_amber', x: cx, y: cy - 60, radius: 22, color: '#f59e0b', seedX: 137, seedY: 139, isBridge: true },
      { id: 'br_coral', x: cx, y: cy + 60, radius: 22, color: '#f43f5e', seedX: 149, seedY: 151, isBridge: true }
    ];

    // Intra-cluster links & Cross-cluster conduits
    const clusterLinks = [
      // Cluster 1 Links
      { source: 'c1_hub', target: 'c1_1' },
      { source: 'c1_hub', target: 'c1_2' },
      { source: 'c1_hub', target: 'c1_3' },
      { source: 'c1_hub', target: 'c1_4' },
      { source: 'c1_hub', target: 'c1_5' },
      { source: 'c1_hub', target: 'c1_6' },
      { source: 'c1_hub', target: 'c1_7' },
      { source: 'c1_1', target: 'c1_4' },
      { source: 'c1_2', target: 'c1_3' },

      // Cluster 2 Links
      { source: 'c2_hub', target: 'c2_1' },
      { source: 'c2_hub', target: 'c2_2' },
      { source: 'c2_hub', target: 'c2_3' },
      { source: 'c2_hub', target: 'c2_4' },
      { source: 'c2_hub', target: 'c2_5' },
      { source: 'c2_hub', target: 'c2_6' },
      { source: 'c2_hub', target: 'c2_7' },
      { source: 'c2_1', target: 'c2_4' },
      { source: 'c2_2', target: 'c2_3' },

      // Cross-Cluster Bridge Conduits
      { source: 'c1_6', target: 'br_amber', isBridge: true },
      { source: 'br_amber', target: 'c2_6', isBridge: true },
      { source: 'c1_7', target: 'br_coral', isBridge: true },
      { source: 'br_coral', target: 'c2_7', isBridge: true }
    ];

    const allNodes = [hub1, hub2, ...cluster1Nodes, ...cluster2Nodes, ...bridgeNodes];
    const nodeLookup = new Map();
    allNodes.forEach(n => nodeLookup.set(n.id, n));

    clusterLinks.forEach(l => {
      const s = nodeLookup.get(l.source);
      const t = nodeLookup.get(l.target);
      if (s && t) {
        l.restDist = Math.hypot(t.x - s.x, t.y - s.y);
      }
    });

    nodesRef.current = allNodes;
    linksRef.current = clusterLinks;
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (now) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep space backdrop
      ctx.fillStyle = '#08090c';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const nodes = nodesRef.current;
      const links = linksRef.current;
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      const cx = width * 0.48;
      const cy = height * 0.50;

      // 1. DYNAMIC CLUSTER CENTROIDS (The cluster gradient dynamically moves with the balls!)
      const c1Nodes = nodes.filter(n => n.clusterId === 1 || n.id === 'c1_hub');
      const c2Nodes = nodes.filter(n => n.clusterId === 2 || n.id === 'c2_hub');

      let sum1X = 0, sum1Y = 0;
      c1Nodes.forEach(n => { sum1X += n.x; sum1Y += n.y; });
      const c1x = c1Nodes.length > 0 ? (sum1X / c1Nodes.length) : (cx - 135);
      const c1y = c1Nodes.length > 0 ? (sum1Y / c1Nodes.length) : cy;

      let sum2X = 0, sum2Y = 0;
      c2Nodes.forEach(n => { sum2X += n.x; sum2Y += n.y; });
      const c2x = c2Nodes.length > 0 ? (sum2X / c2Nodes.length) : (cx + 135);
      const c2y = c2Nodes.length > 0 ? (sum2Y / c2Nodes.length) : cy;

      // 2. HUGE GRADIENT BACKDROPS for Each Cluster (Follows the cluster live!)
      // Cluster 1: Huge Smooth Purple Radial Gradient
      const grad1 = ctx.createRadialGradient(c1x, c1y, 15, c1x, c1y, 175);
      grad1.addColorStop(0, 'rgba(168, 85, 247, 0.24)');
      grad1.addColorStop(0.55, 'rgba(168, 85, 247, 0.09)');
      grad1.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(c1x, c1y, 175, 0, Math.PI * 2);
      ctx.fill();

      // Cluster 2: Huge Smooth Azure Blue Radial Gradient
      const grad2 = ctx.createRadialGradient(c2x, c2y, 15, c2x, c2y, 175);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.24)');
      grad2.addColorStop(0.55, 'rgba(56, 189, 248, 0.09)');
      grad2.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(c2x, c2y, 175, 0, Math.PI * 2);
      ctx.fill();

      // Cluster Subsystem Descriptors in 3-4 Words (Subtle in-canvas labels)
      ctx.save();
      ctx.font = '600 10.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText('Parser & Compiler Domain', c1x, c1y - 62);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.fillText('Runtime & Storage Domain', c2x, c2y - 62);
      ctx.restore();

      // 3. Elastic Spring Physics & Micro-Drift
      links.forEach(l => {
        const s = nodeMap.get(l.source);
        const t = nodeMap.get(l.target);
        if (!s || !t) return;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.hypot(dx, dy) || 1;
        const rest = l.restDist || 75;
        const delta = dist - rest;
        const k = l.isBridge ? 0.015 : 0.035;
        const fx = (dx / dist) * delta * k;
        const fy = (dy / dist) * delta * k;

        if (draggedNodeRef.current?.id !== s.id) { s.vx += fx; s.vy += fy; }
        if (draggedNodeRef.current?.id !== t.id) { t.vx -= fx; t.vy -= fy; }
      });

      nodes.forEach(node => {
        if (draggedNodeRef.current?.id === node.id) return;
        node.vx += Math.sin(now * 0.0011 + (node.seedX || 0)) * 0.012;
        node.vy += Math.cos(now * 0.0009 + (node.seedY || 0)) * 0.012;
        node.vx *= 0.86;
        node.vy *= 0.86;
        node.x += node.vx;
        node.y += node.vy;
      });

      // 4. Draw Links
      links.forEach(l => {
        const s = nodeMap.get(l.source);
        const t = nodeMap.get(l.target);
        if (!s || !t) return;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = l.isBridge ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth = l.isBridge ? 1.8 : 1.2;
        if (l.isBridge) {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 5. Draw Nodes (Pure solid discs - NO text on balls, NO double borders)
      nodes.forEach(node => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (Math.hypot(node.x - mx, node.y - my) <= node.radius + 8) {
        draggedNodeRef.current = node;
        isDraggingRef.current = true;
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDraggingRef.current && draggedNodeRef.current) {
      const dragged = draggedNodeRef.current;
      const dx = mx - dragged.x;
      const dy = my - dragged.y;

      dragged.x = mx;
      dragged.y = my;
      dragged.vx = 0;
      dragged.vy = 0;

      // When moving the cluster hub (or any member), shift cluster nodes together so the entire cluster moves!
      if (dragged.isHub) {
        const clusterId = dragged.clusterId;
        const nodes = nodesRef.current;
        nodes.forEach(n => {
          if (n.clusterId === clusterId && n.id !== dragged.id) {
            n.x += dx;
            n.y += dy;
            n.vx = 0;
            n.vy = 0;
          }
        });
      }
    }
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
    isDraggingRef.current = false;
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Box on Left on desktop (order-2 on mobile, lg:order-1 on desktop) */}
      <div className="lg:col-span-7 w-full order-2 lg:order-1">
        <div className="w-full bg-[#08090c] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[460px] sm:h-[480px] relative font-sans text-left">
          {/* Header */}
          <div className="h-9 bg-[#0e1017] border-b border-white/[0.08] px-4 flex items-center justify-between text-xs text-slate-400 select-none shrink-0">
            <span className="text-slate-300 font-mono text-[11px] font-medium">
              Cluster Detection
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="text-slate-500">modularity</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">louvain</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 w-full relative overflow-hidden bg-[#08090c]">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-full h-full block touch-none cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Bottom Tray */}
          <div className="h-20 bg-[#090b10] border-t border-white/[0.08] flex flex-col shrink-0 select-none">
            <div className="h-6 bg-[#0c0e14] border-b border-white/[0.06] px-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('OUTPUT')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'OUTPUT' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <Terminal size={10} />
                  <span>OUTPUT</span>
                </button>
                <button
                  onClick={() => setActiveTab('powershell')}
                  className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'powershell' ? 'text-[#38bdf8] font-semibold' : 'text-slate-500'
                  }`}
                >
                  <span>powershell</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-2.5 font-mono text-[11px] text-slate-300 flex items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">PS C:\Neuron\clusters&gt;</span>
                <span className="w-1.5 h-3 bg-[#38bdf8] animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heading on Right on desktop (order-1 on mobile, lg:order-2 on desktop) */}
      <div className="lg:col-span-5 flex flex-col justify-center select-none text-left order-1 lg:order-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans leading-tight">
          Cluster Detection
        </h2>
        {/* 3-4 word description explaining what this cluster is (no full paragraph) */}
        <p className="text-sm sm:text-base text-slate-400 font-sans mt-2 tracking-normal">
          Automated Architectural Community Discovery
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// MAIN EXPORT: STACKS ALL 4 DEDICATED FEATURE BOXES IN ALTERNATING RHYTHM
// =========================================================================
export default function SpatialSnippetsShowcase() {
  return (
    <section className="mb-24 sm:mb-32 w-full space-y-20 sm:space-y-28 text-left">
      {/* Box 1: Critical Hotspot Detection (Heading Left, Box Right) */}
      <HotspotDetectionBox />

      {/* Box 2: Interactive Coupling (Box Left, Heading Right) */}
      <InteractiveCouplingBox />

      {/* Box 3: Deep Code Inspection (Heading Left, Box Right) */}
      <DeepCodeInspectionBox />

      {/* Box 4: Cluster Detection (Box Left, Heading Right) */}
      <ClusterDetectionBox />
    </section>
  );
}
