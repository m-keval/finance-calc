import { Metadata } from "next";
import { WeeksBetweenCalculator } from "@/features/age-date/WeeksBetweenCalculator";

export const metadata: Metadata = {
  title: "Weeks Between Dates Calculator",
  description: "Calculate the number of weeks and remaining days between two dates.",
};

export default function WeeksBetweenPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weeks Between Dates Calculator</h1>
        <p className="text-muted-foreground mt-1">Count weeks between two dates.</p>
      </div>
      <WeeksBetweenCalculator />
    </div>
  );
}
