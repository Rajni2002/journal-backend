import express from "express";
import { createJournal } from '../controllers/journal/post.js'
import auth from "../middleware/auth.js";
import teacherAuth from "../middleware/teacherAuth.js";


const journalRouter = express.Router();

journalRouter.post('/', auth, teacherAuth, createJournal);

export default journalRouter;