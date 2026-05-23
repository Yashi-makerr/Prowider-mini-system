import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IWebhookEvent extends Document {
  eventId: string;
  processedAt: Date;
}

const WebhookEventSchema =
  new Schema<IWebhookEvent>(
    {
      eventId: {
        type: String,
        required: true,
        unique: true,
      },

      processedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

const WebhookEvent =
  models.WebhookEvent ||
  model<IWebhookEvent>(
    "WebhookEvent",
    WebhookEventSchema
  );

export default WebhookEvent;