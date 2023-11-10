import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import CONFIG from "./config/index.js";
import connectDB from "./db/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

import { v2 as cloudinary } from "cloudinary";

// routes import
import userRoutes from "./routes/userRoutes.js";
import actorRoutes from "./routes/actorRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

cloudinary.config({
  cloud_name: CONFIG.CLOUD_NAME,
  api_key: CONFIG.CLOUD_API_KEY,
  api_secret: CONFIG.CLOUD_API_SECRET,
  secure: true,
});


app.get("/", (req, res) => {
  res.send("Hello World");
});



app.use("/api/users", userRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});
