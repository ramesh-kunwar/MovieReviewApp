import CONFIG from "../config/index.js";
import asynchandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

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

  res.status(201).json({
    msg: "user Registered successfully",
    user,
  });
});
