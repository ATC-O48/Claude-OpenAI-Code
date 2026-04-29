import { useEffect, useRef } from 'react';
import {
  Copy,
  Pencil,
  Trash2,
  Download,
  FilePlus,
  FolderPlus,
  ExternalLink,
} from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { FileNode } from '../../types/workspace';

interface FileContextMenuProps {
  x: number;
  y: number;
  node: FileNode;
  onClose: () => void;
  onNewFile: (parentPath: string, type: 'file' | 'folder') => void;
}

export function FileContextMenu({ x, y, node, onClose, onNewFile }: FileContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { deleteFile, duplicateFile, renameFile, openFile } = useWorkspaceStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleRename = () => {
    const newName = prompt('New name:', node.name);
    if (newName && newName !== node.name) {
      renameFile(node.id, newName);
    }
    onClose();
  };

  const handleDownload = () => {
    const content = node.content ?? '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = node.name;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      {node.type === 'file' && (
        <button
          className="context-menu-item"
          onClick={() => {
            openFile(node);
            onClose();
          }}
        >
          <ExternalLink size={14} /> Open in Editor
        </button>
      )}
      {node.type === 'folder' && (
        <>
          <button
            className="context-menu-item"
            onClick={() => onNewFile(node.path, 'file')}
          >
            <FilePlus size={14} /> New File
          </button>
          <button
            className="context-menu-item"
            onClick={() => onNewFile(node.path, 'folder')}
          >
            <FolderPlus size={14} /> New Folder
          </button>
          <div className="context-menu-divider" />
        </>
      )}
      <button className="context-menu-item" onClick={handleRename}>
        <Pencil size={14} /> Rename
      </button>
      <button
        className="context-menu-item"
        onClick={() => {
          duplicateFile(node.id);
          onClose();
        }}
      >
        <Copy size={14} /> Duplicate
      </button>
      {node.type === 'file' && (
        <button className="context-menu-item" onClick={handleDownload}>
          <Download size={14} /> Download
        </button>
      )}
      <div className="context-menu-divider" />
      <button
        className="context-menu-item danger"
        onClick={() => {
          deleteFile(node.id);
          onClose();
        }}
      >
        <Trash2 size={14} /> Delete
      </button>
    </div>
  );
}
