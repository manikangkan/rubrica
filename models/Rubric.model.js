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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evoluter",
    },
    criteriaAndMarks: {
      type: [
        {
          criteria: String,
          marks: [
            {
              mark: Number,
              checked: {
                type: Boolean,
                default: false,
              },
            },
          ],
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
