import { Metadata } from "next";
import { DaysBetweenCalculator } from "@/features/age-date/DaysBetweenCalculator";

export const metadata: Metadata = {
  title: "Days Between Dates Calculator",
  description: "Calculate the exact number of days between any two dates.",
};

export default function DaysBetweenPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Days Between Dates Calculator</h1>
        <p className="text-muted-foreground mt-1">Count the days between two dates.</p>
      </div>
      <DaysBetweenCalculator />
    </div>
  );
}
