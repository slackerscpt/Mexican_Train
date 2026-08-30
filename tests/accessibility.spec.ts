import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { setupGame, playRound, playFullGame } from './helpers';

// Matches Accessibility Insights for Web's "Fast Pass": axe rules tagged as
// corresponding to WCAG 2.0/2.1 A and AA success criteria, excluding
// axe's "best practice" rules that aren't tied to a specific criterion.
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test.describe('Accessibility', () => {
  test.beforeEach(async ({ request }) => {
    await request.delete('/api/state');
  });

  test('setup screen has no detectable WCAG A/AA violations', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.double-picker')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });

  test('setup screen with a validation error has no detectable WCAG A/AA violations', async ({
    page,
  }) => {
    await page.goto('/');
    await page.locator('.player-name').first().fill('');
    await page.locator('#start-game').click();
    await expect(page.locator('.error-text')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });

  test('playing screen has no detectable WCAG A/AA violations', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });

  test('playing screen with standings visible has no detectable WCAG A/AA violations', async ({
    page,
  }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    await playRound(page, { selectDouble: 6, scores: [0, 4, 8] });

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });

  test('finished screen has no detectable WCAG A/AA violations', async ({ page }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    for (const d of [6, 5, 4, 3, 2, 1, 0]) {
      await playRound(page, { selectDouble: d, scores: [0, 5, 5] });
    }
    await expect(page.locator('.winner-banner')).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });

  test('finished screen with a tiebreaker card has no detectable WCAG A/AA violations', async ({
    page,
  }) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    // Forces a tie resolved by the zero-rounds tiebreaker so the "How the
    // tie was broken" card renders too (see tiebreaker.spec.ts for the math).
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
    await expect(page.locator('.card', { hasText: 'How the tie was broken' })).toBeVisible();

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    expect(results.violations).toEqual([]);
  });
});
