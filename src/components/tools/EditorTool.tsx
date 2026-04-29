import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { FileNode } from '../../types/workspace';

interface EditorToolProps {
  filePath?: string;
}

function findByPath(nodes: FileNode[], path: string): FileNode | null {
  for (const node of nodes) {
    if (node.path === path) return node;
    if (node.children) {
      const found = findByPath(node.children, path);
      if (found) return found;
    }
  }
  return null;
}

export function EditorTool({ filePath }: EditorToolProps) {
  const files = useWorkspaceStore((s) => s.files);

  if (!filePath) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 16, marginBottom: 8 }}>No file selected</p>
          <p style={{ fontSize: 13 }}>Open a file from the file tree to start editing</p>
        </div>
      </div>
    );
  }

  const file = findByPath(files, filePath);
  const content = file?.content ?? '// File not found';
  const lines = content.split('\n');

  return (
    <div className="tool-editor">
      {lines.map((line, i) => (
        <div className="line" key={i}>
          <span className="line-number">{i + 1}</span>
          <span className="line-content">{line || ' '}</span>
        </div>
      ))}
    </div>
  );
}
