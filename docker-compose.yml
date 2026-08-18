import { test, expect } from '@playwright/test';

test.describe('Setup screen', () => {
  test.beforeEach(async ({ request, page }) => {
    await request.delete('/api/state');
    await page.goto('/');
  });

  test('shows the default highest double and a 4-player list', async ({ page }) => {
    await expect(page.locator('.double-opt.active')).toHaveText('Double-12');
    await expect(page.locator('.player-name')).toHaveCount(4);
  });

  test('can pick a different highest double', async ({ page }) => {
    await page.locator('.double-opt', { hasText: 'Double-6' }).click();
    await expect(page.locator('.double-opt.active')).toHaveText('Double-6');
  });

  test('cannot add more than 8 players', async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      const addBtn = page.locator('#add-player');
      if (await addBtn.isDisabled()) break;
      await addBtn.click();
    }
    await expect(page.locator('.player-name')).toHaveCount(8);
    await expect(page.locator('#add-player')).toBeDisabled();
  });

  test('cannot remove below 3 players', async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      const removeBtn = page.locator('.remove-player').first();
      if (await removeBtn.isDisabled()) break;
      await removeBtn.click();
    }
    await expect(page.locator('.player-name')).toHaveCount(3);
    await expect(page.locator('.remove-player').first()).toBeDisabled();
  });

  test('blocks starting the game with a blank player name', async ({ page }) => {
    await page.locator('.player-name').first().fill('');
    await page.locator('#start-game').click();
    await expect(page.locator('.error-text')).toContainText('Every player needs a name');
  });

  test('starts a game and shows the first engine', async ({ page }) => {
    await page.locator('.double-opt', { hasText: 'Double-6' }).click();
    await page.locator('#start-game').click();
    await expect(page.locator('.engine-banner')).toBeVisible();
    await expect(page.locator('.round-num')).toHaveText('Double-6 Engine');
  });

  test('reset button clears previously saved state', async ({ page, request }) => {
    await request.put('/api/state', {
      data: {
        phase: 'setup',
        maxDouble: 9,
        players: ['X', 'Y', 'Z'],
        doublesLeft: [],
        doublesPlayed: [],
        currentDouble: null,
        rounds: [],
        setupError: '',
      },
    });
    await page.reload();
    await expect(page.locator('.double-opt.active')).toHaveText('Double-9');

    await page.locator('#reset-all').click();
    await expect(page.locator('.double-opt.active')).toHaveText('Double-12');
    await expect(page.locator('.player-name').first()).toHaveValue('Player 1');
  });
});
