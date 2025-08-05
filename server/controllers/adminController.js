import mongoose from 'mongoose';
import User from '../models/userModel.js';
import AuditLog from '../models/auditLogModel.js';

import CV from '../models/cvModel.js';  // adjust path if needed


// Listing users still queries DB (that's fine)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password -resetToken').lean();
    return res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error fetching users' });
  }
};

// Delete a specific user
export const deleteUser = async (req, res) => {
    console.log('DELETE /api/admin/all-data/:username called, params:', req.params, 'cookies:', req.cookies, 'auth header:', req.headers.authorization);
    try {
      const adminUsername = req.user.username;  // From your auth middleware
      const targetUsername = req.params.username;
  
      if (adminUsername === targetUsername) {
        return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
      }
  
      // Find the user first (to get user info before deletion)
      const targetUser = await User.findOne({ username: targetUsername }).select('-password -resetToken').lean();
      if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Get admin info snapshot
      const adminSnapshot = {
        name: req.user.name,
        email: req.user.email,
        username: req.user.username,
        _id: req.user._id,
      };
  
      // Create audit log entry with snapshots BEFORE deletion
      await AuditLog.create({
        adminId: req.user._id,
        adminSnapshot,
        action: 'DELETE_USER',
        targetUserId: targetUser._id,
        targetUserSnapshot: {
          name: targetUser.name,
          email: targetUser.email,
          username: targetUser.username,
          _id: targetUser._id,
        },
        details: `User ${targetUsername} deleted by admin ${adminUsername}`
      });
  
      // inside your try block, before deleting the user:
      await CV.deleteMany({ user_id: targetUser._id });

      // Now delete the user
      const deleted = await User.findOneAndDelete({ username: targetUsername }).select('-password -resetToken').lean();
  
      return res.json({ success: true, message: 'User deleted', user: deleted });
    } catch (err) {
      console.error('deleteUserByUsername error:', err);
      return res.status(500).json({ success: false, message: 'Server error deleting user' });
    }
  };

  // For Logging ADMIN activity
  export const getAuditLogs = async (req, res) => {
    try {
      // Fetch audit logs directly with snapshots included
      const rawLogs = await AuditLog.find()
        .lean()
        .limit(100)
        .sort({ timestamp: -1 });
  
      // Map logs to attach snapshots instead of querying deleted users
      const logsWithSnapshots = rawLogs.map(log => ({
        ...log,
        admin: log.adminSnapshot || { name: 'N/A', email: 'N/A', username: 'N/A' },
        targetUser: log.targetUserSnapshot || { name: 'N/A', email: 'N/A', username: 'N/A' },
      }));
  
      return res.json({ success: true, logs: logsWithSnapshots });
    } catch (error) {
      console.error('getAuditLogs error:', error);
      return res.status(500).json({ success: false, message: 'Server error fetching audit logs' });
    }
  };