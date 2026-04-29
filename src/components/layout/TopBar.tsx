import { Plus, X, Search, Play, Square } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';

export function TopBar() {
  const {
    windows,
    activeWindowId,
    setActiveWindow,
    addWindow,
    removeWindow,
    isRunning,
    toggleRunning,
    setSearchOpen,
  } = useWorkspaceStore();

  return (
    <div className="top-bar">
      <div className="window-tabs">
        {windows.map((win) => (
          <div key={win.id} style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className={`window-tab ${win.id === activeWindowId ? 'active' : ''}`}
              onClick={() => setActiveWindow(win.id)}
            >
              {win.title}
            </button>
            {windows.length > 1 && (
              <button
                className="btn-icon"
                style={{ width: 20, height: 20 }}
                onClick={() => removeWindow(win.id)}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        <button className="btn-icon" onClick={addWindow} title="New Window">
          <Plus size={16} />
        </button>
      </div>

      <button
        className="btn-icon"
        onClick={() => setSearchOpen(true)}
        title="Search (Ctrl+K)"
      >
        <Search size={16} />
      </button>

      <button
        className={`run-button ${isRunning ? 'running' : 'idle'}`}
        onClick={toggleRunning}
      >
        {isRunning ? (
          <>
            <Square size={14} />
            Stop
          </>
        ) : (
          <>
            <Play size={14} />
            Run
          </>
        )}
      </button>
    </div>
  );
}
