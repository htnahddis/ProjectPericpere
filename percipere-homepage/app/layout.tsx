import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google"; // Replace with the licensed brand font when available
import "./globals.css";

const font = Inter_Tight({ subsets: ["latin"], variable: "--font", display: "swap" });

export const metadata: Metadata = {
  title: "Percipere.ai — Intelligence across your SAP journey",
  description: "AI solutions for implementation, operations and support, grounded in enterprise context.",
};

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (<html lang="en" className={font.variable}><body>{children}</body></html>);
}
