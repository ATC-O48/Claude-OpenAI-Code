import {
  Code,
  Eye,
  Terminal,
  TerminalSquare,
  Shield,
  History,
  Users,
  Settings,
  Bot,
  LayoutGrid,
} from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { ToolType } from '../../types/workspace';

interface DockTool {
  type: ToolType;
  label: string;
  icon: React.ReactNode;
}

const tools: DockTool[] = [
  { type: 'editor', label: 'Editor', icon: <Code size={18} /> },
  { type: 'preview', label: 'Preview', icon: <Eye size={18} /> },
  { type: 'console', label: 'Console', icon: <Terminal size={18} /> },
  { type: 'shell', label: 'Shell', icon: <TerminalSquare size={18} /> },
  { type: 'agent', label: 'Agent', icon: <Bot size={18} /> },
];

const extraTools: DockTool[] = [
  { type: 'secrets', label: 'Secrets', icon: <Shield size={18} /> },
  { type: 'file-history', label: 'History', icon: <History size={18} /> },
  { type: 'multiplayer', label: 'Collab', icon: <Users size={18} /> },
  { type: 'user-settings', label: 'Settings', icon: <Settings size={18} /> },
];

export function ToolsDock() {
  const { windows, activeWindowId, addTab } = useWorkspaceStore();

  const openTool = (tool: DockTool) => {
    const win = windows.find((w) => w.id === activeWindowId);
    if (!win) return;

    function findFirstPaneId(
      layout: { id: string; tabs?: unknown[]; children?: unknown[] }
    ): string | null {
      if ('tabs' in layout && layout.tabs) return layout.id;
      if ('children' in layout && layout.children) {
        for (const child of layout.children as { id: string; tabs?: unknown[]; children?: unknown[] }[]) {
          const id = findFirstPaneId(child);
          if (id) return id;
        }
      }
      return null;
    }

    const paneId = findFirstPaneId(win.layout as { id: string; tabs?: unknown[]; children?: unknown[] });
    if (paneId) {
      addTab(paneId, tool.type, tool.label);
    }
  };

  return (
    <div className="tools-dock">
      {tools.map((tool) => (
        <button
          key={tool.type}
          className="dock-item"
          onClick={() => openTool(tool)}
          title={tool.label}
        >
          {tool.icon}
          <span>{tool.label}</span>
        </button>
      ))}

      <div className="dock-separator" />

      {extraTools.map((tool) => (
        <button
          key={tool.type}
          className="dock-item"
          onClick={() => openTool(tool)}
          title={tool.label}
        >
          {tool.icon}
          <span>{tool.label}</span>
        </button>
      ))}

      <div className="dock-separator" />

      <button className="dock-item" title="All Tools">
        <LayoutGrid size={18} />
        <span>All Tools</span>
      </button>
    </div>
  );
}
