import mongoose, {
  Document,
} from "mongoose";

export interface IWebhookEvent
  extends Document {

  webhookId: string;

  eventType: string;

  createdAt: Date;

  updatedAt: Date;
}

const webhookEventSchema =
  new mongoose.Schema(
    {
      webhookId: {
        type: String,
        required: true,
        unique: true,
      },

      eventType: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.WebhookEvent ||
  mongoose.model(
    "WebhookEvent",
    webhookEventSchema
  );