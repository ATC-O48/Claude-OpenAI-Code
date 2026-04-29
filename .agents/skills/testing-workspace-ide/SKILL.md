# Testing Workspace IDE — Layout System

## Overview
The workspace IDE has a kitty terminal emulator-inspired layout system with 7 layout modes: Stack, Tall, Fat, Grid, Splits, Horizontal, Vertical. These are selectable via a LayoutSelector dropdown in the TopBar and cyclable via Ctrl+Shift+L.

## Dev Server Setup
1. `cd` to the repo root
2. Run `npm install` then `npm run dev`
3. App runs at `http://localhost:5174` (Vite dev server)
4. Default state: Splits layout with 3 panes (Editor, Preview, Console)

## Key UI Elements
- **LayoutSelector**: TopBar button near top-right showing current layout name + dropdown arrow. Click to open dropdown with all 7 layout options.
- **Layout Options panel**: When Tall or Fat is selected, the dropdown shows extra controls: Bias slider (10-90%), Full-size panes slider (1-5), Mirrored checkbox.
- **Stack mode tab bar**: When Stack layout is active, a pane tab bar appears at the top of the workspace area with tabs for each pane.
- **Keyboard shortcut**: Ctrl+Shift+L cycles through enabled layouts sequentially.

## Testing Procedures

### Layout Switching
- Click LayoutSelector dropdown → select each layout → verify:
  - TopBar label updates to match selected layout name
  - Pane arrangement visually changes (each layout should look different)
- All 7 layouts should produce distinct visual arrangements with 3 panes

### Stack Mode Tab Switching
- Switch to Stack layout → verify only one pane visible at a time
- Click each tab in the pane tab bar → verify content changes (Editor shows code, Preview shows "App not running", Console shows placeholder text)

### Config Controls (Tall/Fat)
- Switch to Tall layout → open dropdown to see Layout Options
- Adjust Bias slider → verify main pane width changes visually
- Toggle Mirrored checkbox → verify layout flips left/right (Tall) or top/bottom (Fat)
- **Tip**: Range input sliders may be hard to drag precisely via computer-use tools. Use JavaScript via browser console to set slider values:
  ```js
  const slider = document.querySelector('input[type="range"]');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(slider, 75);
  slider.dispatchEvent(new Event('input', { bubbles: true }));
  slider.dispatchEvent(new Event('change', { bubbles: true }));
  ```

### Keyboard Shortcut
- Press Ctrl+Shift+L multiple times → verify TopBar label changes to next layout in cycle order
- Layout order: stack → tall → fat → grid → splits → horizontal → vertical (then wraps)

## Tips & Known Issues
- The LayoutSelector dropdown closes when clicking a different layout. To see Layout Options for Tall/Fat, you may need to click the dropdown button again after switching.
- Stack mode is the most visually distinct — only one pane visible with tab bar. Good baseline for verifying layout switching works.
- Bias and Mirrored controls only appear for Tall and Fat layouts.
- The app uses Zustand for state management. Layout state is in `workspaceStore` under `kittyLayout`.
- CI runs build check and Devin Review. No automated test suite exists — testing is manual/E2E via browser.

## Devin Secrets Needed
None — the app runs locally with no authentication required.
