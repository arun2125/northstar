import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chinese Zodiac | 12 Animal Signs, 5 Elements & 2026 Predictions',
  description: 'Explore the Chinese zodiac system — 12 animal signs, 5 elements, and the 60-year cycle. Learn about the Fire Horse year 2026 and find your animal sign.',
  alternates: {
    canonical: 'https://northstarastro.com/chinese-zodiac',
  },
  openGraph: {
    title: 'Chinese Zodiac | 12 Animal Signs & 5 Elements',
    description: 'Explore the Chinese zodiac system — 12 animal signs, 5 elements, and the 60-year cycle. Learn about Fire Horse 2026.',
    url: 'https://northstarastro.com/chinese-zodiac',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=Chinese%20Zodiac%20Guide',
      width: 1200,
      height: 630,
      alt: 'Chinese Zodiac Guide',
    }],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Chinese Zodiac Guide',
  description: 'Complete guide to the Chinese zodiac system — 12 animal signs, 5 elements, and yearly predictions.',
  url: 'https://northstarastro.com/chinese-zodiac',
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
        name: 'Chinese Zodiac',
        item: 'https://northstarastro.com/chinese-zodiac',
      },
    ],
  },
};

const animalSigns = [
  { sign: 'Rat', symbol: '鼠', years: '1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020', traits: 'Clever, resourceful, quick-witted, charming' },
  { sign: 'Ox', symbol: '牛', years: '1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021', traits: 'Diligent, dependable, strong, determined' },
  { sign: 'Tiger', symbol: '虎', years: '1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022', traits: 'Brave, confident, competitive, unpredictable' },
  { sign: 'Rabbit', symbol: '兔', years: '1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023', traits: 'Quiet, elegant, kind, responsible' },
  { sign: 'Dragon', symbol: '龍', years: '1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024', traits: 'Confident, intelligent, enthusiastic, powerful' },
  { sign: 'Snake', symbol: '蛇', years: '1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025', traits: 'Wise, enigmatic, intuitive, graceful' },
  { sign: 'Horse', symbol: '馬', years: '1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026', traits: 'Energetic, independent, warm-hearted, free-spirited' },
  { sign: 'Goat', symbol: '羊', years: '1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027', traits: 'Calm, gentle, sympathetic, creative' },
  { sign: 'Monkey', symbol: '猴', years: '1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028', traits: 'Sharp, smart, curious, mischievous' },
  { sign: 'Rooster', symbol: '雞', years: '1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029', traits: 'Observant, hardworking, courageous, honest' },
  { sign: 'Dog', symbol: '狗', years: '1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030', traits: 'Loyal, honest, amiable, kind' },
  { sign: 'Pig', symbol: '豬', years: '1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031', traits: 'Compassionate, generous, diligent, social' },
];

export default function ChineseZodiacPage() {
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
              <Link href="/about" className="text-purple-300/70 hover:text-white transition">
                About
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            <span className="gradient-text">Chinese Zodiac</span>
          </h1>
          <p className="text-xl text-purple-200/80 mb-8 text-center max-w-3xl mx-auto">
            Discover the ancient wisdom of the Chinese zodiac — 12 animal signs, 5 elements, 
            and the 60-year cycle that has guided billions for over 5,000 years.
          </p>

          {/* 2026 Highlight */}
          <div className="mb-16 p-8 bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-2xl border border-red-500/20">
            <h2 className="text-2xl font-bold text-white mb-3">
              🔥 2026: Year of the Fire Horse
            </h2>
            <p className="text-purple-200/80 mb-4">
              February 17, 2026 marks the beginning of the Fire Horse year — a rare 60-year cycle 
              known for intense energy, bold breakthroughs, and rapid transformation. The last Fire Horse 
              year was 1966.
            </p>
            <Link 
              href="/blog/fire-horse-2026"
              className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold rounded-lg transition"
            >
              Read Fire Horse 2026 Predictions →
            </Link>
          </div>

          {/* What is Chinese Zodiac */}
          <div className="prose prose-invert prose-purple max-w-none mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What is the Chinese Zodiac?</h2>
            <p className="text-purple-200/80 text-lg leading-relaxed">
              The Chinese zodiac (生肖, shēngxiào) is a 12-year cycle where each year is represented 
              by an animal sign. Unlike Western astrology which is based on your birth month, 
              <strong> Chinese zodiac is based on your birth year</strong>.
            </p>
            <p className="text-purple-200/80 text-lg leading-relaxed">
              But there's more: each year is also associated with one of the <strong>five elements</strong> 
              (Wood, Fire, Earth, Metal, Water), creating a 60-year cycle. This means your full Chinese 
              zodiac sign includes both your animal AND your element — for example, "Fire Horse" or "Water Rabbit."
            </p>
          </div>

          {/* The 12 Animal Signs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">The 12 Animal Signs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animalSigns.map((animal) => (
                <div 
                  key={animal.sign}
                  className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{animal.symbol}</span>
                    <h3 className="text-xl font-bold text-white">{animal.sign}</h3>
                  </div>
                  <p className="text-purple-300/60 text-sm mb-3">
                    Years: {animal.years}
                  </p>
                  <p className="text-purple-200/70 text-sm">
                    {animal.traits}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The 5 Elements */}
          <div className="mb-16 prose prose-invert prose-purple max-w-none">
            <h2 className="text-3xl font-bold text-white mb-4">The 5 Elements</h2>
            <p className="text-purple-200/80 text-lg leading-relaxed mb-6">
              The five elements (五行, wǔxíng) interact with each other in a cycle of creation and destruction. 
              Your element is determined by the last digit of your birth year.
            </p>
            
            <div className="grid md:grid-cols-5 gap-4 not-prose mb-8">
              <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                <h3 className="font-bold text-white mb-2">🌳 Wood</h3>
                <p className="text-sm text-purple-200/70">Years ending in 4, 5</p>
                <p className="text-xs text-purple-300/60 mt-2">Growth, creativity, expansion</p>
              </div>
              <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/20">
                <h3 className="font-bold text-white mb-2">🔥 Fire</h3>
                <p className="text-sm text-purple-200/70">Years ending in 6, 7</p>
                <p className="text-xs text-purple-300/60 mt-2">Passion, action, intensity</p>
              </div>
              <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
                <h3 className="font-bold text-white mb-2">⛰️ Earth</h3>
                <p className="text-sm text-purple-200/70">Years ending in 8, 9</p>
                <p className="text-xs text-purple-300/60 mt-2">Stability, grounding, nurturing</p>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-500/20">
                <h3 className="font-bold text-white mb-2">⚙️ Metal</h3>
                <p className="text-sm text-purple-200/70">Years ending in 0, 1</p>
                <p className="text-xs text-purple-300/60 mt-2">Structure, discipline, precision</p>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                <h3 className="font-bold text-white mb-2">💧 Water</h3>
                <p className="text-sm text-purple-200/70">Years ending in 2, 3</p>
                <p className="text-xs text-purple-300/60 mt-2">Intuition, flow, adaptability</p>
              </div>
            </div>

            <p className="text-purple-200/70 text-sm italic">
              Example: If you were born in 1990, you're a <strong>Metal Horse</strong> (Horse = animal sign, Metal = element from year ending in 0).
            </p>
          </div>

          {/* Explore More */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Explore Chinese Zodiac Content</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                href="/blog/fire-horse-2026"
                className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition group"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition">
                  Fire Horse 2026 Guide
                </h3>
                <p className="text-purple-200/70">
                  Everything you need to know about the Fire Horse year — industries affected, 
                  lucky signs, and monthly predictions.
                </p>
              </Link>
              
              <Link 
                href="/blog/neptune-aries-fire-horse-2026"
                className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition group"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition">
                  Neptune in Aries + Fire Horse
                </h3>
                <p className="text-purple-200/70">
                  How Western astrology's Neptune in Aries aligns with Chinese zodiac's Fire Horse 
                  for double fire transformation.
                </p>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Get Your Complete Reading
            </h3>
            <p className="text-purple-200/70 mb-6">
              Discover how your Chinese zodiac sign combines with your Western birth chart 
              and Vedic placements for deeper insights.
            </p>
            <Link 
              href="/chat"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
            >
              Chat with Tara ✨
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-purple-500/10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-white mb-4">North Star Astro</h4>
                <p className="text-purple-300/60 text-sm">
                  Western. Vedic. Chinese. Three ancient wisdom systems, one complete reading.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Learn</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog" className="text-purple-300/60 hover:text-white transition">All Articles</Link></li>
                  <li><Link href="/vedic-astrology" className="text-purple-300/60 hover:text-white transition">Vedic Astrology</Link></li>
                  <li><Link href="/chinese-zodiac" className="text-purple-300/60 hover:text-white transition">Chinese Zodiac</Link></li>
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
