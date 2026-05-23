import { NextRequest, NextResponse }
from "next/server";

import { connectDB } from "@/lib/db";

import { createLead }
from "@/modules/lead/lead.service";

import { createLeadSchema }
from "@/modules/lead/lead.validation";



export async function POST(
  req: NextRequest
) {

  try {

    await connectDB();



    const body = await req.json();



    // VALIDATE INPUT
    const validatedData =
      createLeadSchema.parse(body);



    // CREATE LEAD
    const lead = await createLead(
      validatedData
    );



    return NextResponse.json({

      success: true,

      message:
        "Lead created successfully",

      data: lead,

    });

  } catch (error: any) {



    // ZOD VALIDATION ERROR
    if (error.name === "ZodError") {

      return NextResponse.json(
        {
          success: false,
          message: error.errors,
        },
        { status: 400 }
      );
    }



    // DUPLICATE LEAD ERROR
    if (error.code === 11000) {

      return NextResponse.json(
        {
          success: false,

          message:
            "Lead already exists for this phone number and service",
        },
        { status: 409 }
      );
    }



    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}