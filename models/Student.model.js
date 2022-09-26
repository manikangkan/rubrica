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
    evolutedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evoluter",
    },
    rubric: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rubric",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
