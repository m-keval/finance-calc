"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateLoanEMI, formatCurrency, generateLoanAmortizationSchedule } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(3000000)
  const [expectedReturn, setExpectedReturn] = useState(8.5)
  const [years, setYears] = useState(20)
  const [schedulePeriod, setSchedulePeriod] = useState<"yearly" | "monthly">("yearly")

  const results = useMemo(() => {
    return calculateLoanEMI(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  const schedule = useMemo(() => {
    return generateLoanAmortizationSchedule(principal, expectedReturn, years, schedulePeriod)
  }, [principal, expectedReturn, years, schedulePeriod])

  const pieData = [
    { name: "Principal Amount", value: results.principal, color: "#3b82f6" },
    { name: "Interest Amount", value: results.totalInterest, color: "#f43f5e" },
  ]

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
      <Card className="p-6 border-brand-100 dark:border-brand-950 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-bold">Amortization Schedule</h3>
          <Tabs value={schedulePeriod} onValueChange={(v) => setSchedulePeriod(v as "yearly" | "monthly")} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="max-h-[500px] w-full overflow-auto rounded-md border scrollbar-thin shadow-sm">
          <Table>
            <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-foreground pl-6 py-4">Month/Year</TableHead>
                <TableHead className="text-right font-semibold text-foreground py-4">Principal Paid</TableHead>
                <TableHead className="text-right font-semibold text-foreground py-4">Interest Paid</TableHead>
                <TableHead className="text-right font-semibold text-foreground py-4">Total Payment</TableHead>
                <TableHead className="text-right font-semibold text-foreground pr-6 py-4">Ending Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.label} className="even:bg-muted/10 transition-colors hover:bg-muted/30">
                  <TableCell className="text-muted-foreground pl-6 py-3">{row.label}</TableCell>
                  <TableCell className="text-right py-3">{formatCurrency(row.principal)}</TableCell>
                  <TableCell className="text-right py-3">{formatCurrency(row.interest)}</TableCell>
                  <TableCell className="text-right font-medium py-3">{formatCurrency(row.totalPayment)}</TableCell>
                  <TableCell className="text-right font-semibold pr-6 py-3">{formatCurrency(row.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
