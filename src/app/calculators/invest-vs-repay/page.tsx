import { InvestVsRepayCalculator } from "@/features/invest-vs-repay/InvestVsRepayCalculator"

export const metadata = {
  title: "Invest vs Repay Loan | FinanceHub",
  description: "Should you prepay your loan or invest your extra cash? Find out mathematically which makes you wealthier.",
}

export default function InvestVsRepayPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invest or Repay Loan</h1>
        <p className="text-muted-foreground mt-2">
          Compare the mathematical benefits of paying down your loan faster versus investing your surplus cash.
        </p>
      </div>
      
      <InvestVsRepayCalculator />
    </div>
  )
}
