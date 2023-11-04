import CONFIG from "../config/index.js";
import asynchandler from "../middleware/asyncHandler.js";
import EmailVerificationToken from "../models/emailVerificationTokenSchema.js";
import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";

import crypto from "crypto";
import { generateMailTransporter, generateOTP } from "../utils/mailHelper.js";
import PasswordReset from "../models/passwordResetSchema.js";

/***************************************
 * @desc Get all users
 * @route GET /api/users/
 * @access Public
 *
 ***************************************/

export const getUsers = asynchandler(async (req, res) => {
  const users = await User.find({});

  res.status(201).json({
    msg: "user Registered successfully",
    totalUsers: users.length,
    users,
  });
});
/***************************************
 * @desc Auth user and get token
 * @route POST /api/users/login
 * @access Public
 *
 ***************************************/

export const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  generateToken(res, user._id);

  // generate otp, store in db and send to user's email
  const OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: email,
    subject: "Email Verification",
    html: `<p> Your OTP is </p> <h1> ${OTP} </h1>`,
  });

  res.status(201).json({
    msg: "Verification otp is sent to your email",
    user,
  });
});

/***************************************
 * @desc Login user
 * @route POST /api/users/login
 * @access Public
 * ***************************************/

export const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  generateToken(res, user._id);
  res.status(200).json({
    msg: "User logged in successfully",
    user,
  });
});

/***************************************
 * @desc Logout User
 * @Method POST
 * @route GET /api/users/logout
 * @access Public
 * ***************************************/

export const logoutUser = asynchandler(async (req, res) => {
  res.cookie("jwt", null, {
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    msg: "User logged out successfully",
  });
});

/***************************************
 * @desc Email verification
 * @route POST /api/users/verify
 * @access Public
 * ***************************************/

export const verifyEmail = asynchandler(async (req, res) => {
  const userId = req.user._id;
  const { otp } = req.body;

  console.log(userId, otp);

  console.log(userId);
  if (!userId) {
    res.status(400);
    throw new Error("User doesn't exist");
  }
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  const token = await EmailVerificationToken.findOne({
    owner: userId,
  });
  console.log(token);
  console.log(user);

  if (!token) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  const isMatch = await token.cmpareToken(otp);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  user.isVerified = true;
  await user.save();

  // delete token after user is verified
  await EmailVerificationToken.findByIdAndDelete(token._id);

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome To Review App",
    html: `<h1> Welcome To Movie Review App</h1>`,
  });
  res.status(201).json({
    msg: "User verified successfully",
  });
});

/***************************************
 * @desc Resend email verification token
 * @route GET /api/users/profile
 * @access Public
 *
 ***************************************/

export const resendEmailVerificationToken = asynchandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  const existingToken = await EmailVerificationToken.findOne({ owner: userId });

  if (existingToken) {
    res.status(400);
    throw new Error("Only after one hour you request for another OTP");
  }

  // if token doesn't exist, generate a new one
  const OTP = generateOTP();
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email Verification",
    html: `<p> Your OTP is </p> <h1> ${OTP} </h1>`,
  });

  res.status(201).json({
    msg: "Verification otp is sent to your email",
  });
});

/***************************************
 * @desc Forgot Password
 * @route POST /api/users/login
 * @access Public
 *
 ***************************************/

export const forgotPassword = asynchandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const existingToken = await PasswordReset.findOne({
    owner: user._id,
  });

  if (existingToken) {
    res.status(400);
    throw new Error("Only after one hour you request for another OTP");
  }

  const token = crypto.randomBytes(20).toString("hex");

  const passwordResetToken = await new PasswordReset({
    owner: user._id,
    token,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/forgotPassword?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter();
  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Reset Password",
    html: `<p> Click this link to reset your password </p> <a href=${resetPasswordUrl}> ${resetPasswordUrl} </a>`,
  });

  await passwordResetToken.save();

  res.status(200).json({
    msg: "Reset password link is sent to your email",
  });
});

/***************************************
 * @desc  View Profile
 * @route GET /api/users/profile
 * @access Private
 *
 ***************************************/

export const viewProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    msg: "User profile",
    user,
  });
});
