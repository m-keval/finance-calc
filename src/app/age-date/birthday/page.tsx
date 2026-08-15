import { Metadata } from "next";
import { BirthdayCalculator } from "@/features/age-date/BirthdayCalculator";

export const metadata: Metadata = {
  title: "Birthday Calculator",
  description: "Find out what day of the week you were born and calculate future birthday dates.",
};

export default function BirthdayPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Birthday Calculator</h1>
        <p className="text-muted-foreground mt-1">Discover details about your birthday.</p>
      </div>
      <BirthdayCalculator />
    </div>
  );
}
