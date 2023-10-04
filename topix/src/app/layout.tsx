import "./globals.css";
import type { Metadata } from "next";
import EntryPoint from "./_components/entryPoint";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export const metadata: Metadata = {
  title: "Topix",
  description: "Play Games & Quizzes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <EntryPoint session={session}>
          <Navbar />
          {children}
        </EntryPoint>
        <Footer />
      </body>
    </html>
  );
}
