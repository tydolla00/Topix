import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
export async function POST(req: NextRequest, res: Response) {
  const response = await req.json();
  const { name, username, email, password, firstName, lastName } = response;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        provider: "credentials",
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log("Error", { error });
    const failed = error.meta.target[0];
    if (failed === "username")
      return NextResponse.json(
        `Username ${username} already exists. Please choose a differnet one.`,
        { status: 400 }
      );
    else if (failed === "email")
      return NextResponse.json(
        `Account with email ${email} already created. Please sign in or use a different email`,
        { status: 400 }
      );
    console.log(error.meta.target);
  }
}
