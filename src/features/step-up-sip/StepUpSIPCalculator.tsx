"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateStepUpSIP, generateStepUpSIPChartData, calculateSIP, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import {
  Info,
  Sparkles,
  TrendingUp,
  Zap,
  Clock,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
} from "lucide-react"

export function StepUpSIPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)
  const [stepUpPercentage, setStepUpPercentage] = useState(10)

  const results = useMemo(() => {
    return calculateStepUpSIP(initialInvestment, expectedReturn, years, stepUpPercentage)
  }, [initialInvestment, expectedReturn, years, stepUpPercentage])

  const regularSIPResults = useMemo(() => {
    return calculateSIP(initialInvestment, expectedReturn, years)
  }, [initialInvestment, expectedReturn, years])

  const extraWealth = useMemo(() => {
    return Math.max(0, results.totalValue - regularSIPResults.totalValue)
  }, [results, regularSIPResults])

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
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950">
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
          description={`Projected growth of SIP starting at ₹${initialInvestment.toLocaleString("en-IN")}/mo with a ${stepUpPercentage}% annual step-up for ${years} years at ${expectedReturn}% p.a.`}
          data={chartData}
          xAxisKey="year"
          areas={[
            { key: "invested", name: "Invested Amount", color: "#3b82f6" },
            { key: "totalValue", name: "Total Value", color: "#10b981" },
          ]}
          valueFormatter={formatCurrency}
        />
      </div>

      {/* Dynamic Result Interpretation & Step-Up SIP Guidance Section */}
      <div className="mt-10 space-y-6">
        {/* Dynamic Highlight Banner */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 via-card to-emerald-50/40 dark:from-blue-950/40 dark:via-card dark:to-emerald-950/20 border border-blue-200 dark:border-blue-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Step-Up SIP Analysis & Strategy
                </h3>
                <p className="text-xs text-muted-foreground">
                  Evaluating the compounding power of increasing your SIP by {stepUpPercentage}% annually.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              <span>+{formatCurrency(extraWealth)} Extra Wealth Created</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Final Monthly SIP</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {formatCurrency(Math.round(initialInvestment * Math.pow(1 + stepUpPercentage / 100, years - 1)))}/mo
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Your monthly installment in Year {years}.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Step-Up Advantage</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                +{((extraWealth / Math.max(1, regularSIPResults.totalValue)) * 100).toFixed(0)}% Higher
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Compared to a static ₹{initialInvestment.toLocaleString("en-IN")} SIP.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Wealth Multiplier</div>
              <div className="text-xl font-bold text-foreground mt-0.5">
                {(results.totalValue / Math.max(1, results.totalInvestment)).toFixed(2)}x
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Total return on every rupee invested.
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Guidance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Why Step-Up Beats Fixed SIP</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              As your career progresses, your income and savings capacity increase. A fixed SIP becomes a smaller percentage of your income over time. Increasing your SIP by <strong>{stepUpPercentage}% annually</strong> automatically scales your wealth creation with your lifestyle.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Lightbulb className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Automating Your Top-Up</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Most mutual fund platforms (CAMS, KFintech, Zerodha, Groww) allow you to activate <strong>Top-Up SIP / Step-Up mandate</strong> automatically. You can choose a fixed percentage (e.g. 10%) or a fixed rupee addition (e.g. +₹1,000/yr).
            </p>
          </div>
        </div>
      </div>

      {/* SEBI Compliance Disclaimer */}
      <div className="mt-8 flex gap-3 items-start bg-muted/40 text-muted-foreground p-4 rounded-xl border text-sm">
        <Info className="w-5 h-5 shrink-0 text-brand-600 dark:text-brand-500 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-foreground">Important Note on Projections (AMFI / SEBI Guidelines)</p>
          <p>
            This calculator is for illustration purposes only and does not represent actual returns. Mutual fund investments are subject to market risks, and the stock market does not offer fixed returns. In accordance with AMFI guidelines, the expected rate of return in this calculator is capped at 13% p.a. based on historical rolling returns, and it should not be construed as a promise, guarantee, or forecast of future returns.
          </p>
        </div>
      </div>
    </div>
  )
}
