import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { Metadata } from 'next';
import Markdown from '@/components/Markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | North Star Astro`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
            <Link href="/blog" className="text-purple-300/70 hover:text-white transition">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Article */}
      <article className="px-6 py-12 md:py-16 max-w-3xl mx-auto">
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-purple-300/70 hover:text-white transition mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Meta */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-purple-300/60 mb-4">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>by {post.author}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.description && (
            <p className="text-xl text-purple-200/70">
              {post.description}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-purple max-w-none">
          <Markdown content={post.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Ready for your personal reading?
          </h3>
          <p className="text-purple-200/70 mb-6">
            Get an AI-powered analysis based on your complete birth chart.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition"
          >
            Get Your Free Mini-Reading ✨
          </Link>
        </div>
      </article>

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
