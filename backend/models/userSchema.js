import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// create a schema with name, email, mobile and password
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },

    // emailVerification: {
    //   owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   token: {
    //     type: String,
    //     // required: true,
    //   },

    //   createdAt: {
    //     type: Date,
    //     expires: 3600, // 1 hour
    //     default: Date.now,
    //   },
    // },
  },
  {
    timestamps: true, // to create createdAt and updatedAt fields
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Generate salt with bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);
