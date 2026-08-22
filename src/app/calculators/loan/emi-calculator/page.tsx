import { Metadata } from "next";
import { LoanCalculator } from "@/features/loan/LoanCalculator";
import { generateCalculatorMetadata } from "@/lib/seo-metadata";
import { getCalculatorSEO } from "@/lib/seo-data";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import CalculatorSchema from "@/components/seo/calculator-schema";
import { CalculatorIntro, CalculatorFAQ, RelatedCalculators } from "@/components/seo/calculator-content";

const seoData = getCalculatorSEO("emi-calculator")!;

export const metadata: Metadata = generateCalculatorMetadata(seoData);

export default function LoanPage() {
  return (
    <div className="w-full">
      <CalculatorSchema seoData={seoData} />
      <Breadcrumbs 
        category={{ name: 'Loan Calculators', slug: 'loan' }}
        calculator={{ name: seoData.h1, slug: seoData.slug }}
      />
      
      <div className="mb-2">
        <CalculatorIntro seoData={seoData} />
      </div>

      <LoanCalculator />

      <div className="mt-16 space-y-8 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-semibold">How is EMI calculated?</h2>
          <p>
            The mathematical formula for calculating EMIs is:
          </p>
          <div className="bg-muted p-4 rounded-md font-mono text-sm inline-block">
            EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
          </div>
          <ul className="mt-4 list-disc list-inside">
            <li><strong>P</strong>: Principal loan amount</li>
            <li><strong>R</strong>: Rate of interest calculated on monthly basis (Annual Rate / 12 / 100)</li>
            <li><strong>N</strong>: Loan tenure in months</li>
          </ul>
        </section>
        
        <CalculatorFAQ seoData={seoData} />
        <RelatedCalculators seoData={seoData} />
      </div>
    </div>
  );
}
