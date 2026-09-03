import { MetadataRoute } from 'next';
import { CATEGORIES, getAllCalculators } from '@/lib/seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.calcniv.in';
  const currentDate = new Date();

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Category routes
  Object.keys(CATEGORIES).forEach((cat) => {
    routes.push({
      url: `${baseUrl}/calculators/${cat}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Individual calculator routes
  getAllCalculators().forEach((calc) => {
    routes.push({
      url: `${baseUrl}/calculators/${calc.category}/${calc.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
