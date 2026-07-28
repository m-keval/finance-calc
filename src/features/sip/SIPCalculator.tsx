"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateSIP, generateSIPChartData, formatCurrency } from "@/lib/math"
import { Card, CardContent } from "@/components/ui/card"

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)

  const results = useMemo(() => {
    return calculateSIP(monthlyInvestment, expectedReturn, years)
  }, [monthlyInvestment, expectedReturn, years])

  const chartData = useMemo(() => {
    return generateSIPChartData(monthlyInvestment, expectedReturn, years)
  }, [monthlyInvestment, expectedReturn, years])

  const pieData = [
    { name: "Invested Amount", value: results.totalInvestment, color: "#3b82f6" },
    { name: "Est. Returns", value: results.estReturns, color: "#f59e0b" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 shadow-sm border-emerald-100 dark:border-emerald-950">
          <div className="space-y-8">
            <NumberInput
              id="monthlyInvestment"
              label="Monthly Investment"
              value={monthlyInvestment}
              onChange={setMonthlyInvestment}
              min={500}
              max={1000000}
              step={500}
              prefix="₹"
            />
            
            <NumberInput
              id="expectedReturn"
              label="Expected Return rate (p.a)"
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={1}
              max={100}
              step={0.5}
              suffix="%"
            />
            
            <NumberInput
              id="years"
              label="Time period"
              value={years}
              onChange={setYears}
              min={1}
              max={40}
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
              value={formatCurrency(results.totalInvestment)}
              variant="principal"
            />
            <ResultCard 
              title="Est. Returns" 
              value={formatCurrency(results.estReturns)}
              variant="returns"
            />
            <ResultCard 
              title="Total Value" 
              value={formatCurrency(results.totalValue)}
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
          description={`Projected growth of ₹${monthlyInvestment.toLocaleString('en-IN')} invested monthly for ${years} years at ${expectedReturn}% p.a.`}
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
