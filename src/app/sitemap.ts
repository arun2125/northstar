import { getAllPosts } from '@/lib/blog';

export default async function sitemap() {
  const baseUrl = 'https://northstarastro.com';
  
  // Get all blog posts
  const posts = getAllPosts();
  
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Hub pages (high priority - key landing pages for each system)
  const hubPages = [
    { url: `${baseUrl}/western-astrology`, priority: 0.9 },
    { url: `${baseUrl}/vedic-astrology`, priority: 0.9 },
    { url: `${baseUrl}/numerology`, priority: 0.9 },
    { url: `${baseUrl}/life-path-calculator`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.6 },
  ].map(page => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...hubPages,
    ...blogUrls,
  ];
}
