// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
// import NextAuth from "next-auth/next";
// import type { AuthOptions, NextAuthOptions } from "next-auth";
// import { authenticate } from "@/app/api/services/authService";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { Prisma, PrismaClient } from "@prisma/client";
// import { NextRequest } from "next/server";
// import * as bcrypt from "bcrypt";
// import { cookies } from "next/headers";
// import { randomUUID } from "crypto";
// import { decode, encode } from "next-auth/jwt";

// interface Context {
//   params: { nextauth: string[] };
// }

// const prisma = new PrismaClient();

// export const authOptions = (request: NextRequest, context: Context) => {
//   const { params } = context;
//   const isCredentialsCallback =
//     params?.nextauth?.includes("callback") &&
//     params.nextauth.includes("credentials") &&
//     request.method === "POST";
//   return [
//     request,
//     context,
//     {
//       adapter: PrismaAdapter(prisma),
//       providers: [
//         GoogleProvider({
//           clientId: process.env.GITHUB_ID!,
//           clientSecret: process.env.GITHUB_SECRET!,
//         }),
//         AppleProvider({
//           clientId: process.env.GITHUB_ID!,
//           clientSecret: process.env.GITHUB_SECRET!,
//         }),
//         CredentialsProvider({
//           name: "credentials",
//           credentials: {
//             email: { label: "email", type: "text" },
//             password: { label: "Password", type: "password" },
//           },
//           authorize: async (credentials) => {
//             try {
//               console.log("In here");
//               const result = await authenticate(credentials);
//               if (!result) throw new Error("Unacceptable");
//               const { email, password } = result.data;

//               const user = await prisma.users.findUnique({
//                 where: {
//                   email,
//                 },
//               });
//               if (!user) throw new Error("User does not exist");
//               // if(user.provider !== "credentials") throw new Error("Please sign in with provider")
//               const matchingPassword =
//                 user.password &&
//                 (await bcrypt.compare(password, user?.password));
//               if (!matchingPassword) throw new Error("Incorrect password");

//               return user as any;
//             } catch (error) {
//               if (
//                 error instanceof Prisma.PrismaClientInitializationError ||
//                 error instanceof Prisma.PrismaClientKnownRequestError
//               )
//                 throw new Error("System error. ");
//               throw error;
//             }
//           },
//         }),
//       ],
//       callbacks: {
//         async signIn({ user }: { user: any }) {
//           if (isCredentialsCallback) {
//             if (user) {
//               const sessionToken = randomUUID();
//               const sessionExpiry = new Date(
//                 Date.now() + 60 * 60 * 24 * 30 * 1000
//               );
//               cookies().set("next-auth.session-token", sessionToken, {
//                 expires: sessionExpiry,
//               });
//             }
//           }
//           return true;
//         },
//         // async redirect({ baseUrl }: { baseUrl: any }) {
//         //   return baseUrl;
//         // },
//       },
//       secret: process.env.NEXTAUTH_SECRET,
//       jwt: {
//         maxAge: 60 * 60 * 24 * 30,
//         encode: async (arg: any) => {
//           if (isCredentialsCallback) {
//             const cookie = cookies().get("next-auth.session-token");
//             if (cookie) return cookie.value;
//             return "";
//           }
//           return encode(arg);
//         },
//         decode: async (arg: any) => {
//           if (isCredentialsCallback) return null;
//           return decode(arg);
//         },
//       },
//       debug: process.env.NODE_ENV === "development",
//       events: {
//         async signOut({ session }: { session: any }) {
//           const { sessionToken = "" } = session as unknown as {
//             sessionToken?: string;
//           };
//           if (sessionToken) {
//           }
//         },
//       },
//       pages: {
//         signIn: "/login",
//         // newUser: "/",
//         // signOut: "/login",
//       },
//     } as AuthOptions,
//   ] as const;
// };

// async function handler(request: NextRequest, context: Context) {
//   return NextAuth(...authOptions(request, context));
// }

// export { handler as GET, handler as POST };

import { randomUUID } from "crypto";
import type { DefaultSession } from "@auth/core/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";

export type { Session } from "next-auth";

export const providers = ["email", "discord"] as const;
export type OAuthProviders = (typeof providers)[number];

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const maxAge = 30 * 24 * 60 * 60; // 30 days

const authorize = async (credentials: any) => {
  const { email, password } = credentials;
  let user;
  try {
    user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, 10),
        },
      });
    } else {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        throw new Error("Password is not correct");
      }
    }
    const token = randomUUID();
    await prisma.session.create({
      data: {
        userId: user.id,
        expires: new Date(Date.now() + maxAge * 1000),
        sessionToken: token,
      },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      sessionToken: token,
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

const EmailCredentials = CredentialsProvider({
  name: "email",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize,
});

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as any,
  providers: [EmailCredentials],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: maxAge, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.userId = user.id;
        token.sessionToken = user.sessionToken;
      }
      if (token?.sessionToken) {
        const session = await prisma.session.findUnique({
          where: {
            sessionToken: token.sessionToken,
          },
          select: { expires: true },
        });
        if (!session) {
          return null;
        }
      }
      return token;
    },
  },
  events: {
    signOut: async ({ token, session }: { token: any; session: any }) => {
      if (token?.sessionToken) {
        await prisma.session.delete({
          where: { sessionToken: token.sessionToken },
        });
      }
    },
  },
};

async function handler(request: NextRequest) {
  return NextAuth(authOptions);
}

export { handler as GET, handler as POST };

// export const {
//   handlers: { GET, POST },
//   auth,
//   CSRF_experimental,
// } = NextAuth(authOptions);
