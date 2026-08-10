"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateGoalSIP, calculateGoalLumpsum, formatCurrency, generateSIPChartData, generateLumpsumChartData } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { Info } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(10000000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)
  const [viewType, setViewType] = useState<"sip" | "lumpsum">("sip")

  const requiredSIP = useMemo(() => {
    return calculateGoalSIP(targetAmount, expectedReturn, years).requiredSIP;
  }, [targetAmount, expectedReturn, years]);

  const requiredLumpsum = useMemo(() => {
    return calculateGoalLumpsum(targetAmount, expectedReturn, years).requiredLumpsum;
  }, [targetAmount, expectedReturn, years]);

  const chartData = useMemo(() => {
    return viewType === "sip"
      ? generateSIPChartData(requiredSIP, expectedReturn, years)
      : generateLumpsumChartData(requiredLumpsum, expectedReturn, years)
  }, [viewType, requiredSIP, requiredLumpsum, expectedReturn, years])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-indigo-100 dark:border-indigo-950">
          <div className="space-y-8">
            
            <NumberInput
              id="targetAmount"
              label="Target Amount"
              value={targetAmount}
              onChange={setTargetAmount}
              min={100000}
              max={100000000}
              step={100000}
              prefix="₹"
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
              label="Time to Goal"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard 
              title="Required Monthly SIP" 
              value={formatCurrency(requiredSIP)}
              variant={viewType === "sip" ? "highlight" : "default"}
            />
            <ResultCard 
              title="Required One-time Lumpsum" 
              value={formatCurrency(requiredLumpsum)}
              variant={viewType === "lumpsum" ? "highlight" : "default"}
            />
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
             <div className="mb-4">
               <h3 className="font-semibold text-lg mb-2">Visualize the Path</h3>
               <Tabs value={viewType} onValueChange={(v) => setViewType(v as "sip" | "lumpsum")} className="w-full">
                <TabsList className="grid w-full max-w-sm grid-cols-2">
                  <TabsTrigger value="sip">Via SIP</TabsTrigger>
                  <TabsTrigger value="lumpsum">Via Lumpsum</TabsTrigger>
                </TabsList>
              </Tabs>
             </div>
             
             <GrowthChart
                title="Goal Achievement Path"
                description={`Projecting growth to reach ₹${targetAmount.toLocaleString('en-IN')} via ${viewType === "sip" ? "Monthly SIP" : "One-time Lumpsum"} at ${expectedReturn}% p.a.`}
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
