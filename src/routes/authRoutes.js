import express from 'express';
import { signupUser, loginUser, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signupUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
