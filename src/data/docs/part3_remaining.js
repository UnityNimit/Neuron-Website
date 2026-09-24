// src/data/docs/part3_remaining.js

export const PART3_REMAINING_DOCS = {
  // --- CATEGORY 3: AI STUDIO, AUTONOMOUS AGENTS & BYOK ---
  'agent-overview': {
    category: 'AI Studio & Autonomous Agents',
    title: 'AI Studio & Multi-Session Architecture',
    subtitle: 'Integrated multi-session AI engineering studio capable of reasoning over your workspace AST, executing autonomous tools, and persisting conversations per project.',
    sections: [
      {
        id: 'multi-session-persistence',
        title: '1. Project-Scoped Conversation Persistence',
        desc: 'Neuron stores AI Studio conversations atomically inside your active workspace at .neuron/conversations.json.',
        points: [
          { label: 'Atomic Disk Writes', text: 'save_conversations() writes to a PID-scoped temporary file (.tmp.<pid>) before executing os.replace() to prevent JSON corruption.' },
          { label: 'Multi-Session Switching', text: 'Create, rename, switch, and delete independent conversation threads per repository via AI_CREATE_CONVERSATION and AI_SELECT_CONVERSATION.' },
          { label: 'Live Thought & Step Streaming', text: 'Streams reasoning thoughts (AI_CHAT_THOUGHT), tool execution badges (AI_CHAT_STEP), and response tokens (AI_CHAT_DELTA) in real time.' }
        ]
      }
    ]
  },

  'byok-discovery': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Universal BYOK Auto-Discovery & Model Scoring',
    subtitle: 'Zero-hardcode live API key provider detection, automatic model discovery, and structural capability ranking across 9 cloud providers plus local Ollama.',
    sections: [
      {
        id: 'live-provider-probing',
        title: '1. Zero-Hardcode Provider & Model Discovery (discover_key_and_models)',
        desc: 'Paste any API key into Settings > AI & Models; Neuron automatically identifies the provider, queries its live /models endpoint, and selects the highest-ranked coding model:',
        points: [
          { label: 'Supported BYOK Providers', text: 'Google AI (Gemini), Anthropic (Claude), OpenAI, Groq, DeepSeek, xAI (Grok), Mistral, Cerebras, and OpenRouter.' },
          { label: 'Local Offline Ollama Discovery', text: 'Queries http://127.0.0.1:11434/api/tags and prioritizes coder families (qwen2.5-coder, deepseek-coder) and larger parameter sizes.' },
          { label: 'Universal Model Scoring (score_discovered_model)', text: 'Ranks models dynamically by version number, parameter count, input/output token limits, release timestamp, and tier modifiers without hardcoded model names.' }
        ]
      }
    ]
  },

  'autonomous-tools': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Autonomous Agent Tool Suite & Runtime',
    subtitle: 'Nine built-in workspace tools enabling autonomous code exploration, surgical editing, pre-flight AST syntax verification, and virtual-environment-aware command execution.',
    sections: [
      {
        id: 'tool-dispatch-suite',
        title: '1. Built-In Autonomous Agent Tools (TOOL_DISPATCH)',
        desc: 'Every AI session can invoke nine native tools directly against your local workspace:',
        points: [
          { label: 'tool_get_file_outline & tool_view_file', text: 'Extracts compact AST class/function line spans before reading targeted 1-indexed line ranges.' },
          { label: 'tool_grep_search & tool_find_by_name', text: 'Executes fast regex searches and glob filename lookups across the workspace while pruning ignored build folders.' },
          { label: 'tool_write_to_file & tool_replace_file_content', text: 'Performs pre-flight Python ast.parse() syntax validation and captures automatic rollback snapshots before writing to disk.' },
          { label: 'tool_run_command', text: 'Executes shell commands with automatic .venv/venv Python/pip/pytest substitution and non-blocking daemon health probing.' },
          { label: 'tool_get_blast_radius & tool_update_memory', text: 'Inspects downstream callers and persists architectural conventions to .neuron/memory.md.' }
        ]
      }
    ]
  },

  'prompting': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Contextual Prompting & Workspace Grounding',
    subtitle: 'How Neuron automatically grounds every AI prompt with live workspace file trees, active editor buffers, persistent project rules, and Graph-RAG AST neighborhood context.',
    sections: [
      {
        id: 'workspace-grounding',
        title: '1. Automatic Workspace Context Injection (get_workspace_context)',
        desc: 'Every prompt dispatched to the AI Studio is automatically enriched with live structural telemetry:',
        points: [
          { label: 'Active File & Buffer Injection', text: 'Includes the currently open file path and up to 6,000 characters of in-memory editor code.' },
          { label: 'Persistent Project Rules', text: 'Automatically loads .neuronrules, CLAUDE.md, .cursorrules, and .neuron/memory.md into the system prompt.' },
          { label: 'Graph-RAG Node Summarization', text: 'Hovering or inspecting nodes invokes fetch_ast_summary() with connected caller/callee snippets and SHA-256 caching.' }
        ]
      }
    ]
  },

  'debugging': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Autonomous Debug Mode & Root-Cause Analysis',
    subtitle: 'Systematic hypothesis generation, blast radius traversal, and runtime verification using Neuron’s autonomous agent loop.',
    sections: [
      {
        id: 'debug-loop',
        title: '1. Autonomous Diagnosis & Verification Loop',
        desc: 'How the agent isolates and resolves complex bugs across multi-file repositories:',
        points: [
          { label: '1. AST Outline & Grep Localization', text: 'Locates offending symbols and inspects upstream callers via tool_get_file_outline and tool_grep_search.' },
          { label: '2. Pre-Flight Syntax-Checked Patching', text: 'Applies surgical replacements via tool_replace_file_content with automatic unified diff generation.' },
          { label: '3. Automated Test Verification', text: 'Runs pytest, node, or compiler checks via tool_run_command and iterates if stderr tracebacks appear.' }
        ]
      }
    ]
  },

  'planning': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Strategic Planning & Refactoring Proposals',
    subtitle: 'How Neuron extracts structured refactoring proposals from model responses while guarding against accidental CLI or conversational overwrites.',
    sections: [
      {
        id: 'refactor-proposal-engine',
        title: '1. Refactor Proposal Extraction Guards (extract_refactor_proposal)',
        desc: 'Neuron analyzes assistant responses for targeted file refactors using four deterministic safety guards:',
        points: [
          { label: 'Conversational & Operational Intent Guard', text: 'Never triggers code overwrite modals when the user only asked a question or requested to run/test/install a package.' },
          { label: 'Shell & CLI Block Filtering', text: 'Explicitly ignores bash, powershell, cmd, and CLI command snippets (python, pip, npm, git, cargo).' },
          { label: 'Atomic Refactor Application', text: 'Approved proposals write atomically via apply_refactor_code() and immediately re-sync the spatial graph.' }
        ]
      }
    ]
  },

  'security': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Approval Gates, Persistent Rules & Rollback Vault',
    subtitle: 'Human-in-the-loop tool approval gates, workspace path sandboxing, and 1-click session snapshot recovery.',
    sections: [
      {
        id: 'approval-and-rollback',
        title: '1. Interactive Tool Approval & Session Rollbacks',
        desc: 'Maintain complete sovereignty over every file write and shell command:',
        points: [
          { label: 'Interactive Approval Gate (AI_APPROVAL_REQUIRED)', text: 'When Require Approval is enabled, mutating tools pause on an asyncio.Future until you click Approve or Reject in the chat UI.' },
          { label: 'Workspace Path Boundary Enforcement', text: 'All file writes verify full_path.startswith(os.path.abspath(base)) to block directory traversal outside the project root.' },
          { label: '1-Click Session Rollback (FILE_SNAPSHOTS)', text: 'Every modified file is cached in FILE_SNAPSHOTS prior to mutation and can be restored instantly via AI_ROLLBACK_CHANGES.' }
        ]
      }
    ]
  },

  // --- CATEGORY 4: AST PARSING, AC-3 REFACTORING & AGENT SUPERVISOR ---
  'daemon-setup': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Multi-Language Tree-Sitter AST Engine',
    subtitle: 'Deep technical specification of backend/core/parser.py: persistent 7-language grammar instances, iterative complexity scoring, import resolution, and incremental caching.',
    sections: [
      {
        id: 'tree-sitter-pipeline',
        title: '1. Persistent Multi-Language Grammar Architecture',
        desc: 'Neuron initializes seven compiled Tree-Sitter grammars in GLOBAL_PARSERS at startup:',
        points: [
          { label: '7 Native Grammars', text: 'Supports Python (py), JavaScript (js), TypeScript (ts), TSX (tsx), C (c), C++ (cpp), and Java (java).' },
          { label: 'Iterative Complexity Calculator', text: 'calculate_complexity() traverses AST subtrees iteratively using an explicit stack against 16 DECISION_TRIGGERS without Python recursion limit risks.' },
          { label: 'Incremental AST Cache (_AST_CACHE)', text: 'Caches parsed AST metadata keyed by (mtime, file_size) for sub-millisecond warm workspace updates.' }
        ]
      }
    ]
  },

  'ac3-refactoring': {
    category: 'AST, Refactoring & Supervisor',
    title: 'AC-3 Constraint Satisfaction Refactoring Shield',
    subtitle: 'How backend/ai/csp_guard.py validates drag-and-drop symbol migrations against Domain, Scope, Mutual Coupling, and Global Circular Import invariants.',
    sections: [
      {
        id: 'ac3-invariants',
        title: '1. The Four Mathematical Refactoring Invariants (ac3_validate_refactor)',
        desc: 'Before any symbol is moved between files, the AC-3 solver verifies four strict invariants:',
        points: [
          { label: 'Invariant 1 & 2 — Domain & Scope Compatibility', text: 'Verifies source and destination files exist, share compatible language families, and have zero symbol name collisions in the destination file.' },
          { label: 'Invariant 3 — Mutual Coupling Detection', text: 'Uses extract_symbol_dependencies() to ensure moving the symbol does not sever un-exported private helpers in the source module.' },
          { label: 'Invariant 4 — Global DAG Cycle Prevention', text: 'Simulates adding the required cross-file import edge in build_import_dependency_graph() and rejects the move if nx.simple_cycles() detects a circular dependency.' }
        ]
      }
    ]
  },

  'libcst-mutations': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Lossless Python LibCST & JS Tree-Sitter Transplants',
    subtitle: 'How backend/core/mutator.py and backend/core/js_mutator.py perform surgical cross-file symbol moves and full module merges while preserving comments and formatting.',
    sections: [
      {
        id: 'surgical-mutators',
        title: '1. Formatting-Preserving AST Transplants',
        desc: 'Neuron mutates source files using concrete syntax trees rather than destructive regexes:',
        points: [
          { label: 'Python LibCST Surgery (mutator.py)', text: 'Uses cst.CSTTransformer (FunctionExtractor & SourceCodeReplacer) to extract functions with leading comments, inject import statements, and validate compilation.' },
          { label: 'JS/TS/JSX Byte-Span Surgery (js_mutator.py)', text: 'Uses Tree-Sitter byte offsets to extract functions/arrow components, promote export keywords, and rewrite relative imports across the entire workspace.' },
          { label: 'Full JS/TS Module Merging (execute_js_file_merge)', text: 'Merges two JS/TS files by deduplicating imports, combining declarations, redirecting workspace imports, and deleting the obsolete source file.' }
        ]
      }
    ]
  },

  'agent-supervisor': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Horizon 3 Agent Supervisor & Blast Protection',
    subtitle: 'Real-time multi-file mutation burst interception, symbol-level AST diffing, downstream blast radius calculation, and 1-click atomic batch rollbacks.',
    sections: [
      {
        id: 'supervisor-engine',
        title: '1. Multi-File Mutation Burst Tracking (backend/ai/agent_supervisor.py)',
        desc: 'How AgentSupervisorEngine monitors both internal and external AI coding agents (Claude Code, Cursor, Aider, Ollama):',
        points: [
          { label: '1.8-Second Burst Window Grouping', text: 'Groups rapid multi-file saves within burst_timeout_seconds (1.8s) into a unified AgentMutationBatch.' },
          { label: 'Granular AST Symbol Deltas', text: 'compute_ast_delta() identifies exact functions and components Added (+), Modified (~), or Deleted (-) alongside unified diffs.' },
          { label: '1-Click Batch Rollback & Re-Apply', text: 'AgentSupervisorHUD allows instant 1-click rollback (rollback_batch) or approval (reapply_batch) across all files in the batch.' }
        ]
      }
    ]
  },

  'vector-search': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Pure-RAM Sublinear TF-IDF Semantic Omni-Search',
    subtitle: 'How backend/ai/vector_search.py delivers sub-5ms semantic and lexical code search in 100% local RAM without 80MB embedding downloads or external vector databases.',
    sections: [
      {
        id: 'tfidf-lexical-engine',
        title: '1. Hybrid Sublinear TF-IDF + AST Identifier Boosting',
        desc: 'VectorSearchEngine combines N-gram cosine similarity with exact AST symbol boosting:',
        points: [
          { label: 'Sublinear TF-IDF (1-3 N-Grams)', text: 'Indexes up to 12,000 n-gram features across symbol names, file paths, complexity metadata, and source snippets with a pure-Python fallback.' },
          { label: 'AST Lexical Booster', text: 'Boosts exact symbol matches (+40.0), file path matches (+25.0), and token containment so exact identifiers always rank at the top.' },
          { label: 'Thread-Safe RLock Concurrency', text: 'Protected by threading.RLock() for zero-contention background indexing and sub-5ms Command Palette queries.' }
        ]
      }
    ]
  },

  // --- CATEGORY 5: EDITOR, POLYGLOT RUNNER, TERMINAL & GIT ---
  'monaco-editor': {
    category: 'Editor, Terminal & Git',
    title: 'Monaco Code Editor, Find/Replace & Media Viewers',
    subtitle: 'Full-featured Monaco code editing with custom syntax themes, regex Find & Replace widget, interactive image inspection, and binary asset safeguards.',
    sections: [
      {
        id: 'editor-capabilities',
        title: '1. Monaco Editor & Specialized Asset Viewers',
        desc: 'Seamless editing and inspection for code, images, and binary files:',
        points: [
          { label: 'Synchronized Custom Monaco Themes', text: 'Automatically switches Monaco syntax themes (neuron-obsidian, neuron-white, neuron-pink, etc.) to match your active workspace theme.' },
          { label: 'Find & Replace Widget (FindReplaceWidget.jsx)', text: 'Supports case-sensitive, whole-word, and regular expression search and replace across open buffers.' },
          { label: 'Interactive Image & Binary Viewers', text: 'Renders .png, .jpg, .svg, .webp, .gif, .ico, and .avif in ImageViewer.jsx with zoom/pan controls and routes unsupported binaries to UnsupportedFileViewer.jsx.' }
        ]
      }
    ]
  },

  'polyglot-runner': {
    category: 'Editor, Terminal & Git',
    title: 'Universal Polyglot Code Runner (12 Languages)',
    subtitle: 'Execute Python, JavaScript, TypeScript, C, C++, Java, Rust, Go, PowerShell, Bash, and Batch scripts directly from any subfolder with custom stdin piping.',
    sections: [
      {
        id: 'polyglot-execution-matrix',
        title: '1. Subfolder-Aware Compilation & Execution (run_code_polyglot_sync)',
        desc: 'How backend/services/terminal_service.py compiles and runs 12 languages with zero manual setup:',
        points: [
          { label: 'Python PYTHONPATH Injection', text: 'Automatically prepends both the script directory and workspace root to PYTHONPATH and forces UTF-8 unbuffered I/O.' },
          { label: 'Node.js ES Module Auto-Wrapper', text: 'Detects ES6 import/export syntax in .js files and automatically executes via a temporary .mjs wrapper so ES modules run without package.json errors.' },
          { label: 'C, C++, Java, Rust & Go Compilation', text: 'Compiles C/C++ with -I include paths into temporary binaries, compiles Java with workspace classpaths, and runs Rust/Go natively.' }
        ]
      }
    ]
  },

  'interactive-terminal': {
    category: 'Editor, Terminal & Git',
    title: 'Multi-Tab Interactive Terminal & Stdin Pipe',
    subtitle: 'Real-time unbuffered os.read() terminal emulation supporting PowerShell, CMD, Git Bash, and Unix shells with live working directory tracking and process-tree termination.',
    sections: [
      {
        id: 'terminal-streaming-architecture',
        title: '1. Low-Level Unbuffered Streaming & Process Tree Termination',
        desc: 'Engineered in backend/services/terminal_service.py and TerminalPanel.jsx:',
        points: [
          { label: 'Unbuffered os.read(fd, 4096) Streaming', text: 'Streams stdout and stderr chunks immediately via incremental UTF-8 decoders without waiting for newline or EOF.' },
          { label: 'Dynamic __NEURON_CWD__ Tracking', text: 'Injects a post-command CWD probe so cd commands automatically update the active tab’s working directory prompt.' },
          { label: 'Zero-Zombie Process Tree Killer', text: 'kill_terminal_process() uses taskkill /F /T /PID on Windows and os.killpg(pgid, SIGKILL) on Unix to terminate entire child process trees cleanly.' }
        ]
      }
    ]
  },

  'source-control': {
    category: 'Editor, Terminal & Git',
    title: 'Git Source Control, Commit Graph & Diff Engine',
    subtitle: 'Integrated Git staging, unstaging, discarding, committing, pushing, and interactive topological commit graph visualization.',
    sections: [
      {
        id: 'git-panel-capabilities',
        title: '1. Source Control Panel & Commit Graph (SourceControlPanel.jsx)',
        desc: 'Manage your entire Git workflow without leaving Neuron:',
        points: [
          { label: 'Granular Stage, Unstage & Discard', text: 'Stage individual files or all changes (GIT_STAGE_FILE, GIT_STAGE_ALL), unstage, or discard working tree modifications safely.' },
          { label: 'Commit, Amend & Push', text: 'Commit staged changes (or auto-stage modified files if none staged), amend previous commits, and push directly to upstream remotes.' },
          { label: 'Interactive Commit Log Graph', text: 'git_get_log_graph() parses parent hashes, branch refs, author timestamps, and commit subjects for the last 40 commits.' }
        ]
      }
    ]
  },

  'command-palette': {
    category: 'Editor, Terminal & Git',
    title: 'Unified Command Palette (Ctrl+K / Ctrl+P)',
    subtitle: 'Instantaneous unified omni-search across Pure-RAM AI Vector matches, workspace files, AST symbols, and system commands.',
    sections: [
      {
        id: 'command-palette-modes',
        title: '1. Prefix Modifiers & Dual-Action Routing (CommandPalette.jsx)',
        desc: 'Press Ctrl+K or Ctrl+P to search across your entire codebase in <5ms:',
        points: [
          { label: 'Mode Prefixes (>, #, @)', text: 'Type > for system commands, # for workspace files, @ for AST symbols, or type natural language for hybrid AI Vector + File search.' },
          { label: 'Dual-Action Keyboard Routing', text: 'Press Enter on any semantic node to warp the 2D WebGPU camera directly to that symbol, or press Shift+Enter to open it in the Monaco Code Editor.' }
        ]
      }
    ]
  },

  // --- CATEGORY 6: PROTOCOLS, THEMES, SHORTCUTS & TROUBLESHOOTING ---
  'websocket-protocol': {
    category: 'Reference & Troubleshooting',
    title: 'WebSocket Event Protocol & REST API Reference',
    subtitle: 'Complete specification of Neuron’s 35+ full-duplex WebSocket events (ws://127.0.0.1:8000/ws) and HTTP REST endpoints.',
    sections: [
      {
        id: 'protocol-overview',
        title: '1. Full-Duplex WebSocket & REST Endpoints',
        desc: 'All communication between the frontend and backend uses JSON-sanitized packets over port 8000:',
        points: [
          { label: 'Core REST Endpoints', text: 'GET /, GET /health, GET /api/file/raw, GET /api/file/info, POST /api/ai/discover-key, GET /api/supabase/ping, and OAuth PKCE /auth/* routes.' },
          { label: 'WebSocket Event Multiplexing', text: 'Single persistent connection multiplexing workspace sync, terminal streams, Git operations, AC-3 refactoring, and AI Studio streaming.' }
        ]
      }
    ]
  },

  'theme-engine': {
    category: 'Reference & Troubleshooting',
    title: 'Theme Engine & Custom Token Architecture',
    subtitle: 'Built-in themes (Obsidian Black, Alabaster White, Sakura Rose, Cyber Neon, Emerald Forest, Solarized) and live CSS variable + WebGL synchronization.',
    sections: [
      {
        id: 'theme-tokens',
        title: '1. Unified CSS Variable & WebGPU Color Synchronization (themeConfig.js)',
        desc: 'How Neuron updates the TopBar, Sidebar, Monaco Editor, and WebGPU Canvas simultaneously on theme switch:',
        points: [
          { label: 'Dynamic CSS Custom Properties', text: 'Injects --theme-primary, --theme-secondary, --theme-background, --theme-surface, --theme-border, and --theme-accent into the DOM root.' },
          { label: 'WebGL Hex Synchronization', text: 'Synchronizes canvasBackground, laserBridge, and activeRay hex integers directly with PixiSpatialEngine.' }
        ]
      }
    ]
  },

  'zero-telemetry': {
    category: 'Reference & Troubleshooting',
    title: 'Zero Cloud Telemetry, Local Storage & PKCE Auth',
    subtitle: 'Privacy architecture, air-gapped operation guarantees, local credential storage, and optional OAuth PKCE desktop session persistence.',
    sections: [
      {
        id: 'privacy-guarantees',
        title: '1. 100% Localhost Privacy & Air-Gapped Readiness',
        desc: 'Why your proprietary source code never leaves your workstation:',
        points: [
          { label: 'Zero Telemetry or Analytics', text: 'Neuron contains zero background telemetry beacons, crash uploaders, or remote code indexing servers.' },
          { label: 'Local Credential Storage', text: 'BYOK API keys remain strictly in your local workstation storage and connect directly to your chosen provider endpoint.' },
          { label: 'Loopback OAuth PKCE Flow', text: 'Optional desktop sign-in uses RFC 7636 S256 PKCE codes verified locally on 127.0.0.1:8000/auth/callback and cached in ~/.neuron/auth_session.json.' }
        ]
      }
    ]
  },

  'keybindings': {
    category: 'Reference & Troubleshooting',
    title: 'Complete Keyboard Shortcuts Reference',
    subtitle: 'Master keyboard shortcuts for the Spatial Canvas, Command Palette, Monaco Code Editor, Multi-Tab Terminal, and AI Studio.',
    sections: [
      {
        id: 'shortcut-matrix',
        title: '1. Global, Canvas, Editor & Terminal Shortcuts',
        desc: 'Essential hotkeys for high-velocity navigation and code execution:',
        points: [
          { label: 'Ctrl + K / Ctrl + P', text: 'Open Unified Command Palette & Semantic Vector Omni-Search.' },
          { label: 'Enter / Shift + Enter (in Palette)', text: 'Enter warps the 2D camera to the selected symbol; Shift+Enter opens the symbol directly in the Code Editor.' },
          { label: 'Ctrl + S', text: 'Save active file atomically and trigger incremental AST + Graph ML update.' },
          { label: 'Ctrl + F / Ctrl + H', text: 'Open the in-editor Find & Replace widget with regex and whole-word toggles.' },
          { label: 'Ctrl + `', text: 'Toggle the bottom multi-tab interactive Terminal & Output panel.' }
        ]
      }
    ]
  },

  'troubleshooting': {
    category: 'Reference & Troubleshooting',
    title: 'Comprehensive Troubleshooting & Diagnostics Matrix',
    subtitle: 'Step-by-step diagnostic solutions for WebGPU driver fallbacks, port 8000 binding conflicts, compiler discovery, and AI key verification.',
    sections: [
      {
        id: 'common-diagnostics',
        title: '1. Diagnostic Solutions & Recovery Procedures',
        desc: 'Quick resolutions for workstation environment issues:',
        points: [
          { label: 'Backend Health Probe Verification', text: 'Visit http://127.0.0.1:8000/health or inspect %TEMP%/neuron_backend_stdout.log and %TEMP%/neuron_backend_stderr.log.' },
          { label: 'Custom Port Override (--port)', text: 'If port 8000 is occupied by another service, launch the backend with --port <number> or terminate orphaned processes.' },
          { label: 'AC-3 Refactoring Rejection Alerts', text: 'If a drag-and-drop symbol move snaps back with a red shockwave, inspect the CSP Violation notification to see the exact circular import path or coupled helper.' }
        ]
      }
    ]
  }
};
