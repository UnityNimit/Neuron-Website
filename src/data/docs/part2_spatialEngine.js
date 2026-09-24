// src/data/docs/part2_spatialEngine.js

export const PART2_SPATIAL_ENGINE_DOCS = {
  'spatial-overview': {
    category: 'Spatial Canvas & Graph ML',
    title: 'Spatial Canvas Engine & Celestial Taxonomy',
    subtitle: 'Complete architectural reference for Neuron’s 2D celestial graph model: how directories, files, functions, classes, and super-nodes are structured, colored, and interacted with on the canvas.',
    sections: [
      {
        id: 'celestial-hierarchy',
        title: '1. The Three-Tier Celestial Node Hierarchy (Suns, Planets, Moons)',
        desc: 'To prevent large codebases from degenerating into unreadable "hairball" graphs, Neuron organizes every repository into a strict three-tier gravitational hierarchy:',
        paragraphs: [
          'Conventional dependency graphs treat folders, files, and functions as flat nodes with identical physics rules, causing thousands of symbols to tangle across the screen. Neuron solves this by modeling your codebase as a hierarchical solar system defined in usePhysicsEngine.js and engineConfig.js.',
          'Every entity extracted by the Tree-Sitter AST parser is assigned a structural tier (0, 1, or 2), a base pixel diameter, a collision radius, and a semantic color tint that adapts dynamically if the Graph ML engine detects architectural risk.'
        ],
        table: {
          headers: ['Celestial Tier', 'AST Entity Type (nodeType)', 'Base Size (px)', 'Collision Radius', 'Default Theme Color', 'Gravitational Role'],
          rows: [
            ['Tier 0 — Suns', 'folder (Directory Containers)', '36 px - 44 px', '40 px', '#e4ef61 / #3b82f6', 'High-repulsion (-1800) gravitational anchors that separate top-level subsystems (e.g., backend/, frontend/, services/)'],
            ['Tier 1 — Planets', 'file (Source Code Modules)', '18 px - 26 px', '22 px', '#3b82f6 / #eab308', 'Medium-repulsion (-600) nodes that orbit their parent Folder Sun at planetOrbit distance (95 px)'],
            ['Tier 2 — Moons', 'function (Functions, Classes, Methods, Routes)', '10 px - 14 px', '12 px', '#8b5cf6 / #a855f7', 'Low-repulsion (-150) callable symbols that orbit their parent File Planet at moonOrbit distance (45 px)'],
            ['Macro LOD — Super-Nodes', 'superNode (Top-Level Cluster Aggregates)', '28 px - 90 px (Log10 LOC)', 'Dynamic', 'Cluster Nebula Tint', 'Rendered automatically when camera zoom drops below 0.22 to summarize entire subsystems cleanly']
          ]
        },
        points: [
          {
            label: 'Risk-Override Color Coding',
            text: 'Regardless of whether a node is a File Planet or Function Moon, if the 10-Dimensional ML Analyzer classifies its risk level as "high", its WebGPU sprite tint automatically overrides to Crimson Red (0xef4444). If classified as "medium" risk, it tints to Amber Gold (0xf59e0b).'
          },
          {
            label: 'Deterministic Canonical Node IDs',
            text: 'Folder and file nodes use their normalized workspace-relative path as their canonical ID (e.g., "backend/core/parser.py"). Function and class moons use a composite ID combining their file path and symbol name (e.g., "backend/core/parser.py::parse_workspace"), guaranteeing zero ID collisions across identically named functions in different files.'
          }
        ]
      },
      {
        id: 'super-nodes-macro-lod',
        title: '2. Macro Super-Nodes & Logarithmic LOC Scaling',
        desc: 'When zooming out to view an entire enterprise repository from high altitude (camera scale < 0.22), individual function moons and file planets smoothly fade into aggregated Super-Nodes.',
        paragraphs: [
          'In usePhysicsEngine.js, Neuron groups all workspace nodes by their top-level subsystem key (node.data.filePath.split("/")[0] or "root") and computes two real-time aggregate metrics: totalNodes (total files and symbols inside that subsystem) and totalLOC (cumulative lines of code).',
          'Each Super-Node’s visual radius is computed via a logarithmic scaling law so massive subsystems are visually prominent without dwarfing smaller packages:'
        ],
        codeBlocks: [
          {
            label: 'Super-Node Logarithmic Radius Formula (usePhysicsEngine.js)',
            language: 'javascript',
            code: `const superNodes = Array.from(clusterMap.values()).map(c => ({
  ...c,
  radius: Math.min(90, 28 + Math.log10(c.totalLOC + 1) * 16)
}));`
          }
        ],
        points: [
          {
            label: 'Live Centroid Tracking',
            text: 'On every 60Hz render tick, each Super-Node dynamically computes the arithmetic mean (centroid x, y) of all spawned child nodes in its cluster, floating seamlessly at the exact center of mass of its subsystem.'
          },
          {
            label: 'Dual-Ring Halo Texture',
            text: 'Super-Nodes are rendered using a pre-generated GPU texture (superTexture) featuring an inner 64px core at 85% alpha surrounded by an outer 128px atmospheric halo at 12% alpha, labeled with the subsystem name in uppercase and its exact node count (e.g., "BACKEND (142 nodes)").'
          }
        ]
      },
      {
        id: 'focus-isolation-and-raycasting',
        title: '3. Focus Isolation Mode & Interactive Ray Highlighting',
        desc: 'When inspecting a densely connected module, Neuron provides two complementary visual filtering mechanisms to eliminate visual noise:',
        points: [
          {
            label: 'Hover Ray Highlighting (activeRay)',
            text: 'Hovering over any node sets activeRay to that node’s ID. Every edge connected to activeRay boosts its alpha to 0.95 and increases its stroke width to widthHoverGlow (3.5px), while unrelated background edges dim to 0.08 alpha. Simultaneously, animated photon pulses accelerate along the hovered node’s call and import conduits.'
          },
          {
            label: 'Click Focus Isolation (focusIsolationId)',
            text: 'Activating Focus Isolation on a node computes its 1-hop neighborhood set (focusNeighborSet) across all hierarchy, import, call, and network bridge edges. Every node outside this immediate neighborhood is dimmed to 8% alpha (0.08), and every non-incident edge is dimmed to 2% alpha (0.02), isolating the exact call subgraph you are debugging.'
          }
        ]
      },
      {
        id: 'interactive-refactoring-gestures',
        title: '4. On-Canvas Visual Refactoring & File Merging Gestures',
        desc: 'When Refactor Mode (refactorEnabled) is toggled on in the TopBar, the spatial canvas transforms from an observability viewport into an interactive AST surgery workbench:',
        table: {
          headers: ['Refactor Operation', 'Source Node Dragged', 'Target Node Dropped On', 'Proximity Threshold', 'Backend Execution Pipeline'],
          rows: [
            ['Cross-File Symbol Transplant', 'Tier 2 Function Moon (function)', 'Tier 1 File Planet (file)', 'FUNCTION_CAPTURE_PROXIMITY_PX = 85 px', 'Dispatches REFACTOR_SYMBOL_MOVE -> AC-3 CSP Solver validation -> LibCST (Python) or Tree-Sitter (JS/TS) surgical move + automatic import injection'],
            ['Full Module Merge', 'Tier 1 File Planet (.js/.jsx/.ts/.tsx)', 'Tier 1 File Planet (.js/.jsx/.ts/.tsx)', 'FILE_MERGE_PROXIMITY_PX = 110 px', 'Dispatches REFACTOR_FILE_MERGE -> execute_js_file_merge() combines exports, deduplicates imports, updates all workspace references, and removes redundant source file']
          ]
        },
        points: [
          {
            label: 'Live Target Capture Ring & Tether Line',
            text: 'While dragging a Function Moon in Refactor Mode, when your cursor comes within 85px of a different File Planet, refactorOverlay renders a glowing green capture ring (0x22c55e) around the target planet and a live tether line from the dragged moon to the target center.'
          },
          {
            label: 'CSP Violation Shockwave & Elastic Snap-Back',
            text: 'If you drop a function onto a file that would create a circular import cycle or scope collision, the AC-3 solver rejects the move and emits REFACTOR_CSP_VIOLATION. The canvas immediately spawns an expanding red shockwave ring (0xef4444) at the drop site and smoothly animates the node back to its original coordinates (snapBackQueue).'
          }
        ]
      }
    ]
  },

  'physics-relaxation': {
    category: 'Spatial Canvas & Graph ML',
    title: 'D3 Force-Directed Physics & Perpetual Equilibrium',
    subtitle: 'Mathematical specification of Neuron’s custom D3-Force simulation engine, tiered repulsion fields, Hooke spring laws, cascade spawning, and zero-copy memory synchronization.',
    sections: [
      {
        id: 'physics-engine-constants',
        title: '1. The Physics Engine Laws (frontend/src/config/engineConfig.js)',
        desc: 'Neuron’s spatial layout is governed by a tuned multi-force simulation configured in ENGINE_CONFIG.PHYSICS:',
        codeBlocks: [
          {
            label: 'Complete Physics Configuration (frontend/src/config/engineConfig.js)',
            language: 'javascript',
            code: `PHYSICS: {
  GRAVITY_PULL: 0.025,         // Gentle X/Y centering (prevents black-hole crushing)
  REPULSION: {
    folder: -1800,             // Suns push outwards firmly
    file: -600,                // Planets space out cleanly
    function: -150             // Moons orbit smoothly without exploding
  },
  SPRING_DISTANCE: {
    moonOrbit: 45,             // Tight, clean functional orbits around parent file
    planetOrbit: 95,           // Space between files and parent directories
    neuralCall: 180            // Long cross-file call & import conduits
  },
  SPRING_STRENGTH: {
    structural: 0.9,           // High elastic spring tension for directory/file hierarchy
    neural: 0.15               // Flexible call pathways so cross-calls don't rip moons away
  },
  COLLISION_RADIUS: {
    folder: 40,
    file: 22,
    function: 12
  },
  ALPHA_DECAY: 0.02,           // Smooth natural settling rate
  VELOCITY_DECAY: 0.45         // Fluid momentum with clean friction damping
}`
          }
        ],
        points: [
          {
            label: 'Why Structural Springs (0.9) Outweigh Neural Call Springs (0.15)',
            text: 'If function call edges had the same spring tension as file containment edges, a utility function called by 15 different files would be violently ripped away from its own parent file. By assigning structural containment a spring strength of 0.9 (at 45px distance) and cross-file call edges a flexible strength of 0.15 (at 180px distance), functions always remain visibly orbiting their parent file while gently orienting toward their callers.'
          },
          {
            label: 'Distance-Clamped Many-Body Repulsion',
            text: 'd3.forceManyBody() is configured with .distanceMax(1200) and .theta(0.8) (Barnes-Hut quadtree approximation), reducing N-body repulsion complexity from O(N^2) to O(N log N) and preventing distant clusters from pushing each other off to infinity.'
          }
        ]
      },
      {
        id: 'perpetual-equilibrium',
        title: '2. Perpetual Cosmic Motion & Alpha Target Lifecycle',
        desc: 'Standard D3 force graphs freeze completely once alpha decays to zero, making the canvas feel static and lifeless. Neuron implements a perpetual low-energy equilibrium loop:',
        table: {
          headers: ['Simulation State', 'Alpha Parameter', 'Configured Value', 'Behavioral Effect'],
          rows: [
            ['Initial Cascade Spawn', 'alpha / alphaTarget', 'alpha = 0.65 -> 0.35, alphaTarget = 0.018', 'Energizes the graph as tiers spawn sequentially so clusters unfold organically'],
            ['Resting Perpetual Float', 'RESTING_ALPHA_TARGET', '0.018', 'Maintains subtle, continuous cosmic breathing without drifting nodes out of position'],
            ['Active Node Dragging', 'DRAGGING_ALPHA_TARGET', '0.25 (alpha boosted to 0.35)', 'Immediately wakes connected neighbors so springs react in real time as you drag a node'],
            ['Physics Paused (Settings)', 'physicsSimulation = false', 'simulation.stop()', 'Freezes all automatic force calculations while still allowing manual node dragging and pinning']
          ]
        },
        points: [
          {
            label: 'No Mouse Avoidance (Zero Cursor Fleeing)',
            text: 'Unlike gimmicky particle demos where nodes flee from the mouse cursor, Neuron intentionally omits cursor repulsion forces. Nodes stay steady under your pointer so you can click, double-click, hover, and drag symbols with pixel-perfect accuracy.'
          },
          {
            label: 'Coordinate Sanity & Anti-NaN Clamping',
            text: 'On every simulation tick, sanitizeCoordinate() verifies that node.x, node.y, node.vx, and node.vy are finite numbers (typeof val === "number" && isFinite(val) && !isNaN(val)) and clamps world coordinates within [-50000, 50000] so degenerate disconnected subgraphs can never produce NaN WebGPU matrices.'
          }
        ]
      },
      {
        id: 'tiered-cascade-spawning',
        title: '3. Three-Stage Celestial Cascade Spawning',
        desc: 'When a workspace is first loaded, spawning all 1,000+ nodes at the origin (0,0) simultaneously would cause an chaotic physics explosion. Neuron solves this via a 3-stage hierarchical spawn cascade in usePhysicsEngine.js:',
        paragraphs: [
          'When new nodes enter the graph, spawnNextTier(currentTier) introduces them in three sequential waves separated by 180ms intervals, seeding each child node’s initial (x, y) coordinates in a golden-angle spiral around its parent node’s current position:'
        ],
        codeBlocks: [
          {
            label: 'Golden-Angle Radial Child Seeding (usePhysicsEngine.js)',
            language: 'javascript',
            code: `const pId = parentMap.get(node.id);
const parentNode = pId ? nodeLookup.get(pId) : null;

if (parentNode && parentNode.isSpawned) {
  const siblings = childrenMap.get(pId) || [];
  const idx = siblings.indexOf(node.id);
  const angle = (idx / Math.max(1, siblings.length)) * Math.PI * 2;
  const radius = currentTier === 1 ? 65 : 32;
  node.x = sanitizeCoordinate(parentNode.x + Math.cos(angle) * radius, 0);
  node.y = sanitizeCoordinate(parentNode.y + Math.sin(angle) * radius, 0);
}`
          }
        ],
        points: [
          {
            label: 'Wave 0 (T + 0ms): Folder Suns',
            text: 'All Tier 0 directory nodes spawn first and establish the macro coordinate skeleton of the repository.'
          },
          {
            label: 'Wave 1 (T + 180ms): File Planets',
            text: 'All Tier 1 file nodes spawn in a 65px ring around their parent Folder Sun and scale up using the elastic easeOutBack(spawnProgress) curve.'
          },
          {
            label: 'Wave 2 (T + 360ms): Function & Class Moons',
            text: 'All Tier 2 callable symbol nodes spawn in a 32px ring around their parent File Planet, completing the solar system without any cross-cluster tangling.'
          }
        ]
      }
    ]
  },

  'louvain-clusters': {
    category: 'Spatial Canvas & Graph ML',
    title: 'Louvain Modularity & Nebula Cluster Geometry',
    subtitle: 'How Neuron uses unsupervised NetworkX Louvain community detection, weighted semantic edges, and D3 convex hull geometry to render glowing microservice nebulae.',
    sections: [
      {
        id: 'weighted-graph-construction',
        title: '1. Weighted Semantic Topology Construction (backend/ml/analyzer.py)',
        desc: 'Before running community detection, Neuron constructs a weighted undirected graph G and a weighted directed graph DiG in NetworkX.',
        paragraphs: [
          'Not all code relationships carry equal architectural coupling weight. Two functions connected by a live cross-stack HTTP/WebSocket route or a direct AST function call are much more tightly coupled than two unrelated files sitting in the same top-level folder. Neuron assigns a 4-tier semantic weight hierarchy to every edge:'
        ],
        table: {
          headers: ['Edge Type (edge.type)', 'Semantic Weight', 'Architectural Meaning'],
          rows: [
            ['network_bridge', '60.0', 'Cross-stack Frontend-to-Backend HTTP/WebSocket laser conduit (highest coupling affinity)'],
            ['call', '40.0', 'Direct AST function or method invocation across or within modules'],
            ['import', '20.0', 'Explicit ES6 import/require, Python import/from, or C/C++ #include dependency'],
            ['hierarchy', '1.0', 'Baseline structural directory-to-file or file-to-function containment']
          ]
        },
        points: [
          {
            label: 'Deduplicated Edge Pairs',
            text: 'seen_edge_pairs ensures that multiple calls between the same pair of symbols do not artificially skew graph centrality or cause parallel edge clutter.'
          }
        ]
      },
      {
        id: 'louvain-algorithm',
        title: '2. Adaptive Resolution Louvain Community Detection',
        desc: 'Neuron partitions the weighted graph G into cohesive architectural communities using networkx.algorithms.community.louvain_communities.',
        paragraphs: [
          'The Louvain algorithm optimizes Newman-Girvan modularity Q by iteratively moving nodes between communities to maximize internal edge weight relative to a random null model:'
        ],
        codeBlocks: [
          {
            label: 'Adaptive Louvain Modularity Execution (backend/ml/analyzer.py)',
            language: 'python',
            code: `graph_size = len(nodes)
dynamic_res = 1.2 if graph_size > 100 else 1.05
communities = louvain_communities(G, weight='weight', resolution=dynamic_res, seed=42)

for cluster_idx, member_set in enumerate(communities):
    for node_id in member_set:
        community_map[node_id] = int(cluster_idx)`
          }
        ],
        points: [
          {
            label: 'Deterministic Seed (seed=42)',
            text: 'By fixing the random seed to 42, community IDs and their corresponding nebula colors remain 100% stable across file saves and re-indexes.'
          },
          {
            label: 'Adaptive Resolution Scaling (1.05 vs 1.20)',
            text: 'For smaller workspaces (<= 100 nodes), resolution is set to 1.05 to favor broader macro clusters. For larger codebases (> 100 nodes), resolution increases to 1.20 to resolve finer-grained domain modules and microservice boundaries.'
          }
        ]
      },
      {
        id: 'convex-hull-nebula-rendering',
        title: '3. Convex Hull Nebula Geometry & GPU Blur Pipeline',
        desc: 'How PixiSpatialEngine.jsx transforms discrete community IDs into organic, glowing background nebulae at 60 FPS:',
        paragraphs: [
          'On every animation frame (when camera zoom scale >= 0.18), PixiSpatialEngine groups all visible nodes by their assigned data.community integer. For every community containing at least 3 nodes, it generates an expanded point cloud by placing 4 cardinal padding points (+/- 65px in X and Y) around each node’s world coordinates.',
          'It then computes the exact outer 2D convex hull polygon using d3-polygon’s Andrew’s monotone chain algorithm (polygonHull) and renders it onto nebulaLayer with a hardware PIXI.BlurFilter (blurRadius = 35):'
        ],
        table: {
          headers: ['Community Index (mod 6)', 'Nebula Fill & Stroke Hex', 'Visual Color Identity'],
          rows: [
            ['Cluster 0', '#3b82f6', 'Electric Cobalt Blue'],
            ['Cluster 1', '#a855f7', 'Quantum Amethyst Purple'],
            ['Cluster 2', '#22c55e', 'Emerald Matrix Green'],
            ['Cluster 3', '#ec4899', 'Sakura Rose Magenta'],
            ['Cluster 4', '#eab308', 'Solar Amber Gold'],
            ['Cluster 5', '#f97316', 'Supernova Tangerine Orange']
          ]
        },
        points: [
          {
            label: 'Soft Atmospheric Blending',
            text: 'Each convex hull is filled at fillOpacity = 0.08 and stroked with an 80px wide rounded boundary at strokeOpacity = 0.20, creating a smooth, non-intrusive territorial glow behind related code.'
          }
        ]
      }
    ]
  },

  'ml-diagnostics': {
    category: 'Spatial Canvas & Graph ML',
    title: '10D Isolation Forest & Architectural Code Smell Engine',
    subtitle: 'Deep mathematical breakdown of Neuron’s Graph Machine Learning pipeline: PageRank authority, Betweenness bottlenecks, Shannon character entropy, 10D Isolation Forest anomaly detection, and automated code smell diagnosis.',
    sections: [
      {
        id: 'dual-graph-centrality',
        title: '1. Dual-Graph Centrality: PageRank Authority & Betweenness Bottlenecks',
        desc: 'In backend/ml/analyzer.py, Neuron evaluates every node’s structural importance using two distinct graph-theoretic centrality algorithms:',
        points: [
          {
            label: 'Normalized PageRank Authority (nx.pagerank on DiG)',
            text: 'Computed over the directed dependency graph DiG with damping factor alpha = 0.85, max_iter = 500, and tol = 1e-5, normalized against the maximum score in the workspace (norm_pr in [0.0, 1.0]). High PageRank identifies foundational core modules and heavily depended-upon functions.'
          },
          {
            label: 'Normalized Betweenness Centrality (nx.betweenness_centrality on G)',
            text: 'Measures the fraction of all shortest paths in the codebase that pass through a given node, normalized to [0.0, 1.0]. For graphs exceeding 80 nodes, Neuron uses k-sampled approximation (k = min(60, len(G)), seed = 42) to maintain sub-10ms latency. High Betweenness (> 0.65) pinpoints architectural bridge bottlenecks where a failure can cascade across otherwise separate clusters.'
          },
          {
            label: 'Fan-In / Fan-Out Degree Ratio',
            text: 'Records exact directed in_degree (number of upstream callers/importers) and out_degree (number of downstream callees/imports), computing the smoothed ratio (in_deg + 1.0) / (out_deg + 1.0).'
          }
        ]
      },
      {
        id: 'shannon-entropy',
        title: '2. Shannon Character Entropy Calculation',
        desc: 'Cyclomatic complexity alone cannot detect dense regexes, deeply packed comprehensions, or obfuscated one-liners. Neuron complements AST complexity by computing the information-theoretic Shannon Entropy H(X) of every code block:',
        codeBlocks: [
          {
            label: 'Shannon Entropy Implementation (backend/ml/analyzer.py)',
            language: 'python',
            code: `def compute_shannon_entropy(code_str: str) -> float:
    """
    Calculates the Shannon Entropy H(X) over the character distribution of a code block.
    High entropy (>4.8) indicates dense algorithmic logic, obfuscation, or high cognitive load.
    Formula: H(X) = - sum( P(x) * log2(P(x)) )
    """
    if not code_str or not code_str.strip():
        return 0.0
    clean_code = code_str.strip()
    length = len(clean_code)
    counts = Counter(clean_code)
    entropy = 0.0
    for count in counts.values():
        p = count / length
        if p > 0:
            entropy -= p * math.log2(p)
    return float(round(entropy, 4))`
          }
        ],
        points: [
          {
            label: 'Cognitive Load Threshold (H > 4.85 bits/char)',
            text: 'Clean, idiomatic source code typically exhibits a Shannon entropy between 3.8 and 4.5 bits per character. When a short function (< 25 LOC) exceeds 4.85 bits per character, Neuron flags it for excessive symbolic density.'
          }
        ]
      },
      {
        id: 'ten-dimensional-feature-tensor',
        title: '3. The 10-Dimensional Continuous Feature Tensor & Isolation Forest',
        desc: 'For every node in the workspace, Neuron synthesizes a 10-dimensional continuous feature vector X in R^10 and normalizes the matrix via Min-Max scaling:',
        table: {
          headers: ['Tensor Dimension', 'Feature Variable', 'Source Metric & Mathematical Definition'],
          rows: [
            ['Dimension 1 (x1)', 'x1_loc', 'Lines of Code (LOC) spanned by the file or AST symbol'],
            ['Dimension 2 (x2)', 'x2_complexity', 'Iterative AST Cyclomatic Decision Trigger count (if, for, while, catch, ternary, etc.)'],
            ['Dimension 3 (x3)', 'x3_density', 'Complexity Density ratio: complexity / max(1, loc)'],
            ['Dimension 4 (x4)', 'x4_nesting', 'Maximum AST block nesting depth within the symbol'],
            ['Dimension 5 (x5)', 'x5_params', 'Formal parameter count in function signature'],
            ['Dimension 6 (x6)', 'x6_churn', 'Historical Git commit modification frequency across the last 100 commits'],
            ['Dimension 7 (x7)', 'x7_pr', 'Normalized PageRank authority score in [0.0, 1.0]'],
            ['Dimension 8 (x8)', 'x8_bw', 'Normalized Betweenness centrality bottleneck score in [0.0, 1.0]'],
            ['Dimension 9 (x9)', 'x9_fan_ratio', 'Smoothed Fan-In to Fan-Out ratio: (in_degree + 1.0) / (out_degree + 1.0)'],
            ['Dimension 10 (x10)', 'x10_entropy', 'Shannon Character Entropy H(X) in bits per character']
          ]
        },
        points: [
          {
            label: 'Unsupervised Isolation Forest (n_estimators=80, n_jobs=1)',
            text: 'When a workspace contains at least 6 nodes, Neuron fits a Scikit-Learn IsolationForest (random_state=42, n_jobs=1) with an adaptive contamination rate clamped between 2% and 12% (max(0.02, min(0.12, 6.0 / len(feature_rows)))). Nodes predicted as -1 are marked with is_anomaly = True.'
          },
          {
            label: 'Pure-NumPy Euclidean Median Fallback',
            text: 'If Scikit-Learn is unavailable in a minimal environment, Neuron automatically falls back to a pure-NumPy multivariate median Euclidean distance outlier detector (np.linalg.norm(X_norm - np.median(X_norm, axis=0), axis=1)) at the exact same percentile cutoff.'
          }
        ]
      },
      {
        id: 'risk-scoring-and-smell-diagnosis',
        title: '4. Multi-Factor Risk Scoring & Automated Code Smell Diagnosis',
        desc: 'Finally, Neuron combines static AST metrics, Git churn, centrality, and ML anomaly flags into a composite risk_score and diagnoses six specific architectural code smells:',
        codeBlocks: [
          {
            label: 'Composite Risk Score Formula (backend/ml/analyzer.py)',
            language: 'python',
            code: `risk_score = float(
    (complexity * 0.35) +
    (churn * 1.8) +
    (density * 12.0) +
    (bw * 6.0) +
    (1.5 if is_anomaly else 0.0)
)`
          }
        ],
        table: {
          headers: ['Diagnosed Architectural Smell', 'Exact Trigger Condition in analyzer.py', 'Engineering Remediation Advice'],
          rows: [
            ['God Object (Monolithic Centrality)', 'loc > 120 and pagerank > 0.70', 'Decompose monolithic file/class by dragging helper functions into dedicated domain modules'],
            ['Spaghetti Logic (Excessive Density)', 'density > 0.35 or (entropy > 4.85 and loc < 25)', 'Simplify deeply nested conditionals or unpack dense expressions into named helper functions'],
            ['Fragile Hotspot (High Churn + Complex)', 'churn >= 3 and complexity >= 4', 'Add unit test coverage and extract volatile business rules to stabilize frequently edited code'],
            ['System Bottleneck (Bridge Node)', 'betweenness > 0.65', 'Introduce an interface or event bus to decouple subsystems routing through this single bridge'],
            ['Dead Code Candidate (Isolated Symbol)', 'nodeType == "function" and in_deg == 0 and out_deg == 0 and loc > 10', 'Verify whether this unreferenced function is obsolete or missing an export/call wire'],
            ['Statistical Structural Anomaly', 'is_anomaly == True and no specific rule above matched', 'Inspect 10D feature metrics (unusual parameter count, nesting, or fan ratio relative to repo norms)']
          ]
        },
        points: [
          {
            label: 'High / Medium / Low Risk Classification Thresholds',
            text: 'A node is classified as High Risk (Red) if risk_score > 11.5, or (complexity >= 8 and churn >= 3), or if it triggers 2 or more architectural smell diagnoses. It is classified as Medium Risk (Amber) if risk_score > 5.0, complexity >= 4, or is_anomaly == True. Otherwise, it is classified as Low Risk ("Code topology is mathematically stable.").'
          }
        ]
      }
    ]
  },

  'webgpu-pipeline': {
    category: 'Spatial Canvas & Graph ML',
    title: 'PixiJS v8 WebGPU Pipeline & Level-of-Detail (LOD)',
    subtitle: 'How Neuron achieves 60 FPS rendering across thousands of AST nodes using PixiJS v8 WebGPU acceleration, an 8-stage depth-ordered graphics pipeline, and dynamic LOD culling.',
    sections: [
      {
        id: 'eight-layer-pipeline',
        title: '1. The 8-Stage Depth-Ordered Graphics Pipeline',
        desc: 'Inside PixiSpatialEngine.jsx, Neuron initializes a hardware-accelerated PIXI.Application (preference: "webgpu") and attaches an 8-layer scene graph to the infinite pixi-viewport:',
        table: {
          headers: ['Z-Order', 'Scene Graph Layer', 'PixiJS Display Object Type', 'Rendered Visual Contents'],
          rows: [
            ['Layer 1 (Back)', 'nebulaLayer', 'PIXI.Graphics + PIXI.BlurFilter (35px)', 'Louvain community convex hull polygons with soft atmospheric glow'],
            ['Layer 2', 'edgeLayer', 'PIXI.Graphics', 'Hierarchy containment lines, module import edges, AST call conduits, and neon network bridges'],
            ['Layer 3', 'bridgePhotonLayer', 'PIXI.Graphics', 'Animated high-voltage laser photons and hovered conduit data packets'],
            ['Layer 4', 'refactorOverlay', 'PIXI.Graphics', 'Drag-and-drop capture rings (green for symbol move, cyan for file merge) and CSP rejection shockwaves'],
            ['Layer 5', 'blastRadiusOverlay', 'PIXI.Graphics', 'Pulsating orange rings (0xf97316) around upstream/downstream impacted blast radius nodes'],
            ['Layer 6', 'superNodeLayer', 'PIXI.Container (Pre-baked Sprites)', 'Macro LOD subsystem Super-Nodes and aggregate count labels (visible at zoom < 0.22)'],
            ['Layer 7', 'nodeLayer', 'PIXI.Container (Instanced Circle Sprites)', 'All Tier 0 Folder Suns, Tier 1 File Planets, and Tier 2 Function Moons'],
            ['Layer 8 (Front)', 'labelLayer', 'PIXI.Container (PIXI.Text Pool)', 'Crisp 2x-supersampled JetBrains Mono node labels with dynamic zoom scaling']
          ]
        },
        points: [
          {
            label: 'Pre-Generated GPU Texture Reuse',
            text: 'Instead of tessellating thousands of vector circles on the CPU every frame, Neuron generates two reusable GPU textures at startup (circleTexture and superTexture) via app.renderer.generateTexture(). Every node in nodeLayer is a lightweight PIXI.Sprite sharing that single texture, tinted in hardware via sprite.tint.'
          },
          {
            label: 'ResizeObserver Synchronization',
            text: 'A native ResizeObserver monitors containerRef and immediately resizes both app.renderer and the pixi-viewport screen dimensions whenever you drag split-pane dividers or toggle sidebars.'
          }
        ]
      },
      {
        id: 'lod-camera-breakpoints',
        title: '2. Level-of-Detail (LOD) Camera Breakpoints & Label Culling',
        desc: 'Rendering thousands of text labels simultaneously when zoomed far out both clutters the screen and wastes GPU fill-rate. Neuron enforces progressive semantic zoom thresholds:',
        table: {
          headers: ['Camera Zoom Scale (viewport.scale.x)', 'Active LOD Regime', 'Visible Graph Elements & Culling Rules'],
          rows: [
            ['scale < 0.18', 'Ultra-Macro Regime', 'Nebula convex hulls hidden; Super-Nodes active; individual nodes faded to 15% alpha; only hierarchy edges drawn'],
            ['0.18 <= scale < 0.22', 'Macro Super-Node Regime', 'Louvain Nebulae visible; Super-Nodes fade out smoothly as scale approaches 0.22; individual nodes fade to 100%'],
            ['0.22 <= scale < 0.38', 'Directory Architecture Regime', 'Folder Sun labels visible (scale >= 0.15); File Planet and Function Moon text labels culled (visible = false)'],
            ['0.38 <= scale < 0.68', 'Module & File Regime', 'Folder Sun and File Planet labels visible; Function Moon labels culled unless hovered or isolated'],
            ['scale >= 0.68', 'Microscopic Symbol Regime', 'All Folder, File, and Function/Class Moon labels visible with dynamic inverse-zoom font scaling']
          ]
        },
        points: [
          {
            label: 'Hover & Focus Label Override',
            text: 'Even when zoomed out below the 0.68 function label threshold, hovering over any node (isHovered) or activating Focus Isolation (isIsolated) immediately forces its label and its neighbors’ labels to become visible.'
          }
        ]
      },
      {
        id: 'cinematic-camera-math',
        title: '3. Mathematical Easing Functions: Camera Flight & Node Emergence',
        desc: 'PixiSpatialEngine.jsx uses two specialized analytical easing functions to ensure every motion feels deliberate and physically grounded:',
        codeBlocks: [
          {
            label: 'Quintic Camera Warp & Elastic Node Emergence (PixiSpatialEngine.jsx)',
            language: 'javascript',
            code: `// 1. Elastic bounce pop easing function for celestial node emergence
const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// 2. Quintic Ease-In-Out for 650ms cinematic camera flight
const easeInOutQuintic = (t) => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
};`
          }
        ],
        points: [
          {
            label: '650ms Warp Flight Interpolation',
            text: 'When warping to a node from the Command Palette or Agent Supervisor HUD, cameraWarpRef interpolates both camera center (startX -> targetNode.x, startY -> targetNode.y) and zoom scale (startZoom -> max(startZoom, 1.15)) over 650ms using easeInOutQuintic(progress).'
          }
        ]
      }
    ]
  },

  'ast-conduits': {
    category: 'Spatial Canvas & Graph ML',
    title: 'AST Conduits, Cross-Stack Laser Bridges & Blast Radius',
    subtitle: 'How Neuron traces function calls, module imports, and cross-stack HTTP/WebSocket API routes across languages, and computes bidirectional blast radius impact.',
    sections: [
      {
        id: 'four-edge-classes',
        title: '1. The Four Semantic Conduit Classes',
        desc: 'Every edge rendered on the spatial canvas belongs to one of four semantic classes extracted by backend/core/parser.py:',
        table: {
          headers: ['Edge Type', 'Default Color / Style', 'Hover Glow Color', 'Photon Animation', 'How Parser Extracts the Conduit'],
          rows: [
            ['hierarchy', '#6d6d6d (1.0px, 0.45 alpha)', '#60a5fa (3.5px)', 'None (static structural bone)', 'Links parent directory to child directory/file, and parent file to declared classes/functions'],
            ['import', '#6d6d6d / Theme Accent', '#60a5fa (3.5px)', '2 white photons when hovered', 'Resolves Python import/from, ES6 import/export/require, and C/C++ #include paths to workspace files'],
            ['call', '#9f00ad (1.5px, Purple)', '#ff0000 (3.5px)', '2 white photons when hovered', 'Matches AST call_expression / call nodes inside function bodies against imported and local symbol tables'],
            ['network_bridge', '#00f0ff (Dual-Core Cyan Laser)', '#00f0ff (8px outer + 2.5px core)', 'Continuous 3-photon stream (24/7)', 'Matches frontend fetch/axios/WebSocket URIs against backend FastAPI/Flask/Express route decorators']
          ]
        },
        points: [
          {
            label: 'Dual-Core Laser Bridge Rendering',
            text: 'Cross-stack network_bridge edges are drawn as a two-pass neon conduit: an outer 6px-8px cyan glow (0x00f0ff at 22% alpha) overlaid with a crisp 2px-2.5px high-intensity inner core (at 95% alpha) and 3 continuously traveling white/cyan photons.'
          }
        ]
      },
      {
        id: 'universal-uri-normalizer',
        title: '2. Cross-Stack URI Normalization & Automatic Route Linking',
        desc: 'How does Neuron automatically know that a fetch(`http://localhost:8000/api/users/${userId}?active=true`) call inside a React .jsx file connects to @app.get("/api/users/{id}") inside a Python FastAPI file?',
        paragraphs: [
          'In backend/core/parser.py, Neuron implements a Universal Cross-Stack URI & Event Normalizer (normalize_uri). During Pass 1 of workspace parsing, it extracts all backend route decorators (@app.get, @router.post, @app.websocket, app.use, etc.), resolves APIRouter prefixes, and normalizes every route string into a canonical token stored in backend_api_registry.',
          'During Pass 2, when scanning frontend JavaScript/TypeScript/Python client calls (fetch, axios.get, axios.post, new WebSocket, etc.), it passes the target URL expression through the exact same normalize_uri() pipeline:'
        ],
        codeBlocks: [
          {
            label: 'Universal Cross-Stack URI Normalizer (backend/core/parser.py)',
            language: 'python',
            code: `def normalize_uri(uri: str) -> str:
    """
    UNIVERSAL CROSS-STACK URI & EVENT NORMALIZER
    Transforms any frontend/backend route expression into an identical canonical token.
    """
    if not uri:
        return ""
    clean = uri.strip("'\\"\`")
    # 1. Strip protocol & host (http://localhost:8000/api/... -> api/...)
    clean = re.sub(r'^(https?://|wss?://)[^/]+/', '', clean)
    clean = re.sub(r'^(https?://|wss?://)[^/]+$', '', clean)
    # 2. Strip leading template base URLs (\${API_BASE}/api/... -> api/...)
    clean = re.sub(r'^\\$\\{[^}]+\\}/?', '', clean)
    # 3. Strip query strings (?page=1&sort=asc)
    clean = clean.split('?')[0].split('&')[0].strip().lstrip('/')
    # 4. Unify path parameters ({user_id}, :userId, \${id} -> *)
    clean = re.sub(r'\\{[^}]+\\}', '*', clean)
    clean = re.sub(r':[\\w]+', '*', clean)
    clean = re.sub(r'\\$\\{[^}]+\\}', '*', clean)
    clean = re.sub(r'/+', '/', clean)
    return clean.rstrip('/')`
          }
        ],
        points: [
          {
            label: 'Canonical Parameter Wildcarding (*)',
            text: 'Whether a route parameter is written in FastAPI syntax (/users/{user_id}/profile), Express syntax (/users/:userId/profile), or JS template literal syntax (`https://api.example.com/users/${id}/profile?tab=1`), normalize_uri() transforms all three into the exact same canonical key: "users/*/profile", linking them with a cyan laser bridge.'
          }
        ]
      },
      {
        id: 'blast-radius-computation',
        title: '3. Bidirectional Transitive Blast Radius Analysis',
        desc: 'When you trigger Impact Analysis on any node (emitting IMPACT_ANALYSIS over WebSockets) or when the Horizon 3 Agent Supervisor evaluates a multi-file edit burst, Neuron computes the complete transitive blast radius:',
        codeBlocks: [
          {
            label: 'Bidirectional Blast Radius Traversal (backend/api/websocket_router.py)',
            language: 'python',
            code: `DiG = nx.DiGraph()
for edge in edges:
    src = str(edge.get("source", ""))
    tgt = str(edge.get("target", ""))
    if src and tgt:
        DiG.add_edge(src, tgt)

dependents = list(nx.ancestors(DiG, node_id)) if node_id in DiG else []
dependencies = list(nx.descendants(DiG, node_id)) if node_id in DiG else []
impacted_nodes = list(set([node_id] + dependents + dependencies))`
          }
        ],
        points: [
          {
            label: 'Visual Blast Radius Pulse Overlay',
            text: 'Upon receiving the BLAST_RADIUS payload, blastRadiusOverlay in PixiSpatialEngine.jsx renders a sinusoidal pulsating orange warning ring (0xf97316) around every impacted node across the entire repository.'
          }
        ]
      }
    ]
  }
};
