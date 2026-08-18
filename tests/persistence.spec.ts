import { test, expect } from '@playwright/test';
import { setupGame, playRound } from './helpers';

test.describe('Persistence', () => {
  test.beforeEach(async ({ request }) => {
    await request.delete('/api/state');
  });

  test('restores an in-progress game after a page reload', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    await playRound(page, { selectDouble: 6, scores: [0, 4, 8] });

    await page.reload();

    await expect(page.locator('.engine-banner')).toBeVisible();
    await expect(page.locator('.played-scroll .tile')).toHaveCount(1);
    await expect(page.locator('.board tr.totals td').nth(1)).toHaveText('0');
  });

  test('restores the finished-game screen after a reload', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    for (const d of [6, 5, 4, 3, 2, 1, 0]) {
      await playRound(page, { selectDouble: d, scores: [0, 5, 5] });
    }
    await expect(page.locator('.winner-banner')).toBeVisible();

    await page.reload();

    await expect(page.locator('.winner-banner')).toBeVisible();
    await expect(page.locator('.winner-banner h2')).toHaveText('Alice');
  });

  test('deleting state via the API resets to a fresh setup screen on next load', async ({
    page,
    request,
  }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    await playRound(page, { selectDouble: 6, scores: [0, 4, 8] });

    await request.delete('/api/state');
    await page.reload();

    await expect(page.locator('.double-picker')).toBeVisible();
    await expect(page.locator('.player-name')).toHaveCount(4);
  });
});
