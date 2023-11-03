import jwt from "jsonwebtoken";
import CONFIG from "../config/index.js";
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, CONFIG.JWT_SECRET, {
    expiresIn: "30d",
  });

  // set jwt as httpOnly cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: CONFIG.NODE_ENV === "production" ? true : false, // set true only in production mode because https is required
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "strict",
  });
};

export default generateToken;
