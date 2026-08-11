import { Metadata } from "next"
import { HraCalculator } from "@/features/hra/HraCalculator"

export const metadata: Metadata = {
  title: "HRA Exemption Calculator | Finance Calculators",
  description: "Calculate your House Rent Allowance (HRA) exemption online under Section 10(13A) to save income tax.",
}

export default function HraCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HRA Exemption Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the exact tax-free portion of your House Rent Allowance (HRA) based on your salary, rent, and city.
        </p>
      </div>
      
      <HraCalculator />
    </div>
  )
}
