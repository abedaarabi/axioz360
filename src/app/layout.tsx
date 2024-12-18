import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "AXIOZ 360 / AI SOLUTIONS",
  description: "Innovative Solutions",
  openGraph: {
    title: "AXIOZ 360",
    description: "Innovative Solutions",
    url: "https://axioz360.com",
    siteName: "AXIOZ 360 / AI SOLUTIONS",
    images: [
      {
        url: "https://axioz360.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID!} /> */}
          {/* <CookieBanner /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
