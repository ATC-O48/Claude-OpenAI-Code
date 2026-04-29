import { History } from 'lucide-react';

const historyItems = [
  { time: '2 min ago', action: 'Modified', file: 'src/App.tsx', user: 'You' },
  { time: '5 min ago', action: 'Created', file: 'src/utils/helpers.ts', user: 'You' },
  { time: '12 min ago', action: 'Modified', file: 'package.json', user: 'You' },
  { time: '18 min ago', action: 'Renamed', file: 'src/styles/global.css', user: 'You' },
  { time: '25 min ago', action: 'Deleted', file: 'src/old-component.tsx', user: 'Alice' },
  { time: '30 min ago', action: 'Modified', file: 'README.md', user: 'Bob' },
  { time: '1 hr ago', action: 'Created', file: 'tsconfig.json', user: 'You' },
];

export function FileHistoryTool() {
  return (
    <div className="file-history">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <History size={18} color="var(--accent)" />
        <h3 style={{ margin: 0, fontSize: 14 }}>File History</h3>
      </div>
      {historyItems.map((item, i) => (
        <div className="history-item" key={i}>
          <span className="history-time">{item.time}</span>
          <span className="history-action">
            {item.user} {item.action.toLowerCase()}
          </span>
          <span className="history-file">{item.file}</span>
        </div>
      ))}
    </div>
  );
}
