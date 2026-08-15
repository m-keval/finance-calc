import { Metadata } from "next";
import { AgeDifferenceCalculator } from "@/features/age-date/AgeDifferenceCalculator";

export const metadata: Metadata = {
  title: "Age Difference Calculator",
  description: "Calculate the exact age difference between two people or two dates.",
};

export default function AgeDifferencePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Age Difference Calculator</h1>
        <p className="text-muted-foreground mt-1">Find the exact age gap between two dates.</p>
      </div>
      <AgeDifferenceCalculator />
    </div>
  );
}
