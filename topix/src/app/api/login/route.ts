import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "@/app/api/services/config";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  console.log("here");
  const { username, password } = await req.json();
  try {
    const isUser = await prisma.users.findUnique({
      where: { username },
    });
    console.log(isUser, password);
    if (!isUser) return NextResponse.json({ error: "errorrrr" });

    const isEqual =
      isUser.password && (await bcrypt.compare(password, isUser.password));
    if (!isEqual) return NextResponse.json({ error: "error" });
    const expirationDate = Date.now() / 1000 + 60 * 60;
    const accessToken = jwtCreate(username, expirationDate);
    return NextResponse.json({
      token: accessToken,
      expiry: expirationDate,
      firstName: isUser.first_name,
      profile_picture: isUser.profile_picture,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "You have encountered an error" });
  }
}

const jwtCreate = (username: string, expirationDate: number) => {
  return jwt.sign(
    {
      sub: username,
      iat: Math.floor(Date.now() / 1000),
      exp: expirationDate, // Expire after one hour
    },
    config.SECRET_KEY
  );
};
