import { Metadata } from "next";
import { SIPCalculator } from "@/features/sip/SIPCalculator";
import { HelpCircle, CheckCircle2, TrendingUp, Sparkles, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "SIP Calculator | Calculate Mutual Fund Returns & Compounding",
  description: "Calculate your Systematic Investment Plan (SIP) returns with live growth charts, compounding analysis, fund category recommendations, and actionable financial guidance.",
};

export default function SIPPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <TrendingUp className="h-3.5 w-3.5" /> Mutual Fund Wealth Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          SIP Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Simulate how regular monthly investments accumulate into substantial wealth through compounding, rupee cost averaging, and annual step-ups.
        </p>
      </div>

      {/* Main Interactive Calculator & Guidance */}
      <SIPCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Section 1: Core Mechanics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> What is a Systematic Investment Plan (SIP)?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Systematic Investment Plan (SIP) is a disciplined method of investing a fixed sum of money into mutual funds at predetermined intervals (usually monthly). Instead of timing the stock market or risking a large lump sum at market peaks, SIP automates wealth accumulation by purchasing fund units regularly.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When market prices fall, your fixed monthly amount buys <strong>more units</strong>; when prices rise, it buys fewer units. Over several years, this averages down your total acquisition cost—a mathematical advantage known as <strong>Rupee Cost Averaging</strong>.
            </p>
          </div>

          {/* Mathematical Formula Card */}
          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> The SIP Compounding Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The future value (FV) of an annuity due with monthly compounding is calculated as:
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300 overflow-x-auto">
              FV = P × [((1 + r)ⁿ - 1) / r] × (1 + r)
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li><strong>FV</strong>: Future Value / Corpus</li>
              <li><strong>P</strong>: Monthly Investment</li>
              <li><strong>r</strong>: Monthly Rate (Annual / 12 / 100)</li>
              <li><strong>n</strong>: Number of Months (Years × 12)</li>
            </ul>
          </div>
        </div>

        {/* Section 2: SIP vs Lump Sum Comparison Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            SIP vs. Lump Sum: Which is Right For You?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">Monthly SIP</th>
                  <th className="p-4">Lump Sum Investment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Market Timing Risk</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">None (Rupee Cost Averaging mitigates volatility)</td>
                  <td className="p-4 text-muted-foreground">High (Entering at a market peak can hurt near-term returns)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Capital Requirement</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Starts as low as ₹500/month</td>
                  <td className="p-4 text-muted-foreground">Requires a large upfront capital pool (₹50,000+)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Discipline & Habit</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Automated monthly auto-debit builds wealth on autopilot</td>
                  <td className="p-4 text-muted-foreground">Subject to investor hesitation and market psychology</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Best Suited For</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Salaried professionals and regular monthly income earners</td>
                  <td className="p-4 text-muted-foreground">Bonuses, business profits, inheritance, or property sale proceeds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (SIP FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I pause or stop my SIP at any time?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. Unlike fixed deposits or recurring deposits with rigid lock-ins, non-ELSS mutual fund SIPs are completely flexible. You can pause or cancel your SIP without any penalty fees or interest reductions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What happens if my bank balance is insufficient for a SIP?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The mutual fund house will simply skip that month’s investment without cancelling your ongoing SIP. However, your bank may charge a mandate bounce fee (NACH bounce charge), so it is best to set your SIP date right after salary day.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How are mutual fund SIP returns taxed in India?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As per Budget 2024, for Equity Mutual Funds held over 12 months, Long Term Capital Gains (LTCG) are <strong>tax-exempt up to ₹1.25 Lakh per financial year</strong>, and taxed at <strong>12.5%</strong> on gains above that limit. Short-term gains (held &lt; 12 months) are taxed at 20%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the ideal number of mutual funds to hold?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Financial advisors generally recommend holding between <strong>2 to 4 well-chosen funds</strong> across distinct categories (e.g., 1 Flexi Cap/Large Cap, 1 Mid Cap, 1 Small Cap or Hybrid fund). Holding 10+ funds causes unnecessary portfolio overlap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
