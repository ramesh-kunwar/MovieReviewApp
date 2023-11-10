import CONFIG from "../config/index.js";
import asynchandler from "../middleware/asyncHandler.js";
import Actor from "../models/actorSchema.js";
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

/***************************************
 * @desc Get all Actors
 * @route GET /api/actors/
 * @access Public
 * @return all actors
 * *************************************/
export const getActors = asynchandler(async (req, res) => {
  const actors = await Actor.find({});
  res.json(actors);
});

/***************************************
 * @desc Create Actor
 * @route GET /api/actors/
 * @access Private/Admin
 *
 ***************************************/

export const createActor = asynchandler(async (req, res) => {
  const { name, about, gender, avatar } = req.body;
  const { file } = req;

  // console.log(file);
  let imageResult;

  if (file) {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    imageResult = await cloudinary.uploader.upload(file.path, options);
  }

  if (!name || !about || !gender) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const actor = await Actor.create({
    name,
    about,
    gender,
    avatar: {
      url: imageResult?.secure_url,
      public_id: imageResult?.public_id,
    },
  });

  res.status(201).json({
    msg: "Actor Created successfully",
    actor,
  });
});

/***************************************
 * @desc Update Actor
 * @route PUT /api/actors/:id
 * @access Private/Admin
 * @param id
 * @return updated actor
 * *************************************/

export const updateActor = asynchandler(async (req, res) => {
  //

  const { id } = req.params;
  const { file } = req;
  const { name, about, gender } = req.body;

  if (!id) {
    throw new Error("Invalid id");
  }

  const actor = await Actor.findById(id);

  if (!actor) {
    throw new Error("Actor not found");
  }

  const public_id = actor?.avatar?.public_id;

  // remove old image if there was one
  if (public_id && file) {
    await cloudinary.uploader.destroy(public_id);
    // console.log(result, 'result');

    // if (result !== "ok") {
    //   throw new Error("Could not remove image from coudinary");
    // }
  }

  // upload new file if there is new file

  let imageResult;

  if (file) {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    imageResult = await cloudinary.uploader.upload(file.path, options);
  }

  if (actor) {
    actor.name = name || actor.name;
    actor.about = about || actor.about;
    actor.gender = gender || actor.gender;
    actor.avatar = {
      url: imageResult?.secure_url || actor.avatar.url,
      public_id: imageResult?.public_id || actor.avatar.public_id,
    };
  }

  await actor.save();
  res.status(201).json({
    msg: "Actor Created successfully",
    actor,
  });
});
