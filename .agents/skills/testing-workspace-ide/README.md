# Testing Workspace IDE

## Overview

This skill provides guidance for testing the Workspace IDE application, covering both unit tests with Vitest and end-to-end tests with Playwright.

## Dev Server Setup

```bash
cd Claude-OpenAI-Code
npm install
npm run dev
```

The app runs at `http://localhost:5173` (Vite dev server). Default state: Splits layout with 3 panes (Editor, Preview, Console).

---

## Unit Testing with Vitest

### Setup

```bash
# Install Vitest (if not already installed)
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Add test script to package.json
# "test": "vitest",
# "test:coverage": "vitest --coverage"
```

### Configuration

Create `vitest.config.ts` at the project root:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
```

### Writing Tests

```typescript
// src/components/layout/__tests__/TopBar.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopBar } from '../TopBar';

describe('TopBar', () => {
  it('renders the workspace tabs', () => {
    render(<TopBar />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
npm run test          # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npx vitest run        # Run tests once (CI mode)
```

---

## E2E Testing with Playwright

### Setup

```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install chromium
```

### Configuration

Create `playwright.config.ts` at the project root:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
});
```

### Writing E2E Tests

```typescript
// e2e/workspace.spec.ts
import { test, expect } from '@playwright/test';

test('workspace loads with default layout', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#root')).toBeVisible();
});

test('can switch layout modes', async ({ page }) => {
  await page.goto('/');
  // Click layout selector
  // Verify layout changes
});

test('global search opens with Ctrl+K', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  // Verify search modal is visible
});
```

### Running E2E Tests

```bash
npx playwright test               # Run all E2E tests
npx playwright test --headed      # Run with browser visible
npx playwright test --ui          # Open Playwright UI
npx playwright show-report        # View test report
```

---

## Key UI Elements to Test

| Element | Location | What to Verify |
|---------|----------|---------------|
| **LayoutSelector** | TopBar, top-right | Dropdown opens, layout name updates |
| **File Tree** | Left sidebar | Files list, context menu, CRUD operations |
| **Tools Dock** | Bottom toolbar | Tool buttons open correct panes |
| **Search Bar** | Ctrl+K modal | Opens/closes, shows results |
| **Resources Panel** | Bottom sidebar | Shows RAM, CPU, Storage bars |
| **Spotlight** | Click project name | Settings page opens |
| **Pane Options** | Three dots icon | Split, maximize, float options |

## Tips

- No authentication required — the app runs fully locally.
- CI runs build check via GitHub Actions. No automated test suite exists by default.
- The app uses Zustand for state management. Layout state is in `workspaceStore` under `kittyLayout`.
- Layout modes: Stack, Tall, Fat, Grid, Splits, Horizontal, Vertical.
