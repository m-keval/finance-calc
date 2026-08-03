import { GoalCalculator } from "@/features/goal/GoalCalculator";

export const metadata = {
  title: "Goal Planning Calculator - Finance Calculator",
  description: "Calculate how much you need to invest monthly or as a lump sum to reach your financial goals.",
};

export default function GoalPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Goal Planning Calculator</h1>
        <p className="text-muted-foreground text-lg">
          Work backwards from your target amount to find out exactly how much you need to invest today to reach your financial goals.
        </p>
      </div>
      
      <GoalCalculator />
    </div>
  );
}
