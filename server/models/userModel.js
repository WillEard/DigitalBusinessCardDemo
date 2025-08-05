import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number, default: ''},
    verifyOTP: {type: String, default: ''},
    verifyOTPExpiry: {type: Number, default: 0},
    isVerified: {type: Boolean, default: false},
    resetOTP: {type: String, default: ''},
    resetOTPExpireAt: {type: Number, default: 0},
    subscriptionType: {type: String, default: 'Free'},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
});
  
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;