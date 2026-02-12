'use client';

import Link from 'next/link';

// Featured Western astrology articles
const FEATURED_ARTICLES = [
  {
    slug: 'how-to-read-your-birth-chart',
    title: 'How to Read Your Birth Chart',
    description: 'Complete beginner guide to understanding your cosmic blueprint — planets, signs, houses, and aspects explained.',
  },
  {
    slug: 'moon-sign-meaning',
    title: 'Moon Sign: Your Emotional Blueprint',
    description: 'Your Moon sign reveals how you process emotions, what you need to feel secure, and your instinctive reactions.',
  },
  {
    slug: 'rising-sign-explained',
    title: 'Rising Sign: Your Social Mask',
    description: 'Your Ascendant shapes first impressions and how you navigate the world. Often more accurate than Sun sign.',
  },
  {
    slug: 'saturn-return-meaning',
    title: 'Saturn Return: The Great Reckoning',
    description: 'Around ages 29 and 58, Saturn returns to test everything you\'ve built. Here\'s how to survive — and thrive.',
  },
  {
    slug: 'mercury-retrograde-explained',
    title: 'Mercury Retrograde Explained',
    description: 'What actually happens during retrograde, why it matters, and how to work with it instead of against it.',
  },
  {
    slug: '12-houses-explained',
    title: 'The 12 Houses Explained',
    description: 'Each house rules a different life area. Understanding houses unlocks the full power of your chart.',
  },
];

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
  { name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
  { name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
  { name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
  { name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
  { name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
  { name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
  { name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
  { name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
  { name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
  { name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
  { name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' },
];

const CORE_CONCEPTS = [
  {
    title: 'The Big Three',
    description: 'Sun, Moon, and Rising — the three placements that define your core personality.',
    icon: '☀️',
  },
  {
    title: 'Planets',
    description: 'Each planet represents a different drive: Mercury for communication, Venus for love, Mars for action.',
    icon: '🪐',
  },
  {
    title: 'Houses',
    description: '12 houses divide life into areas: career, relationships, home, creativity, and more.',
    icon: '🏠',
  },
  {
    title: 'Aspects',
    description: 'Angles between planets create harmony (trines) or tension (squares) in your chart.',
    icon: '📐',
  },
  {
    title: 'Elements',
    description: 'Fire, Earth, Air, Water — the four elements that flavor every sign.',
    icon: '🔥',
  },
  {
    title: 'Transits',
    description: 'Current planetary positions interacting with your birth chart — timing is everything.',
    icon: '⏰',
  },
];

export default function WesternAstrologyPage() {
  return (
    <main className="min-h-screen star-bg">
      {/* Header */}
      <header className="px-4 md:px-6 py-4 border-b border-purple-500/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg md:text-xl font-bold gradient-text whitespace-nowrap">
            North Star Astro
          </Link>
          <nav className="flex gap-3 md:gap-6 text-sm md:text-base">
            <Link href="/western-astrology" className="hidden md:block text-white font-medium">
              Western
            </Link>
            <Link href="/vedic-astrology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Vedic
            </Link>
            <Link href="/numerology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Numerology
            </Link>
            <Link href="/blog" className="text-purple-300/70 hover:text-white transition">
              Blog
            </Link>
            <Link href="/about" className="text-purple-300/70 hover:text-white transition">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20 md:py-28 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🌟</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Western Astrology</span>
          </h1>
          <p className="text-xl text-purple-200/80 max-w-2xl mx-auto">
            The tropical zodiac system focused on <strong>psychological insight</strong>. 
            Understand your personality, relationships, and life patterns through the lens 
            of planets, signs, and houses.
          </p>
        </div>

        {/* What is Western Astrology */}
        <div className="bg-white/5 rounded-2xl border border-purple-500/20 p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">What is Western Astrology?</h2>
          <div className="space-y-4 text-purple-200/80">
            <p>
              Western astrology uses the <strong>tropical zodiac</strong>, which is based on the seasons 
              rather than the constellations. When someone asks "what's your sign?" they're asking about 
              Western astrology — specifically, your Sun sign.
            </p>
            <p>
              But your Sun sign is just the beginning. A complete birth chart includes your Moon sign 
              (emotions), Rising sign (outward personality), and the positions of all planets at your 
              exact moment of birth. Each placement tells a different part of your story.
            </p>
            <p>
              Western astrology excels at <strong>psychological interpretation</strong> — understanding 
              your motivations, relationship patterns, career drives, and inner conflicts. It's less 
              about prediction and more about self-understanding.
            </p>
          </div>
        </div>

        {/* Core Concepts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Core Concepts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {CORE_CONCEPTS.map((concept) => (
              <div 
                key={concept.title}
                className="bg-white/5 rounded-xl border border-purple-500/20 p-6"
              >
                <div className="text-3xl mb-3">{concept.icon}</div>
                <h3 className="font-semibold text-white mb-2">{concept.title}</h3>
                <p className="text-purple-200/60 text-sm">{concept.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zodiac Signs Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">The 12 Zodiac Signs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <Link
                key={sign.name}
                href={`/blog/${sign.name.toLowerCase()}-traits`}
                className="bg-white/5 rounded-xl border border-purple-500/20 p-4 hover:bg-white/10 hover:border-purple-500/40 transition text-center group"
              >
                <div className="text-3xl mb-2">{sign.symbol}</div>
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">
                  {sign.name}
                </h3>
                <p className="text-purple-300/50 text-xs mt-1">{sign.dates}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${
                  sign.element === 'Fire' ? 'bg-red-500/20 text-red-300' :
                  sign.element === 'Earth' ? 'bg-green-500/20 text-green-300' :
                  sign.element === 'Air' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {sign.element}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Western vs Vedic */}
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 rounded-2xl border border-purple-500/20 p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Western vs Vedic: Key Differences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-purple-300 mb-3">🌟 Western Astrology</h3>
              <ul className="space-y-2 text-purple-200/70 text-sm">
                <li>• <strong>Tropical zodiac</strong> — based on seasons</li>
                <li>• Focuses on <strong>psychology</strong> and personality</li>
                <li>• Sun sign is primary</li>
                <li>• Uses outer planets (Uranus, Neptune, Pluto)</li>
                <li>• Modern interpretations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-300 mb-3">🕉️ Vedic Astrology</h3>
              <ul className="space-y-2 text-purple-200/70 text-sm">
                <li>• <strong>Sidereal zodiac</strong> — based on actual constellations</li>
                <li>• Focuses on <strong>karma</strong> and destiny</li>
                <li>• Moon sign (Rashi) is primary</li>
                <li>• Uses Nakshatras (lunar mansions)</li>
                <li>• Dasha timing systems for prediction</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <p className="text-purple-200/70 text-sm">
              <strong className="text-white">Why we use both:</strong> Western astrology reveals 
              <em> who you are</em>. Vedic astrology reveals <em>what's coming</em>. Together, 
              they give you the complete picture.
            </p>
            <Link 
              href="/vedic-astrology" 
              className="inline-block mt-4 text-orange-400 hover:text-orange-300 transition text-sm"
            >
              Learn about Vedic Astrology →
            </Link>
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Essential Reading</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURED_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white/5 rounded-xl border border-purple-500/20 p-6 hover:bg-white/10 hover:border-purple-500/40 transition group"
              >
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition mb-2">
                  {article.title}
                </h3>
                <p className="text-purple-200/60 text-sm">{article.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition"
            >
              View all Western astrology articles →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready for Your Complete Reading?</h2>
          <p className="text-purple-200/70 mb-6">
            We combine Western psychology with Vedic prediction and Numerology insights.
          </p>
          <Link
            href="/#waitlist"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
          >
            Join the Waitlist ✨
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-purple-300/40 text-sm">
            © 2026 North Star Astro. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
