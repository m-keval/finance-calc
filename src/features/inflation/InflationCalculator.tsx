"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { calculateInflation, generateInflationChartData, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"

export function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState(100000)
  const [inflationRate, setInflationRate] = useState(6)
  const [years, setYears] = useState(10)

  const results = useMemo(() => {
    return calculateInflation(currentAmount, inflationRate, years)
  }, [currentAmount, inflationRate, years])

  const chartData = useMemo(() => {
    return generateInflationChartData(currentAmount, inflationRate, years)
  }, [currentAmount, inflationRate, years])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-emerald-100 dark:border-emerald-950">
          <div className="space-y-8">
            <NumberInput
              id="currentAmount"
              label="Current Amount / Expense"
              value={currentAmount}
              onChange={setCurrentAmount}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
            />
            
            <NumberInput
              id="inflationRate"
              label="Expected Inflation Rate"
              value={inflationRate}
              onChange={setInflationRate}
              min={1}
              max={100}
              step={0.1}
              suffix="%"
            />
            
            <NumberInput
              id="years"
              label="Years from now"
              value={years}
              onChange={setYears}
              min={1}
              max={50}
              step={1}
              suffix="Yr"
            />
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard 
              title="Future Cost" 
              subValue="What it will cost in the future"
              value={formatCurrency(results.futureCost)} 
              highlight
            />
            <ResultCard 
              title="Purchasing Power" 
              subValue="Value of today's money in the future"
              value={formatCurrency(results.purchasingPower)} 
            />
          </div>
          
          <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground leading-relaxed mt-4">
            If an item costs <strong>{formatCurrency(currentAmount)}</strong> today, it will cost <strong>{formatCurrency(results.futureCost)}</strong> after {years} years assuming an inflation rate of {inflationRate}%. 
            Alternatively, <strong>{formatCurrency(currentAmount)}</strong> saved today will only have the purchasing power of <strong>{formatCurrency(results.purchasingPower)}</strong> after {years} years.
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="mt-8">
        <GrowthChart
          title="Inflation Impact Over Time"
          description={`Comparison of current value vs future cost due to ${inflationRate}% inflation.`}
          data={chartData}
          xAxisKey="year"
          areas={[
            { key: "currentValue", name: "Current Value", color: "#64748b" },
            { key: "futureCost", name: "Future Cost", color: "#f43f5e" }, // rose-500
          ]}
          valueFormatter={formatCurrency}
        />
      </div>
    </div>
  )
}
