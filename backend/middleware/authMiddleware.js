import jwt from "jsonwebtoken";
import CONFIG from "../config/index.js";
import User from "../models/userSchema.js";
import asynchandler from "./asyncHandler.js";

export const isLoggedIn = asynchandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, CONFIG.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});
