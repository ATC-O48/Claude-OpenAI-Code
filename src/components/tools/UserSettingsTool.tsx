import { useState } from 'react';
import { Settings } from 'lucide-react';

interface ToggleSwitchProps {
  active: boolean;
  onToggle: () => void;
}

function ToggleSwitch({ active, onToggle }: ToggleSwitchProps) {
  return (
    <button className={`toggle ${active ? 'active' : ''}`} onClick={onToggle}>
      <div className="toggle-dot" />
    </button>
  );
}

export function UserSettingsTool() {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    minimap: false,
    wordWrap: true,
    formatOnSave: true,
    lineNumbers: true,
    bracketMatching: true,
    notifications: true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="settings-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Settings size={18} color="var(--accent)" />
        <h3 style={{ margin: 0, fontSize: 15 }}>User Settings</h3>
      </div>

      <div className="settings-section">
        <h4>Appearance</h4>
        <div className="setting-row">
          <span className="setting-label">Dark Mode</span>
          <ToggleSwitch active={settings.darkMode} onToggle={() => toggle('darkMode')} />
        </div>
        <div className="setting-row">
          <span className="setting-label">Minimap</span>
          <ToggleSwitch active={settings.minimap} onToggle={() => toggle('minimap')} />
        </div>
        <div className="setting-row">
          <span className="setting-label">Line Numbers</span>
          <ToggleSwitch active={settings.lineNumbers} onToggle={() => toggle('lineNumbers')} />
        </div>
      </div>

      <div className="settings-section">
        <h4>Editor</h4>
        <div className="setting-row">
          <span className="setting-label">Auto Save</span>
          <ToggleSwitch active={settings.autoSave} onToggle={() => toggle('autoSave')} />
        </div>
        <div className="setting-row">
          <span className="setting-label">Word Wrap</span>
          <ToggleSwitch active={settings.wordWrap} onToggle={() => toggle('wordWrap')} />
        </div>
        <div className="setting-row">
          <span className="setting-label">Format on Save</span>
          <ToggleSwitch active={settings.formatOnSave} onToggle={() => toggle('formatOnSave')} />
        </div>
        <div className="setting-row">
          <span className="setting-label">Bracket Matching</span>
          <ToggleSwitch active={settings.bracketMatching} onToggle={() => toggle('bracketMatching')} />
        </div>
      </div>

      <div className="settings-section">
        <h4>General</h4>
        <div className="setting-row">
          <span className="setting-label">Notifications</span>
          <ToggleSwitch active={settings.notifications} onToggle={() => toggle('notifications')} />
        </div>
      </div>
    </div>
  );
}
