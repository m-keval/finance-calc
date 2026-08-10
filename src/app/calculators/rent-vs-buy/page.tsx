import { RentVsBuyCalculator } from "@/features/rent-vs-buy/RentVsBuyCalculator"

export const metadata = {
  title: "Rent vs Buy Calculator | FinanceHub",
  description: "Compare the financial benefits of renting versus buying a house to make the right real estate decision.",
}

export default function RentVsBuyPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rent vs. Buy Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare the long-term financial impact of buying a property versus renting one, considering EMIs, rent escalation, and investment returns.
        </p>
      </div>

      <RentVsBuyCalculator />
    </div>
  )
}
