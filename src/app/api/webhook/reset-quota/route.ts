import { NextResponse } from "next/server";

import Provider from "@/models/Provider";

import WebhookEvent from "@/models/WebhookEvent";

import { connectDB } from "@/lib/db";



export async function POST() {

  try {

    await connectDB();



    const webhookId =
      "payment_success_001";



    // IDEMPOTENCY CHECK
    const alreadyProcessed =
      await WebhookEvent.findOne({
        webhookId,
      });



    if (alreadyProcessed) {

      return NextResponse.json({
        success: true,
        message:
          "Webhook already processed",
      });
    }



    // SAVE WEBHOOK EVENT
    await WebhookEvent.create({
      webhookId,
      eventType: "quota_reset",
    });



    // RESET ALL PROVIDER QUOTAS
    await Provider.updateMany(
      {},
      {
        $set: {
          usedQuota: 0,
        },
      }
    );



    // REALTIME UPDATE
    if (global.io) {

      global.io.emit(
        "quota-reset"
      );
    }



    return NextResponse.json({
      success: true,
      message:
        "All quotas reset successfully",
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}