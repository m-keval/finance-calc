import { Metadata } from "next";
import { BirthdayCountdown } from "@/features/age-date/BirthdayCountdown";

export const metadata: Metadata = {
  title: "Birthday Countdown",
  description: "Count down the days, hours, and minutes until your next birthday.",
};

export default function BirthdayCountdownPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Birthday Countdown</h1>
        <p className="text-muted-foreground mt-1">See how long until your next birthday.</p>
      </div>
      <BirthdayCountdown />
    </div>
  );
}
