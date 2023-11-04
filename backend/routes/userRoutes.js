import express from "express";
import {
  forgotPassword,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  resendEmailVerificationToken,
  verifyEmail,
} from "../controller/userController.js";
const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

router.route("/verify-email").post(verifyEmail);
router
  .route("/resend-email-verificationToken")
  .post(resendEmailVerificationToken);
router.route("/forgotPassword").post(forgotPassword);

export default router;
