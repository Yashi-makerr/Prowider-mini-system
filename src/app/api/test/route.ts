import { connectDB } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await connectDB();

    await seedDatabase();

    return NextResponse.json({
      success: true,
      message:
        "Database connected and seeded",
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error,
    });

  }
}