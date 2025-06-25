import express from 'express';
import {
    getSchedule,
    postSchedule,
    deleteSchedule,
    getAllSchedule,
} from '../controllers/timeTable.controller.js';

const router = express.Router();

router.get('/get-schedule/:studentId', getSchedule);

router.get('/get-all-schedule', getAllSchedule);

router.post('/add-schedule', postSchedule);

router.post('/delete-schedule', deleteSchedule);

export default router;
