import { BodyFatCalculator } from "@/features/health/BodyFatCalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Body Fat Calculator",
  description: "Calculate your body fat percentage using the U.S. Navy Method.",
}

export default function BodyFatPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Body Fat Calculator</h1>
        <p className="text-muted-foreground">
          Estimate your body fat percentage and determine your fitness category.
        </p>
      </div>
      <BodyFatCalculator />
    </div>
  )
}
