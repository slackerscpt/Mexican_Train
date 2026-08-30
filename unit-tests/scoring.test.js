const test = require('node:test');
const assert = require('node:assert/strict');
const Logic = require('../public/js/game-logic.js');

/** Builds a state object from a players list and a 2D array of per-round scores. */
function makeState(players, roundScores) {
  return {
    players,
    rounds: roundScores.map((scores) => ({
      double: 0,
      scores: Object.fromEntries(scores.map((v, i) => [i, v])),
    })),
  };
}

test('totalsForPlayers', async (t) => {
  await t.test('sums each player\'s pips across all rounds', () => {
    const state = makeState(['A', 'B'], [
      [3, 5],
      [2, 0],
      [0, 1],
    ]);
    assert.deepEqual(Logic.totalsForPlayers(state), [5, 6]);
  });

  await t.test('is 0 for everyone when no rounds have been played', () => {
    const state = makeState(['A', 'B', 'C'], []);
    assert.deepEqual(Logic.totalsForPlayers(state), [0, 0, 0]);
  });
});

test('zeroRoundCount', async (t) => {
  await t.test('counts only rounds where the player scored exactly 0', () => {
    const state = makeState(['A', 'B'], [
      [0, 4],
      [0, 0],
      [3, 0],
    ]);
    assert.equal(Logic.zeroRoundCount(state, 0), 2);
    assert.equal(Logic.zeroRoundCount(state, 1), 2);
  });

  await t.test('is 0 for a player who never went out', () => {
    const state = makeState(['A'], [[4], [2], [1]]);
    assert.equal(Logic.zeroRoundCount(state, 0), 0);
  });
});

test('lowestNonZeroRound', async (t) => {
  await t.test('finds the smallest score above zero', () => {
    const state = makeState(['A'], [[0], [5], [2], [8]]);
    assert.equal(Logic.lowestNonZeroRound(state, 0), 2);
  });

  await t.test('is null when the player never scored above zero', () => {
    const state = makeState(['A'], [[0], [0], [0]]);
    assert.equal(Logic.lowestNonZeroRound(state, 0), null);
  });

  await t.test('is null when the player has no rounds at all', () => {
    const state = makeState(['A'], []);
    assert.equal(Logic.lowestNonZeroRound(state, 0), null);
  });
});

test('determineWinner', async (t) => {
  await t.test('picks the outright lowest total when there is no tie', () => {
    const state = makeState(['Alice', 'Bob', 'Carla'], [
      [0, 10, 12],
      [1, 9, 11],
      [0, 8, 10],
      [2, 7, 9],
      [1, 6, 8],
      [0, 5, 7],
      [3, 4, 6],
    ]);
    const result = Logic.determineWinner(state);
    assert.deepEqual(result.winners, [0]);
    assert.equal(result.reason, 'total');
  });

  await t.test('breaks a tied total using most rounds won with 0 points', () => {
    // Alice and Bob both finish with 10 total pips, but Alice went out
    // (scored 0) in 6 of 7 rounds vs Bob's 5, so Alice should win.
    const state = makeState(['Alice', 'Bob', 'Carla'], [
      [0, 0, 5],
      [0, 0, 5],
      [0, 0, 5],
      [0, 0, 5],
      [0, 0, 5],
      [0, 5, 5],
      [10, 5, 5],
    ]);
    const result = Logic.determineWinner(state);
    assert.deepEqual(result.winners, [0]);
    assert.equal(result.reason, 'zero-rounds');
  });

  await t.test('falls through to the lowest non-zero round when zero-counts also tie', () => {
    // Alice and Bob tie on total (14) and on zero-rounds (0 each), but
    // Bob's lowest non-zero round (1) beats Alice's (2).
    const state = makeState(['Alice', 'Bob', 'Carla'], [
      [2, 1, 5],
      [2, 3, 5],
      [2, 2, 5],
      [2, 2, 5],
      [2, 2, 5],
      [2, 2, 5],
      [2, 2, 5],
    ]);
    const result = Logic.determineWinner(state);
    assert.deepEqual(result.winners, [1]);
    assert.equal(result.reason, 'lowest-nonzero');
  });

  await t.test('reports a shared tie when every tiebreaker is equal', () => {
    const state = makeState(['Alice', 'Bob', 'Carla'], [
      [3, 3, 9],
      [3, 3, 9],
      [3, 3, 9],
      [3, 3, 9],
      [3, 3, 9],
      [3, 3, 9],
      [3, 3, 9],
    ]);
    const result = Logic.determineWinner(state);
    assert.deepEqual(result.winners, [0, 1]);
    assert.equal(result.reason, 'tie');
  });

  await t.test('treats a player with no non-zero rounds as unbeatable on that tier', () => {
    // Both players score only 0s; total and zero-count both tie, and
    // neither has a non-zero round to compare, so it stays a tie.
    const state = makeState(['A', 'B'], [
      [0, 0],
      [0, 0],
    ]);
    const result = Logic.determineWinner(state);
    assert.deepEqual(result.winners, [0, 1]);
    assert.equal(result.reason, 'tie');
  });

  await t.test('handles a game with no rounds played yet', () => {
    const state = makeState(['A', 'B', 'C'], []);
    const result = Logic.determineWinner(state);
    assert.deepEqual(result.winners, [0, 1, 2]);
    assert.equal(result.reason, 'tie');
    assert.deepEqual(result.totals, [0, 0, 0]);
  });
});
