import { Metadata } from "next";
import { DateDifferenceCalculator } from "@/features/age-date/DateDifferenceCalculator";

export const metadata: Metadata = {
  title: "Date Difference Calculator",
  description: "Calculate the difference between two dates in years, months, weeks, and days.",
};

export default function DateDifferencePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Date Difference Calculator</h1>
        <p className="text-muted-foreground mt-1">Find the time span between any two dates.</p>
      </div>
      <DateDifferenceCalculator />
    </div>
  );
}
