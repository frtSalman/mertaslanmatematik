import express from 'express';
import {
    addStats,
    getStats,
    updateStats,
} from '../controllers/statistic.controller.js';

const router = express.Router();

router.post('/add-stats', addStats);

router.get('/get-stats', getStats);

router.put('/update-stats', updateStats);

export default router;
