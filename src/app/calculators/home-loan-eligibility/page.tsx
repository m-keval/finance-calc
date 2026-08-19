import { Metadata } from "next";
import { HomeLoanEligibilityCalculator } from "@/features/home-loan-eligibility/HomeLoanEligibilityCalculator";
import { Building, HelpCircle, ShieldCheck, Scale, CheckCircle2, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Loan Eligibility Calculator | Check Max Loan Borrowing Capacity",
  description: "Calculate maximum home loan amount you can borrow based on net monthly salary, existing EMIs, FOIR limits, interest rates, and loan tenure.",
};

export default function HomeLoanEligibilityPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Building className="h-3.5 w-3.5" /> Home Borrowing Power
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Home Loan Eligibility Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Discover the maximum loan amount banks will sanction based on your monthly income, existing loan obligations, and FOIR affordability ratios.
        </p>
      </div>

      <HomeLoanEligibilityCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* How Banks Calculate Eligibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> How Banks Calculate Home Loan Eligibility
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Banks and housing finance companies (HFCs) evaluate your repayment capacity using the <strong>Fixed Obligation to Income Ratio (FOIR)</strong>. Most lenders restrict total monthly debt payments (existing EMIs + new home loan EMI) to <strong>40% to 50%</strong> of your net in-hand monthly salary.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The remaining 50% to 60% of your income is reserved for household living expenses, food, rent, utilities, and emergency medical cushion.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> The Eligibility Math Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Maximum sanctionable home loan principal (P) is calculated as:
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300 space-y-1">
              <div>Available EMI = (Net Salary × FOIR%) - Existing EMIs</div>
              <div>Max Loan = Available EMI × [((1 + r)ⁿ - 1) / (r × (1 + r)ⁿ)]</div>
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li><strong>FOIR</strong>: 40% – 50%</li>
              <li><strong>r</strong>: Monthly Interest Rate</li>
              <li><strong>n</strong>: Tenure in Months</li>
              <li><strong>P</strong>: Maximum Loan Principal</li>
            </ul>
          </div>
        </div>

        {/* 4 Ways to Increase Eligibility */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" /> 4 Proven Ways to Boost Your Home Loan Eligibility
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">1. Add a Co-Applicant</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Adding your earning spouse, parent, or sibling as a co-applicant pools both incomes together, increasing your borrowing capacity by up to <strong>70% to 100%</strong>.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">2. Clear Existing Short-term Debts</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Closing ongoing personal loans, two-wheeler loans, or credit card EMIs frees up your FOIR threshold, allowing more of your monthly income to count toward your home loan EMI.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">3. Choose a Longer Loan Tenure</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Opting for a 25 or 30-year tenure lowers the per-month EMI requirement, which immediately increases the maximum loan amount sanctionable by the bank.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">4. Maintain a High CIBIL Score (750+)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A credit score above 750 earns preferential interest rates (often 0.25%–0.50% lower) and allows banks to stretch your FOIR limit from 40% up to 55%.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Home Loan FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the minimum down payment required for a home loan?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under RBI rules, banks can fund up to 80% to 90% of the property value (Loan-to-Value / LTV ratio). Borrowers must arrange the remaining <strong>10% to 20% as a down payment (own contribution)</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What documents are required for home loan approval?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Salaried applicants require last 3 months salary slips, 6 months bank statement, Form 16 (last 2 years), KYC documents (PAN, Aadhaar), and property title deed / builder allotment letter.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Are women borrowers eligible for lower interest rates?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, most Indian banks and housing finance companies offer a <strong>0.05% (5 bps) interest rate concession</strong> if the primary applicant or sole applicant is a woman.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I get a tax deduction on home loan repayments?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under the Old Tax Regime, you can claim up to <strong>₹1.5 Lakh on principal repayment under Section 80C</strong> and up to <strong>₹2 Lakh on interest paid under Section 24(b)</strong> for self-occupied properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
