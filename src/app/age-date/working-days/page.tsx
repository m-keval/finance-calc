import { Metadata } from "next";
import { WorkingDaysCalculator } from "@/features/age-date/WorkingDaysCalculator";

export const metadata: Metadata = {
  title: "Working Days Calculator",
  description: "Calculate the number of working days (weekdays) between two dates.",
};

export default function WorkingDaysPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Working Days Calculator</h1>
        <p className="text-muted-foreground mt-1">Count business days between two dates.</p>
      </div>
      <WorkingDaysCalculator />
    </div>
  );
}
