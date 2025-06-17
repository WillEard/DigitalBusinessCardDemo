import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';
import { getCVData, updateCVData } from '../controllers/cvController.js';

const cvRouter = express.Router();

// API/CV/...
cvRouter.get('/:username', getCVData); // GET /api/cv/:username
cvRouter.post('/:username', updateCVData); // POST /api/cv/:username

export default cvRouter;