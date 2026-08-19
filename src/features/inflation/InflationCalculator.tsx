"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { calculateInflation, generateInflationChartData, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { TrendingDown, Sparkles, ShieldCheck, Flame, Lightbulb, Clock } from "lucide-react"

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

  const erosionPercent = useMemo(() => {
    if (currentAmount <= 0) return "0"
    return (((currentAmount - results.purchasingPower) / currentAmount) * 100).toFixed(1)
  }, [currentAmount, results])

  const ruleOf72 = useMemo(() => {
    if (inflationRate <= 0) return "0"
    return (72 / inflationRate).toFixed(1)
  }, [inflationRate])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950">
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

          <div className="p-4 bg-muted/50 rounded-xl text-sm text-muted-foreground leading-relaxed">
            If an expense costs <strong>{formatCurrency(currentAmount)}</strong> today, you will need <strong>{formatCurrency(results.futureCost)}</strong> after {years} years at {inflationRate}% inflation to maintain the exact same lifestyle.
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
            { key: "futureCost", name: "Future Cost", color: "#f43f5e" },
          ]}
          valueFormatter={formatCurrency}
        />
      </div>

      {/* Dynamic Result Interpretation & Inflation Guidance Section */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-rose-50 via-card to-amber-50/30 dark:from-rose-950/40 dark:via-card dark:to-amber-950/20 border border-rose-200 dark:border-rose-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-xs">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Purchasing Power Analysis & Hedging Guidance
                </h3>
                <p className="text-xs text-muted-foreground">
                  Impact of {inflationRate}% annual inflation over {years} years on your hard-earned wealth.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-rose-600 dark:text-rose-400">
              <TrendingDown className="h-3.5 w-3.5" />
              <span>{erosionPercent}% Purchasing Power Lost</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Cost Doubling Time (Rule of 72)</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                Every {ruleOf72} Years
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Prices will double every {ruleOf72} years at {inflationRate}% rate.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Extra Money Needed</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                +{formatCurrency(results.futureCost - currentAmount)}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Additional cash required for the same item.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Required Return to Beat</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                &gt; {(inflationRate + 2.5).toFixed(1)}% p.a.
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Minimum investment CAGR required for real growth.
              </div>
            </div>
          </div>
        </div>

        {/* 4 Inflation Protection Strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📈 1. Equity: The Ultimate Inflation Hedge</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Companies raise prices as input costs rise, preserving profit margins. Historically, Indian broad equity indices (Nifty 50) have generated <strong>12-14% CAGR</strong>, comfortably beating 6% inflation by <strong>6-8% real returns</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">⚠️ 2. The Bank Savings Trap</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Keeping excessive cash in savings accounts (earning 3-3.5%) or low-yield instruments causes guaranteed wealth destruction due to the {inflationRate}% inflation rate.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🏡 3. Real Estate & Gold Allocation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Physical assets like residential/commercial property and sovereign gold bonds (SGBs) typically adjust upward with construction cost inflation and currency depreciation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🎯 4. Retirement Planning Adjustment</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always compute your retirement corpus using inflation-adjusted monthly expenses. If your family spends ₹50,000/month today, you will need ~<strong>{formatCurrency(Math.round(50000 * Math.pow(1.06, 20)))}/month</strong> in 20 years.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
