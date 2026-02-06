import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    phone: {
      type: String,
      required: true
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Hired"],
      default: "Pending",
      index: true
    },

    resumeUrl: {
      type: String
    },
    
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Candidate", candidateSchema);
