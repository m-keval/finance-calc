import { Metadata } from "next";
import { CAGRCalculator } from "@/features/cagr/CAGRCalculator";
import { generateCalculatorMetadata } from "@/lib/seo-metadata";
import { getCalculatorSEO } from "@/lib/seo-data";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import CalculatorSchema from "@/components/seo/calculator-schema";
import { CalculatorIntro, CalculatorFAQ, RelatedCalculators } from "@/components/seo/calculator-content";
import { TrendingUp, BookOpen, Layers, HelpCircle } from "lucide-react";

const seoData = getCalculatorSEO("cagr-calculator")!;

export const metadata: Metadata = generateCalculatorMetadata(seoData);

export default function CAGRPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <CalculatorSchema seoData={seoData} />
      <Breadcrumbs 
        category={{ name: 'Investment Calculators', slug: 'investment' }}
        calculator={{ name: seoData.h1, slug: seoData.slug }}
      />
      <div className="mb-2">
        <CalculatorIntro seoData={seoData} />
      </div>

      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <TrendingUp className="h-3.5 w-3.5" /> Measure True Growth
        </div>
      </div>

      <CAGRCalculator />

      <div className="mt-16 space-y-12 border-t border-border pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> What is CAGR?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Compound Annual Growth Rate (CAGR) measures the smoothed annualized return of an investment over a specified time period. It eliminates the volatility of year-to-year returns and shows you the steady rate at which your investment grew.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> The CAGR Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The mathematical formula to calculate CAGR is:
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300">
              CAGR = [(Final Value / Initial Value)^(1 / Years)] - 1
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-8">
          <CalculatorFAQ seoData={seoData} />
          <RelatedCalculators seoData={seoData} />
        </div>
      </div>
    </div>
  );
}
