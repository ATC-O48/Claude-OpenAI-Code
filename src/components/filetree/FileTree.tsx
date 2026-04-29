import { useState, useCallback } from 'react';
import {
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  Plus,
  FilePlus,
  FolderPlus,
} from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { FileNode } from '../../types/workspace';
import { FileContextMenu } from './FileContextMenu';

interface FileNodeItemProps {
  node: FileNode;
  depth: number;
  onContextMenu: (e: React.MouseEvent, node: FileNode) => void;
}

function FileNodeItem({ node, depth, onContextMenu }: FileNodeItemProps) {
  const { toggleFolder, openFile } = useWorkspaceStore();

  const handleClick = () => {
    if (node.type === 'folder') {
      toggleFolder(node.id);
    } else {
      openFile(node);
    }
  };

  return (
    <>
      <div
        className="file-node"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
        onContextMenu={(e) => onContextMenu(e, node)}
      >
        {node.type === 'folder' && (
          <span className={`file-node-chevron ${node.isExpanded ? 'expanded' : ''}`}>
            <ChevronRight size={14} />
          </span>
        )}
        {node.type !== 'folder' && <span style={{ width: 18 }} />}
        <span className="file-node-icon">
          {node.type === 'folder' ? (
            node.isExpanded ? (
              <FolderOpen size={16} color="#89b4fa" />
            ) : (
              <Folder size={16} color="#89b4fa" />
            )
          ) : (
            <File size={16} color="#a6adc8" />
          )}
        </span>
        <span className="file-node-name">{node.name}</span>
      </div>
      {node.type === 'folder' && node.isExpanded && node.children && (
        <>
          {node.children.map((child) => (
            <FileNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              onContextMenu={onContextMenu}
            />
          ))}
        </>
      )}
    </>
  );
}

export function FileTree() {
  const { files, spotlight, setSpotlightOpen, createFile } = useWorkspaceStore();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    node: FileNode;
  } | null>(null);
  const [newFileDialog, setNewFileDialog] = useState<{
    parentPath: string;
    type: 'file' | 'folder';
  } | null>(null);
  const [newFileName, setNewFileName] = useState('');

  const handleContextMenu = useCallback(
    (e: React.MouseEvent, node: FileNode) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, node });
    },
    []
  );

  const handleNewFile = (parentPath: string, type: 'file' | 'folder') => {
    setNewFileDialog({ parentPath, type });
    setNewFileName('');
    setContextMenu(null);
  };

  const handleCreateFile = () => {
    if (newFileDialog && newFileName.trim()) {
      createFile(newFileDialog.parentPath, newFileName.trim(), newFileDialog.type);
      setNewFileDialog(null);
    }
  };

  return (
    <>
      <div
        className="sidebar-header"
        onClick={() => setSpotlightOpen(true)}
      >
        <h2>{spotlight.projectName}</h2>
      </div>

      <div style={{ padding: '8px 12px', display: 'flex', gap: 4 }}>
        <button
          className="btn-icon"
          title="New File"
          onClick={() => handleNewFile('/src', 'file')}
        >
          <FilePlus size={16} />
        </button>
        <button
          className="btn-icon"
          title="New Folder"
          onClick={() => handleNewFile('/src', 'folder')}
        >
          <FolderPlus size={16} />
        </button>
        <button className="btn-icon" title="New..." onClick={() => handleNewFile('/', 'file')}>
          <Plus size={16} />
        </button>
      </div>

      <div className="file-tree">
        {files.map((node) => (
          <FileNodeItem
            key={node.id}
            node={node}
            depth={0}
            onContextMenu={handleContextMenu}
          />
        ))}
      </div>

      {contextMenu && (
        <FileContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextMenu.node}
          onClose={() => setContextMenu(null)}
          onNewFile={handleNewFile}
        />
      )}

      {newFileDialog && (
        <div className="new-file-dialog" onClick={() => setNewFileDialog(null)}>
          <div className="new-file-form" onClick={(e) => e.stopPropagation()}>
            <h3>
              {newFileDialog.type === 'file' ? 'New File' : 'New Folder'}
            </h3>
            <input
              autoFocus
              placeholder={newFileDialog.type === 'file' ? 'filename.ts' : 'folder-name'}
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFile();
                if (e.key === 'Escape') setNewFileDialog(null);
              }}
            />
            <div className="new-file-form-actions">
              <button className="btn btn-sm" onClick={() => setNewFileDialog(null)}>
                Cancel
              </button>
              <button className="btn btn-sm btn-primary" onClick={handleCreateFile}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
