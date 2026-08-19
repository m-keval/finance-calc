import { Metadata } from "next";
import { InvestVsRepayCalculator } from "@/features/invest-vs-repay/InvestVsRepayCalculator";
import { Scale, HelpCircle, ShieldCheck, Zap, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Invest vs Repay Loan Calculator | Prepay Debt or Invest in Mutual Funds?",
  description: "Mathematically compare whether you should prepay your home loan or invest your extra monthly surplus into equity mutual funds.",
};

export default function InvestVsRepayPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Scale className="h-3.5 w-3.5" /> Opportunity Cost Matrix
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Invest vs. Repay Loan Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Compare the mathematical wealth difference between prepaying your home loan early versus investing your extra cash in equity mutual funds.
        </p>
      </div>

      <InvestVsRepayCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Mathematical Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> The Math: Guaranteed Return vs. Equity Risk Premium
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prepaying a loan gives a <strong>100% risk-free, tax-free return equal to your loan interest rate</strong> (e.g. 8.5% p.a.).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Investing that same money in equity mutual funds has historically returned <strong>12% to 14% CAGR over 10+ years</strong>. The 3.5% to 5.5% annual return differential compounded over 15–20 years often generates millions of rupees in extra net wealth.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" /> The Decision Framework
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Prepay First if:</strong> Loan interest rate is &gt; 9.5% (personal loans, credit cards) or debt stress impacts your mental peace.</li>
              <li><strong>Invest First if:</strong> Loan interest is &lt; 8.5% (home loans), you receive tax deductions under Sec 24(b), and your horizon is &gt; 7 years.</li>
              <li><strong>The 50/50 Strategy:</strong> Split surplus 50% towards prepayment and 50% into SIPs to balance debt reduction with compounding.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Invest vs Repay FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Why do high-interest loans always come first?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Credit card debt (36–42% p.a.) and personal loans (12–18% p.a.) have interest costs far higher than any realistic long-term investment return. Always pay off high-cost unsecured debt before investing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the "Hybrid 50-50 Approach"?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rather than choosing all-or-nothing, split your surplus: put 50% towards annual home loan principal prepayment and 50% into an Equity Index or Flexi-cap SIP.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How does liquidity differ between prepaying and investing?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Money prepaid into a home loan is locked in the property equity and cannot be easily withdrawn for emergencies. Money invested in mutual funds remains liquid and can be redeemed in 2–3 business days.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Does psychological peace of mind outweigh the math?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For many individuals, being completely debt-free provides immense emotional peace of mind that exceeds pure mathematical optimization. If debt causes anxiety, prioritizing loan closure is valid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
