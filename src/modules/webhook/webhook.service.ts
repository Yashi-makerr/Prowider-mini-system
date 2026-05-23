import Provider from "@/models/Provider";

import WebhookEvent
from "@/models/WebhookEvent";

export async function processQuotaResetWebhook(
  eventId: string
) {

  // CHECK IF ALREADY PROCESSED
  const existingEvent =
    await WebhookEvent.findOne({
      eventId,
    });

  if (existingEvent) {

    return {
      success: false,
      message:
        "Webhook already processed",
    };
  }

  // RESET ALL PROVIDER QUOTAS
  await Provider.updateMany(
    {},
    {
      usedQuota: 0,
    }
  );

  // SAVE EVENT
  await WebhookEvent.create({
    eventId,
  });
  return {
    success: true,
    message:
      "Quota reset successful",
  };
}