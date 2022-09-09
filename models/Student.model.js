import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: [String],
      required: true,
    },
    roll: {
      type: [Number],
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
    },
    guides: {
      type: [String],
    },
    marksReceived: {
      type: [Number],
    },
    evoluteBy: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
