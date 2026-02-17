import { Metadata } from 'next';
import LifePathCalculatorClient from './LifePathCalculatorClient';

export const metadata: Metadata = {
  title: 'Life Path Number Calculator - Free Numerology Reading | North Star Astro',
  description: 'Free Life Path calculator - discover your life purpose, strengths, and challenges through numerology. Instant results with detailed interpretation.',
  keywords: 'life path calculator, life path number, numerology calculator, free numerology, numerology reading',
  alternates: {
    canonical: 'https://northstarastro.com/life-path-calculator',
  },
  openGraph: {
    title: 'Life Path Number Calculator',
    description: 'Discover your life purpose, strengths, and challenges through numerology. Free instant calculator with detailed interpretation.',
    url: 'https://northstarastro.com/life-path-calculator',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=Life%20Path%20Calculator',
      width: 1200,
      height: 630,
      alt: 'Life Path Number Calculator - North Star Astro',
    }],
  },
};

// Schema markup for calculator
const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Life Path Number Calculator',
  description: 'Free calculator to discover your Life Path number and its meaning in numerology.',
  url: 'https://northstarastro.com/life-path-calculator',
  applicationCategory: 'UtilitiesApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
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
        name: 'Numerology',
        item: 'https://northstarastro.com/numerology',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Life Path Calculator',
        item: 'https://northstarastro.com/life-path-calculator',
      },
    ],
  },
};

export default function LifePathCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LifePathCalculatorClient />
    </>
  );
}
