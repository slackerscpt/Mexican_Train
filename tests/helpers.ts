import { Page, expect } from '@playwright/test';

export type MaxDouble = 6 | 9 | 12 | 15;

/**
 * The app debounces its writes to /api/state by ~300ms (see saveState() in
 * public/index.html) so rapid clicks don't spam the server. A plain
 * `.click()` resolves as soon as the click event dispatches — well before
 * that timer fires — so any test that reloads (or otherwise depends on the
 * server already having the latest state) right after a mutating action
 * must wait for the resulting save to actually land first.
 */
async function withStateSave(page: Page, action: () => Promise<void>): Promise<void> {
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) => res.url().endsWith('/api/state') && res.request().method() === 'PUT'
    ),
    action(),
  ]);
  if (!response.ok()) {
    throw new Error(`Save to /api/state failed with status ${response.status()}`);
  }
}

/**
 * Goes to the setup screen, picks the given highest-double and player list,
 * and starts the game. Assumes state has already been reset for this test.
 */
export async function setupGame(
  page: Page,
  playerNames: string[],
  maxDouble: MaxDouble = 6
): Promise<void> {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Mexican');

  await page.locator('.double-opt', { hasText: `Double-${maxDouble}` }).click();

  const playerCount = () => page.locator('.player-name').count();

  while ((await playerCount()) < playerNames.length) {
    await page.locator('#add-player').click();
  }
  while ((await playerCount()) > playerNames.length) {
    await page.locator('.remove-player').last().click();
  }

  for (let i = 0; i < playerNames.length; i++) {
    await page.locator('.player-name').nth(i).fill(playerNames[i]);
  }

  await withStateSave(page, () => page.locator('#start-game').click());
  await expect(page.locator('.engine-banner')).toBeVisible();
}

/**
 * Plays one round: optionally selects a specific double as the current
 * engine, fills in each player's remaining-pip score (by player index),
 * and finishes the round. Waits for the round to actually be persisted
 * before returning, so callers can safely reload right after.
 */
export async function playRound(
  page: Page,
  opts: { selectDouble?: number; scores: number[] }
): Promise<void> {
  if (opts.selectDouble !== undefined) {
    await page.locator(`.select-double[data-n="${opts.selectDouble}"]`).click();
  }

  const inputs = page.locator('.round-score');
  for (let i = 0; i < opts.scores.length; i++) {
    await inputs.nth(i).fill(String(opts.scores[i]));
  }

  await withStateSave(page, () => page.locator('#finish-round').click());
}

/** Plays a full game (every double down to 0, in the given order) with per-round scores. */
export async function playFullGame(
  page: Page,
  doublesInPlayOrder: number[],
  scoresPerRound: number[][]
): Promise<void> {
  for (let i = 0; i < doublesInPlayOrder.length; i++) {
    await playRound(page, { selectDouble: doublesInPlayOrder[i], scores: scoresPerRound[i] });
  }
}
