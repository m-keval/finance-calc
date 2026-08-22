import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, getAllCalculators } from '@/lib/seo-data';
import Breadcrumbs from '@/components/seo/breadcrumbs';
import { ArrowRight, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Free Online Calculators | Calcniv',
  description: 'Explore our complete list of free online financial, investment, and loan calculators to simplify your calculations.',
};

export default function AllCalculatorsPage() {
  const allCalculators = getAllCalculators();

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <Breadcrumbs />
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          All Free Online Calculators
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore our collection of free financial, investment, and loan calculators.
        </p>
      </div>

      <div className="space-y-12">
        {Object.values(CATEGORIES).map((category) => (
          <div key={category.slug}>
            <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
              <h2 className="text-2xl font-bold capitalize">{category.h1}</h2>
              <Link
                href={`/calculators/${category.slug}`}
                className="text-brand-600 hover:text-brand-700 flex items-center gap-1 text-sm font-medium"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCalculators
                .filter((calc) => calc.category === category.slug)
                .map((calc) => (
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
        ))}
      </div>
    </div>
  );
}
