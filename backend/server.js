import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import CONFIG from "./config/index.js";
import connectDB from "./db/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// routes import
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT}`);
});
