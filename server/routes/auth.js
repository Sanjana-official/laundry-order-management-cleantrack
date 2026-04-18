/**
 * server/routes/auth.js
 * POST /api/auth/register
 * POST /api/auth/login
 * GET  /api/auth/me
 */

const express     = require('express');
const jwt         = require('jsonwebtoken');
const rateLimit   = require('express-rate-limit');
const User        = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

/* Rate-limit login attempts: max 10 per 15 min per IP */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10,
  message:  { message: 'Too many login attempts. Try again in 15 minutes.' },
});

/* ── Helper: sign and return JWT ── */
function signToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

/* ──────────────────────────────────────────────
   POST /api/auth/register
   Body: { name, email, password, role? }
   ────────────────────────────────────────────── */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const user  = await User.create({ name, email, password, role });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ──────────────────────────────────────────────
   POST /api/auth/login
   Body: { email, password }
   ────────────────────────────────────────────── */
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Explicitly select password (it's excluded by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = signToken(user._id);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login.' });
  }
});

/* ──────────────────────────────────────────────
   GET /api/auth/me   (protected)
   ────────────────────────────────────────────── */
router.get('/me', protect, (req, res) => {
  res.json({
    user: {
      id:    req.user._id,
      name:  req.user.name,
      email: req.user.email,
      role:  req.user.role,
    },
  });
});

module.exports = router;
