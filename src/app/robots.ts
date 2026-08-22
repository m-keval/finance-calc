import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/'], // Prevent crawling of APIs and private routes
    },
    sitemap: 'https://calcniv.in/sitemap.xml',
  };
}
