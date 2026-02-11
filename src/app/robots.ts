export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard'],
    },
    sitemap: 'https://northstarastro.com/sitemap.xml',
  };
}
