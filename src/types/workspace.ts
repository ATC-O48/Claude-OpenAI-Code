export type ToolType =
  | 'editor'
  | 'preview'
  | 'console'
  | 'shell'
  | 'secrets'
  | 'file-history'
  | 'multiplayer'
  | 'user-settings'
  | 'agent';

export interface Tab {
  id: string;
  title: string;
  toolType: ToolType;
  icon?: string;
  filePath?: string;
  isActive: boolean;
  isDirty?: boolean;
}

export type SplitDirection = 'horizontal' | 'vertical';

export interface Pane {
  id: string;
  tabs: Tab[];
  activeTabId: string | null;
  isFloating: boolean;
  floatingPosition?: { x: number; y: number };
  floatingSize?: { width: number; height: number };
}

export interface PaneSplit {
  id: string;
  direction: SplitDirection;
  children: (Pane | PaneSplit)[];
  sizes: number[];
}

export interface WorkspaceWindow {
  id: string;
  title: string;
  layout: Pane | PaneSplit;
  isActive: boolean;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isExpanded?: boolean;
  content?: string;
  language?: string;
}

export interface ResourceUsage {
  ram: { used: number; total: number; unit: string };
  cpu: { usage: number; cores: number };
  storage: { used: number; total: number; unit: string };
}

export interface SearchResult {
  type: 'file' | 'text' | 'tool';
  title: string;
  description?: string;
  path?: string;
  line?: number;
  toolType?: ToolType;
}

export interface SpotlightConfig {
  projectName: string;
  description: string;
  coverImage?: string;
  isPublic: boolean;
  shareLink?: string;
}

export type KittyLayoutType =
  | 'stack'
  | 'tall'
  | 'fat'
  | 'grid'
  | 'splits'
  | 'horizontal'
  | 'vertical';

export interface KittyLayoutConfig {
  type: KittyLayoutType;
  bias: number;
  fullSize: number;
  mirrored: boolean;
  splitAxis: 'horizontal' | 'vertical' | 'auto';
}

export const KITTY_LAYOUT_LABELS: Record<KittyLayoutType, string> = {
  stack: 'Stack',
  tall: 'Tall',
  fat: 'Fat',
  grid: 'Grid',
  splits: 'Splits',
  horizontal: 'Horizontal',
  vertical: 'Vertical',
};

export const KITTY_LAYOUT_ORDER: KittyLayoutType[] = [
  'stack',
  'tall',
  'fat',
  'grid',
  'splits',
  'horizontal',
  'vertical',
];
