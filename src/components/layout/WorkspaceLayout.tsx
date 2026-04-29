import {
  Group,
  Panel,
  Separator,
} from 'react-resizable-panels';
import type { Pane, PaneSplit } from '../../types/workspace';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import { collectPanes } from '../../layouts/kittyLayouts';
import { PaneView } from './PaneView';

function isPaneSplit(layout: Pane | PaneSplit): layout is PaneSplit {
  return 'direction' in layout && 'children' in layout;
}

interface LayoutRendererProps {
  layout: Pane | PaneSplit;
}

function LayoutRenderer({ layout }: LayoutRendererProps) {
  if (!isPaneSplit(layout)) {
    return <PaneView pane={layout} />;
  }

  const orientation = layout.direction === 'horizontal' ? 'horizontal' : 'vertical';

  return (
    <Group orientation={orientation}>
      {layout.children.map((child, index) => (
        <div key={(child as Pane | PaneSplit).id} style={{ display: 'contents' }}>
          <Panel defaultSize={layout.sizes[index]} minSize={10}>
            <LayoutRenderer layout={child as Pane | PaneSplit} />
          </Panel>
          {index < layout.children.length - 1 && (
            <Separator
              style={{
                width: orientation === 'horizontal' ? '4px' : '100%',
                height: orientation === 'vertical' ? '4px' : '100%',
                background: 'var(--border)',
                cursor: orientation === 'horizontal' ? 'col-resize' : 'row-resize',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                (e.target as HTMLElement).style.background = 'var(--accent)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                (e.target as HTMLElement).style.background = 'var(--border)';
              }}
            />
          )}
        </div>
      ))}
    </Group>
  );
}

interface StackLayoutRendererProps {
  layout: Pane | PaneSplit;
}

function StackLayoutRenderer({ layout }: StackLayoutRendererProps) {
  const { activePaneIndex, setActivePaneIndex } = useWorkspaceStore();
  const panes = collectPanes(layout);

  if (panes.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        No panes open
      </div>
    );
  }

  const safeIndex = Math.min(activePaneIndex, panes.length - 1);
  const activePane = panes[safeIndex];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {panes.length > 1 && (
        <div className="stack-pane-tabs">
          {panes.map((pane, index) => {
            const label = pane.tabs[0]?.title ?? `Pane ${index + 1}`;
            return (
              <button
                key={pane.id}
                className={`stack-pane-tab ${index === safeIndex ? 'active' : ''}`}
                onClick={() => setActivePaneIndex(index)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PaneView pane={activePane} />
      </div>
    </div>
  );
}

interface WorkspaceLayoutProps {
  layout: Pane | PaneSplit;
}

export function WorkspaceLayout({ layout }: WorkspaceLayoutProps) {
  const { kittyLayout } = useWorkspaceStore();
  const isStack = kittyLayout.type === 'stack';

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {isStack ? (
        <StackLayoutRenderer layout={layout} />
      ) : (
        <LayoutRenderer layout={layout} />
      )}
    </div>
  );
}
