import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// This pulls in the Inter font with Latin characters
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revanth Modalavalasa | Portfolio",
  description: "Full-Stack Developer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // We inject the Inter font class into the HTML tag
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {children}
      </body>
    </html>
  );
}