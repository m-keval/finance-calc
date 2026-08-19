import { Metadata } from "next";
import { GoalCalculator } from "@/features/goal/GoalCalculator";
import { Target, HelpCircle, ShieldCheck, Sparkles, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Goal Planning Calculator | Calculate Required SIP & Lumpsum for Future Goals",
  description: "Calculate how much monthly SIP or one-time lumpsum investment is needed to achieve your financial targets like retirement, house purchase, or education.",
};

export default function GoalPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Target className="h-3.5 w-3.5" /> Reverse Target Wealth Planner
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Goal Planning Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Work backwards from your dream financial milestones (Retirement, Dream Home, Children's Education) to find the exact monthly SIP or one-time investment required.
        </p>
      </div>

      <GoalCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* How Goal-Based Investing Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> What is Goal-Based Financial Planning?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Goal-based investing is an outcome-oriented wealth strategy where investments are mapped to specific life targets with defined timelines and required amounts, rather than chasing generic arbitrary market returns.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By working backwards, you eliminate guesswork, understand your monthly savings requirement, and choose appropriate asset allocation based strictly on your time horizon.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> The Goal SIP Math Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The required monthly investment (P) to accumulate target future corpus (FV) is computed as:
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300">
              P = FV × [ r / (((1 + r)ⁿ - 1) × (1 + r)) ]
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li><strong>P</strong>: Required Monthly SIP</li>
              <li><strong>FV</strong>: Target Goal Amount</li>
              <li><strong>r</strong>: Monthly Rate (Annual / 12 / 100)</li>
              <li><strong>n</strong>: Total Months (Years × 12)</li>
            </ul>
          </div>
        </div>

        {/* 3 Steps to Goal Success */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-foreground">1. Inflate Your Target</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always adjust your goal for inflation. A 4-year engineering degree costing ₹15 Lakhs today will require ~₹32 Lakhs in 12 years at 6.5% education inflation.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-foreground">2. Match Horizon to Asset Class</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Goals &gt; 5 years belong in equity mutual funds. Goals between 3-5 years fit hybrid funds. Short-term goals (&lt; 3 years) belong strictly in debt funds or FDs.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-foreground">3. The De-Risking Glide Path</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When you are 18–24 months away from achieving your target date, systematically shift your accumulated equity corpus into ultra-safe liquid funds so a sudden market dip cannot disrupt your goal.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Goal Planning FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What if the required monthly SIP is higher than my current savings?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Start with whatever amount you can afford today and configure a <strong>10% Annual Step-Up SIP</strong>. Increasing your SIP with annual salary increments bridge the gap and achieves the full corpus on time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Should I maintain separate mutual funds for each goal?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. Goal tagging gives clarity and prevents you from prematurely withdrawing funds meant for critical milestones like retirement or children's education for impulse expenses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What expected rate of return should I assume?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For long-term goals (&gt; 7 years) in equity mutual funds, assuming a conservative <strong>11% to 12% CAGR</strong> is considered standard financial planning best practice.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How often should I review my goal progress?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Review your goal portfolios <strong>once a year</strong>. If your investments have outperformed, you can reduce risk; if underperforming, you can step up your monthly allocation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
