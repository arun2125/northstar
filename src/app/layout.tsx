import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const ogImage = "https://northstarastro.com/api/og?title=Your%20Personal%20AI%20Astrologer&description=AI-powered%20readings%20based%20on%20your%20complete%20birth%20chart";

export const metadata: Metadata = {
  title: "North Star Astro — Your Personal AI Astrologer",
  description: "North Star Astro combines Western, Vedic, and Numerology for comprehensive birth chart readings. Get your free personalized astrology prediction.",
  keywords: "astrology, birth chart, horoscope, AI astrology, personalized astrology, zodiac, moon sign, rising sign, saturn return, vedic astrology, numerology",
  alternates: {
    canonical: 'https://northstarastro.com',
  },
  openGraph: {
    title: "North Star Astro — Your Personal AI Astrologer",
    description: "North Star Astro combines Western, Vedic, and Numerology for comprehensive birth chart readings. Get your free personalized astrology prediction.",
    url: "https://northstarastro.com",
    siteName: "North Star Astro",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "North Star Astro - AI-Powered Astrology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "North Star Astro — Your Personal AI Astrologer",
    description: "North Star Astro combines Western, Vedic, and Numerology for comprehensive birth chart readings. Get your free personalized astrology prediction.",
    images: [ogImage],
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
        <link rel="alternate" type="application/rss+xml" title="North Star Astro Blog" href="/feed.xml" />
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
