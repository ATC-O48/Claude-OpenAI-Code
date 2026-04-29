import { X, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { Pane, Tab } from '../../types/workspace';
import { ToolRenderer } from '../tools/ToolRenderer';
import { PaneOptionsMenu } from './PaneOptionsMenu';

interface PaneViewProps {
  pane: Pane;
}

export function PaneView({ pane }: PaneViewProps) {
  const { setActiveTab, removeTab } = useWorkspaceStore();
  const [showOptions, setShowOptions] = useState(false);

  const activeTab = pane.tabs.find((t) => t.id === pane.activeTabId) ?? pane.tabs[0];

  if (pane.tabs.length === 0) {
    return (
      <div className="pane" style={{ flex: 1 }}>
        <div className="pane-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          No tabs open
        </div>
      </div>
    );
  }

  return (
    <div className="pane" style={{ flex: 1 }}>
      <div className="pane-tabs">
        {pane.tabs.map((tab: Tab) => (
          <button
            key={tab.id}
            className={`pane-tab ${tab.id === pane.activeTabId ? 'active' : ''}`}
            onClick={() => setActiveTab(pane.id, tab.id)}
          >
            {tab.title}
            {tab.isDirty && <span style={{ color: 'var(--warning)' }}>*</span>}
            <button
              className="pane-tab-close"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(pane.id, tab.id);
              }}
            >
              <X size={12} />
            </button>
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <button className="btn-icon" onClick={() => setShowOptions(!showOptions)}>
            <MoreVertical size={16} />
          </button>
          {showOptions && (
            <PaneOptionsMenu
              pane={pane}
              onClose={() => setShowOptions(false)}
            />
          )}
        </div>
      </div>
      <div className="pane-content">
        {activeTab && <ToolRenderer tab={activeTab} paneId={pane.id} />}
      </div>
    </div>
  );
}
