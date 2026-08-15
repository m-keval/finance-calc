import { Metadata } from "next";
import { DateSubtractCalculator } from "@/features/age-date/DateSubtractCalculator";

export const metadata: Metadata = {
  title: "Date Subtract Calculator",
  description: "Subtract days, weeks, months, or years from any date to find a past date.",
};

export default function DateSubtractPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Date Subtract Calculator</h1>
        <p className="text-muted-foreground mt-1">Subtract time from a date to find a past date.</p>
      </div>
      <DateSubtractCalculator />
    </div>
  );
}
