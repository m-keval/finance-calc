import { Metadata } from "next";
import { LoanPrepaymentCalculator } from "@/features/loan-prepayment/LoanPrepaymentCalculator";
import { FastForward, HelpCircle, ShieldCheck, Zap, BookOpen, Layers } from "lucide-react";

import { generateCalculatorMetadata } from "@/lib/seo-metadata";
import { getCalculatorSEO } from "@/lib/seo-data";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import CalculatorSchema from "@/components/seo/calculator-schema";
import { CalculatorIntro, CalculatorFAQ, RelatedCalculators } from "@/components/seo/calculator-content";

const seoData = getCalculatorSEO("loan-prepayment-calculator")!;

export const metadata = generateCalculatorMetadata(seoData);


export default function LoanPrepaymentPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <CalculatorSchema seoData={seoData} />
      <Breadcrumbs 
        category={{ name: 'Loan Calculators', slug: 'loan' }}
        calculator={{ name: seoData.h1, slug: seoData.slug }}
      />
      <div className="mb-2">
        <CalculatorIntro seoData={seoData} />
      </div>
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <FastForward className="h-3.5 w-3.5" /> Debt Freedom Accelerator
        </div>
        
        
      </div>

      <LoanPrepaymentCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Why Prepayments Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> How Home Loan Prepayments Work
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you pay your regular monthly EMI, the bank splits your payment between interest charges and principal reduction. In the early years of a long-term loan (e.g. 20 years), <strong>up to 75%–80% of every EMI goes strictly toward interest</strong>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Any extra prepayment you make goes <strong>100% directly towards reducing the outstanding principal</strong>. This immediately reduces future interest compounding across all remaining months of the tenure.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" /> The 3 Golden Prepayment Strategies
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>1 Extra EMI per Year:</strong> Reduces a 20-year loan to ~16 years and saves 20-25% of total interest.</li>
              <li><strong>5% Annual EMI Step-Up:</strong> Increases EMI by 5% every year with salary appraisals, cutting tenure almost in half.</li>
              <li><strong>Lump-Sum Prepayment:</strong> Channeling annual bonuses, tax refunds, or maturity proceeds to make one-off principal cuts.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Prepayment FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Do banks charge prepayment penalty fees?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under Reserve Bank of India (RBI) directives, banks and housing finance companies <strong>cannot levy any prepayment or foreclosure penalty</strong> on floating-rate individual home loans.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Should I reduce EMI or reduce tenure after prepayment?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Choosing to <strong>reduce tenure</strong> (keeping EMI the same) saves significantly more total interest. Only choose to reduce EMI if you need immediate monthly cash flow relief.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When is the best time in the loan tenure to prepay?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The best time to prepay is within the <strong>first 5 to 7 years</strong> of the loan when outstanding principal is highest and compounding interest charges are greatest.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Does prepaying reduce my Section 24(b) tax benefit?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, because your total annual interest payment decreases. However, paying ₹1 in interest to save ₹0.30 in tax is still a net loss of ₹0.70. Prepayment saves more real money than the tax deduction.
              </p>
            </div>
          </div>
        </div>
      </div>
    
        <div className="mt-16 space-y-8">
          <CalculatorFAQ seoData={seoData} />
          <RelatedCalculators seoData={seoData} />
        </div>
      </div>
  );
}
