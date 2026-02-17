import { Metadata } from 'next';
import WesternAstrologyClient from './WesternAstrologyClient';

export const metadata: Metadata = {
  title: 'Western Astrology Guide: Birth Charts, Zodiac Signs & Transits | North Star Astro',
  description: 'Complete guide to Western astrology - learn about birth charts, zodiac signs, planets, houses, aspects, and transits. Free educational content.',
  keywords: 'western astrology, tropical astrology, birth chart, zodiac signs, planets, houses, aspects, transits',
  alternates: {
    canonical: 'https://northstarastro.com/western-astrology',
  },
  openGraph: {
    title: 'Western Astrology Guide',
    description: 'Complete guide to Western astrology - learn about birth charts, zodiac signs, planets, houses, aspects, and transits.',
    url: 'https://northstarastro.com/western-astrology',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=Western%20Astrology%20Guide',
      width: 1200,
      height: 630,
      alt: 'Western Astrology Guide - North Star Astro',
    }],
  },
};

// Schema markup for educational page
const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Western Astrology Guide',
  description: 'Complete guide to Western astrology including birth charts, zodiac signs, planets, houses, aspects, and transits.',
  url: 'https://northstarastro.com/western-astrology',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://northstarastro.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Western Astrology',
        item: 'https://northstarastro.com/western-astrology',
      },
    ],
  },
};

export default function WesternAstrologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WesternAstrologyClient />
    </>
  );
}
