import express from 'express';
import { getStats, getDeviation } from '../controller/cryptoController.js';

const router = express.Router();

// Routes for the cryptocurrency data
router.get('/stats', getStats);
router.get('/deviation', getDeviation);

export default router;
