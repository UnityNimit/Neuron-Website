// src/data/docs/part3_aiStudioAndAgents.js

export const PART3_AI_STUDIO_DOCS = {
  'agent-overview': {
    category: 'AI Studio & Autonomous Agents',
    title: 'AI Studio & Multi-Session Architecture',
    subtitle: 'Comprehensive engineering reference for Neuron’s integrated AI Studio: project-scoped conversation persistence, real-time streaming state machines, cognitive intent routing, and disconnect recovery.',
    sections: [
      {
        id: 'ai-studio-overview',
        title: '1. Architectural Overview of the Neuron AI Studio',
        desc: 'Unlike external browser chat windows or stateless autocomplete plugins, Neuron embeds a full multi-session autonomous engineering studio directly inside the right workspace container (RightPanelContainer.jsx).',
        paragraphs: [
          'The AI Studio consists of three tightly coordinated frontend components—AiChatView.jsx, AiSidebar.jsx, and ModelSelectorDropdown.jsx—driven by the useAiStudio.js state hook and backed by backend/services/ai_service.py over full-duplex WebSockets.',
          'Every conversation thread in Neuron is scoped to the active workspace directory and persisted atomically to disk inside <workspace_root>/.neuron/conversations.json. When you switch repositories via File > Open Project, the AI Studio automatically loads the conversation history, architectural memory (.neuron/memory.md), and custom rules belonging to that specific project.'
        ],
        table: {
          headers: ['AI Studio Component / Module', 'Layer', 'Primary Engineering Responsibility'],
          rows: [
            ['frontend/src/components/ai/AiChatView.jsx', 'Frontend UI', 'Renders GFM markdown responses with copyable code blocks, collapsible reasoning thoughts, live tool step badges, interactive tool approval banners, and side-by-side refactor proposal cards'],
            ['frontend/src/components/ai/AiSidebar.jsx', 'Frontend UI', 'Manages multi-session conversation history: create new threads, switch active conversations, inspect unread indicators, and delete old sessions'],
            ['frontend/src/components/ai/ModelSelectorDropdown.jsx', 'Frontend UI', 'Minimalist header selector switching instantaneously between configured BYOK API key aliases and Local AI (Ollama) with a "+" shortcut to Settings > AI'],
            ['frontend/src/hooks/useAiStudio.js', 'Frontend State', 'Maintains streaming refs (streamingThoughtRef, streamingDeltaRef, streamingStepsRef), handles disconnect recovery, and dispatches AI_* WebSocket events'],
            ['backend/services/ai_service.py', 'Backend Core', 'Executes live provider key discovery, intent classification, workspace context grounding, 10-turn autonomous tool loops, and atomic conversation disk persistence']
          ]
        },
        points: [
          {
            label: 'Atomic PID-Scoped Conversation Persistence',
            text: 'Whenever a user prompt is submitted or an assistant turn finishes, save_conversations() writes the updated JSON array to a process-isolated temporary file (<workspace>/.neuron/conversations.json.tmp.<pid>) before executing an atomic POSIX/NTFS os.replace(). Even if the workstation loses power mid-stream, conversation history is never corrupted.'
          },
          {
            label: 'Automatic Conversation Title Synthesis',
            text: 'When a new conversation ("New Conversation") receives its first user prompt, the backend automatically extracts the first 32 characters of the prompt to title the session and immediately broadcasts AI_CONVERSATIONS_LIST so the sidebar updates in real time.'
          }
        ]
      },
      {
        id: 'streaming-state-machine',
        title: '2. Real-Time Streaming Telemetry & Ref Buffer Architecture',
        desc: 'During an active agent turn, the backend emits five distinct chunk types over the WebSocket connection to provide complete observability into what the agent is thinking and executing:',
        table: {
          headers: ['Chunk Type (chunk.type)', 'WebSocket Event Emitted', 'Frontend State Updated in useAiStudio.js', 'UI Presentation in AiChatView.jsx'],
          rows: [
            ['key_discovered', 'AI_KEY_DISCOVERED', 'Updates localStorage neuron-settings with detectedProvider, detectedModel, and modelCount', 'Updates verified provider badge in Settings and logs selected model in step feed'],
            ['step', 'AI_CHAT_STEP', 'streamingStepsRef.current ([{ step, status: "running" | "done" }])', 'Renders live spinner while running and green checkmark badge once completed'],
            ['thought', 'AI_CHAT_THOUGHT', 'streamingThoughtRef.current (accumulated reasoning trace)', 'Populates the collapsible "Thinking Process" accordion above the message body'],
            ['token', 'AI_CHAT_DELTA', 'streamingDeltaRef.current (incremental markdown text delta)', 'Streams live GFM-formatted markdown text and syntax-highlighted code blocks'],
            ['done', 'AI_CHAT_DONE', 'Commits final assistant message + steps + thoughts + refactor object to conversations[]', 'Finalizes message bubble, clears temporary streaming buffers, and reveals Apply/Reject refactor card if present']
          ]
        },
        points: [
          {
            label: 'Disconnect Recovery Guard',
            text: 'If the WebSocket connection drops mid-generation (isWsConnected === false && isStreaming === true), useAiStudio.js immediately resets all streaming buffers, clears pending approval futures, and dispatches an error notification ("Backend connection was interrupted during AI generation") so the UI never hangs in an infinite loading state.'
          },
          {
            label: 'Instantaneous Subprocess & Task Cancellation (AI_STOP_GENERATION)',
            text: 'Clicking the Stop button during generation dispatches AI_STOP_GENERATION. The backend sets ACTIVE_AI_CANCEL_CTX[conv_id]["is_cancelled"] = True, immediately kills any active child subprocess (running_proc.kill()), cancels any pending approval future, and cancels the asyncio.Task.'
          }
        ]
      },
      {
        id: 'cognitive-intent-firewall',
        title: '3. Stage-0 Cognitive Intent Firewall (classify_prompt_intent)',
        desc: 'Before invoking workspace file scanners or exposing mutating tools to an LLM, Neuron passes every user prompt through a deterministic intent classifier (classify_prompt_intent in backend/services/ai_service.py).',
        paragraphs: [
          'A common failure mode in agentic IDEs occurs when a user types a simple greeting ("hey", "how are you?") or a quick mental math question ("what is 500 / 25?"), and a smaller local LLM hallucinates unnecessary tool calls or tries to overwrite the currently open file. Neuron prevents this via five strict operational intents:'
        ],
        table: {
          headers: ['Operational Intent', 'Trigger Patterns in classify_prompt_intent()', 'Agent Pipeline Routing Behavior'],
          rows: [
            ['CONVERSE', 'Greetings ("hi", "hello", "who are you"), courtesy phrases, pure arithmetic expressions, or <= 4 word non-code queries', 'Routes to Stage-0 Conversational Fast-Path: disables all file/shell tools and streams a direct markdown response with zero workspace overhead'],
            ['INSPECT', 'Read-only analytical keywords ("what", "explain", "how does", "outline", "find", "search", "where", "read")', 'Loads workspace context and engages the autonomous tool loop prioritizing tool_get_file_outline, tool_view_file, and tool_grep_search'],
            ['MUTATE', 'Code modification keywords ("change", "modify", "replace", "refactor", "fix", "update", "rewrite", "patch", "debug")', 'Engages full autonomous loop with tool_replace_file_content, tool_write_to_file, and pre-flight AST syntax verification'],
            ['CREATE_AND_RUN', 'Combined creation ("create", "make", "write", "build") + execution ("run", "play", "launch", "execute", "test")', 'Creates the target file on disk and immediately executes it via tool_run_command with auto-healing verification'],
            ['EXECUTE', 'Pure execution keywords ("run", "launch", "execute", "start", "test") without creation verbs', 'Executes the target script or test runner via tool_run_command and captures stdout/stderr without overwriting source files']
          ]
        },
        points: [
          {
            label: 'Zero-Tool Guarantee on CONVERSE',
            text: 'When intent == "CONVERSE", both the cloud agent loop and infer_operational_tool_calls() are bypassed completely, guaranteeing 0ms context overhead and zero risk of unintended file touches.'
          }
        ]
      }
    ]
  },

  'byok-discovery': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Universal BYOK Auto-Discovery & Model Scoring',
    subtitle: 'How Neuron detects any cloud AI provider from a raw API key, probes live model registries, and ranks the highest-capability coding model with zero hardcoded model names.',
    sections: [
      {
        id: 'byok-philosophy',
        title: '1. Zero-Markup Bring-Your-Own-Key (BYOK) Architecture',
        desc: 'Neuron never acts as a middleman billing proxy, never charges token markups, and never hardcodes brittle model dropdown lists that go obsolete every month.',
        paragraphs: [
          'In Settings > AI & Models, you simply give your key a memorable alias (e.g., "Work Gemini", "Groq Fast", "Claude Prod") and paste the raw API key string. Neuron stores your keys locally inside your workstation settings and connects directly from your machine to the provider’s official HTTPS endpoint.',
          'Crucially, Neuron contains zero hardcoded model names in its discovery engine. Whether a provider releases a brand-new flagship model tomorrow or deprecates an older snapshot next week, Neuron discovers the exact models available to your key in real time.'
        ],
        table: {
          headers: ['Supported Provider', 'Fast Key Prefix Match', 'Protocol Type', 'Live Discovery Endpoint Probed'],
          rows: [
            ['Google AI (Gemini)', 'AIza...', 'google', 'GET https://generativelanguage.googleapis.com/v1beta/models (+ google-genai SDK fallback)'],
            ['Anthropic (Claude)', 'sk-ant-...', 'anthropic', 'GET https://api.anthropic.com/v1/models (with x-api-key & anthropic-version: 2023-06-01)'],
            ['OpenAI', 'sk-... (Parallel Probe)', 'openai_compat', 'GET https://api.openai.com/v1/models'],
            ['Groq', 'gsk_...', 'openai_compat', 'GET https://api.groq.com/openai/v1/models'],
            ['OpenRouter', 'sk-or-...', 'openai_compat', 'GET https://openrouter.ai/api/v1/auth/key & /api/v1/models'],
            ['DeepSeek', 'Parallel Probe', 'openai_compat', 'GET https://api.deepseek.com/models'],
            ['xAI (Grok)', 'xai-...', 'openai_compat', 'GET https://api.x.ai/v1/models'],
            ['Mistral AI', 'Parallel Probe', 'openai_compat', 'GET https://api.mistral.ai/v1/models'],
            ['Cerebras', 'csk-...', 'openai_compat', 'GET https://api.cerebras.ai/v1/models'],
            ['Local Ollama', 'local-ollama (No Key Needed)', 'ollama', 'GET http://127.0.0.1:11434/api/tags']
          ]
        },
        points: [
          {
            label: 'Two-Stage Prefix + Parallel Probe (discover_key_and_models)',
            text: 'If your API key starts with a known prefix (AIza, sk-ant-, gsk_, sk-or-, xai-, csk-), Neuron probes that provider directly in single-digit milliseconds. If the key uses a generic prefix (such as sk-), Neuron launches a concurrent asyncio.gather() probe across all 9 providers simultaneously and locks onto whichever provider authenticates the key.'
          },
          {
            label: '10-Minute SHA-256 Discovery Cache (DISCOVERED_KEY_CACHE)',
            text: 'Once a key’s provider and ranked model list are discovered, Neuron caches the result in RAM keyed by the SHA-256 hash of the API key for 600 seconds. You can force an immediate re-probe at any time via POST /api/ai/discover-key or the AI_DISCOVER_KEY WebSocket event.'
          }
        ]
      },
      {
        id: 'universal-model-scoring-algorithm',
        title: '2. The Universal Zero-Hardcode Model Scoring Algorithm (score_discovered_model)',
        desc: 'When a provider’s /models endpoint returns 40 to 100+ model IDs, how does Neuron automatically pick the best coding model without hardcoding model names?',
        paragraphs: [
          ' first filters out non-text/non-chat modalities (such as embedding, whisper, tts, dall-e, imagen, veo, moderation, audio, vision-only, and robotics models). Every remaining text/code generation model is then evaluated by score_discovered_model(model_id, meta) across five structural signals:'
        ],
        codeBlocks: [
          {
            label: 'Universal Model Scoring Formula (backend/services/ai_service.py)',
            language: 'python',
            code: `# 1. Structural Version Extraction (after stripping YYYY-MM-DD dates & parameter counts)
#    e.g. version 3.7 -> +3700 pts, version 4.6 -> +4600 pts, version 2.5 -> +2500 pts
if valid_versions:
    score += max(valid_versions) * 1000.0

# 2. Parameter Size Signal (e.g. 70b -> +140 pts, up to +300 pts ceiling)
score += min(max_params * 2.0, 300.0)

# 3. Live API Token Capacity Metadata
score += min(out_limit / 500.0, 150.0)
score += min(in_limit / 50000.0, 100.0)

# 4. Release Timestamp Signal (meta.get("created"))
score += min(max((created - 1700000000) / 500000.0, 0.0), 300.0)

# 5. Structural Tier Modifiers
if any(t in m_lower for t in ("flagship", "opus", "pro", "sonnet", "large", "versatile", "coder")):
    score += 220.0
if "flash" in m_lower and "lite" not in m_lower and "8b" not in m_lower:
    score += 240.0
if any(t in m_lower for t in ("lite", "nano", "mini", "haiku", "tiny", "micro", "instant", "small")):
    score -= 180.0
if any(t in m_lower for t in ("exp", "preview", "beta", "test")):
    score -= 60.0`
          }
        ],
        points: [
          {
            label: 'Automatic Multi-Model Failover Loop',
            text: 'During chat streaming (stream_ai_chat), Neuron iterates through the ranked candidate_models list in descending score order. If the #1 ranked model encounters a rate-limit (HTTP 429) or quota restriction on your account, Neuron transparently falls back to the #2 ranked model on your key without dropping your prompt.'
          },
          {
            label: 'Local Ollama Model Ranking (get_available_ollama_models)',
            text: 'When running in Local AI mode, Neuron queries http://127.0.0.1:11434/api/tags, skips embedding models, grants a +500.0 score boost to models with "coder" or "code" in their name or family, adds up to +400.0 based on parameter count (e.g. 14b, 32b), and adds up to +100.0 based on disk weight size.'
          }
        ]
      }
    ]
  },

  'autonomous-tools': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Autonomous Agent Tool Suite & Runtime',
    subtitle: 'Complete technical reference for the 9 built-in autonomous workspace tools in TOOL_DISPATCH, pre-flight AST syntax gates, fuzzy block replacement, and auto-healing execution.',
    sections: [
      {
        id: 'nine-agent-tools-matrix',
        title: '1. The Nine Native Autonomous Tools (TOOL_DISPATCH)',
        desc: 'Neuron equips autonomous agents with nine direct workspace tools implemented in backend/services/ai_service.py:',
        table: {
          headers: ['Tool Name', 'Arguments', 'Mutating?', 'Execution Behavior & Safety Guarantees'],
          rows: [
            ['tool_get_file_outline', 'file_path: str', 'No (Read-Only)', 'Parses Python AST (classes, methods, async defs, args, docstrings, line spans) or regex declarations for JS/TS/C/C++/Java/Rust/Go in ~50-100 tokens'],
            ['tool_view_file', 'file_path: str, start_line: int = 1, end_line: int = 120', 'No (Read-Only)', 'Reads a 1-indexed slice of lines prefixed with L<num>: so the agent inspects targeted code without overflowing context windows'],
            ['tool_grep_search', 'query: str, search_path: str = ""', 'No (Read-Only)', 'Runs case-insensitive regex search across workspace source files (skipping binaries and ignored dirs), returning up to 30 file:line:snippet matches'],
            ['tool_find_by_name', 'pattern: str', 'No (Read-Only)', 'Matches filenames against glob patterns (e.g., *.py, *router*) across the workspace hierarchy, returning up to 40 relative paths'],
            ['tool_get_blast_radius', 'symbol_or_file: str', 'No (Read-Only)', 'Scans workspace references and callers to determine which downstream modules are impacted before modifying a shared symbol'],
            ['tool_write_to_file', 'file_path: str, code_content: str, overwrite: bool = True', 'Yes (Mutating)', 'Enforces workspace path sandbox, runs Pre-Flight Python AST syntax validation, snapshots original file into FILE_SNAPSHOTS, and writes UTF-8 content'],
            ['tool_replace_file_content', 'file_path: str, target_content: str, replacement_content: str', 'Yes (Mutating)', 'Performs 3-tier block matching (Exact -> CRLF/LF Normalized -> Stripped Line Fuzzy Match), validates AST syntax, writes file, and returns a 40-line unified diff'],
            ['tool_run_command', 'command: str, cwd: str = "", timeout_seconds: int = 60', 'Yes (Mutating)', 'Auto-substitutes project .venv/venv Python/pip/pytest binaries, detects GUI/daemon apps via 2.5s health probe, and captures exit code + stdout/stderr'],
            ['tool_update_memory', 'rule_name: str, instruction: str', 'Yes (Metadata)', 'Appends a timestamped architectural convention or user preference to <workspace>/.neuron/memory.md for all future AI sessions']
          ]
        },
        points: [
          {
            label: 'Balanced-Brace JSON Tool Call Extractor (parse_tool_calls_from_text)',
            text: 'In addition to native SDK function calling (Google GenAI), Neuron includes a balanced-brace JSON parser that extracts tool calls from fenced ```json blocks or inline JSON objects emitted by OpenAI-compatible, Anthropic, and local Ollama models—automatically unwrapping nested argument schemas.'
          }
        ]
      },
      {
        id: 'preflight-ast-syntax-gate',
        title: '2. Pre-Flight In-RAM AST Syntax Gate & 3-Tier Surgical Replacement',
        desc: 'How Neuron prevents an AI agent from ever writing broken syntax or failing on Windows CRLF line endings:',
        paragraphs: [
          'Before tool_write_to_file or tool_replace_file_content touches the disk on a Python (.py) file, Neuron parses the proposed code string in memory using Python’s native ast.parse(). If the agent generated a syntax error (e.g., an unclosed parenthesis or indentation error), the write is aborted before touching disk, and the exact line number and offending text are returned to the agent so it self-corrects on the next turn.'
        ],
        codeBlocks: [
          {
            label: 'Pre-Flight In-RAM AST Syntax Gate (backend/services/ai_service.py)',
            language: 'python',
            code: `if clean_path.endswith(".py") and effective_content.strip():
    try:
        ast.parse(effective_content)
    except SyntaxError as syn_err:
        return (
            f"[Pre-Flight AST Syntax Gate Error in '{clean_path}']:\\n"
            f"SyntaxError at line {syn_err.lineno}: {syn_err.msg}\\n"
            f"Offending line: {syn_err.text or ''}\\n"
            f"Please correct this syntax error before committing to disk."
        )`
          }
        ],
        points: [
          {
            label: 'Tier 1: Exact Substring Match',
            text: 'tool_replace_file_content first checks if target_content exists verbatim in the original file.'
          },
          {
            label: 'Tier 2: CRLF / LF Line-Ending Normalization',
            text: 'If the file on Windows uses \\r\\n but the LLM emitted \\n, Tier 2 normalizes both buffers to \\n and performs the replacement cleanly.'
          },
          {
            label: 'Tier 3: Stripped Line-by-Line Fuzzy Matching',
            text: 'If indentation whitespace slightly differed in the model output, Tier 3 compares stripped non-empty line sequences across a sliding window and splices replacement_content into the exact line span.'
          }
        ]
      },
      {
        id: 'virtualenv-and-daemon-runner',
        title: '3. Virtualenv Auto-Substitution & GUI/Daemon Health Probing (tool_run_command)',
        desc: 'When an autonomous agent executes shell commands via tool_run_command, Neuron upgrades the command automatically:',
        points: [
          {
            label: 'Automatic Virtual Environment Substitution (discover_project_python)',
            text: 'Neuron checks for .venv/Scripts/python.exe, venv/Scripts/python.exe, and Unix bin/python inside the workspace. Any agent command starting with python, python3, pip, pip3, or pytest is automatically rewritten to invoke the project’s isolated virtualenv interpreter.'
          },
          {
            label: 'Non-Blocking GUI & Server Daemon Detection',
            text: 'If the agent runs a continuous GUI application or web server (matching tkinter, turtle, pygame, npm start, npm run, uvicorn, flask, http.server, or game), tool_run_command waits 2.5 seconds to catch any immediate startup SyntaxError/ImportError tracebacks. If the process is still alive (proc.poll() is None), it returns immediately with "[Exit Code: 0 (Active Daemon)]" and the PID so the agent turn finishes cleanly while your app stays open!'
          }
        ]
      }
    ]
  },

  'prompting': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Contextual Prompting & Workspace Grounding',
    subtitle: 'How Neuron grounds every AI prompt with live project topology, active editor buffers, persistent .neuronrules / memory.md conventions, and Graph-RAG AST node summaries.',
    sections: [
      {
        id: 'automatic-workspace-context',
        title: '1. Automatic Workspace Context Collector (get_workspace_context)',
        desc: 'You never need to manually copy-paste your folder structure or currently open file into the chat box. On every non-conversational turn, get_workspace_context() compiles a grounded telemetry header:',
        codeBlocks: [
          {
            label: 'Synthesized Workspace Context Header Injected into Agent Prompts',
            language: 'text',
            code: `[WORKSPACE CONTEXT]
Working Directory: C:/Users/you/NeuronProjects/my-app
Project Name: my-app
Workspace Files (42 total):
- backend/main.py
- backend/core/parser.py
- frontend/src/App.jsx
...

Active Open File: backend/core/parser.py
Active File Content:
\`\`\`
<Up to 6,000 characters of live in-memory editor buffer>
\`\`\``
          }
        ],
        points: [
          {
            label: 'Ignored Directory Filtering',
            text: 'get_workspace_context() automatically excludes .git, node_modules, target, dist, build, __pycache__, .venv, venv, .idea, .vscode, and binaries, listing up to 120 clean source files.'
          },
          {
            label: 'Live Unsaved Buffer Awareness',
            text: 'Because useAiStudio passes the live Monaco fileContent buffer along with activeFile, the agent sees your latest in-memory edits even before you press Ctrl+S.'
          }
        ]
      },
      {
        id: 'persistent-project-rules',
        title: '2. Persistent Project Rules & Architectural Memory (read_project_rules)',
        desc: 'Neuron automatically loads project-level engineering rules and cross-session agent memory from four standard rule files at the root of your workspace:',
        table: {
          headers: ['Rule File Path', 'Loaded Capacity', 'Primary Use Case'],
          rows: [
            ['.neuronrules', 'Up to 4,000 chars', 'Dedicated Neuron project architecture, framework, and code style directives'],
            ['.neuron/memory.md', 'Up to 4,000 chars', 'Dynamic memory file written autonomously by the agent via tool_update_memory() when you teach it a rule'],
            ['CLAUDE.md', 'Up to 4,000 chars', 'Seamless compatibility with repositories already configured for Claude Code'],
            ['.cursorrules', 'Up to 4,000 chars', 'Seamless compatibility with repositories already configured with Cursor rules']
          ]
        },
        points: [
          {
            label: 'Teaching Neuron Permanent Conventions',
            text: 'Tell the AI Studio: "Remember to always use Pydantic v2 BaseModel and async FastAPI endpoints in this project." The agent will invoke tool_update_memory(), writing a timestamped entry to .neuron/memory.md that persists across all future conversations and model switches.'
          }
        ]
      },
      {
        id: 'graph-rag-node-summaries',
        title: '3. Graph-RAG AST Node Summarization Pipeline (fetch_ast_summary)',
        desc: 'When you inspect a node on the 2D Spatial Canvas, Neuron dispatches REQUEST_LLM_SUMMARY to generate a dense, two-sentence architectural summary grounded in the node’s actual call/import graph neighborhood:',
        paragraphs: [
          'In backend/api/websocket_router.py, Neuron looks up the target node in the workspace graph and collects the source code snippets of up to 3 directly connected peer nodes across call, network_bridge, and import edges (connected_snippets).',
          'build_graph_rag_prompt() constructs a strict Principal Software Architect prompt instructing the local Ollama model (temperature = 0.15, num_predict = 140) to explain data transformations, side effects, protocol contracts, and state mutations in exactly two complete sentences without repeating the obvious function name.'
        ],
        points: [
          {
            label: 'Sentence Completion Guard (ensure_complete_sentences)',
            text: 'Guarantees summaries never end on a truncated token fragment by pruning trailing unclosed clauses or normalizing terminal punctuation.'
          },
          {
            label: 'Deterministic Offline Heuristic Fallback (generate_heuristic_summary)',
            text: 'If local Ollama is not running, Neuron instantly analyzes the AST code block for React lifecycle hooks (useState, useEffect, useMemo), WebSocket/HTTP I/O, LibCST/Tree-Sitter traversals, NetworkX/IsolationForest pipelines, and cyclomatic risk levels to synthesize an instant 0ms architectural summary.'
          }
        ]
      }
    ]
  },

  'debugging': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Autonomous Debug Mode & Self-Healing Loop',
    subtitle: 'How Neuron’s 10-turn autonomous agent loop diagnoses tracebacks, inspects blast radius conduits, applies surgical patches, and self-corrects failing tests automatically.',
    sections: [
      {
        id: 'self-correction-mandate',
        title: '1. The 10-Turn Self-Correction & Auto-Healing Loop',
        desc: 'When you ask Neuron AI to fix a bug or build and test a feature, the agent does not stop after emitting a single guess.',
        paragraphs: [
          'Inside stream_ai_chat(), the autonomous loop runs for up to max_turns = 10 sequential tool-execution cycles per prompt. Directive #9 of the Neuron AI system instruction enforces a strict Self-Correction Mandate: whenever tool_run_command returns a non-zero exit code (Exit Code: 1 or Exit Code: 2) or a Python/Node/Compiler traceback, or when the Pre-Flight AST Syntax Gate flags a SyntaxError, the agent automatically marks the step as "(Self-correcting...)", feeds the exact stderr traceback back into the model context, patches the offending lines, and re-runs the command until it exits with code 0.'
        ],
        codeBlocks: [
          {
            label: 'Example Multi-Step Autonomous Debugging Trace in AiChatView',
            language: 'text',
            code: `✓ Analyzed workspace (18 files, project: payment-service)
✓ Searching for 'calculate_invoice_tax'
✓ Outline of backend/billing/tax.py
✓ Reading backend/billing/tax.py
✓ Running: pytest tests/test_billing.py (Self-correcting...)
✓ Modifying backend/billing/tax.py
✓ Running: pytest tests/test_billing.py
✓ Completed`
          }
        ],
        points: [
          {
            label: 'Autonomous Operational Fallback (infer_operational_tool_calls)',
            text: 'When using smaller local Ollama models that occasionally output markdown code blocks instead of native JSON tool calls, infer_operational_tool_calls() automatically detects if the previous turn failed (prev_failed=True), extracts the corrected code block, writes it via tool_write_to_file, and re-executes python/node to verify the fix.'
          },
          {
            label: 'Collapsible Reasoning Trace ("Thinking Process")',
            text: 'For reasoning-capable models (such as DeepSeek-R1, Claude Extended Thinking, or Gemini Thinking), Neuron streams internal reasoning tokens via AI_CHAT_THOUGHT into a collapsible accordion so you can audit the exact root-cause deduction without cluttering the final answer.'
          }
        ]
      }
    ]
  },

  'planning': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Strategic Planning & Refactor Proposal Engine',
    subtitle: 'How Neuron extracts targeted code refactoring proposals from assistant responses, prevents accidental CLI/conversational overwrites, and applies changes atomically.',
    sections: [
      {
        id: 'refactor-proposal-extraction',
        title: '1. Intelligent Refactor Proposal Extraction (extract_refactor_proposal)',
        desc: 'When a model proposes a code change in markdown without directly invoking tool_write_to_file, Neuron evaluates the response using extract_refactor_proposal() to decide whether to present an interactive Refactor Proposal Card in AiChatView.jsx.',
        paragraphs: [
          'In naive AI plugins, any fenced code block (such as a pip install command or a 2-line example in a tutorial) is mistakenly treated as a full-file replacement, risking overwriting your open source file with a shell command. Neuron eliminates this hazard via four strict mathematical and lexical guards:'
        ],
        table: {
          headers: ['Safety Guard in extract_refactor_proposal()', 'Trigger Condition', 'Protective Behavior'],
          rows: [
            ['Guard 0 — Autonomous Tool Deduplication', 'tools_executed == True', 'If the agent already wrote or modified files directly via autonomous tools during the turn, suppresses redundant proposal cards'],
            ['Guard 1 — Conversational & Operational Intent Filter', 'Prompt starts with question words ("what is", "explain", "how does") or operational verbs ("run", "execute", "test", "install") without mutation verbs', 'Returns None immediately so asking "how do I run this?" never offers to overwrite your code'],
            ['Guard 2 — Shell & Terminal Language Block Filter', 'Code fence language is bash, sh, shell, zsh, cmd, powershell, terminal, console, or bat', 'Never treats terminal or shell script blocks as source file refactors'],
            ['Guard 3 — CLI Command Prefix Filter', 'First non-empty line starts with python, pip, npm, npx, node, git, cargo, docker, pytest, curl, uvicorn, etc.', 'Blocks single-line or multi-line CLI commands from being misclassified as source code'],
            ['Guard 4 — Explicit Filepath Resolution', 'Checks ```lang:filepath, # filepath: comments, prose hints ("saved in game.py"), and finally active_file', 'Ensures new scripts (e.g., snake.py) are routed to their intended filename rather than blindly overwriting the currently open file']
          ]
        },
        points: [
          {
            label: 'Interactive Apply & Dismiss Workflow in AiChatView.jsx',
            text: 'When a valid refactor proposal is returned ({ filePath, language, proposedCode, originalCode, summary }), AiChatView renders a dedicated Refactor Proposal banner showing the target file path and two actions: "Apply Changes" (which dispatches AI_APPLY_REFACTOR) and "Dismiss".'
          },
          {
            label: 'Atomic Disk Commit (apply_refactor_code)',
            text: 'Clicking Apply Changes verifies that full_path remains strictly inside the workspace root, writes the proposed code to a temporary .tmp.<pid> file, atomically replaces the target file via os.replace(), broadcasts a hot workspace graph update, and triggers background vector re-indexing.'
          }
        ]
      }
    ]
  },

  'security': {
    category: 'AI Studio & Autonomous Agents',
    title: 'Approval Gates, Sandbox Security & Rollback Vault',
    subtitle: 'Human-in-the-loop tool execution gates, directory traversal sandboxing, and 1-click session snapshot recovery.',
    sections: [
      {
        id: 'human-in-the-loop-approval',
        title: '1. Interactive Tool Approval Gate (AI_APPROVAL_REQUIRED)',
        desc: 'Neuron gives you complete control over whether autonomous agents can execute mutating actions automatically or must ask for explicit permission first.',
        paragraphs: [
          'In Settings > AI & Models, the requireRefactorApproval setting controls the approval_mode ("manual" vs "auto") sent with every AI_CHAT_STREAM request. Read-only tools (tool_get_file_outline, tool_view_file, tool_grep_search, tool_find_by_name, tool_get_blast_radius) always execute without interruption. However, when approval_mode == "manual" and the agent attempts to invoke a mutating tool (tool_run_command, tool_write_to_file, or tool_replace_file_content), the backend pauses execution on an asynchronous Future:'
        ],
        codeBlocks: [
          {
            label: 'Asynchronous Approval Gate Pause & Resume (backend/api/websocket_router.py)',
            language: 'python',
            code: `async def approval_handler(c_id: str, tool_name: str, tool_args: dict, step_desc: str) -> Tuple[bool, str]:
    action_id = f"act_{uuid.uuid4().hex[:8]}"
    loop = asyncio.get_running_loop()
    fut = loop.create_future()
    ACTIVE_AI_APPROVALS[c_id] = fut

    await safe_send_to_active(websocket, {
        "event": "AI_APPROVAL_REQUIRED",
        "conversation_id": c_id,
        "action_id": action_id,
        "tool": tool_name,
        "args": tool_args,
        "description": step_desc
    })

    approved, feedback = await fut
    return approved, feedback`
          }
        ],
        points: [
          {
            label: 'Approve or Reject with Feedback',
            text: 'When AI_APPROVAL_REQUIRED arrives, AiChatView displays an interactive approval card showing the exact command or file path the agent wants to touch. Clicking Approve resolves the Future with (True, "") and resumes the agent immediately; clicking Reject resolves with (False, feedback) so the agent adapts its plan without executing the blocked action.'
          }
        ]
      },
      {
        id: 'session-rollback-vault',
        title: '2. Workspace Path Sandbox & 1-Click Session Rollback (FILE_SNAPSHOTS)',
        desc: 'Every file write performed by the AI Studio is both path-sandboxed and backed by an in-memory rollback vault:',
        points: [
          {
            label: 'Strict Workspace Path Boundary Check',
            text: 'Both tool_write_to_file and apply_refactor_code resolve os.path.abspath(os.path.join(base, clean_path)) and assert full_path.startswith(os.path.abspath(base)). Any attempt to write to ../ or an external system directory is immediately blocked.'
          },
          {
            label: 'Pre-Mutation Snapshot Capture (FILE_SNAPSHOTS)',
            text: 'Before overwriting or replacing content in any existing file, Neuron caches the original UTF-8 file content in FILE_SNAPSHOTS[clean_path].'
          },
          {
            label: '1-Click Session Rollback (AI_ROLLBACK_CHANGES)',
            text: 'Clicking the Rollback button in the AI Studio header dispatches AI_ROLLBACK_CHANGES, invoking rollback_all_snapshots() to restore every modified file back to its pre-session state, re-syncing the 2D spatial graph, and displaying a confirmation notification.'
          }
        ]
      }
    ]
  }
};
