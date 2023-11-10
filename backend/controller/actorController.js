import CONFIG from "../config/index.js";
import asynchandler from "../middleware/asyncHandler.js";
import Actor from "../models/actorSchema.js";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
/***************************************
 * @desc Create Actor
 * @route GET /api/actors/
 * @access Public
 *
 ***************************************/

export const createActor = asynchandler(async (req, res) => {
  const { name, about, gender, avatar } = req.body;
  const { file } = req;

  // console.log(file);
  let imageResult;

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    imageResult = await cloudinary.uploader.upload(file.path, options);
    // console.log(secure_url, public_id);
  } catch (error) {
    console.log(error);
  }
  if (!name || !about || !gender) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  console.log(imageResult);
  const actor = await Actor.create({
    name,
    about,
    gender,
    avatar: {
      url: imageResult.secure_url,
      public_id: imageResult.public_id,
    },
  });

  res.status(201).json({
    msg: "Actor Created successfully",
    actor,
  });
});
