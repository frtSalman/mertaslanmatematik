import express from 'express';
import {
    addStats,
    getHomeworkStats,
    getStudentStats,
    updateStats,
} from '../controllers/statistic.controller.js';

const router = express.Router();

router.post('/add-stats', addStats);

router.get('/get-stats/:studentId', getStudentStats);

router.get('/get-stats', getHomeworkStats);

router.put('/update-stats', updateStats);

export default router;
