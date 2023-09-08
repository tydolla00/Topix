import { type ClassValue, clsx } from "clsx";
import { NextAuthOptions } from "next-auth";
import { twMerge } from "tailwind-merge";
import config from "@/app/api/services/config";
import GoogleProvider from "next-auth/providers/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
