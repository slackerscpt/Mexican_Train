<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mexican Train — Score Keeper</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{
    --ink:#16140F;
    --ink-soft:#221F19;
    --ivory:#EDE6D6;
    --ivory-dim:#C9C0AC;
    --brass:#A9762F;
    --brass-bright:#D6A24C;
    --signal:#8C2F26;
    --rail:#3A5A54;
    --line:rgba(237,230,214,0.14);
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background:
      radial-gradient(1200px 600px at 15% -10%, rgba(169,118,47,0.10), transparent),
      radial-gradient(900px 500px at 100% 0%, rgba(58,90,84,0.12), transparent),
      var(--ink);
    color:var(--ivory);
    font-family:'IBM Plex Sans', sans-serif;
    min-height:100vh;
    padding:32px 20px 80px;
  }
  .wrap{max-width:920px;margin:0 auto;}

  /* ---------- Header ---------- */
  .masthead{
    display:flex;align-items:baseline;justify-content:space-between;
    border-bottom:1px solid var(--line);
    padding-bottom:18px;margin-bottom:28px;
    flex-wrap:wrap;gap:10px;
  }
  h1{
    font-family:'Fraunces', serif;
    font-weight:600;
    font-size:clamp(28px,5vw,42px);
    letter-spacing:0.01em;
    margin:0;
    color:var(--ivory);
  }
  h1 span{color:var(--brass-bright);}
  .tagline{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--ivory-dim);
    display:flex;align-items:center;gap:8px;
  }
  .sync-dot{width:7px;height:7px;border-radius:50%;background:var(--rail);display:inline-block;}
  .sync-dot.err{background:var(--signal);}
  .sync-dot.ok{background:var(--brass-bright);}

  /* ---------- Cards ---------- */
  .card{
    background:var(--ink-soft);
    border:1px solid var(--line);
    border-radius:6px;
    padding:24px;
    margin-bottom:22px;
  }
  .card h2{
    font-family:'Fraunces', serif;
    font-weight:600;
    font-size:20px;
    margin:0 0 6px;
    color:var(--ivory);
    display:flex;align-items:center;gap:10px;
  }
  .card h2::before{
    content:'';
    width:8px;height:8px;
    background:var(--brass-bright);
    border-radius:50%;
    display:inline-block;
  }
  .card-hint{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;color:var(--ivory-dim);margin:0 0 16px;
  }
  label{
    display:block;
    font-family:'IBM Plex Mono', monospace;
    font-size:11px;
    letter-spacing:0.1em;
    text-transform:uppercase;
    color:var(--ivory-dim);
    margin-bottom:8px;
  }

  /* ---------- Double picker ---------- */
  .double-picker{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px;}
  .double-opt{
    font-family:'IBM Plex Mono', monospace;
    font-size:15px;font-weight:600;
    background:transparent;
    color:var(--ivory);
    border:1px solid var(--ivory-dim);
    border-radius:4px;
    padding:10px 16px;
    cursor:pointer;
    transition:all .15s ease;
  }
  .double-opt:hover{border-color:var(--brass-bright);}
  .double-opt.active{
    background:var(--brass-bright);
    border-color:var(--brass-bright);
    color:var(--ink);
  }

  /* ---------- Player inputs ---------- */
  .player-row{display:flex;gap:8px;margin-bottom:10px;align-items:center;}
  .player-row input[type=text]{
    flex:1;
    background:var(--ink);
    border:1px solid var(--ivory-dim);
    border-radius:4px;
    padding:10px 12px;
    color:var(--ivory);
    font-family:'IBM Plex Sans',sans-serif;
    font-size:15px;
  }
  .player-row input[type=text]:focus{outline:none;border-color:var(--brass-bright);}
  .icon-btn{
    background:transparent;border:1px solid var(--line);
    color:var(--ivory-dim);
    width:38px;height:38px;border-radius:4px;
    cursor:pointer;font-size:16px;line-height:1;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
  }
  .icon-btn:hover{border-color:var(--signal);color:var(--signal);}
  .add-player{
    background:transparent;
    border:1px dashed var(--ivory-dim);
    color:var(--ivory-dim);
    border-radius:4px;
    padding:10px 14px;
    font-family:'IBM Plex Mono',monospace;
    font-size:13px;
    cursor:pointer;
    margin-top:4px;
  }
  .add-player:hover{border-color:var(--brass-bright);color:var(--brass-bright);}

  .primary-btn{
    font-family:'IBM Plex Mono', monospace;
    font-weight:600;
    font-size:14px;
    letter-spacing:0.06em;
    text-transform:uppercase;
    background:var(--brass-bright);
    color:var(--ink);
    border:none;
    border-radius:4px;
    padding:14px 26px;
    cursor:pointer;
    transition:transform .1s ease, box-shadow .15s ease;
  }
  .primary-btn:hover{box-shadow:0 0 0 3px rgba(214,162,76,0.25);}
  .primary-btn:active{transform:translateY(1px);}
  .primary-btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;}
  .ghost-btn{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px;letter-spacing:0.06em;text-transform:uppercase;
    background:transparent;color:var(--ivory-dim);
    border:1px solid var(--line);border-radius:4px;
    padding:9px 14px;cursor:pointer;
  }
  .ghost-btn:hover{color:var(--ivory);border-color:var(--ivory-dim);}
  .error-text{color:var(--signal);font-size:13px;font-family:'IBM Plex Mono',monospace;margin-top:8px;}

  /* ---------- Domino tile ---------- */
  .tile{
    width:56px;height:96px;
    background:linear-gradient(180deg, var(--ivory) 0%, #E3DBC6 100%);
    border-radius:6px;
    border:1px solid #8f8672;
    display:flex;flex-direction:column;
    box-shadow:0 3px 0 rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4);
    flex-shrink:0;
    position:relative;
  }
  .tile .half{
    flex:1;display:flex;align-items:center;justify-content:center;
    font-family:'Fraunces',serif;font-weight:700;font-size:26px;color:var(--ink);
  }
  .tile .divider{height:1px;background:#8f8672;margin:0 8px;}
  .tile.mini{width:38px;height:66px;}
  .tile.mini .half{font-size:18px;}
  .tile.played{
    opacity:.35;filter:grayscale(.6);
    box-shadow:0 1px 0 rgba(0,0,0,0.2);
  }
  .tile.current{
    border-color:var(--brass-bright);
    box-shadow:0 0 0 3px rgba(214,162,76,0.35), 0 4px 0 rgba(0,0,0,0.35);
  }
  .tile.selectable{cursor:pointer;transition:transform .1s ease;}
  .tile.selectable:hover{transform:translateY(-3px);}
  .tile-label{
    text-align:center;font-family:'IBM Plex Mono',monospace;
    font-size:10px;color:var(--ivory-dim);margin-top:6px;letter-spacing:.05em;
  }
  .tile-slot{display:flex;flex-direction:column;align-items:center;background:none;border:none;padding:0;}

  /* ---------- Track ---------- */
  .track-scroll{
    display:flex;gap:14px;overflow-x:auto;padding:6px 2px 14px;
  }
  .track-scroll::-webkit-scrollbar{height:6px;}
  .track-scroll::-webkit-scrollbar-thumb{background:var(--line);border-radius:3px;}
  .played-scroll{display:flex;gap:10px;overflow-x:auto;padding:4px 2px;}
  .empty-note{
    font-family:'IBM Plex Mono',monospace;font-size:13px;color:var(--ivory-dim);
    font-style:italic;
  }

  /* ---------- Engine banner ---------- */
  .engine-banner{
    display:flex;align-items:center;gap:20px;
    background:linear-gradient(90deg, rgba(169,118,47,0.14), transparent);
    border:1px solid var(--brass);
    border-radius:6px;padding:18px 22px;margin-bottom:22px;
    flex-wrap:wrap;
  }
  .engine-banner .info{flex:1;min-width:180px;}
  .engine-banner .eyebrow{
    font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;
    text-transform:uppercase;color:var(--brass-bright);margin-bottom:4px;
  }
  .engine-banner .round-num{font-family:'Fraunces',serif;font-size:24px;font-weight:600;}

  /* ---------- Score entry table ---------- */
  table{width:100%;border-collapse:collapse;}
  .score-table th{
    text-align:left;font-family:'IBM Plex Mono',monospace;
    font-size:11px;letter-spacing:.08em;text-transform:uppercase;
    color:var(--ivory-dim);padding:0 10px 10px;font-weight:500;
    border-bottom:1px solid var(--line);
  }
  .score-table td{padding:8px 10px;border-bottom:1px solid var(--line);}
  .score-table input[type=number]{
    width:90px;background:var(--ink);border:1px solid var(--ivory-dim);
    border-radius:4px;padding:8px 10px;color:var(--ivory);
    font-family:'IBM Plex Mono',monospace;font-size:15px;
  }
  .score-table input[type=number]:focus{outline:none;border-color:var(--brass-bright);}
  .score-table .pname{font-family:'IBM Plex Sans',sans-serif;font-size:15px;}

  /* ---------- Departure board ---------- */
  .board-wrap{overflow-x:auto;}
  .board{width:100%;border-collapse:collapse;font-family:'IBM Plex Mono',monospace;}
  .board th{
    text-align:right;font-size:11px;letter-spacing:.06em;text-transform:uppercase;
    color:var(--brass-bright);padding:8px 12px;border-bottom:1px solid var(--brass);
    white-space:nowrap;
  }
  .board th:first-child, .board td:first-child{text-align:left;}
  .board td{text-align:right;padding:8px 12px;font-size:14px;border-bottom:1px solid var(--line);white-space:nowrap;}
  .board tr.totals td{
    font-weight:600;font-size:15px;padding-top:12px;border-top:2px solid var(--brass);border-bottom:none;
    color:var(--ivory);
  }
  .board td.winner-cell{color:var(--brass-bright);}

  /* ---------- Winner banner ---------- */
  .winner-banner{
    text-align:center;padding:36px 20px;
    background:linear-gradient(180deg, rgba(214,162,76,0.14), transparent);
    border:1px solid var(--brass-bright);border-radius:6px;margin-bottom:22px;
  }
  .winner-banner .eyebrow{
    font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.16em;
    text-transform:uppercase;color:var(--brass-bright);margin-bottom:10px;
  }
  .winner-banner h2{
    font-family:'Fraunces',serif;font-weight:700;font-size:clamp(28px,5vw,44px);
    margin:0 0 6px;border:none;padding:0;color:var(--ivory);
  }
  .winner-banner h2::before{display:none;}
  .winner-banner .score{
    font-family:'IBM Plex Mono',monospace;color:var(--ivory-dim);font-size:15px;
  }

  .footer-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:6px;}

  .loading-screen{
    display:flex;align-items:center;justify-content:center;min-height:60vh;
    font-family:'IBM Plex Mono',monospace;color:var(--ivory-dim);letter-spacing:.1em;text-transform:uppercase;font-size:13px;
  }

  @media (max-width:520px){
    .tile{width:46px;height:80px;}
    .tile .half{font-size:21px;}
  }
</style>
</head>
<body>
<div class="wrap" id="app">
  <div class="loading-screen">Loading saved game…</div>
</div>

<script>
/* ---------------- State ---------------- */
function defaultState(){
  return {
    phase: 'setup',          // setup | playing | finished
    maxDouble: 12,
    players: ['Player 1', 'Player 2', 'Player 3', 'Player 4'],
    doublesLeft: [],         // remaining doubles, any order the scorekeeper picks
    doublesPlayed: [],       // doubles already scored, in the order they were played
    currentDouble: null,     // the double currently selected to score against
    rounds: [],              // { double, scores: {playerIdx: pips} }
    setupError: ''
  };
}
let state = defaultState();

const app = document.getElementById('app');
let saveTimer = null;
let saveIndicator = null;

/* ---------------- Persistence ---------------- */
async function loadState(){
  try{
    const res = await fetch('/api/state');
    const data = await res.json();
    if(data){ state = data; }
  }catch(err){
    console.error('Could not load saved game:', err);
  }
  rerender();
}

function saveState(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async ()=>{
    try{
      const res = await fetch('/api/state', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(state)
      });
      if(!res.ok) throw new Error('Save failed');
      flashSync('ok');
    }catch(err){
      console.error('Could not save game:', err);
      flashSync('err');
    }
  }, 300);
}

function flashSync(kind){
  if(!saveIndicator) return;
  saveIndicator.className = 'sync-dot ' + kind;
  setTimeout(()=>{ if(saveIndicator) saveIndicator.className = 'sync-dot'; }, 900);
}

async function hardReset(){
  try{ await fetch('/api/state', { method:'DELETE' }); }catch(err){ console.error(err); }
}

/* ---------------- Helpers ---------------- */
function tileHTML(n, opts={}){
  const cls = ['tile'];
  if(opts.mini) cls.push('mini');
  if(opts.played) cls.push('played');
  if(opts.current) cls.push('current');
  if(opts.selectable) cls.push('selectable');
  return `<div class="${cls.join(' ')}">
    <div class="half">${n}</div>
    <div class="divider"></div>
    <div class="half">${n}</div>
  </div>`;
}

function totalsForPlayers(){
  const totals = state.players.map(()=>0);
  state.rounds.forEach(r=>{
    state.players.forEach((_,i)=>{ totals[i] += (r.scores[i]||0); });
  });
  return totals;
}

// Number of rounds player i scored exactly 0 pips (i.e. went out first / won the round)
function zeroRoundCount(i){
  return state.rounds.filter(r => (r.scores[i]||0) === 0).length;
}

// Player i's lowest non-zero round score, or null if they never scored above 0
function lowestNonZeroRound(i){
  const nonZero = state.rounds.map(r => r.scores[i]||0).filter(s => s > 0);
  return nonZero.length ? Math.min(...nonZero) : null;
}

/**
 * Determines the winner(s), applying tiebreakers in order when totals are tied:
 *   1. Lowest total score.
 *   2. Most rounds won with 0 points.
 *   3. Lowest single non-zero round score.
 * Returns { winners: [playerIdx...], reason, totals } — reason is 'total',
 * 'zero-rounds', 'lowest-nonzero', or 'tie' (still tied after all tiebreakers).
 */
function determineWinner(){
  const totals = totalsForPlayers();
  const minTotal = Math.min(...totals);
  let candidates = state.players.map((_,i)=>i).filter(i => totals[i]===minTotal);
  let reason = 'total';

  if(candidates.length > 1){
    const maxZero = Math.max(...candidates.map(zeroRoundCount));
    const zeroTied = candidates.filter(i => zeroRoundCount(i)===maxZero);
    if(zeroTied.length < candidates.length) reason = 'zero-rounds';
    candidates = zeroTied;

    if(candidates.length > 1){
      const values = candidates.map(i => lowestNonZeroRound(i));
      const comparable = values.filter(v => v !== null);
      const minLowest = comparable.length ? Math.min(...comparable) : null;
      const nonZeroTied = minLowest === null
        ? candidates
        : candidates.filter((i, idx) => values[idx] === minLowest);
      if(nonZeroTied.length < candidates.length) reason = 'lowest-nonzero';
      candidates = nonZeroTied;
      if(candidates.length > 1) reason = 'tie';
    }
  }

  return { winners: candidates, reason, totals };
}

function rerender(){
  if(state.phase==='setup') renderSetup();
  else if(state.phase==='playing') renderGame();
  else renderFinished();

  saveIndicator = document.getElementById('sync-dot');
}

function mastheadHTML(tagline){
  return `
    <div class="masthead">
      <h1>Mexican <span>Train</span></h1>
      <div class="tagline"><span class="sync-dot" id="sync-dot"></span>${tagline}</div>
    </div>`;
}

/* ---------------- Setup screen ---------------- */
function renderSetup(){
  app.innerHTML = `
    ${mastheadHTML('Score Keeper')}

    <div class="card">
      <h2>Highest double in the set</h2>
      <label>Choose the engine your set starts from</label>
      <div class="double-picker" id="double-picker">
        ${[6,9,12,15].map(n=>`<button class="double-opt ${state.maxDouble===n?'active':''}" data-n="${n}">Double-${n}</button>`).join('')}
      </div>
    </div>

    <div class="card">
      <h2>Players</h2>
      <div id="player-list">
        ${state.players.map((p,i)=>`
          <div class="player-row">
            <input type="text" data-i="${i}" class="player-name" value="${p.replace(/"/g,'&quot;')}" placeholder="Player name">
            <button class="icon-btn remove-player" data-i="${i}" title="Remove player" ${state.players.length<=3?'disabled style="opacity:.3;cursor:not-allowed;"':''}>✕</button>
          </div>`).join('')}
      </div>
      <button class="add-player" id="add-player" ${state.players.length>=8?'disabled style="opacity:.3;cursor:not-allowed;"':''}>+ Add player</button>
      <div class="tile-label" style="text-align:left;margin-top:8px;">${state.players.length} of 8 players (min 3)</div>
    </div>

    ${state.setupError ? `<div class="error-text">${state.setupError}</div>` : ''}

    <div class="footer-actions">
      <button class="primary-btn" id="start-game">Start Game →</button>
      <button class="ghost-btn" id="reset-all">Reset saved data</button>
    </div>
  `;

  document.querySelectorAll('.double-opt').forEach(btn=>{
    btn.addEventListener('click', ()=>{ state.maxDouble = parseInt(btn.dataset.n,10); rerender(); saveState(); });
  });
  document.querySelectorAll('.player-name').forEach(inp=>{
    inp.addEventListener('input', e=>{
      state.players[parseInt(e.target.dataset.i,10)] = e.target.value;
      saveState();
    });
  });
  document.querySelectorAll('.remove-player').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const i = parseInt(btn.dataset.i,10);
      if(state.players.length<=3){ state.setupError='You need at least 3 players.'; rerender(); return; }
      state.players.splice(i,1);
      state.setupError='';
      rerender();
      saveState();
    });
  });
  document.getElementById('add-player').addEventListener('click', ()=>{
    if(state.players.length>=8){ state.setupError='You can have at most 8 players.'; rerender(); return; }
    state.players.push(`Player ${state.players.length+1}`);
    state.setupError='';
    rerender();
    saveState();
  });
  document.getElementById('start-game').addEventListener('click', ()=>{
    const names = state.players.map(p=>p.trim());
    if(names.length<3){ state.setupError='You need at least 3 players.'; rerender(); return; }
    if(names.length>8){ state.setupError='You can have at most 8 players.'; rerender(); return; }
    if(names.some(n=>!n)){ state.setupError='Every player needs a name.'; rerender(); return; }
    state.players = names;
    state.doublesLeft = [];
    for(let n=state.maxDouble; n>=0; n--) state.doublesLeft.push(n);
    state.doublesPlayed = [];
    state.rounds = [];
    state.currentDouble = state.doublesLeft[0];
    state.setupError='';
    state.phase='playing';
    rerender();
    saveState();
  });
  document.getElementById('reset-all').addEventListener('click', async ()=>{
    await hardReset();
    state = defaultState();
    rerender();
  });
}

/* ---------------- Game screen ---------------- */
function renderGame(){
  const current = state.currentDouble;
  const roundNum = state.doublesPlayed.length + 1;

  app.innerHTML = `
    ${mastheadHTML(`Round ${roundNum} of ${state.maxDouble+1}`)}

    <div class="engine-banner">
      ${tileHTML(current,{current:true})}
      <div class="info">
        <div class="eyebrow">Now scoring</div>
        <div class="round-num">Double-${current} Engine</div>
      </div>
    </div>

    <div class="card">
      <h2>Doubles left to play</h2>
      <p class="card-hint">Tap a tile to make it the engine currently in play.</p>
      <div class="track-scroll" id="track">
        ${state.doublesLeft.map(n=>`
          <button class="tile-slot select-double" data-n="${n}">
            ${tileHTML(n,{mini:true,current:n===current,selectable:true})}
            <div class="tile-label">${n===current?'in play':''}</div>
          </button>`).join('')}
      </div>
      ${state.doublesPlayed.length ? `
        <label style="margin-top:14px;">Already played</label>
        <div class="played-scroll">
          ${state.doublesPlayed.map(n=>tileHTML(n,{mini:true,played:true})).join('')}
        </div>` : ''}
    </div>

    <div class="card">
      <h2>Enter this round's remaining pips</h2>
      <table class="score-table">
        <thead><tr><th>Player</th><th>Pips left in hand</th></tr></thead>
        <tbody>
          ${state.players.map((p,i)=>`
            <tr>
              <td class="pname">${p}</td>
              <td><input type="number" min="0" inputmode="numeric" class="round-score" data-i="${i}" placeholder="0" value="0"></td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div class="footer-actions" style="margin-top:18px;">
        <button class="primary-btn" id="finish-round">Finish Round →</button>
        ${state.rounds.length ? `<button class="ghost-btn" id="undo-round">Undo last round</button>` : ''}
      </div>
    </div>

    ${state.rounds.length ? renderStandingsCard() : ''}
  `;

  document.querySelectorAll('.select-double').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      state.currentDouble = parseInt(btn.dataset.n,10);
      rerender();
      saveState();
    });
  });

  document.getElementById('finish-round').addEventListener('click', ()=>{
    const scores = {};
    document.querySelectorAll('.round-score').forEach(inp=>{
      const i = parseInt(inp.dataset.i,10);
      const v = parseInt(inp.value,10);
      scores[i] = isNaN(v) ? 0 : v;
    });
    const playedDouble = state.currentDouble;
    state.rounds.push({ double: playedDouble, scores });
    state.doublesPlayed.push(playedDouble);
    state.doublesLeft.splice(state.doublesLeft.indexOf(playedDouble), 1);
    state.currentDouble = state.doublesLeft.length ? state.doublesLeft[0] : null;
    if(state.doublesLeft.length===0){ state.phase='finished'; }
    rerender();
    saveState();
  });

  const undoBtn = document.getElementById('undo-round');
  if(undoBtn){
    undoBtn.addEventListener('click', ()=>{
      const last = state.rounds.pop();
      state.doublesPlayed.pop();
      state.doublesLeft.push(last.double);
      state.currentDouble = last.double;
      rerender();
      saveState();
    });
  }
}

function renderStandingsCard(){
  const totals = totalsForPlayers();
  const order = state.players.map((_,i)=>i).sort((a,b)=>totals[a]-totals[b]);
  const lowest = totals[order[0]];

  return `
    <div class="card">
      <h2>Standings so far</h2>
      <div class="board-wrap">
        <table class="board">
          <thead>
            <tr>
              <th>Round</th>
              ${state.players.map(p=>`<th>${p}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${state.rounds.map(r=>`
              <tr>
                <td>Dbl-${r.double}</td>
                ${state.players.map((_,i)=>`<td>${r.scores[i]}</td>`).join('')}
              </tr>`).join('')}
            <tr class="totals">
              <td>Total</td>
              ${state.players.map((_,i)=>`<td class="${totals[i]===lowest?'winner-cell':''}">${totals[i]}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/* ---------------- Finished screen ---------------- */
const TIEBREAK_LABEL = {
  'total': 'Lowest total score',
  'zero-rounds': 'Tiebreaker: most rounds won with 0 points',
  'lowest-nonzero': 'Tiebreaker: lowest single non-zero round score',
  'tie': 'Still tied after all tiebreakers'
};

function renderTiebreakerCard(result){
  const { totals, winners, reason } = result;
  const minTotal = Math.min(...totals);
  const tiedGroup = state.players.map((_,i)=>i).filter(i => totals[i]===minTotal);

  return `
    <div class="card">
      <h2>How the tie was broken</h2>
      <p class="card-hint">${tiedGroup.length} players tied at ${minTotal} total pips.</p>
      <div class="board-wrap">
        <table class="board">
          <thead>
            <tr>
              <th>Player</th>
              <th>Total</th>
              <th>Rounds won w/ 0</th>
              <th>Lowest non-zero round</th>
            </tr>
          </thead>
          <tbody>
            ${tiedGroup.map(i=>{
              const lowest = lowestNonZeroRound(i);
              return `
                <tr>
                  <td>${state.players[i]}</td>
                  <td>${totals[i]}</td>
                  <td class="${reason==='zero-rounds' && winners.includes(i) ? 'winner-cell':''}">${zeroRoundCount(i)}</td>
                  <td class="${reason==='lowest-nonzero' && winners.includes(i) ? 'winner-cell':''}">${lowest===null ? '—' : lowest}</td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderFinished(){
  const result = determineWinner();
  const { winners, totals, reason } = result;
  const isTie = winners.length > 1;

  app.innerHTML = `
    ${mastheadHTML('Final Results')}

    <div class="winner-banner">
      <div class="eyebrow">${isTie ? 'Last stop — a tie' : 'Last stop — winner'}</div>
      <h2>${winners.map(i=>state.players[i]).join(isTie ? ' & ' : '')}</h2>
      <div class="score">${totals[winners[0]]} total pips — ${TIEBREAK_LABEL[reason]}</div>
    </div>

    ${reason!=='total' ? renderTiebreakerCard(result) : ''}

    <div class="card">
      <h2>Full scoreboard</h2>
      <div class="board-wrap">
        <table class="board">
          <thead>
            <tr>
              <th>Round</th>
              ${state.players.map(p=>`<th>${p}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${state.rounds.map(r=>`
              <tr>
                <td>Dbl-${r.double}</td>
                ${state.players.map((_,i)=>`<td>${r.scores[i]}</td>`).join('')}
              </tr>`).join('')}
            <tr class="totals">
              <td>Total</td>
              ${state.players.map((_,i)=>`<td class="${winners.includes(i)?'winner-cell':''}">${totals[i]}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer-actions">
        <button class="ghost-btn" id="undo-final">Undo last round</button>
        <button class="primary-btn" id="new-game">Start New Game</button>
      </div>
    </div>
  `;

  document.getElementById('new-game').addEventListener('click', async ()=>{
    const carriedPlayers = state.players.slice();
    const carriedMax = state.maxDouble;
    await hardReset();
    state = defaultState();
    state.players = carriedPlayers;
    state.maxDouble = carriedMax;
    rerender();
    saveState();
  });
  document.getElementById('undo-final').addEventListener('click', ()=>{
    const last = state.rounds.pop();
    state.doublesPlayed.pop();
    state.doublesLeft.push(last.double);
    state.currentDouble = last.double;
    state.phase='playing';
    rerender();
    saveState();
  });
}

loadState();
</script>
</body>
</html>
