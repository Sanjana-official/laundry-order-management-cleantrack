/**
 * server/index.js
 * CleanTrack Express server — entry point
 */

require('dotenv').config();

const express    = require('express');
const path       = require('path');
const cors       = require('cors');
const connectDB  = require('./db');

const authRoutes  = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ────────────────────────────── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin:      process.env.CLIENT_ORIGIN || '*',
  credentials: true,
}));

/* ── API Routes ────────────────────────────── */
app.use('/api/auth',   authRoutes);
app.use('/api/orders', orderRoutes);

/* Health check */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Serve static frontend (production) ───── */
const clientDir = path.join(__dirname, '..', 'client', 'public');
app.use(express.static(clientDir));

// Catch-all: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'));
});

/* ── Start server ──────────────────────────── */
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀  CleanTrack server running on http://localhost:${PORT}`);
      console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();