import { Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';

function getBarClass(pct: number): string {
  if (pct < 50) return 'low';
  if (pct < 80) return 'mid';
  return 'high';
}

export function ResourcesPanel() {
  const resources = useWorkspaceStore((s) => s.resources);

  const ramPct = (resources.ram.used / resources.ram.total) * 100;
  const cpuPct = resources.cpu.usage;
  const storagePct = (resources.storage.used / resources.storage.total) * 100;

  return (
    <div className="resources-panel">
      <div className="resources-title">Resources</div>

      <div className="resource-item">
        <span className="resource-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <MemoryStick size={12} /> RAM
        </span>
        <div className="resource-bar">
          <div
            className={`resource-bar-fill ${getBarClass(ramPct)}`}
            style={{ width: `${ramPct}%` }}
          />
        </div>
        <span className="resource-value">
          {resources.ram.used} / {resources.ram.total} {resources.ram.unit}
        </span>
      </div>

      <div className="resource-item">
        <span className="resource-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Cpu size={12} /> CPU
        </span>
        <div className="resource-bar">
          <div
            className={`resource-bar-fill ${getBarClass(cpuPct)}`}
            style={{ width: `${cpuPct}%` }}
          />
        </div>
        <span className="resource-value">
          {cpuPct}% ({resources.cpu.cores} cores)
        </span>
      </div>

      <div className="resource-item">
        <span className="resource-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <HardDrive size={12} /> Disk
        </span>
        <div className="resource-bar">
          <div
            className={`resource-bar-fill ${getBarClass(storagePct)}`}
            style={{ width: `${storagePct}%` }}
          />
        </div>
        <span className="resource-value">
          {resources.storage.used} / {resources.storage.total} {resources.storage.unit}
        </span>
      </div>
    </div>
  );
}
