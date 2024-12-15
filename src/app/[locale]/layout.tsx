import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Script from "next/script";
import { baseUrl } from "../lib/constant";
import { ThemeProvider } from "@/components/theme-provider";
import { getLocale } from "next-intl/server";
import FooterWrapper from "@/components/FooterWrapper";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${baseUrl}`),
  title: "TimeSync World: Manage & Convert Global Time Zones Easily",
  description:
    "Convert, add, and manage time zones. Perfect for professionals, expats, and travelers to simplify scheduling and organize international meetings",
  alternates: {
    canonical: "./",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale(); // Await the Promise to get the string value

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}  `}>
        <Toaster position="top-center" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FooterWrapper locale={locale} />
        </ThemeProvider>

        <Script id="clarity-script" strategy="afterInteractive">
          {`
	(function(c,l,a,r,i,t,y){
		c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
		t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
		y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
	})(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
`}
        </Script>
        <Script
          strategy="afterInteractive"
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        />
      </body>
    </html>
  );
}
