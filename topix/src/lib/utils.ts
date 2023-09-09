import { type ClassValue, clsx } from "clsx";
import { NextAuthOptions } from "next-auth";
import { twMerge } from "tailwind-merge";
import config from "@/app/api/services/config";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("User does not exist");
        if (user.provider !== "Credentials")
          throw new Error(`Please sign in with ${user.provider}`);

        const matchingPassword =
          user.password &&
          credentials?.password &&
          (await bcrypt.compare(credentials.password, user.password));
        if (!matchingPassword)
          throw new Error("Incorrect Username or Password");

        return user;
      },
    }),
  ],
  secret: config.NEXTAUTH_SECRET,
} as NextAuthOptions;
