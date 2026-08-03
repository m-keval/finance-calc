import { BMICalculator } from "@/features/health/BMICalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index (BMI) to understand if you're at a healthy weight.",
}

export default function BMIPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">BMI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Body Mass Index to find out your weight category.
        </p>
      </div>
      <BMICalculator />
    </div>
  )
}
