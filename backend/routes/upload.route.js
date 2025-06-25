import express from 'express';
import {
    uploadUQURL,
    deleteUQURL,
    getUQURL,
    updateUQAppearance,
} from '../controllers/unsolvedQustion.controller.js';

const router = express.Router();

router.get('/unsolved-question-url', getUQURL);

router.post('/unsolved-question-url', uploadUQURL);

router.delete('/unsolved-question-url/:path', deleteUQURL);

router.put('/unsolved-question-url', updateUQAppearance);

export default router;
