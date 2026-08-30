/**
 * Mexican Train scoring logic — pure functions, no DOM, no globals.
 *
 * Loaded two ways:
 *   - In the browser via <script src="js/game-logic.js">, which attaches
 *     everything to window.MexicanTrainLogic.
 *   - In Node (unit tests, or any other tooling) via require('./game-logic.js'),
 *     which gets the same functions as a CommonJS export.
 *
 * Every function here takes the game `state` explicitly as an argument
 * rather than closing over a global — that's what makes it testable in
 * isolation without spinning up the app or a browser.
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.MexicanTrainLogic = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /** Running total pips for every player across all recorded rounds. */
  function totalsForPlayers(state) {
    const totals = state.players.map(() => 0);
    state.rounds.forEach(r => {
      state.players.forEach((_, i) => { totals[i] += (r.scores[i] || 0); });
    });
    return totals;
  }

  /** Number of rounds player i scored exactly 0 pips (i.e. went out first / won the round). */
  function zeroRoundCount(state, i) {
    return state.rounds.filter(r => (r.scores[i] || 0) === 0).length;
  }

  /** Player i's lowest non-zero round score, or null if they never scored above 0. */
  function lowestNonZeroRound(state, i) {
    const nonZero = state.rounds.map(r => r.scores[i] || 0).filter(s => s > 0);
    return nonZero.length ? Math.min(...nonZero) : null;
  }

  const TIEBREAK_LABEL = {
    'total': 'Lowest total score',
    'zero-rounds': 'Tiebreaker: most rounds won with 0 points',
    'lowest-nonzero': 'Tiebreaker: lowest single non-zero round score',
    'tie': 'Still tied after all tiebreakers'
  };

  /**
   * Determines the winner(s), applying tiebreakers in order when totals are tied:
   *   1. Lowest total score.
   *   2. Most rounds won with 0 points.
   *   3. Lowest single non-zero round score.
   * Returns { winners: [playerIdx...], reason, totals } — reason is 'total',
   * 'zero-rounds', 'lowest-nonzero', or 'tie' (still tied after all tiebreakers).
   */
  function determineWinner(state) {
    const totals = totalsForPlayers(state);
    const minTotal = Math.min(...totals);
    let candidates = state.players.map((_, i) => i).filter(i => totals[i] === minTotal);
    let reason = 'total';

    if (candidates.length > 1) {
      const maxZero = Math.max(...candidates.map(i => zeroRoundCount(state, i)));
      const zeroTied = candidates.filter(i => zeroRoundCount(state, i) === maxZero);
      if (zeroTied.length < candidates.length) reason = 'zero-rounds';
      candidates = zeroTied;

      if (candidates.length > 1) {
        const values = candidates.map(i => lowestNonZeroRound(state, i));
        const comparable = values.filter(v => v !== null);
        const minLowest = comparable.length ? Math.min(...comparable) : null;
        const nonZeroTied = minLowest === null
          ? candidates
          : candidates.filter((i, idx) => values[idx] === minLowest);
        if (nonZeroTied.length < candidates.length) reason = 'lowest-nonzero';
        candidates = nonZeroTied;
        if (candidates.length > 1) reason = 'tie';
      }
    }

    return { winners: candidates, reason, totals };
  }

  return {
    totalsForPlayers,
    zeroRoundCount,
    lowestNonZeroRound,
    determineWinner,
    TIEBREAK_LABEL
  };
});
