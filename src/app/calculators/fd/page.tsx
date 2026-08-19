import { Metadata } from "next";
import { FDCalculator } from "@/features/fd/FDCalculator";
import { PiggyBank, HelpCircle, ShieldCheck, Layers, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Fixed Deposit (FD) Calculator | Compound Interest & Maturity Returns",
  description: "Calculate maturity amount and interest earned on Fixed Deposits with quarterly compounding, senior citizen interest rate comparison, and TDS rules.",
};

export default function FDPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <PiggyBank className="h-3.5 w-3.5" /> Guaranteed Wealth Growth
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Fixed Deposit (FD) Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Compute maturity value and total interest earned on cumulative bank and post office fixed deposits with quarterly compounding.
        </p>
      </div>

      <FDCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Mechanics & Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> How Bank Fixed Deposits Work
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Fixed Deposit (FD) is a secure financial instrument offered by commercial banks, Small Finance Banks, NBFCs, and India Post. You invest a lump sum amount for a fixed tenure (from 7 days up to 10 years) at a guaranteed predetermined interest rate.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In cumulative FDs, interest is <strong>compounded quarterly (every 3 months)</strong> and reinvested with the principal, so you earn interest on previously accumulated interest until maturity.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> The Quarterly Compounding Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The maturity amount (A) for bank fixed deposits with quarterly compounding is calculated as:
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs sm:text-sm text-brand-700 dark:text-brand-300">
              A = P × [1 + (r / 400)]^(4 × t)
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <li><strong>A</strong>: Maturity Amount</li>
              <li><strong>P</strong>: Principal Deposit</li>
              <li><strong>r</strong>: Annual Interest Rate (%)</li>
              <li><strong>t</strong>: Tenure in Years</li>
            </ul>
          </div>
        </div>

        {/* Cumulative vs Non-Cumulative FD Comparison */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Cumulative vs. Non-Cumulative Fixed Deposits
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">Cumulative FD (Reinvestment)</th>
                  <th className="p-4">Non-Cumulative FD (Regular Payout)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Interest Payout</td>
                  <td className="p-4 text-foreground">Paid in full along with principal at maturity</td>
                  <td className="p-4 text-foreground">Paid periodically (Monthly, Quarterly, Annually)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Compounding Effect</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Higher (Full benefit of quarterly compounding)</td>
                  <td className="p-4 text-muted-foreground">Lower (No compounding as interest is withdrawn)</td>
                </tr>
                <tr className="hover:bg-muted/20">
                  <td className="p-4 font-semibold text-foreground">Best Suited For</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Wealth creation, emergency funds, capital growth</td>
                  <td className="p-4 text-muted-foreground">Retirees and individuals seeking regular passive income</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (FD FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the DICGC insurance guarantee limit?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under the Deposit Insurance and Credit Guarantee Corporation (DICGC) Act, every depositor is insured up to a maximum of <strong>₹5,00,000 (₹5 Lakhs)</strong> for both principal and interest across all branches of each insured bank.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When do banks deduct TDS on fixed deposits?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Banks deduct 10% TDS if your total FD interest income across all branches of a bank exceeds <strong>₹40,000 in a financial year</strong> (₹50,000 for Senior Citizens). If PAN is not provided, TDS is deducted at 20%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How can I avoid TDS deduction using Form 15G / 15H?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If your total taxable income is below the basic exemption threshold, you can submit Form 15G (for individuals below 60) or Form 15H (for senior citizens 60+) at the beginning of each financial year to prevent TDS deduction.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is an FD Laddering Strategy?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                FD Laddering is dividing your total deposit across multiple maturity tenures (e.g. 1-year, 2-year, 3-year FDs). When each FD matures, you reinvest it at current interest rates, ensuring liquidity and rate diversification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
