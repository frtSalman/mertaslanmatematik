import express from 'express';
import { addStats, updateStats } from '../controllers/statistic.controller.js';

const router = express.Router();

router.post('/add-stats', addStats);

router.put('/update-stats', updateStats);

export default router;
