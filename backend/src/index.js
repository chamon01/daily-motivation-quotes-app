import express from 'express';
import cors from 'cors';
import './db.js';

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS for the frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

app.get('/quotes', (req, res) => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
  } catch (error) {
    console.error('Error getting quote:', error);
    res.status(500).json({ error: 'Failed to get quote' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});