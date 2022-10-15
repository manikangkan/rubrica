import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    names: {
      type: [String],
      required: true,
    },
    rollNumbers: {
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
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
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
