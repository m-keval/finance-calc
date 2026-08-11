import { Metadata } from "next"
import { IncomeTaxCalculator } from "@/features/income-tax/IncomeTaxCalculator"

export const metadata: Metadata = {
  title: "Income Tax Calculator | Compare Old vs New Regime",
  description: "Compare the Old and New Income Tax regimes for FY 2024-25 (AY 2025-26) to find out which one saves you more tax.",
}

export default function IncomeTaxPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Income Tax Calculator</h1>
        <p className="text-muted-foreground">
          Compare the Old and New Tax Regimes (updated for Budget 2024) and determine which one minimizes your tax liability.
        </p>
      </div>
      
      <IncomeTaxCalculator />
    </div>
  )
}
