import { useWorkspaceStore } from '../../stores/workspaceStore';

const sampleLogs = [
  { time: '10:23:01', level: 'info' as const, message: 'Server starting on port 3000...' },
  { time: '10:23:02', level: 'info' as const, message: 'Connected to database' },
  { time: '10:23:02', level: 'log' as const, message: 'Loading 5 middleware modules' },
  { time: '10:23:03', level: 'warn' as const, message: 'Deprecated API usage in /api/v1/users' },
  { time: '10:23:03', level: 'info' as const, message: 'API routes registered: GET /api/health, POST /api/auth' },
  { time: '10:23:04', level: 'error' as const, message: 'Failed to load optional plugin: analytics-tracker' },
  { time: '10:23:04', level: 'info' as const, message: 'Hot reload enabled' },
  { time: '10:23:05', level: 'log' as const, message: 'Build completed in 1.2s' },
];

export function ConsoleTool() {
  const isRunning = useWorkspaceStore((s) => s.isRunning);

  return (
    <div className="tool-console">
      {isRunning ? (
        sampleLogs.map((log, i) => (
          <div className="console-line" key={i}>
            <span className="console-timestamp">[{log.time}]</span>
            <span className={`console-level ${log.level}`}>
              {log.level.toUpperCase()}
            </span>
            <span>{log.message}</span>
          </div>
        ))
      ) : (
        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Console output will appear here when the app is running.
        </div>
      )}
    </div>
  );
}
