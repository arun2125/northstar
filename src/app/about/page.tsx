import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About North Star Astro | AI-Powered Astrology',
  description: 'Learn about North Star Astro — combining ancient astrological wisdom with modern AI to deliver personalized, insightful readings based on your complete birth chart.',
  alternates: {
    canonical: 'https://northstarastro.com/about',
  },
  openGraph: {
    title: 'About North Star Astro',
    description: 'Combining ancient astrological wisdom with modern AI to deliver personalized, insightful readings based on your complete birth chart.',
    url: 'https://northstarastro.com/about',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=About%20North%20Star%20Astro',
      width: 1200,
      height: 630,
      alt: 'About North Star Astro',
    }],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About North Star Astro',
  description: 'Learn about North Star Astro — combining ancient astrological wisdom with modern AI to deliver personalized, insightful readings.',
  url: 'https://northstarastro.com/about',
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
        name: 'About',
        item: 'https://northstarastro.com/about',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen star-bg">
      {/* Header */}
      <header className="px-6 py-4 border-b border-purple-500/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold gradient-text">
            North Star Astro
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-purple-300/70 hover:text-white transition">
              Home
            </Link>
            <Link href="/blog" className="text-purple-300/70 hover:text-white transition">
              Blog
            </Link>
            <Link href="/about" className="text-white font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">About North Star Astro</span>
        </h1>
        
        <div className="prose prose-invert prose-purple max-w-none space-y-6 text-purple-200/80">
          <p className="text-xl leading-relaxed">
            We're building the astrology resource we wished existed — one that respects your intelligence 
            while making cosmic wisdom accessible.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Philosophy: Three Systems, One Truth</h2>
          <p>
            Most astrology platforms pick one system and stick to it. Western astrology sites ignore 
            Vedic wisdom. Vedic sites dismiss Western psychology. And numerology gets treated as a 
            separate thing entirely.
          </p>
          <p>
            We believe <strong>real insight comes from integration</strong>. That's why North Star Astro 
            combines three ancient wisdom traditions:
          </p>
          <ul className="space-y-3 my-6">
            <li>
              <strong>Western Astrology:</strong> Psychological depth, seasonal cycles, personal growth orientation
            </li>
            <li>
              <strong>Vedic Astrology (Jyotish):</strong> Predictive power, nakshatras, dashas, karmic patterns
            </li>
            <li>
              <strong>Numerology:</strong> Life path insights, personal year cycles, name vibrations
            </li>
          </ul>
          <p>
            When you ask about your Saturn Return, we don't just give you the Western transit interpretation. 
            We show you how it connects to your Sade Sati in Vedic, and what your Personal Year number says 
            about the timing. <strong>That depth doesn't exist anywhere else.</strong>
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What We Offer</h2>
          <ul className="space-y-3">
            <li>
              <strong>Free Educational Content:</strong> In-depth guides on birth charts, signs, planets, 
              houses, and transits — all written for real understanding, not generic horoscope fluff.
            </li>
            <li>
              <strong>AI-Powered Readings:</strong> Personalized insights based on your complete birth 
              chart — not just your Sun sign, but your Moon, Rising, all planetary placements, and how 
              they interact.
            </li>
            <li>
              <strong>Practical Application:</strong> Astrology that helps you understand yourself, 
              your relationships, and your timing — not just entertainment.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Expertise</h2>
          <p>
            North Star Astro combines <strong>ancient wisdom traditions</strong> with 
            <strong> modern AI technology</strong>. Our content draws from:
          </p>
          <ul className="space-y-2">
            <li><strong>Western Astrology:</strong> Liz Greene, Stephen Arroyo, Robert Hand — psychological depth and transit analysis</li>
            <li><strong>Vedic Astrology:</strong> Classical Jyotish texts, Parashara, B.V. Raman — nakshatras, dashas, and predictive techniques</li>
            <li><strong>Numerology:</strong> Pythagorean and Chaldean systems — life path, expression, and personal year calculations</li>
            <li><strong>Integration:</strong> Synthesizing all three systems for comprehensive readings</li>
          </ul>
          <p>
            We translate complex esoteric knowledge into language anyone can understand — without 
            dumbing it down or losing the depth.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Commitment</h2>
          <p>
            <strong>No fluff.</strong> Every article we publish has substance. If we can't add real 
            value to a topic, we don't write about it.
          </p>
          <p>
            <strong>No fear-mongering.</strong> Saturn transits aren't curses. Mercury retrograde isn't 
            the apocalypse. We present cosmic cycles as opportunities for growth, not doom.
          </p>
          <p>
            <strong>No gatekeeping.</strong> Astrology shouldn't require expensive consultations to 
            understand. We make the knowledge accessible to everyone.
          </p>

          <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-3">
              Ready to explore your chart?
            </h3>
            <p className="text-purple-200/70 mb-6">
              Get a free mini-reading based on your birth details.
            </p>
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
            >
              Get Your Free Reading ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">North Star Astro</h4>
              <p className="text-purple-300/60 text-sm">
                AI-powered astrology readings based on your complete birth chart.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog/how-to-read-your-birth-chart" className="text-purple-300/60 hover:text-white transition">Birth Chart Basics</Link></li>
                <li><Link href="/blog/moon-sign-meaning" className="text-purple-300/60 hover:text-white transition">Moon Signs</Link></li>
                <li><Link href="/blog" className="text-purple-300/60 hover:text-white transition">All Articles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://twitter.com/northstar_astro" target="_blank" rel="noopener noreferrer" className="text-purple-300/60 hover:text-white transition">Twitter</a></li>
                <li><Link href="/about" className="text-purple-300/60 hover:text-white transition">About Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/10 pt-8 text-center">
            <p className="text-purple-300/40 text-sm">
              © 2026 North Star Astro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
