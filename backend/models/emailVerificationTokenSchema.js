import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailVerificationTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    // required: true,
  },

  createdAt: {
    type: Date,
    expires: 3600, // 1 hour
    default: Date.now,
  },
});

emailVerificationTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }

  // Generate salt with bcrypt
  this.token = await bcrypt.hash(this.token, 10);
});

emailVerificationTokenSchema.methods.cmpareToken = async function (token) {
  return await bcrypt.compare(token, this.token);
};

export default mongoose.model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
