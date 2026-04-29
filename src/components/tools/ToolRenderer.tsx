import type { Tab } from '../../types/workspace';
import { EditorTool } from './EditorTool';
import { PreviewTool } from './PreviewTool';
import { ConsoleTool } from './ConsoleTool';
import { ShellTool } from './ShellTool';
import { SecretsTool } from './SecretsTool';
import { FileHistoryTool } from './FileHistoryTool';
import { MultiplayerTool } from './MultiplayerTool';
import { UserSettingsTool } from './UserSettingsTool';
import { AgentTool } from './AgentTool';

interface ToolRendererProps {
  tab: Tab;
  paneId: string;
}

export function ToolRenderer({ tab }: ToolRendererProps) {
  switch (tab.toolType) {
    case 'editor':
      return <EditorTool filePath={tab.filePath} />;
    case 'preview':
      return <PreviewTool />;
    case 'console':
      return <ConsoleTool />;
    case 'shell':
      return <ShellTool />;
    case 'secrets':
      return <SecretsTool />;
    case 'file-history':
      return <FileHistoryTool />;
    case 'multiplayer':
      return <MultiplayerTool />;
    case 'user-settings':
      return <UserSettingsTool />;
    case 'agent':
      return <AgentTool />;
    default:
      return (
        <div style={{ padding: 16, color: 'var(--text-muted)' }}>
          Unknown tool: {tab.toolType}
        </div>
      );
  }
}
