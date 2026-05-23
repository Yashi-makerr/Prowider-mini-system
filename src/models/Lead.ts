import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ILead extends Document {
  name: string;
  phone: string;
  city: string;
  serviceType: string;
  description?: string;
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    serviceType: {
      type: String,
      required: true,
      enum: ["Service 1", "Service 2", "Service 3"],
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


// IMPORTANT
// Prevent duplicate phone + serviceType
LeadSchema.index(
  { phone: 1, serviceType: 1 },
  { unique: true }
);

const Lead =
  models.Lead || model<ILead>("Lead", LeadSchema);

export default Lead;