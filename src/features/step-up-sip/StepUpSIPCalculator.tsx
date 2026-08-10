"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateStepUpSIP, generateStepUpSIPChartData, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

export function StepUpSIPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)
  const [stepUpPercentage, setStepUpPercentage] = useState(10)

  const results = useMemo(() => {
    return calculateStepUpSIP(initialInvestment, expectedReturn, years, stepUpPercentage)
  }, [initialInvestment, expectedReturn, years, stepUpPercentage])

  const chartData = useMemo(() => {
    return generateStepUpSIPChartData(initialInvestment, expectedReturn, years, stepUpPercentage)
  }, [initialInvestment, expectedReturn, years, stepUpPercentage])

  const pieData = [
    { name: "Invested Amount", value: results.totalInvestment, color: "#3b82f6" },
    { name: "Est. Returns", value: results.estReturns, color: "#f59e0b" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-indigo-100 dark:border-indigo-950">
          <div className="space-y-8">
            
            <NumberInput
              id="initialInvestment"
              label="Starting Monthly SIP"
              value={initialInvestment}
              onChange={setInitialInvestment}
              min={500}
              max={1000000}
              step={500}
              prefix="₹"
            />
            
            <NumberInput
              id="stepUpPercentage"
              label="Annual Step-Up"
              value={stepUpPercentage}
              onChange={setStepUpPercentage}
              min={1}
              max={50}
              step={1}
              suffix="%"
            />
            
            <NumberInput
              id="expectedReturn"
              label="Expected Return rate (p.a)"
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={1}
              max={30}
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
          description={`Projected growth of SIP starting at ₹${initialInvestment.toLocaleString('en-IN')}/mo with a ${stepUpPercentage}% annual step-up for ${years} years at ${expectedReturn}% p.a.`}
          data={chartData}
          xAxisKey="year"
          areas={[
            { key: "invested", name: "Invested Amount", color: "#3b82f6" },
            { key: "totalValue", name: "Total Value", color: "#10b981" },
          ]}
          valueFormatter={formatCurrency}
        />
      </div>

      {/* SEBI Compliance Disclaimer */}
      <div className="mt-8 flex gap-3 items-start bg-muted/40 text-muted-foreground p-4 rounded-xl border text-sm">
        <Info className="w-5 h-5 shrink-0 text-indigo-600 dark:text-indigo-500 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">Important Note on Projections (AMFI / SEBI Guidelines)</p>
          <p>This calculator is for illustration purposes only and does not represent actual returns. Mutual fund investments are subject to market risks, and the stock market does not offer fixed returns. In accordance with AMFI guidelines, the expected rate of return in this calculator is capped at 13% p.a. based on historical rolling returns, and it should not be construed as a promise, guarantee, or forecast of future returns.</p>
        </div>
      </div>
    </div>
  )
}
