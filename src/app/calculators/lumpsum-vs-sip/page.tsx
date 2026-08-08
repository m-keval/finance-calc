import { LumpsumVsSipCalculator } from "@/features/lumpsum-vs-sip/LumpsumVsSipCalculator"

export const metadata = {
  title: "Lumpsum vs SIP Calculator | FinanceHub",
  description: "Compare investing a large amount all at once vs staggering it over time via SIP.",
}

export default function LumpsumVsSipPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lumpsum vs SIP Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Should you invest your money all at once, or stagger it over a few months to average out market volatility?
        </p>
      </div>
      
      <LumpsumVsSipCalculator />
    </div>
  )
}
