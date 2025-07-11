import userModel from '../models/userModel.js';
// Removed unused isAuthenticated import

const getUserData = async (req, res) => { 
    try {
         const {userId} = req.body;

         const user = await userModel.findById(userId);

         if (!user){
            return res.json({success: false, message: "User not found"});
         }

         res.json({success: true, userData: {
            name: user.name,
            username: user.username,
            isVerified: user.isVerified,
            email: user.email,
            phoneNumber: user.phoneNumber
         }});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export { getUserData };
