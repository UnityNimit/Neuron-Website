// src/data/docs/part4_astAndRefactoring.js

export const PART4_AST_AND_REFACTORING_DOCS = {
  'daemon-setup': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Multi-Language Tree-Sitter AST Engine',
    subtitle: 'Deep architectural specification of backend/core/parser.py: persistent 7-language Tree-Sitter grammars, iterative cyclomatic complexity calculation, cross-language import resolution, and incremental mtime caching.',
    sections: [
      {
        id: 'persistent-grammar-loaders',
        title: '1. Persistent Multi-Language Grammar Architecture (GLOBAL_PARSERS)',
        desc: 'Unlike regex-based code indexers or slow external language servers (LSPs) that take 10-30 seconds to warm up, Neuron embeds compiled C Tree-Sitter grammars directly inside the Python backend process.',
        paragraphs: [
          'At module import time, backend/core/parser.py initializes seven persistent tree_sitter.Parser instances in GLOBAL_PARSERS. Because these C-backed parsers are instantiated once and reused across all workspace scans, Neuron eliminates per-file parser allocation overhead completely.'
        ],
        table: {
          headers: ['Parser Key', 'Tree-Sitter Grammar Package', 'Target File Extensions', 'Extracted AST Constructs'],
          rows: [
            ['py', 'tree_sitter_python', '.py', 'function_definition, class_definition, decorated_definition (FastAPI/Flask routes), import_statement, import_from_statement, call'],
            ['js', 'tree_sitter_javascript', '.js, .jsx, .mjs, .cjs', 'function_declaration, class_declaration, arrow_function, variable_declarator, export_statement, import_statement, call_expression'],
            ['ts', 'tree_sitter_typescript (language_typescript)', '.ts', 'TypeScript functions, classes, methods, interface/type exports, ES6 imports, and fetch/axios/WS client calls'],
            ['tsx', 'tree_sitter_typescript (language_tsx)', '.tsx', 'Typed React TSX functional components, hooks, JSX elements, and cross-module imports'],
            ['c', 'tree_sitter_c', '.c, .h', 'function_definition, struct_specifier, preproc_include (#include "header.h"), call_expression'],
            ['cpp', 'tree_sitter_cpp', '.cpp, .hpp, .cc, .cxx', 'function_definition, class_specifier, struct_specifier, namespace/method declarators, #include directives, call_expression'],
            ['java', 'tree_sitter_java', '.java', 'class_declaration, interface_declaration, method_declaration, constructor_declaration, import_declaration, method_invocation']
          ]
        },
        points: [
          {
            label: 'Two-Pass Workspace Parsing Pipeline (parse_workspace)',
            text: 'Pass 1 scans all workspace files, creates Folder Suns and File Planets, extracts declared symbols (Function/Class Moons), registers module exports, and populates backend_api_registry. Pass 2 resolves cross-file imports, links caller-to-callee AST call edges, wires frontend-to-backend network_bridge lasers, and invokes analyze_graph_ml() to enrich every node with 10D ML diagnostics.'
          }
        ]
      },
      {
        id: 'incremental-ast-cache',
        title: '2. Sub-Millisecond Incremental AST Cache (_AST_CACHE)',
        desc: 'How Neuron re-indexes a 500-file repository in under 5 milliseconds when you save a single file in the Monaco editor:',
        paragraphs: [
          'In backend/core/parser.py, _AST_CACHE stores parsed file metadata keyed by the tuple (rel_path, abs_target) mapped to (mtime, file_size, cached_ast_data). Whenever parse_workspace() iterates over the repository, it checks os.stat(full_path) for each file. If both st_mtime and st_size match the cached entry, Neuron skips disk I/O and Tree-Sitter parsing for that file completely, reusing its cached AST symbols, imports, exports, and complexity metrics in O(1) time.'
        ],
        codeBlocks: [
          {
            label: 'Iterative Stack-Based Cyclomatic Complexity Counter (backend/core/parser.py)',
            language: 'python',
            code: `DECISION_TRIGGERS: Set[str] = {
    'if_statement', 'for_statement', 'while_statement', 'except_clause',
    'with_item', 'match_statement', 'list_comprehension', 'conditional_expression',
    'for_in_statement', 'for_range_loop', 'catch_clause', 'switch_case', 'case_statement',
    'do_statement', 'ternary_expression', 'try_statement'
}

def calculate_complexity(node: Optional[Node]) -> int:
    """Iterative AST complexity counter using constant-time decision lookup."""
    if not node:
        return 0
    score = 0
    stack = [node]
    while stack:
        curr = stack.pop()
        if curr.type in DECISION_TRIGGERS:
            score += 1
        stack.extend(curr.children)
    return score`
          }
        ],
        points: [
          {
            label: 'Why Iterative Stack Traversal Matters',
            text: 'Deeply nested syntax trees in generated or legacy code can exceed Python’s default recursion limit (sys.getrecursionlimit() == 1000) if traversed recursively. By using an explicit heap list stack (stack.pop() / stack.extend()), calculate_complexity() is 100% immune to RecursionError stack overflows.'
          }
        ]
      },
      {
        id: 'cross-language-import-resolvers',
        title: '3. Cross-Language Module & Header Import Resolvers',
        desc: 'Neuron includes three dedicated path resolution engines in backend/core/parser.py to wire import edges accurately across languages:',
        points: [
          {
            label: 'JavaScript / TypeScript Relative Resolver (resolve_js_import_path)',
            text: 'Resolves relative ES6 specifiers (starting with ./ or ../) against the importing file’s directory, automatically probing 9 candidate extensions: "", ".js", ".jsx", ".ts", ".tsx", "/index.js", "/index.jsx", "/index.ts", and "/index.tsx".'
          },
          {
            label: 'Python Package & Dot-Relative Resolver (resolve_py_import_path)',
            text: 'Maps dotted module strings (e.g., backend.core.parser or ..services.ai_service) to workspace relative .py files, supporting both absolute root imports and multi-dot relative package imports.'
          },
          {
            label: 'C / C++ Preprocessor Header Resolver (resolve_cpp_include_path)',
            text: 'Strips <...> and "..." delimiters from #include directives and searches relative to the current source file directory first, then root include paths, and finally suffix-matched workspace headers.'
          }
        ]
      }
    ]
  },

  'ac3-refactoring': {
    category: 'AST, Refactoring & Supervisor',
    title: 'AC-3 Constraint Satisfaction Refactoring Shield',
    subtitle: 'Mathematical specification of backend/ai/csp_guard.py: how Neuron models drag-and-drop symbol refactoring as a Constraint Satisfaction Problem (CSP) and prevents circular dependency cycles.',
    sections: [
      {
        id: 'why-csp-refactoring-guard',
        title: '1. Why Visual Refactoring Requires a Constraint Solver',
        desc: 'Dragging a function moon from File A and dropping it onto File B looks simple on a 2D canvas, but naive code movement can silently break a repository in subtle ways.',
        paragraphs: [
          'Suppose Function X in File A calls a private helper Function Y in File A, while Function Z in File B already imports from File A. If you blindly move Function X into File B, File B must now import Function Y from File A, while File A must import Function X from File B—instantly creating a fatal circular import deadlock (ImportError: cannot import name ... from partially initialized module).',
          'To make visual refactoring 100% safe, backend/ai/csp_guard.py evaluates every proposed symbol move through an 8-invariant Arc Consistency (AC-3) validation pipeline (ac3_validate_refactor) before a single character on disk is modified.'
        ],
        table: {
          headers: ['Invariant Step', 'Violation Code Returned', 'Mathematical Condition Checked', 'Remediation Suggested to User'],
          rows: [
            ['Invariant 1: Workspace Domain', 'INVALID_DOMAIN', 'source_file in file_asts and dest_file in file_asts', 'Verify both source and destination files exist in the active workspace'],
            ['Invariant 2: Non-Identity Move', 'NOOP_REFACTOR', 'source_file != dest_file', 'Drop the symbol onto a different module planet than its current parent'],
            ['Invariant 3: Runtime Compatibility', 'CROSS_LANGUAGE_MISMATCH', '(src in py_exts and dst in py_exts) or (src in js_exts and dst in js_exts)', 'Ensure source and destination files share compatible language runtimes (.py->.py or JS/TS->JS/TS)'],
            ['Invariant 4: Source Scope Existence', 'SYMBOL_NOT_FOUND', 'clean_symbol in get_declared_symbols(source_file)', 'Ensure the symbol is a top-level declaration in the source module'],
            ['Invariant 5: Destination Collision-Free', 'NAME_COLLISION', 'clean_symbol not in get_declared_symbols(dest_file)', 'Rename the conflicting symbol in source or destination before transplanting'],
            ['Invariant 6: Mutual Coupling Extraction', '(Coupled Metadata)', 'extract_symbol_dependencies(source_file, src_content, clean_symbol)', 'Identifies internal_deps (helpers called by symbol) and callers_of_symbol (functions calling symbol)'],
            ['Invariant 7: Global DAG Arc Consistency', 'CIRCULAR_DEPENDENCY', 'len(nx.simple_cycles(speculative_graph)) == 0', 'Co-migrate coupled helper functions along with the target symbol to eliminate the bidirectional cycle'],
            ['Invariant 8: CSP Satisfied', 'None (is_valid = True)', 'All domain, scope, and global DAG cycle constraints satisfied', 'Proceeds immediately to LibCST or Tree-Sitter surgical transplant']
          ]
        }
      },
      {
        id: 'speculative-dag-cycle-detection',
        title: '2. Speculative Import DAG Construction & Cycle Detection',
        desc: 'How Invariant 7 simulates the post-refactor repository import graph in memory before touching disk:',
        codeBlocks: [
          {
            label: 'Speculative Graph Arc-Consistency Solver (backend/ai/csp_guard.py)',
            language: 'python',
            code: `# 1. Build current workspace module import DAG
base_graph = build_import_dependency_graph(file_asts)
speculative_graph = base_graph.copy()

# Rule A: Source will import Destination if source functions still call the moved symbol
if callers_of_symbol or len(src_symbols) > 1:
    speculative_graph.add_edge(source_file, dest_file)

# Rule B: Destination will import Source if the moved symbol calls remaining helpers in Source
if internal_deps:
    speculative_graph.add_edge(dest_file, source_file)

# 2. Check for transitive cycles across the entire repository
cycles = list(nx.simple_cycles(speculative_graph))
for cycle in cycles:
    if source_file in cycle or dest_file in cycle:
        cycle_repr = " -> ".join(cycle + [cycle[0]])
        return CSPValidationResult(
            is_valid=False,
            violation_type="CIRCULAR_DEPENDENCY",
            reason=f"Refactoring violates AC-3 Arc Consistency. Circular dependency introduced: {cycle_repr}",
            cycle_path=cycle,
            coupled_symbols=list(internal_deps)
        )`
          }
        ],
        points: [
          {
            label: 'Transitive Multi-Hop Cycle Detection',
            text: 'Because build_import_dependency_graph() models the entire workspace as a NetworkX DiGraph and runs Johnson’s cycle-finding algorithm (nx.simple_cycles), Neuron catches not only direct 2-file loops (A <-> B), but also 3-hop and 4-hop transitive import cycles (A -> B -> C -> A).'
          },
          {
            label: 'Visual Shockwave Feedback on Canvas',
            text: 'When REFACTOR_CSP_VIOLATION is emitted, PixiSpatialEngine spawns an expanding crimson shockwave ring at the drop coordinates, smoothly snaps the dragged node back to its parent file, and displays a diagnostic toast detailing the exact cycle path and coupled helper symbols.'
          }
        ]
      }
    ]
  },

  'libcst-mutations': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Lossless Python LibCST & JS Tree-Sitter Transplants',
    subtitle: 'How backend/core/mutator.py and backend/core/js_mutator.py execute surgical cross-file symbol transplants, dependency forwarding, workspace-wide import rewriting, and full ES6 module merges.',
    sections: [
      {
        id: 'python-libcst-surgeon',
        title: '1. The Python LibCST Surgeon (backend/core/mutator.py)',
        desc: 'Standard Python ast.unparse() strips all comments, blank lines, and custom formatting when rewriting code. Neuron uses Meta’s Concrete Syntax Tree library (LibCST) to guarantee 100% lossless formatting retention.',
        paragraphs: [
          'Once ac3_validate_refactor() approves a Python symbol move, execute_symbol_refactor_transplant() orchestrates a 6-stage atomic AST transplant across the entire repository using specialized cst.CSTTransformer and cst.CSTVisitor subclasses:'
        ],
        table: {
          headers: ['Stage', 'LibCST Visitor / Transformer', 'Exact AST Surgical Operation'],
          rows: [
            ['Stage 1: Extract & Remove', 'SymbolExtractor(cst.CSTTransformer)', 'Locates the target FunctionDef or ClassDef in source_filepath, stores original_node, and returns cst.RemovalSentinel.REMOVE'],
            ['Stage 2: Dependency Analysis', 'ImportStatementsCollector & IdentifierCollector', 'Maps all top-level imports in the source file and collects every cst.Name referenced inside the extracted symbol body'],
            ['Stage 3: Source Import Injection', 'ReferenceChecker & ImportInjector', 'Checks if remaining functions in the source file still call the moved symbol; if so, injects "from <dest_module> import <symbol>"'],
            ['Stage 4: Destination Import Forwarding', 'ImportInjector(cst.CSTTransformer)', 'Forwards any third-party or workspace import statements required by the moved symbol from the source file into the destination file (deduplicating existing imports)'],
            ['Stage 5: Destination Symbol Append', 'cst.parse_module() + compile() Gate', 'Appends the extracted symbol to the destination file and verifies both modified source and destination buffers via Python compile() before touching disk'],
            ['Stage 6: Workspace Import Rewriting', 'ImportRewriter(cst.CSTTransformer)', 'Scans all other .py files in the workspace; if any file had "from <old_mod> import <moved_symbol>, <other>", splits or rewrites the import to point to <new_mod>']
          ]
        },
        points: [
          {
            label: 'Transactional Disk Commit & Rollback (backup_vault)',
            text: 'Every file modified during Stage 1 through Stage 6 has its original string saved in backup_vault: Dict[str, str] before writing. If any OS disk error occurs mid-write, all files in backup_vault are immediately restored so a refactor is 100% all-or-nothing.'
          }
        ]
      },
      {
        id: 'js-ts-tree-sitter-surgeon',
        title: '2. The JS / TS / React JSX AST Surgeon (backend/core/js_mutator.py)',
        desc: 'For JavaScript, TypeScript, and React JSX/TSX codebases, backend/core/js_mutator.py performs byte-accurate Tree-Sitter AST slicing and automatic ES6 import management:',
        points: [
          {
            label: 'UTF-8 Byte-Span Extraction (extract_js_symbol)',
            text: 'Parses the source file using JS_LANGUAGE, TS_LANGUAGE, or TSX_LANGUAGE and locates top-level function_declaration, class_declaration, export_statement, or arrow-function lexical_declaration nodes matching symbol_name. Extracts the exact UTF-8 byte span (start_byte:end_byte) with a deterministic bracket-counting fallback.'
          },
          {
            label: 'Automatic Export Promotion',
            text: 'If you drag a private helper function or React component (const Card = () => ...) to another file, extract_js_symbol() automatically promotes it to a named export (export const Card = () => ...) and cleans up any orphaned export default statements in the source file.'
          },
          {
            label: 'Relative Specifier Calculator (calculate_relative_js_import_path)',
            text: 'Computes the exact POSIX relative path between any two files in nested subdirectories (e.g., transforming src/pages/Docs.jsx -> src/components/Button.jsx into "../components/Button") and merges named imports into existing import { ... } clauses via inject_js_import().'
          },
          {
            label: 'Dependency Forwarding (forward_dependencies_to_dest)',
            text: 'Scans the extracted JSX/TSX symbol for referenced hooks, icons, or utilities (such as useState, useEffect, or Lucide icons) that were imported at the top of the source file, and automatically injects those imports into the destination file.'
          }
        ]
      },
      {
        id: 'full-js-module-merge',
        title: '3. Full JS/TS Module Merging (execute_js_file_merge)',
        desc: 'In addition to moving individual functions, Refactor Mode lets you drag an entire Tier 1 File Planet onto another Tier 1 File Planet (within 110px) to merge two JavaScript/TypeScript modules into one:',
        codeBlocks: [
          {
            label: '6-Step Atomic JS/TS Module Merge Pipeline (backend/core/js_mutator.py)',
            language: 'text',
            code: `1. Extract & separate top-level ES6 imports from body declarations in Source File.
2. Convert any 'export default' in Source File to a named 'export' to prevent duplicate default export errors.
3. Merge unique Source imports into Destination File (skipping self-imports between Source and Dest).
4. Append Source body declarations cleanly to Destination File.
5. Rewrite all import statements across the entire workspace that pointed to Source so they now point to Dest.
6. Delete the redundant Source File from disk and broadcast hot graph update.`
          }
        ]
      }
    ]
  },

  'agent-supervisor': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Horizon 3 Agent Supervisor & Blast Protection',
    subtitle: 'How backend/ai/agent_supervisor.py and AgentSupervisorHUD.jsx intercept rapid multi-file AI mutation bursts, compute symbol-level AST diffs, visualize downstream blast radius, and provide 1-click atomic rollbacks.',
    sections: [
      {
        id: 'horizon-3-supervisor-architecture',
        title: '1. The Horizon 3 Agent Supervisor Engine (backend/ai/agent_supervisor.py)',
        desc: 'When an autonomous coding agent (whether Neuron’s built-in AI Studio or an external CLI agent like Claude Code, Aider, or Cursor) edits 5 or 10 files in a rapid burst, developers often lose track of which functions were altered and which downstream APIs might break.',
        paragraphs: [
          'Neuron’s AgentSupervisorEngine monitors all workspace file mutations in real time. Whenever files are created, modified, or deleted within a 1.8-second sliding burst window (burst_timeout_seconds = 1.8), Neuron groups those edits into a unified AgentMutationBatch (batch_<timestamp_ms>).'
        ],
        table: {
          headers: ['Supervisor Data Structure', 'Key Fields', 'Engineering Role'],
          rows: [
            ['ASTSymbolDelta', 'symbol_name, change_type ("ADDED" | "MODIFIED" | "DELETED"), line_start, old_signature, new_signature', 'Tracks signature-level changes to individual Python defs and JS/TS functions/arrow components'],
            ['FileMutationDelta', 'file_path, status, loc_delta, symbols_added, symbols_modified, symbols_deleted, raw_diff, original_content, new_content', 'Stores the complete pre-mutation baseline, post-mutation content, net LOC change, and unified diff for a single file'],
            ['AgentMutationBatch', 'batch_id, timestamp, modified_files, file_deltas, blast_radius_node_ids, affected_api_routes, is_committed, is_rolled_back', 'Aggregates all files modified in the burst along with the full repository transitive blast radius']
          ]
        },
        points: [
          {
            label: 'Granular AST Symbol Diffing (compute_ast_delta)',
            text: 'For every modified file in the burst, compute_ast_delta() generates a standard unified diff (difflib.unified_diff) AND extracts top-level Python/JS/TS function signatures from both old_content and new_content to classify symbols into symbols_added (+), symbols_modified (~), and symbols_deleted (-).'
          },
          {
            label: 'Transitive Downstream Blast Radius & Laser Bridge Impact',
            text: 'compute_transitive_blast_radius() builds a reverse dependency graph in NetworkX (where an edge A -> B means editing A impacts B), collects nx.descendants() for every modified file and symbol, and checks bridge_map to flag any cross-stack network_bridge API routes impacted by the batch.'
          }
        ]
      },
      {
        id: 'blast-protection-shield',
        title: '2. Active Blast Protection Mode (Auto-Intercept & Hold)',
        desc: 'When you enable Blast Protection in Settings > General (which dispatches SET_BLAST_PROTECTION with enabled = True), Neuron switches from passive burst telemetry to active interception:',
        points: [
          {
            label: '1. Automated Save Flood Throttling',
            text: 'In websocket_router.py, SAVE_FILE monitors _RECENT_SAVE_TIMESTAMPS over a 1.0-second rolling window and blocks runaway save loops exceeding 6 saves per second.'
          },
          {
            label: '2. Zero-Trust External Mutation Interception',
            text: 'In workspace_service.py, if an external process or script modifies files while Blast Protection is enabled, Neuron records the full AgentMutationBatch, immediately invokes agent_supervisor.rollback_batch() to restore the original files on disk, and pops up the AgentSupervisorHUD in "BLAST SHIELD: Changes Intercepted" mode.'
          },
          {
            label: '3. Review & 1-Click Re-Apply (AGENT_APPROVE_BATCH)',
            text: 'Inside the AgentSupervisorHUD drawer, you can inspect the exact unified diff and added/modified/deleted symbols for every intercepted file. Clicking "Approve & Apply" dispatches AGENT_APPROVE_BATCH, invoking reapply_batch() to commit the changes to disk; clicking "Rollback Batch" (AGENT_ROLLBACK_BATCH) reverts any unapproved batch in 1 click.'
          }
        ]
      }
    ]
  },

  'vector-search': {
    category: 'AST, Refactoring & Supervisor',
    title: 'Pure-RAM Sublinear TF-IDF Semantic Omni-Search',
    subtitle: 'How backend/ai/vector_search.py delivers <5ms hybrid semantic and lexical code search in 100% local RAM with zero network calls and zero 80MB model downloads.',
    sections: [
      {
        id: 'why-pure-ram-vector-search',
        title: '1. Architectural Design of VectorSearchEngine (backend/ai/vector_search.py)',
        desc: 'Many AI tools require downloading 80MB-500MB ONNX/PyTorch embedding models or shipping your proprietary codebase to a cloud vector database just to search for symbols.',
        paragraphs: [
          'Neuron takes a radically faster, 100% offline approach. VectorSearchEngine combines Sublinear TF-IDF N-Gram Cosine Similarity (1-to-3 word/identifier n-grams) with an AST Lexical Identifier Booster directly in RAM. Module import takes <0.001 seconds (via lazy Scikit-Learn loading in _get_sklearn_tools()), indexing 1,000 AST nodes takes ~15ms on a background thread, and executing a query takes under 5ms.'
        ],
        codeBlocks: [
          {
            label: 'Synthesized High-Density AST Search Document per Node (vector_search.py)',
            language: 'python',
            code: `doc_text = (
    f"Symbol: {label}\\n"
    f"File: {file_path}\\n"
    f"Type: {node_type}\\n"
    f"Line: {line}\\n"
    f"Complexity: {complexity}\\n"
    f"Risk: {risk}\\n"
    f"Source Snippet:\\n{code[:1200]}"
)`
          }
        ],
        points: [
          {
            label: 'Sublinear TF-IDF Vectorizer Configuration',
            text: 'Uses TfidfVectorizer(ngram_range=(1, 3), sublinear_tf=True, stop_words="english", max_features=12000) to capture multi-word architectural concepts (e.g., "websocket broadcast", "ast complexity", "rollback batch") while applying logarithmic term-frequency scaling (1 + log(tf)).'
          },
          {
            label: 'Pure-Python Sublinear Fallback',
            text: 'Even if Scikit-Learn is not installed in a minimal Python environment, VectorSearchEngine automatically builds a pure-Python inverted token index with smoothed inverse document frequency (math.log((n_docs + 1) / (df + 1)) + 1.0) so semantic search always works.'
          }
        ]
      },
      {
        id: 'hybrid-ranking-formula',
        title: '2. Hybrid Cosine + AST Identifier Boosting Formula',
        desc: 'Pure embedding search often struggles with exact camelCase or snake_case identifier names. Neuron solves this by combining TF-IDF cosine similarity (scaled 0-100) with deterministic AST lexical boosts:',
        table: {
          headers: ['Matching Signal in query()', 'Score Boost Added', 'Why It Matters for Code Search'],
          rows: [
            ['TF-IDF Cosine Similarity (1-3 N-Grams)', 'cosine_sim * 100.0', 'Matches conceptual and natural language queries against docstrings, comments, and function bodies'],
            ['Exact Query Substring in Symbol Label', '+40.0 pts', 'Guarantees that typing a function or class name ranks that exact symbol #1'],
            ['Exact Query Substring in File Path', '+25.0 pts', 'Prioritizes modules whose filename or directory matches the query'],
            ['Individual Query Token in Symbol Label', '+18.0 pts per token', 'Matches multi-word queries (e.g. "parse workspace") against snake_case/camelCase identifiers (parse_workspace)'],
            ['Individual Query Token in File Path', '+10.0 pts per token', 'Boosts symbols residing in relevant domain folders'],
            ['Individual Query Token in Code Body', '+3.0 pts per token', 'Provides fine-grained tie-breaking when internal variables or API calls match the query']
          ]
        },
        points: [
          {
            label: 'Clamped 5.0 - 100.0 Confidence Score',
            text: 'Final scores are clamped and rounded via round(min(100.0, max(5.0, raw_score)), 1) and returned with the node’s id, label, filePath, nodeType, 1-indexed line number, 250-char code preview, risk level, and aiSummary.'
          }
        ]
      }
    ]
  }
};
