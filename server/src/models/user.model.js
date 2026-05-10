import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email"],
      lowercase: true,
      index: true,
    },
    avatar: {
      type: String,
    },
    credits: {
      type: Number,
      default: 200,
      min: [0, "Credits cannot be negative"],
    },
    plan: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
