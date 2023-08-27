import "./globals.css";
import type { Metadata } from "next";
import EntryPoint from "./components/entryPoint";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Topix",
  description: "Play Games & Quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EntryPoint>
          <Navbar />
          {children}
        </EntryPoint>
        {/* {children} */}
        <Footer />
      </body>
    </html>
  );
}
