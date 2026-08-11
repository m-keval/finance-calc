"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateSIP, formatCurrency } from "@/lib/math"
import { Info, TrendingUp, PiggyBank, AlertTriangle, ShieldCheck } from "lucide-react"

export function SipVsFdCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000)
  const [years, setYears] = useState(10)
  const [sipRate, setSipRate] = useState(12)
  const [fdRate, setFdRate] = useState(7)
  const [inflationRate, setInflationRate] = useState(6)

  const { sip, fd, winner, difference } = useMemo(() => {
    // SIP Calculation
    const sipResult = calculateSIP(monthlyInvestment, sipRate, years)
    
    // FD (RD) Calculation - using same formula structure as it's monthly recurring
    const fdResult = calculateSIP(monthlyInvestment, fdRate, years)

    // Inflation Adjusted (Real Return = Nominal Rate - Inflation Rate)
    const realSipRate = sipRate - inflationRate;
    const realFdRate = fdRate - inflationRate;
    
    const realSipResult = calculateSIP(monthlyInvestment, realSipRate, years)
    const realFdResult = calculateSIP(monthlyInvestment, realFdRate, years)

    const diff = sipResult.totalValue - fdResult.totalValue;

    return {
      sip: {
        ...sipResult,
        realValue: realSipResult.totalValue
      },
      fd: {
        ...fdResult,
        realValue: realFdResult.totalValue
      },
      winner: diff > 0 ? "SIP" : "FD",
      difference: Math.abs(diff)
    }
  }, [monthlyInvestment, years, sipRate, fdRate, inflationRate])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              <NumberInput
                label="MONTHLY INVESTMENT"
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                min={500}
                max={1000000}
                step={500}
                prefix="₹"
              />
              
              <NumberInput
                label="TIME PERIOD"
                value={years}
                onChange={setYears}
                min={1}
                max={50}
                step={1}
                suffix=" Yr"
              />
              
              <NumberInput
                label="EXPECTED SIP RETURN"
                value={sipRate}
                onChange={setSipRate}
                min={1}
                max={30}
                step={0.5}
                suffix="%"
              />

              <NumberInput
                label="EXPECTED FD RETURN"
                value={fdRate}
                onChange={setFdRate}
                min={1}
                max={15}
                step={0.1}
                suffix="%"
              />

              <NumberInput
                label="INFLATION RATE"
                value={inflationRate}
                onChange={setInflationRate}
                min={1}
                max={15}
                step={0.1}
                suffix="%"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          <Card className={`border-none ${winner === 'SIP' ? 'bg-brand-500/10' : 'bg-blue-500/10'}`}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Clear Winner</p>
                <h3 className={`text-3xl font-bold ${winner === 'SIP' ? 'text-brand-600 dark:text-brand-400' : 'text-blue-600 dark:text-blue-400'}`}>
                  {winner === 'SIP' ? 'Mutual Fund SIP' : 'Bank FD'}
                </h3>
                <p className="text-sm mt-2 text-muted-foreground">
                  Generates <span className="font-bold text-foreground">{formatCurrency(difference)}</span> more wealth than {winner === 'SIP' ? 'FD' : 'SIP'}.
                </p>
              </div>
              <div className={`p-4 rounded-full ${winner === 'SIP' ? 'bg-brand-500/20 text-brand-600' : 'bg-blue-500/20 text-blue-600'}`}>
                {winner === 'SIP' ? <TrendingUp className="w-10 h-10" /> : <PiggyBank className="w-10 h-10" />}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-brand-500" />
                  <h4 className="font-semibold">SIP Performance</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-xl font-bold">{formatCurrency(sip.totalValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inflation Adjusted</p>
                    <p className="text-lg font-medium text-brand-600 dark:text-brand-400">{formatCurrency(sip.realValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PiggyBank className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold">FD Performance</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-xl font-bold">{formatCurrency(fd.totalValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inflation Adjusted</p>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400">{formatCurrency(fd.realValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparisons */}
          <Card className="border-none bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg">Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                <div className="grid grid-cols-3 p-4 text-sm items-center">
                  <div className="font-medium">Total Invested</div>
                  <div className="text-center font-semibold">{formatCurrency(sip.totalInvestment)}</div>
                  <div className="text-center font-semibold">{formatCurrency(fd.totalInvestment)}</div>
                </div>
                <div className="grid grid-cols-3 p-4 text-sm items-center bg-muted/10">
                  <div className="font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-500" /> Risk Score
                  </div>
                  <div className="text-center">Moderate to High</div>
                  <div className="text-center">Very Low (Safe)</div>
                </div>
                <div className="grid grid-cols-3 p-4 text-sm items-center">
                  <div className="font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Taxation
                  </div>
                  <div className="text-center text-xs">LTCG @ 12.5%</div>
                  <div className="text-center text-xs">As per Income Slab</div>
                </div>
                <div className="grid grid-cols-3 p-4 text-sm items-center bg-muted/10">
                  <div className="font-medium">Liquidity</div>
                  <div className="text-center text-xs">High (No lock-in, T+1 days)</div>
                  <div className="text-center text-xs">Moderate (Penalty on early withdrawal)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Advisor Note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-500/10 text-sm text-brand-900 dark:text-brand-300 border border-brand-500/20">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-brand-600 dark:text-brand-400" />
            <p>
              <strong>Advisor Note:</strong> While SIPs offer significantly higher wealth creation over {years} years, they carry market risk. FDs are completely safe but often fail to beat inflation. A balanced portfolio uses FDs for emergency funds (1-2 years of expenses) and SIPs for long-term wealth creation.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
