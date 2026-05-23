import { NextResponse }
from "next/server";

import { connectDB }
from "@/lib/db";

import { getDashboardData }
from "@/modules/provider/provider.service";



export async function GET() {

  try {

    await connectDB();

    const data =
      await getDashboardData();

    return NextResponse.json({

      success: true,

      data,

    });

  } catch (error: any) {

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