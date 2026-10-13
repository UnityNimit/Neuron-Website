// src/data/docs/part5_editorTerminalGit.js
// Category 5: Editor, Terminal & Git Technical Guides

export const PART5_EDITOR_TERMINAL_GIT_DOCS = {
  'monaco-editor': {
    category: 'Editor, Terminal & Git',
    title: 'Monaco Code Editor, Find and Replace, and Media Viewers',
    subtitle: 'High-performance in-browser editing powered by the Monaco Editor, customized syntax themes, regex search widgets, and dedicated media viewers.',
    sections: [
      {
        id: 'monaco-integration',
        title: '1. Monaco Editor Integration and Theme Synchronization',
        desc: 'Neuron embeds the Monaco Editor directly within the center workspace container, synchronizing editor configuration with your active spatial theme.',
        paragraphs: [
          'When you click any file planet or function moon on the spatial canvas, Neuron opens the corresponding source file in MonacoEditorComponent.jsx. Rather than relying on generic editor themes, Neuron registers five custom Monaco syntax themes (neuron-obsidian, neuron-white, neuron-pink, and others) that match your active workspace color scheme token-for-token.',
          'The editor mounts with font ligatures enabled by default using JetBrains Mono and Inter. Editor options configure a minimap with custom rendering parameters, smooth cursor animations, bracket pair colorization, and automatic layout resizing when side panels collapse or expand.'
        ],
        codeBlocks: [
          {
            label: 'Custom Monaco Theme Registration in frontend/src/components/editor/MonacoEditorComponent.jsx',
            language: 'javascript',
            code: `// Registers matching Monaco syntax theme tokens dynamically
monaco.editor.defineTheme('neuron-theme', {
  base: activeTheme.isDark ? 'vs-dark' : 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
    { token: 'keyword', foreground: activeTheme.accent.replace('#', '') },
    { token: 'string', foreground: '22c55e' },
    { token: 'number', foreground: 'f59e0b' },
    { token: 'type', foreground: 'a855f7' }
  ],
  colors: {
    'editor.background': activeTheme.surface,
    'editor.foreground': activeTheme.textPrimary,
    'editorCursor.foreground': activeTheme.accent,
    'editor.lineHighlightBackground': activeTheme.surfaceHover,
    'editorLineNumber.foreground': activeTheme.textMuted,
    'editorLineNumber.activeForeground': activeTheme.textPrimary
  }
});`
          }
        ],
        points: [
          {
            label: 'Multi-Tab State Preservation',
            text: 'Open editor tabs track their view state, cursor position, and unsaved dirty buffers in memory. Switching between tabs preserves exact scroll positions without re-rendering the DOM tree.'
          },
          {
            label: 'External Modification Detection',
            text: 'When a background process or git command modifies an open file on disk, Neuron compares modification times and prompts you with options to reload the file or preserve local unsaved edits.'
          }
        ]
      },
      {
        id: 'find-replace-widget',
        title: '2. Search and Replace Widget (FindReplaceWidget.jsx)',
        desc: 'A dedicated floating search interface supporting case sensitivity, whole words, and regular expression evaluation across open buffers.',
        paragraphs: [
          'Pressing Ctrl+F or Ctrl+H in the editor triggers FindReplaceWidget.jsx. The widget hovers at the top right of the editor without obscuring active line numbers.',
          'The widget supports standard text matching as well as regular expression capture groups. When you execute a replace all command, matches are updated through a single undo transaction in Monaco, allowing you to revert bulk changes with a single Ctrl+Z keystroke.'
        ],
        table: {
          headers: ['Shortcut / Control', 'Mode', 'Behavior and Description'],
          rows: [
            ['Match Case (Alt+C)', 'Case Sensitivity', 'Toggles exact case matching against the search query string.'],
            ['Match Whole Word (Alt+W)', 'Word Boundaries', 'Matches search tokens strictly surrounded by whitespace, punctuation, or line boundaries.'],
            ['Use Regular Expression (Alt+R)', 'Regex Engine', 'Enables full JavaScript regular expressions with capture groups and character classes.'],
            ['Replace All (Ctrl+Alt+Enter)', 'Atomic Replacement', 'Applies text substitutions across all buffer matches inside a single Monaco undo stop.']
          ]
        }
      },
      {
        id: 'media-and-binary-viewers',
        title: '3. Specialized Image Inspection and Binary Safeguards',
        desc: 'Native rendering for raster and vector graphics, with defensive fallbacks for non-text binary assets.',
        paragraphs: [
          'Opening an image file (.png, .jpg, .jpeg, .svg, .webp, .gif, .ico, .avif) routes the tab to ImageViewer.jsx rather than opening binary bytes in a text buffer. The image viewer includes smooth zoom controls (from 10% up to 800%), pixel dimension readouts, and a dark checkerboard background for inspecting transparent PNGs and SVGs.',
          'If you open an unformatted binary file (.exe, .dll, .so, .bin, .pyc), UnsupportedFileViewer.jsx displays the file size, path, and MIME metadata while preventing memory exhaustion from attempting to parse megabytes of raw bytecode in Monaco.'
        ]
      }
    ]
  },

  'polyglot-runner': {
    category: 'Editor, Terminal & Git',
    title: 'Universal Polyglot Code Runner across 12 Languages',
    subtitle: 'Direct execution of source scripts across Python, JavaScript, TypeScript, C, C++, Java, Rust, Go, PowerShell, Bash, and Batch without manual build configurations.',
    sections: [
      {
        id: 'runner-architecture',
        title: '1. Subfolder-Aware Compilation and Execution Pipeline',
        desc: 'How backend/services/terminal_service.py manages dependencies, working directories, and compilation flags across different language toolchains.',
        paragraphs: [
          'When you click the Run Code button or press Ctrl+Shift+B, Neuron inspects the active file extension and dispatches run_code_polyglot_sync(). The runner automatically sets the current working directory to the subfolder containing the file, allowing scripts with relative file reads (such as open("data.json")) to execute without path errors.',
          'If the language requires compilation (such as C, C++, Java, Rust, or Go), the runner compiles the code to a temporary binary in the operating system temp folder, streams compilation errors back to the output panel if errors occur, and runs the resulting executable.'
        ],
        table: {
          headers: ['Language', 'Toolchain Checked', 'Compiler Command / Execution Strategy'],
          rows: [
            ['Python (.py)', 'python / py / python3', 'python -u <script> with workspace root and script folder injected into PYTHONPATH'],
            ['JavaScript (.js)', 'node', 'node <script> with automatic .mjs wrapper if ES module import syntax is detected'],
            ['TypeScript (.ts, .tsx)', 'ts-node / bun / deno', 'ts-node --transpile-only <script> or automatic Node.js fallback via bun'],
            ['C (.c)', 'gcc / clang / cl', 'gcc -O2 -I<script_dir> <script> -o <temp_binary> && <temp_binary>'],
            ['C++ (.cpp, .cc)', 'g++ / clang++ / cl', 'g++ -std=c++17 -O2 -I<script_dir> <script> -o <temp_binary> && <temp_binary>'],
            ['Java (.java)', 'javac & java', 'javac -d <temp_dir> <script> && java -cp <temp_dir> <ClassName>'],
            ['Rust (.rs)', 'rustc', 'rustc --edition 2021 <script> -o <temp_binary> && <temp_binary>'],
            ['Go (.go)', 'go', 'go run <script> executed directly within the script directory'],
            ['PowerShell (.ps1)', 'powershell / pwsh', 'powershell -NoProfile -ExecutionPolicy Bypass -File <script>'],
            ['Bash (.sh)', 'bash', 'bash <script> run via WSL or Git Bash on Windows, native bash on Unix']
          ]
        }
      },
      {
        id: 'python-and-esm-handling',
        title: '2. Python Virtual Environment and Node.js ES Module Automation',
        desc: 'Automatic interpreter discovery and wrapper generation to eliminate common local runtime errors.',
        paragraphs: [
          'When running Python files, Neuron checks for a virtual environment (.venv, venv, or env) in the workspace root. If found, it prioritizes the virtual environment Python interpreter and pip dependencies over the global system Python installation.',
          'For JavaScript files, developers often encounter errors when using import syntax in standard .js files without a package.json declaring type: module. Neuron scans the first 20 lines of code; if import or export statements are present, it wraps the code into a temporary .mjs file before running node, enabling modern module syntax to execute cleanly.'
        ]
      },
      {
        id: 'stdin-piping',
        title: '3. Standard Input Piping and Output Streaming',
        desc: 'Sending custom interactive inputs to scripts and streaming standard output chunks in real time.',
        paragraphs: [
          'If your script prompts for user input (such as input() in Python or scanf in C), you can enter text into the dedicated Custom Input box in the runner panel before launching. The runner pipes this text directly into the process standard input buffer.',
          'Standard output and standard error are decoded incrementally using UTF-8 streaming, ensuring that progressive output (such as training iteration counters or loading logs) appears in the output console immediately without waiting for the process to exit.'
        ]
      }
    ]
  },

  'interactive-terminal': {
    category: 'Editor, Terminal & Git',
    title: 'Multi-Tab Interactive Streaming Terminal',
    subtitle: 'High-performance pseudo-terminal emulation supporting PowerShell, CMD, Git Bash, and Unix shells with non-blocking stream processing and process cleanup.',
    sections: [
      {
        id: 'terminal-streaming',
        title: '1. Non-Blocking Output Streaming and Encoding',
        desc: 'How backend/services/terminal_service.py manages asynchronous terminal sessions without blocking the web application.',
        paragraphs: [
          'The interactive terminal panel (TerminalPanel.jsx) communicates with the backend via WebSocket channels. When a terminal tab opens, the backend spawns your default system shell (PowerShell on Windows, bash or zsh on macOS and Linux) and attaches an asynchronous output reader.',
          'The background reader reads chunks from the shell process output pipe using non-blocking I/O. Chunks are passed through an incremental UTF-8 decoder that preserves multibyte characters across chunk boundaries, then transmitted to the frontend where ANSI color escape sequences are parsed and styled.'
        ],
        codeBlocks: [
          {
            label: 'Incremental Chunk Reading in backend/services/terminal_service.py',
            language: 'python',
            code: `def _read_output_stream(process, session_id, websocket_callback):
    """
    Reads unbuffered stdout/stderr chunks and streams them via WebSockets.
    """
    decoder = codecs.getincrementaldecoder('utf-8')(errors='replace')
    while True:
        chunk = process.stdout.read(4096)
        if not chunk:
            break
        text = decoder.decode(chunk, final=False)
        if text:
            websocket_callback({
                "type": "TERMINAL_OUTPUT",
                "session_id": session_id,
                "data": text
            })`
          }
        ]
      },
      {
        id: 'cwd-tracking',
        title: '2. Dynamic Working Directory Tracking',
        desc: 'Keeping tab prompts and relative path operations synchronized when you change directories.',
        paragraphs: [
          'When you run commands like cd subfolder in the terminal, the active directory of the shell session changes. Neuron tracks these directory changes so that new file operations, git commands, and runner scripts stay aware of your current context.',
          'On Windows, Neuron probes the process directory handle using standard operating system queries. On Linux and macOS, it inspects the process file descriptor table under /proc to keep tab headers updated with your current folder path.'
        ]
      },
      {
        id: 'process-termination',
        title: '3. Clean Process Tree Termination',
        desc: 'Guaranteed cleanup of long-running background tasks, child compilers, and dev servers.',
        paragraphs: [
          'When you close a terminal tab or click the stop button, simply killing the top-level shell process can leave child processes (such as Node dev servers or Python scripts) orphaned in the background.',
          'Neuron implements recursive process tree termination. On Windows, it invokes taskkill /F /T /PID to shut down the parent and all spawned child processes. On Unix, it uses os.killpg() with SIGKILL to terminate the entire process group cleanly.'
        ]
      }
    ]
  },

  'source-control': {
    category: 'Editor, Terminal & Git',
    title: 'Git Version Control and Interactive Commit Graph',
    subtitle: 'Integrated workspace staging, commit authoring, branch navigation, and visual topological commit graph rendering.',
    sections: [
      {
        id: 'git-operations',
        title: '1. Workspace Staging, Commits, and Branch Navigation',
        desc: 'Managing your Git lifecycle directly from the SourceControlPanel.jsx side panel.',
        paragraphs: [
          'Neuron connects to your local Git installation using standard command line calls executed in your workspace directory. When files change, the source control panel groups modifications into Staged Changes and Untracked or Modified Changes.',
          'You can stage individual files, stage all changes, discard modifications to revert to the last commit, write structured commit messages, amend previous commits, and push or pull from your configured remote branches.'
        ],
        table: {
          headers: ['Action', 'WebSocket Event Dispatched', 'Underlying Git Command Executed'],
          rows: [
            ['Stage File', 'GIT_STAGE_FILE', 'git add -- <relative_path>'],
            ['Unstage File', 'GIT_UNSTAGE_FILE', 'git restore --staged -- <relative_path>'],
            ['Discard Changes', 'GIT_DISCARD_FILE', 'git restore -- <relative_path> or git clean -f'],
            ['Commit Staged', 'GIT_COMMIT', 'git commit -m "<message>"'],
            ['Push to Remote', 'GIT_PUSH', 'git push origin <current_branch>'],
            ['Pull from Remote', 'GIT_PULL', 'git pull --ff-only origin <current_branch>']
          ]
        }
      },
      {
        id: 'commit-graph-visualization',
        title: '2. Topological Commit Log Graph',
        desc: 'An interactive visual representation of recent branch history, parent hashes, and merges.',
        paragraphs: [
          'The Source Control panel features a Commit Graph view that parses the output of git log with parent hash indicators. Commits are rendered as a vertical timeline showing branch lines, merge junctions, author names, relative timestamps, and commit hashes.',
          'Clicking any commit in the graph displays the list of files modified in that revision, allowing you to review historical changes without opening an external terminal or third-party git client.'
        ]
      },
      {
        id: 'visual-diff-engine',
        title: '3. Side-by-Side and Inline File Diffing',
        desc: 'Comparing working tree modifications against the Git index or HEAD revisions.',
        paragraphs: [
          'Clicking a modified file in the source control list opens the Monaco Diff Editor. Added lines are highlighted in green, removed lines in red, and modified line spans show detailed inline character differences.',
          'You can toggle between side-by-side view (two comparison panes) and inline view (unified diff) to match your preferred code review layout.'
        ]
      }
    ]
  },

  'command-palette': {
    category: 'Editor, Terminal & Git',
    title: 'Unified Command Palette (Ctrl+K and Ctrl+P)',
    subtitle: 'Keyboard-driven search across workspace files, AST symbols, editor commands, and semantic vector memory.',
    sections: [
      {
        id: 'omni-search-routing',
        title: '1. Omni-Search Architecture and Intent Routing',
        desc: 'How the CommandPalette.jsx overlay searches across multiple data sources in milliseconds.',
        paragraphs: [
          'Pressing Ctrl+K or Ctrl+P opens the unified Command Palette overlay. As you type, Neuron queries three distinct in-memory indexes in parallel:',
          'First, it performs fuzzy filename matching across all workspace paths. Second, it searches declared AST classes and functions indexed by the Tree-Sitter daemon. Third, if the query looks like a natural language question, it scores relevant snippets using the in-memory vector search engine.'
        ],
        table: {
          headers: ['Prefix / Shortcut', 'Search Mode', 'Example Query and Description'],
          rows: [
            ['None (Default)', 'Universal Match', 'Type "auth" to match auth.py, authenticateUser(), and auth settings.'],
            ['> (Greater Than)', 'IDE Commands', 'Type "> theme" to toggle between light and dark themes or open settings.'],
            ['# (Hash)', 'AST Symbols', 'Type "# calculate" to jump directly to any function or class declaration.'],
            ['? (Question)', 'Help and Documentation', 'Type "? louvain" to jump directly to relevant documentation topics.']
          ]
        }
      },
      {
        id: 'keyboard-navigation',
        title: '2. Keyboard Navigation and Instant Execution',
        desc: 'Ergonomic keyboard controls for rapid workspace traversal.',
        paragraphs: [
          'The palette is built for keyboard-first navigation. Use the Up and Down arrow keys to traverse results, Escape to dismiss the palette, and Enter to select an action or open a file.',
          'Selecting a file or function opens Monaco directly at the exact declaration line, centers the editor viewport, and briefly flashes the targeted line number to orient your focus.'
        ]
      }
    ]
  }
};
