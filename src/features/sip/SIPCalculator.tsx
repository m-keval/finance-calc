"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { DistributionChart } from "@/components/charts/DistributionChart"
import {
  calculateSIP,
  generateSIPChartData,
  calculateLumpsum,
  generateLumpsumChartData,
  calculateStepUpSIP,
  formatCurrency,
} from "@/lib/math"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Info,
  TrendingUp,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  PiggyBank,
} from "lucide-react"

export function SIPCalculator() {
  const [investmentType, setInvestmentType] = useState<"monthly" | "lumpsum">("monthly")
  const [investment, setInvestment] = useState(10000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)

  // When switching types, adjust default amount if it's too small for lumpsum or too big for monthly
  const handleTypeChange = (value: string) => {
    const type = value as "monthly" | "lumpsum"
    setInvestmentType(type)
    if (type === "lumpsum" && investment < 50000) {
      setInvestment(100000)
    } else if (type === "monthly" && investment > 100000) {
      setInvestment(10000)
    }
  }

  const results = useMemo(() => {
    return investmentType === "monthly"
      ? calculateSIP(investment, expectedReturn, years)
      : calculateLumpsum(investment, expectedReturn, years)
  }, [investmentType, investment, expectedReturn, years])

  const chartData = useMemo(() => {
    return investmentType === "monthly"
      ? generateSIPChartData(investment, expectedReturn, years)
      : generateLumpsumChartData(investment, expectedReturn, years)
  }, [investmentType, investment, expectedReturn, years])

  // Comparative projections for dynamic guidance
  const stepUpResult = useMemo(() => {
    return calculateStepUpSIP(investment, expectedReturn, years, 10)
  }, [investment, expectedReturn, years])

  const fiveMoreYearsResult = useMemo(() => {
    return investmentType === "monthly"
      ? calculateSIP(investment, expectedReturn, years + 5)
      : calculateLumpsum(investment, expectedReturn, years + 5)
  }, [investmentType, investment, expectedReturn, years])

  const wealthMultiplier = useMemo(() => {
    if (results.totalInvestment <= 0) return "1.00"
    return (results.totalValue / results.totalInvestment).toFixed(2)
  }, [results])

  const returnsSharePercentage = useMemo(() => {
    if (results.totalValue <= 0) return "0"
    return ((results.estReturns / results.totalValue) * 100).toFixed(1)
  }, [results])

  const pieData = [
    { name: "Invested Amount", value: results.totalInvestment, color: "#3b82f6" },
    { name: "Est. Returns", value: results.estReturns, color: "#f59e0b" },
  ]

  // Suggested fund types based on duration
  const fundRecommendation = useMemo(() => {
    if (years < 3) return "Low Duration / Arbitrage / Short-Term Debt Funds (Capital Protection)"
    if (years <= 5) return "Balanced Advantage / Aggressive Hybrid / Large Cap Index Funds"
    if (years <= 10) return "Flexi Cap / Large & Mid Cap / Nifty 50 & Next 50 Index Funds"
    return "Mid Cap, Small Cap & Broad Market Flexi Cap Funds (High Compounding Potential)"
  }, [years])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950">
          <div className="space-y-8">
            <Tabs value={investmentType} onValueChange={handleTypeChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly SIP</TabsTrigger>
                <TabsTrigger value="lumpsum">One-time (Lumpsum)</TabsTrigger>
              </TabsList>
            </Tabs>

            <NumberInput
              id="investment"
              label={investmentType === "monthly" ? "Monthly Investment" : "Total Investment"}
              value={investment}
              onChange={setInvestment}
              min={investmentType === "monthly" ? 500 : 5000}
              max={investmentType === "monthly" ? 1000000 : 10000000}
              step={investmentType === "monthly" ? 500 : 5000}
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
          description={`Projected growth of ₹${investment.toLocaleString("en-IN")} invested ${investmentType === "monthly" ? "monthly " : ""}for ${years} years at ${expectedReturn}% p.a.`}
          data={chartData}
          xAxisKey="year"
          areas={[
            { key: "invested", name: "Invested Amount", color: "#3b82f6" },
            { key: "totalValue", name: "Total Value", color: "#10b981" },
          ]}
          valueFormatter={formatCurrency}
        />
      </div>

      {/* Dynamic Result Interpretation & SIP Guidance Section */}
      <div className="mt-10 space-y-6">
        {/* Dynamic Highlight Banner */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/40 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Result Analysis & Financial Guidance
                </h3>
                <p className="text-xs text-muted-foreground">
                  Customized insights based on your ₹{investment.toLocaleString("en-IN")}{" "}
                  {investmentType === "monthly" ? "/month" : "lumpsum"} plan over {years} years.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-700 dark:text-brand-300">
              <TrendingUp className="h-3.5 w-3.5 text-brand-600" />
              <span>{wealthMultiplier}x Wealth Multiplier</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Compounding Ratio</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {returnsSharePercentage}% Returns
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                More than half your final corpus is pure compounding gains.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Average Monthly Growth</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {formatCurrency(Math.round(results.estReturns / (years * 12)))}/mo
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Effective compounding gain generated per month.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Recommended Horizon</div>
              <div className="text-xl font-bold text-foreground mt-0.5">{years} Years</div>
              <div className="text-[11px] text-muted-foreground mt-1">
                {years >= 7 ? "Optimal for high equity exposure" : "Consider balanced or index funds"}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Actionable Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Step-Up SIP Advantage */}
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-brand-300 dark:hover:border-brand-800 transition-colors">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <Zap className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Step-Up SIP Accelerator</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If you increase your monthly investment by just <strong>10% every year</strong> (matching your annual salary increments), your projected wealth will reach:
            </p>
            <div className="my-3 p-3 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground block">With 10% Annual Step-Up</span>
                <span className="text-base font-extrabold text-brand-600 dark:text-brand-400">
                  {formatCurrency(stepUpResult.totalValue)}
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                +{formatCurrency(stepUpResult.totalValue - results.totalValue)} Extra
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Step-up SIPs significantly outpace inflation without straining your current monthly budget.
            </p>
          </div>

          {/* Card 2: The 5-Year Horizon Boost */}
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-brand-300 dark:hover:border-brand-800 transition-colors">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Clock className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">The Power of Staying 5 More Years</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Because compounding is exponential, the final years generate the highest monetary returns. If you continue for <strong>{years + 5} years</strong>:
            </p>
            <div className="my-3 p-3 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground block">Corpus at {years + 5} Years</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(fiveMoreYearsResult.totalValue)}
                </span>
              </div>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-100 dark:bg-brand-950/60 px-2.5 py-1 rounded-md">
                +{(fiveMoreYearsResult.totalValue / Math.max(1, results.totalValue)).toFixed(1)}x Growth
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Staying invested transforms modest monthly savings into generational wealth.
            </p>
          </div>

          {/* Card 3: Asset Allocation for your Horizon */}
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-brand-300 dark:hover:border-brand-800 transition-colors">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Recommended Fund Allocation</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
              For your <strong>{years}-year time frame</strong>, financial advisors suggest:
            </p>
            <div className="p-3 rounded-xl bg-muted/50 border border-border/60 text-xs font-semibold text-foreground">
              {fundRecommendation}
            </div>
            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Diversify across 2–3 complementary fund categories rather than 10+ funds.</span>
            </div>
          </div>

          {/* Card 4: Tax Smartness & Rupee Cost Averaging */}
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-brand-300 dark:hover:border-brand-800 transition-colors">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                <Lightbulb className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Tax Rules & Volatility Strategy</h4>
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground">1. Capital Gains Tax:</span>
                <span>
                  Equity LTCG is tax-free up to <strong>₹1.25 Lakh/year</strong>; gains beyond that are taxed at <strong>12.5%</strong> (Budget 2024).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-foreground">2. Market Dips:</span>
                <span>
                  Never stop your SIP during market corrections. Lower NAVs buy more units, accelerating returns when markets recover.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actionable Best Practices Checklist */}
        <div className="p-5 rounded-2xl bg-muted/30 border border-border/70">
          <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 4 Golden Rules for Successful SIP Investing
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[10px]">
                1
              </span>
              <span><strong>Set auto-debit on salary day:</strong> Invest before spending rather than investing whatever remains at month-end.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[10px]">
                2
              </span>
              <span><strong>Maintain an Emergency Fund:</strong> Keep 6 months of living expenses in liquid funds so you never break your SIP prematurely.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[10px]">
                3
              </span>
              <span><strong>Ignore Short-term Noise:</strong> Rolling returns over 7+ years in Indian equity markets have historically never been negative.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-[10px]">
                4
              </span>
              <span><strong>Review annually, not daily:</strong> Avoid changing funds frequently. Rebalance asset allocation once a year.</span>
            </div>
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
