import { useEffect, useRef } from 'react';
import {
  Maximize2,
  SplitSquareHorizontal,
  SplitSquareVertical,
  Move,
  PanelTop,
  ExternalLink,
} from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { Pane } from '../../types/workspace';

interface PaneOptionsMenuProps {
  pane: Pane;
  onClose: () => void;
}

export function PaneOptionsMenu({ pane, onClose }: PaneOptionsMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { splitPane, toggleFloating, maximizePane, addWindow } = useWorkspaceStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="options-menu" style={{ right: 0, top: '100%' }}>
      <div className="options-menu-section">
        <div className="options-menu-label">Window</div>
        <button className="options-menu-item" onClick={() => { addWindow(); onClose(); }}>
          <ExternalLink size={14} /> Open New Window
        </button>
      </div>
      <div className="options-menu-divider" />
      <div className="options-menu-section">
        <div className="options-menu-label">Pane</div>
        <button className="options-menu-item" onClick={() => { splitPane(pane.id, 'horizontal'); onClose(); }}>
          <SplitSquareHorizontal size={14} /> Split Horizontally
        </button>
        <button className="options-menu-item" onClick={() => { splitPane(pane.id, 'vertical'); onClose(); }}>
          <SplitSquareVertical size={14} /> Split Vertically
        </button>
        <button className="options-menu-item" onClick={() => { maximizePane(pane.id); onClose(); }}>
          <Maximize2 size={14} /> Maximize Pane
        </button>
        <button className="options-menu-item" onClick={() => { toggleFloating(pane.id); onClose(); }}>
          <PanelTop size={14} /> {pane.isFloating ? 'Dock Pane' : 'Float Pane'}
        </button>
      </div>
      <div className="options-menu-divider" />
      <div className="options-menu-section">
        <div className="options-menu-label">Tab</div>
        <button className="options-menu-item" onClick={onClose}>
          <Move size={14} /> Move Tab to New Pane
        </button>
      </div>
    </div>
  );
}
