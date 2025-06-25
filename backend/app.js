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

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allow us to parse incoming request from req.body
app.use(cookieParser()); // allow us to parse incoming cookies
app.use(
    cors({
        origin: [
            'https://www.mertaslanmatematik.com',
            'https://mertaslanmatematik.com',
        ],
        credentials: true,
    })
); // prevent the cors errors

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome To My API' });
});

app.use('/api/auth', authRoutes);

app.use('/api/timetable', timeTableRoutes);

app.use('/api/users', userRoutes);

app.use('/api/homeworks', homeworkRoutes);

app.use('/api/student-statistics', statisticRoutes);

app.use('/api/uploads', uploadRoutes);

db.sync()
    .then(results =>
        app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))
    )
    .catch(err => {
        console.trace(err);
    });
