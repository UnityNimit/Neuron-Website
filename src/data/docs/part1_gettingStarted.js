// src/data/docs/part1_gettingStarted.js

export const PART1_GETTING_STARTED_DOCS = {
  'welcome': {
    category: 'Get Started & Architecture',
    title: 'Welcome to Neuron Spatial IDE',
    subtitle: 'Neuron is a native desktop spatial code intelligence environment, polyglot execution workbench, and autonomous AI engineering studio that models source code as an interactive 2D topological graph powered by real-time Tree-Sitter AST parsing, Graph Machine Learning, and hardware-accelerated WebGPU rendering.',
    sections: [
      {
        id: 'core-philosophy',
        title: '1. Core Engineering Philosophy: Beyond the Flat File Tree',
        desc: 'For over four decades, integrated development environments have represented software systems as alphabetically sorted, one-dimensional directory trees and isolated text buffers.',
        paragraphs: [
          'While flat file trees work for small scripts, modern full-stack software systems do not execute linearly or alphabetically. They execute as complex, directed, cyclic and acyclic graphs of function invocations, cross-module symbol imports, state mutations, and asynchronous client-server network conduits. When a developer modifies a utility function in a backend module, a traditional IDE provides no immediate spatial visibility into which upstream API handlers, React components, or microservice boundaries depend on that symbol.',
          'Neuron fundamentally replaces the blind file-tree mental model with a live, force-directed 2D spatial topology. Every directory, source file, class, and callable function is projected onto a hardware-accelerated 2D canvas as a physical entity governed by deterministic attraction and repulsion laws. You see your architecture as it actually exists: clustered by algorithmic modularity, wired by real Abstract Syntax Tree (AST) call graphs, and continuously audited by unsupervised machine learning.'
        ],
        points: [
          {
            label: 'Spatial Topological Comprehension',
            text: 'Navigate entire repositories as a continuous 2D coordinate plane where folders act as gravitational suns, files orbit as planets, and individual functions/classes orbit their parent files as moons.'
          },
          {
            label: 'Real-Time Bidirectional Synchronization',
            text: 'The spatial canvas and the embedded Monaco code editor are tightly coupled over a sub-2ms local WebSocket stream. Editing code in the text editor immediately re-parses the AST and updates graph conduits, while dragging a function moon onto another file planet physically transplants the symbol across files on disk.'
          },
          {
            label: '100% Localhost Execution Guarantee',
            text: 'All Tree-Sitter syntax parsing, LibCST code mutations, NetworkX Louvain community detection, Scikit-Learn Isolation Forest anomaly scoring, and TF-IDF semantic vector indexing execute strictly on your local workstation CPU and GPU with zero cloud ingestion.'
          },
          {
            label: 'Hardware-Accelerated 60 FPS Telemetry',
            text: 'Built on PixiJS v8 with a WebGPU-preferred rendering pipeline and a zero-copy React ref architecture (simDataRef), Neuron renders thousands of nodes, convex nebula hulls, and animated laser photons without React DOM reconciliation bottlenecks.'
          },
          {
            label: 'Deterministic Refactoring Guardrails',
            text: 'Visual drag-and-drop symbol migrations are protected by an Arc Consistency (AC-3) Constraint Satisfaction Problem (CSP) solver that mathematically blocks circular dependency cycles, scope collisions, and broken coupling before a single byte is written to disk.'
          }
        ]
      },
      {
        id: 'paradigm-comparison',
        title: '2. Architectural Paradigm Comparison',
        desc: 'How Neuron compares to conventional text editors and static visualization tools across core engineering dimensions:',
        table: {
          headers: ['Engineering Dimension', 'Conventional Text IDEs', 'Static Diagram Generators', 'Neuron Spatial IDE'],
          rows: [
            ['Primary Mental Model', 'Alphabetical 1D directory tree and isolated tabs', 'Outdated manual boxes or one-shot SVG exports', 'Live 2D force-directed celestial topology synchronized with disk'],
            ['Cross-Stack Route Visibility', 'Manual text grep for URL strings across folders', 'None (cannot correlate frontend fetch with backend routers)', 'Automatic cyan laser conduits linking React fetch/axios/WS calls to FastAPI/Express routes'],
            ['Code Refactoring Mechanism', 'Manual cut-and-paste and tedious import path fixing', 'Read-only visualization with zero code mutation capability', 'Drag-and-drop AST transplant via Python LibCST and JS Tree-Sitter with AC-3 cycle verification'],
            ['Architectural Smell Detection', 'Basic linter syntax warnings inside single files', 'None', '10-Dimensional Isolation Forest ML + PageRank + Betweenness + Shannon Entropy + Git Churn'],
            ['AI Agent Supervision', 'Opaque multi-file overwrites in hidden background tabs', 'None', 'Horizon 3 Agent Supervisor HUD with live transitive blast radius and 1-click atomic batch rollback'],
            ['Semantic Code Search', 'Cloud-indexed vector databases or slow regex grep', 'None', 'Pure-RAM Sublinear TF-IDF (1-3 N-Grams) + AST Lexical Booster in <5ms with zero network I/O']
          ]
        },
        points: [
          {
            label: 'Zero Context-Switching Overhead',
            text: 'Switch seamlessly between the macro WebGPU spatial canvas and the full-featured Monaco code editor in a single click or keyboard shortcut without losing viewport state.'
          },
          {
            label: 'Live Impact Blast Radius',
            text: 'Selecting or modifying any node computes its complete upstream ancestor callers and downstream descendant dependencies via NetworkX directed graph traversal.'
          }
        ]
      },
      {
        id: 'five-pillar-engine',
        title: '3. The Five Core Pillars of Neuron',
        desc: 'Neuron integrates five specialized subsystems into a single unified desktop binary:',
        paragraphs: [
          'Every subsystem in Neuron is engineered to operate in concert without blocking the main UI thread or introducing external database setup requirements. When you open a project folder, all five engines initialize concurrently within milliseconds.'
        ],
        points: [
          {
            label: 'Pillar I — Multi-Language Tree-Sitter AST Parser (backend/core/parser.py)',
            text: 'Instantiates persistent, in-memory C-compiled Tree-Sitter grammars for Python, JavaScript, JSX, TypeScript, TSX, C, C++, and Java. Extracts classes, functions, parameters, cyclomatic decision triggers, imports, exports, and cross-stack HTTP/WebSocket URIs with an mtime + byte-size incremental AST cache.'
          },
          {
            label: 'Pillar II — Multi-Modal Graph ML & Risk Analyzer (backend/ml/analyzer.py)',
            text: 'Constructs dual NetworkX graphs (undirected weighted G for Louvain modularity clustering and directed DiG for authority flow). Computes PageRank, Betweenness Centrality, Fan-In/Fan-Out ratios, and Shannon character entropy to assemble a 10-dimensional feature tensor evaluated by an unsupervised Isolation Forest.'
          },
          {
            label: 'Pillar III — PixiJS v8 WebGPU Spatial Canvas & D3 Physics (frontend/src/components/canvas/)',
            text: 'Simulates perpetual cosmic equilibrium using customized D3-force laws (orbit distances, tiered repulsion, collision radii) while rendering 8 depth-sorted graphics layers including blurred convex hull nebulae, laser photon bridges, and blast radius shockwaves.'
          },
          {
            label: 'Pillar IV — AC-3 Refactoring Shield & Lossless Mutators (backend/ai/csp_guard.py & backend/core/mutator.py)',
            text: 'Validates every symbol move against four mathematical invariants (Domain, Scope, Mutual Coupling, and Global Arc Consistency) before executing formatting-preserving source surgery via LibCST (Python) or byte-span Tree-Sitter AST slicing (JS/TS/JSX).'
          },
          {
            label: 'Pillar V — Autonomous AI Studio & Horizon 3 Agent Supervisor (backend/services/ai_service.py)',
            text: 'Features zero-hardcode live BYOK provider discovery across 9 cloud providers plus local Ollama inference, equipped with 9 autonomous workspace tools, pre-flight in-RAM AST syntax validation, interactive approval gates, and a real-time Agent Supervisor HUD.'
          }
        ]
      },
      {
        id: 'supported-languages-matrix',
        title: '4. Supported Languages & Capabilities Matrix',
        desc: 'Neuron provides tiered support across 30+ source extensions, combining deep AST parsing, lossless refactoring, and polyglot code execution:',
        table: {
          headers: ['Language / Ecosystem', 'Extensions', 'Tree-Sitter AST Graph', 'Visual Drag-and-Drop Refactor', 'Polyglot Code Runner'],
          rows: [
            ['Python', '.py', 'Full AST + FastAPI/Flask Route Extraction', 'Lossless LibCST Symbol Transplant & Auto-Import', 'Auto-Venv Discovery + Unbuffered UTF-8 Execution'],
            ['JavaScript & React', '.js, .jsx, .mjs, .cjs', 'Full AST + Fetch/Axios/WS Laser Bridge Detection', 'Tree-Sitter Byte-Span Move + ES6 File Merge', 'Node.js Runtime with Automatic ES Module Temp Wrapper'],
            ['TypeScript & TSX', '.ts, .tsx', 'Full AST + Interface/Component Symbol Extraction', 'Tree-Sitter Byte-Span Move + ES6 File Merge', 'Automatic tsx / ts-node / npx Execution Pipeline'],
            ['C & C++', '.c, .h, .cpp, .hpp, .cc, .cxx', 'Full AST + Function/Struct/Class & #include Edges', 'Read & Inspect + AI Studio Surgical Edits', 'Auto-Discovered GCC / Clang / G++ / MinGW / MSYS2 Compilation'],
            ['Java', '.java', 'Full AST + Class, Interface & Method Call Graph', 'Read & Inspect + AI Studio Surgical Edits', 'Auto-Classpath javac Compilation & java Execution'],
            ['Rust & Go', '.rs, .go', 'Symbol Outline & File Node Representation', 'AI Studio Surgical Edits', 'Native rustc / cargo and go run Execution'],
            ['Shell & Batch', '.ps1, .sh, .bash, .bat, .cmd', 'File Node & Workspace Search Indexing', 'AI Studio Surgical Edits', 'PowerShell Bypass, Git Bash Auto-Locator & CMD Execution'],
            ['Config, Data & Web', '.json, .yaml, .yml, .toml, .sql, .html, .css, .md', 'File Node & Dependency Tracking', 'Monaco Editing & AI Studio Edits', 'Static Preview & Raw Asset Serving']
          ]
        },
        points: [
          {
            label: '1 MB Per-File AST Safety Ceiling',
            text: 'To prevent minified bundles or massive auto-generated data dumps from stalling the AST parser, files exceeding MAX_FILE_SIZE_BYTES (1,000,000 bytes) are safely represented as file nodes without deep syntax traversal.'
          },
          {
            label: 'Binary & Media Asset Handling',
            text: 'Images (.png, .jpg, .svg, .webp, .gif, .ico, .bmp, .avif) are automatically routed to the built-in interactive ImageViewer with zoom, pan, and metadata inspection via /api/file/raw and /api/file/info.'
          }
        ]
      },
      {
        id: 'workstation-requirements',
        title: '5. System Requirements & Workstation Specifications',
        desc: 'Neuron is engineered to run smoothly on standard developer laptops as well as high-core-count engineering workstations:',
        table: {
          headers: ['Component', 'Minimum Specification', 'Recommended Engineering Specification'],
          rows: [
            ['Operating System', 'Windows 10 (64-bit, Build 19041+)', 'Windows 11 (64-bit, 22H2 or newer) with WebView2 Runtime'],
            ['Processor (CPU)', 'Quad-Core x86_64 (Intel Core i5 / AMD Ryzen 5)', '8+ Core x86_64 (Intel Core i7/i9 or AMD Ryzen 7/9) for parallel AST & ML pipelines'],
            ['System Memory (RAM)', '8 GB DDR4', '16 GB - 32 GB DDR4/DDR5 (especially when running local 7B-14B Ollama models)'],
            ['Graphics Card (GPU)', 'Integrated GPU supporting DirectX 11 / WebGL 2.0', 'Dedicated GPU supporting DirectX 12 / Vulkan 1.3 for native WebGPU pipeline'],
            ['Disk Storage', '250 MB free space for Neuron binary & sidecar', 'NVMe SSD with 10+ GB free space if storing local Ollama LLM weights'],
            ['Network Connectivity', '100% Offline capable (air-gapped ready)', 'Broadband connection optional (only used if connecting cloud BYOK API keys or Git remotes)']
          ]
        },
        points: [
          {
            label: 'Zero Mandatory External Runtimes',
            text: 'The standalone Windows installer bundles the Tauri v2 native shell and the PyInstaller-frozen Python backend sidecar (neuron-backend.exe) containing FastAPI, Tree-Sitter grammars, LibCST, NetworkX, NumPy, and Scikit-Learn.'
          },
          {
            label: 'Optional Local Toolchains',
            text: 'To execute C/C++, Java, Node.js, or Python scripts inside the integrated Polyglot Runner, install the respective language compiler/interpreter on your host OS or inside a project virtual environment.'
          }
        ]
      }
    ]
  },

  'quickstart': {
    category: 'Get Started & Architecture',
    title: 'Quickstart & First Workspace Walkthrough',
    subtitle: 'Go from installation to inspecting 2D AST graphs, running polyglot code, performing drag-and-drop symbol refactors, and supervising autonomous AI agents in under five minutes.',
    sections: [
      {
        id: 'step-1-launch',
        title: '1. Launching Neuron & The Default Seeded Workspace',
        desc: 'When you launch Neuron for the first time, it automatically initializes a permanent, writable workspace so you can explore the spatial canvas immediately without configuration.',
        paragraphs: [
          'Unlike browser sandboxes or temporary extractors, Neuron guarantees that your active project directory never points inside a read-only installation folder or a temporary PyInstaller _MEI extraction directory. On startup, the backend state manager (backend/core/state.py) resolves your workspace directory using a strict three-tier priority hierarchy: CLI flags (--target-dir), environment variables (NEURON_WORKSPACE_DIR), and finally ~/NeuronProjects.',
          'If ~/NeuronProjects does not yet exist on your workstation, Neuron creates it automatically and seeds two starter modules—server.py and App.jsx—so the AST parser and spatial physics engine immediately render a live multi-language graph.'
        ],
        codeBlocks: [
          {
            label: 'Default Seeded Workspace Structure (~/NeuronProjects)',
            language: 'text',
            code: `C:/Users/<YourUsername>/NeuronProjects/
├── server.py          # Seeded Python module with calculate_metrics(data)
└── App.jsx            # Seeded React component with useState telemetry counter`
          }
        ],
        points: [
          {
            label: 'Sub-2ms WebSocket Handshake',
            text: 'Upon window launch, the React frontend connects to ws://127.0.0.1:8000/ws. The backend accepts the socket in under 2ms, resets the workspace mutation tracker, and emits the INIT packet containing the full file list, AST graph nodes/edges, and Git commit graph.'
          },
          {
            label: 'Automatic Background Vector Indexing',
            text: 'Immediately after emitting INIT, the backend spawns a non-blocking background thread (trigger_background_indexing) that indexes every file and function node into the Pure-RAM TF-IDF Semantic Omni-Search engine.'
          }
        ]
      },
      {
        id: 'step-2-open-project',
        title: '2. Opening Your Own Codebase',
        desc: 'You can switch Neuron to any existing Python, JavaScript, TypeScript, C++, or Java repository on your workstation at any time.',
        paragraphs: [
          'To open an existing project, click the folder icon in the TopBar or File Explorer sidebar, which dispatches the OPEN_FOLDER_DIALOG WebSocket event (or pass a path directly via OPEN_FOLDER). When a workspace switch is triggered, Neuron performs a deterministic cleanup sequence before indexing the new directory.'
        ],
        points: [
          {
            label: '1. Graceful Process Termination',
            text: 'Neuron invokes kill_all_terminal_processes() to cleanly terminate any running background shell sessions or child processes belonging to the previous project.'
          },
          {
            label: '2. Watchdog Observer Re-Binding',
            text: 'The filesystem surveillance daemon (restart_workspace_watcher) unbinds from the old directory and attaches a recursive Watchdog observer to the new project root.'
          },
          {
            label: '3. Minimalist Loading Transition',
            text: 'The backend broadcasts WORKSPACE_LOADING so the UI displays a clean transition state while Tree-Sitter parses the new repository and NetworkX computes community partitions.'
          },
          {
            label: '4. Full Graph Broadcast & Re-Index',
            text: 'Once parsing completes, broadcast_workspace(force_full_sync=True) streams the new celestial graph to the canvas and rebuilds the semantic search index in RAM.'
          }
        ]
      },
      {
        id: 'step-3-canvas-navigation',
        title: '3. Navigating the 2D Spatial Canvas',
        desc: 'Master the viewport interactions to move fluidly between high-level system architecture and individual function implementations:',
        table: {
          headers: ['Interaction / Gesture', 'Input Binding', 'Spatial Engine Behavior'],
          rows: [
            ['Pan Viewport', 'Left-Click + Drag on empty canvas', 'Translates the infinite 300,000 x 300,000 px PixiJS Viewport with smooth inertial deceleration'],
            ['Zoom Viewport', 'Mouse Scroll Wheel / Pinch', 'Scales camera continuously across LOD breakpoints (L1 Macro < 0.2, L2 Mesoscopic, L3 Microscopic)'],
            ['Inspect Node Telemetry', 'Hover over any Sun, Planet, or Moon', 'Highlights direct call/import conduits, triggers active photon pulses, and displays complexity/risk metrics'],
            ['Focus Isolation Mode', 'Click node / Trigger Focus Isolation', 'Dims unrelated graph nodes to 5% opacity while keeping the target node and its 1-hop neighbors at 100%'],
            ['Open in Code Editor', 'Double-Click any File or Function Node', 'Switches the center view (or split view) to the Monaco Code Editor and jumps directly to the symbol definition'],
            ['Pin / Reposition Node', 'Left-Click + Drag any Node', 'Locks fx/fy coordinates to cursor position and boosts physics alpha to DRAGGING_ALPHA_TARGET (0.25)'],
            ['Transplant Function Symbol', 'Enable Refactor Mode + Drag Moon to Planet', 'Validates move via AC-3 CSP Solver and physically transplants the function to the destination file (85px capture radius)'],
            ['Merge JS/TS Modules', 'Enable Refactor Mode + Drag Planet to Planet', 'Merges source JS/TS file into destination file and rewrites all workspace imports (110px capture radius)']
          ]
        },
        points: [
          {
            label: 'Spatial Minimap Navigation',
            text: 'When enabled in Settings > Spatial Map, the bottom-left SpatialMinimap renders a live radar projection of all clusters and your current camera frustum.'
          },
          {
            label: 'Cinematic Camera Warp',
            text: 'Selecting any symbol from the Command Palette (Ctrl+K / Ctrl+P) or Agent Supervisor HUD triggers a 650ms quintic ease-in-out camera flight (easeInOutQuintic) directly to the target node coordinates at 1.15x zoom.'
          }
        ]
      },
      {
        id: 'step-4-editor-and-execution',
        title: '4. Editing Code & Running Polyglot Scripts',
        desc: 'Neuron includes a full Monaco-powered code editor, an interactive stdin input drawer, and a multi-tab terminal emulator.',
        paragraphs: [
          'Double-clicking any file or function node opens it in the Code Editor. When you press Ctrl+S (or when Auto-Save triggers), Neuron dispatches SAVE_FILE over WebSockets, writes the file atomically to disk, incrementally re-evaluates the AST for that file, and broadcasts a hot topology update without resetting your camera position.',
          'Clicking the Run button in the TopBar (or selecting "Run Active Python Script" from the Command Palette) dispatches RUN_CODE to the Universal Polyglot Runner (run_code_polyglot_sync). Neuron automatically detects the file extension, locates the appropriate interpreter or compiler (prioritizing local .venv/venv environments for Python), pipes any custom standard input from the StdinPanel, and streams stdout/stderr back with execution timing.'
        ],
        codeBlocks: [
          {
            label: 'Example Polyglot Execution Output in Terminal Panel',
            language: 'text',
            code: `{'status': 'nominal', 'nodes': 4}

[Done] exited with code 0 in 0.04s`
          }
        ],
        points: [
          {
            label: 'Interactive Terminal Tabs',
            text: 'Open multiple concurrent shell tabs (PowerShell, CMD, or Git Bash on Windows; Bash/Zsh on Unix) in the bottom TerminalPanel. Each tab maintains its own persistent working directory (__NEURON_CWD__ tracking) and live stdin pipe.'
          },
          {
            label: 'Blast Protection Save Throttling',
            text: 'When Blast Protection is enabled in Settings, Neuron monitors save frequency and automatically blocks runaway automated save floods exceeding 6 saves per second.'
          }
        ]
      },
      {
        id: 'step-5-first-ai-session',
        title: '5. Starting Your First Autonomous AI Session',
        desc: 'Open the AI Studio panel on the right side of the workspace to collaborate with an AST-aware autonomous coding agent.',
        paragraphs: [
          'Neuron supports both 100% offline local inference via Ollama (http://127.0.0.1:11434) and Bring-Your-Own-Key (BYOK) cloud inference. To add a cloud API key, open Settings > AI & Models, paste any API key from Google Gemini, Anthropic, OpenAI, Groq, DeepSeek, OpenRouter, xAI, Mistral, or Cerebras, and click Add. Neuron automatically probes the provider, verifies authentication, discovers all available models for your key, and ranks the highest-capability model with zero hardcoded model lists.'
        ],
        points: [
          {
            label: 'Autonomous Workspace Tool Execution',
            text: 'Ask the agent to build features, fix bugs, or run tests. The agent can autonomously call tool_get_file_outline, tool_view_file, tool_grep_search, tool_find_by_name, tool_write_to_file, tool_replace_file_content, and tool_run_command.'
          },
          {
            label: 'Interactive Approval & 1-Click Rollback',
            text: 'Toggle between Auto-Approve and Require Approval modes. Every file modified by the agent is snapshotted before write so you can revert all changes in a single click via AI_ROLLBACK_CHANGES or the Agent Supervisor HUD.'
          }
        ]
      }
    ]
  },

  'installation': {
    category: 'Get Started & Architecture',
    title: 'Installation, Sidecar Binary & Environment Setup',
    subtitle: 'Comprehensive reference for installing Neuron on Windows, understanding the PyInstaller frozen sidecar lifecycle, configuring local compilers, and running Neuron from source in development mode.',
    sections: [
      {
        id: 'windows-installer-architecture',
        title: '1. Windows Desktop Installer & Directory Layout',
        desc: 'Neuron is distributed as a self-contained native Windows application packaged via Tauri v2 and NSIS/MSI bundling.',
        paragraphs: [
          'When you download and execute Neuron-Setup.exe from the official Releases page, the installer deploys the native Rust/WebView2 frontend binary alongside the pre-compiled Python intelligence sidecar (neuron-backend.exe). The installation runs in per-user mode by default, meaning no Administrator UAC elevation is required on restricted enterprise workstations.'
        ],
        codeBlocks: [
          {
            label: 'Installed Application & User Configuration Paths (Windows)',
            language: 'text',
            code: `# 1. Per-User Application Binaries
%LOCALAPPDATA%/Programs/Neuron/
├── Neuron.exe                         # Native Tauri v2 Rust Desktop Host
└── binaries/
    └── neuron-backend-x86_64-pc-windows-msvc.exe  # Frozen Python AST/ML Sidecar

# 2. Persistent User Configuration & Auth Vault
C:/Users/<Username>/.neuron/
├── auth_session.json                  # Cached Supabase OAuth PKCE session
└── pkce_verifier.txt                  # Ephemeral PKCE cryptographic verifier

# 3. Default User Project Workspace
C:/Users/<Username>/NeuronProjects/
├── .neuron/
│   ├── conversations.json             # Project-scoped AI Studio chat history
│   └── memory.md                      # Persistent AI architectural rules
├── server.py
└── App.jsx`
          }
        ],
        points: [
          {
            label: 'Zero Registry Pollution',
            text: 'All user preferences (editor font size, theme tokens, API keys, physics toggles) are stored cleanly in localStorage under neuron-settings and neuron-theme, while session and project artifacts live in ~/.neuron and <workspace>/.neuron.'
          },
          {
            label: 'Clean Uninstall',
            text: 'Uninstalling Neuron removes the application binaries cleanly while preserving your source code and conversations inside ~/NeuronProjects.'
          }
        ]
      },
      {
        id: 'headless-sidecar-protection',
        title: '2. Frozen Sidecar Lifecycle & Headless Crash Shield',
        desc: 'How Neuron guarantees rock-solid stability when spawning the Python FastAPI engine as a headless desktop subprocess:',
        paragraphs: [
          'In production desktop builds, Tauri spawns neuron-backend.exe without an attached console window (headless mode). On Windows, when a Python process compiled with PyInstaller (--noconsole) attempts to write to sys.stdout or sys.stderr—such as Uvicorn access logs or print statements—Python normally raises an unhandled OSError: [Errno 9] Bad file descriptor or AttributeError: NoneType object has no attribute write, crashing the backend immediately.',
          'To eliminate this failure mode permanently, backend/main.py implements a Line-1 Headless Crash Shield (SafeStreamWriter) before importing FastAPI, Uvicorn, or any third-party module.'
        ],
        codeBlocks: [
          {
            label: 'Headless Stream Protection in backend/main.py',
            language: 'python',
            code: `class SafeStreamWriter:
    """
    Prevents AttributeError / OSError when Python is spawned headlessly by Tauri
    with null or closed standard I/O handles. Writes logs safely to %TEMP%.
    """
    def __init__(self, fallback_name="neuron_backend_stdout.log"):
        self.log_path = os.path.join(tempfile.gettempdir(), fallback_name)

    def write(self, data):
        if not data:
            return
        try:
            with open(self.log_path, "a", encoding="utf-8", errors="replace") as f:
                f.write(str(data))
        except Exception:
            pass

    def flush(self):
        pass`
          }
        ],
        points: [
          {
            label: 'UTF-8 I/O Enforcement',
            text: 'Line 11 of backend/main.py sets os.environ["PYTHONIOENCODING"] = "utf-8" and reconfigures sys.stdout and sys.stderr with encoding="utf-8", errors="replace" so Unicode box-drawing characters, math symbols, and international text never trigger UnicodeEncodeError on Windows CP1252 consoles.'
          },
          {
            label: 'Fork-Bomb Protection (multiprocessing.freeze_support)',
            text: 'Because Scikit-Learn and joblib can spawn child worker processes that re-execute the frozen binary in an infinite loop on Windows, Neuron enforces multiprocessing.freeze_support() at entry and runs IsolationForest with n_jobs=1 (Single-Instance Mode).'
          },
          {
            label: 'Diagnostic Log Files in %TEMP%',
            text: 'When running the desktop build, any headless backend stdout/stderr output is safely appended to %TEMP%/neuron_backend_stdout.log and %TEMP%/neuron_backend_stderr.log for instant diagnostics.'
          }
        ]
      },
      {
        id: 'compiler-and-interpreter-discovery',
        title: '3. Automatic Interpreter & Compiler Toolchain Discovery',
        desc: 'How Neuron locates Python virtual environments, C/C++ compilers, Java JDKs, and POSIX shells without manual PATH configuration:',
        paragraphs: [
          'A critical challenge in frozen PyInstaller desktop apps is that sys.executable points to neuron-backend.exe rather than a system Python interpreter. If the IDE attempted to run user scripts with sys.executable, it would spawn another instance of the Neuron backend instead of running the user script. Neuron solves this via dedicated toolchain locators in backend/services/terminal_service.py.'
        ],
        table: {
          headers: ['Toolchain Locator', 'Search & Resolution Priority Order', 'Frozen Binary Guard'],
          rows: [
            ['find_python_interpreter()', '1. File dir & workspace parent virtualenvs (.venv, venv, env, .env)\n2. System PATH (python, py, python3)\n3. %LOCALAPPDATA%/Programs/Python/Python3*\n4. C:\\Python*, D:\\Python*, C:\\Program Files\\Python*', 'is_valid_executable() explicitly rejects any binary containing "neuron-backend" or matching frozen sys.executable'],
            ['find_cpp_compiler()', '1. System PATH (g++, clang++)\n2. C:\\msys64\\ucrt64\\bin\\g++.exe & mingw64\\bin\\g++.exe\n3. C:\\MinGW\\bin\\g++.exe, C:\\TDM-GCC-64\\bin\\g++.exe, C:\\w64devkit\\bin\\g++.exe\n4. C:\\Program Files\\LLVM\\bin\\clang++.exe & Strawberry Perl C', 'Verifies binary exists on disk before invoking compilation'],
            ['find_c_compiler()', '1. System PATH (gcc, clang)\n2. C:\\msys64\\ucrt64\\bin\\gcc.exe & mingw64\\bin\\gcc.exe\n3. C:\\MinGW\\bin\\gcc.exe, C:\\TDM-GCC-64\\bin\\gcc.exe, C:\\w64devkit\\bin\\gcc.exe\n4. C:\\Program Files\\LLVM\\bin\\clang.exe', 'Automatically injects -I<file_dir> and -I<workspace_root> header search flags'],
            ['find_shell_interpreter()', '1. Relative to git.exe in PATH (Git\\bin\\bash.exe, Git\\usr\\bin\\bash.exe)\n2. C:\\Program Files\\Git\\bin\\bash.exe & %LOCALAPPDATA%\\Programs\\Git\\bin\\bash.exe\n3. C:\\msys64\\usr\\bin\\bash.exe\n4. System PATH bash/sh (deprioritizing unconfigured WSL System32 stubs)', 'Automatically prepends Git usr/bin and bin to PATH so grep, awk, sed, and ls work natively on Windows']
          ]
        },
        points: [
          {
            label: 'Zero-Configuration Virtual Environments',
            text: 'If your project has a .venv or venv folder at the workspace root or in a parent subfolder, both the Polyglot Code Runner and the AI Studio tool_run_command automatically use that virtualenv Python and pip.'
          },
          {
            label: 'Windows Subsystem for Linux (WSL) Stub Avoidance',
            text: 'On Windows machines where C:\\Windows\\System32\\bash.exe exists as an unconfigured WSL launcher stub, find_shell_interpreter() prioritizes Git for Windows Bash and MSYS2 so .sh scripts execute reliably.'
          }
        ]
      },
      {
        id: 'running-from-source',
        title: '4. Running & Building Neuron from Source (Developer Setup)',
        desc: 'For contributors and enterprise teams building custom extensions to the Neuron engine from source:',
        codeBlocks: [
          {
            label: '1. Start the Python FastAPI Intelligence Backend',
            language: 'powershell',
            code: `# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
.\\venv\\Scripts\\Activate.ps1

# Install all AST, Graph ML, and FastAPI dependencies
pip install -r requirements.txt

# Launch the backend engine on port 8000 (supports --port and --target-dir flags)
python main.py --port 8000 --target-dir "C:/Users/you/NeuronProjects"`
          },
          {
            label: '2. Start the React + Vite + WebGPU Frontend (or Tauri Desktop Shell)',
            language: 'powershell',
            code: `# In a second terminal, navigate to the frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Run in fast browser development mode (http://localhost:5173)
npm run dev

# OR launch the native Tauri v2 desktop window
npm run tauri dev`
          },
          {
            label: '3. Compile the Standalone PyInstaller Sidecar Binary',
            language: 'powershell',
            code: `# From the backend directory, run the automated sidecar builder
cd backend
python build_sidecar.py`
          }
        ],
        points: [
          {
            label: 'CLI Startup Arguments',
            text: 'backend/main.py accepts --port <int> (default 8000), --host <str> (default 127.0.0.1), and --target-dir <path> to bind directly to a specific port and repository.'
          },
          {
            label: 'Core Python Dependencies (backend/requirements.txt)',
            text: 'Requires fastapi, uvicorn, websockets, watchdog, tree-sitter, tree-sitter-python, tree-sitter-javascript, tree-sitter-typescript, tree-sitter-c, tree-sitter-cpp, tree-sitter-java, libcst, networkx, numpy, scikit-learn, and httpx.'
          }
        ]
      }
    ]
  },

  'architecture': {
    category: 'Get Started & Architecture',
    title: 'Full-Stack Localhost Architecture',
    subtitle: 'An inside look at Neuron’s decoupled multi-layer architecture: how the Tauri v2 native shell, React + PixiJS v8 frontend, and FastAPI + Tree-Sitter + NetworkX Python sidecar communicate with sub-millisecond latency.',
    sections: [
      {
        id: 'high-level-topology',
        title: '1. System Architecture Overview',
        desc: 'Neuron is architected as a strictly local client-server engine where heavy CPU/ML graph computations are isolated in a native Python process while the UI thread is dedicated to 60 FPS WebGPU rendering and Monaco text editing.',
        paragraphs: [
          'Running AST parsing, Louvain community detection, or Isolation Forest anomaly detection inside a browser JavaScript thread would freeze the UI and cause frame drops during typing or canvas panning. Conversely, rendering complex interactive UIs in pure Python lacks modern hardware-accelerated WebGPU capabilities.',
          'Neuron bridges both worlds by pairing a lightweight React 18 + PixiJS v8 + Monaco frontend with an asynchronous Python FastAPI backend over a persistent full-duplex WebSocket connection (ws://127.0.0.1:8000/ws) and high-speed REST endpoints.'
        ],
        codeBlocks: [
          {
            label: 'Neuron End-to-End Localhost Data Flow',
            language: 'text',
            code: `┌─────────────────────────────────────────────────────────────────────────────┐
│                   FRONTEND LAYER (React 18 + Tauri v2 Host)                 │
│                                                                             │
│  ┌─────────────────────────┐  ┌──────────────────────┐  ┌────────────────┐  │
│  │  PixiSpatialEngine.jsx  │  │   CodeEditor.jsx     │  │ AiChatView.jsx │  │
│  │  (WebGPU / 8 GPU Layers)│  │   (Monaco Editor)    │  │ (AI Studio UI) │  │
│  └────────────▲────────────┘  └──────────▲───────────┘  └───────▲────────┘  │
│               │ Zero-Copy Ref            │                      │           │
│  ┌────────────┴────────────┐  ┌──────────┴──────────────────────┴────────┐  │
│  │   usePhysicsEngine.js   │  │      useWorkspace.js & useAiStudio.js    │  │
│  │  (D3-Force Equilibrium) │  │    (State Sync, WebSocket Dispatcher)    │  │
│  └────────────▲────────────┘  └────────────────────▲─────────────────────┘  │
└───────────────┼────────────────────────────────────┼────────────────────────┘
                │        Full-Duplex WebSocket       │
                │       ws://127.0.0.1:8000/ws       │
┌───────────────┼────────────────────────────────────┼────────────────────────┐
│               ▼         BACKEND LAYER (FastAPI)    ▼                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                 websocket_router.py & main.py (REST)                  │  │
│  └─────┬──────────────────┬────────────────────┬───────────────────┬─────┘  │
│        ▼                  ▼                    ▼                   ▼        │
│  ┌───────────┐     ┌─────────────┐     ┌──────────────┐    ┌─────────────┐  │
│  │ parser.py │     │ analyzer.py │     │ csp_guard.py │    │ai_service.py│  │
│  │Tree-Sitter│────►│  NetworkX   │     │ AC-3 Solver  │    │BYOK / Ollama│  │
│  │ 7 Grammars│     │Louvain + ML │     │LibCST/JS Move│    │9 Agent Tools│  │
│  └───────────┘     └─────────────┘     └──────────────┘    └─────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘`
          }
        ],
        points: [
          {
            label: 'Non-Blocking Thread Offloading (asyncio.to_thread)',
            text: 'Within backend/api/websocket_router.py, every CPU-intensive operation—such as get_workspace_state(), vector_engine.query(), refactor_symbol_move_service(), and run_code_polyglot_sync()—is dispatched via asyncio.to_thread() so the FastAPI event loop remains responsive to PING heartbeats and terminal streams at all times.'
          },
          {
            label: 'Multi-Connection Resilient Broadcasting',
            text: 'AppState.CONNECTIONS tracks all active WebSocket clients. Helper functions safe_send_json(), safe_send_to_active(), and broadcast_to_all() ensure that if a client reconnects (for example, after workstation sleep/wake), ongoing terminal streams or AI chat tokens automatically route to the active socket without dropping data.'
          }
        ]
      },
      {
        id: 'backend-module-directory',
        title: '2. Backend Engine Architecture (backend/)',
        desc: 'Every module in the Python backend has a focused responsibility and strict performance invariants:',
        table: {
          headers: ['Backend Module Path', 'Primary Responsibility', 'Key Classes / Functions'],
          rows: [
            ['backend/main.py', 'FastAPI server lifespan, CORS, health probes, raw asset serving, OAuth PKCE callbacks, and key discovery REST endpoint', 'lifespan(), SafeStreamWriter, /health, /api/file/raw, /api/file/info, /api/ai/discover-key'],
            ['backend/api/websocket_router.py', 'Full-duplex WebSocket event router handling 35+ real-time client/server event types', 'websocket_endpoint(), safe_send_json(), broadcast_to_all(), trigger_background_indexing()'],
            ['backend/core/state.py', 'Global thread-safe memory store for workspace root, active connections, running subprocesses, and auth sessions', 'AppState, get_default_workspace_dir(), get_neuron_config_dir(), DEFAULT_EXCLUSIONS'],
            ['backend/core/parser.py', 'Multi-language Tree-Sitter AST parser, Incremental AST cache, complexity calculator, and cross-stack URI linker', 'parse_workspace(), calculate_complexity(), normalize_uri(), resolve_py_import_path()'],
            ['backend/core/mutator.py', 'Lossless Python source code editing, symbol extraction, and cross-file function transplantation via LibCST', 'SourceCodeReplacer, FunctionExtractor, execute_surgical_move()'],
            ['backend/core/js_mutator.py', 'Surgical JavaScript/TypeScript/JSX AST byte-span symbol extraction, export promotion, and full file merge', 'execute_js_surgical_move(), execute_js_file_merge(), update_workspace_js_imports()'],
            ['backend/ml/analyzer.py', 'Graph Machine Learning pipeline: Louvain communities, PageRank, Betweenness, 10D Isolation Forest, and smell diagnosis', 'analyze_graph_ml(), compute_shannon_entropy(), sanitize_for_json()'],
            ['backend/ai/csp_guard.py', 'AC-3 Constraint Satisfaction refactoring solver validating domain, scope, coupling, and circular import DAGs', 'ac3_validate_refactor(), build_import_dependency_graph(), extract_symbol_dependencies()'],
            ['backend/ai/agent_supervisor.py', 'Horizon 3 AI Agent Supervisor tracking multi-file mutation bursts, AST symbol diffs, blast radius, and rollbacks', 'AgentSupervisorEngine, compute_ast_delta(), compute_transitive_blast_radius(), rollback_batch()'],
            ['backend/ai/vector_search.py', 'Pure-RAM sublinear TF-IDF (1-3 N-grams) + AST lexical booster for <5ms semantic search', 'VectorSearchEngine, index_nodes(), query()'],
            ['backend/services/ai_service.py', 'Universal BYOK provider discovery, Graph-RAG node summaries, autonomous tool execution loop, and chat persistence', 'discover_key_and_models(), stream_ai_chat(), fetch_ast_summary(), TOOL_DISPATCH'],
            ['backend/services/terminal_service.py', 'Interactive multi-shell terminal streamer, stdin pipe, process-tree killer, and 12-language polyglot runner', 'stream_terminal_command(), write_terminal_stdin(), kill_terminal_process(), run_code_polyglot_sync()'],
            ['backend/services/workspace_service.py', 'Watchdog filesystem observer, incremental workspace state diffing, and fast Git status/churn extraction', 'get_workspace_state(), broadcast_workspace(), start_workspace_watcher(), get_git_churn()'],
            ['backend/services/file_service.py', 'Filesystem CRUD operations, native OS folder picker dialog, reveal in Explorer, and refactor orchestration', 'create_item(), rename_item(), move_item(), delete_item(), refactor_symbol_move_service()'],
            ['backend/services/git_service.py', 'Git staging, unstaging, discarding, committing, pushing, porcelain diffing, and commit graph extraction', 'git_commit(), git_push(), git_stage(), git_get_detailed_status(), git_get_log_graph()']
          ]
        },
        points: [
          {
            label: 'Bulletproof NumPy-to-JSON Sanitization',
            text: 'Graph ML libraries like NumPy and NetworkX frequently return np.float64, np.int64, np.bool_, np.ndarray, NaN, or Infinity values that crash standard JSON serializers. Every WebSocket emission passes through sanitize_for_json() in backend/ml/analyzer.py to guarantee 100% native Python primitive types.'
          }
        ]
      },
      {
        id: 'frontend-module-directory',
        title: '3. Frontend Architecture & Zero-Copy Rendering (frontend/src/)',
        desc: 'How the React 18 frontend manages state, physics, themes, and hardware-accelerated graphics without React re-render lag:',
        table: {
          headers: ['Frontend Module Path', 'Primary Responsibility', 'Architectural Highlights'],
          rows: [
            ['src/App.jsx', 'Root layout orchestrator, split-pane resizing, keyboard shortcut listeners, and modal management', 'Coordinates Center View (Spatial Canvas vs. Monaco Editor vs. ImageViewer) and Right Panel (Inspector vs. AI Studio)'],
            ['src/hooks/useWorkspace.js', 'Master WebSocket client, reconnect state machine, file synchronization, and notification bus', 'Maintains wsRef, graphData, files, gitStatus, and dispatches workspace events'],
            ['src/hooks/usePhysicsEngine.js', 'D3-Force simulation lifecycle, tiered node spawning, and super-node aggregation', 'Writes x, y, vx, vy directly into simDataRef.current in RAM without triggering React state updates on 60Hz ticks'],
            ['src/hooks/useAiStudio.js', 'AI Studio conversation state, streaming thought/delta/step buffers, and approval gate handlers', 'Synchronizes live token streams and dynamic API key discovery across tabs'],
            ['src/hooks/useSettings.js', 'Persistent settings hook backed by localStorage and CustomEvent cross-component sync', 'Manages General, Editor, Spatial Map, and Multi-Key AI provider configurations'],
            ['src/config/engineConfig.js', 'Central physics constants, LOD camera breakpoints, and node/edge visual styling parameters', 'Defines PHYSICS repulsion, spring distances, collision radii, and nebula blur filters'],
            ['src/config/themeConfig.js', 'Built-in themes (Obsidian Black, Alabaster White, Sakura Rose, Cyber Neon, etc.) and custom theme engine', 'Injects CSS variables (--theme-*) into document root and updates WebGL hex colors dynamically'],
            ['src/components/canvas/PixiSpatialEngine.jsx', 'WebGPU/WebGL PixiJS v8 infinite viewport renderer and hardware hit-testing engine', 'Renders 8 graphics layers at 60 FPS reading directly from simDataRef.current']
          ]
        },
        points: [
          {
            label: 'Why Zero-Copy simDataRef Matters',
            text: 'If a force-directed physics engine updated React state (setNodes) 60 times per second for 1,000 nodes, React would perform 60,000 virtual DOM diffs per second, freezing the browser. Instead, usePhysicsEngine mutates coordinates in-place inside simDataRef.current, and PixiSpatialEngine reads those coordinates inside app.ticker.add() at native monitor refresh rate.'
          }
        ]
      },
      {
        id: 'caching-layers',
        title: '4. Multi-Tier In-Memory Caching Architecture',
        desc: 'Neuron achieves sub-millisecond warm response times through five specialized in-memory caches:',
        points: [
          {
            label: '1. Incremental AST Parse Cache (_AST_CACHE in parser.py)',
            text: 'Keyed by (rel_path, abs_target) and validated against (os.stat().st_mtime, file_size). Unmodified files bypass disk reading and Tree-Sitter parsing completely during workspace updates.'
          },
          {
            label: '2. Topology ML Hash Cache (_TOPOLOGY_ML_CACHE in analyzer.py)',
            text: 'Computes a deterministic hash of sorted node IDs and directed edge tuples (source->target:type). If an edit inside a function body does not alter the call/import topology, Neuron reuses the cached Louvain communities, PageRank, Betweenness, and Isolation Forest flags in <0.01ms.'
          },
          {
            label: '3. Git Commit Churn TTL Cache (GIT_CHURN_CACHE in workspace_service.py)',
            text: 'Caches git log commit frequency counts per file with a 60-second Time-To-Live (TTL), eliminating repetitive git subprocess spawns on rapid file saves.'
          },
          {
            label: '4. SHA-256 Graph-RAG Summary Cache (SUMMARY_CACHE in ai_service.py)',
            text: 'Fingerprints target node source code plus connected dependency snippets via SHA-256. Repeated hover or inspection of an unmodified function returns its architectural summary in 0ms.'
          },
          {
            label: '5. API Key Provider Discovery Cache (DISCOVERED_KEY_CACHE in ai_service.py)',
            text: 'Caches live model discovery rankings per SHA-256 API key hash for 600 seconds (10 minutes) so subsequent chat turns begin streaming immediately.'
          }
        ]
      }
    ]
  },

  'workspace-lifecycle': {
    category: 'Get Started & Architecture',
    title: 'Workspace Lifecycle, File Surveillance & Git Churn',
    subtitle: 'Deep technical specification of how Neuron resolves workspace paths, filters build artifacts, watches filesystem events in real time, and extracts Git telemetry.',
    sections: [
      {
        id: 'workspace-resolution-order',
        title: '1. Workspace Directory Resolution Hierarchy',
        desc: 'How backend/core/state.py determines which directory to index on startup and prevents temporary folder traps:',
        paragraphs: [
          'When a PyInstaller binary runs on Windows, its working directory or internal sys._MEIPASS points to a temporary extraction folder (such as AppData\\Local\\Temp\\_MEI123456). To ensure user files are never written to ephemeral temp directories that disappear on reboot, get_default_workspace_dir() enforces a strict 3-step resolution order.'
        ],
        codeBlocks: [
          {
            label: 'Workspace Resolution Priority (backend/core/state.py)',
            language: 'python',
            code: `# Priority 1: Explicit CLI Flag
python main.py --target-dir "D:/Engineering/MyService"

# Priority 2: Environment Variable Override
$env:NEURON_WORKSPACE_DIR = "D:/Engineering/MyService"

# Priority 3: Permanent User Default (Auto-Created & Seeded)
~/NeuronProjects  # e.g., C:/Users/<Username>/NeuronProjects`
          }
        ],
        points: [
          {
            label: 'Cross-Platform Path Normalization',
            text: 'All file paths inside Neuron state and graph IDs are normalized via normalize_rel_path() to POSIX forward slashes (/) without leading slashes, guaranteeing identical node IDs across Windows and Unix.'
          }
        ]
      },
      {
        id: 'exclusions-and-limits',
        title: '2. Strict Directory Exclusions & Memory Safety Ceilings',
        desc: 'To keep AST indexing under 500ms even in massive monorepos, Neuron automatically prunes dependency caches, binary build folders, and oversized artifacts.',
        table: {
          headers: ['Guard Parameter', 'Configured Value in Neuron', 'Engineering Purpose'],
          rows: [
            ['DEFAULT_EXCLUDE_DIRS', 'target, binaries, bundle, .cargo, node_modules, .git, __pycache__, .venv, venv, env, .next, dist, build, .cache, .chroma, .onnx_models, .idea, .vscode, coverage, .turbo, .pytest_cache', 'Prevents scanning thousands of third-party packages or Rust/Webpack build outputs'],
            ['VALID_SOURCE_EXTENSIONS', '.py, .js, .jsx, .ts, .tsx, .mjs, .cjs, .c, .h, .cpp, .hpp, .cc, .cxx, .java, .json, .css, .html, .md, .txt, .toml, .yaml, .yml, .bat, .cmd, .sh, .bash, .sql, .env, .ini, .cfg', 'Whitelists human-authored source and configuration files for AST and workspace indexing'],
            ['MAX_FILE_SIZE_BYTES', '1,000,000 bytes (1.0 MB)', 'Skips deep Tree-Sitter AST traversal on huge minified bundles or raw data files while still showing the file in Explorer']
          ]
        },
        points: [
          {
            label: 'Hidden Dot-Folder Pruning',
            text: 'During directory traversal, any folder starting with a dot (e.g., .git, .svelte-kit, .gradle) is pruned in-place from os.walk(dirs) before descending, avoiding unnecessary filesystem I/O.'
          }
        ]
      },
      {
        id: 'watchdog-surveillance',
        title: '3. Watchdog Real-Time Filesystem Surveillance & Burst Detection',
        desc: 'Neuron monitors your workspace directory continuously using a native OS Watchdog observer (WorkspaceWatcher in backend/services/workspace_service.py).',
        paragraphs: [
          'Whether you edit a file inside Neuron’s Monaco editor, run an external code generator in a terminal, pull changes via git pull, or use an external AI CLI tool like Claude Code or Aider, Neuron detects the disk mutation immediately and updates the 2D spatial graph in real time.',
          'To prevent rapid multi-file writes from flooding the WebSocket channel, WorkspaceWatcher implements a 0.35-second debounce window combined with Horizon 3 Agent Burst Interception.'
        ],
        points: [
          {
            label: 'Startup Grace Period (2.5 Seconds)',
            text: 'During the first 2.5 seconds after opening a new workspace, initial OS file access notifications are ignored so startup indexing is never duplicated.'
          },
          {
            label: 'Incremental Diff Detection',
            text: 'get_workspace_state() compares current file contents against PREVIOUS_FILE_CONTENTS in RAM. Only files whose contents actually changed are recorded in mutated_files_burst.'
          },
          {
            label: 'Blast Protection Auto-Intercept',
            text: 'If AppState.BLAST_PROTECTION_ENABLED is active when an external mutation burst occurs, Neuron captures the AST delta and transitive blast radius via agent_supervisor.record_agent_mutation_burst(), immediately rolls back the unauthorized disk changes to preserve workspace stability, and opens the Agent Supervisor HUD with a "BLAST SHIELD: Changes Intercepted" alert so you can inspect the diff and click Approve & Apply if desired.'
          }
        ]
      },
      {
        id: 'git-telemetry-engine',
        title: '4. High-Speed Git Telemetry & Commit Churn Pipeline',
        desc: 'How Neuron integrates Git status, branch awareness, commit logs, and historical churn directly into the spatial graph:',
        points: [
          {
            label: 'Sub-0.5ms Direct .git/HEAD Branch Reader',
            text: 'Instead of spawning a slow git branch subprocess on every state check (which can take 200-1,000ms on Windows), get_git_metadata() reads .git/HEAD directly from disk in <0.5ms, parsing refs/heads/<branch> or displaying the 7-character detached HEAD SHA.'
          },
          {
            label: 'Porcelain Status Mapping (M, U, A, D, R, I)',
            text: 'get_git_status() executes git -c core.quotepath=false status --porcelain --ignored=matching and maps every file and untracked subfolder to Modified (M), Untracked (U), Added (A), Deleted (D), Renamed (R), or Ignored (I) badges in the File Explorer.'
          },
          {
            label: 'Historical Commit Churn Scoring (get_git_churn)',
            text: 'Analyzes the last 100 commits (git log --name-only --format= -n 100) to count how frequently each file has been modified. This churn count is injected into every AST node in that file as feature x6_churn in the 10-Dimensional ML Risk Tensor, flagging files with both high churn (>= 3) and high cyclomatic complexity (>= 4) as Fragile Hotspots.'
          }
        ]
      }
    ]
  },

  'changelog': {
    category: 'Get Started & Architecture',
    title: 'Release History & Architectural Changelog',
    subtitle: 'Detailed engineering release notes, subsystem milestones, and architectural upgrades across Neuron versions.',
    sections: [
      {
        id: 'v1-0-0-release',
        title: 'v1.0.0 — Production Spatial Intelligence & Autonomous Studio Release',
        desc: 'Major production milestone unifying the 2D WebGPU Spatial Canvas, Multi-Modal Graph ML Engine, AC-3 Refactoring Shield, Polyglot Code Runner, and Zero-Hardcode Autonomous AI Studio.',
        points: [
          {
            label: 'PixiJS v8 WebGPU Spatial Engine',
            text: 'Implemented 8-layer hardware-accelerated canvas with infinite 300,000x300,000 viewport, D3-Force perpetual equilibrium, blurred convex-hull Louvain nebulae, and animated cross-stack laser photons.'
          },
          {
            label: '7-Grammar Tree-Sitter AST Engine',
            text: 'Added persistent native parsers for Python, JavaScript, JSX, TypeScript, TSX, C, C++, and Java with sub-millisecond mtime + file-size incremental AST caching.'
          },
          {
            label: '10-Dimensional Graph ML & Smell Diagnosis',
            text: 'Integrated NetworkX weighted Louvain community detection, PageRank authority, Betweenness bottleneck detection, Shannon entropy, and single-threaded Isolation Forest anomaly scoring.'
          },
          {
            label: 'AC-3 Constraint Satisfaction Refactoring Shield',
            text: 'Built mathematical pre-flight verification blocking circular dependency cycles and scope collisions during drag-and-drop Python (LibCST) and JS/TS (Tree-Sitter) symbol transplants.'
          },
          {
            label: 'Universal Zero-Hardcode BYOK Model Discovery',
            text: 'Engineered live API probing and structural model scoring across Google AI, Anthropic, OpenAI, Groq, DeepSeek, xAI, Mistral, Cerebras, OpenRouter, and local Ollama.'
          },
          {
            label: 'Horizon 3 Agent Supervisor & Blast Shield',
            text: 'Added real-time multi-file mutation burst detection, symbol-level AST diffing, transitive downstream blast radius visualization, and 1-click atomic batch rollbacks.'
          },
          {
            label: 'Universal 12-Language Polyglot Runner & Multi-Tab Terminal',
            text: 'Added unbuffered interactive terminal emulation (PowerShell, CMD, Git Bash, Unix shells) with dynamic CWD tracking, live stdin piping, and automatic compiler discovery.'
          }
        ]
      }
    ]
  }
};
