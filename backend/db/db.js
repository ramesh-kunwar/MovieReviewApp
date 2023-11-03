import mongoose from "mongoose";

import CONFIG from "../config/index.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    CONFIG;
    await mongoose.connect(CONFIG.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
