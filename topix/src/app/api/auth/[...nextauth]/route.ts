import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import config from "@/app/api/services/config";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/utils";
import { updateUser } from "@/lib/functions";

// Using credetials callback order is
// authorize -> signIn -> jwt -> session

// Using providers callback is only signIn
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(params) {
      console.log("Sign In Callback Invoked");
      //   User signed in with a provider
      if (params.account?.provider != "credentials") {
        const user = await prisma.user.findUnique({
          where: { email: params.user.email as string },
        });
        if (user && user?.provider !== params.account?.provider)
          throw new Error("EmailAlreadyExists");
      }
      return true;
    },
    async session({ session, token }) {
      console.log("Session callback invoked");
      const newSession = { ...session } as any;
      if (session.user?.name) {
        newSession.user.name = token.name;
        newSession.user.role = token.role;
      }
      return newSession;
    },
    async jwt({ token, trigger, user, session }) {
      // * User only available on first run.
      console.log("JWT callback invoked");
      if (trigger === "update") {
        console.log("JWT Update invoked");
        token.picture = session.user.image;
        console.log({ token, user, session });
        return { ...token, ...session.user };
      }
      let newUser = { ...user } as any;
      let newToken = { ...token } as any;
      if (newUser.firstName && newUser.lastName) {
        newToken.name = `${newUser.firstName} ${newUser.lastName}`;
        newToken.role = newUser.role;
      }
      return newToken;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("Sign in event invoked.", user);
      const newUser = { ...user } as any;
      if (isNewUser && newUser.provider === null) {
        await updateUser(prisma, account?.provider as Provider, user);
      }
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
        console.log("Sign in with credentials invoked!");
        const user = await prisma.user.findFirst({
          where: {
            AND: [
              { provider: "credentials" },
              credentials?.email.includes("@")
                ? { email: credentials.email }
                : { username: credentials?.email },
            ],
          },
        });

        if (user) {
          const matchingPassword =
            user.password &&
            credentials?.password &&
            (await bcrypt.compare(credentials.password, user.password));

          if (!matchingPassword)
            throw new Error("Incorrect Username or Password");
          return user;
        }

        throw new Error("User does not exist or must sign in with provider!");
      },
    }),
  ],
  secret: config.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
} as NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
