import express from 'express';
import { getAllUsers, deleteUser, getAuditLogs, updateRole } from '../controllers/adminController.js';
import  userAuth  from '../middleware/userAuth.js';
import  adminAuth from '../middleware/adminAuth.js';


const adminRouter = express.Router();

// GET all users
adminRouter.get('/all-data', userAuth, adminAuth, getAllUsers);

// DELETE user by ID
adminRouter.delete('/all-data/:username', userAuth, adminAuth, deleteUser);

// Protect this route with adminAuth middleware
adminRouter.get('/audit-logs', userAuth, adminAuth, getAuditLogs);

// Update Role for specific user in Admin dashboard
adminRouter.put('/update-role/:userId', userAuth, adminAuth, updateRole)

export default adminRouter;