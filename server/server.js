import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import cvRouter from './routes/cvRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

const allowedOrigins = [
    'http://localhost:5173',
    'https://your-site.netlify.app',
    'https://www.pelagopass.com'
  ];



app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: function (origin, callback) {
      // Allow server-to-server, Postman, etc.
      if (!origin) return callback(null, true);
  
      // Exact match only — do not use startsWith for security
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

// API First endpoint
app.get('/', (req, res) => res.send("API successfully working."));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter); 
app.use('/api/cv', cvRouter);

app.listen(PORT, (err) => {
    if (err) {
      console.error(`Error starting server: ${err}`);
    } else {
      console.log(`Server running on port ${PORT}`);
    }
  });


