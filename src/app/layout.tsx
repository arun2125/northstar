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

// Site-wide structured data
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'North Star Astro',
  url: 'https://northstarastro.com',
  description: 'AI-powered astrology readings based on your complete birth chart.',
  sameAs: [
    'https://twitter.com/northstar_astro',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'North Star Astro',
  url: 'https://northstarastro.com',
  description: 'AI-powered astrology readings based on your complete birth chart.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://northstarastro.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
