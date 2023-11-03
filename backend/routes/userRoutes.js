import express from 'express';
import { getUsers, registerUser } from '../controller/userController.js';
const router = express.Router();



router.route("/").post(registerUser).get(getUsers)


export default router;