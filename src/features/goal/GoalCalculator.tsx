"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateGoalSIP, calculateGoalLumpsum, formatCurrency, generateSIPChartData, generateLumpsumChartData } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { Info, Sparkles, Target, Zap, Clock, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(10000000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)
  const [viewType, setViewType] = useState<"sip" | "lumpsum">("sip")

  const requiredSIP = useMemo(() => {
    return calculateGoalSIP(targetAmount, expectedReturn, years).requiredSIP
  }, [targetAmount, expectedReturn, years])

  const requiredLumpsum = useMemo(() => {
    return calculateGoalLumpsum(targetAmount, expectedReturn, years).requiredLumpsum
  }, [targetAmount, expectedReturn, years])

  const totalInvestedViaSIP = useMemo(() => {
    return requiredSIP * years * 12
  }, [requiredSIP, years])

  const chartData = useMemo(() => {
    return viewType === "sip"
      ? generateSIPChartData(requiredSIP, expectedReturn, years)
      : generateLumpsumChartData(requiredLumpsum, expectedReturn, years)
  }, [viewType, requiredSIP, requiredLumpsum, expectedReturn, years])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950">
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
              description={`Projecting growth to reach ₹${targetAmount.toLocaleString("en-IN")} via ${viewType === "sip" ? "Monthly SIP" : "One-time Lumpsum"} at ${expectedReturn}% p.a.`}
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

      {/* Dynamic Result Interpretation & Goal Guidance Section */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-violet-50 via-card to-brand-50/30 dark:from-violet-950/40 dark:via-card dark:to-brand-950/20 border border-violet-200 dark:border-violet-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-xs">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Goal Roadmap & Feasibility Insights
                </h3>
                <p className="text-xs text-muted-foreground">
                  Plan to accumulate ₹{targetAmount.toLocaleString("en-IN")} in {years} years.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-violet-700 dark:text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              <span>{((1 - totalInvestedViaSIP / targetAmount) * 100).toFixed(0)}% Funded By Returns</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Out-of-Pocket Cost (SIP)</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {formatCurrency(totalInvestedViaSIP)}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Your total cumulative capital deployed.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Free Compounding Boost</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatCurrency(Math.max(0, targetAmount - totalInvestedViaSIP))}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Interest earned on autopilot.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Daily Savings Needed</div>
              <div className="text-xl font-bold text-foreground mt-0.5">
                {formatCurrency(Math.round(requiredSIP / 30))}/day
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Target daily savings required.
              </div>
            </div>
          </div>
        </div>

        {/* 4 Strategic Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🎯 1. Accounting for Inflation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your goal is {years} years away, inflation (typically ~6% p.a.) will increase the future cost. A ₹{targetAmount.toLocaleString("en-IN")} goal today will require approximately <strong>{formatCurrency(Math.round(targetAmount * Math.pow(1.06, years)))}</strong> in {years} years.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📈 2. Step-Up Your Goal SIP</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If ₹{formatCurrency(requiredSIP)}/month is currently outside your budget, start with 30-40% lower amount and commit to increasing your SIP by 10% each year with your salary hike.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🛡️ 3. Asset Allocation By Horizon</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For goals &gt; 5 years, allocate 70-80% to equity mutual funds for growth. As you get within 2 years of your target date, systematically shift funds to liquid/debt instruments to lock in your gains.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">✅ 4. Goal Priority Tagging</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Categorize your goal as <em>Critical</em> (Child&apos;s Higher Education, Retirement) or <em>Flexible</em> (Vacation, Luxury Car) so you never compromise on essential milestones.
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
