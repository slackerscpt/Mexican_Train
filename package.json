import { test, expect } from '@playwright/test';
import { setupGame, playFullGame } from './helpers';

test.describe('Tiebreakers', () => {
  test.beforeEach(async ({ request }) => {
    await request.delete('/api/state');
  });

  test('resolves a tied total using the most-zero-rounds tiebreaker', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    // Alice and Bob both finish with 10 total pips, but Alice went out
    // (scored 0) in 6 of 7 rounds vs Bob's 5, so Alice should win.
    await playFullGame(
      page,
      [6, 5, 4, 3, 2, 1, 0],
      [
        [0, 0, 5],
        [0, 0, 5],
        [0, 0, 5],
        [0, 0, 5],
        [0, 0, 5],
        [0, 5, 5],
        [10, 5, 5],
      ]
    );

    await expect(page.locator('.winner-banner .eyebrow')).toHaveText('Last stop — winner');
    await expect(page.locator('.winner-banner h2')).toHaveText('Alice');
    await expect(page.locator('.winner-banner .score')).toContainText('most rounds won with 0 points');

    const tiebreakCard = page.locator('.card', { hasText: 'How the tie was broken' });
    await expect(tiebreakCard).toBeVisible();
    await expect(tiebreakCard.locator('td.winner-cell')).toHaveText('6');
  });

  test('falls through to the lowest-non-zero-round tiebreaker', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    // Alice and Bob tie on total (14) and on zero-rounds (0 each — neither
    // ever went out), but Bob's lowest non-zero round (1) beats Alice's (2).
    await playFullGame(
      page,
      [6, 5, 4, 3, 2, 1, 0],
      [
        [2, 1, 5],
        [2, 3, 5],
        [2, 2, 5],
        [2, 2, 5],
        [2, 2, 5],
        [2, 2, 5],
        [2, 2, 5],
      ]
    );

    await expect(page.locator('.winner-banner h2')).toHaveText('Bob');
    await expect(page.locator('.winner-banner .score')).toContainText('lowest single non-zero round score');
  });

  test('declares a shared tie when every tiebreaker is equal', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    // Alice and Bob score identically every round; Carla scores worse throughout.
    await playFullGame(
      page,
      [6, 5, 4, 3, 2, 1, 0],
      [
        [3, 3, 9],
        [3, 3, 9],
        [3, 3, 9],
        [3, 3, 9],
        [3, 3, 9],
        [3, 3, 9],
        [3, 3, 9],
      ]
    );

    await expect(page.locator('.winner-banner .eyebrow')).toHaveText('Last stop — a tie');
    await expect(page.locator('.winner-banner h2')).toHaveText('Alice & Bob');
    await expect(page.locator('.winner-banner .score')).toContainText('Still tied after all tiebreakers');
  });
});
