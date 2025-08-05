import express from 'express';
import { getAllUsers, deleteUser, getAuditLogs } from '../controllers/adminController.js';
import  userAuth  from '../middleware/userAuth.js';
import  adminAuth from '../middleware/adminAuth.js';


const adminRouter = express.Router();

// GET all users
adminRouter.get('/all-data', userAuth, adminAuth, getAllUsers);

// DELETE user by ID
adminRouter.delete('/all-data/:username', userAuth, adminAuth, deleteUser);

// Protect this route with adminAuth middleware
adminRouter.get('/audit-logs', userAuth, adminAuth, getAuditLogs);

export default adminRouter;