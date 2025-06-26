import express from 'express';
import {
    uploadUQURL,
    deleteUQURL,
    getUQURL,
    updateUQAppearance,
} from '../controllers/unsolvedQustion.controller.js';

const router = express.Router();

router.post('/add-unsolved-question-path', uploadUQURL);

router.put('/update-unsolved-question-view', updateUQAppearance);

router.get('/get-unsolved-question-path', getUQURL);

router.delete('/delete-unsolved-question-path/:path', deleteUQURL);

export default router;
