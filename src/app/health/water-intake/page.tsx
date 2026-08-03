import { WaterIntakeCalculator } from "@/features/health/WaterIntakeCalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Water Intake Calculator",
  description: "Calculate your optimal daily water intake based on your weight and activity level.",
}

export default function WaterIntakePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Water Intake Calculator</h1>
        <p className="text-muted-foreground">
          Determine your optimal daily hydration target based on weight, activity, and climate.
        </p>
      </div>
      <WaterIntakeCalculator />
    </div>
  )
}
