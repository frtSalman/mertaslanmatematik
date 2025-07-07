import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './utils/database.js';
import authRoutes from './routes/auth.route.js';
import timeTableRoutes from './routes/timeTable.route.js';
import userRoutes from './routes/user.route.js';
import homeworkRoutes from './routes/homework.route.js';
import statisticRoutes from './routes/statistic.route.js';
import uploadRoutes from './routes/upload.route.js';
import { getStats } from './controllers/statistic.controller.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'https://mertaslanmatematik.com',
    'https://www.mertaslanmatematik.com',
    'http://127.0.0.1:5173',
];

app.use(express.json()); // allow us to parse incoming request from req.body
app.use(cookieParser()); // allow us to parse incoming cookies

app.use(
    cors({
        origin: (origin, callback) => {
            // allow requests with no origin (mobile apps, curl, Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.warn('Blocked CORS for origin:', origin);
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Custom-Header',
            'AccessKey',
        ],
    })
);

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome To My API' });
});

app.use('/api/analysis', statisticRoutes);

app.use('/api/uploads', uploadRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/timetable', timeTableRoutes);

app.use('/api/users', userRoutes);

app.use('/api/homeworks', homeworkRoutes);

db.sync()
    .then(results =>
        app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))
    )
    .catch(err => {
        console.trace(err);
    });
