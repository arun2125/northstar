import { Metadata } from 'next';
import Markdown from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import AuthorBio from '@/components/AuthorBio';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata: Metadata = {
  title: '2026 Astrology Predictions: Major Transits & What They Mean for You',
  description: 'Complete guide to 2026 astrology: Neptune in Aries, Mercury retrograde cycles, eclipses, and predictions for all 12 zodiac signs.',
  keywords: 'astrology 2026, 2026 predictions, Neptune in Aries, Mercury retrograde 2026, 2026 eclipses, horoscope 2026',
  openGraph: {
    title: '2026 Astrology Predictions: Major Transits & What They Mean for You',
    description: 'Complete guide to 2026 astrology: Neptune in Aries, Mercury retrograde cycles, eclipses, and predictions for all 12 zodiac signs.',
    type: 'article',
  },
};

export default function Predictions2026Page() {
  const contentPath = join(process.cwd(), 'content', '2026-astrology-predictions.md');
  const content = readFileSync(contentPath, 'utf-8');
  
  // Extract content after frontmatter
  const contentWithoutFrontmatter = content.split('---').slice(2).join('---').trim();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          2026 Astrology Predictions
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your complete guide to the major cosmic shifts, transits, and what they mean for your sign
        </p>
      </header>

      {/* Quick Navigation */}
      <div className="mb-8 p-6 bg-purple-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 text-purple-900">Quick Jump:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
            <a
              key={sign}
              href={`/${sign.toLowerCase()}-2026-predictions`}
              className="text-purple-700 hover:text-purple-900 hover:underline font-medium"
            >
              {sign} →
            </a>
          ))}
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents content={contentWithoutFrontmatter} />

      {/* Main Content */}
      <div className="prose prose-lg max-w-none mt-8">
        <Markdown content={contentWithoutFrontmatter} />
      </div>

      {/* Author Bio */}
      <AuthorBio />

      {/* CTA Section */}
      <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white text-center">
        <h3 className="text-2xl font-bold mb-4">
          Want Personalized 2026 Predictions?
        </h3>
        <p className="text-lg mb-6 opacity-90">
          Get a detailed reading based on your exact birth chart
        </p>
        <a
          href="/chat"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Chat with Tara →
        </a>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: '2026 Astrology Predictions: Major Transits & What They Mean for You',
            description: 'Complete guide to 2026 astrology: Neptune in Aries, Mercury retrograde cycles, eclipses, and predictions for all 12 zodiac signs.',
            author: {
              '@type': 'Organization',
              name: 'North Star Astro',
            },
            publisher: {
              '@type': 'Organization',
              name: 'North Star Astro',
              logo: {
                '@type': 'ImageObject',
                url: 'https://northstarastro.com/logo.png',
              },
            },
            datePublished: '2026-02-17',
            dateModified: '2026-02-17',
          }),
        }}
      />
    </article>
  );
}
