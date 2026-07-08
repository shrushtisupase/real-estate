import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },

    buyerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    buyerPhone: {
      type: String,
      trim: true,
    },

    budget: {
      type: Number,
      min: 0,
    },

    source: {
      type: String,
      enum: ["Website", "Referral", "Walk-in"],
      default: "Website",
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Site Visit",
        "Negotiation",
        "Closed",
      ],
      default: "New",
    },

    nextFollowUp: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({ agentId: 1 });
leadSchema.index({ propertyId: 1 });
leadSchema.index({ status: 1 });

export default mongoose.model("Lead", leadSchema);