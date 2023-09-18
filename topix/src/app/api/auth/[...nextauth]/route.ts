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

// Using credetials callback order is
// authorize -> signIn -> jwt -> session

// Using providers callback is only signIn
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(params) {
      console.log("Preparams", { params });
      //   User signed in with a provider
      if (params.account?.provider != "credentials") {
        const isAlreadyUser = await prisma.user.findUnique({
          where: {
            email: params.user.email as string,
          },
        });
        // if (isAlreadyUser) {
        //   console.log("Got here");
        //   throw new Error("EmailAlreadyExists");
        // }
        const newUser = { ...params.user } as any;
        newUser.dummy = params.account?.provider;
        params.user = newUser;
        console.log("In Signin", params);
      }
      return true;
    },
    async session({ session, token }) {
      console.log("Session", session, token);
      if (session.user?.name) session.user.name = token.name;
      return session;
    },
    async jwt({ token, trigger, user }) {
      // * User only available on first run.
      console.log("In JWT", user, token);
      if (trigger === "update") {
        console.log("Update", token, trigger, user);
      }
      let newUser = { ...user } as any;
      if (newUser.first_name && newUser.last_name)
        token.name = `${newUser.first_name} ${newUser.last_name}`;
      return token;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      const newUser = { ...user } as any;
      console.log({ newUser });
      if (isNewUser && newUser.provider === null) {
        const newName = user.name?.split(" ") as string[];
        await prisma.user.update({
          where: {
            email: user.email as string,
          },
          data: {
            provider: account?.provider as Provider,
            first_name: newName[0],
            last_name: newName[1],
          },
        });
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
        console.log("Authorize", req);
        const user = await prisma.user.findUnique({
          where: credentials?.email.includes("@")
            ? { email: credentials?.email }
            : { username: credentials?.email },
        });

        if (user) {
          if (user.provider !== "credentials")
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
