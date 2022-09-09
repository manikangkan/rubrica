import mongoose from "mongoose";

const rubricSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    criteriaAndMarks: {
      type: [
        {
          criteria: String,
          marks: [Number],
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Rubric || mongoose.model("Rubric", rubricSchema);
