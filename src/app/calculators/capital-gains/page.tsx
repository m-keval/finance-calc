import { Metadata } from "next";
import { CapitalGainsCalculator } from "@/features/capital-gains/CapitalGainsCalculator";
import { Landmark, HelpCircle, ShieldCheck, Scale, BookOpen, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator (Budget 2024 Updated) | LTCG & STCG",
  description: "Calculate Short-Term and Long-Term Capital Gains Tax (STCG & LTCG) on Equity, Mutual Funds, and Real Estate based on the latest Union Budget 2024 rules.",
};

export default function CapitalGainsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Landmark className="h-3.5 w-3.5" /> Budget 2024 Capital Gains Rules
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Capital Gains Tax Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Calculate your tax liability on the sale of Stocks, Mutual Funds, and Real Estate properties under the updated Union Budget 2024 taxation framework.
        </p>
      </div>

      <CapitalGainsCalculator />

      {/* In-Depth Educational Guide & Tax Rules */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Tax Rates Summary Table */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-brand-600" /> Capital Gains Tax Rates (Budget 2024)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Asset Class</th>
                  <th className="p-4">Short-Term (STCG)</th>
                  <th className="p-4">Long-Term (LTCG)</th>
                  <th className="p-4">LTCG Exemption Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Listed Equity & Equity Mutual Funds</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">20% (Held &lt; 12 Months)</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">12.5% (Held &gt; 12 Months)</td>
                  <td className="p-4 text-foreground">₹1.25 Lakh / Financial Year</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Real Estate (Land & Buildings)</td>
                  <td className="p-4 text-foreground">Slab Rate (Held &lt; 24 Months)</td>
                  <td className="p-4 text-foreground">12.5% without indexation (Held &gt; 24 Mos)</td>
                  <td className="p-4 text-muted-foreground">Nil (Exemption via Sec 54/54EC)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Gold & Precious Metals</td>
                  <td className="p-4 text-foreground">Slab Rate (Held &lt; 24 Months)</td>
                  <td className="p-4 text-foreground">12.5% (Held &gt; 24 Months)</td>
                  <td className="p-4 text-muted-foreground">Nil</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Debt Mutual Funds (Bought after Apr 2023)</td>
                  <td className="p-4 text-foreground">Taxed at Income Tax Slab Rate</td>
                  <td className="p-4 text-foreground">Taxed at Income Tax Slab Rate</td>
                  <td className="p-4 text-muted-foreground">Nil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 54 Tax Saving Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> How to Save Real Estate LTCG Tax (Section 54)
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Section 54:</strong> Reinvest residential capital gains in purchasing another residential house property within 2 years or constructing within 3 years.</li>
              <li><strong>Section 54EC:</strong> Invest up to <strong>₹50 Lakh</strong> of capital gains in specified bonds (REC, NHAI, PFC, IRFC) with a 5-year lock-in.</li>
              <li><strong>Capital Gains Account Scheme (CGAS):</strong> If you cannot buy immediately before filing ITR, deposit funds in a CGAS account with a scheduled public bank.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-600" /> Grandfathering & Real Estate Relief
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Properties bought before 23 July 2024:</strong> Resident individuals can choose between 12.5% without indexation OR 20% with indexation—whichever yields lower tax liability.</li>
              <li><strong>Properties bought before 2001:</strong> Fair Market Value (FMV) as of 1 April 2001 is adopted as the base acquisition cost.</li>
              <li><strong>Tax Loss Harvesting:</strong> Capital losses can be set off against capital gains and carried forward for up to 8 financial years.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Capital Gains FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How is the ₹1.25 Lakh Equity LTCG exemption applied?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every financial year, the first ₹1,25,000 of aggregate long-term capital gains from listed equities and equity mutual funds is completely tax-free. Only the amount in excess of ₹1.25 Lakh is taxed at 12.5%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can Short-Term Capital Loss be set off against LTCG?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. Short-Term Capital Loss (STCL) can be set off against <strong>both STCG and LTCG</strong>. However, Long-Term Capital Loss (LTCL) can ONLY be set off against Long-Term Capital Gains.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is Tax Loss Harvesting in equities?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tax Loss Harvesting is the practice of selling loss-making stocks or mutual fund units before the end of the financial year to offset realized capital gains, thereby reducing your overall net tax liability.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Does STCG from equity qualify for the basic exemption limit?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, for resident individuals, if your total other taxable income is below the basic tax exemption limit (₹3 Lakh in New Regime), the unexhausted basic exemption can be adjusted against capital gains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
