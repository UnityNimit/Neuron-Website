import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Folder, FileCode2, ZoomIn, ZoomOut, RotateCcw, Type,
  Minus, Square, X, Files, GitBranch, Sparkles, Settings,
  Palette, ChevronDown, ChevronRight, FilePlus, FolderPlus,
  RefreshCw, ListCollapse, Network, Play, Trash2, Bell, Check, CheckCircle2, UserCircle
} from 'lucide-react';

// The 5 official built-in themes directly matching frontend/src/config/themeConfig.js
const THEMES_MAP = {
  black: {
    id: 'black',
    name: 'Obsidian Black',
    isDark: true,
    primary: '#121212',
    secondary: '#191a1b',
    background: '#121314',
    surface: '#161719',
    surfaceHover: '#222426',
    surfaceActive: '#2a2c2e',
    border: '#242628',
    borderSubtle: '#2e3032',
    textBright: '#f8fafc',
    textPrimary: '#e2e8f0',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    accent: '#3b82f6',
    folderIcon: '#dcb67a',
    circleColor: '#121212',
    circleBorder: '#4b5563',
    laserBridge: '#00f0ff'
  },
  white: {
    id: 'white',
    name: 'Alabaster White',
    isDark: false,
    primary: '#e8eaed',
    secondary: '#f1f3f4',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceHover: '#e4e7eb',
    surfaceActive: '#dadce0',
    border: '#dadce0',
    borderSubtle: '#d0d4d9',
    textBright: '#111827',
    textPrimary: '#1f2937',
    textSecondary: '#4b5563',
    textMuted: '#6b7280',
    accent: '#2563eb',
    folderIcon: '#b45309',
    circleColor: '#ffffff',
    circleBorder: '#cbd5e1',
    laserBridge: '#0284c7'
  },
  pink: {
    id: 'pink',
    name: 'Sakura Rose',
    isDark: true,
    primary: '#1e111a',
    secondary: '#271622',
    background: '#180c14',
    surface: '#2e1828',
    surfaceHover: '#381b31',
    surfaceActive: '#47223e',
    border: '#3c1e33',
    borderSubtle: '#4a253f',
    textBright: '#fff1f2',
    textPrimary: '#fce7f3',
    textSecondary: '#f472b6',
    textMuted: '#9d6a89',
    accent: '#ec4899',
    folderIcon: '#f472b6',
    circleColor: '#f472b6',
    circleBorder: '#fb7185',
    laserBridge: '#f472b6'
  },
  galaxy: {
    id: 'galaxy',
    name: 'Galaxy Dark Blue',
    isDark: true,
    primary: '#090d16',
    secondary: '#0e1422',
    background: '#080b12',
    surface: '#121929',
    surfaceHover: '#1a243a',
    surfaceActive: '#243252',
    border: '#1c2842',
    borderSubtle: '#253556',
    textBright: '#f0f6fc',
    textPrimary: '#cbd5e1',
    textSecondary: '#8ba2c4',
    textMuted: '#506689',
    accent: '#38bdf8',
    folderIcon: '#38bdf8',
    circleColor: '#0e172a',
    circleBorder: '#38bdf8',
    laserBridge: '#38bdf8'
  },
  rosewater: {
    id: 'rosewater',
    name: 'Sakura Mist',
    isDark: false,
    primary: '#fdf2f4',
    secondary: '#fff1f4',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceHover: '#fce7ec',
    surfaceActive: '#fad2df',
    border: '#f4d3dc',
    borderSubtle: '#eabecb',
    textBright: '#1e141a',
    textPrimary: '#36222e',
    textSecondary: '#6b495d',
    textMuted: '#967285',
    accent: '#db2777',
    folderIcon: '#db2777',
    circleColor: '#fce7ec',
    circleBorder: '#db2777',
    laserBridge: '#db2777'
  }
};

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
  { id: 'dir_coulomb', label: 'coulomb', x: -20, y: 900, radius: 19, theme: 'indigo' },
  { id: 'dir_barnes_hut', label: 'barnes_hut', x: 420, y: 940, radius: 18, theme: 'indigo' },
  { id: 'dir_quadtree', label: 'quadtree', x: 340, y: 1180, radius: 17, theme: 'indigo' },
  { id: 'dir_forces', label: 'forces', x: 100, y: 1200, radius: 17, theme: 'indigo' },
  { id: 'dir_simulation', label: 'simulation', x: 600, y: 1080, radius: 18, theme: 'indigo' },
  { id: 'dir_math', label: 'math', x: -100, y: 1060, radius: 16, theme: 'indigo' },
  { id: 'dir_geometry', label: 'geometry', x: 0, y: 1320, radius: 16, theme: 'indigo' },

  // --- Domain 5: Runtime, Storage & Graph (Bottom-Right) ---
  { id: 'dir_runtime', label: 'runtime', x: 1460, y: 1020, radius: 22, isHub: true, theme: 'amber' },
  { id: 'dir_sandbox', label: 'sandbox', x: 1700, y: 900, radius: 20, theme: 'amber' },
  { id: 'dir_cache', label: 'cache', x: 1240, y: 900, radius: 18, theme: 'amber' },
  { id: 'dir_sqlite', label: 'sqlite', x: 1660, y: 1160, radius: 18, theme: 'amber' },
  { id: 'dir_wasm', label: 'wasm', x: 1860, y: 1020, radius: 17, theme: 'amber' },
  { id: 'dir_vfs', label: 'vfs', x: 1360, y: 1200, radius: 17, theme: 'amber' },
  { id: 'dir_graph', label: 'graph', x: 800, y: 1120, radius: 22, isHub: true, theme: 'amber' },
  { id: 'dir_clustering', label: 'clustering', x: 1040, y: 1200, radius: 19, theme: 'amber' }
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

// Exactly 3 high-visibility data transfer packets flowing steadily along cross-domain highways
const DATA_PULSES = [
  // Highway 1: Simulation -> Engine
  { source: 'dir_simulation_node_0', target: 'dir_engine_node_0', speed: 0.00085, offset: 0.0, size: 3.8, glowSize: 11 },
  // Highway 2: Physics -> Parser
  { source: 'dir_physics_node_0', target: 'dir_parser_node_0', speed: 0.00092, offset: 0.35, size: 3.8, glowSize: 11 },
  // Highway 3: Agent -> Runtime
  { source: 'dir_agent_node_0', target: 'dir_runtime_node_0', speed: 0.00080, offset: 0.70, size: 3.8, glowSize: 11 }
];

// Arterial highways: strictly the conduits where active data transfers flow (Zero empty blue lines)
const FILE_HIGHWAYS = DATA_PULSES.map(p => ({ source: p.source, target: p.target }));

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

// Dynamic Cluster Color Halos (moves organically with the files & folders)
const CLUSTER_GLOW_COLORS = {
  cyan: 'rgba(6, 182, 212, 0.28)',
  coral: 'rgba(239, 68, 68, 0.28)',
  purple: 'rgba(168, 85, 247, 0.28)',
  indigo: 'rgba(129, 140, 248, 0.28)',
  amber: 'rgba(245, 158, 11, 0.28)'
};

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

// Cross-cluster bridge palettes: in each cluster, 1 or 2 nodes have foreign cluster colors
const CROSS_CLUSTER_PALETTES = {
  coral: ['#38bdf8', '#a855f7', '#fbbf24'],   // In Red cluster: Cyan, Purple, Amber
  purple: ['#ef4444', '#38bdf8', '#fbbf24'],  // In Purple cluster: Red, Cyan, Amber
  cyan: ['#a855f7', '#ef4444', '#fbbf24'],    // In Cyan cluster: Purple, Red, Amber
  indigo: ['#38bdf8', '#ef4444', '#a855f7'],  // In Indigo cluster: Cyan, Red, Purple
  amber: ['#38bdf8', '#a855f7', '#ef4444']    // In Amber cluster: Cyan, Purple, Red
};

// Massive Unified Cluster Nebulae (Soft, atmospheric, dulled-down ambient cosmic clouds)
const CLUSTER_NEBULA_THEMES = {
  coral: {
    // Parser, AST & Compiler: Soft Crimson Cosmic Nebula ("all of it is red")
    inner: 'rgba(239, 68, 68, 0.16)',
    mid: 'rgba(220, 38, 38, 0.08)',
    outer: 'rgba(185, 28, 28, 0.02)',
    edge: 'rgba(8, 9, 12, 0)'
  },
  purple: {
    // Agent, Reasoning & LLM: Soft Cosmic Purple Nebula
    inner: 'rgba(168, 85, 247, 0.14)',
    mid: 'rgba(147, 51, 234, 0.07)',
    outer: 'rgba(126, 34, 206, 0.015)',
    edge: 'rgba(8, 9, 12, 0)'
  },
  cyan: {
    // Core Engine & Graphics: Soft Electric Cyan Aurora
    inner: 'rgba(6, 182, 212, 0.14)',
    mid: 'rgba(14, 165, 233, 0.07)',
    outer: 'rgba(2, 132, 199, 0.015)',
    edge: 'rgba(8, 9, 12, 0)'
  },
  indigo: {
    // Physics & Simulation: Soft Indigo Celestial Void
    inner: 'rgba(99, 102, 241, 0.14)',
    mid: 'rgba(79, 70, 229, 0.07)',
    outer: 'rgba(67, 56, 202, 0.015)',
    edge: 'rgba(8, 9, 12, 0)'
  },
  amber: {
    // Runtime, Storage & Graph: Soft Warm Amber Stellar Cloud
    inner: 'rgba(245, 158, 11, 0.13)',
    mid: 'rgba(217, 119, 6, 0.06)',
    outer: 'rgba(180, 83, 9, 0.015)',
    edge: 'rgba(8, 9, 12, 0)'
  }
};

export default function NeuronHeroEngine() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Viewport Zoom & Pan: Starts deeply zoomed in on root node dir_engine, gracefully revealing the growing tree
  const zoomRef = useRef(1.85);
  const panRef = useRef({ x: 0, y: 0 });
  const [zoomDisplay, setZoomDisplay] = useState(185);

  // 5 Official Themes directly matching themeConfig.js
  const [activeThemeId, setActiveThemeId] = useState('black');
  const activeTheme = THEMES_MAP[activeThemeId] || THEMES_MAP.black;
  const activeThemeRef = useRef(activeTheme);
  activeThemeRef.current = activeTheme;
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  // Window Menu & Sidebar Layout State
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSidebarView, setActiveSidebarView] = useState('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDocTab, setActiveDocTab] = useState('spatial');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [activeTerminalTab, setActiveTerminalTab] = useState('powershell');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { 
      cmd: 'git status', 
      stdout: 'On branch main\nYour branch is up to date with \'origin/main\'.\nChanges not staged for commit:\n  modified:   src/App.jsx\n  modified:   src/components/canvas/PixiSpatialEngine.jsx\n\nUntracked files:\n  src/services/astBridge.ts' 
    }
  ]);
  const [openFolders, setOpenFolders] = useState({
    neuron: true,
    backend: true,
    frontend: true,
    src: true,
    components: false,
    config: false
  });
  const menuRef = useRef(null);
  const themePopoverRef = useRef(null);
  const themeButtonRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
      if (
        themePopoverRef.current && 
        !themePopoverRef.current.contains(e.target) &&
        themeButtonRef.current &&
        !themeButtonRef.current.contains(e.target)
      ) {
        setIsThemePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isCanvasFocused, setIsCanvasFocused] = useState(false);

  const selectedNodeRef = useRef(selectedNode);
  const hoveredNodeRef = useRef(hoveredNode);
  const isCanvasFocusedRef = useRef(isCanvasFocused);
  const userInteractedRef = useRef(false);
  selectedNodeRef.current = selectedNode;
  hoveredNodeRef.current = hoveredNode;
  isCanvasFocusedRef.current = isCanvasFocused;

  const hintTimeoutRef = useRef(null);

  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const animFrameRef = useRef(null);
  const birthStartRef = useRef(0);
  const isBirthPlayingRef = useRef(false);
  const hasStartedAnimRef = useRef(false);
  const isRefactoringRef = useRef(false);
  const refactorStartRef = useRef(0);
  const isVisibleRef = useRef(false);
  const renderTriggerRef = useRef(null);

  const mouseRef = useRef({
    screenX: -1000,
    screenY: -1000,
    worldX: -1000,
    worldY: -1000,
    isDown: false,
    isPanning: false,
    panStart: { x: 0, y: 0 },
    draggedNode: null,
    lastDragPos: { x: 0, y: 0 }
  });

  const screenToWorld = useCallback((sx, sy) => {
    return {
      x: (sx - panRef.current.x) / zoomRef.current,
      y: (sy - panRef.current.y) / zoomRef.current
    };
  }, []);

  // Build the 40-Folder Universe with 500+ Organic Nodes & Tree-Growing Hierarchy
  const buildGalaxyTopology = useCallback(() => {
    const nodes = [];
    const edges = [];
    const folderMap = new Map();

    // 1. Synchronize folder birth with the multi-waypoint camera tour:
    // Waypoint 1: Cyan (Engine) -> Waypoint 2: Coral (Parser) -> Waypoint 3: Indigo (Physics) -> Full Reveal (Purple & Amber)
    const treeOrderMap = new Map();
    const domainBaseTimes = {
      cyan: 150,     // 0 - 2200ms: Camera centered on dir_engine
      coral: 3300,   // 3400 - 5200ms: Camera centered on dir_parser
      indigo: 6300,  // 6400 - 7600ms: Camera centered on dir_physics
      purple: 7600,  // 7600 - 9400ms: Full galaxy pullback
      amber: 7600    // 7600 - 9400ms: Full galaxy pullback
    };

    const domainCounters = { cyan: 0, coral: 0, indigo: 0, purple: 0, amber: 0 };
    FOLDERS_DATA.forEach((f, idx) => {
      const theme = f.theme || 'cyan';
      const base = domainBaseTimes[theme] || 7600;
      const count = domainCounters[theme]++;
      const isDomainLead = (f.id === 'dir_engine' || f.id === 'dir_parser' || f.id === 'dir_physics' || f.id === 'dir_agent' || f.id === 'dir_runtime');
      const birthStart = isDomainLead ? base : base + 100 + count * 65;
      treeOrderMap.set(f.id, {
        order: idx,
        depth: isDomainLead ? 0 : 1,
        parentId: null,
        birthStart
      });
    });

    // 2. Add All 40 Yellow Folder Suns (Unpinned & Floating with Natural Micro-Drift)
    FOLDERS_DATA.forEach((fold) => {
      const treeInfo = treeOrderMap.get(fold.id) || { order: 0, depth: 0, birthStart: 0 };

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
        cleanX: fold.x,
        cleanY: fold.y,
        radius: 0,
        baseRadius: fold.radius,
        color: '#facc15', // Yellow for folders
        isHub: fold.isHub || false,
        theme: fold.theme,
        clusterTheme: fold.theme,
        isFixed: false, // NOT STICKY - 100% Fluid & Movable!
        vx: 0,
        vy: 0,
        alpha: 1.0,
        targetAlpha: 1.0,
        treeOrder: treeInfo.order,
        treeDepth: treeInfo.depth,
        birthStart: treeInfo.birthStart,
        seedX: fold.id.charCodeAt(0) * 11,
        seedY: fold.id.charCodeAt(fold.id.length - 1) * 13
      };
      nodes.push(folderNode);
      folderMap.set(fold.id, folderNode);
    });

    // 3. Folder-to-Folder Backbone Conduits (with tree growth time windows)
    FOLDER_LINKS.forEach((link, lIdx) => {
      const sInfo = treeOrderMap.get(link.source) || { order: 0, depth: 0, birthStart: 0 };
      const tInfo = treeOrderMap.get(link.target) || { order: 0, depth: 0, birthStart: 0 };
      
      const isParentSource = sInfo.depth <= tInfo.depth;
      const parentNode = isParentSource ? link.source : link.target;
      const childNode = isParentSource ? link.target : link.source;
      const childInfo = isParentSource ? tInfo : sInfo;

      const growthEnd = childInfo.birthStart;
      const growthStart = Math.max(0, growthEnd - 420);

      edges.push({
        id: `f-link-${lIdx}`,
        source: link.source,
        target: link.target,
        type: 'folder-backbone',
        color: 'rgba(250, 204, 21, 0.22)',
        isDashed: true,
        growthStart,
        growthEnd,
        growthSource: parentNode,
        growthTarget: childNode
      });
    });

    let nodeCounter = 0;

    // Key folders that display tight, beautiful pomegranate seed clusters (matching user reference screenshot)
    const POMEGRANATE_FOLDERS = new Set([
      'dir_parser',
      'dir_ast',
      'dir_tokens',
      'dir_orchestrator',
      'dir_tools',
      'dir_runtime',
      'dir_sqlite',
      'dir_simulation',
      'dir_renderer'
    ]);

    // 3. Populate Asymmetric Nodes across the 40 Folders (Pomegranate clusters & Scattered satellites)
    FOLDERS_DATA.forEach((folder) => {
      const isPomegranateFolder = POMEGRANATE_FOLDERS.has(folder.id);
      const folderFiles = FOLDER_FILE_TEMPLATES[folder.id] || [];
      const leaves = [];

      if (isPomegranateFolder) {
        // Tight cluster of 15-18 balls packed like pomegranate seeds! (Matching user screenshot)
        const count = 16 + (folder.id.length % 3);
        const stemAngle = ((folder.x * 0.015 + folder.y * 0.02) % (Math.PI * 2));
        const stemDist = folder.radius + 44;
        const stemX = Math.cos(stemAngle) * stemDist;
        const stemY = Math.sin(stemAngle) * stemDist;

        for (let s = 0; s < count; s++) {
          let relX, relY;
          if (s === 0) {
            relX = stemX;
            relY = stemY;
          } else {
            const theta = s * 2.399963; // Golden angle phyllotaxis
            const r = Math.sqrt(s) * 12.0; // Tight seed packing (~12px spacing)
            relX = stemX + Math.cos(theta) * r;
            relY = stemY + Math.sin(theta) * r;
          }

          const fileName = folderFiles[s] || `${folder.label}_seed_${s}.ts`;
          
          // Thematic color matching cluster (All red in parser/ast, all purple in agent, etc.)
          let seedColor;
          if (folder.theme === 'coral') {
            seedColor = CLUSTER_PALETTES.coral[s % CLUSTER_PALETTES.coral.length];
          } else if (folder.theme === 'purple') {
            seedColor = CLUSTER_PALETTES.purple[s % CLUSTER_PALETTES.purple.length];
          } else if (folder.theme === 'amber') {
            seedColor = CLUSTER_PALETTES.amber[s % CLUSTER_PALETTES.amber.length];
          } else if (folder.theme === 'cyan') {
            seedColor = CLUSTER_PALETTES.cyan[s % CLUSTER_PALETTES.cyan.length];
          } else {
            seedColor = CLUSTER_PALETTES.indigo[s % CLUSTER_PALETTES.indigo.length];
          }

          // 1 cross-cluster bridge seed
          if (s === count - 1) {
            const cross = CROSS_CLUSTER_PALETTES[folder.theme] || ['#38bdf8'];
            seedColor = cross[0];
          }

          leaves.push({
            relX,
            relY,
            dist: Math.hypot(relX, relY),
            radius: 3.2,
            color: seedColor,
            isPomegranate: true,
            isCritical: folder.theme === 'coral',
            isKey: s === 0,
            label: fileName
          });
        }
      } else {
        // Loose organic scattered satellite balls (5 to 8 balls)
        const count = 5 + (folder.id.length % 4);
        for (let s = 0; s < count; s++) {
          const angle = (s / count) * Math.PI * 2 + ((s * 11) % 7) * 0.14 + (folder.x * 0.005);
          // Varied scattered distances: 42px to 85px
          const dist = folder.radius + 36 + (s % 3) * 15 + ((s * 5) % 9) * 3;
          const relX = Math.cos(angle) * dist;
          const relY = Math.sin(angle) * dist;
          const fileName = folderFiles[s] || `${folder.label}_${s}.ts`;

          let nodeColor;
          if (folder.theme === 'coral') {
            nodeColor = CLUSTER_PALETTES.coral[s % CLUSTER_PALETTES.coral.length];
          } else if (folder.theme === 'purple') {
            nodeColor = CLUSTER_PALETTES.purple[s % CLUSTER_PALETTES.purple.length];
          } else if (folder.theme === 'amber') {
            nodeColor = CLUSTER_PALETTES.amber[s % CLUSTER_PALETTES.amber.length];
          } else if (folder.theme === 'cyan') {
            nodeColor = CLUSTER_PALETTES.cyan[s % CLUSTER_PALETTES.cyan.length];
          } else {
            nodeColor = CLUSTER_PALETTES.indigo[s % CLUSTER_PALETTES.indigo.length];
          }

          // 1 cross-cluster bridge color
          if (s === count - 1) {
            const cross = CROSS_CLUSTER_PALETTES[folder.theme] || ['#38bdf8'];
            nodeColor = cross[0];
          }

          leaves.push({
            relX,
            relY,
            dist,
            radius: 3.2 + (s % 2) * 0.4,
            color: nodeColor,
            isPomegranate: false,
            isCritical: folder.theme === 'coral' && s === 0,
            isKey: s === 0,
            label: fileName
          });
        }
      }

      leaves.forEach((lf, lIdx) => {
        nodeCounter++;
        const targetX = folder.x + lf.relX;
        const targetY = folder.y + lf.relY;
        const leafEmergingDuration = 700;
        // Stagger leaf emerging start so nodes visibly shoot out from yellow balls one by one!
        const leafGrowthStart = folder.birthStart + 180 + (lf.isPomegranate ? lIdx * 45 : lIdx * 65);
        const leafBirthStart = leafGrowthStart + leafEmergingDuration;

        const childNode = {
          id: `${folder.id}_node_${lIdx}`,
          label: lf.label,
          type: lf.isCritical ? 'critical' : 'node',
          parentId: folder.id,
          clusterTheme: folder.theme,
          x: folder.x, // Starts directly at center of yellow folder ball!
          y: folder.y, // Starts directly at center of yellow folder ball!
          baseX: targetX,
          baseY: targetY,
          targetX: targetX,
          targetY: targetY,
          cleanX: targetX,
          cleanY: targetY,
          radius: 0,
          baseRadius: lf.radius,
          color: lf.color,
          isPomegranate: lf.isPomegranate || false,
          isCritical: lf.isCritical || false,
          isKey: lf.isKey || false,
          isFixed: false,
          vx: 0,
          vy: 0,
          alpha: 0,
          targetAlpha: 1.0,
          birthStart: leafBirthStart,
          growthStart: leafGrowthStart,
          emergeDuration: leafEmergingDuration,
          seedX: nodeCounter * 17,
          seedY: nodeCounter * 23
        };
        nodes.push(childNode);

        let lineColor = 'rgba(255, 255, 255, 0.12)';
        if (folder.theme === 'coral') lineColor = 'rgba(239, 68, 68, 0.35)';
        else if (folder.theme === 'purple') lineColor = 'rgba(168, 85, 247, 0.30)';
        else if (folder.theme === 'cyan') lineColor = 'rgba(6, 182, 212, 0.30)';
        else if (folder.theme === 'indigo') lineColor = 'rgba(99, 102, 241, 0.30)';
        else if (folder.theme === 'amber') lineColor = 'rgba(245, 158, 11, 0.30)';

        edges.push({
          id: `e-${folder.id}-${childNode.id}`,
          source: folder.id,
          target: childNode.id,
          type: 'folder-child',
          restLength: lf.dist,
          color: lf.isCritical ? 'rgba(239, 68, 68, 0.40)' : lineColor,
          growthStart: leafGrowthStart,
          growthEnd: leafBirthStart,
          growthSource: folder.id,
          growthTarget: childNode.id
        });
      });
    });

    // 4. Force Relaxation (100 iterations, preserving tight pomegranate clusters)
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

          let minDist;
          if (a.isPomegranate && b.isPomegranate && a.parentId === b.parentId) {
            minDist = a.baseRadius + b.baseRadius + 5; // Tightly packed pomegranate seeds
          } else if (isFolder) {
            minDist = a.baseRadius + b.baseRadius + 28;
          } else {
            minDist = a.baseRadius + b.baseRadius + 18;
          }

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const push = (minDist - dist) * 0.35;
            const fx = (dx / dist) * push;
            const fy = (dy / dist) * push;
            if (a.type !== 'folder') { 
              a.x -= fx; a.y -= fy; 
              a.baseX -= fx; a.baseY -= fy; 
              a.targetX -= fx; a.targetY -= fy; 
              a.cleanX -= fx; a.cleanY -= fy; 
            }
            if (b.type !== 'folder') { 
              b.x += fx; b.y += fy; 
              b.baseX += fx; b.baseY += fy; 
              b.targetX += fx; b.targetY += fy; 
              b.cleanX += fx; b.cleanY += fy; 
            }
          }
        }
      }
    }

    // Update edge rest lengths to match clean relaxed distances
    edges.forEach(e => {
      const s = folderMap.get(e.source) || nodes.find(n => n.id === e.source);
      const t = folderMap.get(e.target) || nodes.find(n => n.id === e.target);
      if (s && t) {
        e.restLength = Math.hypot(t.cleanX - s.cleanX, t.cleanY - s.cleanY);
      }
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  const handleRefactor = useCallback(() => {
    userInteractedRef.current = false;
    birthStartRef.current = performance.now();
    isBirthPlayingRef.current = true;
    const nodes = nodesRef.current;
    nodes.forEach(node => {
      node.vx = 0;
      node.vy = 0;
      if (node.type === 'folder') {
        node.radius = 0;
        node.alpha = 0;
      } else {
        const parent = nodes.find(n => n.id === node.parentId);
        node.x = parent ? parent.x : node.cleanX;
        node.y = parent ? parent.y : node.cleanY;
        node.radius = 0;
        node.alpha = 0;
        node.isEmerging = false;
      }
    });
  }, []);

  // Initial topology creation
  useEffect(() => {
    buildGalaxyTopology();
  }, [buildGalaxyTopology]);

  // Animation triggers reliably when user reaches/scrolls to the graph box
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startAnimation = () => {
      if (hasStartedAnimRef.current) return;
      hasStartedAnimRef.current = true;
      birthStartRef.current = performance.now();
      isBirthPlayingRef.current = true;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          isVisibleRef.current = isIntersecting;
          if (isIntersecting) {
            if (!hasStartedAnimRef.current) {
              startAnimation();
            }
            if (renderTriggerRef.current) {
              renderTriggerRef.current();
            }
          }
        });
      },
      {
        threshold: [0, 0.05],
        rootMargin: '120px 0px 120px 0px'
      }
    );

    observer.observe(container);

    // Immediate check if container is already in viewport on load
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      isVisibleRef.current = true;
      startAnimation();
      if (renderTriggerRef.current) {
        renderTriggerRef.current();
      }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateCenter = () => {
      if (canvas.clientWidth > 0 && !userInteractedRef.current && !isBirthPlayingRef.current) {
        const initialZoom = 1.85;
        zoomRef.current = initialZoom;
        const initialPan = {
          x: canvas.clientWidth / 2 - 620 * initialZoom,
          y: canvas.clientHeight / 2 - 340 * initialZoom
        };
        panRef.current = initialPan;
        setZoomDisplay(Math.round(initialZoom * 100));
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
        userInteractedRef.current = true;
        zoomRef.current = newZoom;
        panRef.current = {
          x: mouseX - worldBefore.x * newZoom,
          y: mouseY - worldBefore.y * newZoom
        };
        setZoomDisplay(Math.round(newZoom * 100));
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
      if (!isVisibleRef.current) {
        return;
      }
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

      // Dynamic theme-matching backdrop
      ctx.fillStyle = activeThemeRef.current ? activeThemeRef.current.background : '#08090c';
      ctx.fillRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const nodeMap = new Map();
      nodes.forEach(n => nodeMap.set(n.id, n));

      // 0. Gated Celestial Birth: Animation waits until the user reaches 70% of the box!
      if (!hasStartedAnimRef.current) {
        nodes.forEach(node => {
          node.radius = 0;
          node.alpha = 0;
          node.x = node.cleanX || node.baseX;
          node.y = node.cleanY || node.baseY;
        });
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Smooth Refactor interpolation back to pristine layout
      if (isRefactoringRef.current) {
        const elapsedRefactor = time - refactorStartRef.current;
        const duration = 750;
        if (elapsedRefactor < duration) {
          const t = elapsedRefactor / duration;
          const ease = 1 - Math.pow(1 - t, 3);
          nodes.forEach(node => {
            node.x = node.refactorStartX + (node.cleanX - node.refactorStartX) * ease;
            node.y = node.refactorStartY + (node.cleanY - node.refactorStartY) * ease;
            node.vx = 0;
            node.vy = 0;
          });
        } else {
          nodes.forEach(node => {
            node.x = node.cleanX;
            node.y = node.cleanY;
            node.vx = 0;
            node.vy = 0;
          });
          isRefactoringRef.current = false;
        }
      }

      const elapsedBirth = isBirthPlayingRef.current ? time - birthStartRef.current : 999999;
      const mouseWorld = mouseRef.current;

      // Multi-Waypoint Camera Tour: glides between yellow nodes displaying each ball coming out, then pulls back to reveal the full galaxy
      if (isBirthPlayingRef.current && !userInteractedRef.current) {
        const universeSpanX = 2980;
        const universeSpanY = 1520;
        const centerWorldX = 680;
        const centerWorldY = 680;
        const fitZoomX = (width - 70) / universeSpanX;
        const fitZoomY = (height - 60) / universeSpanY;
        const endZoom = Math.min(fitZoomX, fitZoomY, 0.44);

        const WAYPOINTS = [
          { t: 0, x: 620, y: 340, zoom: 1.75 },       // dir_engine focus
          { t: 2200, x: 620, y: 340, zoom: 1.75 },    // hold on dir_engine as child balls shoot out
          { t: 3400, x: 1560, y: 320, zoom: 1.70 },   // glide to dir_parser
          { t: 5200, x: 1560, y: 320, zoom: 1.70 },   // hold on dir_parser as pomegranate cluster shoots out
          { t: 6400, x: 180, y: 1040, zoom: 1.60 },   // glide to dir_physics
          { t: 7600, x: 180, y: 1040, zoom: 1.60 },   // hold on dir_physics as physics balls shoot out
          { t: 9400, x: centerWorldX, y: centerWorldY, zoom: endZoom } // smoothly pull back to full galaxy
        ];

        let targetX = WAYPOINTS[0].x;
        let targetY = WAYPOINTS[0].y;
        let targetZoom = WAYPOINTS[0].zoom;

        if (elapsedBirth >= WAYPOINTS[WAYPOINTS.length - 1].t) {
          targetX = WAYPOINTS[WAYPOINTS.length - 1].x;
          targetY = WAYPOINTS[WAYPOINTS.length - 1].y;
          targetZoom = WAYPOINTS[WAYPOINTS.length - 1].zoom;
        } else {
          for (let i = 0; i < WAYPOINTS.length - 1; i++) {
            const w1 = WAYPOINTS[i];
            const w2 = WAYPOINTS[i + 1];
            if (elapsedBirth >= w1.t && elapsedBirth < w2.t) {
              const segProgress = (elapsedBirth - w1.t) / (w2.t - w1.t);
              const ease = segProgress < 0.5 
                ? 4 * segProgress * segProgress * segProgress 
                : 1 - Math.pow(-2 * segProgress + 2, 3) / 2;
              targetX = w1.x + (w2.x - w1.x) * ease;
              targetY = w1.y + (w2.y - w1.y) * ease;
              targetZoom = w1.zoom + (w2.zoom - w1.zoom) * ease;
              break;
            }
          }
        }

        panRef.current.x = width / 2 - targetX * targetZoom;
        panRef.current.y = height / 2 - targetY * targetZoom;
        zoomRef.current = targetZoom;
      }

      // 1. Sequential Tree Growth Blooming with Small Balls Emerging from Yellow Suns
      if (isBirthPlayingRef.current && elapsedBirth < 9600) {
        nodes.forEach(node => {
          if (node.type === 'folder') {
            if (elapsedBirth < node.birthStart) {
              node.radius = 0;
              node.alpha = 0;
              return;
            }
            const age = elapsedBirth - node.birthStart;
            if (age < 420) {
              const u = age / 420;
              const ease = 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2);
              node.radius = node.baseRadius * Math.min(Math.max(ease, 0), 1.15);
              node.alpha = Math.min(u * 1.6, 1.0);
            } else {
              node.radius = node.baseRadius;
              node.alpha = 1.0;
            }
          } else {
            // Small ball emerging and shooting outward from parent yellow ball
            if (elapsedBirth < (node.growthStart || 0)) {
              const parent = nodeMap.get(node.parentId);
              node.x = parent ? parent.x : node.cleanX;
              node.y = parent ? parent.y : node.cleanY;
              node.radius = 0;
              node.alpha = 0;
              node.isEmerging = false;
              return;
            }

            const age = elapsedBirth - node.growthStart;
            const parent = nodeMap.get(node.parentId);
            const originX = parent ? parent.x : node.cleanX;
            const originY = parent ? parent.y : node.cleanY;

            if (age < (node.emergeDuration || 700)) {
              const u = age / (node.emergeDuration || 700);
              // Viscous elastic shoot-out trajectory from center of yellow ball
              const travelEase = 1 - Math.pow(1 - u, 2.6);
              node.x = originX + (node.cleanX - originX) * travelEase;
              node.y = originY + (node.cleanY - originY) * travelEase;

              // Smoothly expand and pop as it protrudes outward
              const popEase = Math.sin(u * Math.PI * 0.5) * (1 + 0.25 * Math.sin(u * Math.PI));
              node.radius = node.baseRadius * Math.max(0, Math.min(popEase, 1.25));
              node.alpha = Math.min(u * 2.0, 1.0);
              node.isEmerging = true;
              node.emergeProgress = u;
            } else {
              node.x = node.cleanX;
              node.y = node.cleanY;
              node.radius = node.baseRadius;
              node.alpha = 1.0;
              node.isEmerging = false;
            }
          }
        });
      } else if (isBirthPlayingRef.current && elapsedBirth >= 9600) {
        isBirthPlayingRef.current = false;
        nodes.forEach(node => {
          node.x = node.cleanX;
          node.y = node.cleanY;
          node.radius = node.baseRadius;
          node.alpha = 1.0;
          node.isEmerging = false;
        });
        setZoomDisplay(Math.round(zoomRef.current * 100));
      }

      // 2. LIQUID VISCOUS PHYSICS ("Stone Moving Through Water" - Nothing is fixed!)
      const hasCursor = mouseWorld.screenX > 0 && mouseWorld.screenY > 0;

      nodes.forEach(node => {
        if (node.isFixed) return;
        if (isBirthPlayingRef.current && elapsedBirth < (node.birthStart || 0) + 200) return;
        if (isRefactoringRef.current) return;
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

        // Force 2: Gentle Natural Micro-Drift (Floating in fluid, NO leash snapping back!)
        node.vx += Math.sin(time * 0.0011 + node.seedX) * 0.025;
        node.vy += Math.cos(time * 0.0009 + node.seedY) * 0.025;

        // Force 3: Liquid Viscosity Damping (0.88 = smooth deceleration, stops where pushed/dragged)
        node.vx *= 0.88;
        node.vy *= 0.88;

        node.x += node.vx;
        node.y += node.vy;
      });

      // Force 4: Chain-Reaction Waves along Edges
      edges.forEach(edge => {
        // Folder backbone edges do NOT pull folders together! Yellow dots are 100% free to move!
        if (edge.type === 'folder-backbone') return;

        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target || source.radius <= 0 || target.radius <= 0) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.hypot(dx, dy) || 1;
        const restLength = edge.restLength || Math.hypot(target.cleanX - source.cleanX, target.cleanY - source.cleanY);
        const delta = dist - restLength;

        // Child file tethered to parent folder: only pull child toward folder
        const springTension = 0.016;
        const fx = (dx / dist) * delta * springTension;
        const fy = (dy / dist) * delta * springTension;

        if (!target.isFixed && !target.isDragged && !isRefactoringRef.current) {
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
          if (Math.abs(dx) > 36 || Math.abs(dy) > 36) continue;

          const distSq = dx * dx + dy * dy || 1;
          const minDist = a.radius + b.radius + 12;
          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const rep = ((minDist - dist) / minDist) * 0.55;
            const rx = (dx / dist) * rep;
            const ry = (dy / dist) * rep;

            if (!a.isFixed && !a.isDragged && !isRefactoringRef.current) { a.vx -= rx; a.vy -= ry; }
            if (!b.isFixed && !b.isDragged && !isRefactoringRef.current) { b.vx += rx; b.vy += ry; }
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

      // Massive Unified Cluster Nebulae (NOT section-wise disjoint circles; each cluster is wrapped in one HUGE atmospheric gradient)
      const CLUSTER_DOMAINS = ['coral', 'purple', 'cyan', 'indigo', 'amber'];
      CLUSTER_DOMAINS.forEach(domainTheme => {
        const clusterFolders = nodes.filter(n => n.type === 'folder' && n.theme === domainTheme && n.radius > 0.5);
        if (clusterFolders.length === 0) return;

        const cfg = CLUSTER_NEBULA_THEMES[domainTheme];
        if (!cfg) return;

        // Dynamic weighted centroid of the entire cluster (follows live node positions as they move/drift/drag)
        let sumX = 0;
        let sumY = 0;
        let totalW = 0;
        let maxNodeDist = 0;

        clusterFolders.forEach(f => {
          const w = f.isHub ? 2.5 : 1.0;
          sumX += f.x * w;
          sumY += f.y * w;
          totalW += w;
        });

        if (totalW === 0) return;
        const cx = sumX / totalW;
        const cy = sumY / totalW;

        clusterFolders.forEach(f => {
          const d = Math.hypot(f.x - cx, f.y - cy) + f.baseRadius + 200;
          if (d > maxNodeDist) maxNodeDist = d;
        });

        // The huge gradient encompasses the entire cluster with generous padding
        const hugeRadius = Math.max(maxNodeDist, 560);

        ctx.save();
        let clusterAlpha = isBirthPlayingRef.current ? Math.min(elapsedBirth / 1000, 1.0) : 1.0;
        if (activeId) {
          const hasFocused = clusterFolders.some(f => focusedIds.has(f.id));
          clusterAlpha *= (hasFocused ? 1.0 : 0.12);
        }
        ctx.globalAlpha = clusterAlpha;

        // 1. Broad seamless outer cosmic nebula (one huge gradient for the whole cluster: "all of it is red" / cyan / purple / etc.)
        const hugeGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, hugeRadius);
        hugeGrad.addColorStop(0, cfg.inner);
        hugeGrad.addColorStop(0.35, cfg.mid);
        hugeGrad.addColorStop(0.70, cfg.outer);
        hugeGrad.addColorStop(1.0, cfg.edge);

        ctx.fillStyle = hugeGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, hugeRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Continuous bridge glow across the cluster's major hubs (seamless blending)
        clusterFolders.forEach(f => {
          if (f.isHub && f.radius > 2) {
            const hubGrad = ctx.createRadialGradient(f.x, f.y, f.radius * 0.4, f.x, f.y, 320);
            hubGrad.addColorStop(0, cfg.inner);
            hubGrad.addColorStop(0.40, cfg.mid);
            hubGrad.addColorStop(1.0, cfg.edge);
            ctx.fillStyle = hubGrad;
            ctx.beginPath();
            ctx.arc(f.x, f.y, 320, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        ctx.restore();
      });

      // Silk Thread Conduits & Dashed Folder Backbones (with growing branch animation!)
      edges.forEach((edge) => {
        const source = nodeMap.get(edge.source);
        const target = nodeMap.get(edge.target);
        if (!source || !target) return;

        // In birth animation: branch doesn't exist yet before growthStart
        if (isBirthPlayingRef.current && elapsedBirth < (edge.growthStart || 0)) return;

        let alpha = Math.min(source.alpha, target.alpha);
        if (alpha < 0.02 && !isBirthPlayingRef.current) return;

        let startX = source.x;
        let startY = source.y;
        let endX = target.x;
        let endY = target.y;

        // If currently in growing phase, branch extends progressively from growthSource to growthTarget!
        if (isBirthPlayingRef.current && elapsedBirth < (edge.growthEnd || 999999)) {
          if (edge.type === 'folder-backbone') {
            const gSource = nodeMap.get(edge.growthSource || edge.source) || source;
            const gTarget = nodeMap.get(edge.growthTarget || edge.target) || target;
            startX = gSource.x;
            startY = gSource.y;

            const gStart = edge.growthStart || 0;
            const gEnd = edge.growthEnd || (gStart + 80);
            const duration = Math.max(gEnd - gStart, 30);
            const p = Math.min(Math.max((elapsedBirth - gStart) / duration, 0), 1.0);
            endX = gSource.x + (gTarget.x - gSource.x) * p;
            endY = gSource.y + (gTarget.y - gSource.y) * p;

            // Glowing energy spark at the tip of the growing branch!
            ctx.save();
            ctx.beginPath();
            ctx.arc(endX, endY, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.restore();
          } else {
            // folder-child edge: target is already animated from source center to target clean pos!
            startX = source.x;
            startY = source.y;
            endX = target.x;
            endY = target.y;
          }
        }

        let lineWidth = edge.type === 'folder-backbone' ? 1.0 : 0.65;
        let strokeStyle = edge.color;

        if (activeId) {
          const isConnected = focusedIds.has(source.id) && focusedIds.has(target.id);
          alpha = isConnected ? 0.95 : 0.03;
          if (isConnected) lineWidth = 1.8;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(alpha, isBirthPlayingRef.current ? 0.45 : 0.02);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        if (edge.isDashed) {
          ctx.setLineDash([4, 4]);
        }

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
      });

      // Luminous Glow on Data Transfer Conduits (Highways)
      if (!isBirthPlayingRef.current || elapsedBirth >= 7600) {
        FILE_HIGHWAYS.forEach(hw => {
          const source = nodeMap.get(hw.source);
          const target = nodeMap.get(hw.target);
          if (!source || !target || source.radius <= 0 || target.radius <= 0) return;
          // STRICT RULE: No data transfer conduits connected to yellow folder balls!
          if (source.type === 'folder' || target.type === 'folder') return;

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
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.42)';
          ctx.lineWidth = 3.8;
          ctx.stroke();

          // Inner electric laser beam
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(165, 243, 252, 0.90)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          ctx.restore();
        });
      }

      // Fast, All-Blue, Glowing Data Balls Traveling Between Nodes (with Comet Tails)
      if (!isBirthPlayingRef.current || elapsedBirth >= 8200) {
        DATA_PULSES.forEach(pkt => {
          const source = nodeMap.get(pkt.source);
          const target = nodeMap.get(pkt.target);
          if (!source || !target || source.radius <= 0 || target.radius <= 0) return;
          // STRICT RULE: Zero data pulses to or from yellow folder balls!
          if (source.type === 'folder' || target.type === 'folder') return;

          let pktAlpha = 1.0;
          if (activeId && !focusedIds.has(pkt.source) && !focusedIds.has(pkt.target)) {
            pktAlpha = 0.08;
          }

        const progress = (time * pkt.speed + pkt.offset) % 1.0;
        const px = source.x + (target.x - source.x) * progress;
        const py = source.y + (target.y - source.y) * progress;

        ctx.save();
        ctx.globalAlpha = pktAlpha;

        // Luminous Comet Tail (trailing behind fast moving ball)
        const tailLength = 0.14;
        const tailProgress = Math.max(0, progress - tailLength);
        const tx = source.x + (target.x - source.x) * tailProgress;
        const ty = source.y + (target.y - source.y) * tailProgress;

        const tailGrad = ctx.createLinearGradient(tx, ty, px, py);
        tailGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        tailGrad.addColorStop(0.4, 'rgba(34, 211, 238, 0.45)');
        tailGrad.addColorStop(1, 'rgba(165, 243, 252, 0.95)');

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 3.2;
        ctx.stroke();

        // Outer Radiant Glow Aura
        ctx.beginPath();
        ctx.arc(px, py, pkt.glowSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.40)';
        ctx.fill();

        // Mid Vivid Electric Blue Halo
        ctx.beginPath();
        ctx.arc(px, py, pkt.glowSize * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103, 232, 249, 0.80)';
        ctx.fill();

        // Intense White-Cyan Core Star (Shooting aggressively)
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.restore();
      });
    }

      // Draw Nodes
      nodes.forEach(node => {
        if (node.radius <= 0.2) return;

        ctx.save();
        ctx.globalAlpha = node.alpha;

        // Golden shockwave ring when folder blooms in tree growth
        if (node.type === 'folder' && isBirthPlayingRef.current && elapsedBirth >= node.birthStart) {
          const age = elapsedBirth - node.birthStart;
          if (age < 420) {
            const shockwave = age / 420;
            ctx.save();
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.baseRadius * (1 + shockwave * 2.2), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(250, 204, 21, ${(1 - shockwave) * 0.75})`;
            ctx.lineWidth = 2.0;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Sparkling emerging burst when small file shoots out from yellow sun
        if (node.type !== 'folder' && isBirthPlayingRef.current && node.isEmerging && node.emergeProgress < 0.65) {
          ctx.save();
          const sparkSize = node.radius + 3.2 * (1 - node.emergeProgress);
          ctx.beginPath();
          ctx.arc(node.x, node.y, sparkSize, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
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

    renderTriggerRef.current = () => {
      cancelAnimationFrame(animFrameRef.current);
      prevTime = performance.now();
      animFrameRef.current = requestAnimationFrame(render);
    };

    if (isVisibleRef.current) {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      renderTriggerRef.current = null;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [showLabels]);

  // Pointer Interactions: screen-space precision hit testing (generous 38px folder target zone!)
  const findNodeAt = useCallback((screenX, screenY) => {
    const nodes = nodesRef.current;
    const zoom = zoomRef.current;
    const pan = panRef.current;

    // 1. Folders first: screen-space distance gives generous 38px radius target zone
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.type === 'folder' && n.radius > 0) {
        const screenNodeX = n.x * zoom + pan.x;
        const screenNodeY = n.y * zoom + pan.y;
        const screenDist = Math.hypot(screenX - screenNodeX, screenY - screenNodeY);
        const hitRadius = Math.max(n.radius * zoom + 22, 38);
        if (screenDist <= hitRadius) return n;
      }
    }
    // 2. Child nodes: also screen-space
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i];
      if (n.type !== 'folder' && n.radius > 0) {
        const screenNodeX = n.x * zoom + pan.x;
        const screenNodeY = n.y * zoom + pan.y;
        const screenDist = Math.hypot(screenX - screenNodeX, screenY - screenNodeY);
        const hitRadius = Math.max(n.radius * zoom + 12, 20);
        if (screenDist <= hitRadius) return n;
      }
    }
    return null;
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsCanvasFocused(true);

    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}

    // Immediate gate bypass if user interacts
    if (!hasStartedAnimRef.current) {
      hasStartedAnimRef.current = true;
      birthStartRef.current = performance.now();
      isBirthPlayingRef.current = false;
      nodesRef.current.forEach(n => {
        n.radius = n.baseRadius;
        n.alpha = 1.0;
      });
    }

    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const world = screenToWorld(screenX, screenY);

    mouseRef.current.screenX = screenX;
    mouseRef.current.screenY = screenY;
    mouseRef.current.worldX = world.x;
    mouseRef.current.worldY = world.y;
    mouseRef.current.isDown = true;
    userInteractedRef.current = true;

    const hit = findNodeAt(screenX, screenY);
    if (hit) {
      // If tree growth was still playing, immediately finalize all nodes to full radius
      if (isBirthPlayingRef.current) {
        isBirthPlayingRef.current = false;
        nodesRef.current.forEach(n => {
          n.radius = n.baseRadius;
          n.alpha = 1.0;
        });
      }
      setSelectedNode(hit);
      hit.isDragged = true;
      mouseRef.current.draggedNode = hit;
      mouseRef.current.dragOffset = {
        x: hit.x - world.x,
        y: hit.y - world.y
      };
      mouseRef.current.lastDragPos = { x: world.x, y: world.y };
      setIsDragging(true);
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
      const offset = mouseRef.current.dragOffset || { x: 0, y: 0 };
      const newX = world.x + offset.x;
      const newY = world.y + offset.y;
      const dx = newX - node.x;
      const dy = newY - node.y;

      node.x = newX;
      node.y = newY;
      node.cleanX = newX;
      node.cleanY = newY;
      node.vx = 0;
      node.vy = 0;

      // When dragging a yellow folder ball, all its child files translate along with it!
      if (node.type === 'folder') {
        nodesRef.current.forEach(child => {
          if (child.parentId === node.id) {
            child.x += dx;
            child.y += dy;
            child.cleanX = child.x;
            child.cleanY = child.y;
            child.vx = 0;
            child.vy = 0;
          }
        });
      }

      // Update connected edges rest length so it NEVER snaps back!
      edgesRef.current.forEach(edge => {
        if (edge.source === node.id || edge.target === node.id) {
          const s = nodesRef.current.find(n => n.id === edge.source);
          const t = nodesRef.current.find(n => n.id === edge.target);
          if (s && t) {
            edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
          }
        }
      });
      return;
    }

    if (mouseRef.current.isPanning) {
      userInteractedRef.current = true;
      panRef.current = {
        x: screenX - mouseRef.current.panStart.x,
        y: screenY - mouseRef.current.panStart.y
      };
      return;
    }

    const hit = findNodeAt(screenX, screenY);
    setHoveredNode(hit);
  };

  const handlePointerUp = (e) => {
    try {
      if (e?.target && e.pointerId !== undefined) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    if (mouseRef.current.draggedNode) {
      const node = mouseRef.current.draggedNode;
      node.isDragged = false;
      node.vx = 0;
      node.vy = 0;
      node.cleanX = node.x;
      node.cleanY = node.y;
      edgesRef.current.forEach(edge => {
        if (edge.source === node.id || edge.target === node.id) {
          const s = nodesRef.current.find(n => n.id === edge.source);
          const t = nodesRef.current.find(n => n.id === edge.target);
          if (s && t) {
            edge.restLength = Math.hypot(t.x - s.x, t.y - s.y);
          }
        }
      });
      mouseRef.current.draggedNode = null;
      setIsDragging(false);
    }
    mouseRef.current.isDown = false;
    mouseRef.current.isPanning = false;
    setHoveredNode(null);
  };

  const handlePointerLeave = (e) => {
    try {
      if (e?.target && e.pointerId !== undefined) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    mouseRef.current.screenX = -1000;
    mouseRef.current.screenY = -1000;
    mouseRef.current.worldX = -1000;
    mouseRef.current.worldY = -1000;
    mouseRef.current.isDown = false;
    mouseRef.current.isPanning = false;
    if (mouseRef.current.draggedNode) {
      const node = mouseRef.current.draggedNode;
      node.isDragged = false;
      node.vx = 0;
      node.vy = 0;
      mouseRef.current.draggedNode = null;
      setIsDragging(false);
    }
    setHoveredNode(null);
  };

  const handleZoomIn = () => {
    userInteractedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newZoom = Math.min(zoomRef.current * 1.2, 2.5);
    const centerScreenX = canvas.clientWidth / 2;
    const centerScreenY = canvas.clientHeight / 2;
    const worldCenter = screenToWorld(centerScreenX, centerScreenY);

    zoomRef.current = newZoom;
    panRef.current = {
      x: centerScreenX - worldCenter.x * newZoom,
      y: centerScreenY - worldCenter.y * newZoom
    };
    setZoomDisplay(Math.round(newZoom * 100));
  };
  const handleZoomOut = () => {
    userInteractedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newZoom = Math.max(zoomRef.current * 0.8, 0.18);
    const centerScreenX = canvas.clientWidth / 2;
    const centerScreenY = canvas.clientHeight / 2;
    const worldCenter = screenToWorld(centerScreenX, centerScreenY);

    zoomRef.current = newZoom;
    panRef.current = {
      x: centerScreenX - worldCenter.x * newZoom,
      y: centerScreenY - worldCenter.y * newZoom
    };
    setZoomDisplay(Math.round(newZoom * 100));
  };
  const handleResetZoom = () => {
    userInteractedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const universeSpanX = 2980;
    const universeSpanY = 1520;
    const centerWorldX = 680;
    const centerWorldY = 680;
    const fitZoomX = (canvas.clientWidth - 70) / universeSpanX;
    const fitZoomY = (canvas.clientHeight - 60) / universeSpanY;
    const newZoom = Math.min(fitZoomX, fitZoomY, 0.42);
    zoomRef.current = newZoom;
    panRef.current = {
      x: canvas.clientWidth / 2 - centerWorldX * newZoom,
      y: canvas.clientHeight / 2 - centerWorldY * newZoom
    };
    setZoomDisplay(Math.round(newZoom * 100));
  };

  // Trigger immediate canvas repaint when theme changes
  useEffect(() => {
    activeThemeRef.current = activeTheme;
    if (renderTriggerRef.current) {
      renderTriggerRef.current();
    }
  }, [activeTheme]);

  // Scaled radar minimap nodes (matching SpatialMinimap.jsx in Neuron desktop app)
  const minimapNodes = useMemo(() => {
    const rawNodes = nodesRef.current.length > 0 ? nodesRef.current : [];
    if (rawNodes.length === 0) return [];
    
    const minX = 0, maxX = 2980, minY = 0, maxY = 1520;
    const spanX = Math.max(maxX - minX, 1);
    const spanY = Math.max(maxY - minY, 1);
    const svgWidth = 104;
    const svgHeight = 60;

    return rawNodes.slice(0, 140).map(n => {
      const isFolder = n.type === 'folder';
      const isFile = !isFolder;
      let color = n.color || '#38bdf8';
      if (isFolder) color = '#facc15';

      const normX = Math.max(0, Math.min(1, ((n.cleanX ?? n.x ?? 0) - minX) / spanX));
      const normY = Math.max(0, Math.min(1, ((n.cleanY ?? n.y ?? 0) - minY) / spanY));

      return {
        id: n.id,
        cx: 6 + normX * svgWidth,
        cy: 6 + normY * svgHeight,
        r: isFolder ? 2.2 : isFile ? 1.4 : 1.0,
        color
      };
    });
  }, [hasStartedAnimRef.current, nodesRef.current.length]);

  const handleTerminalSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = terminalInput.trim();
      if (!cmd) return;
      if (cmd === 'clear' || cmd === 'cls') {
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      }
      let output = '';
      if (cmd === 'git status') {
        output = 'On branch main\nYour branch is up to date with \'origin/main\'.\nChanges not staged for commit:\n  modified:   src/App.jsx\n  modified:   src/components/canvas/PixiSpatialEngine.jsx\n\nUntracked files:\n  src/services/astBridge.ts';
      } else if (cmd === 'cargo check' || cmd === 'cargo test') {
        output = '    Finished dev [unoptimized + debuginfo] target(s) in 0.42s\n    Running unittests src/lib.rs (12 passed, 0 failed)';
      } else if (cmd.startsWith('help') || cmd === '?') {
        output = 'Available commands: git status, cargo check, clear, ls, echo <text>';
      } else if (cmd.startsWith('echo ')) {
        output = cmd.slice(5);
      } else if (cmd === 'ls' || cmd === 'dir') {
        output = 'backend/   frontend/   Cargo.toml   README.md';
      } else {
        output = `'${cmd}' executed via spatial bridge (exit code 0)`;
      }
      setTerminalHistory(prev => [...prev, { cmd, stdout: output }]);
      setTerminalInput('');
    }
  };

  return (
    <div 
      ref={containerRef}
      onBlur={() => setIsCanvasFocused(false)}
      className="w-full h-[620px] md:h-[680px] rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans select-none relative text-left border transition-colors duration-200"
      style={{
        backgroundColor: activeTheme.background,
        borderColor: activeTheme.border,
        color: activeTheme.textPrimary
      }}
    >
      {/* 1. TOP TITLEBAR (Parity with TopBar.jsx) */}
      <div 
        className="h-[42px] shrink-0 border-b flex items-center justify-between pl-3 pr-0 text-[12px] font-sans select-none z-[150] relative transition-colors duration-150"
        style={{
          backgroundColor: activeTheme.primary,
          borderColor: activeTheme.border,
          color: activeTheme.textPrimary
        }}
      >
        {/* Left: Flat Matte Logo + Dropdown Menus */}
        <div className="flex items-center gap-3">
          <div className="flex items-center pr-1 cursor-pointer" title="Neuron IDE">
            <img 
              src="/logo.png" 
              alt="Neuron" 
              className="h-5 w-5 object-contain opacity-95" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          <div className="flex items-center text-xs font-mono" ref={menuRef}>
            {['File', 'Edit', 'Layout', 'Help'].map((item) => (
              <div key={item} className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                  className="px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs"
                  style={{
                    backgroundColor: activeMenu === item ? activeTheme.surfaceActive : 'transparent',
                    color: activeMenu === item ? activeTheme.textBright : activeTheme.textSecondary
                  }}
                >
                  {item}
                </button>

                {activeMenu === item && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-56 border shadow-2xl rounded-xl py-1.5 text-xs font-mono backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 select-none z-[200]"
                    style={{
                      backgroundColor: activeTheme.secondary,
                      borderColor: activeTheme.borderSubtle,
                      color: activeTheme.textPrimary
                    }}
                  >
                    {item === 'File' && (
                      <>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Open Folder...</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+K Ctrl+O</span>
                        </button>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Save</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+S</span>
                        </button>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Auto Save</span>
                          <Check size={12} className="text-blue-400" />
                        </button>
                        <div className="my-1 border-t" style={{ borderColor: activeTheme.border }} />
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Close Window</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+W</span>
                        </button>
                      </>
                    )}
                    {item === 'Edit' && (
                      <>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Undo</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+Z</span>
                        </button>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Redo</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+Y</span>
                        </button>
                        <div className="my-1 border-t" style={{ borderColor: activeTheme.border }} />
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Cut</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+X</span>
                        </button>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Copy</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+C</span>
                        </button>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Paste</span>
                          <span className="text-[10px] text-slate-400 font-mono">Ctrl+V</span>
                        </button>
                      </>
                    )}
                    {item === 'Layout' && (
                      <>
                        <button 
                          onClick={() => { setIsSidebarOpen(!isSidebarOpen); setActiveMenu(null); }} 
                          className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
                        >
                          <span>Explorer Sidebar</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">Ctrl+B</span>
                            <Check size={12} className={isSidebarOpen ? "text-blue-400" : "opacity-0"} />
                          </div>
                        </button>
                        <button 
                          onClick={() => { setIsTerminalOpen(!isTerminalOpen); setActiveMenu(null); }} 
                          className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
                        >
                          <span>Interactive Terminal</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">Ctrl+`</span>
                            <Check size={12} className={isTerminalOpen ? "text-blue-400" : "opacity-0"} />
                          </div>
                        </button>
                      </>
                    )}
                    {item === 'Help' && (
                      <>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Documentation</span>
                        </button>
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>Keyboard Shortcuts</span>
                        </button>
                        <div className="my-1 border-t" style={{ borderColor: activeTheme.border }} />
                        <button onClick={() => setActiveMenu(null)} className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-white/[0.06] transition-colors cursor-pointer text-left">
                          <span>About Neuron</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Title */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono opacity-70">
          <span>Neuron - workspace</span>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center h-full">
          <button className="w-10 h-full flex items-center justify-center hover:bg-white/[0.06] transition-colors cursor-pointer text-slate-400 hover:text-white" title="Minimize">
            <Minus size={13} />
          </button>
          <button className="w-10 h-full flex items-center justify-center hover:bg-white/[0.06] transition-colors cursor-pointer text-slate-400 hover:text-white" title="Maximize">
            <Square size={11} />
          </button>
          <button className="w-10 h-full flex items-center justify-center hover:bg-[#e81123] transition-colors cursor-pointer text-slate-400 hover:text-white" title="Close">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 2. WORKSPACE BODY: ActivityBar + Sidebar + Central Viewport */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ActivityBar (w-12 / 48px) */}
        <div 
          className="w-12 h-full border-r flex flex-col items-center justify-between py-2.5 shrink-0 z-40 select-none transition-colors duration-150"
          style={{
            backgroundColor: activeTheme.secondary,
            borderColor: activeTheme.border
          }}
        >
          {/* Top Actions */}
          <div className="flex flex-col gap-2 w-full items-center">
            {/* Explorer Toggle */}
            <button 
              onClick={() => {
                if (!isSidebarOpen) {
                  setIsSidebarOpen(true);
                  setActiveSidebarView('explorer');
                } else if (activeSidebarView === 'explorer') {
                  setIsSidebarOpen(false);
                } else {
                  setActiveSidebarView('explorer');
                }
              }}
              className="p-2 rounded-xl transition-all relative group cursor-pointer"
              style={{
                color: isSidebarOpen && activeSidebarView === 'explorer' ? activeTheme.textBright : activeTheme.textMuted,
                backgroundColor: isSidebarOpen && activeSidebarView === 'explorer' ? activeTheme.surfaceHover : 'transparent'
              }}
              title="Explorer (Ctrl+B)"
            >
              {isSidebarOpen && activeSidebarView === 'explorer' && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                  style={{
                    backgroundColor: activeTheme.accent,
                    boxShadow: `0 0 8px ${activeTheme.accent}`
                  }}
                />
              )}
              <Files size={18} strokeWidth={1.6} />
            </button>

            {/* Git Branch Toggle */}
            <button 
              onClick={() => {
                if (!isSidebarOpen) {
                  setIsSidebarOpen(true);
                  setActiveSidebarView('git');
                } else if (activeSidebarView === 'git') {
                  setIsSidebarOpen(false);
                } else {
                  setActiveSidebarView('git');
                }
              }}
              className="p-2 rounded-xl transition-all relative group cursor-pointer"
              style={{
                color: isSidebarOpen && activeSidebarView === 'git' ? activeTheme.textBright : activeTheme.textMuted,
                backgroundColor: isSidebarOpen && activeSidebarView === 'git' ? activeTheme.surfaceHover : 'transparent'
              }}
              title="Source Control"
            >
              {isSidebarOpen && activeSidebarView === 'git' && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                  style={{
                    backgroundColor: activeTheme.accent,
                    boxShadow: `0 0 8px ${activeTheme.accent}`
                  }}
                />
              )}
              <GitBranch size={18} strokeWidth={1.6} />
              <span 
                className="absolute -top-0.5 -right-0.5 px-1 min-w-[14px] h-[14px] rounded-full text-[9px] font-mono font-bold text-white flex items-center justify-center shadow"
                style={{ backgroundColor: activeTheme.accent }}
              >
                2
              </span>
            </button>

            {/* AI Studio */}
            <button 
              onClick={() => {
                if (!isSidebarOpen) {
                  setIsSidebarOpen(true);
                  setActiveSidebarView('ai');
                } else if (activeSidebarView === 'ai') {
                  setIsSidebarOpen(false);
                } else {
                  setActiveSidebarView('ai');
                }
              }}
              className="p-2 rounded-xl transition-all relative group cursor-pointer"
              style={{
                color: isSidebarOpen && activeSidebarView === 'ai' ? activeTheme.textBright : activeTheme.textMuted,
                backgroundColor: isSidebarOpen && activeSidebarView === 'ai' ? activeTheme.surfaceHover : 'transparent'
              }}
              title="Antigravity AI (Ctrl+Shift+A)"
            >
              {isSidebarOpen && activeSidebarView === 'ai' && (
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                  style={{
                    backgroundColor: activeTheme.accent,
                    boxShadow: `0 0 8px ${activeTheme.accent}`
                  }}
                />
              )}
              <Sparkles size={18} strokeWidth={1.6} />
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2 w-full items-center relative">
            {/* Theme Selector Popover Button */}
            <div className="relative">
              <button 
                ref={themeButtonRef}
                onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
                className="p-2 rounded-xl transition-colors cursor-pointer"
                style={{
                  color: isThemePickerOpen ? activeTheme.textBright : activeTheme.textMuted,
                  backgroundColor: isThemePickerOpen ? activeTheme.surfaceHover : 'transparent'
                }}
                title="Color Themes"
              >
                <Palette size={18} strokeWidth={1.6} />
              </button>

              {/* Floating Minimal Horizontal Bar with 5 Color Circles */}
              {isThemePickerOpen && (
                <div
                  ref={themePopoverRef}
                  className="absolute left-14 bottom-0 z-[250] flex items-center gap-2 px-2.5 py-1.5 rounded-full border shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 select-none"
                  style={{
                    backgroundColor: activeTheme.surface,
                    borderColor: activeTheme.border,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)'
                  }}
                >
                  {Object.entries(THEMES_MAP).map(([id, t]) => {
                    const isSelected = activeThemeId === id;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          setActiveThemeId(id);
                          setIsThemePickerOpen(false);
                        }}
                        className={`w-5 h-5 rounded-full cursor-pointer transition-all transform hover:scale-115 relative flex items-center justify-center shrink-0 ${
                          isSelected ? 'ring-2 ring-offset-2 scale-105' : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: t.circleColor,
                          border: `1.5px solid ${t.circleBorder}`,
                          outline: 'none'
                        }}
                        title={t.name}
                      >
                        {isSelected && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: t.isDark ? '#ffffff' : '#000000'
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Settings */}
            <button 
              className="p-2 rounded-xl transition-colors cursor-pointer"
              style={{ color: activeTheme.textMuted }}
              title="Preferences (Ctrl+,)"
            >
              <Settings size={18} strokeWidth={1.6} />
            </button>

            {/* User Avatar */}
            <div 
              className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-mono font-bold text-[10px] flex items-center justify-center uppercase shadow cursor-pointer"
              title="Signed in as Developer"
            >
              N
            </div>
          </div>
        </div>

        {/* Sidebar (w-52 / 208px) */}
        {isSidebarOpen && (
          <div 
            className="w-52 border-r flex flex-col shrink-0 text-left overflow-hidden select-none transition-colors duration-150"
            style={{
              backgroundColor: activeTheme.secondary,
              borderColor: activeTheme.border,
              color: activeTheme.textPrimary
            }}
          >
            {/* Header with action icons */}
            <div 
              className="h-8 px-3 text-[11px] font-mono font-medium tracking-wide flex items-center justify-between shrink-0 border-b"
              style={{ borderColor: activeTheme.border }}
            >
              <span className="font-medium tracking-wide" style={{ color: activeTheme.textPrimary }}>Explorer</span>
              <div className="flex items-center gap-0.5">
                <button className="p-1 rounded hover:bg-white/[0.06] transition-colors cursor-pointer" style={{ color: activeTheme.textMuted }} title="New File">
                  <FilePlus size={13} />
                </button>
                <button className="p-1 rounded hover:bg-white/[0.06] transition-colors cursor-pointer" style={{ color: activeTheme.textMuted }} title="New Folder">
                  <FolderPlus size={13} />
                </button>
                <button className="p-1 rounded hover:bg-white/[0.06] transition-colors cursor-pointer" style={{ color: activeTheme.textMuted }} title="Refresh Explorer">
                  <RefreshCw size={12} />
                </button>
                <button 
                  onClick={() => setOpenFolders({ neuron: true, backend: false, frontend: false, src: false, components: false, config: false })}
                  className="p-1 rounded hover:bg-white/[0.06] transition-colors cursor-pointer" 
                  style={{ color: activeTheme.textMuted }} 
                  title="Collapse All Folders"
                >
                  <ListCollapse size={13} />
                </button>
              </div>
            </div>

            {/* Root Workspace Toggler */}
            <div 
              onClick={() => setOpenFolders(p => ({ ...p, neuron: !p.neuron }))}
              className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider flex items-center gap-1 shrink-0 hover:bg-white/[0.04] cursor-pointer transition-colors select-none"
              style={{ color: activeTheme.textPrimary }}
            >
              {openFolders.neuron ? <ChevronDown size={13} className="text-slate-500 shrink-0" /> : <ChevronRight size={13} className="text-slate-500 shrink-0" />}
              <span className="truncate font-bold">NEURON</span>
            </div>

            {/* File Tree */}
            {openFolders.neuron && (
              <div className="flex-1 overflow-y-auto pb-4 font-mono text-[11px]">
                {/* backend folder */}
                <div 
                  onClick={() => setOpenFolders(p => ({ ...p, backend: !p.backend }))}
                  className="px-4 py-0.5 flex items-center gap-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors"
                >
                  {openFolders.backend ? <ChevronDown size={12} className="text-slate-500 shrink-0" /> : <ChevronRight size={12} className="text-slate-500 shrink-0" />}
                  <Folder size={13} style={{ color: activeTheme.folderIcon }} className="shrink-0" />
                  <span className="truncate">backend</span>
                </div>
                {openFolders.backend && (
                  <div className="pl-7 space-y-0.5">
                    <div 
                      onClick={() => setActiveDocTab('spatial')}
                      className="px-1 py-0.5 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer rounded"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <FileCode2 size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate text-slate-300">main.py</span>
                      </div>
                      <span className="text-[10px] text-amber-500 font-bold pr-1">M</span>
                    </div>
                  </div>
                )}

                {/* frontend folder */}
                <div 
                  onClick={() => setOpenFolders(p => ({ ...p, frontend: !p.frontend }))}
                  className="px-4 py-0.5 flex items-center gap-1.5 hover:bg-white/[0.04] cursor-pointer transition-colors"
                >
                  {openFolders.frontend ? <ChevronDown size={12} className="text-slate-500 shrink-0" /> : <ChevronRight size={12} className="text-slate-500 shrink-0" />}
                  <Folder size={13} style={{ color: activeTheme.folderIcon }} className="shrink-0" />
                  <span className="truncate">frontend</span>
                </div>
                {openFolders.frontend && (
                  <div className="pl-6 space-y-0.5">
                    {/* src */}
                    <div 
                      onClick={() => setOpenFolders(p => ({ ...p, src: !p.src }))}
                      className="px-2 py-0.5 flex items-center gap-1.5 hover:bg-white/[0.04] cursor-pointer"
                    >
                      {openFolders.src ? <ChevronDown size={11} className="text-slate-500 shrink-0" /> : <ChevronRight size={11} className="text-slate-500 shrink-0" />}
                      <Folder size={12} style={{ color: activeTheme.folderIcon }} className="shrink-0" />
                      <span className="truncate">src</span>
                    </div>
                    {openFolders.src && (
                      <div className="pl-4 space-y-0.5">
                        {/* App.jsx */}
                        <div 
                          onClick={() => setActiveDocTab('app')}
                          className={`px-2 py-0.5 flex items-center justify-between cursor-pointer rounded ${activeDocTab === 'app' ? 'bg-blue-600/20 text-blue-400 font-medium' : 'hover:bg-white/[0.04] text-slate-300'}`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <FileCode2 size={12} className={activeDocTab === 'app' ? 'text-blue-400' : 'text-slate-400'} />
                            <span className="truncate">App.jsx</span>
                          </div>
                          <span className="text-[10px] text-amber-500 font-bold pr-1">M</span>
                        </div>

                        {/* PixiSpatialEngine.jsx */}
                        <div 
                          onClick={() => setActiveDocTab('spatial')}
                          className={`px-2 py-0.5 flex items-center justify-between cursor-pointer rounded ${activeDocTab === 'spatial' ? 'bg-blue-600/20 text-blue-400 font-medium' : 'hover:bg-white/[0.04] text-slate-300'}`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <FileCode2 size={12} className={activeDocTab === 'spatial' ? 'text-blue-400' : 'text-slate-400'} />
                            <span className="truncate">PixiSpatialEngine.jsx</span>
                          </div>
                          <span className="text-[10px] text-amber-500 font-bold pr-1">M</span>
                        </div>

                        {/* TopBar.jsx */}
                        <div className="px-2 py-0.5 flex items-center gap-1.5 text-slate-400 hover:bg-white/[0.04] cursor-pointer rounded">
                          <FileCode2 size={12} className="text-slate-500" />
                          <span className="truncate">TopBar.jsx</span>
                        </div>
                      </div>
                    )}
                    {/* package.json */}
                    <div className="px-3 py-0.5 flex items-center gap-1.5 text-slate-400 hover:bg-white/[0.04] cursor-pointer rounded">
                      <FileCode2 size={12} className="text-slate-500" />
                      <span className="truncate">package.json</span>
                    </div>
                  </div>
                )}

                {/* Cargo.toml */}
                <div className="px-6 py-0.5 flex items-center gap-1.5 text-slate-400 hover:bg-white/[0.04] cursor-pointer rounded">
                  <FileCode2 size={12} className="text-slate-500" />
                  <span className="truncate">Cargo.toml</span>
                </div>

                {/* README.md */}
                <div className="px-6 py-0.5 flex items-center justify-between text-slate-400 hover:bg-white/[0.04] cursor-pointer rounded">
                  <div className="flex items-center gap-1.5 truncate">
                    <FileCode2 size={12} className="text-slate-500" />
                    <span className="truncate">README.md</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold pr-1">U</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Central Viewport */}
        <div 
          className="flex-1 flex flex-col relative overflow-hidden text-left"
          style={{ backgroundColor: activeTheme.background }}
        >
          {/* Document Tab Strip (h-8) */}
          <div 
            className="h-8 shrink-0 border-b flex items-center justify-between select-none"
            style={{
              backgroundColor: activeTheme.secondary,
              borderColor: activeTheme.border
            }}
          >
            <div className="flex items-center h-full">
              {/* Spatial Map Tab */}
              <button
                onClick={() => setActiveDocTab('spatial')}
                className={`h-full px-3 flex items-center gap-2 text-[11px] font-mono font-medium border-r transition-colors cursor-pointer ${
                  activeDocTab === 'spatial' ? 'font-semibold border-t-2' : 'hover:text-white'
                }`}
                style={{
                  backgroundColor: activeDocTab === 'spatial' ? activeTheme.background : activeTheme.secondary,
                  borderColor: activeTheme.border,
                  borderTopColor: activeDocTab === 'spatial' ? activeTheme.accent : 'transparent',
                  color: activeDocTab === 'spatial' ? activeTheme.textBright : activeTheme.textSecondary
                }}
              >
                <Network size={13} style={{ color: activeDocTab === 'spatial' ? activeTheme.accent : undefined }} />
                <span>Spatial Map</span>
              </button>

              {/* App.jsx Tab */}
              <button
                onClick={() => setActiveDocTab('app')}
                className={`h-full px-3 flex items-center gap-2 text-[11px] font-mono font-medium border-r transition-colors cursor-pointer ${
                  activeDocTab === 'app' ? 'font-semibold border-t-2' : 'hover:text-white'
                }`}
                style={{
                  backgroundColor: activeDocTab === 'app' ? activeTheme.background : activeTheme.secondary,
                  borderColor: activeTheme.border,
                  borderTopColor: activeDocTab === 'app' ? activeTheme.accent : 'transparent',
                  color: activeDocTab === 'app' ? activeTheme.textBright : activeTheme.textSecondary
                }}
              >
                <FileCode2 size={13} style={{ color: activeDocTab === 'app' ? activeTheme.accent : undefined }} />
                <span>App.jsx</span>
                <span className="text-[10px] text-amber-500 font-bold">M</span>
              </button>
            </div>

            {/* Run Button (F5) */}
            <div className="flex items-center pr-3">
              <button 
                onClick={handleRefactor}
                className="w-7 h-6 flex items-center justify-center rounded hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer" 
                title="Run Active File (F5)"
              >
                <Play size={13} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Canvas HUD Header (when Spatial Map is open) */}
          {activeDocTab === 'spatial' && (
            <div 
              className="h-8 border-b flex items-center justify-between px-3 text-xs shrink-0"
              style={{
                backgroundColor: activeTheme.primary,
                borderColor: activeTheme.border
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono" style={{ color: activeTheme.textMuted }}>spatial_universe</span>
              </div>

              {/* HUD Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono border transition-all cursor-pointer flex items-center gap-1"
                  style={{
                    backgroundColor: showLabels ? 'rgba(255,255,255,0.08)' : 'transparent',
                    borderColor: activeTheme.border,
                    color: showLabels ? activeTheme.textBright : activeTheme.textMuted
                  }}
                  title="Toggle node label visibility"
                >
                  <Type size={11} />
                  <span>{showLabels ? 'Labels: ON' : 'Labels: OFF'}</span>
                </button>

                <div className="flex items-center rounded border" style={{ borderColor: activeTheme.border, backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <button
                    onClick={handleZoomIn}
                    className="p-1 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    style={{ color: activeTheme.textSecondary }}
                    title="Zoom in"
                  >
                    <ZoomIn size={12} />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-1 hover:bg-white/[0.08] transition-colors cursor-pointer"
                    style={{ color: activeTheme.textSecondary }}
                    title="Zoom out"
                  >
                    <ZoomOut size={12} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-1.5 py-0.5 text-[10px] transition-colors cursor-pointer border-l"
                    style={{ borderColor: activeTheme.border, color: activeTheme.textMuted }}
                    title="Reset zoom"
                  >
                    {Math.round(zoomDisplay)}%
                  </button>
                </div>

                <button
                  onClick={handleRefactor}
                  className="px-2 py-0.5 rounded border transition-all cursor-pointer text-[10px] font-mono flex items-center gap-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: activeTheme.border,
                    color: activeTheme.textSecondary
                  }}
                  title="Refactor graph back to pristine initial layout"
                >
                  <RotateCcw size={10} />
                  <span>Refactor</span>
                </button>
              </div>
            </div>
          )}

          {/* Viewport Content */}
          <div className="flex-1 w-full h-full relative overflow-hidden">
            {activeDocTab === 'spatial' ? (
              <>
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerLeave}
                  className={`w-full h-full block touch-none ${isDragging ? 'cursor-grabbing' : (hoveredNode ? (hoveredNode.type === 'folder' ? 'cursor-grab' : 'cursor-pointer') : 'cursor-default')}`}
                />

                {/* Spatial Radar Minimap */}
                <div 
                  className="absolute bottom-3 right-3 z-30 w-32 h-20 rounded-xl border shadow-xl overflow-hidden pointer-events-none select-none backdrop-blur-md flex items-center justify-center p-1.5 animate-in fade-in zoom-in-95 duration-200"
                  style={{
                    backgroundColor: activeTheme.surface,
                    borderColor: activeTheme.border,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)'
                  }}
                >
                  <svg width="100%" height="100%" className="overflow-visible">
                    {minimapNodes.map(mn => (
                      <circle key={mn.id} cx={mn.cx} cy={mn.cy} r={mn.r} fill={mn.color} opacity={0.85} />
                    ))}
                  </svg>
                </div>

                {/* Conflict-Free Scroll Hint Toast */}
                {showScrollHint && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-opacity duration-200">
                    <div className="px-3 py-1 bg-black/80 backdrop-blur border border-white/15 rounded-full text-[11px] font-mono text-slate-300 shadow-xl flex items-center gap-1.5">
                      <span className="px-1 py-0.2 bg-white/10 rounded text-[10px] text-slate-200">Ctrl</span>
                      <span>+ scroll to zoom graph</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Code Editor View for App.jsx */
              <div 
                className="w-full h-full p-4 overflow-y-auto font-mono text-xs select-text"
                style={{
                  backgroundColor: activeTheme.background,
                  color: activeTheme.textPrimary
                }}
              >
                <div className="space-y-1 leading-relaxed">
                  <p className="text-slate-500">// src/App.jsx - Hardware-Accelerated Spatial Universe</p>
                  <p><span className="text-purple-400">import</span> React, &#123; useState, useEffect &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'react'</span>;</p>
                  <p><span className="text-purple-400">import</span> PixiSpatialEngine <span className="text-purple-400">from</span> <span className="text-emerald-400">'./components/canvas/PixiSpatialEngine'</span>;</p>
                  <p><span className="text-purple-400">import</span> TopBar <span className="text-purple-400">from</span> <span className="text-emerald-400">'./components/layout/TopBar'</span>;</p>
                  <p><span className="text-purple-400">import</span> ActivityBar <span className="text-purple-400">from</span> <span className="text-emerald-400">'./components/layout/ActivityBar'</span>;</p>
                  <p><span className="text-purple-400">import</span> &#123; usePhysicsEngine &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'./hooks/usePhysicsEngine'</span>;</p>
                  <br />
                  <p><span className="text-blue-400">export default function</span> <span className="text-amber-400">App</span>() &#123;</p>
                  <p className="pl-4"><span className="text-blue-400">const</span> [activeTheme, setActiveTheme] = <span className="text-amber-400">useState</span>(<span className="text-emerald-400">'black'</span>);</p>
                  <p className="pl-4"><span className="text-blue-400">const</span> &#123; nodes, edges, simDataRef &#125; = <span className="text-amber-400">usePhysicsEngine</span>();</p>
                  <br />
                  <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                  <p className="pl-8 text-slate-300">&lt;<span className="text-blue-400">div</span> <span className="text-sky-300">className</span>=<span className="text-emerald-400">"neuron-universe flex flex-col h-screen"</span>&gt;</p>
                  <p className="pl-12 text-slate-300">&lt;<span className="text-blue-400">TopBar</span> <span className="text-sky-300">title</span>=<span className="text-emerald-400">"Neuron - workspace"</span> /&gt;</p>
                  <p className="pl-12 text-slate-300">&lt;<span className="text-blue-400">div</span> <span className="text-sky-300">className</span>=<span className="text-emerald-400">"flex-1 flex overflow-hidden"</span>&gt;</p>
                  <p className="pl-16 text-slate-300">&lt;<span className="text-blue-400">ActivityBar</span> /&gt;</p>
                  <p className="pl-16 text-slate-300">&lt;<span className="text-blue-400">PixiSpatialEngine</span> <span className="text-sky-300">nodes</span>=&#123;nodes&#125; <span className="text-sky-300">edges</span>=&#123;edges&#125; /&gt;</p>
                  <p className="pl-12 text-slate-300">&lt;/<span className="text-blue-400">div</span>&gt;</p>
                  <p className="pl-8 text-slate-300">&lt;/<span className="text-blue-400">div</span>&gt;</p>
                  <p className="pl-4">);</p>
                  <p>&#125;</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Terminal Panel (h-24) */}
          {isTerminalOpen && (
            <div 
              className="h-24 shrink-0 border-t flex flex-col font-mono text-xs select-none transition-colors duration-150"
              style={{
                backgroundColor: activeTheme.secondary,
                borderColor: activeTheme.border,
                color: activeTheme.textPrimary
              }}
            >
              {/* Terminal Header */}
              <div 
                className="h-7 shrink-0 border-b flex items-center justify-between px-0 select-none"
                style={{ borderColor: activeTheme.border }}
              >
                <div className="flex items-center h-full">
                  <button 
                    onClick={() => setActiveTerminalTab('output')}
                    className={`h-full px-3 flex items-center text-[11px] font-mono font-medium border-r transition-colors cursor-pointer ${
                      activeTerminalTab === 'output' ? 'font-semibold border-t-2' : 'hover:text-white'
                    }`}
                    style={{
                      backgroundColor: activeTerminalTab === 'output' ? activeTheme.background : activeTheme.secondary,
                      borderColor: activeTheme.border,
                      borderTopColor: activeTerminalTab === 'output' ? activeTheme.accent : 'transparent',
                      color: activeTerminalTab === 'output' ? activeTheme.accent : activeTheme.textSecondary
                    }}
                  >
                    Output
                  </button>

                  <button 
                    onClick={() => setActiveTerminalTab('powershell')}
                    className={`h-full px-3 flex items-center gap-1.5 text-[11px] font-mono font-medium border-r transition-colors cursor-pointer ${
                      activeTerminalTab === 'powershell' ? 'font-semibold border-t-2' : 'hover:text-white'
                    }`}
                    style={{
                      backgroundColor: activeTerminalTab === 'powershell' ? activeTheme.background : activeTheme.secondary,
                      borderColor: activeTheme.border,
                      borderTopColor: activeTerminalTab === 'powershell' ? activeTheme.accent : 'transparent',
                      color: activeTerminalTab === 'powershell' ? activeTheme.accent : activeTheme.textSecondary
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    powershell
                  </button>
                </div>

                <div className="flex items-center gap-2 pr-2">
                  <button 
                    onClick={() => setTerminalHistory([])}
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer" 
                    title="Clear Terminal"
                  >
                    <Trash2 size={11} />
                  </button>
                  <button 
                    onClick={() => setIsTerminalOpen(false)}
                    className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer" 
                    title="Close Panel"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="flex-1 p-2 overflow-y-auto font-mono text-[11px] select-text">
                {activeTerminalTab === 'powershell' ? (
                  <div className="space-y-1">
                    {terminalHistory.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span style={{ color: activeTheme.accent }}>PS C:\Neuron&gt;</span>
                          <span className="text-white">{item.cmd}</span>
                        </div>
                        {item.stdout && (
                          <pre className="text-slate-400 whitespace-pre-wrap pl-2 leading-tight">
                            {item.stdout}
                          </pre>
                        )}
                      </div>
                    ))}

                    {/* Active Prompt Input */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <span style={{ color: activeTheme.accent }}>PS C:\Neuron&gt;</span>
                      <input 
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyDown={handleTerminalSubmit}
                        placeholder="Type 'git status' or 'clear'..."
                        className="flex-1 bg-transparent border-none outline-none text-white text-[11px] font-mono placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 space-y-1">
                    <p className="text-blue-400">[Neuron Engine] Spatial Graph initialized with 500+ nodes and 40 clusters.</p>
                    <p className="text-emerald-400">[WebGPU] Hardware acceleration verified at 300 FPS.</p>
                    <p className="text-slate-500">[Diagnostics] 0 syntax errors detected.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. STATUS BAR (Parity with StatusBar.jsx) */}
      <div 
        className="h-6 shrink-0 border-t flex items-center justify-between px-3 text-[11px] font-mono select-none z-50 transition-colors duration-150"
        style={{
          backgroundColor: activeTheme.secondary,
          borderColor: activeTheme.border,
          color: activeTheme.textSecondary
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-2 h-full overflow-hidden">
          <button 
            onClick={handleResetZoom}
            className="hover:text-blue-400 transition-colors cursor-pointer"
            title="Center Spatial Map on Active Bridges"
          >
            <span>3 bridges</span>
          </button>
          <span className="opacity-40">·</span>
          <span>186 nodes · 214 links</span>
          <span className="opacity-40">·</span>
          <span>0 errors</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2.5 h-full shrink-0">
          <div className="flex items-center gap-1 text-[10px]">
            <GitBranch size={11} className="text-blue-400" />
            <span className="text-slate-300 hover:text-white cursor-pointer">main*</span>
          </div>

          <span className="opacity-40">·</span>
          <div className="flex items-center gap-1 text-[10px]">
            <CheckCircle2 size={10} className="text-emerald-500" />
            <span>Saved</span>
          </div>

          <span className="opacity-40 hidden sm:inline">·</span>
          <button 
            onClick={handleRefactor}
            className="text-[10px] hover:text-white transition-colors font-mono flex items-center gap-1 cursor-pointer"
          >
            <span>Refactor:</span>
            <span className="text-blue-400 font-semibold">ON</span>
          </button>

          <span className="opacity-40 hidden sm:inline">·</span>
          <div className="text-[10px] font-mono flex items-center gap-1">
            <span className="hidden sm:inline">Blast:</span>
            <span className="text-blue-400 font-semibold">ON</span>
          </div>

          <span className="opacity-40 hidden md:inline">·</span>
          <div className="text-[10px] hidden md:flex">
            Ln 42, Col 1
          </div>

          <span className="opacity-40 hidden sm:inline">·</span>
          <div className="text-[10px] uppercase hidden sm:flex">
            UTF-8
          </div>

          <span className="opacity-40">·</span>
          <div className="text-[10px]">
            <span>{activeDocTab === 'spatial' ? 'Spatial Map' : 'JavaScript React'}</span>
          </div>

          <span className="opacity-40">·</span>
          <div className="relative flex items-center">
            <Bell size={12} className="text-slate-400 hover:text-white cursor-pointer" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
