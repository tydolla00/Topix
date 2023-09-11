import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import config from "@/app/api/services/config";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(params) {
      return true;
    },
    async session({ session, token }) {
      if (session.user?.name) session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      // * User only available on first run.
      let newUser = { ...user } as any;
      if (newUser.first_name && newUser.last_name)
        token.name = `${newUser.first_name} ${newUser.last_name}`;
      return token;
    },
  },
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
        // Find user within database
        const user = await prisma.user.findUnique({
          where: { username: credentials?.email },
        });

        if (user) {
          if (user.provider !== "Credentials")
            throw new Error(`Please sign in with ${user.provider}`);

          const matchingPassword =
            user.password &&
            credentials?.password &&
            (await bcrypt.compare(credentials.password, user.password));

          if (!matchingPassword)
            throw new Error("Incorrect Username or Password");
          return user;
        }

        throw new Error("User does not exist");
      },
    }),
  ],
  secret: config.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
} as NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
