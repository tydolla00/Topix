import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import NextAuth from "next-auth/next";
import type { AuthOptions, NextAuthOptions } from "next-auth";
import { authenticate } from "@/app/api/services/authService";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { decode, encode } from "next-auth/jwt";

interface Context {
  params: { nextauth: string[] };
}

const prisma = new PrismaClient();

export const authOptions = (request: NextRequest, context: Context) => {
  const { params } = context;
  const isCredentialsCallback =
    params?.nextauth?.includes("callback") &&
    params.nextauth.includes("credentials") &&
    request.method === "POST";
  return [
    request,
    context,
    {
      adapter: PrismaAdapter(prisma),
      providers: [
        GoogleProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
        }),
        AppleProvider({
          clientId: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
          name: "credentials",
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "Password", type: "password" },
          },
          authorize: async (credentials) => {
            try {
              console.log("In here");
              const result = await authenticate(credentials);
              if (!result) throw new Error("Unacceptable");
              const { email, password } = result.data;

              const user = await prisma.users.findUnique({
                where: {
                  email,
                },
              });
              if (!user) throw new Error("User does not exist");
              // if(user.provider !== "credentials") throw new Error("Please sign in with provider")
              const matchingPassword =
                user.password &&
                (await bcrypt.compare(password, user?.password));
              if (!matchingPassword) throw new Error("Incorrect password");

              return user as any;
            } catch (error) {
              if (
                error instanceof Prisma.PrismaClientInitializationError ||
                error instanceof Prisma.PrismaClientKnownRequestError
              )
                throw new Error("System error. ");
              throw error;
            }
          },
        }),
      ],
      callbacks: {
        async signIn({ user }: { user: any }) {
          if (isCredentialsCallback) {
            if (user) {
              const sessionToken = randomUUID();
              const sessionExpiry = new Date(
                Date.now() + 60 * 60 * 24 * 30 * 1000
              );
              cookies().set("next-auth.session-token", sessionToken, {
                expires: sessionExpiry,
              });
            }
          }
          return true;
        },
        // async redirect({ baseUrl }: { baseUrl: any }) {
        //   return baseUrl;
        // },
      },
      secret: process.env.NEXTAUTH_SECRET,
      jwt: {
        maxAge: 60 * 60 * 24 * 30,
        encode: async (arg: any) => {
          if (isCredentialsCallback) {
            const cookie = cookies().get("next-auth.session-token");
            if (cookie) return cookie.value;
            return "";
          }
          return encode(arg);
        },
        decode: async (arg: any) => {
          if (isCredentialsCallback) return null;
          return decode(arg);
        },
      },
      debug: process.env.NODE_ENV === "development",
      events: {
        async signOut({ session }: { session: any }) {
          const { sessionToken = "" } = session as unknown as {
            sessionToken?: string;
          };
          if (sessionToken) {
          }
        },
      },
      pages: {
        signIn: "/login",
        // newUser: "/",
        // signOut: "/login",
      },
    } as AuthOptions,
  ] as const;
};

async function handler(request: NextRequest, context: Context) {
  return NextAuth(...authOptions(request, context));
}

export { handler as GET, handler as POST };
