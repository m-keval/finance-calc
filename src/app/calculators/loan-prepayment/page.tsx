import { LoanPrepaymentCalculator } from "@/features/loan-prepayment/LoanPrepaymentCalculator"

export const metadata = {
  title: "Loan Prepayment Planner | FinanceHub",
  description: "Calculate how much interest and time you can save by paying extra towards your loan every month.",
}

export default function LoanPrepaymentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Loan Prepayment Planner</h1>
        <p className="text-muted-foreground mt-2">
          Discover how making small extra payments every month can shave years off your loan and save you lakhs in interest.
        </p>
      </div>
      
      <LoanPrepaymentCalculator />
    </div>
  )
}
