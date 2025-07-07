import express from 'express';
import {
    addStats,
    getStudentStats,
    getHomeworkStats,
    updateStats,
} from '../controllers/statistic.controller.js';

const router = express.Router();

router.get('/getStudentStats/:id', getStudentStats);

router.get('/getHomeworkStats/:id', getHomeworkStats);

router.post('/add-stats', addStats);

router.put('/update-stats', updateStats);

export default router;
