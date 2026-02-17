import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Numerology Guide: Life Path, Expression & More | North Star Astro',
  description: 'Learn numerology from basics to advanced. Calculate your Life Path number, Expression number, Soul Urge, and Personal Year. Free numerology guides.',
  keywords: 'numerology, life path number, expression number, soul urge, personal year, master numbers, numerology calculator',
  alternates: {
    canonical: 'https://northstarastro.com/numerology',
  },
  openGraph: {
    title: 'Numerology Guide: Life Path, Expression & More',
    description: 'Learn numerology from basics to advanced. Calculate your Life Path number, Expression number, Soul Urge, and Personal Year.',
    url: 'https://northstarastro.com/numerology',
    siteName: 'North Star Astro',
    type: 'website',
    images: [{
      url: 'https://northstarastro.com/api/og?title=Numerology%20Guide',
      width: 1200,
      height: 630,
      alt: 'Numerology Guide - North Star Astro',
    }],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Numerology Guide',
  description: 'Complete guide to numerology including Life Path numbers, Expression numbers, Soul Urge, and Personal Year calculations.',
  url: 'https://northstarastro.com/numerology',
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
    ],
  },
};

export default function NumerologyPage() {
  const allPosts = getAllPosts();
  const numerologyPosts = allPosts.filter(post => 
    post.tags.some(tag => ['numerology', 'life path', 'numbers'].includes(tag.toLowerCase()))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
            <Link href="/vedic-astrology" className="hidden md:block text-purple-300/70 hover:text-white transition">
              Vedic
            </Link>
            <Link href="/numerology" className="hidden md:block text-white font-medium">
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
          <div className="text-5xl mb-4">🔢</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Numerology</span>
          </h1>
          <p className="text-xl text-purple-200/70 max-w-2xl mx-auto">
            The ancient science of numbers. Your birth date and name contain hidden patterns 
            that reveal your life purpose, talents, challenges, and destiny.
          </p>
        </div>

        {/* What is Numerology */}
        <div className="prose prose-invert prose-purple max-w-none mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">What is Numerology?</h2>
          <p className="text-purple-200/80">
            Numerology is the study of numbers and their spiritual significance. Every number 
            carries a unique vibration and meaning. By calculating the numbers in your birth date 
            and name, numerology reveals your core personality, life lessons, and optimal timing.
          </p>
          <p className="text-purple-200/80">
            While astrology maps the cosmos at your birth, numerology distills your identity into 
            single-digit essences. Together, they create a complete picture of who you are.
          </p>
        </div>

        {/* Core Numbers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Your Core Numbers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">🛤️ Life Path Number</h3>
              <p className="text-purple-200/60 text-sm">
                Your most important number. Calculated from your full birth date, it reveals 
                your life's purpose and the path you're meant to walk.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">✨ Expression Number</h3>
              <p className="text-purple-200/60 text-sm">
                Calculated from your full name at birth. Shows your natural talents, abilities, 
                and the gifts you bring to the world.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">💜 Soul Urge Number</h3>
              <p className="text-purple-200/60 text-sm">
                From the vowels in your name. Reveals your heart's deepest desires, inner 
                motivations, and what truly fulfills you.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
              <h3 className="font-semibold text-white mb-2">📅 Personal Year Number</h3>
              <p className="text-purple-200/60 text-sm">
                Changes each year on your birthday. Reveals the themes, opportunities, and 
                lessons you'll encounter in the current year.
              </p>
            </div>
          </div>
        </div>

        {/* Life Path Overview */}
        <div className="mb-16 p-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">The Life Path Numbers</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">1</div>
              <div className="text-purple-200/60">The Leader</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">2</div>
              <div className="text-purple-200/60">The Mediator</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">3</div>
              <div className="text-purple-200/60">The Communicator</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">4</div>
              <div className="text-purple-200/60">The Builder</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">5</div>
              <div className="text-purple-200/60">The Freedom Seeker</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">6</div>
              <div className="text-purple-200/60">The Nurturer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">7</div>
              <div className="text-purple-200/60">The Seeker</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">8</div>
              <div className="text-purple-200/60">The Powerhouse</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">9</div>
              <div className="text-purple-200/60">The Humanitarian</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">11</div>
              <div className="text-purple-200/60">Master Intuitive</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">22</div>
              <div className="text-purple-200/60">Master Builder</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">33</div>
              <div className="text-purple-200/60">Master Teacher</div>
            </div>
          </div>
        </div>

        {/* How to Calculate */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">How to Calculate Your Life Path</h2>
          <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
            <p className="text-purple-200/80 mb-4">Add all digits of your birth date until you get a single digit (or master number 11, 22, 33).</p>
            <div className="bg-black/20 rounded-lg p-4 font-mono text-sm text-purple-300">
              <p>Example: December 25, 1990</p>
              <p>Month: 1 + 2 = 3</p>
              <p>Day: 2 + 5 = 7</p>
              <p>Year: 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1</p>
              <p className="mt-2 text-white">Life Path: 3 + 7 + 1 = <strong>11</strong> (Master Number!)</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {numerologyPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Numerology Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {numerologyPosts.slice(0, 6).map((post) => (
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
            Ready to discover your numbers?
          </h3>
          <p className="text-purple-200/70 mb-6">
            Get your numerology profile alongside your astrological insights.
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
    </>
  );
}
