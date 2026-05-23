import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ILeadAssignment extends Document {
  leadId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  serviceType: string;
}

const LeadAssignmentSchema = new Schema<ILeadAssignment>(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    providerId: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



// Prevent same provider getting same lead twice
LeadAssignmentSchema.index(
  { leadId: 1, providerId: 1 },
  { unique: true }
);

const LeadAssignment =
  models.LeadAssignment ||
  model<ILeadAssignment>(
    "LeadAssignment",
    LeadAssignmentSchema
  );

export default LeadAssignment;