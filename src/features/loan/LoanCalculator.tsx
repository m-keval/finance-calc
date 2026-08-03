"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateLoanEMI, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(3000000)
  const [expectedReturn, setExpectedReturn] = useState(8.5)
  const [years, setYears] = useState(20)

  const results = useMemo(() => {
    return calculateLoanEMI(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  const pieData = [
    { name: "Principal Amount", value: results.principal, color: "#3b82f6" },
    { name: "Interest Amount", value: results.totalInterest, color: "#f43f5e" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-emerald-100 dark:border-emerald-950">
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
    </div>
  )
}
