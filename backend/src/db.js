import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection string will be added here
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/motivation-quotes';

// Set strictQuery to true to avoid DeprecationWarning
mongoose.set('strictQuery', true);

// Only attempt to connect if MongoDB is available
mongoose.connect(MONGODB_URI, {
  retryWrites: false,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch((error) => {
    console.log('⚠ Skipping DB connection for local dev');
  });