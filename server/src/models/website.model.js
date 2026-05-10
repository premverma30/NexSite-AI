import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ai", "user"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { _id: false, timestamps: true }
);

const websiteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // important for querying by user
    },
    title: {
      type: String,
      default: "Untitled Website",
      trim: true,
    },
    latestCode: {
      type: String,
      required: [true, "Code cannot be empty"],
    },
    conversation: [messageSchema],
    deployed: {
      type: Boolean,
      default: false,
    },
    deployUrl: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Optimize query for fetching a user's websites
websiteSchema.index({ user: 1, updatedAt: -1 });

const Website = mongoose.model("Website", websiteSchema);
export default Website;
