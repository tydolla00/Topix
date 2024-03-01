import { prisma } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Called");
  const response = await prisma.user.findMany();
  return NextResponse.json(response);
}
