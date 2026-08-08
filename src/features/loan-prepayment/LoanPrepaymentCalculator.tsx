"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
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
          
          <Card className="border-none bg-indigo-500/10">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Savings</p>
                <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(saved.interest)}
                </h3>
                <p className="text-sm mt-2 text-muted-foreground">
                  You will close your loan <span className="font-bold text-foreground">{Math.floor(saved.months / 12)} years and {saved.months % 12} months</span> earlier!
                </p>
              </div>
              <div className="p-4 rounded-full bg-indigo-500/20 text-indigo-600">
                <FastForward className="w-10 h-10" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-muted-foreground mb-4">Original Loan</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-xl font-bold">{formatCurrency(base.emi)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interest</p>
                    <p className="text-lg font-medium">{formatCurrency(base.interest)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time to debt-free</p>
                    <p className="text-lg font-medium">{loanYears} Years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 backdrop-blur-sm ring-1 ring-indigo-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  <h4 className="font-semibold">With Prepayment</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">New Monthly Outflow</p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(revised.payment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">Total Interest</p>
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{formatCurrency(revised.interest)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">Time to debt-free</p>
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
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
              <strong>Advisor Note:</strong> By paying just {formatCurrency(extraMonthly)} extra every month, you wipe out a massive {formatCurrency(saved.interest)} in interest payments to the bank. This strategy is extremely effective in the first few years of a long-term loan when the interest component of your EMI is highest.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
