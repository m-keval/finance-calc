import { Metadata } from 'next';
import { CalculatorSEOData, CATEGORIES, CalculatorCategory } from './seo-data';

const SITE_URL = 'https://www.calcniv.in';

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: 'Calcniv',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export function generateCalculatorMetadata(seoData: CalculatorSEOData): Metadata {
  return constructMetadata({
    title: seoData.title,
    description: seoData.description,
    path: `/calculators/${seoData.category}/${seoData.slug}/`,
    keywords: [seoData.primaryKeyword, ...seoData.secondaryKeywords],
  });
}

export function generateCategoryMetadata(categoryKey: CalculatorCategory): Metadata {
  const cat = CATEGORIES[categoryKey];
  return constructMetadata({
    title: cat.title,
    description: cat.description,
    path: `/calculators/${cat.slug}/`,
  });
}
