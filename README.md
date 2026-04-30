<div align="center">

# Workspace IDE

**A modern, flexible browser-based IDE built with React + TypeScript**

[![Build Status](https://github.com/ATC-O48/Claude-OpenAI-Code/actions/workflows/ci.yml/badge.svg)](https://github.com/ATC-O48/Claude-OpenAI-Code/actions/workflows/ci.yml)
[![License: BSL-1.0](https://img.shields.io/badge/License-BSL--1.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

A complete development environment in your browser — multi-window workspace with resizable panes, tabbed editors, file management, and integrated tools.

[Getting Started](#-getting-started) · [Features](#-features) · [Documentation](docs/) · [Contributing](CONTRIBUTING.md)

</div>

---

## Screenshots

<!-- Replace with actual screenshots -->
> _Screenshots coming soon — run `npm run dev` to see the IDE in action._

---

## Features

<table>
  <tr>
    <td><b>Multi-Window Workspace</b></td>
    <td>Multiple browser windows with resizable, split, and floating panes</td>
  </tr>
  <tr>
    <td><b>Tabbed Interface</b></td>
    <td>Each pane hosts tabs for editors, terminals, previews, and more</td>
  </tr>
  <tr>
    <td><b>File Tree</b></td>
    <td>Full CRUD operations with context menus, drag-and-drop support</td>
  </tr>
  <tr>
    <td><b>Integrated Tools</b></td>
    <td>Code editor, shell, console, AI agent, secrets manager, and more</td>
  </tr>
  <tr>
    <td><b>Resource Monitoring</b></td>
    <td>Real-time RAM, CPU, and storage usage with color-coded indicators</td>
  </tr>
  <tr>
    <td><b>Global Search</b></td>
    <td>Keyboard-driven search (<kbd>Ctrl+K</kbd>) across files, content, and tools</td>
  </tr>
  <tr>
    <td><b>Layout System</b></td>
    <td>7 kitty-inspired layouts — Stack, Tall, Fat, Grid, Splits, Horizontal, Vertical</td>
  </tr>
  <tr>
    <td><b>Spotlight Page</b></td>
    <td>Project metadata, visibility settings, and share link management</td>
  </tr>
</table>

### Integrated Tools

| Tool | Description |
|------|-------------|
| **Editor** | Code viewer with line numbers and syntax display |
| **Preview** | Live app preview with browser chrome |
| **Console** | Runtime output with log levels (INFO/WARN/ERROR) |
| **Shell** | Interactive CLI terminal |
| **Secrets** | Manage API keys and credentials securely |
| **File History** | View edit history timeline |
| **Multiplayer** | See collaborators and their status |
| **User Settings** | Configure editor and appearance preferences |
| **AI Agent** | Chat-based AI coding assistant |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/ATC-O48/Claude-OpenAI-Code.git
cd Claude-OpenAI-Code

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check and build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite](https://vitejs.dev/) | Build tool and dev server |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Split pane layouts |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## Project Structure

```
src/
├── App.tsx                          # Main app component
├── main.tsx                         # Entry point
├── index.css                        # Global styles (Tailwind + custom)
├── types/
│   └── workspace.ts                 # TypeScript type definitions
├── stores/
│   └── workspaceStore.ts            # Zustand state management
└── components/
    ├── layout/
    │   ├── TopBar.tsx               # Window tabs + Run button + Search
    │   ├── WorkspaceLayout.tsx      # Resizable pane layout renderer
    │   ├── PaneView.tsx             # Individual pane with tabs
    │   └── PaneOptionsMenu.tsx      # Options menu for panes
    ├── filetree/
    │   ├── FileTree.tsx             # File tree sidebar
    │   └── FileContextMenu.tsx      # Right-click context menu
    ├── toolbar/
    │   └── ToolsDock.tsx            # Bottom tools dock
    ├── search/
    │   └── SearchBar.tsx            # Global search modal
    ├── resources/
    │   └── ResourcesPanel.tsx       # Resource usage display
    ├── spotlight/
    │   └── SpotlightPage.tsx        # Project spotlight/settings
    └── tools/
        ├── ToolRenderer.tsx         # Tool routing component
        ├── EditorTool.tsx           # Code editor
        ├── PreviewTool.tsx          # App preview
        ├── ConsoleTool.tsx          # Console output
        ├── ShellTool.tsx            # Shell/terminal
        ├── SecretsTool.tsx          # Secrets manager
        ├── FileHistoryTool.tsx      # File change history
        ├── MultiplayerTool.tsx      # Collaboration panel
        ├── UserSettingsTool.tsx      # User preferences
        └── AgentTool.tsx            # AI agent chat
```

---

## Architecture

The workspace follows a recursive hierarchical structure:

```
Workspace
└── Window(s)
    └── Layout (PaneSplit tree)
        ├── Pane
        │   ├── Tab (Editor)
        │   └── Tab (Console)
        └── PaneSplit
            ├── Pane (Preview)
            └── Pane (Shell)
```

State is managed centrally via **Zustand** store with actions for:

- Window CRUD operations
- Pane splitting, floating, maximizing
- Tab adding, removing, moving between panes
- File tree operations (CRUD + expand/collapse)
- Application state (running, search, spotlight)
- Layout management (7 kitty-inspired layout modes)

> For detailed architecture documentation, see the [docs/](docs/) directory.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| <kbd>Ctrl+K</kbd> | Open global search |
| <kbd>Ctrl+Shift+L</kbd> | Cycle through layout modes |
| <kbd>Escape</kbd> | Close search / spotlight / menus |

---

## Quick Links

| Resource | Description |
|----------|-------------|
| [Documentation](docs/) | Architecture docs, design reviews, and guides |
| [Design Review](docs/DESIGN_REVIEW.md) | Technical design review |
| [Code Mapping](docs/COPILOT_CODE_MAPPING.md) | Codebase structure reference |
| [Use Cases](docs/COPILOT_USECASES.md) | Feature use cases and workflows |
| [Layout System](docs/KITTY_LAYOUTS.md) | Kitty-inspired layout documentation |
| [Contributing](CONTRIBUTING.md) | Contribution guidelines |
| [Security Policy](SECURITY.md) | Vulnerability reporting |

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup
- Code style guidelines (ESLint, TypeScript)
- Pull request process
- Issue guidelines

### Quick Start for Contributors

```bash
# Fork and clone
git clone https://github.com/<your-username>/Claude-OpenAI-Code.git
cd Claude-OpenAI-Code
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes, then verify
npm run lint
npm run build

# Commit and push
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

Then open a pull request against `main`.

---

## License

This project is licensed under the [Boost Software License 1.0](LICENSE).

---

## Contact

- **Organization:** [ATC-O48](https://github.com/ATC-O48)
- **Project Link:** [github.com/ATC-O48/Claude-OpenAI-Code](https://github.com/ATC-O48/Claude-OpenAI-Code)

---
