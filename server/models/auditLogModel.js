import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    adminSnapshot: {
      name: String,
      email: String,
      username: String,
    },
    action: String,
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetUserSnapshot: {
      name: String,
      email: String,
      username: String,
    },
    details: String,
    timestamp: { type: Date, default: Date.now },
  });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;