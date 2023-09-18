import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const response = await prisma.quizzes.findMany();
  return NextResponse.json(response);
}
