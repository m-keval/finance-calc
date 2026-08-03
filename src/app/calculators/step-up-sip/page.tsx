import { StepUpSIPCalculator } from "@/features/step-up-sip/StepUpSIPCalculator";

export const metadata = {
  title: "Step-up SIP Calculator - Finance Calculator",
  description: "Calculate your mutual fund returns with an annually increasing SIP.",
};

export default function StepUpSIPPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Step-up SIP Calculator</h1>
        <p className="text-muted-foreground text-lg">
          Calculate how an annual increase in your SIP amount accelerates your wealth creation over time.
        </p>
      </div>
      
      <StepUpSIPCalculator />
    </div>
  );
}
