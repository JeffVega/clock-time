import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Script from "next/script";
import Footer from "@/_components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TimeSync World: Manage & Convert Global Time Zones Easily",
  description: "Convert, add, and manage time zones effortlessly. Ideal for professionals, expats, and travelers to streamline scheduling, track global events, and organize international meetings with ease",
  alternates: {
    canonical: './',
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  `}
      >
        <Toaster position="top-center" />
        {children}
        <Footer />
      </body>
     
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
