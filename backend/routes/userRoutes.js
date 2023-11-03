import express from "express";
import {
  getUsers,
  registerUser,
  resendEmailVerificationToken,
  verifyEmail,
} from "../controller/userController.js";
const router = express.Router();

router.route("/").post(registerUser).get(getUsers);

router.route("/verify-email").post(verifyEmail);
router.route("/resend-email-verificationToken").post(resendEmailVerificationToken);


export default router;
