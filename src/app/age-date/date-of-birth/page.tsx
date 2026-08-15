import { Metadata } from "next";
import { DateOfBirthCalculator } from "@/features/age-date/DateOfBirthCalculator";

export const metadata: Metadata = {
  title: "Date of Birth Calculator",
  description: "Calculate your date of birth based on your current age.",
};

export default function DateOfBirthPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Date of Birth Calculator</h1>
        <p className="text-muted-foreground mt-1">Find your birth date from your age.</p>
      </div>
      <DateOfBirthCalculator />
    </div>
  );
}
