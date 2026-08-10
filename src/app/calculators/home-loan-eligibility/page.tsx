import { HomeLoanEligibilityCalculator } from "@/features/home-loan-eligibility/HomeLoanEligibilityCalculator"

export const metadata = {
  title: "Home Loan Eligibility Calculator | FinanceHub",
  description: "Calculate your maximum home loan eligibility based on your income and existing EMIs.",
}

export default function HomeLoanEligibilityPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Home Loan Eligibility</h1>
        <p className="text-muted-foreground mt-2">
          Find out exactly how much home loan you can qualify for from banks based on your monthly income and current debt obligations.
        </p>
      </div>

      <HomeLoanEligibilityCalculator />
    </div>
  )
}
