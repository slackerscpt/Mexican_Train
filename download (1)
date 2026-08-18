import { Page, expect } from '@playwright/test';

export type MaxDouble = 6 | 9 | 12 | 15;

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

  await page.locator('#start-game').click();
  await expect(page.locator('.engine-banner')).toBeVisible();
}

/**
 * Plays one round: optionally selects a specific double as the current
 * engine, fills in each player's remaining-pip score (by player index),
 * and finishes the round.
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

  await page.locator('#finish-round').click();
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
