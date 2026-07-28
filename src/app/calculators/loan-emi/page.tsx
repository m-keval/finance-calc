import { Metadata } from "next";
import { LoanCalculator } from "@/features/loan/LoanCalculator";

export const metadata: Metadata = {
  title: "Loan EMI Calculator",
  description: "Calculate your monthly EMI for Home, Car, or Personal Loans. Check the total interest payable and amortization schedule.",
};

export default function LoanPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Loan EMI Calculator</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Calculate your Equated Monthly Installment (EMI) for any loan. Understand the proportion of interest versus principal in your total repayment.
        </p>
      </div>

      <LoanCalculator />

      <div className="mt-16 space-y-8 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-semibold">What is an EMI?</h2>
          <p>
            Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. 
            EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is fully paid off along with interest.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">How is EMI calculated?</h2>
          <p>
            The mathematical formula for calculating EMIs is:
          </p>
          <div className="bg-muted p-4 rounded-md font-mono text-sm inline-block">
            EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
          </div>
          <ul className="mt-4 list-disc list-inside">
            <li><strong>P</strong>: Principal loan amount</li>
            <li><strong>R</strong>: Rate of interest calculated on monthly basis (Annual Rate / 12 / 100)</li>
            <li><strong>N</strong>: Loan tenure in months</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
