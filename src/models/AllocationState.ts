import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAllocationState extends Document {
  serviceType: string;
  lastAssignedIndex: number;
}

const AllocationStateSchema =
  new Schema<IAllocationState>(
    {
      serviceType: {
        type: String,
        required: true,
        unique: true,
      },

      lastAssignedIndex: {
        type: Number,
        default: -1,
      },
    },
    {
      timestamps: true,
    }
  );

const AllocationState =
  models.AllocationState ||
  model<IAllocationState>(
    "AllocationState",
    AllocationStateSchema
  );

export default AllocationState;