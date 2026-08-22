import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { CalculatorCategory } from '@/lib/seo-data';

interface BreadcrumbsProps {
  category?: {
    name: string;
    slug: CalculatorCategory;
  };
  calculator?: {
    name: string;
    slug: string;
  };
}

export default function Breadcrumbs({ category, calculator }: BreadcrumbsProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://calcniv.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: 'https://calcniv.in/calculators',
      },
      ...(category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: category.name,
              item: `https://calcniv.in/calculators/${category.slug}`,
            },
          ]
        : []),
      ...(calculator && category
        ? [
            {
              '@type': 'ListItem',
              position: 4,
              name: calculator.name,
              item: `https://calcniv.in/calculators/${category.slug}/${calculator.slug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="mb-6 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            <Link href="/calculators" className="hover:text-foreground transition-colors">
              Calculators
            </Link>
          </li>
          {category && (
            <li className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {calculator ? (
                <Link
                  href={`/calculators/${category.slug}`}
                  className="hover:text-foreground transition-colors capitalize"
                >
                  {category.name}
                </Link>
              ) : (
                <span className="text-foreground font-medium capitalize" aria-current="page">
                  {category.name}
                </span>
              )}
            </li>
          )}
          {calculator && (
            <li className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium" aria-current="page">
                {calculator.name}
              </span>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
}
