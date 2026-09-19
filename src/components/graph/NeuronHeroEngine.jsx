import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Folder, FileCode2, ZoomIn, ZoomOut, RotateCcw, Type
} from 'lucide-react';

// =========================================================================
// NEURON SPATIAL UNIVERSE: 40-FOLDER ORGANIC ECOSYSTEM (500+ NODES)
// -------------------------------------------------------------------------
// 1. 40 Yellow Folder Hubs (#facc15) forming the living directory backbone
// 2. Diverse Asymmetric Morphologies (Starburts, Honeycombs, Trees, Meshes)
// 3. Clean Explorer (Focused on key modules without bloated clutter)
// 4. Liquid Viscous Cursor Physics ("Stone Moving Through Water"):
//    * Proximity Repulsion Wake (< 110px): parts nodes like liquid
//    * Viscosity Damping (0.85): lush mercury / gelatin jiggle & momentum
//    * Chain-Reaction Waves: pushed nodes pull connected neighbors & moons
// 5. Conflict-Free Scroll & Zoom:
//    * Non-passive native wheel listener prevents whole-website zoom
//    * Normal scroll lets page scroll smoothly; Ctrl+Scroll or Focus zooms graph
//    * Elegant toast: "Ctrl + scroll to zoom graph"
// 6. 9 Calm Heartbeat Data Transfer Packets across major highways
// 7. Semantic Color Notation & Clearly Visible Ambient Cosmic Nebulae
// =========================================================================

// 40 Realistic Folders across 5 Major Architectural Territories (Generously spaced)
const FOLDERS_DATA = [
  // --- Domain 1: Core Engine & Graphics (Center) ---
  { id: 'dir_engine', label: 'engine', x: 620, y: 340, radius: 22, isHub: true, theme: 'cyan' },
  { id: 'dir_core', label: 'core', x: 380, y: 200, radius: 19, theme: 'cyan' },
  { id: 'dir_renderer', label: 'renderer', x: 880, y: 220, radius: 20, isHub: true, theme: 'cyan' },
  { id: 'dir_shaders', label: 'shaders', x: 1100, y: 120, radius: 17, theme: 'cyan' },
  { id: 'dir_pipeline', label: 'pipeline', x: 460, y: 50, radius: 17, theme: 'cyan' },
  { id: 'dir_webgpu', label: 'webgpu', x: 920, y: 50, radius: 18, theme: 'cyan' },
  { id: 'dir_viewport', label: 'viewport', x: 680, y: 150, radius: 16, theme: 'cyan' },
  { id: 'dir_canvas', label: 'canvas', x: 220, y: 90, radius: 17, theme: 'cyan' },

  // --- Domain 2: Parser, AST & Compiler (Right) ---
  { id: 'dir_parser', label: 'parser', x: 1560, y: 320, radius: 22, isHub: true, theme: 'coral' },
  { id: 'dir_ast', label: 'ast', x: 1800, y: 200, radius: 20, isHub: true, theme: 'coral' },
  { id: 'dir_lexer', label: 'lexer', x: 1360, y: 180, radius: 17, theme: 'coral' },
  { id: 'dir_tokens', label: 'tokens', x: 1560, y: 70, radius: 16, theme: 'coral' },
  { id: 'dir_grammar', label: 'grammar', x: 1800, y: 50, radius: 17, theme: 'coral' },
  { id: 'dir_tree_sitter', label: 'tree_sitter', x: 2020, y: 200, radius: 19, theme: 'coral' },
  { id: 'dir_symbols', label: 'symbols', x: 1660, y: 500, radius: 17, theme: 'coral' },
  { id: 'dir_codegen', label: 'codegen', x: 1920, y: 380, radius: 18, theme: 'coral' },

  // --- Domain 3: Agent, Reasoning & LLM (Left) ---
  { id: 'dir_agent', label: 'agent', x: -200, y: 320, radius: 22, isHub: true, theme: 'purple' },
  { id: 'dir_orchestrator', label: 'orchestrator', x: -440, y: 190, radius: 20, isHub: true, theme: 'purple' },
  { id: 'dir_prompts', label: 'prompts', x: -320, y: 50, radius: 17, theme: 'purple' },
  { id: 'dir_context', label: 'context', x: -80, y: 130, radius: 17, theme: 'purple' },
  { id: 'dir_tools', label: 'tools', x: -540, y: 350, radius: 18, theme: 'purple' },
  { id: 'dir_llm', label: 'llm', x: -660, y: 200, radius: 17, theme: 'purple' },
  { id: 'dir_memory', label: 'memory', x: -400, y: 500, radius: 17, theme: 'purple' },
  { id: 'dir_reasoning', label: 'reasoning', x: -200, y: 560, radius: 16, theme: 'purple' },

  // --- Domain 4: Physics & Simulation (Bottom-Left) ---
  { id: 'dir_physics', label: 'physics', x: 180, y: 1040, radius: 22, isHub: true, theme: 'indigo' },
  { id: 'dir_coulomb', label: 'coulomb', x: -20, y: 900, radius: 19, theme: 'coral' },
  { id: 'dir_barnes_hut', label: 'barnes_hut', x: 420, y: 940, radius: 18, theme: 'indigo' },
  { id: 'dir_quadtree', label: 'quadtree', x: 340, y: 1180, radius: 17, theme: 'indigo' },
  { id: 'dir_forces', label: 'forces', x: 100, y: 1200, radius: 17, theme: 'indigo' },
  { id: 'dir_simulation', label: 'simulation', x: 600, y: 1080, radius: 18, theme: 'indigo' },
  { id: 'dir_math', label: 'math', x: -100, y: 1060, radius: 16, theme: 'indigo' },
  { id: 'dir_geometry', label: 'geometry', x: 0, y: 1320, radius: 16, theme: 'indigo' },

  // --- Domain 5: Runtime, Storage & Graph (Bottom-Right) ---
  { id: 'dir_runtime', label: 'runtime', x: 1460, y: 1020, radius: 22, isHub: true, theme: 'amber' },
  { id: 'dir_sandbox', label: 'sandbox', x: 1700, y: 900, radius: 20, theme: 'coral' },
  { id: 'dir_cache', label: 'cache', x: 1240, y: 900, radius: 18, theme: 'amber' },
  { id: 'dir_sqlite', label: 'sqlite', x: 1660, y: 1160, radius: 18, theme: 'amber' },
  { id: 'dir_wasm', label: 'wasm', x: 1860, y: 1020, radius: 17, theme: 'amber' },
  { id: 'dir_vfs', label: 'vfs', x: 1360, y: 1200, radius: 17, theme: 'amber' },
  { id: 'dir_graph', label: 'graph', x: 800, y: 1120, radius: 22, isHub: true, theme: 'cyan' },
  { id: 'dir_clustering', label: 'clustering', x: 1040, y: 1200, radius: 19, theme: 'cyan' }
];

// Backbone links between folders (Hierarchical directory tree structure)
const FOLDER_LINKS = [
  // Engine cluster
  { source: 'dir_engine', target: 'dir_core' },
  { source: 'dir_engine', target: 'dir_renderer' },
  { source: 'dir_engine', target: 'dir_viewport' },
  { source: 'dir_renderer', target: 'dir_shaders' },
  { source: 'dir_core', target: 'dir_pipeline' },
  { source: 'dir_renderer', target: 'dir_webgpu' },
  { source: 'dir_core', target: 'dir_canvas' },

  // Parser cluster
  { source: 'dir_parser', target: 'dir_ast' },
  { source: 'dir_parser', target: 'dir_lexer' },
  { source: 'dir_ast', target: 'dir_tokens' },
  { source: 'dir_ast', target: 'dir_grammar' },
  { source: 'dir_ast', target: 'dir_tree_sitter' },
  { source: 'dir_parser', target: 'dir_symbols' },
  { source: 'dir_ast', target: 'dir_codegen' },

  // Agent cluster
  { source: 'dir_agent', target: 'dir_orchestrator' },
  { source: 'dir_agent', target: 'dir_context' },
  { source: 'dir_orchestrator', target: 'dir_prompts' },
  { source: 'dir_agent', target: 'dir_tools' },
  { source: 'dir_orchestrator', target: 'dir_llm' },
  { source: 'dir_agent', target: 'dir_memory' },
  { source: 'dir_memory', target: 'dir_reasoning' },

  // Physics cluster
  { source: 'dir_physics', target: 'dir_coulomb' },
  { source: 'dir_physics', target: 'dir_barnes_hut' },
  { source: 'dir_physics', target: 'dir_quadtree' },
  { source: 'dir_physics', target: 'dir_forces' },
  { source: 'dir_barnes_hut', target: 'dir_simulation' },
  { source: 'dir_forces', target: 'dir_geometry' },
  { source: 'dir_coulomb', target: 'dir_math' },

  // Runtime cluster
  { source: 'dir_runtime', target: 'dir_sandbox' },
  { source: 'dir_runtime', target: 'dir_cache' },
  { source: 'dir_runtime', target: 'dir_sqlite' },
  { source: 'dir_sandbox', target: 'dir_wasm' },
  { source: 'dir_runtime', target: 'dir_vfs' },
  { source: 'dir_graph', target: 'dir_clustering' },

  // Major Cross-Domain Arterial Highways
  { source: 'dir_engine', target: 'dir_parser' },
  { source: 'dir_engine', target: 'dir_agent' },
  { source: 'dir_engine', target: 'dir_physics' },
  { source: 'dir_engine', target: 'dir_graph' },
  { source: 'dir_agent', target: 'dir_runtime' },
  { source: 'dir_parser', target: 'dir_runtime' },
  { source: 'dir_physics', target: 'dir_graph' },
  { source: 'dir_graph', target: 'dir_runtime' }
];

// Luminous Data Transfer Conduits (Major Inter-Folder Highways)
const DATA_HIGHWAYS = [
  { source: 'dir_engine', target: 'dir_renderer' },
  { source: 'dir_engine', target: 'dir_core' },
  { source: 'dir_engine', target: 'dir_viewport' },
  { source: 'dir_engine', target: 'dir_parser' },
  { source: 'dir_engine', target: 'dir_agent' },
  { source: 'dir_engine', target: 'dir_physics' },
  { source: 'dir_engine', target: 'dir_graph' },
  { source: 'dir_renderer', target: 'dir_shaders' },
  { source: 'dir_renderer', target: 'dir_webgpu' },
  { source: 'dir_core', target: 'dir_pipeline' },
  { source: 'dir_core', target: 'dir_canvas' },
  { source: 'dir_parser', target: 'dir_ast' },
  { source: 'dir_parser', target: 'dir_lexer' },
  { source: 'dir_parser', target: 'dir_runtime' },
  { source: 'dir_ast', target: 'dir_tree_sitter' },
  { source: 'dir_ast', target: 'dir_codegen' },
  { source: 'dir_agent', target: 'dir_orchestrator' },
  { source: 'dir_agent', target: 'dir_tools' },
  { source: 'dir_agent', target: 'dir_memory' },
  { source: 'dir_agent', target: 'dir_runtime' },
  { source: 'dir_orchestrator', target: 'dir_prompts' },
  { source: 'dir_orchestrator', target: 'dir_sandbox' },
  { source: 'dir_physics', target: 'dir_coulomb' },
  { source: 'dir_physics', target: 'dir_barnes_hut' },
  { source: 'dir_physics', target: 'dir_graph' },
  { source: 'dir_barnes_hut', target: 'dir_simulation' },
  { source: 'dir_coulomb', target: 'dir_math' },
  { source: 'dir_runtime', target: 'dir_sandbox' },
  { source: 'dir_runtime', target: 'dir_cache' },
  { source: 'dir_runtime', target: 'dir_sqlite' },
  { source: 'dir_sandbox', target: 'dir_wasm' },
  { source: 'dir_graph', target: 'dir_clustering' },
  { source: 'dir_graph', target: 'dir_runtime' }
];

// Many fast, all-blue, intensely glowing data transfer packets
const DATA_PULSES = [];
DATA_HIGHWAYS.forEach((hw, idx) => {
  // Primary forward fast data packet
  DATA_PULSES.push({
    source: hw.source,
    target: hw.target,
    speed: 0.00068 + ((idx * 7) % 5) * 0.00007,
    offset: (idx * 0.17) % 1.0,
    size: 2.6,
    glowSize: 8.5
  });
  // Staggered secondary pulse for continuous streaming flow
  if (idx % 2 === 0) {
    DATA_PULSES.push({
      source: hw.source,
      target: hw.target,
      speed: 0.00075 + ((idx * 11) % 4) * 0.00006,
      offset: (idx * 0.17 + 0.48) % 1.0,
      size: 2.3,
      glowSize: 7.2
    });
  }
  // Reverse flow on major cross-domain conduits
  if (idx % 3 === 0) {
    DATA_PULSES.push({
      source: hw.target,
      target: hw.source,
      speed: 0.00070 + ((idx * 13) % 4) * 0.00006,
      offset: (idx * 0.23 + 0.25) % 1.0,
      size: 2.5,
      glowSize: 7.8
    });
  }
});

// Authentic Software File Names for Nodes Across All 40 Directories
const FOLDER_FILE_TEMPLATES = {
  dir_engine: ['canvas.tsx', 'renderer.ts', 'viewport.ts', 'render_loop.ts', 'scene_graph.ts', 'compositor.ts', 'fps_counter.ts'],
  dir_core: ['event_bus.ts', 'lifecycle.ts', 'scheduler.ts', 'allocator.rs', 'dispatcher.ts', 'context.ts'],
  dir_renderer: ['webgpu_ctx.ts', 'framebuffer.ts', 'rasterizer.ts', 'texture_atlas.ts', 'blend_mode.ts', 'draw_calls.ts'],
  dir_shaders: ['spatial_vert.wgsl', 'pbr_frag.wgsl', 'bloom_pass.wgsl', 'fxaa.wgsl', 'compute_grid.wgsl', 'tone_map.wgsl'],
  dir_pipeline: ['compute_pass.ts', 'render_pipeline.ts', 'command_encoder.ts', 'bind_group.ts', 'depth_stencil.ts'],
  dir_webgpu: ['device_init.ts', 'adapter.ts', 'buffer_pool.ts', 'swapchain.ts', 'uniforms.ts', 'limits.ts'],
  dir_viewport: ['camera_pan.ts', 'zoom_matrix.ts', 'frustum.ts', 'coords.ts', 'projection.ts'],
  dir_canvas: ['retina_scale.ts', 'hud_overlay.ts', 'pixel_ratio.ts', 'canvas_worker.ts', 'input_events.ts'],
  dir_parser: ['ast_scanner.py', 'token_stream.py', 'semantic_pass.py', 'scope_analyser.py', 'visitor.py'],
  dir_ast: ['ast_nodes.py', 'tree_walker.py', 'visitor.py', 'folding.py', 'ast_printer.py', 'traversal.py'],
  dir_lexer: ['char_stream.rs', 'dfa_matcher.rs', 'token_emitter.rs', 'span_tracker.rs', 'unicode_lut.rs'],
  dir_tokens: ['keyword_map.rs', 'token_kind.rs', 'operator_table.rs', 'punct.rs', 'literal.rs'],
  dir_grammar: ['syntax_spec.g4', 'precedence.rs', 'rule_engine.rs', 'conflict_resolver.rs'],
  dir_tree_sitter: ['ts_wasm_bridge.rs', 'cursor_walk.rs', 'query_matcher.rs', 'edit_tracker.rs', 'parser_arena.rs'],
  dir_symbols: ['symbol_table.rs', 'scope_tree.rs', 'def_use_chain.rs', 'mangling.rs', 'visibility.rs'],
  dir_codegen: ['llvm_builder.rs', 'ir_generator.rs', 'opt_pass.rs', 'byte_emitter.rs', 'target_arch.rs'],
  dir_agent: ['orchestrator.py', 'agent_loop.py', 'task_planner.py', 'reflexion.py', 'action_space.py'],
  dir_orchestrator: ['byok_client.ts', 'stream_router.py', 'tool_broker.py', 'parallel_exec.py', 'cost_tracker.py'],
  dir_prompts: ['system_core.md', 'coder_persona.json', 'chain_prompt.json', 'eval_rubric.md', 'few_shot.json'],
  dir_context: ['sliding_window.ts', 'token_budget.ts', 'context_compressor.ts', 'cache_pin.ts', 'eviction.ts'],
  dir_tools: ['bash_tool.py', 'file_patcher.py', 'git_diff.py', 'linter_hook.py', 'grep_engine.py'],
  dir_llm: ['gemini_stream.py', 'anthropic_api.py', 'openai_compat.py', 'rate_limiter.py', 'retry_policy.py'],
  dir_memory: ['working_memory.ts', 'vector_store.ts', 'semantic_index.ts', 'episodic_log.ts'],
  dir_reasoning: ['cot_planner.py', 'tree_search.py', 'hypothesis_tester.py', 'backtracker.py'],
  dir_physics: ['coulomb.js', 'simulation_core.ts', 'verlet_solver.js', 'particle_pool.ts', 'spatial_hash.js'],
  dir_coulomb: ['repulsion_field.js', 'coulomb_grid.js', 'charge_point.js', 'potential_map.js'],
  dir_barnes_hut: ['octree_accel.ts', 'mass_center.ts', 'theta_eval.ts', 'node_cell.ts', 'multipole.ts'],
  dir_quadtree: ['quad_split.ts', 'leaf_insert.ts', 'bounding_query.ts', 'range_search.ts'],
  dir_forces: ['hooke_spring.js', 'viscosity_damping.js', 'wake_repulsion.js', 'centripetal.js'],
  dir_simulation: ['rk4_integrator.ts', 'time_step.ts', 'substep_tick.ts', 'energy_metric.ts'],
  dir_math: ['vec2.ts', 'mat3x3.ts', 'quaternion.ts', 'spline.ts', 'fast_inv_sqrt.ts'],
  dir_geometry: ['convex_hull.ts', 'delaunay_tri.ts', 'voronoi_mesh.ts', 'bounding_sphere.ts'],
  dir_runtime: ['vfs_layer.ts', 'wasm_env.rs', 'process_pipe.rs', 'signal_handler.rs', 'syscall_table.rs'],
  dir_sandbox: ['sandbox_jail.rs', 'syscall_filter.rs', 'seccomp_bpf.rs', 'chroot_env.rs'],
  dir_cache: ['lru_cache.ts', 'mmap_buffer.rs', 'page_eviction.rs', 'disk_storage.rs'],
  dir_sqlite: ['sqlite_wal.rs', 'schema_v2.sql', 'query_plan.rs', 'transact_pool.rs', 'btree_cursor.rs'],
  dir_wasm: ['runtime_glue.js', 'memory_bridge.rs', 'export_table.rs', 'import_bind.rs'],
  dir_vfs: ['virtual_inode.ts', 'path_resolver.ts', 'mount_manager.ts', 'file_handle.ts'],
  dir_graph: ['d3_worker.js', 'force_layout.ts', 'topology_builder.ts', 'edge_bundle.ts', 'spectral_layout.ts'],
  dir_clustering: ['louvain_cluster.ts', 'modularity_score.ts', 'spectral_cut.ts', 'dendrogram.ts']
};

// Ambient Nebulae for the 5 Main Territories
const AMBIENT_NEBULAE = [
  { x: 650, y: 200, color: 'rgba(6, 182, 212, 0.32)', radius: 460 },
  { x: 1700, y: 240, color: 'rgba(239, 68, 68, 0.32)', radius: 480 },
  { x: -300, y: 280, color: 'rgba(168, 85, 247, 0.32)', radius: 480 },
  { x: 220, y: 1080, color: 'rgba(129, 140, 248, 0.30)', radius: 460 },
  { x: 1520, y: 1040, color: 'rgba(245, 158, 11, 0.30)', radius: 480 }
];

// Complete Static Sidebar Hierarchy that fits the entire box without scrolling
const EXPLORER_MODULES = [
  {
    label: 'engine',
    color: '#facc15',
    files: ['canvas.tsx', 'viewport.ts', 'render.ts']
  },
  {
    label: 'renderer',
    color: '#facc15',
    files: ['webgpu_ctx.ts', 'framebuffer.ts', 'spatial_vert.wgsl']
  },
  {
    label: 'parser',
    color: '#facc15',
    files: ['ast_scanner.py', 'tree_sitter.rs', 'tokens.rs']
  },
  {
    label: 'agent',
    color: '#facc15',
    files: ['orchestrator.py', 'byok_client.ts', 'planner.py']
  },
  {
    label: 'physics',
    color: '#facc15',
    files: ['coulomb.js', 'd3_worker.js', 'barnes_hut.ts']
  },
  {
    label: 'runtime',
    color: '#facc15',
    files: ['sqlite_wal.rs', 'sandbox.rs', 'vfs.ts']
  }
];

const CLUSTER_PALETTES = {
  coral: ['#ef4444', '#f87171', '#fb7185', '#dc2626', '#fca5a5'],
  purple: ['#a855f7', '#c084fc', '#9333ea', '#7c3aed', '#d8b4fe'],
  amber: ['#f59e0b', '#fbbf24', '#d97706', '#b45309', '#fcd34d'],
  cyan: ['#06b6d4', '#22d3ee', '#38bdf8', '#0ea5e9', '#67e8f9'],
  blue: ['#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#bfdbfe'],
  indigo: ['#818cf8', '#6366f1', '#a78bfa', '#4f46e5', '#c7d2fe']
};

export default function NeuronHeroEngine() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Viewport Zoom & Pan
  const [zoom, setZoom] = useState(0.48);
  const [pan, setPan] = useState({ x: 30, y: 15 });
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  zoomRef.current = zoom;
  panRef.current = pan;

  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isCanvasFocused, setIsCanvasFocused] = useState(false);

  const selectedNodeRef = useRef(selectedNode);
  const hoveredNodeRef = useRef(hoveredNode);
  const isCanvasFocusedRef = useRef(isCanvasFocused);
  selectedNodeRef.current = selectedNode;
  hoveredNodeRef.current = hoveredNode;
  isCanvasFocusedRef.current = isCanvasFocused;

  const hintTimeoutRef = useRef(null);

  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const animFrameRef = useRef(null);
  const birthStartRef = useRef(0);
  const isBirthPlayingRef = useRef(false);

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

  const screenToWorld = useCallback((sx, sy) => {
    return {
      x: (sx - panRef.current.x) / zoomRef.current,
      y: (sy - panRef.current.y) / zoomRef.current
    };
  }, []);

  // Build the 40-Folder Universe with 500+ Organic Nodes
  const buildGalaxyTopology = useCallback(() => {
    const nodes = [];
    const edges = [];
    const folderMap = new Map();

    // 1. Add All 40 Yellow Folder Suns (Unpinned & Floating with Elastic Spring Return)
    FOLDERS_DATA.forEach((fold, fIdx) => {
      const folderNode = {
        id: fold.id,
        label: fold.label,
        type: 'folder',
        x: fold.x,
        y: fold.y,
        baseX: fold.x,
        baseY: fold.y,
        targetX: fold.x,
        targetY: fold.y,
        radius: 0,
        baseRadius: fold.radius,
        color: '#facc15', // Yellow for folders
        isHub: fold.isHub || false,
        theme: fold.theme,
        isFixed: false, // NOT STICKY - Fluid & Elastic!
        vx: 0,
        vy: 0,
        alpha: 1.0,
        targetAlpha: 1.0,
        birthDelay: fIdx * 12,
        seedX: fold.id.charCodeAt(0) * 11,
        seedY: fold.id.charCodeAt(fold.id.length - 1) * 13
      };
      nodes.push(folderNode);
      folderMap.set(fold.id, folderNode);
    });

    // 2. Folder-to-Folder Backbone Conduits
    FOLDER_LINKS.forEach((link, lIdx) => {
      edges.push({
        id: `f-link-${lIdx}`,
        source: link.source,
        target: link.target,
        type: 'folder-backbone',
        color: 'rgba(250, 204, 21, 0.22)',
        isDashed: true
      });
    });

    let nodeCounter = 0;

    // 3. Populate Multiple Asymmetric Nodes across the 40 Folders (Total 500+ nodes)
    FOLDERS_DATA.forEach((folder) => {
      // Determine node count and organic morphology per folder
      let count = 6;
      let morphology = 'cluster';

      if (folder.isHub) {
        count = 18 + (folder.id.length % 7);
        morphology = folder.theme === 'coral' ? 'dendritic' : 'spiral';
      } else if (folder.radius >= 18) {
        count = 10 + (folder.id.length % 5);
        morphology = folder.id.length % 2 === 0 ? 'orbital' : 'cluster';
      } else {
        count = 4 + (folder.id.length % 4);
        morphology = 'cluster';
      }

      const palette = CLUSTER_PALETTES[folder.theme] || CLUSTER_PALETTES.blue;
      const folderFiles = FOLDER_FILE_TEMPLATES[folder.id] || [];
      const leaves = [];

      if (morphology === 'spiral') {
        // Natural Concentric Shells (Generous clearance, NO overlapping!)
        const goldenAngle = 2.399963;
        for (let s = 0; s < count; s++) {
          const shell = s < 5 ? 0 : (s < 12 ? 1 : 2);
          const baseDist = shell === 0 
            ? (folder.radius + 40 + (s % 2) * 10) 
            : (shell === 1 ? (folder.radius + 76 + (s % 3) * 12) : (folder.radius + 115 + (s % 4) * 14));
          const angle = s * goldenAngle + ((s * 7) % 11) * 0.08;
          const fileName = folderFiles[s] || `${folder.label}_${s}.ts`;
          const isKey = s === 0 || s === 1 || (s % 4 === 0);
          leaves.push({
            relX: Math.cos(angle) * baseDist,
            relY: Math.sin(angle) * baseDist,
            dist: baseDist,
            radius: 3.2 + (s % 3) * 0.4,
            color: palette[s % palette.length],
            isCritical: folder.theme === 'coral' && s < 2,
            isSuper: folder.theme === 'cyan' && s === 0,
            isKey,
            label: fileName
          });
        }
      } else if (morphology === 'dendritic') {
        // Asymmetric Branching AST (Generously spaced rays - NO overlapping!)
        const branchCount = 3 + (count > 14 ? 1 : 0);
        let leafIdx = 0;
        for (let b = 0; b < branchCount; b++) {
          const bAngle = (b / branchCount) * Math.PI * 2 + ((b * 7) % 11) * 0.12 - 0.2;
          const bDist = folder.radius + 46 + ((b * 5) % 7) * 6;
          const bx = Math.cos(bAngle) * bDist;
          const by = Math.sin(bAngle) * bDist;
          const fileName = folderFiles[leafIdx] || `ast_node_${b}.py`;
          leaves.push({
            relX: bx,
            relY: by,
            dist: bDist,
            radius: 4.2,
            color: '#ef4444', // Red for critical AST
            isCritical: true,
            isKey: true,
            label: fileName
          });
          leafIdx++;

          const subCount = Math.floor((count - branchCount) / branchCount);
          for (let sub = 0; sub < subCount; sub++) {
            const subAngle = bAngle + (sub - (subCount - 1) / 2) * 0.46;
            const subDist = bDist + 38 + sub * 24;
            const subX = Math.cos(subAngle) * subDist;
            const subY = Math.sin(subAngle) * subDist;
            const subLabel = folderFiles[leafIdx] || `${folder.label}_leaf_${sub}.py`;
            leaves.push({
              relX: subX,
              relY: subY,
              dist: subDist,
              radius: 3.0,
              color: palette[leafIdx % palette.length],
              isCritical: leafIdx % 4 === 0,
              isKey: sub === 0,
              label: subLabel
            });
            leafIdx++;
          }
        }
      } else if (morphology === 'orbital') {
        // Natural Tilted Elliptical Orbits with generous clearance
        for (let m = 0; m < count; m++) {
          const t = (m / count) * Math.PI * 2 + ((m * 7) % 11) * 0.1;
          const rx = folder.radius + 48 + (m % 2) * 36;
          const ry = folder.radius + 36 + (m % 2) * 26;
          const tilt = 0.32;
          const ox = Math.cos(t) * rx;
          const oy = Math.sin(t) * ry;
          const relX = ox * Math.cos(tilt) - oy * Math.sin(tilt);
          const relY = ox * Math.sin(tilt) + oy * Math.cos(tilt);
          const fileName = folderFiles[m] || `${folder.label}_${m}.rs`;
          const isKey = m === 0 || m === 2;
          leaves.push({
            relX,
            relY,
            dist: Math.hypot(relX, relY),
            radius: 3.2,
            color: palette[m % palette.length],
            isCritical: false,
            isKey,
            label: fileName
          });
        }
      } else {
        // Natural Loose Organic Cluster (Generous clearance)
        for (let c = 0; c < count; c++) {
          const angle = (c / count) * Math.PI * 2 + ((c * 13) % 9) * 0.1;
          const dist = folder.radius + 42 + c * 22;
          const fileName = folderFiles[c] || `${folder.label}_${c}.js`;
          const isKey = c === 0;
          leaves.push({
            relX: Math.cos(angle) * dist,
            relY: Math.sin(angle) * dist,
            dist,
            radius: 3.0,
            color: palette[c % palette.length],
            isCritical: false,
            isKey,
            label: fileName
          });
        }
      }

      leaves.forEach((lf, lIdx) => {
        nodeCounter++;
        const targetX = folder.x + lf.relX;
        const targetY = folder.y + lf.relY;
        const birthDelay = 80 + nodeCounter * 6;

        let nodeColor = lf.color;
        if (lf.isCritical) nodeColor = '#ef4444'; // Semantic Red
        if (lf.isSuper) nodeColor = '#38bdf8'; // Semantic Cyan

        const childNode = {
          id: `${folder.id}_node_${lIdx}`,
          label: lf.label,
          type: lf.isSuper ? 'supernode' : (lf.isCritical ? 'critical' : 'node'),
          parentId: folder.id,
          x: folder.x,
          y: folder.y,
          baseX: targetX,
          baseY: targetY,
          targetX: targetX,
          targetY: targetY,
          radius: 0,
          baseRadius: lf.isSuper ? 11 : (lf.isCritical ? 9 : lf.radius),
          color: nodeColor,
          isSuper: lf.isSuper || false,
          isCritical: lf.isCritical || false,
          isKey: lf.isKey || false,
          isFixed: false,
          vx: 0,
          vy: 0,
          alpha: 1.0,
          targetAlpha: 1.0,
          birthDelay,
          seedX: nodeCounter * 17,
          seedY: nodeCounter * 23
        };
        nodes.push(childNode);

        edges.push({
          id: `e-${folder.id}-${childNode.id}`,
          source: folder.id,
          target: childNode.id,
          type: 'folder-child',
          restLength: lf.dist,
          color: lf.isCritical ? 'rgba(239, 68, 68, 0.28)' : 'rgba(255, 255, 255, 0.12)'
        });
      });
    });

    // 4. Force Relaxation (100 iterations, strictly preventing ANY overlap)
    for (let iter = 0; iter < 100; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          if (Math.abs(dx) > 120 || Math.abs(dy) > 120) continue;

          const distSq = dx * dx + dy * dy || 1;
          const isFolder = a.type === 'folder' || b.type === 'folder';
          const minDist = isFolder 
            ? (a.baseRadius + b.baseRadius + 32) 
            : (a.baseRadius + b.baseRadius + 24);

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const push = (minDist - dist) * 0.35;
            const fx = (dx / dist) * push;
            const fy = (dy / dist) * push;
            if (a.type !== 'folder') { a.x -= fx; a.y -= fy; a.baseX -= fx; a.baseY -= fy; a.targetX -= fx; a.targetY -= fy; }
            if (b.type !== 'folder') { b.x += fx; b.y += fy; b.baseX += fx; b.baseY += fy; b.targetX += fx; b.targetY += fy; }
          }
        }
      }
    }

    // Update edge rest lengths to match relaxed distances
    edges.forEach(e => {
      const s = folderMap.get(e.source) || nodes.find(n => n.id === e.source);
      const t = folderMap.get(e.target) || nodes.find(n => n.id === e.target);
      if (s && t) {
        e.restLength = Math.hypot(t.baseX - s.baseX, t.baseY - s.baseY);
      }
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  const handleRefactor = useCallback(() => {
    buildGalaxyTopology();
    birthStartRef.current = performance.now();
    isBirthPlayingRef.current = true;
  }, [buildGalaxyTopology]);

  useEffect(() => {
    handleRefactor();
  }, [handleRefactor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateCenter = () => {
      if (canvas.clientWidth > 0) {
        setPan({
          x: canvas.clientWidth / 2 - 540 * zoomRef.current,
          y: canvas.clientHeight / 2 - 450 * zoomRef.current
        });
      }
    };
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  // -------------------------------------------------------------------------
  // CONFLICT-FREE NATIVE WHEEL LISTENER (Prevents Whole-Website Zoom)
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleNativeWheel = (e) => {
      const isZoomGesture = e.ctrlKey || e.metaKey || isCanvasFocusedRef.current;

      if (isZoomGesture) {
        e.preventDefault();
        e.stopPropagation();

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
        const currentZoom = zoomRef.current;
        const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.18), 2.5);

        const worldBefore = screenToWorld(mouseX, mouseY);
        setZoom(newZoom);
        setPan({
          x: mouseX - worldBefore.x * newZoom,
          y: mouseY - worldBefore.y * newZoom
        });
      } else {
        setShowScrollHint(true);
        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = setTimeout(() => setShowScrollHint(false), 1400);
      }
    };

    canvas.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', handleNativeWheel);
    };
  }, [screenToWorld]);

  // -------------------------------------------------------------------------
  // 60 FPS MAIN RENDER & LIQUID VISCOUS PHYSICS LOOP
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let prevTime = performance.now();

    const render = (time) => {
      const dt = Math.min(time - prevTime, 64);
      prevTime = time;

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

      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      const elapsedBirth = isBirthPlayingRef.current ? time - birthStartRef.current : 999999;
      const mouseWorld = mouseRef.current;

      // 1. Birth Staggering
      nodes.forEach(node => {
        if (node.type === 'folder') {
          const tSun = Math.min(elapsedBirth / 400, 1.0);
          const easeSun = 1 - Math.pow(1 - tSun, 3);
          node.radius = node.baseRadius * easeSun;
          if (elapsedBirth < 400) {
            node.x = node.baseX;
            node.y = node.baseY;
          }
          return;
        }

        const parent = nodeMap.get(node.parentId);
        const originX = parent ? parent.x : node.baseX;
        const originY = parent ? parent.y : node.baseY;

        if (elapsedBirth < node.birthDelay) {
          node.radius = 0;
          node.x = originX;
          node.y = originY;
        } else if (elapsedBirth < node.birthDelay + 500) {
          const u = (elapsedBirth - node.birthDelay) / 500;
          const easeProgress = 1 - Math.pow(1 - u, 3);
          node.radius = node.baseRadius * easeProgress;
          node.x = originX + (node.targetX - originX) * easeProgress;
          node.y = originY + (node.targetY - originY) * easeProgress;
        } else {
          node.radius = node.baseRadius;
        }
      });

      // 2. LIQUID VISCOUS PHYSICS ("Stone Moving Through Water")
      const WAKE_RADIUS = 110;
      const hasCursor = mouseWorld.screenX > 0 && mouseWorld.screenY > 0;

      nodes.forEach(node => {
        if (node.isFixed) return;
        if (elapsedBirth < node.birthDelay + 400) return;
        if (node.isDragged) return;

        const isFolder = node.type === 'folder';

        // Force 1: Proximity Repulsion Wake (< 110px, or 130px for folders)
        if (hasCursor) {
          const mdx = node.x - mouseWorld.worldX;
          const mdy = node.y - mouseWorld.worldY;
          const mDist = Math.hypot(mdx, mdy) || 1;

          const wakeRadius = isFolder ? 130 : 110;
          if (mDist < wakeRadius) {
            const proximity = (wakeRadius - mDist) / wakeRadius;
            const pushForce = Math.pow(proximity, 1.3) * (isFolder ? 2.4 : 3.4);
            node.vx += (mdx / mDist) * pushForce;
            node.vy += (mdy / mDist) * pushForce;
          }
        }

        // Force 2: Spring Return to Anchor + Plankton Drift
        const driftAmp = isFolder ? 0.35 : 0.65;
        const driftX = Math.sin(time * 0.0011 + node.seedX) * driftAmp;
        const driftY = Math.cos(time * 0.0009 + node.seedY) * driftAmp;

        const springK = isFolder ? 0.045 : 0.075;
        const springX = ((node.baseX + driftX) - node.x) * springK;
        const springY = ((node.baseY + driftY) - node.y) * springK;

        // Force 3: Viscosity Damping (0.85 = liquid mercury / gelatin jiggle!)
        node.vx = (node.vx + springX) * 0.85;
        node.vy = (node.vy + springY) * 0.85;

        node.x += node.vx;
        node.y += node.vy;
      });

      // Force 4: Chain-Reaction Waves along Edges (Pushed node ripples to neighbors)
      edges.forEach(edge => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target || source.radius <= 0 || target.radius <= 0) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.hypot(dx, dy) || 1;
        const restLength = edge.restLength || Math.hypot(target.baseX - source.baseX, target.baseY - source.baseY);
        const delta = dist - restLength;

        const springTension = edge.type === 'folder-backbone' ? 0.012 : 0.022;
        const fx = (dx / dist) * delta * springTension;
        const fy = (dy / dist) * delta * springTension;

        if (!source.isFixed && !source.isDragged) {
          source.vx += fx;
          source.vy += fy;
        }
        if (!target.isFixed && !target.isDragged) {
          target.vx -= fx;
          target.vy -= fy;
        }
      });

      // Force 5: Soft Anti-Overlap Magnetic Repulsion
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.radius <= 0.5) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.radius <= 0.5) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          if (Math.abs(dx) > 32 || Math.abs(dy) > 32) continue;

          const distSq = dx * dx + dy * dy || 1;
          const minDist = a.radius + b.radius + 8;
          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const rep = ((minDist - dist) / minDist) * 0.5;
            const rx = (dx / dist) * rep;
            const ry = (dy / dist) * rep;

            if (!a.isFixed && !a.isDragged) { a.vx -= rx; a.vy -= ry; }
            if (!b.isFixed && !b.isDragged) { b.vx += rx; b.vy += ry; }
          }
        }
      }

      // 3. Cinematic Depth-of-Field
      const activeId = selectedNodeRef.current?.id || hoveredNodeRef.current?.id;
      const focusedIds = new Set();
      if (activeId) {
        focusedIds.add(activeId);
        edges.forEach(e => {
          if (e.source === activeId) focusedIds.add(e.target);
          if (e.target === activeId) focusedIds.add(e.source);
        });
      }

      nodes.forEach(node => {
        const targetAlpha = activeId ? (focusedIds.has(node.id) ? 1.0 : 0.08) : 1.0;
        node.alpha += (targetAlpha - node.alpha) * 0.14;
      });

      // 4. RENDERING PASS
      ctx.save();
      ctx.translate(panRef.current.x, panRef.current.y);
      ctx.scale(zoomRef.current, zoomRef.current);

      // Ambient Cosmic Nebulae
      AMBIENT_NEBULAE.forEach(neb => {
        ctx.save();
        const grad = ctx.createRadialGradient(neb.x, neb.y, 10, neb.x, neb.y, neb.radius);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(0.35, neb.color.replace('0.32', '0.18').replace('0.30', '0.16'));
        grad.addColorStop(0.70, neb.color.replace('0.32', '0.06').replace('0.30', '0.05'));
        grad.addColorStop(1.0, 'rgba(8, 9, 12, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Silk Thread Conduits & Dashed Folder Backbones
      edges.forEach((edge) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target || source.radius <= 0 || target.radius <= 0) return;

        let alpha = Math.min(source.alpha, target.alpha);
        if (alpha < 0.02) return;

        let lineWidth = edge.type === 'folder-backbone' ? 1.0 : 0.65;
        let strokeStyle = edge.color;

        if (activeId) {
          const isConnected = focusedIds.has(source.id) && focusedIds.has(target.id);
          alpha = isConnected ? 0.95 : 0.03;
          if (isConnected) lineWidth = 1.8;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        if (edge.isDashed) {
          ctx.setLineDash([4, 4]);
        }

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.restore();
      });

      // Luminous Glow on Data Transfer Conduits (Highways)
      DATA_HIGHWAYS.forEach(hw => {
        const source = nodeMap.get(hw.source);
        const target = nodeMap.get(hw.target);
        if (!source || !target || source.radius <= 0 || target.radius <= 0) return;

        let highwayAlpha = Math.min(source.alpha, target.alpha);
        if (highwayAlpha < 0.02) return;

        if (activeId) {
          const isConnected = focusedIds.has(source.id) && focusedIds.has(target.id);
          highwayAlpha = isConnected ? 0.95 : 0.05;
        }

        ctx.save();
        ctx.globalAlpha = highwayAlpha * 0.85;

        // Outer neon glow stroke
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.32)';
        ctx.lineWidth = 3.2;
        ctx.stroke();

        // Inner electric laser beam
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.75)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        ctx.restore();
      });

      // Fast, All-Blue, Glowing Data Balls Traveling Between Nodes (with Comet Tails)
      DATA_PULSES.forEach(pkt => {
        const source = nodeMap.get(pkt.source);
        const target = nodeMap.get(pkt.target);
        if (!source || !target || source.radius <= 0 || target.radius <= 0) return;

        let pktAlpha = 1.0;
        if (activeId && !focusedIds.has(pkt.source) && !focusedIds.has(pkt.target)) {
          pktAlpha = 0.08;
        }

        const progress = (time * pkt.speed + pkt.offset) % 1.0;
        const px = source.x + (target.x - source.x) * progress;
        const py = source.y + (target.y - source.y) * progress;

        ctx.save();
        ctx.globalAlpha = pktAlpha;

        // Luminous Comet Tail (trailing behind moving ball)
        const tailLength = 0.055;
        const tailProgress = Math.max(0, progress - tailLength);
        const tx = source.x + (target.x - source.x) * tailProgress;
        const ty = source.y + (target.y - source.y) * tailProgress;

        const tailGrad = ctx.createLinearGradient(tx, ty, px, py);
        tailGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
        tailGrad.addColorStop(1, 'rgba(56, 189, 248, 0.85)');

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Outer Radiant Glow Aura
        ctx.beginPath();
        ctx.arc(px, py, pkt.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.26)';
        ctx.fill();

        // Mid Vivid Electric Blue Halo
        ctx.beginPath();
        ctx.arc(px, py, pkt.glowSize * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96, 165, 250, 0.70)';
        ctx.fill();

        // Intense White-Cyan Core Star
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f9ff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.restore();
      });

      // Draw Nodes
      nodes.forEach(node => {
        if (node.radius <= 0.2) return;

        ctx.save();
        ctx.globalAlpha = node.alpha;

        // Radiant Halos
        if (node.isSuper && node.radius > 4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.26)';
          ctx.fill();
        } else if (node.isCritical && node.radius > 4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
          ctx.fill();
        }

        // Solid Vector Disc
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Labels
        const isFocused = activeId && focusedIds.has(node.id);
        const isHovered = hoveredNodeRef.current?.id === node.id;
        const isSelected = selectedNodeRef.current?.id === node.id;
        const shouldShowLabel = showLabels && (node.type === 'folder' || node.isSuper || node.isCritical || node.isKey || isFocused || isHovered || isSelected);

        if (shouldShowLabel && node.label && node.radius > 3.2) {
          ctx.save();
          ctx.font = node.type === 'folder' 
            ? '600 11px ui-monospace, SFMono-Regular, Menlo, monospace' 
            : ((node.isSuper || node.isCritical || isHovered) ? '600 9.5px ui-monospace, SFMono-Regular, Menlo, monospace' : '400 9px ui-monospace, SFMono-Regular, Menlo, monospace');
          
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          // On hover/focus, render a crisp dark backdrop pill for maximum readability
          if (isHovered || isSelected || isFocused) {
            const metrics = ctx.measureText(node.label);
            const padX = 5;
            const padY = 2;
            const textY = node.y + node.radius + 4;
            ctx.fillStyle = 'rgba(8, 10, 16, 0.88)';
            ctx.strokeStyle = isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.roundRect(node.x - metrics.width / 2 - padX, textY - padY, metrics.width + padX * 2, 14 + padY * 2, 3);
            ctx.fill();
            ctx.stroke();
          }

          ctx.fillStyle = (isHovered || isSelected || isFocused) 
            ? '#ffffff' 
            : (node.type === 'folder' ? '#fde047' : (node.isCritical ? '#fca5a5' : (node.isSuper ? '#7dd3fc' : '#cbd5e1')));
          
          ctx.fillText(node.label, node.x, node.y + node.radius + 4);
          ctx.restore();
        }

        ctx.restore();
      });

      ctx.restore();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [showLabels]);

  // Pointer Interactions
  const findNodeAt = useCallback((worldX, worldY) => {
    const nodes = nodesRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (n.radius <= 0) continue;
      const hitRadius = Math.max(n.radius + 8, 14);
      const dist = Math.hypot(worldX - n.x, worldY - n.y);
      if (dist <= hitRadius) return n;
    }
    return null;
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsCanvasFocused(true);

    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const world = screenToWorld(screenX, screenY);

    mouseRef.current.screenX = screenX;
    mouseRef.current.screenY = screenY;
    mouseRef.current.worldX = world.x;
    mouseRef.current.worldY = world.y;
    mouseRef.current.isDown = true;

    const hit = findNodeAt(world.x, world.y);
    if (hit) {
      setSelectedNode(hit);
      hit.isDragged = true;
      mouseRef.current.draggedNode = hit;
    } else {
      setSelectedNode(null);
      mouseRef.current.isPanning = true;
      mouseRef.current.panStart = {
        x: screenX - panRef.current.x,
        y: screenY - panRef.current.y
      };
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const world = screenToWorld(screenX, screenY);

    mouseRef.current.screenX = screenX;
    mouseRef.current.screenY = screenY;
    mouseRef.current.worldX = world.x;
    mouseRef.current.worldY = world.y;

    if (mouseRef.current.draggedNode) {
      const node = mouseRef.current.draggedNode;
      node.x = world.x;
      node.y = world.y;
      node.vx = 0;
      node.vy = 0;
      return;
    }

    if (mouseRef.current.isPanning) {
      setPan({
        x: screenX - mouseRef.current.panStart.x,
        y: screenY - mouseRef.current.panStart.y
      });
      return;
    }

    const hit = findNodeAt(world.x, world.y);
    setHoveredNode(hit);
  };

  const handlePointerUp = () => {
    if (mouseRef.current.draggedNode) {
      mouseRef.current.draggedNode.isDragged = false;
      mouseRef.current.draggedNode = null;
    }
    mouseRef.current.isDown = false;
    mouseRef.current.isPanning = false;
  };

  const handlePointerLeave = () => {
    mouseRef.current.screenX = -1000;
    mouseRef.current.screenY = -1000;
    mouseRef.current.worldX = -1000;
    mouseRef.current.worldY = -1000;
    mouseRef.current.isDown = false;
    mouseRef.current.isPanning = false;
    if (mouseRef.current.draggedNode) {
      mouseRef.current.draggedNode.isDragged = false;
      mouseRef.current.draggedNode = null;
    }
    setHoveredNode(null);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.15, 2.5));
  const handleZoomOut = () => setZoom(z => Math.max(z * 0.85, 0.18));
  const handleResetZoom = () => {
    setZoom(0.48);
    const canvas = canvasRef.current;
    if (canvas) {
      setPan({
        x: canvas.clientWidth / 2 - 540 * 0.48,
        y: canvas.clientHeight / 2 - 450 * 0.48
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onBlur={() => setIsCanvasFocused(false)}
      className="w-full h-[560px] md:h-[600px] bg-[#08090c] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans select-none relative text-left"
    >
      {/* 1. TOP TITLEBAR */}
      <div className="h-9 border-b border-white/[0.08] bg-[#0e1017] px-4 flex items-center justify-between text-xs text-slate-400 shrink-0 select-none">
        <div className="flex items-center">
          <span className="text-slate-300 font-mono text-[11px] font-semibold tracking-wide">Neuron IDE</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <span className="text-slate-500">topology</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200">main</span>
        </div>
      </div>

      {/* 2. WORKSPACE: Clean Static File Explorer (No scrolling, no interaction) + Massive Living Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Clean Static File Explorer */}
        <div className="w-48 sm:w-56 border-r border-white/[0.08] bg-[#0a0b10] flex flex-col shrink-0 text-left overflow-hidden select-none">
          <div className="h-8 px-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/[0.06] bg-[#0d0e14]">
            <span>EXPLORER</span>
          </div>

          <div className="flex-1 p-2 font-mono text-[11px] select-none text-left overflow-hidden">
            <div className="space-y-3 text-left">
              {EXPLORER_MODULES.map(group => (
                <div key={group.label} className="space-y-1">
                  <div className="flex items-center gap-1.5 px-1 py-0.5 text-slate-300 font-medium select-none">
                    <Folder size={12} style={{ color: group.color }} className="shrink-0" />
                    <span className="text-[11px]">{group.label}</span>
                  </div>

                  <div className="pl-3.5 space-y-0.5">
                    {group.files.map(fName => (
                      <div
                        key={fName}
                        className="px-2 py-0.5 rounded truncate flex items-center gap-1.5 text-slate-400 select-none"
                      >
                        <FileCode2 size={11} className="shrink-0 text-slate-500" />
                        <span className="truncate text-[11px]">{fName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Central Spatial Canvas Viewport */}
        <div className="flex-1 flex flex-col relative overflow-hidden text-left bg-[#08090c]">
          
          {/* Canvas HUD Header */}
          <div className="h-8 border-b border-white/[0.08] flex items-center justify-between px-3 text-xs bg-[#0e1017]">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] font-mono">spatial_universe</span>
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

              {/* Replay Birth Button */}
              <button
                onClick={startCelestialBirth}
                className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-300 hover:text-white transition-all cursor-pointer text-[10px] font-mono flex items-center gap-1"
                title="Replay celestial birth animation"
              >
                <RotateCcw size={10} />
                <span>Replay Birth</span>
              </button>
            </div>
          </div>

          {/* 60 FPS Canvas Viewport */}
          <div className="flex-1 w-full h-full relative bg-[#08090c]">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              className="w-full h-full cursor-grab active:cursor-grabbing block touch-none"
            />

            {/* Conflict-Free Scroll Hint Toast */}
            {showScrollHint && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-opacity duration-200">
                <div className="px-3 py-1 bg-black/80 backdrop-blur border border-white/15 rounded-full text-[11px] font-mono text-slate-300 shadow-xl flex items-center gap-1.5">
                  <span className="px-1 py-0.2 bg-white/10 rounded text-[10px] text-slate-200">Ctrl</span>
                  <span>+ scroll to zoom graph</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
