"use client";

import { AuthProvider, UserAuthData } from "../hooks/useAuth";
import { getFromLocalStorage } from "../hooks/useLocalStorage";
import { SessionProvider } from "next-auth/react";

export default function EntryPoint({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  let authData = getFromLocalStorage<UserAuthData>("user");
  return (
    <SessionProvider session={session}>
      <AuthProvider storedAuthData={authData}>{children}</AuthProvider>
    </SessionProvider>
  );
}
