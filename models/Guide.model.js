import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
    },
    department: {
      type: String,
      default: "Information Technology",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Guide || mongoose.model("Guide", guideSchema);
