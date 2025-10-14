import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientComponent from "@/components/common/ClientComponent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mark Drop",
  description: "An AI watermark removal tool",
};

export default async function RootLayout({
  children,
  params,
  params2,
}: Readonly<{
  children: React.ReactNode;
  params: { pathname?: string, slug?: string };
  params2: { pathname?: string, slug?: string };
}>) {

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
        <ClientComponent />
      </body>
    </html>
  );
}
