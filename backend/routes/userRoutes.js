import express from "express";
import {
  forgotPassword,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  resendEmailVerificationToken,
  verifyEmail,
  viewProfile,
} from "../controller/userController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/profile").get(isLoggedIn, viewProfile)

router.route("/verify-email").post(isLoggedIn, verifyEmail);
router
  .route("/resend-email-verificationToken")
  .post(isLoggedIn, resendEmailVerificationToken);
router.route("/forgotPassword").post(forgotPassword);

export default router;
