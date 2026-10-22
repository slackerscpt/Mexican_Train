import { test, expect, Page, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { setupGame, playRound, playFullGame } from './helpers';

// Matches Accessibility Insights for Web's "Fast Pass": axe rules tagged as
// corresponding to WCAG 2.0/2.1 A and AA success criteria, excluding
// axe's "best practice" rules that aren't tied to a specific criterion.
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Runs axe and asserts there are no violations. On failure the assertion
 * shows a short, readable list (rule, impact, selector, why) instead of a
 * wall of raw axe JSON; the full results are also attached to the test.
 */
async function expectNoA11yViolations(page: Page, testInfo: TestInfo): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  await testInfo.attach('axe-violations', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });
  const summary = results.violations.map((v) => {
    const nodes = v.nodes
      .map((n) => `${n.target.join(' ')} — ${(n.failureSummary ?? '').replace(/\s+/g, ' ').trim()}`)
      .join('\n     ');
    return `${v.id} [${v.impact}] ${v.help}\n     ${nodes}`;
  });
  expect(summary, 'axe violations').toEqual([]);
}

test.describe('Accessibility', () => {
  test.beforeEach(async ({ request }) => {
    await request.delete('/api/state');
  });

  test('setup screen has no detectable WCAG A/AA violations', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.locator('.double-picker')).toBeVisible();

    await expectNoA11yViolations(page, testInfo);
  });

  test('setup screen with a validation error has no detectable WCAG A/AA violations', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.locator('.player-name').first().fill('');
    await page.locator('#start-game').click();
    await expect(page.locator('.error-text')).toBeVisible();

    await expectNoA11yViolations(page, testInfo);
  });

  test('playing screen has no detectable WCAG A/AA violations', async ({ page }, testInfo) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);

    await expectNoA11yViolations(page, testInfo);
  });

  test('playing screen with standings visible has no detectable WCAG A/AA violations', async ({ page }, testInfo) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    await playRound(page, { selectDouble: 6, scores: [0, 4, 8] });

    await expectNoA11yViolations(page, testInfo);
  });

  test('finished screen has no detectable WCAG A/AA violations', async ({ page }, testInfo) => {
    await setupGame(page, ['Alice', 'Bob', 'Carla'], 6);
    for (const d of [6, 5, 4, 3, 2, 1, 0]) {
      await playRound(page, { selectDouble: d, scores: [0, 5, 5] });
    }
    await expect(page.locator('.winner-banner')).toBeVisible();

    await expectNoA11yViolations(page, testInfo);
  });

  test('finished screen with a tiebreaker card has no detectable WCAG A/AA violations', async ({ page }, testInfo) => {
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

    await expectNoA11yViolations(page, testInfo);
  });
});
