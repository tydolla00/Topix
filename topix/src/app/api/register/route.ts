import { Prisma, PrismaClient, users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
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
  const user = await prisma.users.create({
    data: {
      username,
      email,
      password,
      first_name,
      last_name,
    },
  });
  console.log({ response });
  return NextResponse.json(user);
}
