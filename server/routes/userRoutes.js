import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUserData } from '../controllers/userController.js';
import {updateUserSettings} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.patch('/settings', userAuth, updateUserSettings);

export default userRouter;