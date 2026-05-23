import { NextRequest,
         NextResponse }
from "next/server";

import { connectDB }
from "@/lib/db";

import {
  processQuotaResetWebhook
}
from "@/modules/webhook/webhook.service";



export async function POST(
  req: NextRequest
) {

  try {

    await connectDB();



    const body =
      await req.json();



    const { eventId } = body;



    if (!eventId) {

      return NextResponse.json(
        {
          success: false,
          message:
            "eventId required",
        },
        { status: 400 }
      );
    }



    const result =
      await processQuotaResetWebhook(
        eventId
      );



    return NextResponse.json(
      result
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      { status: 500 }
    );
  }
}