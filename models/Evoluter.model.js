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
    invitationLink: {
      type: String,
      required: true,
      default: "https://www.rubrica.com",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Evoluter ||
  mongoose.model("Evoluter", evoluterSchema);
