"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/math"
import { Info, Wallet, TrendingUp, PiggyBank, Target, ArrowDown } from "lucide-react"

export function InvestVsRepayCalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000) // ₹25 Lakhs
  const [loanRate, setLoanRate] = useState(8.5)
  const [remainingYears, setRemainingYears] = useState(15)
  
  const [monthlySurplus, setMonthlySurplus] = useState(10000) // Extra ₹10,000/mo
  const [investmentRate, setInvestmentRate] = useState(12) // 12% in Equity

  const { repay, invest, winner, difference, emi } = useMemo(() => {
    const rLoan = loanRate / 100 / 12;
    const nLoan = remainingYears * 12;
    const rInvest = investmentRate / 100 / 12;

    // Standard EMI
    const emi = (loanAmount * rLoan * Math.pow(1 + rLoan, nLoan)) / (Math.pow(1 + rLoan, nLoan) - 1);

    // Option 1: Invest Surplus (Pay standard EMI)
    let investTotalWealth = 0;
    // SIP of monthlySurplus for nLoan months
    investTotalWealth = monthlySurplus * ((Math.pow(1 + rInvest, nLoan) - 1) / rInvest) * (1 + rInvest);
    
    // Total interest paid in Option 1
    const totalInterestInvestOption = (emi * nLoan) - loanAmount;

    // Option 2: Repay Loan Faster (EMI + Surplus)
    let balance = loanAmount;
    let monthsTakenToRepay = 0;
    let totalInterestRepayOption = 0;
    const acceleratedPayment = emi + monthlySurplus;

    for (let m = 1; m <= nLoan; m++) {
      if (balance <= 0) break;
      
      const interest = balance * rLoan;
      totalInterestRepayOption += interest;
      
      const principalPaid = acceleratedPayment - interest;
      balance -= principalPaid;
      monthsTakenToRepay++;
    }

    // After loan is paid off, invest the FULL amount (emi + surplus) for the remaining months
    const remainingMonths = nLoan - monthsTakenToRepay;
    let repayTotalWealth = 0;
    if (remainingMonths > 0) {
      repayTotalWealth = acceleratedPayment * ((Math.pow(1 + rInvest, remainingMonths) - 1) / rInvest) * (1 + rInvest);
    }

    const diff = investTotalWealth - repayTotalWealth;
    const isInvestBetter = diff > 0;

    return {
      repay: {
        interestPaid: totalInterestRepayOption,
        finalWealth: repayTotalWealth,
        monthsSaved: nLoan - monthsTakenToRepay,
      },
      invest: {
        interestPaid: totalInterestInvestOption,
        finalWealth: investTotalWealth,
      },
      winner: isInvestBetter ? "Invest" : "Repay",
      difference: Math.abs(diff),
      emi: emi
    }
  }, [loanAmount, loanRate, remainingYears, monthlySurplus, investmentRate])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Loan Details</h3>
                <NumberInput
                  label="OUTSTANDING LOAN"
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
                  label="REMAINING TENURE"
                  value={remainingYears}
                  onChange={setRemainingYears}
                  min={1}
                  max={30}
                  step={1}
                  suffix=" Yr"
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-border/50">
                <h3 className="font-semibold text-sm text-muted-foreground">Surplus Details</h3>
                <NumberInput
                  label="EXTRA MONTHLY CASH"
                  value={monthlySurplus}
                  onChange={setMonthlySurplus}
                  min={1000}
                  max={500000}
                  step={1000}
                  prefix="₹"
                />
                <NumberInput
                  label="EXPECTED INVEST RETURN"
                  value={investmentRate}
                  onChange={setInvestmentRate}
                  min={1}
                  max={30}
                  step={0.5}
                  suffix="%"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          <Card className={`border-none ${winner === 'Invest' ? 'bg-indigo-500/10' : 'bg-purple-500/10'}`}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Clear Winner</p>
                <h3 className={`text-3xl font-bold ${winner === 'Invest' ? 'text-indigo-600 dark:text-indigo-400' : 'text-purple-600 dark:text-purple-400'}`}>
                  {winner === 'Invest' ? 'Invest the Surplus' : 'Prepay the Loan'}
                </h3>
                <p className="text-sm mt-2 text-muted-foreground">
                  Leaves you with <span className="font-bold text-foreground">{formatCurrency(difference)}</span> more net wealth at the end of {remainingYears} years.
                </p>
              </div>
              <div className={`p-4 rounded-full ${winner === 'Invest' ? 'bg-indigo-500/20 text-indigo-600' : 'bg-purple-500/20 text-purple-600'}`}>
                {winner === 'Invest' ? <TrendingUp className="w-10 h-10" /> : <ArrowDown className="w-10 h-10" />}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  <h4 className="font-semibold">If you Invest</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                    <p className="text-lg font-medium text-red-500">{formatCurrency(invest.interestPaid)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Wealth Created</p>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(invest.finalWealth)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowDown className="w-5 h-5 text-purple-500" />
                  <h4 className="font-semibold">If you Prepay</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Interest Paid</p>
                    <p className="text-lg font-medium text-red-500">{formatCurrency(repay.interestPaid)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Final Wealth Created</p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(repay.finalWealth)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Base EMI</div>
                <div className="font-bold">{formatCurrency(emi)}</div>
              </CardContent>
            </Card>
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Months Saved (Prepay)</div>
                <div className="font-bold text-indigo-500">{repay.monthsSaved} months</div>
              </CardContent>
            </Card>
          </div>

          {/* AI Advisor Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/10 text-sm text-orange-900 dark:text-orange-300 border border-orange-500/20">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-orange-600 dark:text-orange-400" />
            <div className="space-y-2">
              <p>
                <strong>Advisor Note:</strong> If your expected investment return ({investmentRate}%) is higher than your loan interest rate ({loanRate}%), math favors <strong>Investing</strong>. 
              </p>
              <p>
                However, prepaying a loan offers guaranteed, risk-free savings. Investing relies on market performance. If being debt-free gives you peace of mind, prepaying is emotionally superior.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
