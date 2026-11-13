import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "@fontsource-variable/mona-sans";
import "./globals.css";

const monaSans = localFont({
  src: [
    {
      path: "./fonts/MonaSans-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/MonaSans-VariableItalic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-mona-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diesel Generator Warehouse — Industrial Power & Generator Solutions",
  description: "Diesel Generator Warehouse is Bangladesh's premier industrial power and diesel generator supplier. Direct stock from 20 kVA to 2500 kVA with nationwide delivery, installation, and 24/7 engineering service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900 selection:bg-[#F25A24] selection:text-white">
        {children}
      </body>
    </html>
  );
}
