import express from 'express';
import {
    addStats,
    getStudentStats,
    getHomeworkStats,
    updateStats,
} from '../controllers/statistic.controller.js';

const router = express.Router();

router.get('/ping', (req, res) => res.json({ ok: true }));

router.get('/getstudentstats/:id', getStudentStats);

router.get('/gethomeworkstats/:id', getHomeworkStats);

router.post('/add-stats', addStats);

router.put('/update-stats', updateStats);

export default router;
