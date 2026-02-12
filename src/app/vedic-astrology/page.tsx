import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Vedic Astrology (Jyotish) Guide | North Star Astro',
  description: 'Learn Vedic astrology from scratch. Understand nakshatras, dashas, Sade Sati, kundali matching, and how Jyotish differs from Western astrology.',
  keywords: 'vedic astrology, jyotish, nakshatras, dasha, sade sati, kundali, indian astrology, hindu astrology',
};

export default function VedicAstrologyPage() {
  const allPosts = getAllPosts();
  const vedicPosts = allPosts.filter(post => 
    post.tags.some(tag => ['vedic', 'vedic astrology', 'jyotish', 'nakshatra', 'dasha', 'sade sati'].includes(tag.toLowerCase()))
  );

  return (
    <main className="min-h-screen star-bg">
      {/* Header */}
      <header className="px-4 md:px-6 py-4 border-b border-purple-500/10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg md:text-xl font-bold gradient-text whitespace-nowrap">
            North Star Astro
          </Link>
          <nav className="flex gap-3 md:gap-6 text-sm md:text-base">
            <Link href="/western-astrology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Western
            </Link>
            <Link href="/vedic-astrology" className="hidden md:block text-white font-medium">
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
      <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🕉️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Vedic Astrology</span>
          </h1>
          <p className="text-xl text-purple-200/70 max-w-2xl mx-auto">
            Ancient Indian wisdom for understanding your karma, destiny, and life path. 
            Jyotish — the "science of light" — has guided seekers for over 5,000 years.
          </p>
        </div>

        {/* What is Vedic Astrology */}
        <div className="prose prose-invert prose-purple max-w-none mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">What is Vedic Astrology?</h2>
          <p className="text-purple-200/80">
            Vedic astrology (Jyotish) is the ancient Hindu system of astrology originating from the Vedas. 
            Unlike Western astrology which uses the tropical zodiac (based on seasons), Vedic astrology uses 
            the sidereal zodiac — aligned with the actual positions of stars.
          </p>
          <p className="text-purple-200/80">
            This means your Vedic sign is typically one sign back from your Western sign. A Western Aries 
            might be a Vedic Pisces. Both are "correct" — they're just measuring different things.
          </p>
        </div>

        {/* Key Concepts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Key Vedic Concepts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">🌙 Nakshatras</h3>
              <p className="text-purple-200/60 text-sm">
                27 lunar mansions that add precision beyond the 12 signs. Your birth nakshatra reveals 
                deep personality traits and life themes.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">⏱️ Dasha System</h3>
              <p className="text-purple-200/60 text-sm">
                Planetary period system that maps the timing of your life. Know when Saturn's lessons 
                arrive, when Jupiter brings blessings.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">🪐 Sade Sati</h3>
              <p className="text-purple-200/60 text-sm">
                Saturn's 7.5-year transit over your Moon sign. A period of karmic lessons, hard work, 
                and eventual mastery.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">☊ Rahu & Ketu</h3>
              <p className="text-purple-200/60 text-sm">
                The lunar nodes — your karmic axis. Rahu shows worldly desires, Ketu shows spiritual 
                liberation and past-life gifts.
              </p>
            </div>
          </div>
        </div>

        {/* Vedic vs Western */}
        <div className="mb-16 p-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Vedic vs Western Astrology</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Western Astrology</h4>
              <ul className="text-purple-200/70 space-y-1">
                <li>• Tropical zodiac (seasonal)</li>
                <li>• Sun sign emphasis</li>
                <li>• Psychological orientation</li>
                <li>• Free will focused</li>
                <li>• Outer planets (Uranus, Neptune, Pluto)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-300 mb-2">Vedic Astrology</h4>
              <ul className="text-purple-200/70 space-y-1">
                <li>• Sidereal zodiac (star-based)</li>
                <li>• Moon sign emphasis</li>
                <li>• Predictive orientation</li>
                <li>• Karma and dharma focused</li>
                <li>• Lunar nodes (Rahu/Ketu) central</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {vedicPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Vedic Astrology Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {vedicPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white/5 rounded-xl border border-purple-500/20 p-5 hover:bg-white/10 hover:border-purple-500/40 transition"
                >
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition mb-2">
                    {post.title}
                  </h3>
                  <p className="text-purple-200/60 text-sm line-clamp-2">{post.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/blog" className="text-purple-400 hover:text-purple-300 transition">
                View all articles →
              </Link>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-8 bg-white/5 rounded-2xl border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready to explore your Vedic chart?
          </h3>
          <p className="text-purple-200/70 mb-6">
            Get insights from both Western and Vedic perspectives.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
          >
            Get Your Free Reading ✨
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-purple-300/40 text-sm">© 2026 North Star Astro. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
