import { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, Shield } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';

export function SecretsTool() {
  const { secrets, addSecret, removeSecret } = useWorkspaceStore();
  const [newName, setNewName] = useState('');
  const [newValue, setNewValue] = useState('');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleReveal = (key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleAdd = () => {
    if (newName.trim()) {
      addSecret(newName.trim(), newValue);
      setNewName('');
      setNewValue('');
    }
  };

  return (
    <div className="secrets-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Shield size={18} color="var(--accent)" />
        <h3 style={{ margin: 0 }}>Secrets & API Keys</h3>
      </div>

      {secrets.map((secret) => (
        <div className="secret-item" key={secret.key}>
          <span className="secret-name">{secret.name}</span>
          <span className="secret-value">
            {revealed.has(secret.key) ? 'sk-abc123...xyz' : '••••••••••••'}
          </span>
          <button className="btn-icon" onClick={() => toggleReveal(secret.key)}>
            {revealed.has(secret.key) ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button className="btn-icon" onClick={() => removeSecret(secret.key)}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <input
          placeholder="SECRET_NAME"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            flex: 1,
            padding: '6px 10px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            fontSize: 13,
            fontFamily: 'monospace',
            outline: 'none',
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
        />
        <input
          type="password"
          placeholder="value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          style={{
            flex: 1,
            padding: '6px 10px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            fontSize: 13,
            outline: 'none',
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
        />
        <button className="btn btn-sm btn-primary" onClick={handleAdd}>
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
