import { useWorkspaceStore } from '../../stores/workspaceStore';

export function PreviewTool() {
  const isRunning = useWorkspaceStore((s) => s.isRunning);

  return (
    <div className="tool-preview">
      <div className="tool-preview-bar">
        <div className="tool-preview-dots">
          <div className="tool-preview-dot" style={{ background: '#ff5f57' }} />
          <div className="tool-preview-dot" style={{ background: '#febc2e' }} />
          <div className="tool-preview-dot" style={{ background: '#28c840' }} />
        </div>
        <div className="tool-preview-url">
          {isRunning ? 'localhost:3000' : 'Not running'}
        </div>
      </div>
      <div className="tool-preview-content">
        {isRunning ? (
          <div>
            <h1 style={{ fontSize: 24, marginBottom: 12, color: '#1e1e2e' }}>
              Welcome to My App
            </h1>
            <p style={{ color: '#666', marginBottom: 16 }}>
              Your application is running. Edit your code and see changes in real-time.
            </p>
            <div
              style={{
                padding: 16,
                background: '#f0f4ff',
                borderRadius: 8,
                border: '1px solid #d0d8ff',
              }}
            >
              <p style={{ color: '#444', fontSize: 14 }}>
                Components loaded: 5 | API routes: 3 | Build time: 1.2s
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#999',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 18, marginBottom: 8 }}>App not running</p>
              <p style={{ fontSize: 14 }}>Click the Run button to start</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
