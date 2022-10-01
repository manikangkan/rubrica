import mongoose from "mongoose";

const evoluterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Evoluter ||
  mongoose.model("Evoluter", evoluterSchema);
