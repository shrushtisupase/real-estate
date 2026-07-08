import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Available", "Reserved", "Sold"],
      default: "Available",
    },

    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "Plot", "Commercial"],
      default: "Apartment",
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number,
      default: 0,
    },

    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      lat: Number,

      lng: Number,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    documents: [
      {
        type: String,
      },
    ],

    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.index({ agentId: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ price: 1 });

export default mongoose.model("Property", propertySchema);