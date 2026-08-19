import { Metadata } from "next";
import { InflationCalculator } from "@/features/inflation/InflationCalculator";
import { Flame, HelpCircle, ShieldCheck, TrendingDown, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Inflation Calculator | Future Cost & Purchasing Power Impact",
  description: "Calculate how inflation erodes purchasing power over time and calculate the future value of your current monthly expenses.",
};

export default function InflationPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Flame className="h-3.5 w-3.5" /> Purchasing Power Analysis
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Inflation Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Discover how inflation silently erodes your cash over time and estimate the future cost of living, education, and retirement expenses.
        </p>
      </div>

      <InflationCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Mathematical Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> What is Inflation & Why Does It Matter?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Inflation is the rate at which the general price level of goods and services rises over time, reducing the purchasing power of each unit of currency.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If an annual grocery basket costs ₹1,00,000 today and inflation runs at 6% per year, you will need <strong>₹1,79,084 in 10 years</strong> and <strong>₹3,20,714 in 20 years</strong> to buy the exact same items.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> Future Cost vs Purchasing Power Formulas
            </h3>
            <div className="space-y-2 font-mono text-xs text-brand-700 dark:text-brand-300">
              <div className="p-2.5 rounded-lg bg-card border border-border">Future Cost = Today's Cost × (1 + i)ⁿ</div>
              <div className="p-2.5 rounded-lg bg-card border border-border">Purchasing Power = Today's Value ÷ (1 + i)ⁿ</div>
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li><strong>i</strong>: Inflation Rate (%)</li>
              <li><strong>n</strong>: Number of Years</li>
            </ul>
          </div>
        </div>

        {/* Rule of 72 */}
        <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> The Rule of 72: How Fast Prices Double
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Rule of 72 is a quick mental math shortcut to calculate how many years it takes for prices to double at a given inflation rate: <code>Years to Double = 72 ÷ Inflation Rate</code>.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-foreground pt-1">
            <div className="p-2.5 rounded-lg bg-muted/50 border border-border text-center">At 5%: ~14.4 Years</div>
            <div className="p-2.5 rounded-lg bg-muted/50 border border-border text-center">At 6%: ~12.0 Years</div>
            <div className="p-2.5 rounded-lg bg-muted/50 border border-border text-center">At 7%: ~10.3 Years</div>
            <div className="p-2.5 rounded-lg bg-muted/50 border border-border text-center">At 8%: ~9.0 Years</div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Inflation FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Why does keeping money in bank savings destroy wealth?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Savings bank accounts typically pay 2.75% to 3.5% interest, while inflation runs at 5% to 6%. Your real return after inflation is <strong>negative (-2% to -3%)</strong>, meaning your purchasing power shrinks every year.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What asset classes historically beat inflation?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diversified equity mutual funds (historical 12-14% CAGR), commercial and residential real estate, and Sovereign Gold Bonds (SGBs) have consistently outpaced consumer inflation over long horizons.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the difference between CPI and WPI?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>CPI (Consumer Price Index)</strong> tracks retail prices paid by consumers (food, housing, healthcare). <strong>WPI (Wholesale Price Index)</strong> tracks wholesale bulk transaction prices between businesses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How should I factor inflation into retirement?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Always compute your retirement corpus using future living costs rather than current costs. If you need ₹50,000/month today, plan for at least ₹1,60,000/month in 20 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
