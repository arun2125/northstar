import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getPostImage } from '@/lib/blog';

export const metadata = {
  title: 'Blog | North Star Astro',
  description: 'Learn astrology with our in-depth guides, tutorials, and cosmic insights. From birth charts to planetary transits, we break it down in plain language.',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
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
            <Link href="/blog" className="text-white font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-purple-300/70 hover:text-white transition">
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">The Cosmic Blog</span>
        </h1>
        <p className="text-xl text-purple-200/70 max-w-2xl mx-auto">
          Astrology explained in plain language. No fluff, just insights you can actually use.
        </p>
      </section>

      {/* Posts Grid */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-300/60 text-lg">
              ✨ First posts coming soon...
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block bg-white/5 rounded-xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 hover:bg-white/10 transition-all"
              >
                <div className="aspect-video bg-purple-900/30 overflow-hidden relative">
                  <img 
                    src={getPostImage(post).url} 
                    alt={getPostImage(post).alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-purple-300/60 mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition">
                    {post.title}
                  </h2>
                  <p className="text-purple-200/60 line-clamp-2">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-t from-purple-950/30 to-transparent">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want personalized insights?
          </h2>
          <p className="text-purple-200/70 mb-6">
            Get an AI-powered reading based on your complete birth chart.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
          >
            Get Your Free Mini-Reading ✨
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-purple-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-purple-300/40 text-sm">
            © 2026 North Star Astro. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
