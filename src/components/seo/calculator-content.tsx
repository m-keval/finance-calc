import React from 'react';
import Link from 'next/link';
import { CalculatorSEOData, getCalculatorSEO } from '@/lib/seo-data';

export function CalculatorIntro({ seoData }: { seoData: CalculatorSEOData }) {
  return (
    <section className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4 text-foreground">{seoData.h1}</h1>
      <p className="text-lg text-muted-foreground">{seoData.intro}</p>
    </section>
  );
}

export function CalculatorFAQ({ seoData }: { seoData: CalculatorSEOData }) {
  if (!seoData.faqs || seoData.faqs.length === 0) return null;

  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {seoData.faqs.map((faq, index) => (
          <div key={index} className="border-b border-border pb-4">
            <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RelatedCalculators({ seoData }: { seoData: CalculatorSEOData }) {
  if (!seoData.relatedCalculators || seoData.relatedCalculators.length === 0) return null;

  return (
    <section className="mt-12 space-y-6 pb-8">
      <h2 className="text-2xl font-semibold tracking-tight">Related Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seoData.relatedCalculators.map((slug) => {
          const relatedCalc = getCalculatorSEO(slug);
          if (!relatedCalc) return null;
          return (
            <Link
              key={slug}
              href={`/calculators/${relatedCalc.category}/${relatedCalc.slug}`}
              className="block p-4 rounded-xl border border-border hover:border-primary/50 transition-colors bg-card hover:bg-accent/50"
            >
              <h3 className="font-medium text-foreground mb-1">{relatedCalc.h1}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {relatedCalc.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
