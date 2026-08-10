"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateHomeLoanEligibility, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Building, Calculator } from "lucide-react"

export function HomeLoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(100000)
  const [existingEMIs, setExistingEMIs] = useState(15000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenureYears, setTenureYears] = useState(20)

  const results = useMemo(() => {
    return calculateHomeLoanEligibility(monthlyIncome, existingEMIs, interestRate, tenureYears)
  }, [monthlyIncome, existingEMIs, interestRate, tenureYears])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5">
          <Card className="p-6 border-indigo-100 dark:border-indigo-950">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Calculator className="w-5 h-5" /> Financial Profile
            </h3>
            <div className="space-y-6">
              <NumberInput
                id="monthlyIncome"
                label="Net Monthly Income"
                value={monthlyIncome}
                onChange={setMonthlyIncome}
                min={10000}
                max={5000000}
                step={5000}
                prefix="₹"
                description="Your take-home salary after taxes and deductions."
              />
              <NumberInput
                id="existingEMIs"
                label="Existing Monthly EMIs"
                value={existingEMIs}
                onChange={setExistingEMIs}
                min={0}
                max={monthlyIncome}
                step={1000}
                prefix="₹"
                description="Total of all your current monthly loan payments."
              />
              <NumberInput
                id="interestRate"
                label="Expected Interest Rate"
                value={interestRate}
                onChange={setInterestRate}
                min={1}
                max={20}
                step={0.1}
                suffix="%"
              />
              <NumberInput
                id="tenureYears"
                label="Loan Tenure"
                value={tenureYears}
                onChange={setTenureYears}
                min={5}
                max={30}
                step={1}
                suffix="Yr"
              />
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-8 border-2 border-indigo-100 dark:border-indigo-900 shadow-sm relative overflow-hidden bg-gradient-to-br from-card to-indigo-50/50 dark:to-indigo-950/20">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Building className="w-32 h-32" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Maximum Eligible Loan</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Based on your income and existing obligations, you can afford a new EMI of up to <span className="font-bold text-foreground">{formatCurrency(results.availableEMI)}</span>.
            </p>

            <div className="mb-8">
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {formatCurrency(results.maxEligibleLoan)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card border shadow-sm">
                <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                  Est. Property Value
                </div>
                <div className="text-xl font-bold text-foreground">
                  {formatCurrency(results.maxPropertyValue)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  (Assuming 80% Loan-to-Value)
                </div>
              </div>

              <div className="p-4 rounded-lg bg-card border shadow-sm">
                <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                  Min. Down Payment
                </div>
                <div className="text-xl font-bold text-foreground">
                  {formatCurrency(results.minimumDownPayment)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  (Remaining 20%)
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
