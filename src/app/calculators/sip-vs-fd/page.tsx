import { Metadata } from "next";
import { SipVsFdCalculator } from "@/features/sip-vs-fd/SipVsFdCalculator";
import { TrendingUp, HelpCircle, ShieldCheck, Zap, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "SIP vs FD Calculator | Compare Mutual Funds vs Fixed Deposit Returns",
  description: "Compare long-term returns, taxation, inflation impact, and wealth accumulation between Equity Mutual Fund SIPs and Bank Fixed Deposits.",
};

export default function SipVsFdPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <TrendingUp className="h-3.5 w-3.5" /> Equity vs Debt Compounding
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          SIP vs. Fixed Deposit (FD) Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Compare the wealth creation potential, inflation resilience, and tax efficiency of Mutual Fund SIPs versus guaranteed Fixed Deposits.
        </p>
      </div>

      <SipVsFdCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Comparison Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-600" /> Key Differences: Equity SIP vs. Bank FD
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">Mutual Fund SIP</th>
                  <th className="p-4">Bank Fixed Deposit (FD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Expected Returns</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">12% – 15% CAGR (Market Linked)</td>
                  <td className="p-4 text-foreground">6.5% – 7.5% p.a. (Fixed / Guaranteed)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Tax Efficiency</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">12.5% LTCG after ₹1.25L exemption</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">Taxed at full income slab rate (up to 30%)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Inflation Protection</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">High (Delivers 6%–8% real return)</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">Low to Negative after tax & inflation</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Volatility / Risk</td>
                  <td className="p-4 text-muted-foreground">Moderate to High in short term</td>
                  <td className="p-4 text-foreground">Zero principal volatility (DICGC Insured)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (SIP vs FD FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Why is SIP much more tax-efficient than FD for high earners?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                FD interest is added directly to your income and taxed at your marginal slab (up to 30% + cess). Equity SIP gains held over 12 months enjoy a <strong>₹1.25 Lakh tax-free exemption every year</strong>, and gains above that are taxed at only 12.5%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When should I choose FD over SIP?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                FD is ideal for your <strong>Emergency Fund (6 months living expenses)</strong>, short-term goals (&lt; 3 years), and capital preservation needs where capital loss cannot be tolerated.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How does rupee cost averaging benefit SIP investors?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When markets drop, your fixed monthly SIP buys more mutual fund units at lower prices. When markets rise, your units appreciate, averaging down your cost per unit automatically without timing the market.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is an ideal allocation between SIP and FD?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A common guideline is the <strong>Rule of (100 minus Age)</strong> in Equities (via SIPs) and the remainder in Fixed Income/FDs, adjusting for individual risk appetite and financial commitments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
