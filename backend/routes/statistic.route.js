import express from 'express';
import {
    addStats,
    getStats,
    updateStats,
} from '../controllers/statistic.controller.js';

const router = express.Router();

router.get('/getStats', getStats);

router.post('/add-stats', addStats);

router.put('/update-stats', updateStats);

export default router;
