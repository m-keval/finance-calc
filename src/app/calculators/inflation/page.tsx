import { Metadata } from "next";
import { InflationCalculator } from "@/features/inflation/InflationCalculator";

export const metadata: Metadata = {
  title: "Inflation Calculator",
  description: "Calculate how inflation affects your purchasing power and the future cost of goods and services.",
};

export default function InflationPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Inflation Calculator</h1>
        <p className="text-muted-foreground max-w-3xl text-lg">
          Understand how inflation erodes purchasing power over time. Calculate the future cost of your current expenses and plan your savings accordingly.
        </p>
      </div>

      <InflationCalculator />

      <div className="mt-16 space-y-8 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-semibold">What is Inflation?</h2>
          <p>
            Inflation is the rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling.
            When prices rise, each unit of currency buys fewer goods and services.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">How is Future Cost calculated?</h2>
          <p>
            The inflation calculator uses the compound interest formula to calculate the future cost of current expenses.
          </p>
          <div className="bg-muted p-4 rounded-md font-mono text-sm inline-block">
            Future Cost = Current Amount × (1 + Inflation Rate)^Years
          </div>
        </section>
      </div>
    </div>
  );
}
