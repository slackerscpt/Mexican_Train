const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const STATE_FILE = path.join(DATA_DIR, 'state.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fetch the saved game state (or null if there isn't one yet)
app.get('/api/state', (req, res) => {
  if (!fs.existsSync(STATE_FILE)) {
    return res.json(null);
  }
  try {
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Failed to read state file:', err);
    res.status(500).json({ error: 'Could not read saved game state.' });
  }
});

// Overwrite the saved game state
app.put('/api/state', (req, res) => {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to write state file:', err);
    res.status(500).json({ error: 'Could not save game state.' });
  }
});

// Hard reset: delete the saved game state entirely
app.delete('/api/state', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) fs.unlinkSync(STATE_FILE);
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to delete state file:', err);
    res.status(500).json({ error: 'Could not reset game state.' });
  }
});

app.listen(PORT, () => {
  console.log(`Mexican Train Score Keeper running on http://localhost:${PORT}`);
});
