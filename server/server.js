import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// API First endpoint
app.get('/', (req, res) => res.send("API successfully working."));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter); 

app.listen(PORT, (err) =>
    err
        ? console.error(`Error starting server: ${err}`)
        : console.log(`Server running at http://localhost:${PORT}`)
);


