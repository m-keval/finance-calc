import { IdealWeightCalculator } from "@/features/health/IdealWeightCalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ideal Weight Calculator",
  description: "Calculate your ideal weight based on your height and gender.",
}

export default function IdealWeightPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Ideal Weight Calculator</h1>
        <p className="text-muted-foreground">
          Find your clinically healthy ideal weight range based on standard medical formulas.
        </p>
      </div>
      <IdealWeightCalculator />
    </div>
  )
}
