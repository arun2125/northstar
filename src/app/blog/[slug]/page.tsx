import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/blog';
import { Metadata } from 'next';
import Markdown from '@/components/Markdown';
import TableOfContents from '@/components/TableOfContents';
import AuthorBio from '@/components/AuthorBio';

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

  const url = `https://northstarastro.com/blog/${slug}`;
  const ogImage = `https://northstarastro.com/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`;

  return {
    title: `${post.title} | North Star Astro`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: url,
      siteName: 'North Star Astro',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
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

function getRelatedPosts(currentSlug: string, currentTags: string[], limit: number = 3) {
  const allPosts = getAllPosts();
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      ...post,
      score: post.tags.filter(tag => currentTags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.tags);
  const url = `https://northstarastro.com/blog/${slug}`;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://northstarastro.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'North Star Astro',
      url: 'https://northstarastro.com',
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  };

  // FAQ Schema (if FAQ exists)
  const faqJsonLd = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Blog',
        item: 'https://northstarastro.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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

        {/* Breadcrumbs */}
        <nav className="px-6 py-3 max-w-3xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-purple-300/60">
            <li>
              <Link href="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>›</li>
            <li>
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
            </li>
            <li>›</li>
            <li className="text-purple-300/40 truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        {/* Article */}
        <article className="px-6 py-8 md:py-12 max-w-3xl mx-auto">
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

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Content */}
          <div className="prose prose-invert prose-purple max-w-none">
            <Markdown content={post.content} />
          </div>

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <section className="mt-12 pt-8 border-t border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {post.faq.map((item, index) => (
                  <details 
                    key={index} 
                    className="group bg-white/5 rounded-xl border border-purple-500/20 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition">
                      <span className="font-medium text-white pr-4">{item.question}</span>
                      <span className="text-purple-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-purple-200/80 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Author Bio */}
          <AuthorBio />

          {/* CTA */}
          <div className="mt-8 p-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20 text-center">
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

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-6 py-12 border-t border-purple-500/10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block bg-white/5 rounded-xl border border-purple-500/20 p-4 hover:bg-white/10 hover:border-purple-500/40 transition"
                  >
                    <div className="text-xs text-purple-300/50 mb-2">{relatedPost.readingTime}</div>
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-purple-500/10">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-purple-300/40 text-sm">
              © 2026 North Star Astro. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
