import { BMRCalculator } from "@/features/health/BMRCalculator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BMR Calculator",
  description: "Calculate your Basal Metabolic Rate (BMR) to understand how many calories you burn at rest.",
}

export default function BMRPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">BMR Calculator</h1>
        <p className="text-muted-foreground">
          Find out how many calories your body naturally burns at rest.
        </p>
      </div>
      <BMRCalculator />
    </div>
  )
}
