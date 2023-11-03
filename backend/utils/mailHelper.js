import CONFIG from "../config/index.js";
import nodemailer from "nodemailer";
export const generateOTP = (optLength = 6) => {
  let OTP = "";
  for (let i = 0; i < optLength; i++) {
    OTP += Math.floor(Math.random() * 10);
  }

  return OTP;
};

export const generateMailTransporter = () => {
  return nodemailer.createTransport({
    host: CONFIG.SMTP_HOST,
    port: CONFIG.SMTP_PORT,
    auth: {
      user: CONFIG.SMTP_USER,
      pass: CONFIG.SMTP_PASS,
    },
  });
};
