import { test, expect } from '@playwright/test';
import { setupGame, playRound, playFullGame } from './helpers';

test.describe('Gameplay', () => {
  test.beforeEach(async ({ request }) => {
    await request.delete('/api/state');
  });

  test('lets the scorekeeper choose which double is currently in play', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    // Defaults to the highest double
    await expect(page.locator('.round-num')).toHaveText('Double-6 Engine');

    // Manually jump to a lower double, out of sequence
    await page.locator('.select-double[data-n="2"]').click();
    await expect(page.locator('.round-num')).toHaveText('Double-2 Engine');
    await expect(page.locator('.select-double[data-n="2"] .tile-label')).toHaveText('in play');
  });

  test('records a round and moves that double to "already played"', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    await playRound(page, { selectDouble: 6, scores: [0, 4, 8] });

    await expect(page.locator('.played-scroll .tile')).toHaveCount(1);
    await expect(page.locator('.track-scroll .tile-slot')).toHaveCount(6);
    await expect(page.locator('.board tr.totals td').nth(1)).toHaveText('0');
  });

  test('can undo the last round', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    await playRound(page, { selectDouble: 6, scores: [0, 4, 8] });
    await expect(page.locator('.played-scroll .tile')).toHaveCount(1);

    await page.locator('#undo-round').click();
    await expect(page.locator('.played-scroll .tile')).toHaveCount(0);
    await expect(page.locator('.round-num')).toHaveText('Double-6 Engine');
  });

  test('completes a full game and declares the lowest total the winner', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    await playFullGame(
      page,
      [6, 5, 4, 3, 2, 1, 0],
      [
        [0, 10, 12],
        [1, 9, 11],
        [0, 8, 10],
        [2, 7, 9],
        [1, 6, 8],
        [0, 5, 7],
        [3, 4, 6],
      ]
    );

    await expect(page.locator('.winner-banner h2')).toHaveText('Alice');
    await expect(page.locator('.winner-banner .score')).toContainText('Lowest total score');
    await expect(page.locator('.card', { hasText: 'How the tie was broken' })).toHaveCount(0);
  });

  test('undo from the results screen goes back to playing', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    await playFullGame(
      page,
      [6, 5, 4, 3, 2, 1, 0],
      [
        [0, 10, 12],
        [1, 9, 11],
        [0, 8, 10],
        [2, 7, 9],
        [1, 6, 8],
        [0, 5, 7],
        [3, 4, 6],
      ]
    );
    await expect(page.locator('.winner-banner')).toBeVisible();

    await page.locator('#undo-final').click();
    await expect(page.locator('.engine-banner')).toBeVisible();
    await expect(page.locator('.round-num')).toHaveText('Double-0 Engine');
  });
});
