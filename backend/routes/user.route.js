import express from 'express';
import { getStudents } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/students/:teacherId', getStudents);

export default router;
