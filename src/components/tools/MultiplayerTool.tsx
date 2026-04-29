import { Users, UserPlus } from 'lucide-react';

const users = [
  { name: 'You', status: 'Editing src/App.tsx', color: '#89b4fa', online: true },
  { name: 'Alice Chen', status: 'Viewing Preview', color: '#f38ba8', online: true },
  { name: 'Bob Smith', status: 'In Shell', color: '#a6e3a1', online: true },
  { name: 'Carol Zhang', status: 'Last seen 5m ago', color: '#f9e2af', online: false },
];

export function MultiplayerTool() {
  return (
    <div className="multiplayer-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Users size={18} color="var(--accent)" />
        <h3 style={{ margin: 0, fontSize: 14 }}>Multiplayer</h3>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {users.filter((u) => u.online).length} online
        </span>
      </div>

      {users.map((user, i) => (
        <div className="user-item" key={i}>
          <div className="user-avatar" style={{ background: user.color }}>
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-status">{user.status}</div>
          </div>
          {user.online && <div className="user-online" />}
        </div>
      ))}

      <button
        className="btn btn-sm"
        style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <UserPlus size={14} /> Invite Collaborator
      </button>
    </div>
  );
}
