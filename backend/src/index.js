import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';

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

// Sample quotes array (will be replaced with MongoDB data later)
const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
];

// Serve static frontend files from the public directory
app.use(express.static(publicPath));

// GET all quotes
app.get('/api/quotes', (req, res) => {
  try {
    res.json({
      quotes: quotes,
      count: quotes.length
    });
  } catch (error) {
    console.error('Error getting quotes:', error);
    res.status(500).json({ error: 'Failed to get quotes' });
  }
});

// GET random quote
app.get('/quotes', (req, res) => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
  } catch (error) {
    console.error('Error getting quote:', error);
    res.status(500).json({ error: 'Failed to get quote' });
  }
});

app.post('/quotes', (req, res) => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
  } catch (error) {
    console.error('Error posting quote:', error);
    res.status(500).json({ error: 'Failed to get quote' });
  }
});

app.post('/favorites', (req, res) => {
  try {
    // Stub endpoint - just return success for MVP
    res.json({ 
      success: true, 
      message: 'Quote added to favorites',
      favorite: req.body 
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
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