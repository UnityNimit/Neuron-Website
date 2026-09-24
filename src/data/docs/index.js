// src/data/docs/index.js
import { PART1_GETTING_STARTED_DOCS } from './part1_gettingStarted';
import { PART2_SPATIAL_ENGINE_DOCS } from './part2_spatialEngine';
import { PART3_AI_STUDIO_DOCS } from './part3_aiStudioAndAgents';
import { PART4_AST_AND_REFACTORING_DOCS } from './part4_astAndRefactoring';
import { PART3_REMAINING_DOCS } from './part3_remaining';

export const DOCS_DATA = {
  ...PART3_REMAINING_DOCS,
  ...PART1_GETTING_STARTED_DOCS,
  ...PART2_SPATIAL_ENGINE_DOCS,
  ...PART3_AI_STUDIO_DOCS,
  ...PART4_AST_AND_REFACTORING_DOCS,
};

export const DOCS_NAV_GROUPS = [
  {
    category: 'Get Started & Architecture',
    items: [
      { id: 'welcome', label: 'Welcome to Neuron' },
      { id: 'quickstart', label: 'Quickstart Walkthrough' },
      { id: 'installation', label: 'Installation & Sidecar' },
      { id: 'architecture', label: 'Localhost Architecture' },
      { id: 'workspace-lifecycle', label: 'Workspace & Git Churn' },
      { id: 'changelog', label: 'Release Changelog' }
    ]
  },
  {
    category: 'Spatial Canvas & Graph ML',
    items: [
      { id: 'spatial-overview', label: 'Canvas & Celestial Nodes' },
      { id: 'physics-relaxation', label: 'D3 Physics & Equilibrium' },
      { id: 'louvain-clusters', label: 'Louvain Nebula Clusters' },
      { id: 'ml-diagnostics', label: '10D ML & Smell Diagnosis' },
      { id: 'webgpu-pipeline', label: 'WebGPU & LOD Pipeline' },
      { id: 'ast-conduits', label: 'AST Conduits & Bridges' }
    ]
  },
  {
    category: 'AI Studio & Autonomous Agents',
    items: [
      { id: 'agent-overview', label: 'AI Studio Architecture' },
      { id: 'byok-discovery', label: 'BYOK & Auto-Discovery' },
      { id: 'autonomous-tools', label: 'Autonomous Tool Suite' },
      { id: 'prompting', label: 'Contextual Prompting' },
      { id: 'debugging', label: 'Autonomous Debug Mode' },
      { id: 'planning', label: 'Refactor Proposal Engine' },
      { id: 'security', label: 'Approval Gates & Rollback' }
    ]
  },
  {
    category: 'AST, Refactoring & Supervisor',
    items: [
      { id: 'daemon-setup', label: 'Tree-Sitter AST Engine' },
      { id: 'ac3-refactoring', label: 'AC-3 Refactoring Shield' },
      { id: 'libcst-mutations', label: 'LibCST & JS Transplants' },
      { id: 'agent-supervisor', label: 'Horizon 3 Supervisor' },
      { id: 'vector-search', label: 'Pure-RAM Vector Search' }
    ]
  },
  {
    category: 'Editor, Terminal & Git',
    items: [
      { id: 'monaco-editor', label: 'Monaco & Media Viewers' },
      { id: 'polyglot-runner', label: 'Polyglot Code Runner' },
      { id: 'interactive-terminal', label: 'Interactive Terminal' },
      { id: 'source-control', label: 'Git & Commit Graph' },
      { id: 'command-palette', label: 'Unified Command Palette' }
    ]
  },
  {
    category: 'Reference & Troubleshooting',
    items: [
      { id: 'websocket-protocol', label: 'WebSocket & REST API' },
      { id: 'theme-engine', label: 'Theme Token Engine' },
      { id: 'zero-telemetry', label: 'Privacy & PKCE Auth' },
      { id: 'keybindings', label: 'Keyboard Shortcuts' },
      { id: 'troubleshooting', label: 'Diagnostics Matrix' }
    ]
  }
];
