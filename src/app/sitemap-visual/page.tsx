import { Metadata } from 'next';
import SitemapVisualClient from './SitemapVisualClient';

export const metadata: Metadata = {
  title: 'Visual Sitemap | North Star Astro',
  description: 'Visual sitemap of North Star Astro - Browse all astrology content including 2026 predictions, zodiac guides, and Vedic wisdom.',
  alternates: {
    canonical: 'https://northstarastro.com/sitemap-visual',
  },
  openGraph: {
    title: 'Visual Sitemap - North Star Astro',
    description: 'Browse all astrology content including 2026 predictions, zodiac guides, and Vedic wisdom.',
    url: 'https://northstarastro.com/sitemap-visual',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=Sitemap',
      width: 1200,
      height: 630,
      alt: 'North Star Astro Sitemap',
    }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SitemapVisualPage() {
  return <SitemapVisualClient />;
}
