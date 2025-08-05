import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/adminController.js';
import  userAuth  from '../middleware/userAuth.js';
import  adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// GET all users
adminRouter.get('/all-data', userAuth, adminAuth, getAllUsers);

// DELETE user by ID
adminRouter.delete('/all-data/:id', userAuth, adminAuth, deleteUser);

export default adminRouter;