import CONFIG from "../config/index.js";
import asynchandler from "../middleware/asyncHandler.js";
import userModel from "../models/userModel.js";

/***************************************
 * @desc Auth user and get token
 * @route POST /api/users/login
 * @access Public
 *
 ***************************************/

export const registerUser = asynchandler(async (req, res) => {
  res.send("Register user");
});
