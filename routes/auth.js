import express from "express";
import { signInUser, signUpUser } from '../controllers/auth/index.js'

const authRouter = express.Router();

authRouter.post('/signin', signInUser);
authRouter.post('/signup', signUpUser);

export default authRouter;