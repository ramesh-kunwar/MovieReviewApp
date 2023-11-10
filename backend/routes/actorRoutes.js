import express from "express";

import { isLoggedIn } from "../middleware/authMiddleware.js";
import {
  createActor,
  getActors,
  updateActor,
} from "../controller/actorController.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.route("/").post(upload.single("avatar"), createActor).get(getActors);
router.route("/:id").put(upload.single("avatar"), updateActor);

export default router;
