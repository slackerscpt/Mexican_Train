import { defineConfig, devices } from '@playwright/test';

/**
 * The app persists game state to a single data/state.json file on disk
 * (there's no per-session isolation), so tests run serially — one worker,
 * no parallel test files — and each spec resets state itself via
 * DELETE /api/state before it starts. Don't raise `workers` without also
 * giving each test its own state store.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Boots `npm start` automatically before the suite runs and reuses an
  // already-running dev server locally so you can `npm start` in one
  // terminal and re-run tests quickly in another.
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
