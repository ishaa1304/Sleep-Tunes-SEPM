import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import { MainNav } from "@/app/components/main-nav";
import { SiteFooter } from "@/app/components/site-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SleepTunes - Sleep Better with Personalized Music",
  description:
    "SleepTunes analyzes your sleep patterns from your smart watch and generates personalized music to help you sleep better.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <MainNav />
              </div>
            </header>
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
