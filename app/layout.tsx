import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClientComponent from "@/components/common/LayoutCLientComponent";
import StatusComponent from "@/components/common/StatusComponent";

export const metadata: Metadata = {
  title: "Mark Drop",
  description: "An AI watermark removal tool",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <LayoutClientComponent />
        <StatusComponent />
      </body>
    </html>
  );
}
