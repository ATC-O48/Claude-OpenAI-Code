import { useEffect } from 'react';
import { useWorkspaceStore } from './stores/workspaceStore';
import { FileTree } from './components/filetree/FileTree';
import { TopBar } from './components/layout/TopBar';
import { WorkspaceLayout } from './components/layout/WorkspaceLayout';
import { ToolsDock } from './components/toolbar/ToolsDock';
import { SearchBar } from './components/search/SearchBar';
import { ResourcesPanel } from './components/resources/ResourcesPanel';
import { SpotlightPage } from './components/spotlight/SpotlightPage';

export default function App() {
  const {
    windows,
    activeWindowId,
    searchOpen,
    spotlightOpen,
    setSearchOpen,
    cycleLayout,
  } = useWorkspaceStore();

  const activeWindow = windows.find((w) => w.id === activeWindowId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        cycleLayout();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setSearchOpen, cycleLayout]);

  return (
    <div className="workspace-layout">
      <aside className="sidebar">
        <FileTree />
        <ResourcesPanel />
      </aside>

      <div className="main-area">
        <TopBar />
        {activeWindow && <WorkspaceLayout layout={activeWindow.layout} />}
        <ToolsDock />
      </div>

      {searchOpen && <SearchBar />}
      {spotlightOpen && <SpotlightPage />}
    </div>
  );
}
