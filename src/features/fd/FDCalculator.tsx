"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateFD, generateFDChartData, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"

export function FDCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [expectedReturn, setExpectedReturn] = useState(6.5)
  const [years, setYears] = useState(5)

  const results = useMemo(() => {
    return calculateFD(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  const chartData = useMemo(() => {
    return generateFDChartData(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  const pieData = [
    { name: "Principal Amount", value: results.principal, color: "#3b82f6" },
    { name: "Interest Earned", value: results.interestEarned, color: "#f59e0b" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950">
          <div className="space-y-8">
            <NumberInput
              id="principal"
              label="Total Investment"
              value={principal}
              onChange={setPrincipal}
              min={1000}
              max={20000000}
              step={1000}
              prefix="₹"
            />
            
            <NumberInput
              id="expectedReturn"
              label="Rate of Interest (p.a)"
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={1}
              max={100}
              step={0.1}
              suffix="%"
            />
            
            <NumberInput
              id="years"
              label="Time period"
              value={years}
              onChange={setYears}
              min={1}
              max={10}
              step={1}
              suffix="Yr"
            />
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard 
              title="Invested Amount" 
              value={formatCurrency(results.principal)}
              variant="principal"
            />
            <ResultCard 
              title="Interest Earned" 
              value={formatCurrency(results.interestEarned)}
              variant="interest"
            />
            <ResultCard 
              title="Total Value" 
              value={formatCurrency(results.maturityAmount)} 
              variant="highlight"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <DistributionChart 
               title="Investment Breakdown" 
               data={pieData}
               valueFormatter={formatCurrency}
             />
          </div>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="mt-8">
        <GrowthChart
          title="Wealth Growth Projection"
          description={`Projected growth of ₹${principal.toLocaleString('en-IN')} invested for ${years} years at ${expectedReturn}% p.a.`}
          data={chartData}
          xAxisKey="year"
          areas={[
            { key: "invested", name: "Invested Amount", color: "#3b82f6" },
            { key: "totalValue", name: "Total Value", color: "#10b981" },
          ]}
          valueFormatter={formatCurrency}
        />
      </div>
    </div>
  )
}
