# Kitty-Inspired Layouts

> Window layout system for the Workspace IDE, inspired by the [kitty terminal emulator](https://sw.kovidgoyal.net/kitty/overview/#layouts).

---

## Overview

The Workspace IDE supports **7 kitty-inspired layout modes** that control how panes are arranged within a workspace window. You can switch layouts via the layout selector in the top bar or by pressing **Ctrl+Shift+L** to cycle through them.

All layouts dynamically rearrange existing panes — no panes are created or destroyed when switching layouts.

---

## Available Layouts

### Stack

Displays a **single pane** using all available space. Other panes are hidden behind it and accessible via pane tabs at the top.

```
┌──────────────────────────────────┐
│                                  │
│                                  │
│         Active Pane              │
│                                  │
│                                  │
└──────────────────────────────────┘
```

**Use case:** Focus on a single task without distraction.

---

### Tall

Displays one (or more) **full-height pane(s)** on the left. Remaining panes are stacked vertically on the right.

```
┌──────────────┬───────────────┐
│              │               │
│              │               │
│              ├───────────────┤
│    Main      │    Side 1     │
│              ├───────────────┤
│              │    Side 2     │
│              │               │
└──────────────┴───────────────┘
```

**Options:**
| Option | Default | Description |
|--------|---------|-------------|
| `bias` | 50 | Width percentage for main pane(s), 10–90 |
| `fullSize` | 1 | Number of full-height main panes |
| `mirrored` | false | Place main pane(s) on the right |

**Use case:** Code editor on the left with preview/console stacked on the right.

---

### Fat

Displays one (or more) **full-width pane(s)** on top. Remaining panes are tiled horizontally on the bottom.

```
┌──────────────────────────────┐
│            Main              │
│                              │
├─────────┬──────────┬─────────┤
│ Side 1  │  Side 2  │ Side 3  │
│         │          │         │
└─────────┴──────────┴─────────┘
```

**Options:** Same as Tall layout (bias, fullSize, mirrored).

**Use case:** Wide editor on top with terminal, console, and preview below.

---

### Grid

Displays panes in a **balanced grid** with all panes roughly the same size.

```
┌─────────┬──────────┬─────────┐
│         │          │         │
│         │          │         │
├─────────┼──────────┼─────────┤
│         │          │         │
│         │          │         │
└─────────┴──────────┴─────────┘
```

The grid automatically computes the optimal number of rows and columns based on the pane count.

**Use case:** Monitoring multiple outputs simultaneously (editor, preview, console, shell).

---

### Splits

The most **flexible layout**. Panes are arranged using the existing recursive split tree. This is the default layout and preserves manual split arrangements.

```
┌──────────────┬───────────────┐
│              │               │
│              ├───────┬───────┤
│              │       │       │
│              ├───────┴───────┤
│              │               │
└──────────────┴───────────────┘
```

**Options:**
| Option | Default | Description |
|--------|---------|-------------|
| `splitAxis` | horizontal | Default split direction: `horizontal`, `vertical`, or `auto` |

**Use case:** Custom arrangements for complex workflows.

---

### Horizontal

All panes shown **side by side** (columns).

```
┌─────────┬──────────┬─────────┐
│         │          │         │
│         │          │         │
│         │          │         │
│         │          │         │
│         │          │         │
└─────────┴──────────┴─────────┘
```

**Use case:** Comparing files or outputs side by side.

---

### Vertical

All panes shown **one below the other** (rows).

```
┌──────────────────────────────┐
│                              │
├──────────────────────────────┤
│                              │
├──────────────────────────────┤
│                              │
└──────────────────────────────┘
```

**Use case:** Stacking editor, output, and terminal in a single column.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+L` | Cycle to next layout |

---

## Configuration

See [`kitty.conf`](../kitty.conf) in the project root for the full configuration reference, including:

- Enabling/disabling specific layouts
- Layout-specific options (bias, full_size, mirrored)
- Keyboard shortcut mappings
- Window resizing controls
- Split management shortcuts

---

## Architecture

### Layout Engine (`src/layouts/kittyLayouts.ts`)

The layout engine converts between a flat list of panes and a `PaneSplit` tree:

1. **`collectPanes(layout)`** — Recursively flattens a layout tree into an ordered list of panes.
2. **`applyKittyLayout(layout, config)`** — Takes the current layout tree and a `KittyLayoutConfig`, extracts all panes, and rebuilds the tree according to the selected layout algorithm.

### State Management

Layout state is managed in the Zustand store (`workspaceStore.ts`):

- `kittyLayout: KittyLayoutConfig` — Current layout configuration
- `enabledLayouts: KittyLayoutType[]` — List of available layouts
- `activePaneIndex: number` — Active pane index for Stack layout
- `setKittyLayout(type)` — Switch to a specific layout
- `updateKittyLayoutConfig(config)` — Update layout options (bias, mirrored, etc.)
- `cycleLayout()` — Advance to the next enabled layout

### Components

- **`LayoutSelector`** (`src/components/layout/LayoutSelector.tsx`) — Dropdown in the top bar for selecting layouts and configuring options.
- **`WorkspaceLayout`** (`src/components/layout/WorkspaceLayout.tsx`) — Renders the layout tree; handles Stack mode by showing only the active pane.

---

## Types

```typescript
type KittyLayoutType =
  | 'stack'
  | 'tall'
  | 'fat'
  | 'grid'
  | 'splits'
  | 'horizontal'
  | 'vertical';

interface KittyLayoutConfig {
  type: KittyLayoutType;
  bias: number;        // 10–90, percentage split for Tall/Fat
  fullSize: number;    // Number of full-size panes for Tall/Fat
  mirrored: boolean;   // Reverse main/side positions for Tall/Fat
  splitAxis: 'horizontal' | 'vertical' | 'auto';  // Default axis for Splits
}
```
