"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/math"
import { Info, FastForward, CheckCircle2 } from "lucide-react"

export function LoanPrepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [loanRate, setLoanRate] = useState(8.5)
  const [loanYears, setLoanYears] = useState(15)
  const [extraMonthly, setExtraMonthly] = useState(5000)

  const { base, revised, saved } = useMemo(() => {
    const r = loanRate / 100 / 12;
    const n = loanYears * 12;

    // Base EMI Calculation
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const baseTotalInterest = (emi * n) - loanAmount;

    // Revised Calculation with Prepayment
    let balance = loanAmount;
    let monthsTaken = 0;
    let revisedTotalInterest = 0;
    const newPayment = emi + extraMonthly;

    for (let m = 1; m <= n; m++) {
      if (balance <= 0) break;
      
      const interestForMonth = balance * r;
      revisedTotalInterest += interestForMonth;
      
      const principalPaid = newPayment - interestForMonth;
      balance -= principalPaid;
      monthsTaken++;
    }

    return {
      base: {
        emi,
        months: n,
        interest: baseTotalInterest
      },
      revised: {
        payment: newPayment,
        months: monthsTaken,
        interest: revisedTotalInterest
      },
      saved: {
        months: n - monthsTaken,
        interest: baseTotalInterest - revisedTotalInterest
      }
    }
  }, [loanAmount, loanRate, loanYears, extraMonthly])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              <NumberInput
                label="LOAN AMOUNT"
                value={loanAmount}
                onChange={setLoanAmount}
                min={10000}
                max={50000000}
                step={10000}
                prefix="₹"
              />
              <NumberInput
                label="INTEREST RATE"
                value={loanRate}
                onChange={setLoanRate}
                min={1}
                max={24}
                step={0.1}
                suffix="%"
              />
              <NumberInput
                label="LOAN TENURE"
                value={loanYears}
                onChange={setLoanYears}
                min={1}
                max={30}
                step={1}
                suffix=" Yr"
              />
              <div className="pt-4 border-t border-border/50">
                <NumberInput
                  label="EXTRA MONTHLY PAYMENT"
                  value={extraMonthly}
                  onChange={setExtraMonthly}
                  min={0}
                  max={500000}
                  step={1000}
                  prefix="₹"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Amount you plan to pay every month in addition to your regular EMI.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          
          <Card className="border-none bg-brand-500/10">
            <CardContent className="p-6 flex items-center justify-between gap-4 overflow-hidden">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-muted-foreground mb-1">Total Savings</p>
                <AutoScaleValue
                  value={formatCurrency(saved.interest)}
                  className="text-brand-600 dark:text-brand-400"
                />
                <p className="text-sm mt-2 text-muted-foreground">
                  You will close your loan <span className="font-bold text-foreground">{Math.floor(saved.months / 12)} years and {saved.months % 12} months</span> earlier!
                </p>
              </div>
              <div className="p-4 rounded-full bg-brand-500/20 text-brand-600 shrink-0">
                <FastForward className="w-10 h-10" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 overflow-hidden">
                <h4 className="font-semibold text-muted-foreground mb-4">Original Loan</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <AutoScaleValue value={formatCurrency(base.emi)} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-lg font-medium truncate">{formatCurrency(base.interest)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time to debt-free</p>
                    <p className="text-lg font-medium">{loanYears} Years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 backdrop-blur-sm ring-1 ring-brand-500/30">
              <CardContent className="p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-500" />
                  <h4 className="font-semibold">With Prepayment</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-brand-600/70 dark:text-brand-400/70">New Monthly Outflow</p>
                    <AutoScaleValue value={formatCurrency(revised.payment)} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-600/70 dark:text-brand-400/70">Total Interest</p>
                    <p className="text-lg font-medium text-brand-600 dark:text-brand-400 truncate">{formatCurrency(revised.interest)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-600/70 dark:text-brand-400/70">Time to debt-free</p>
                    <p className="text-lg font-medium text-brand-600 dark:text-brand-400">
                      {Math.floor(revised.months / 12)} Years {revised.months % 12} Mos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Advisor Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/10 text-sm text-orange-900 dark:text-orange-300 border border-orange-500/20">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-orange-600 dark:text-orange-400" />
            <p>
              <strong>Advisor Note:</strong> By paying just {formatCurrency(extraMonthly)} extra every month, you wipe out a massive {formatCurrency(saved.interest)} in interest payments to the bank and become debt-free {Math.floor(saved.months / 12)} years earlier!
            </p>
          </div>

        </div>
      </div>

      {/* Dynamic Result Interpretation & Prepayment Strategy Guidance */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 via-card to-brand-50/30 dark:from-emerald-950/40 dark:via-card dark:to-brand-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Prepayment ROI & Debt-Free Acceleration
              </h3>
              <p className="text-xs text-muted-foreground">
                Analyzing the impact of +{formatCurrency(extraMonthly)}/month on your ₹{loanAmount.toLocaleString("en-IN")} loan.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>{((saved.interest / Math.max(1, base.interest)) * 100).toFixed(0)}% Total Interest Slashed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Guaranteed Money Saved</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatCurrency(saved.interest)}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">Direct interest avoided over the tenure.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Life Years Saved</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {Math.floor(saved.months / 12)} Yrs {saved.months % 12} Mos
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">Earlier completion of your debt obligation.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Effective Risk-Free Return</div>
              <div className="text-xl font-bold text-foreground mt-0.5">
                {loanRate}% p.a.
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">Equivalent to guaranteed tax-free return.</div>
            </div>
          </div>
        </div>

        {/* 4 Prepayment Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">⚡ 1. The Early Years Advantage</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              In the first 5 years of a home loan, up to <strong>70-80% of each EMI goes towards interest</strong>. Prepaying during this window reduces the base principal drastically and gives the highest return on investment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📜 2. Zero Prepayment Penalty (RBI Mandate)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              As per RBI regulations, banks and NBFCs <strong>cannot charge any prepayment penalty</strong> on floating-rate individual home loans. You can prepay any amount at any time without fees.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">💰 3. Annual Bonus / Lumpsum Prepayment</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If an extra monthly EMI is difficult, consider deploying annual tax refunds, Diwali bonuses, or incentive payouts (e.g. ₹50,000 to ₹100,000 once a year) directly into loan part-prepayment.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">⚖️ 4. Invest vs Prepay Decision</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your home loan rate is 8.5% and expected mutual fund return is 12-14%, investing surplus funds can generate higher wealth mathematically, while prepayment provides guaranteed peace of mind and debt freedom.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
