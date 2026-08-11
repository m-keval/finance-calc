import { Metadata } from "next"
import { CapitalGainsCalculator } from "@/features/capital-gains/CapitalGainsCalculator"

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator | Finance Calculators",
  description: "Calculate Short-Term and Long-Term Capital Gains Tax (STCG & LTCG) for Equity and Real Estate based on the latest 2024 Budget rules.",
}

export default function CapitalGainsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Capital Gains Tax Calculator</h1>
        <p className="text-muted-foreground">
          Estimate your tax liability on the sale of Equity, Mutual Funds, or Real Estate. Updated with the latest Union Budget 2024 rules.
        </p>
      </div>
      
      <CapitalGainsCalculator />
    </div>
  )
}
