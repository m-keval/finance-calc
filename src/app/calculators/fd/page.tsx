import { Metadata } from "next";
import { FDCalculator } from "@/features/fd/FDCalculator";

export const metadata: Metadata = {
  title: "Fixed Deposit (FD) Calculator",
  description: "Calculate your Fixed Deposit (FD) maturity amount and interest earned over your investment tenure.",
};

export default function FDPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">FD Calculator</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Calculate the maturity amount and interest earned on your Fixed Deposit. Plan your secure investments with accurate return projections.
        </p>
      </div>

      <FDCalculator />

      <div className="mt-16 space-y-8 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-semibold">What is a Fixed Deposit (FD)?</h2>
          <p>
            A Fixed Deposit is a financial instrument provided by banks and NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">How is FD calculated?</h2>
          <p>
            The FD calculator uses the compound interest formula, typically compounded quarterly in India. 
            The formula used is:
          </p>
          <div className="bg-muted p-4 rounded-md font-mono text-sm inline-block">
            A = P(1 + r/n)^(n*t)
          </div>
          <ul className="mt-4 list-disc list-inside">
            <li><strong>A</strong>: Maturity Amount</li>
            <li><strong>P</strong>: Principal amount invested</li>
            <li><strong>r</strong>: Annual interest rate (in decimals)</li>
            <li><strong>n</strong>: Number of times interest is compounded per year (usually 4 for quarterly)</li>
            <li><strong>t</strong>: Time the money is invested for (in years)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
