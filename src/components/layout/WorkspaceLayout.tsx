import {
  Group,
  Panel,
  Separator,
} from 'react-resizable-panels';
import type { Pane, PaneSplit } from '../../types/workspace';
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

interface WorkspaceLayoutProps {
  layout: Pane | PaneSplit;
}

export function WorkspaceLayout({ layout }: WorkspaceLayoutProps) {
  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <LayoutRenderer layout={layout} />
    </div>
  );
}
