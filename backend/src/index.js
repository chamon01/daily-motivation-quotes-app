import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';
import Quote from './models/quote.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, '../../public');
const indexPath = path.join(publicPath, 'index.html');

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS for the frontend - allow both local dev and deployed URLs
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.DEPLOYED_FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// BANNED words list for moderation
const BANNED = ['badword', 'offensive'];

// Fallback quotes used when DB is not available or empty
const FALLBACK_QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

// In-memory submitted quotes used when DB is not connected
const SUBMITTED_QUOTES = [];

// Serve static frontend files from the public directory
app.use(express.static(publicPath));

// GET all quotes (approved & not flagged)
app.get('/api/quotes', async (_req, res) => {
  try {
    const connected = mongoose.connection.readyState === 1;
    if (connected) {
      const list = await Quote.find({ approved: true, flagged: false }).sort({ createdAt: -1 }).lean();
      if (list.length > 0) return res.json({ quotes: list, count: list.length });
    }
    const combined = [...SUBMITTED_QUOTES, ...FALLBACK_QUOTES].map((q, i) => ({
      _id: q._id || `local-${i}`,
      text: q.text,
      author: q.author,
    }));
    return res.json({ quotes: combined, count: combined.length });
  } catch (error) {
    console.error('Error getting quotes:', error);
    const combined = [...SUBMITTED_QUOTES, ...FALLBACK_QUOTES].map((q, i) => ({
      _id: q._id || `local-${i}`,
      text: q.text,
      author: q.author,
    }));
    return res.json({ quotes: combined, count: combined.length });
  }
});

// GET random quote
app.get('/quotes', async (_req, res) => {
  try {
    const connected = mongoose.connection.readyState === 1;
    if (connected) {
      const count = await Quote.countDocuments({ approved: true, flagged: false });
      if (count && count > 0) {
        const rand = Math.floor(Math.random() * count);
        const quote = await Quote.findOne({ approved: true, flagged: false }).skip(rand).lean();
        return res.json({ text: quote.text, author: quote.author, _id: quote._id });
      }
    }
    const pool = [...SUBMITTED_QUOTES, ...FALLBACK_QUOTES];
    const q = pool[Math.floor(Math.random() * pool.length)];
    return res.json({ text: q.text, author: q.author });
  } catch (error) {
    console.error('Error getting quote:', error);
    const pool = [...SUBMITTED_QUOTES, ...FALLBACK_QUOTES];
    const q = pool[Math.floor(Math.random() * pool.length)];
    return res.json({ text: q.text, author: q.author });
  }
});

// Submit a new quote (registered users only)
// Submit a new quote (no auth)
app.post('/quotes', async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Quote text is required' });
    }
    const lower = text.toLowerCase();
    const hit = BANNED.find(w => lower.includes(w));
    const connected = mongoose.connection.readyState === 1;
    if (connected) {
      const quote = await Quote.create({
        text: text.trim(),
        author: author?.trim() || 'Unknown',
        submittedBy: undefined,
        flagged: Boolean(hit),
        flagReason: hit ? `Contains banned word: ${hit}` : undefined,
        approved: !hit,
      });
      return res.status(201).json({ quote });
    }
    // store in memory for runtime session, include only approved quotes in pool
    const q = {
      text: text.trim(),
      author: author?.trim() || 'Unknown',
      flagged: Boolean(hit),
      flagReason: hit ? `Contains banned word: ${hit}` : undefined,
      approved: !hit,
    };
    if (!q.flagged && q.approved) {
      SUBMITTED_QUOTES.unshift({ text: q.text, author: q.author });
    }
    return res.status(201).json({ quote: q });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ error: 'Failed to submit quote' });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// SPA fallback - serve index.html for any unmatched routes (enables React Router)
app.get('*', (_req, res) => res.sendFile(indexPath));

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/`);
});