<div align="center">

# Workspace IDE — Documentation

Comprehensive documentation for the Workspace IDE project.

</div>

---

## Architecture Overview

```mermaid
graph TB
    subgraph Browser
        App[App.tsx]
        Store[Zustand Store]
        
        subgraph Layout["Layout Layer"]
            TopBar[TopBar]
            WorkspaceLayout[WorkspaceLayout]
            PaneView[PaneView]
            ToolsDock[ToolsDock]
        end

        subgraph Tools["Tools Layer"]
            Editor[Editor]
            Preview[Preview]
            Console[Console]
            Shell[Shell]
            Agent[AI Agent]
            Secrets[Secrets]
            FileHistory[File History]
            Multiplayer[Multiplayer]
            Settings[User Settings]
        end

        subgraph State["State Management"]
            Windows[Windows State]
            Panes[Panes State]
            Tabs[Tabs State]
            FileTree[File Tree State]
            AppState[App State]
            KittyLayout[Layout State]
        end
    end

    App --> Store
    App --> Layout
    Store --> State
    Layout --> Tools
    TopBar --> WorkspaceLayout
    WorkspaceLayout --> PaneView
    PaneView --> Tools
```

### Core Concepts

| Concept | Description |
|---------|-------------|
| **Workspace** | Top-level container for the entire IDE session |
| **Window** | A browser window containing a layout tree |
| **PaneSplit** | Recursive container for horizontal/vertical tiling |
| **Pane** | Terminal layout node containing one or more tabs |
| **Tab** | An instance of a tool (Editor, Shell, Preview, etc.) |
| **Tool** | A functional component registered in the ToolRenderer |
| **LayoutNode** | Recursive tree structure defining the visual grid |
| **FileNode** | Virtual file system unit (file or folder) |

---

## Getting Started

| Goal | Resource |
|------|----------|
| Run the project locally | [Main README — Getting Started](../README.md#-getting-started) |
| Understand the codebase | [Code Mapping](COPILOT_CODE_MAPPING.md) |
| Contribute to the project | [Contributing Guide](../CONTRIBUTING.md) |
| Report a security issue | [Security Policy](../SECURITY.md) |

---

## Documentation Index

### Architecture

| Document | Description |
|----------|-------------|
| [Design Review](DESIGN_REVIEW.md) | Technical design review covering component architecture, state management patterns, and layout system design decisions |
| [Code Mapping](COPILOT_CODE_MAPPING.md) | Comprehensive codebase structure reference mapping every component, store, and utility to its role |

### Guides

| Document | Description |
|----------|-------------|
| [Layout System](KITTY_LAYOUTS.md) | Detailed documentation of the 7 kitty-inspired layout modes (Stack, Tall, Fat, Grid, Splits, Horizontal, Vertical) including configuration and keyboard shortcuts |
| [Use Cases](COPILOT_USECASES.md) | Feature use cases and developer workflows covering real-world scenarios |

### Reference

| Document | Description |
|----------|-------------|
| [Prompt Templates](COPILOT_PROMPT_TEMPLATES.md) | AI prompt templates for code generation, debugging, and development assistance |
| [Contributing](../CONTRIBUTING.md) | Development setup, code style guidelines, and PR process |
| [Security](../SECURITY.md) | Vulnerability reporting policy and supported versions |

---

## State Management

The IDE uses **Zustand** for centralized state management. The store (`src/stores/workspaceStore.ts`) manages:

```mermaid
graph LR
    subgraph Store["workspaceStore"]
        W[Windows] --> P[Panes]
        P --> T[Tabs]
        F[File Tree] --> FN[FileNodes]
        A[App State] --> R[Running]
        A --> S[Search]
        A --> SP[Spotlight]
        L[Layout] --> LM[Layout Mode]
        L --> LC[Layout Config]
    end
```

| State Slice | Responsibilities |
|-------------|-----------------|
| **Windows** | Window CRUD, active window tracking |
| **Panes** | Splitting, floating, maximizing, docking |
| **Tabs** | Adding, removing, moving between panes |
| **File Tree** | File/folder CRUD, expand/collapse |
| **App State** | Running status, search, spotlight |
| **Layout** | Layout mode selection, bias, mirroring |

---

## Layout System

The IDE supports 7 layout modes inspired by the [kitty terminal emulator](https://sw.kovidgoyal.net/kitty/):

| Layout | Description |
|--------|-------------|
| **Stack** | Single visible pane with tab bar for switching |
| **Tall** | Main pane on left, others stacked right |
| **Fat** | Main pane on top, others arranged below |
| **Grid** | Equal-size grid arrangement |
| **Splits** | Free-form horizontal/vertical splits |
| **Horizontal** | All panes in a single row |
| **Vertical** | All panes in a single column |

> For detailed layout documentation, see [KITTY_LAYOUTS.md](KITTY_LAYOUTS.md).

---

<div align="center">

[Back to Main README](../README.md)

</div>
