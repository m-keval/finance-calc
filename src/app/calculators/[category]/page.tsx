import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, getCalculatorsByCategory, CalculatorCategory } from '@/lib/seo-data';
import Breadcrumbs from '@/components/seo/breadcrumbs';
import { generateCategoryMetadata } from '@/lib/seo-metadata';
import { Calculator } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES[category as CalculatorCategory]) {
    return { title: 'Category Not Found' };
  }
  return generateCategoryMetadata(category as CalculatorCategory);
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryData = CATEGORIES[category as CalculatorCategory];

  if (!categoryData) {
    notFound();
  }

  const calculators = getCalculatorsByCategory(category as CalculatorCategory);

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <Breadcrumbs category={{ name: categoryData.h1, slug: category as CalculatorCategory }} />
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          {categoryData.h1}
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          {categoryData.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <Link
            href={`/calculators/${calc.category}/${calc.slug}`}
            key={calc.slug}
            className="group flex flex-col justify-between p-6 rounded-2xl bg-card border border-border hover:border-brand-500 hover:shadow-md transition-all"
          >
            <div>
              <div className="mb-4 inline-flex p-3 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-400">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">
                {calc.h1}
              </h3>
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {calc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
