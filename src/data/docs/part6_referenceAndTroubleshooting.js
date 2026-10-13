// src/data/docs/part6_referenceAndTroubleshooting.js
// Category 6: Reference & Troubleshooting Technical Guides

export const PART6_REFERENCE_AND_TROUBLESHOOTING_DOCS = {
  'websocket-protocol': {
    category: 'Reference & Troubleshooting',
    title: 'Full-Duplex WebSocket and REST API Specification',
    subtitle: 'Detailed protocol specification governing bidirectional communication between the desktop interface and local Python services.',
    sections: [
      {
        id: 'websocket-framing',
        title: '1. WebSocket Message Framing and Handshake Protocol',
        desc: 'All real-time commands, streaming tokens, and canvas updates flow through a single persistent WebSocket connection bound to ws://127.0.0.1:8000/ws.',
        paragraphs: [
          'When the frontend application initializes, useNeuronWebSocket.js establishes a full-duplex WebSocket connection to the local Python daemon. Every message exchanged over this channel is encoded as a UTF-8 JSON object containing a required type field.',
          'For request-response workflows (such as querying workspace metrics or running code), messages include a client-generated request_id (UUIDv4) that the backend echoes back in its response, allowing promises on the frontend to resolve cleanly without race conditions.'
        ],
        codeBlocks: [
          {
            label: 'Canonical WebSocket Frame Structure',
            language: 'json',
            code: `{
  "type": "REFACTOR_SYMBOL_MOVE",
  "request_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "timestamp": 1729000000000,
  "payload": {
    "source_file": "backend/core/parser.py",
    "dest_file": "backend/core/helpers.py",
    "symbol_name": "normalize_identifier"
  }
}`
          }
        ],
        points: [
          {
            label: 'Automatic Heartbeat and Liveness Probing',
            text: 'The frontend sends a PING frame every 15 seconds. If the backend fails to respond with PONG within 5 seconds, the client marks the connection as stale and initiates progressive exponential backoff reconnection.'
          },
          {
            label: 'Reconnection State Synchronization',
            text: 'Upon reconnecting after sleep or interruption, the frontend automatically transmits a GET_WORKSPACE_STATE frame to resynchronize active editor tabs, git branch heads, and spatial node positions.'
          }
        ]
      },
      {
        id: 'core-websocket-events',
        title: '2. Core WebSocket Event Matrix',
        desc: 'High-frequency events exchanged between the frontend user interface and backend daemon:',
        table: {
          headers: ['Event Type', 'Direction', 'Payload Content', 'Description'],
          rows: [
            ['GET_WORKSPACE_STATE', 'Client -> Server', '{ "force_reindex": boolean }', 'Requests current files, AST symbols, and graph metrics.'],
            ['WORKSPACE_STATE_UPDATE', 'Server -> Client', '{ "nodes": [], "edges": [], "metrics": {} }', 'Streams updated graph layout, risk scores, and cluster nebulae.'],
            ['RUN_CODE', 'Client -> Server', '{ "filePath": string, "stdin": string }', 'Dispatches polyglot execution for the specified file.'],
            ['CODE_OUTPUT', 'Server -> Client', '{ "stream": "stdout"|"stderr", "text": string }', 'Streams execution output chunks progressively.'],
            ['AI_SEND_MESSAGE', 'Client -> Server', '{ "conversation_id": string, "prompt": string }', 'Sends user prompts to the active AI Studio session.'],
            ['AI_CHAT_DELTA', 'Server -> Client', '{ "conversation_id": string, "delta": string }', 'Streams progressive LLM markdown response tokens.'],
            ['AI_CHAT_THOUGHT', 'Server -> Client', '{ "thought": string }', 'Streams internal reasoning thoughts for deep-thinking models.'],
            ['TERMINAL_INPUT', 'Client -> Server', '{ "session_id": string, "data": string }', 'Sends user keystrokes to the active terminal process.']
          ]
        }
      },
      {
        id: 'rest-endpoints',
        title: '3. Local REST API Endpoints',
        desc: 'Complementary HTTP endpoints used for static asset loading and health checks:',
        table: {
          headers: ['HTTP Method & Path', 'Parameters', 'Return Type', 'Description'],
          rows: [
            ['GET /api/health', 'None', 'application/json', 'Returns daemon status, active PID, memory usage, and version number.'],
            ['GET /api/settings', 'None', 'application/json', 'Returns active configuration, theme preferences, and AI provider aliases.'],
            ['POST /api/settings', 'JSON body', 'application/json', 'Updates persistent user settings and AI model keys atomically.'],
            ['GET /api/file/raw', '?path=<relative_path>', 'binary / text', 'Serves raw file contents, images, and binary assets for direct inspection.']
          ]
        }
      }
    ]
  },

  'theme-engine': {
    category: 'Reference & Troubleshooting',
    title: 'Theme Token Engine and Custom Palette Architecture',
    subtitle: 'Unified design system synchronizing CSS variables, Tailwind classes, PixiJS canvas sprites, and Monaco syntax themes.',
    sections: [
      {
        id: 'theme-architecture',
        title: '1. Cascading Theme Architecture',
        desc: 'How a single theme selection updates every visual element across both 2D canvas and text editing layers.',
        paragraphs: [
          'Neuron does not treat the spatial canvas and the code editor as separate islands. The theme system is defined centrally in frontend/src/config/themeConfig.js. When you select a theme in the settings dialog or command palette, the ThemeContext propagates the configuration to three targets simultaneously:',
          'First, it updates CSS custom properties on document.documentElement (such as --bg-app, --text-primary, --accent-color). Second, it triggers a lightweight PixiJS asset re-tint pass that updates canvas node textures without re-running physics simulation. Third, it notifies Monaco to switch its active syntax theme.'
        ],
        codeBlocks: [
          {
            label: 'Canonical Theme Token Schema in frontend/src/config/themeConfig.js',
            language: 'javascript',
            code: `export const THEME_SCHEMA = {
  id: 'obsidian',
  name: 'Obsidian Black',
  isDark: true,
  primary: '#121212',          // Top titlebar & panel headers
  secondary: '#191a1b',        // Secondary toolbar backgrounds
  background: '#121314',       // Spatial canvas background
  surface: '#161719',          // Editor background & cards
  surfaceHover: '#222426',     // List item & tab hover states
  border: '#242628',           // Primary divider borders
  textBright: '#f8fafc',       // High-contrast headings
  textPrimary: '#e2e8f0',      // Standard readable body text
  textMuted: '#64748b',        // Minor labels & timestamps
  accent: '#3b82f6',           // Focus outlines & button highlights
  laserBridge: '#00f0ff'       // Cross-stack photon animation tint
};`
          }
        ]
      },
      {
        id: 'built-in-themes',
        title: '2. The 5 Built-In Theme Profiles',
        desc: 'Curated visual profiles designed for high contrast and spatial clarity:',
        table: {
          headers: ['Theme Profile', 'Base Tone', 'Accent Color', 'Canvas Tint', 'Recommended Use Case'],
          rows: [
            ['Obsidian Black', 'Dark (#121314)', 'Electric Blue (#3b82f6)', 'Deep Space Dark', 'Default profile for daily development in low-light environments.'],
            ['Alabaster White', 'Light (#ffffff)', 'Cobalt Blue (#2563eb)', 'Clean Minimal Gray', 'Optimized for high-ambient lighting, daylight, and presentations.'],
            ['Cyber Neon', 'Dark (#0a0a12)', 'Neon Cyan (#00f0ff)', 'Dark Violet', 'High-contrast visual profile accentuating calls and import paths.'],
            ['Rose Quartz', 'Light (#fff1f2)', 'Crimson (#e11d48)', 'Soft Blush', 'Warm low-fatigue light profile with gentle pastel contrast.'],
            ['Synthwave', 'Dark (#180b24)', 'Hot Pink (#ec4899)', 'Retro Neon Purple', 'Vibrant profile highlighting Louvain cluster communities.']
          ]
        }
      },
      {
        id: 'defining-custom-themes',
        title: '3. Adding Custom Themes',
        desc: 'How developers can contribute new themes to the application.',
        paragraphs: [
          'To define a new theme, add an entry to THEMES_MAP in frontend/src/config/themeConfig.js following the canonical schema. Every color token must be a valid hex color string.',
          'The application automatically populates your new theme in the theme selector dropdown, registers matching Monaco syntax highlighting rules, and generates smooth hover and active tints programmatically.'
        ]
      }
    ]
  },

  'zero-telemetry': {
    category: 'Reference & Troubleshooting',
    title: 'Privacy by Design, Localhost Security, and Isolation',
    subtitle: 'Security invariants ensuring that your source code, AST graphs, terminal commands, and AI prompts remain private on your computer.',
    sections: [
      {
        id: 'localhost-isolation',
        title: '1. Localhost Isolation and Loopback Network Binding',
        desc: 'Strict network boundaries preventing unauthorized local or remote access:',
        paragraphs: [
          'The backend daemon binds exclusively to the loopback interface (127.0.0.1) and never listens on 0.0.0.0 or public network adapters. Incoming connections from external IP addresses are rejected at the operating system socket layer.',
          'Furthermore, WebSocket connections require an application session handshake token generated in memory on startup. Web browsers visiting malicious websites cannot initiate cross-origin requests to your running Neuron daemon.'
        ],
        table: {
          headers: ['Security Boundary', 'Implementation', 'Protective Guarantee'],
          rows: [
            ['Loopback Binding', 'host="127.0.0.1"', 'Sockets are inaccessible from local Wi-Fi, LAN, or public internet networks.'],
            ['Session Handshake Token', 'X-Neuron-Session-Token', 'Prevents drive-by browser scripts from issuing unauthorized commands.'],
            ['CORS Restrictions', 'FastAPI CORSMiddleware', 'Restricts allowed HTTP origins strictly to the native Tauri application origin.'],
            ['Local Storage', 'Local SQLite and JSON', 'All project metadata and graph positions are stored inside your user profile folder.']
          ]
        }
      },
      {
        id: 'airgapped-architecture',
        title: '2. Offline and Air-Gapped Code Execution',
        desc: 'Full functionality without mandatory internet access or cloud dependencies.',
        paragraphs: [
          'Neuron functions completely offline without an active internet connection. Tree-Sitter AST parsing, D3 force simulation, Louvain cluster detection, polyglot script running, and vector search execute entirely using local CPU and memory resources.',
          'The only time Neuron initiates external network traffic is when you explicitly configure a cloud AI provider (such as OpenAI, Anthropic, or Google) and send a prompt. If you prefer complete isolation, you can use local models through Ollama without sending any data over the internet.'
        ]
      },
      {
        id: 'permission-boundaries',
        title: '3. Subprocess Permissions and Sandboxing',
        desc: 'Operating system privilege management and safety boundaries.',
        paragraphs: [
          'Neuron runs with standard user permissions and does not require or request administrator or root elevation. Terminals and polyglot runners inherit your standard shell environment, ensuring that code cannot modify protected system files unless you explicitly run tools with elevated rights.',
          'When autonomous AI agents use file editing tools, Neuron validates proposed modifications through pre-flight syntax checks and creates automatic undo snapshots, preventing accidental code loss.'
        ]
      }
    ]
  },

  'keybindings': {
    category: 'Reference & Troubleshooting',
    title: 'Complete Keyboard Shortcuts Reference',
    subtitle: 'Comprehensive keybinding reference for spatial canvas navigation, code editing, terminal commands, and AI workflows.',
    sections: [
      {
        id: 'global-shortcuts',
        title: '1. Global Navigation and Layout Shortcuts',
        desc: 'Keyboard shortcuts accessible from anywhere within the application:',
        table: {
          headers: ['Shortcut (Windows / Linux)', 'Shortcut (macOS)', 'Action and Description'],
          rows: [
            ['Ctrl+K / Ctrl+P', 'Cmd+K / Cmd+P', 'Open the unified Command Palette overlay.'],
            ['Ctrl+B', 'Cmd+B', 'Toggle left file explorer and source control panel visibility.'],
            ['Ctrl+J', 'Cmd+J', 'Toggle bottom terminal and code runner panel visibility.'],
            ['Ctrl+\\', 'Cmd+\\', 'Toggle right AI Studio and refactoring inspector panel.'],
            ['Ctrl+Shift+F', 'Cmd+Shift+F', 'Focus global workspace grep search in the left sidebar.'],
            ['F5', 'F5', 'Trigger full workspace re-scan and AST index update.'],
            ['Escape', 'Escape', 'Dismiss active overlays, context menus, or modals.']
          ]
        }
      },
      {
        id: 'canvas-shortcuts',
        title: '2. Spatial Canvas Navigation Shortcuts',
        desc: 'Navigating the 2D graph view with mouse and keyboard combinations:',
        table: {
          headers: ['Action / Input', 'Control Mapping', 'Behavior and Description'],
          rows: [
            ['Pan Canvas', 'Click and drag background / Space + Drag', 'Moves the infinite canvas viewport smoothly in any direction.'],
            ['Zoom Viewport', 'Mouse wheel / Touchpad pinch', 'Zooms camera smoothly between 0.05 (galaxy view) and 2.5 (deep inspection).'],
            ['Select Node', 'Left click node', 'Focuses the node, highlights connected edges, and opens the inspector.'],
            ['Open Source File', 'Double click file planet or moon', 'Opens the file directly in the Monaco editor at the selected symbol line.'],
            ['Refactor Symbol', 'Drag moon onto destination planet', 'Initiates constraint-checked symbol move between files.'],
            ['Recenter View', 'Home / Double click background', 'Re-centers camera viewport to enclose all active clusters.']
          ]
        }
      },
      {
        id: 'editor-and-ai-shortcuts',
        title: '3. Monaco Editor and AI Studio Shortcuts',
        desc: 'Shortcuts for code editing and interacting with autonomous agents:',
        table: {
          headers: ['Shortcut', 'Context', 'Behavior and Description'],
          rows: [
            ['Ctrl+S', 'Monaco Editor', 'Save active file buffer to disk and notify Tree-Sitter parser.'],
            ['Ctrl+F', 'Monaco Editor', 'Open floating Find & Replace search widget.'],
            ['Ctrl+H', 'Monaco Editor', 'Open floating Find & Replace in replace mode.'],
            ['Ctrl+/', 'Monaco Editor', 'Toggle line comment syntax across selected lines.'],
            ['Alt+Up / Alt+Down', 'Monaco Editor', 'Move current line or selected block up or down.'],
            ['Ctrl+Enter', 'AI Studio', 'Send active prompt to the AI agent.'],
            ['Ctrl+Shift+B', 'Code Runner', 'Execute active file through the polyglot code runner.']
          ]
        }
      }
    ]
  },

  'troubleshooting': {
    category: 'Reference & Troubleshooting',
    title: 'Diagnostic Matrix and Recovery Procedures',
    subtitle: 'Practical troubleshooting solutions for common startup issues, port conflicts, hardware acceleration, and parser diagnostics.',
    sections: [
      {
        id: 'diagnostic-matrix',
        title: '1. Diagnostic Resolution Matrix',
        desc: 'Solutions for common setup and operational issues:',
        table: {
          headers: ['Symptom / Error', 'Root Cause', 'Recommended Resolution Steps'],
          rows: [
            ['Port 8000 Already in Use', 'Another process or previous backend instance is occupying port 8000', 'Run "netstat -ano | findstr :8000" on Windows or "lsof -i :8000" on Unix to locate the process ID, then terminate it with taskkill /F /PID <pid> or kill -9 <pid>.'],
            ['WebGPU Unavailable', 'Outdated graphics drivers or disabled browser flags', 'Neuron automatically falls back to WebGL2 and Canvas2D rendering. Update your graphics drivers to re-enable WebGPU hardware acceleration.'],
            ['Python Virtual Environment Not Found', 'Virtual environment placed in non-standard subfolder', 'Ensure your virtual environment is named .venv, venv, or env in the workspace root directory so the interpreter auto-detects it.'],
            ['Tree-Sitter Grammar Build Error', 'Missing C/C++ compiler on fresh machine during pip install', 'Neuron bundles pre-compiled binary wheels for Tree-Sitter grammars. Re-run pip install with pre-built binaries or install the Visual Studio C++ Build Tools.'],
            ['Blank Canvas on Startup', 'Node cache out of sync with workspace modifications', 'Press F5 or run "> Reindex Workspace" from the Command Palette to clear local layout caches and rebuild the graph.']
          ]
        }
      },
      {
        id: 'log-locations',
        title: '2. Log File Locations and Diagnostic Inspection',
        desc: 'Where to find system logs when diagnosing unexpected issues:',
        paragraphs: [
          'If you encounter an issue, inspection logs are stored in standardized locations on your local machine:',
          'On Windows, backend output logs are saved to %TEMP%/neuron_backend_stdout.log and %TEMP%/neuron_backend_stderr.log. On macOS and Linux, logs reside in /tmp/neuron_backend_stdout.log.',
          'Workspace-specific metadata (such as conversation history, memory conventions, and layout caches) is stored within the .neuron folder inside your active project directory.'
        ]
      },
      {
        id: 'submitting-reports',
        title: '3. Submitting Actionable Bug Reports',
        desc: 'How to provide helpful details when reporting bugs to the development team:',
        paragraphs: [
          'When filing an issue on our GitHub repository (https://github.com/UnityNimit/Neuron/issues), including the following details helps us reproduce and resolve problems quickly:',
          'First, mention your operating system and version. Second, note your graphics hardware and whether WebGPU is active. Third, include any error traces from the browser console (accessible via Ctrl+Shift+I) or your backend stdout log. Please remove any sensitive API keys or private source code snippets before posting.'
        ]
      }
    ]
  }
};
