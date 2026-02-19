import { getAllPosts } from '@/lib/blog';

export default async function sitemap() {
  const baseUrl = 'https://northstarastro.com';
  
  // Get all blog posts
  const posts = getAllPosts();
  
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date('2026-02-17'), // Updated: glossary links added to all posts
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Hub pages (high priority - key landing pages for each system)
  const hubPages = [
    { url: `${baseUrl}/western-astrology`, priority: 0.9 },
    { url: `${baseUrl}/vedic-astrology`, priority: 0.9 },
    { url: `${baseUrl}/chinese-zodiac`, priority: 0.9 },
    { url: `${baseUrl}/life-path-calculator`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.6 },
    { url: `${baseUrl}/glossary`, priority: 0.8 },
    { url: `${baseUrl}/chat`, priority: 0.7 },
    { url: `${baseUrl}/free-birth-chart`, priority: 0.8 },
    { url: `${baseUrl}/2026-astrology-predictions`, priority: 0.7 },
    { url: `${baseUrl}/sitemap-visual`, priority: 0.5 },
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
