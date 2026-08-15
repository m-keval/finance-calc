import { Metadata } from "next";
import { DateAddCalculator } from "@/features/age-date/DateAddCalculator";

export const metadata: Metadata = {
  title: "Date Add Calculator",
  description: "Add days, weeks, months, or years to any date to find a future date.",
};

export default function DateAddPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Date Add Calculator</h1>
        <p className="text-muted-foreground mt-1">Add time to a date to find a future date.</p>
      </div>
      <DateAddCalculator />
    </div>
  );
}
