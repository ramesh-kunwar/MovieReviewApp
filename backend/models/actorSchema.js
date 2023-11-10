import mongoose from "mongoose";

const actorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    about: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: Object,

      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true, // to create createdAt and updatedAt fields
  }
);

export default mongoose.model("Actor", actorSchema);
