import { Prisma, PrismaClient, users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const response = await req.json();
  const {
    username,
    email,
    password,
    firstName: first_name,
    lastName: last_name,
  } = response;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      provider: "Credentials",
    },
  });
  console.log({ response });
  return NextResponse.json(user);
}
