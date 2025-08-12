import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';
import { getCVData, updateCVData } from '../controllers/cvController.js';
import { newCV } from '../controllers/cvController.js';
import { getCVByID } from '../controllers/cvController.js';

const cvRouter = express.Router();

// API/CV/...

// Get a specific CV by ID
cvRouter.get('/:username/:cvId', getCVByID); // GET /api/cv/:username/:cvId

// Get all CVs for a user
cvRouter.get('/:username', getCVData); // GET /api/cv/:username

// Update an existing CV
cvRouter.put('/:username/:cvId', updateCVData); // POST /api/cv/:username

// Create a new CV for a user
cvRouter.post('/:username/newCv', newCV);




export default cvRouter;