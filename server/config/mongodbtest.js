import mongoose from 'mongoose';
import User from '../models/userModel.js'; // your User model
import Log from '../models/auditLogModel.js';

async function run() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://eardleywill:VEvSYOz4SYoSWgg8@cluster0.0jeeg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Use mongoose.Types.ObjectId
    const auditLog = await Log.findOne({ _id: new mongoose.Types.ObjectId("68925b0af9c9f97730e34e0f") });

    if (auditLog) {
      console.log('Audit log found:', auditLog);
    } else {
      console.log('Audit log not found for ID');
    }

    // Close connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

run();