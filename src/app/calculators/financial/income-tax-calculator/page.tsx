import { Metadata } from "next";
import { IncomeTaxCalculator } from "@/features/income-tax/IncomeTaxCalculator";
import { HelpCircle, FileText, ShieldCheck, Scale, AlertCircle, BookOpen, Layers } from "lucide-react";

import { generateCalculatorMetadata } from "@/lib/seo-metadata";
import { getCalculatorSEO } from "@/lib/seo-data";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import CalculatorSchema from "@/components/seo/calculator-schema";
import { CalculatorIntro, CalculatorFAQ, RelatedCalculators } from "@/components/seo/calculator-content";

const seoData = getCalculatorSEO("income-tax-calculator")!;

export const metadata = generateCalculatorMetadata(seoData);


export default function IncomeTaxPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      <CalculatorSchema seoData={seoData} />
      <Breadcrumbs 
        category={{ name: 'Financial Calculators', slug: 'financial' }}
        calculator={{ name: seoData.h1, slug: seoData.slug }}
      />
      <div className="mb-2">
        <CalculatorIntro seoData={seoData} />
      </div>
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <FileText className="h-3.5 w-3.5" /> Union Budget 2024 Updated
        </div>
        
        
      </div>

      <IncomeTaxCalculator />

      {/* Educational & Guide Section */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Tax Slab Comparison */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-brand-600" /> Tax Slab Comparison: New vs. Old Regime (FY 2024-25)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Income Range</th>
                  <th className="p-4">New Tax Regime (Budget 2024)</th>
                  <th className="p-4">Old Tax Regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Up to ₹3,00,000</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Nil</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Nil (Up to ₹2.5L)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">₹3,00,001 – ₹7,00,000</td>
                  <td className="p-4 text-foreground">5% (Full rebate up to ₹7L under Sec 87A)</td>
                  <td className="p-4 text-foreground">5% (₹2.5L to ₹5L) / 20% (&gt;₹5L)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">₹7,00,001 – ₹10,00,000</td>
                  <td className="p-4 text-foreground">10%</td>
                  <td className="p-4 text-foreground">20%</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">₹10,00,001 – ₹12,00,000</td>
                  <td className="p-4 text-foreground">15%</td>
                  <td className="p-4 text-foreground">30%</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">₹12,00,001 – ₹15,00,000</td>
                  <td className="p-4 text-foreground">20%</td>
                  <td className="p-4 text-foreground">30%</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Above ₹15,00,000</td>
                  <td className="p-4 text-foreground">30%</td>
                  <td className="p-4 text-foreground">30%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Deductions & Key Differences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-600" /> Deductions Allowed in Old Regime
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Section 80C:</strong> Up to ₹1.5 Lakh (EPF, PPF, ELSS, Life Insurance, Home Loan Principal).</li>
              <li><strong>Section 80D:</strong> Up to ₹25,000 (Self/Family) + ₹50,000 (Senior Parents) Health Insurance.</li>
              <li><strong>Section 24(b):</strong> Up to ₹2 Lakh interest on Home Loan.</li>
              <li><strong>HRA / LTA:</strong> House Rent Allowance and Leave Travel Allowance exemptions.</li>
              <li><strong>Section 80CCD(1B):</strong> Additional ₹50,000 for National Pension Scheme (NPS).</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-600" /> New Regime Key Highlights (Budget 2024)
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Standard Deduction:</strong> Increased to <strong>₹75,000</strong> for salaried employees (up from ₹50,000).</li>
              <li><strong>Zero Tax up to ₹7.75 Lakh:</strong> Salaried individuals with income up to ₹7.75 Lakh pay ₹0 tax after standard deduction and Section 87A rebate.</li>
              <li><strong>Simplified Filing:</strong> No need to collect receipts or maintain investment proofs for 80C/80D.</li>
              <li><strong>Employer NPS (Sec 80CCD(2)):</strong> Allowed up to 14% of Basic Salary in New Regime.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Income Tax FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When is the Old Regime better than the New Regime?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If your total eligible deductions (80C, 80D, HRA, Home Loan Interest under Section 24b) exceed approximately <strong>₹3.75 Lakh to ₹4.25 Lakh</strong>, the Old Regime usually results in lower tax. If deductions are lower, the New Regime is generally superior.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I switch between Old and New Regimes every year?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Salaried taxpayers</strong> (with no business or professional income) can freely choose between the Old and New Regime each year when filing their ITR. Individuals with business/profession income can only switch back to the Old Regime once in a lifetime.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the 4% Health & Education Cess?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A 4% Health and Education Cess is applied on the total calculated income tax amount across both tax regimes to fund government healthcare and primary education programs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is Section 87A Marginal Tax Relief?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under the New Regime, if taxable income marginally exceeds ₹7,00,000 (e.g. ₹7,05,000), marginal relief ensures the tax payable cannot exceed the amount by which income exceeds ₹7,00,000.
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
