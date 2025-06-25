import express from 'express';
import {
    getHomeworks,
    addHomework,
    deleteHomework,
    updateHomework,
    updateHomeworkStatus,
} from '../controllers/homework.controller.js';

const router = express.Router();

router.get('/get-homeworks', getHomeworks);

router.post('/add-homework', addHomework);

router.delete('/delete-homework/:id', deleteHomework);

router.put('/update-homework/:id', updateHomework);

router.put('/update-homework-status/:id', updateHomeworkStatus);

export default router;
