import express from 'express';
import {
    uploadUQURL,
    deleteUQURL,
    getUQURL,
    updateUQAppearance,
} from '../controllers/unsolvedQustion.controller.js';

const router = express.Router();

router.post('/unsolved-question-url', uploadUQURL);

router.put('/unsolved-question-url', updateUQAppearance);

router.get('/unsolved-question-url', getUQURL);

router.delete('/unsolved-question-url/:path', deleteUQURL);

export default router;
