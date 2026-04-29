import { create } from 'zustand';
import type {
  WorkspaceWindow,
  Pane,
  Tab,
  ToolType,
  FileNode,
  ResourceUsage,
  SpotlightConfig,
  SplitDirection,
  PaneSplit,
  KittyLayoutType,
  KittyLayoutConfig,
} from '../types/workspace';
import { KITTY_LAYOUT_ORDER } from '../types/workspace';
import { applyKittyLayout, getDefaultLayoutConfig } from '../layouts/kittyLayouts';

let idCounter = 0;
const genId = (prefix: string) => `${prefix}-${++idCounter}`;

type LayoutNode = Pane | PaneSplit;

function createTab(toolType: ToolType, title: string, filePath?: string): Tab {
  return {
    id: genId('tab'),
    title,
    toolType,
    filePath,
    isActive: false,
  };
}

function createPane(tabs: Tab[] = []): Pane {
  return {
    id: genId('pane'),
    tabs,
    activeTabId: tabs[0]?.id ?? null,
    isFloating: false,
  };
}

function isPaneSplit(layout: LayoutNode): layout is PaneSplit {
  return 'direction' in layout && 'children' in layout;
}

const defaultEditorTab = createTab('editor', 'Welcome.tsx', '/src/Welcome.tsx');
defaultEditorTab.isActive = true;

const defaultPreviewTab = createTab('preview', 'Preview');
defaultPreviewTab.isActive = true;

const defaultConsoleTab = createTab('console', 'Console');
defaultConsoleTab.isActive = true;

const initialWindow: WorkspaceWindow = {
  id: genId('win'),
  title: 'Main Window',
  layout: {
    id: genId('split'),
    direction: 'horizontal',
    children: [
      createPane([defaultEditorTab]),
      {
        id: genId('split'),
        direction: 'vertical',
        children: [
          createPane([defaultPreviewTab]),
          createPane([defaultConsoleTab]),
        ],
        sizes: [60, 40],
      },
    ],
    sizes: [50, 50],
  },
  isActive: true,
};

const sampleFiles: FileNode[] = [
  {
    id: 'f1',
    name: 'src',
    type: 'folder',
    path: '/src',
    isExpanded: true,
    children: [
      {
        id: 'f2',
        name: 'components',
        type: 'folder',
        path: '/src/components',
        children: [
          { id: 'f3', name: 'App.tsx', type: 'file', path: '/src/components/App.tsx', language: 'tsx', content: 'import React from "react";\n\nexport function App() {\n  return <div>Hello World</div>;\n}' },
          { id: 'f4', name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx', language: 'tsx', content: 'export function Header() {\n  return <header>Header</header>;\n}' },
        ],
      },
      {
        id: 'f5',
        name: 'styles',
        type: 'folder',
        path: '/src/styles',
        children: [
          { id: 'f6', name: 'global.css', type: 'file', path: '/src/styles/global.css', language: 'css', content: '* { box-sizing: border-box; margin: 0; padding: 0; }' },
        ],
      },
      { id: 'f7', name: 'main.tsx', type: 'file', path: '/src/main.tsx', language: 'tsx', content: 'import { createRoot } from "react-dom/client";\nimport { App } from "./components/App";\n\ncreateRoot(document.getElementById("root")!).render(<App />);' },
      { id: 'f8', name: 'Welcome.tsx', type: 'file', path: '/src/Welcome.tsx', language: 'tsx', content: '// Welcome to Workspace IDE\n\nexport function Welcome() {\n  return (\n    <div className="welcome">\n      <h1>Welcome to Workspace IDE</h1>\n      <p>Start coding by opening a file from the file tree.</p>\n    </div>\n  );\n}' },
    ],
  },
  { id: 'f9', name: 'package.json', type: 'file', path: '/package.json', language: 'json', content: '{\n  "name": "my-project",\n  "version": "1.0.0"\n}' },
  { id: 'f10', name: 'README.md', type: 'file', path: '/README.md', language: 'markdown', content: '# My Project\n\nThis is a sample project.' },
  { id: 'f11', name: 'tsconfig.json', type: 'file', path: '/tsconfig.json', language: 'json', content: '{\n  "compilerOptions": {\n    "target": "ES2020"\n  }\n}' },
];

interface WorkspaceState {
  windows: WorkspaceWindow[];
  activeWindowId: string;
  files: FileNode[];
  isRunning: boolean;
  resources: ResourceUsage;
  spotlight: SpotlightConfig;
  searchQuery: string;
  searchOpen: boolean;
  spotlightOpen: boolean;
  secrets: { key: string; name: string; value?: string; masked: boolean }[];
  kittyLayout: KittyLayoutConfig;
  enabledLayouts: KittyLayoutType[];
  activePaneIndex: number;

  setKittyLayout: (type: KittyLayoutType) => void;
  updateKittyLayoutConfig: (config: Partial<KittyLayoutConfig>) => void;
  cycleLayout: () => void;
  setActivePaneIndex: (index: number) => void;

  addWindow: () => void;
  removeWindow: (id: string) => void;
  setActiveWindow: (id: string) => void;

  addTab: (paneId: string, toolType: ToolType, title: string, filePath?: string) => void;
  removeTab: (paneId: string, tabId: string) => void;
  setActiveTab: (paneId: string, tabId: string) => void;
  moveTab: (fromPaneId: string, toPaneId: string, tabId: string) => void;

  splitPane: (paneId: string, direction: SplitDirection) => void;
  toggleFloating: (paneId: string) => void;
  maximizePane: (paneId: string) => void;

  toggleFolder: (nodeId: string) => void;
  openFile: (node: FileNode) => void;
  createFile: (parentPath: string, name: string, type: 'file' | 'folder') => void;
  renameFile: (nodeId: string, newName: string) => void;
  deleteFile: (nodeId: string) => void;
  duplicateFile: (nodeId: string) => void;

  toggleRunning: () => void;

  setSearchQuery: (query: string) => void;
  setSearchOpen: (open: boolean) => void;
  setSpotlightOpen: (open: boolean) => void;
  updateSpotlight: (config: Partial<SpotlightConfig>) => void;

  addSecret: (name: string, value: string) => void;
  removeSecret: (key: string) => void;
}

function findPaneAndUpdate(layout: LayoutNode, paneId: string, updater: (pane: Pane) => Pane): LayoutNode {
  if (!isPaneSplit(layout)) {
    if (layout.id === paneId) return updater(layout);
    return layout;
  }
  return {
    ...layout,
    children: layout.children.map((child) => findPaneAndUpdate(child, paneId, updater)),
  };
}

function findFileNode(nodes: FileNode[], id: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFileNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function updateFileNodes(
  nodes: FileNode[],
  id: string,
  updater: (node: FileNode) => FileNode | null
): FileNode[] {
  return nodes
    .map((node) => {
      if (node.id === id) return updater(node);
      if (node.children) {
        return { ...node, children: updateFileNodes(node.children, id, updater) };
      }
      return node;
    })
    .filter(Boolean) as FileNode[];
}

function updateChildrenPaths(children: FileNode[], oldPath: string, newPath: string): FileNode[] {
  return children.map((child) => {
    const updatedChild: FileNode = {
      ...child,
      path: child.path.startsWith(oldPath) ? newPath + child.path.slice(oldPath.length) : child.path,
    };
    if (updatedChild.children) {
      updatedChild.children = updateChildrenPaths(updatedChild.children, oldPath, newPath);
    }
    return updatedChild;
  });
}

function deepCloneFileNode(node: FileNode, newParentPath: string): FileNode {
  const cloned: FileNode = {
    ...node,
    id: genId('file'),
    path: `${newParentPath}/${node.name}`,
  };
  if (node.children) {
    cloned.children = node.children.map((child) =>
      deepCloneFileNode(child, cloned.path)
    );
  }
  return cloned;
}

function addChildToFolder(
  nodes: FileNode[],
  parentPath: string,
  child: FileNode
): FileNode[] {
  return nodes.map((node) => {
    if (node.path === parentPath && node.type === 'folder') {
      return {
        ...node,
        children: [...(node.children ?? []), child],
        isExpanded: true,
      };
    }
    if (node.children) {
      return { ...node, children: addChildToFolder(node.children, parentPath, child) };
    }
    return node;
  });
}

function getFirstPane(layout: LayoutNode): Pane | null {
  if (!isPaneSplit(layout)) return layout;
  for (const child of layout.children) {
    const found = getFirstPane(child);
    if (found) return found;
  }
  return null;
}

function splitInLayout(layout: LayoutNode, paneId: string, direction: SplitDirection): LayoutNode {
  if (!isPaneSplit(layout)) {
    if (layout.id === paneId) {
      const newTab = createTab('editor', 'Untitled');
      newTab.isActive = true;
      const newSplit: PaneSplit = {
        id: genId('split'),
        direction,
        children: [layout, createPane([newTab])],
        sizes: [50, 50],
      };
      return newSplit;
    }
    return layout;
  }
  return {
    ...layout,
    children: layout.children.map((c) => splitInLayout(c, paneId, direction)),
  };
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  windows: [initialWindow],
  activeWindowId: initialWindow.id,
  files: sampleFiles,
  isRunning: false,
  resources: {
    ram: { used: 1.2, total: 4.0, unit: 'GB' },
    cpu: { usage: 23, cores: 4 },
    storage: { used: 2.8, total: 10.0, unit: 'GB' },
  },
  spotlight: {
    projectName: 'My Workspace Project',
    description: 'A collaborative development environment',
    isPublic: false,
    shareLink: 'https://workspace.app/share/abc123',
  },
  searchQuery: '',
  searchOpen: false,
  spotlightOpen: false,
  secrets: [
    { key: 's1', name: 'OPENAI_API_KEY', masked: true },
    { key: 's2', name: 'DATABASE_URL', masked: true },
  ],
  kittyLayout: getDefaultLayoutConfig(),
  enabledLayouts: KITTY_LAYOUT_ORDER,
  activePaneIndex: 0,

  setKittyLayout: (type) => {
    set((s) => {
      const newConfig: KittyLayoutConfig = { ...s.kittyLayout, type };
      const win = s.windows.find((w) => w.isActive);
      if (!win) return { kittyLayout: newConfig };
      const newLayout = applyKittyLayout(win.layout, newConfig);
      return {
        kittyLayout: newConfig,
        windows: s.windows.map((w) =>
          w.isActive ? { ...w, layout: newLayout } : w,
        ),
      };
    });
  },

  updateKittyLayoutConfig: (config) => {
    set((s) => {
      const newConfig: KittyLayoutConfig = { ...s.kittyLayout, ...config };
      const win = s.windows.find((w) => w.isActive);
      if (!win) return { kittyLayout: newConfig };
      const newLayout = applyKittyLayout(win.layout, newConfig);
      return {
        kittyLayout: newConfig,
        windows: s.windows.map((w) =>
          w.isActive ? { ...w, layout: newLayout } : w,
        ),
      };
    });
  },

  cycleLayout: () => {
    const state = get();
    const currentIndex = state.enabledLayouts.indexOf(state.kittyLayout.type);
    const nextIndex = (currentIndex + 1) % state.enabledLayouts.length;
    state.setKittyLayout(state.enabledLayouts[nextIndex]);
  },

  setActivePaneIndex: (index) => set({ activePaneIndex: index }),

  addWindow: () => {
    const tab = createTab('editor', 'Untitled');
    tab.isActive = true;
    const pane = createPane([tab]);
    const win: WorkspaceWindow = {
      id: genId('win'),
      title: `Window ${get().windows.length + 1}`,
      layout: pane,
      isActive: true,
    };
    set((s) => ({
      windows: [...s.windows.map((w) => ({ ...w, isActive: false })), win],
      activeWindowId: win.id,
    }));
  },

  removeWindow: (id) =>
    set((s) => {
      const filtered = s.windows.filter((w) => w.id !== id);
      if (filtered.length === 0) return s;
      return {
        windows: filtered.map((w, i) =>
          i === filtered.length - 1 ? { ...w, isActive: true } : w
        ),
        activeWindowId: filtered[filtered.length - 1].id,
      };
    }),

  setActiveWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => ({ ...w, isActive: w.id === id })),
      activeWindowId: id,
    })),

  addTab: (paneId, toolType, title, filePath) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.isActive
          ? { ...w, layout: findPaneAndUpdate(w.layout, paneId, (pane) => {
              const newTab = createTab(toolType, title, filePath);
              newTab.isActive = true;
              return {
                ...pane,
                tabs: [...pane.tabs.map((t) => ({ ...t, isActive: false })), newTab],
                activeTabId: newTab.id,
              };
            })}
          : w
      ),
    })),

  removeTab: (paneId, tabId) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.isActive
          ? { ...w, layout: findPaneAndUpdate(w.layout, paneId, (pane) => {
              const filtered = pane.tabs.filter((t) => t.id !== tabId);
              const wasActive = pane.activeTabId === tabId;
              return {
                ...pane,
                tabs: filtered,
                activeTabId: wasActive
                  ? filtered[filtered.length - 1]?.id ?? null
                  : pane.activeTabId,
              };
            })}
          : w
      ),
    })),

  setActiveTab: (paneId, tabId) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.isActive
          ? { ...w, layout: findPaneAndUpdate(w.layout, paneId, (pane) => ({
              ...pane,
              tabs: pane.tabs.map((t) => ({ ...t, isActive: t.id === tabId })),
              activeTabId: tabId,
            }))}
          : w
      ),
    })),

  moveTab: (fromPaneId, toPaneId, tabId) => {
    const state = get();
    const win = state.windows.find((w) => w.isActive);
    if (!win) return;

    let movedTab: Tab | null = null;
    const afterRemove = findPaneAndUpdate(win.layout, fromPaneId, (pane) => {
      movedTab = pane.tabs.find((t) => t.id === tabId) ?? null;
      const filtered = pane.tabs.filter((t) => t.id !== tabId);
      return {
        ...pane,
        tabs: filtered,
        activeTabId:
          pane.activeTabId === tabId
            ? filtered[0]?.id ?? null
            : pane.activeTabId,
      };
    });

    if (!movedTab) return;
    const tabToMove: Tab = movedTab;

    const afterAdd = findPaneAndUpdate(afterRemove, toPaneId, (pane) => ({
      ...pane,
      tabs: [...pane.tabs, tabToMove],
      activeTabId: tabToMove.id,
    }));

    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === win.id ? { ...w, layout: afterAdd } : w
      ),
    }));
  },

  splitPane: (paneId, direction) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.isActive
          ? { ...w, layout: splitInLayout(w.layout, paneId, direction) }
          : w
      ),
    })),

  toggleFloating: (paneId) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.isActive
          ? { ...w, layout: findPaneAndUpdate(w.layout, paneId, (pane) => ({
              ...pane,
              isFloating: !pane.isFloating,
              floatingPosition: !pane.isFloating ? { x: 100, y: 100 } : undefined,
              floatingSize: !pane.isFloating ? { width: 400, height: 300 } : undefined,
            }))}
          : w
      ),
    })),

  maximizePane: () => {
    // Placeholder for maximize logic
  },

  toggleFolder: (nodeId) =>
    set((s) => ({
      files: updateFileNodes(s.files, nodeId, (node) => ({
        ...node,
        isExpanded: !node.isExpanded,
      })),
    })),

  openFile: (node) => {
    if (node.type !== 'file') return;
    const state = get();
    const win = state.windows.find((w) => w.isActive);
    if (!win) return;

    const firstPane = getFirstPane(win.layout);
    if (!firstPane) return;

    const existingTab = firstPane.tabs.find((t) => t.filePath === node.path);
    if (existingTab) {
      state.setActiveTab(firstPane.id, existingTab.id);
      return;
    }

    state.addTab(firstPane.id, 'editor', node.name, node.path);
  },

  createFile: (parentPath, name, type) =>
    set((s) => ({
      files: addChildToFolder(s.files, parentPath, {
        id: genId('file'),
        name,
        type,
        path: `${parentPath}/${name}`,
        children: type === 'folder' ? [] : undefined,
        content: type === 'file' ? '' : undefined,
      }),
    })),

  renameFile: (nodeId, newName) =>
    set((s) => ({
      files: updateFileNodes(s.files, nodeId, (node) => {
        const oldPath = node.path;
        const newPath = oldPath.replace(/[^/]+$/, newName);
        const updated: FileNode = {
          ...node,
          name: newName,
          path: newPath,
        };
        if (updated.children) {
          updated.children = updateChildrenPaths(updated.children, oldPath, newPath);
        }
        return updated;
      }),
    })),

  deleteFile: (nodeId) =>
    set((s) => ({
      files: updateFileNodes(s.files, nodeId, () => null),
    })),

  duplicateFile: (nodeId) =>
    set((s) => {
      const node = findFileNode(s.files, nodeId);
      if (!node) return s;
      const parentPath = node.path.substring(0, node.path.lastIndexOf('/'));
      const dupName = `${node.name.replace(/(\.\w+)$/, '')} (copy)${node.name.match(/\.\w+$/)?.[0] ?? ''}`;
      const newNode: FileNode = {
        ...node,
        id: genId('file'),
        name: dupName,
        path: `${parentPath}/${dupName}`,
      };
      if (node.children) {
        newNode.children = node.children.map((child) =>
          deepCloneFileNode(child, newNode.path)
        );
      }
      if (!parentPath) {
        return { files: [...s.files, newNode] };
      }
      return { files: addChildToFolder(s.files, parentPath, newNode) };
    }),

  toggleRunning: () =>
    set((s) => ({ isRunning: !s.isRunning })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setSpotlightOpen: (open) => set({ spotlightOpen: open }),
  updateSpotlight: (config) =>
    set((s) => ({ spotlight: { ...s.spotlight, ...config } })),

  addSecret: (name, value) =>
    set((s) => ({
      secrets: [...s.secrets, { key: genId('secret'), name, value, masked: true }],
    })),

  removeSecret: (key) =>
    set((s) => ({
      secrets: s.secrets.filter((sec) => sec.key !== key),
    })),
}));
