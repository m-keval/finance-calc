"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/math"
import { Info, ArrowRightLeft, TrendingUp, PiggyBank, Target, Clock } from "lucide-react"

export function LumpsumVsSipCalculator() {
  const [amount, setAmount] = useState(1200000) // ₹12 Lakhs
  const [sipDurationMonths, setSipDurationMonths] = useState(12) // Spread over 12 months
  const [totalYears, setTotalYears] = useState(10)
  const [equityRate, setEquityRate] = useState(12) // 12% in Equity
  const [debtRate, setDebtRate] = useState(5) // 5% in Savings/Debt while waiting

  const { lumpsum, sip, winner, difference } = useMemo(() => {
    const eqRate = equityRate / 100 / 12
    const dbRate = debtRate / 100 / 12
    const totalMonths = totalYears * 12

    // 1. Lumpsum Calculation
    const lumpsumFinal = amount * Math.pow(1 + equityRate / 100, totalYears)

    // 2. SIP (STP style) Calculation
    let debtBal = amount
    let eqBal = 0
    const monthlyTransfer = amount / sipDurationMonths

    for (let m = 1; m <= totalMonths; m++) {
      if (m <= sipDurationMonths) {
        // Accrue interest before transfer (or after, standard is usually beginning/end, let's do simple end of month)
        debtBal = debtBal * (1 + dbRate)
        eqBal = eqBal * (1 + eqRate)
        
        // Transfer
        debtBal -= monthlyTransfer
        eqBal += monthlyTransfer
      } else {
        // Just accrue interest
        debtBal = debtBal * (1 + dbRate)
        eqBal = eqBal * (1 + eqRate)
      }
    }
    
    // Safety check for floating point issues causing small negative debt
    if (debtBal < 0) debtBal = 0;

    const sipFinal = eqBal + debtBal

    const diff = lumpsumFinal - sipFinal

    return {
      lumpsum: {
        finalValue: lumpsumFinal,
        gain: lumpsumFinal - amount
      },
      sip: {
        finalValue: sipFinal,
        gain: sipFinal - amount
      },
      winner: diff > 0 ? "Lumpsum" : "SIP",
      difference: Math.abs(diff)
    }
  }, [amount, sipDurationMonths, totalYears, equityRate, debtRate])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              <NumberInput
                label="TOTAL AMOUNT TO INVEST"
                value={amount}
                onChange={setAmount}
                min={10000}
                max={50000000}
                step={10000}
                prefix="₹"
              />
              
              <NumberInput
                label="SPREAD SIP OVER (MONTHS)"
                value={sipDurationMonths}
                onChange={setSipDurationMonths}
                min={1}
                max={60}
                step={1}
                suffix=" Mo"
              />
              
              <NumberInput
                label="TOTAL INVESTMENT HORIZON"
                value={totalYears}
                onChange={setTotalYears}
                min={1}
                max={50}
                step={1}
                suffix=" Yr"
              />

              <NumberInput
                label="EXPECTED EQUITY RETURN"
                value={equityRate}
                onChange={setEquityRate}
                min={1}
                max={30}
                step={0.5}
                suffix="%"
              />

              <NumberInput
                label="DEBT RETURN (WHILE IN SAVINGS)"
                value={debtRate}
                onChange={setDebtRate}
                min={0}
                max={15}
                step={0.1}
                suffix="%"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          <Card className={`border-none ${winner === 'Lumpsum' ? 'bg-indigo-500/10' : 'bg-indigo-500/10'}`}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Clear Winner</p>
                <h3 className={`text-3xl font-bold ${winner === 'Lumpsum' ? 'text-indigo-600 dark:text-indigo-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                  {winner === 'Lumpsum' ? 'Lumpsum Investment' : 'SIP (Staggered)'}
                </h3>
                <p className="text-sm mt-2 text-muted-foreground">
                  In a steadily rising market, {winner} generates <span className="font-bold text-foreground">{formatCurrency(difference)}</span> more wealth.
                </p>
              </div>
              <div className={`p-4 rounded-full ${winner === 'Lumpsum' ? 'bg-indigo-500/20 text-indigo-600' : 'bg-indigo-500/20 text-indigo-600'}`}>
                {winner === 'Lumpsum' ? <Target className="w-10 h-10" /> : <Clock className="w-10 h-10" />}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-indigo-500" />
                  <h4 className="font-semibold">Lumpsum Performance</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-xl font-bold">{formatCurrency(lumpsum.finalValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gain</p>
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{formatCurrency(lumpsum.gain)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  <h4 className="font-semibold">SIP Performance</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-xl font-bold">{formatCurrency(sip.finalValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gain</p>
                    <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">{formatCurrency(sip.gain)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Advisor Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/10 text-sm text-orange-900 dark:text-orange-300 border border-orange-500/20">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-orange-600 dark:text-orange-400" />
            <div className="space-y-2">
              <p>
                <strong>Advisor Note:</strong> Mathematically, if you expect the market to go up linearly (like {equityRate}% every year), <strong>Lumpsum</strong> will always win because 100% of your money is compounding from day 1. 
              </p>
              <p>
                However, markets don&apos;t move in straight lines. If the market crashes in the next {sipDurationMonths} months, the <strong>SIP</strong> route will allow you to buy at cheaper prices, potentially beating Lumpsum. SIP protects against short-term volatility, while Lumpsum maximizes time in the market.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
