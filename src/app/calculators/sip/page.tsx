import { Metadata } from "next";
import { SIPCalculator } from "@/features/sip/SIPCalculator";

export const metadata: Metadata = {
  title: "SIP Calculator",
  description: "Calculate your Systematic Investment Plan (SIP) returns. See how your monthly investments grow over time with compounding.",
};

export default function SIPPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">SIP Calculator</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Calculate how much your monthly investments can grow over time. Plan your wealth creation journey using the power of compounding.
        </p>
      </div>

      <SIPCalculator />

      <div className="mt-16 space-y-8 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-semibold">What is a SIP?</h2>
          <p>
            A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds to investors, allowing them to invest small amounts periodically instead of lump sums. The frequency of investment is usually weekly, monthly or quarterly.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">How is SIP calculated?</h2>
          <p>
            The SIP calculator uses the compound interest formula to calculate the future value of your investments. 
            The formula used is:
          </p>
          <div className="bg-muted p-4 rounded-md font-mono text-sm inline-block">
            FV = P × (((1 + r)^n - 1) / r) × (1 + r)
          </div>
          <ul className="mt-4 list-disc list-inside">
            <li><strong>FV</strong>: Future Value of the investment</li>
            <li><strong>P</strong>: Installment amount (Monthly Investment)</li>
            <li><strong>r</strong>: Monthly rate of return (Annual Rate / 12 / 100)</li>
            <li><strong>n</strong>: Total number of installments (Years × 12)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
