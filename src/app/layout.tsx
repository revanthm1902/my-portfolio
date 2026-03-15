import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import localFont from 'next/font/local';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const ndotFont = localFont({
  src: '../../public/fonts/NDot-55.ttf',
  variable: '--font-ndot',
});

export const metadata: Metadata = {
  title: "Revanth",
  description: "My Portfolio built with Next.js 13, Tailwind CSS, and Framer Motion. Showcasing my projects, skills, and experience in a sleek and modern design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${ndotFont.variable}`}>
      <head>
        <link rel="preload" as="image" href="/wallpaper.jpg" />
      </head>
      <body className="antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <CustomCursor />
        {children}
        <MusicPlayer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}