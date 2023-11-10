import express from "express";

import { isLoggedIn } from "../middleware/authMiddleware.js";
import { createActor } from "../controller/actorController.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.route("/").post(upload.single("avatar"), createActor);

export default router;
