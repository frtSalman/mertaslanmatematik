import express from 'express';
import {
    addStats,
    getHomeworkStats,
    getStudentStats,
    updateStats,
} from '../controllers/statistic.controller.js';

const router = express.Router();

router.get('/student-stats/:studentId', getStudentStats);

router.get('/all-stats', getHomeworkStats);

router.post('/add-stats', addStats);

router.put('/update-stats', updateStats);

export default router;
