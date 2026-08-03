import { CalorieCalculator } from "@/features/health/CalorieCalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calorie Calculator",
  description: "Calculate your daily caloric needs for weight loss, maintenance, or muscle gain.",
}

export default function CaloriePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Calorie Calculator</h1>
        <p className="text-muted-foreground">
          Determine exactly how many calories and macronutrients you need daily to reach your goals.
        </p>
      </div>
      <CalorieCalculator />
    </div>
  )
}
