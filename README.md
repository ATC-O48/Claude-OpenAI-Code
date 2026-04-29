# Workspace IDE

> A modern, flexible browser-based IDE built with React + TypeScript. Provides a complete development environment with resizable panes, tabbed editors, file management, and integrated tools.

---

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Description

Workspace IDE is a browser-based Integrated Development Environment that provides a multi-window, multi-pane workspace for software development. It enables users to manage files, execute code, view live previews, and monitor real-time resource telemetry -- all within a single browser tab.

Key highlights:

- **Multi-window support** with resizable, split, and floating panes
- **Tabbed interface** for editors, terminals, previews, and more
- **File tree** with full CRUD operations and context menus
- **Integrated tools** including code editor, shell, console, AI agent, and secrets manager
- **Real-time resource monitoring** for RAM, CPU, and storage
- **Global search** with keyboard navigation (Ctrl+K)
- **Spotlight page** for project metadata and sharing

---

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/ATC-O48/Claude-OpenAI-Code.git
   cd Claude-OpenAI-Code
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

---

## Usage

### Development

```sh
# Start development server
npm run dev

# Build for production
tsc -b && npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Working with the IDE

- Open the app in your browser after starting the dev server
- Use the **File Tree** sidebar to browse and manage project files
- Split panes horizontally or vertically via the **Options Menu** (three dots icon)
- Access tools quickly from the **Tools Dock** at the bottom
- Use **Ctrl+K** to open global search
- Click the project name to open the **Spotlight Page** for project settings

---

## Features

### 1. Workspace Structure
- **Windows**: Multiple browser tabs/windows support
- **Panes**: Split horizontal/vertical, resize, drag-and-drop, floating mode
- **Tabs**: Each tab hosts a tool (Editor, Preview, Console, Agent, etc.)

### 2. File Tree
- Browse and manage project files and folders
- Open files in the editor
- Context menu: rename, duplicate, move, download, delete
- Create new files and folders

### 3. Tools Dock
- Quick-access toolbar at the bottom of the workspace
- Open any tool with one click
- Categories: primary tools, secondary tools, and "All Tools" browser

### 4. Run Button
- Start/stop the current workflow
- Visual state change (green Run / red Stop)
- Controls the Preview and Console output

### 5. Spotlight Page
- View and edit the project cover page
- Set project name, description, and visibility (public/private)
- Share link management
- Accessible by clicking the project name

### 6. Options Menu
- Per-pane context menu (three dots icon)
- **Window management**: Open new workspace windows
- **Pane management**: Split, maximize, float/dock panes
- **Tab management**: Move tabs between panes

### 7. Search Bar
- Global search modal (Ctrl+K)
- Search across files, text content, and tools
- Keyboard navigation support
- Results categorized by type

### 8. Resources Panel
- Real-time display of RAM, CPU, and Storage usage
- Color-coded progress bars (green/yellow/red)
- Located at the bottom of the sidebar

### 9. Integrated Tools

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

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for development and building
- **Zustand** for state management
- **react-resizable-panels** for split pane layouts
- **Tailwind CSS v4** for styling
- **Lucide React** for icons

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

The workspace follows a hierarchical structure:

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

State is managed centrally via Zustand store with actions for:
- Window CRUD operations
- Pane splitting, floating, maximizing
- Tab adding, removing, moving between panes
- File tree operations (CRUD + expand/collapse)
- Application state (running, search, spotlight)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Open search |
| `Escape` | Close search/spotlight/menus |

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a new branch**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
   ```sh
   npm run lint
   npm run build
   ```
5. **Commit and push**
   ```sh
   git commit -m "Add feature: your-feature-name"
   git push origin feature/your-feature-name
   ```
6. **Open a pull request**

**Issues & Suggestions:**
Open an issue for bugs, questions, or feature requests using the provided issue templates.

---

## License

This project is licensed under the [Boost Software License 1.0](LICENSE).

---

## Contact

- **Organization:** [ATC-O48](https://github.com/ATC-O48)
- **Project Link:** https://github.com/ATC-O48/Claude-OpenAI-Code

---
