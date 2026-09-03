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

      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Section 1: Core Mechanics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What is an EMI?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. Equated monthly installments are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With most common types of loans, such as real estate mortgages, auto loans, and student loans, the borrower makes fixed periodic payments to the lender over several years with the goal of retiring the loan. The largest chunk of an EMI goes toward interest in the early years of a loan.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground">
              The EMI Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The mathematical formula for calculating EMIs is:
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300 overflow-x-auto">
              EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
            </div>
            <ul className="grid grid-cols-1 gap-2 text-xs text-muted-foreground mt-4">
              <li><strong>P</strong>: Principal loan amount</li>
              <li><strong>R</strong>: Rate of interest calculated on a monthly basis (Annual Rate / 12 / 100)</li>
              <li><strong>N</strong>: Loan tenure in months</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Factors affecting EMI */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Factors Affecting Your EMI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <h4 className="font-semibold text-sm mb-2">Principal Amount</h4>
              <p className="text-xs text-muted-foreground">The initial amount you borrow. A higher principal directly results in a higher EMI.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <h4 className="font-semibold text-sm mb-2">Interest Rate</h4>
              <p className="text-xs text-muted-foreground">The cost of borrowing. A higher interest rate increases your EMI and total interest outflow.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <h4 className="font-semibold text-sm mb-2">Loan Tenure</h4>
              <p className="text-xs text-muted-foreground">The time given to repay. A longer tenure reduces EMI but increases the total interest paid.</p>
            </div>
          </div>
        </div>

        <CalculatorFAQ seoData={seoData} />
        <RelatedCalculators seoData={seoData} />
      </div>
    </div>
  );
}
