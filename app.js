import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import './services/cronJob.js';  // Make sure this import is there

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware for JSON requests
app.use(express.json());

// Routes
app.use('/api/crypto', cryptoRoutes);

// Server setup
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
