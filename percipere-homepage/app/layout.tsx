import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google"; // Replace with the licensed brand font when available
import "./globals.css";

const font = Inter_Tight({ subsets: ["latin"], variable: "--font", display: "swap" });

export const metadata: Metadata = {
  title: "Percipere.ai — PerciVerse for your SAP journey",
  description: "PerciVerse connects PerciXpert, PerciServe, PerciHub, PerciSuite, and FUTUROOT process intelligence for SAP implementation, operations, and support.",
};

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en" className={font.variable}><body>{children}</body></html>);
}
