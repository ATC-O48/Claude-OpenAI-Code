import { useEffect, useRef } from 'react';
import { Share2, Globe, Lock, Copy, X } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';

export function SpotlightPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { spotlight, updateSpotlight, setSpotlightOpen } = useWorkspaceStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSpotlightOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setSpotlightOpen]);

  const copyLink = () => {
    if (spotlight.shareLink) {
      navigator.clipboard.writeText(spotlight.shareLink);
    }
  };

  return (
    <div className="spotlight-overlay" onClick={() => setSpotlightOpen(false)}>
      <div ref={ref} className="spotlight-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="spotlight-cover">
          <div className="spotlight-cover-icon">
            <Share2 size={28} color="white" />
          </div>
        </div>

        <div className="spotlight-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>{spotlight.projectName}</h2>
            <button className="btn-icon" onClick={() => setSpotlightOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <p>{spotlight.description}</p>

          <div className="spotlight-field">
            <label>Project Name</label>
            <input
              value={spotlight.projectName}
              onChange={(e) => updateSpotlight({ projectName: e.target.value })}
            />
          </div>

          <div className="spotlight-field">
            <label>Description</label>
            <input
              value={spotlight.description}
              onChange={(e) => updateSpotlight({ description: e.target.value })}
            />
          </div>

          <div className="spotlight-field">
            <label>Visibility</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button
                className={`btn btn-sm ${spotlight.isPublic ? 'btn-primary' : ''}`}
                onClick={() => updateSpotlight({ isPublic: true })}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Globe size={14} /> Public
              </button>
              <button
                className={`btn btn-sm ${!spotlight.isPublic ? 'btn-primary' : ''}`}
                onClick={() => updateSpotlight({ isPublic: false })}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Lock size={14} /> Private
              </button>
            </div>
          </div>
        </div>

        <div className="spotlight-actions">
          {spotlight.shareLink && (
            <button
              className="btn btn-sm"
              onClick={copyLink}
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <Copy size={14} /> Copy Share Link
            </button>
          )}
          <button
            className="btn btn-sm btn-primary"
            style={{ marginLeft: 'auto' }}
            onClick={() => setSpotlightOpen(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
