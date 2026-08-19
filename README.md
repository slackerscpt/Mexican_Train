# Mexican Train — Score Keeper

A small local web app for keeping score in Mexican Train. The scorekeeper
picks which double engine is in play, enters each player's remaining pips
per round, and the app tracks totals and declares the winner (lowest pips)
once every double has been played.

Game state is written to `data/state.json` after every action, so reloading
the browser — or restarting the container, as long as `data/` is mounted —
picks up right where you left off.

## Run with Docker Compose (recommended)

```
docker compose up --build
```

Then open **http://localhost:3000**.

This builds the image and mounts `./data` into the container, so
`data/state.json` persists on your machine between runs.

## Run with plain Docker

```
docker build -t mexican-train-scorekeeper .
docker run -p 3000:3000 -v "$(pwd)/data:/app/data" mexican-train-scorekeeper
```

## Run without Docker

Requires Node.js 24+.

```
npm install
npm start
```

## Using the app

1. **Setup** — choose the highest double in your set (6, 9, 12, or 15) and
   enter 3–8 player names, then start the game.
2. **Doubles left to play** — tap any tile in this row to make it the
   engine currently in play; it doesn't have to go in strict order.
3. **Score entry** — enter each player's remaining pip count for the round
   and click *Finish Round*. That double moves to the "already played" row.
4. Once every double has been played, the app shows the final scoreboard
   and declares the winner (lowest total pips). Ties are broken in order:
   most rounds won with 0 points, then lowest single non-zero round score;
   if still tied, the app shows a shared win.
5. *Undo last round* is available if you need to correct an entry.

## Starting over

Click **Start New Game** on the results screen, or **Reset saved data** on
the setup screen, to clear `data/state.json` and begin fresh. You can also
delete `data/state.json` by hand while the app isn't running.

## Testing

End-to-end tests (TypeScript, Playwright) live in `tests/` and drive the
real app through a browser — setup validation, manual double selection,
scoring, undo, persistence across reloads, and all three winner
tiebreakers.

```
npm install
npx playwright install --with-deps chromium   # first time only
npm run test:e2e
```

`npm run test:e2e` starts the app itself (`npm start`) automatically via
Playwright's `webServer` option, runs the suite against it, and shuts it
down afterward — no separate terminal needed. Useful variants:

```
npm run test:e2e:ui        # interactive UI mode, great for writing/debugging tests
npm run test:e2e:report    # reopen the HTML report from the last run
```

The app keeps all game state in a single `data/state.json` file with no
per-session isolation, so the suite runs serially (one worker) and each
test resets state itself via `DELETE /api/state` before it starts. Keep
that in mind if you add tests — don't raise `workers` in
`playwright.config.ts` without also giving each test its own state store.

Tests run automatically on every push and pull request to `main` via
`.github/workflows/e2e.yml`. If a run fails in CI, download the
`playwright-report` artifact from the workflow run for traces and
screenshots of the failure.

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── e2e.yml      # Runs the Playwright suite in CI
├── Dockerfile
├── docker-compose.yml
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── server.js             # Express server + JSON-file persistence API
├── public/
│   └── index.html        # Front-end app
├── tests/
│   ├── helpers.ts         # Shared setup/scoring helpers for specs
│   ├── setup.spec.ts
│   ├── gameplay.spec.ts
│   ├── tiebreaker.spec.ts
│   └── persistence.spec.ts
└── data/
    └── state.json         # Created automatically; holds the current game
```
