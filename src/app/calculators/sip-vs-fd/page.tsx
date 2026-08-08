import { SipVsFdCalculator } from "@/features/sip-vs-fd/SipVsFdCalculator"

export const metadata = {
  title: "SIP vs FD Calculator | FinanceHub",
  description: "Compare SIP vs FD returns, inflation impact, and taxes to make a better investment decision.",
}

export default function SipVsFdPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SIP vs FD Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Compare Mutual Fund SIPs with Bank Recurring Deposits (FD) to find the best wealth creation strategy.
        </p>
      </div>
      
      <SipVsFdCalculator />
    </div>
  )
}
