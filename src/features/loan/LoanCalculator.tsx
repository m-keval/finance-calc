"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateLoanEMI, formatCurrency, generateLoanAmortizationSchedule } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, TrendingDown, Calendar, IndianRupee, Wallet } from "lucide-react"

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(3000000)
  const [expectedReturn, setExpectedReturn] = useState(8.5)
  const [years, setYears] = useState(20)
  const [schedulePeriod, setSchedulePeriod] = useState<"yearly" | "monthly">("yearly")
  const [showAll, setShowAll] = useState(false)

  const results = useMemo(() => {
    return calculateLoanEMI(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  const schedule = useMemo(() => {
    return generateLoanAmortizationSchedule(principal, expectedReturn, years, schedulePeriod)
  }, [principal, expectedReturn, years, schedulePeriod])

  const pieData = [
    { name: "Principal Amount", value: results.principal, color: "#2563eb" },
    { name: "Interest Amount", value: results.totalInterest, color: "#f43f5e" },
  ]

  const visibleRows = showAll ? schedule : schedule.slice(0, 12)
  const maxBalance = schedule.length > 0 ? schedule[0].balance : principal

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950">
          <div className="space-y-8">
            <NumberInput
              id="principal"
              label="Loan Amount"
              value={principal}
              onChange={setPrincipal}
              min={50000}
              max={100000000}
              step={50000}
              prefix="₹"
            />
            
            <NumberInput
              id="expectedReturn"
              label="Interest Rate (p.a)"
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={1}
              max={100}
              step={0.1}
              suffix="%"
            />
            
            <NumberInput
              id="years"
              label="Loan Tenure"
              value={years}
              onChange={setYears}
              min={1}
              max={30}
              step={1}
              suffix="Yr"
            />
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard 
              title="Monthly EMI" 
              value={formatCurrency(results.emi)}
              variant="highlight"
            />
            <ResultCard 
              title="Total Interest" 
              value={formatCurrency(results.totalInterest)}
              variant="danger"
            />
            <ResultCard 
              title="Total Payment" 
              value={formatCurrency(results.totalPayment)}
              variant="principal"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <DistributionChart 
               title="Breakdown of Total Payment" 
               data={pieData}
               valueFormatter={formatCurrency}
             />
          </div>
        </div>
      </div>
      
      {/* Amortization Schedule */}
      <Card className="border-brand-100 dark:border-brand-950 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-500" />
                Amortization Schedule
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {schedulePeriod === "yearly" ? "Year-by-year" : "Month-by-month"} breakdown of your loan repayment
              </p>
            </div>
            <Tabs value={schedulePeriod} onValueChange={(v) => setSchedulePeriod(v as "yearly" | "monthly")} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-y-auto max-h-[520px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-muted/60 backdrop-blur-sm border-y border-border/50">
                <th className="text-left py-3 px-6 font-semibold text-foreground/80 text-xs uppercase tracking-wider">{schedulePeriod === "yearly" ? "Year" : "Month"}</th>
                <th className="text-right py-3 px-3 font-semibold text-foreground/80 text-xs uppercase tracking-wider">Principal</th>
                <th className="text-right py-3 px-3 font-semibold text-foreground/80 text-xs uppercase tracking-wider">Interest</th>
                <th className="text-right py-3 px-3 font-semibold text-foreground/80 text-xs uppercase tracking-wider">Total</th>
                <th className="text-right py-3 px-6 font-semibold text-foreground/80 text-xs uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => {
                const balancePercent = maxBalance > 0 ? (row.balance / maxBalance) * 100 : 0
                const isLast = i === visibleRows.length - 1
                return (
                  <tr
                    key={row.label}
                    className={`border-b border-border/30 transition-colors hover:bg-brand-50/50 dark:hover:bg-brand-950/20 ${
                      i % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                  >
                    <td className="py-3 px-6 font-medium text-foreground/80 whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">{formatCurrency(row.principal)}</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-rose-500 dark:text-rose-400 font-medium">{formatCurrency(row.interest)}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-foreground">
                      {formatCurrency(row.totalPayment)}
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-semibold text-foreground">{formatCurrency(row.balance)}</span>
                        <div className="w-full max-w-[100px] h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-300"
                            style={{ width: `${balancePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="border-t bg-muted/30 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-muted-foreground">Principal:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(results.principal)}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-muted-foreground">Interest:</span>
                <span className="font-semibold text-rose-500 dark:text-rose-400">{formatCurrency(results.totalInterest)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-3.5 h-3.5 text-brand-500" />
                <span className="text-muted-foreground">Total:</span>
                <span className="font-semibold">{formatCurrency(results.totalPayment)}</span>
              </div>
            </div>
            {schedule.length > 12 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors"
              >
                {showAll ? (
                  <>Show Less <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show All {schedule.length} {schedulePeriod === "yearly" ? "Years" : "Months"} <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
