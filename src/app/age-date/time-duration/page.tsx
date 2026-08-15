import { Metadata } from "next";
import { TimeDurationCalculator } from "@/features/age-date/TimeDurationCalculator";

export const metadata: Metadata = {
  title: "Time Duration Calculator",
  description: "Calculate the duration between two times in hours, minutes, and seconds.",
};

export default function TimeDurationPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Time Duration Calculator</h1>
        <p className="text-muted-foreground mt-1">Calculate the time between two points.</p>
      </div>
      <TimeDurationCalculator />
    </div>
  );
}
