import { Metadata } from "next";
import { AgeCalculator } from "@/features/age-date/AgeCalculator";

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Calculate your exact age in years, months, and days. Find out your zodiac sign and next birthday countdown.",
};

export default function AgePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Age Calculator</h1>
        <p className="text-muted-foreground mt-1">Calculate your exact age from your date of birth.</p>
      </div>
      <AgeCalculator />
    </div>
  );
}
