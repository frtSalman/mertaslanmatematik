import express from 'express';
import cors from 'cors';
import {
    uploadUQURL,
    deleteUQURL,
    getUQURL,
    updateUQAppearance,
} from '../controllers/unsolvedQustion.controller.js';

const router = express.Router();

router.options('/unsolved-question-url', cors());

router.post('/unsolved-question-url', uploadUQURL);

router.put('/unsolved-question-url', updateUQAppearance);

router.get('/unsolved-question-url', getUQURL);

router.delete('/unsolved-question-url/:path', deleteUQURL);

export default router;
