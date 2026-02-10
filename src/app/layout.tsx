import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "North Star Astro — Your Personal AI Astrologer",
  description: "AI-powered readings based on your complete birth chart. Not generic horoscopes. Actual guidance for your stars.",
  keywords: "astrology, birth chart, horoscope, AI astrology, personalized astrology, zodiac",
  openGraph: {
    title: "North Star Astro — Your Personal AI Astrologer",
    description: "AI-powered readings based on your complete birth chart. Not generic horoscopes. Actual guidance for your stars.",
    url: "https://northstarastro.com",
    siteName: "North Star Astro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star Astro — Your Personal AI Astrologer",
    description: "AI-powered readings based on your complete birth chart.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
