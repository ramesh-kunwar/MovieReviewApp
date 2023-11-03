import mongoose from "mongoose";

// create a schema with name, email, mobile and password
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // to make sure that no two users can register with the same email
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // to create createdAt and updatedAt fields
  }
);

export default mongoose.model("User", userSchema);
