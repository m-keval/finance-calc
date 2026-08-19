"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { GrowthChart } from "@/components/charts/GrowthChart"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateFD, generateFDChartData, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { PiggyBank, Sparkles, ShieldCheck, AlertCircle, Percent, Lightbulb } from "lucide-react"

export function FDCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [expectedReturn, setExpectedReturn] = useState(6.5)
  const [years, setYears] = useState(5)

  const results = useMemo(() => {
    return calculateFD(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  const seniorResults = useMemo(() => {
    return calculateFD(principal, expectedReturn + 0.50, years)
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
          description={`Projected growth of ₹${principal.toLocaleString("en-IN")} invested for ${years} years at ${expectedReturn}% p.a.`}
          data={chartData}
          xAxisKey="year"
          areas={[
            { key: "invested", name: "Invested Amount", color: "#3b82f6" },
            { key: "totalValue", name: "Total Value", color: "#10b981" },
          ]}
          valueFormatter={formatCurrency}
        />
      </div>

      {/* Dynamic Result Interpretation & FD Guidance Section */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-50 via-card to-brand-50/30 dark:from-amber-950/40 dark:via-card dark:to-brand-950/20 border border-amber-200 dark:border-amber-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
                <PiggyBank className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Fixed Deposit Insights & Tax Guidance
                </h3>
                <p className="text-xs text-muted-foreground">
                  Guaranteed returns breakdown for ₹{principal.toLocaleString("en-IN")} at {expectedReturn}% for {years} years.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-amber-700 dark:text-amber-300">
              <Percent className="h-3.5 w-3.5 text-amber-600" />
              <span>+{((results.interestEarned / results.principal) * 100).toFixed(1)}% Absolute Return</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Senior Citizen Rate (+0.5%)</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatCurrency(seniorResults.maturityAmount)}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                +{formatCurrency(seniorResults.interestEarned - results.interestEarned)} additional gain.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Average Annual Return</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {formatCurrency(Math.round(results.interestEarned / years))}/yr
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Effective interest per year.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Real Return (Post-Inflation)</div>
              <div className="text-xl font-bold text-foreground mt-0.5">
                ~{(expectedReturn - 5.5).toFixed(1)}% p.a.
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Assuming historical 5.5% inflation.
              </div>
            </div>
          </div>
        </div>

        {/* 4 FD Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🏛️ 1. TDS & Taxation Rules</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              FD interest is fully taxable at your applicable income tax slab rate. Banks deduct <strong>10% TDS</strong> if interest income exceeds <strong>₹40,000/year</strong> (₹50,000 for senior citizens). Submit Form 15G / 15H if your total income is below the taxable threshold.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🛡️ 2. DICGC Insurance Cover</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Under RBI guidelines, all deposits (principal + interest) up to <strong>₹5,000,000 (₹5 Lakhs)</strong> per bank are 100% insured and protected by DICGC.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🪜 3. FD Laddering Strategy</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Instead of locking the entire amount in a single long-term FD, split it across 1, 2, 3, and 5-year maturities. This provides regular liquidity and protects you from reinvestment rate fluctuations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📋 4. Tax-Saver FD (Section 80C)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              5-Year Tax Saver FDs allow tax deductions up to ₹1.5 Lakh under Section 80C (Old Regime), but have a mandatory 5-year lock-in with no premature withdrawal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
