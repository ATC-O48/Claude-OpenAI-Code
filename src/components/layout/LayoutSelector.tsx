import { useState, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  Columns,
  Rows,
  Square,
  PanelLeft,
  PanelTop,
  SplitSquareHorizontal,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { KittyLayoutType } from '../../types/workspace';
import { KITTY_LAYOUT_LABELS } from '../../types/workspace';

const LAYOUT_ICONS: Record<KittyLayoutType, LucideIcon> = {
  stack: Square,
  tall: PanelLeft,
  fat: PanelTop,
  grid: LayoutGrid,
  splits: SplitSquareHorizontal,
  horizontal: Columns,
  vertical: Rows,
};

const LAYOUT_DESCRIPTIONS: Record<KittyLayoutType, string> = {
  stack: 'Single window, others hidden',
  tall: 'Full-height left + stacked right',
  fat: 'Full-width top + tiled bottom',
  grid: 'Balanced grid of equal windows',
  splits: 'Manual split arrangement',
  horizontal: 'All windows side by side',
  vertical: 'All windows stacked vertically',
};

export function LayoutSelector() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { kittyLayout, setKittyLayout, updateKittyLayoutConfig, enabledLayouts } =
    useWorkspaceStore();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const CurrentIcon = LAYOUT_ICONS[kittyLayout.type];
  const showBiasControls =
    kittyLayout.type === 'tall' || kittyLayout.type === 'fat';

  return (
    <div ref={ref} className="layout-selector">
      <button
        className="layout-selector-trigger"
        onClick={() => setOpen(!open)}
        title="Switch Layout (Ctrl+Shift+L)"
      >
        <CurrentIcon size={14} />
        <span className="layout-selector-label">
          {KITTY_LAYOUT_LABELS[kittyLayout.type]}
        </span>
        <ChevronDown size={12} />
      </button>

      {open && (
        <div className="layout-selector-dropdown">
          <div className="layout-selector-header">Kitty Layouts</div>
          {enabledLayouts.map((layoutType) => {
            const Icon = LAYOUT_ICONS[layoutType];
            const isActive = kittyLayout.type === layoutType;
            return (
              <button
                key={layoutType}
                className={`layout-selector-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setKittyLayout(layoutType);
                  if (!showBiasControls || layoutType !== kittyLayout.type) {
                    setOpen(false);
                  }
                }}
              >
                <Icon size={16} />
                <div className="layout-selector-item-text">
                  <span className="layout-selector-item-name">
                    {KITTY_LAYOUT_LABELS[layoutType]}
                  </span>
                  <span className="layout-selector-item-desc">
                    {LAYOUT_DESCRIPTIONS[layoutType]}
                  </span>
                </div>
                {isActive && <span className="layout-selector-active-dot" />}
              </button>
            );
          })}

          {showBiasControls && (
            <>
              <div className="layout-selector-divider" />
              <div className="layout-selector-header">Layout Options</div>
              <div className="layout-selector-option">
                <label>Bias: {kittyLayout.bias}%</label>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={kittyLayout.bias}
                  onChange={(e) =>
                    updateKittyLayoutConfig({ bias: Number(e.target.value) })
                  }
                />
              </div>
              <div className="layout-selector-option">
                <label>Full-size panes: {kittyLayout.fullSize}</label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={kittyLayout.fullSize}
                  onChange={(e) =>
                    updateKittyLayoutConfig({ fullSize: Number(e.target.value) })
                  }
                />
              </div>
              <div className="layout-selector-option">
                <label>
                  <input
                    type="checkbox"
                    checked={kittyLayout.mirrored}
                    onChange={(e) =>
                      updateKittyLayoutConfig({ mirrored: e.target.checked })
                    }
                  />
                  Mirrored
                </label>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
