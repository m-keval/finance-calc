"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateRentVsBuy, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { TrendingUp, Home, Calculator } from "lucide-react"

export function RentVsBuyCalculator() {
  // Buy Params
  const [propertyValue, setPropertyValue] = useState(10000000)
  const [downPayment, setDownPayment] = useState(2000000)
  const [loanInterestRate, setLoanInterestRate] = useState(8.5)
  const [loanTenure, setLoanTenure] = useState(20)
  const [propertyAppreciationRate, setPropertyAppreciationRate] = useState(6)
  const [maintenanceRate, setMaintenanceRate] = useState(1) // 1% of property value per year

  // Rent Params
  const [monthlyRent, setMonthlyRent] = useState(30000)
  const [rentEscalationRate, setRentEscalationRate] = useState(5)
  const [investmentReturnRate, setInvestmentReturnRate] = useState(12) // Return on down payment and monthly savings

  const results = useMemo(() => {
    return calculateRentVsBuy(
      { propertyValue, downPayment, loanInterestRate, loanTenure, propertyAppreciationRate, maintenanceRate },
      { monthlyRent, rentEscalationRate, investmentReturnRate },
      loanTenure
    )
  }, [propertyValue, downPayment, loanInterestRate, loanTenure, propertyAppreciationRate, maintenanceRate, monthlyRent, rentEscalationRate, investmentReturnRate])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-brand-100 dark:border-brand-950">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <Home className="w-5 h-5" /> Buy Scenario
            </h3>
            <div className="space-y-6">
              <NumberInput
                id="propertyValue"
                label="Property Value"
                value={propertyValue}
                onChange={setPropertyValue}
                min={1000000}
                max={500000000}
                step={500000}
                prefix="₹"
              />
              <NumberInput
                id="downPayment"
                label="Down Payment"
                value={downPayment}
                onChange={setDownPayment}
                min={0}
                max={propertyValue}
                step={100000}
                prefix="₹"
              />
              <NumberInput
                id="loanInterestRate"
                label="Home Loan Interest Rate"
                value={loanInterestRate}
                onChange={setLoanInterestRate}
                min={1}
                max={20}
                step={0.1}
                suffix="%"
              />
              <NumberInput
                id="loanTenure"
                label="Loan Tenure"
                value={loanTenure}
                onChange={setLoanTenure}
                min={5}
                max={30}
                step={1}
                suffix="Yr"
              />
              <NumberInput
                id="propertyAppreciationRate"
                label="Expected Property Appreciation"
                value={propertyAppreciationRate}
                onChange={setPropertyAppreciationRate}
                min={1}
                max={20}
                step={0.5}
                suffix="%"
              />
            </div>
          </Card>

          <Card className="p-6 border-emerald-100 dark:border-emerald-950">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" /> Rent Scenario
            </h3>
            <div className="space-y-6">
              <NumberInput
                id="monthlyRent"
                label="Current Monthly Rent"
                value={monthlyRent}
                onChange={setMonthlyRent}
                min={5000}
                max={500000}
                step={1000}
                prefix="₹"
              />
              <NumberInput
                id="rentEscalationRate"
                label="Annual Rent Escalation"
                value={rentEscalationRate}
                onChange={setRentEscalationRate}
                min={1}
                max={15}
                step={1}
                suffix="%"
              />
              <NumberInput
                id="investmentReturnRate"
                label="Expected Investment Return"
                value={investmentReturnRate}
                onChange={setInvestmentReturnRate}
                min={1}
                max={30}
                step={0.5}
                suffix="%"
                description="Return expected if you invest the down payment and monthly savings."
              />
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-8 border-2 border-brand-100 dark:border-brand-900 shadow-sm relative overflow-hidden bg-gradient-to-br from-card to-brand-50/50 dark:to-brand-950/20">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Calculator className="w-32 h-32" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">The Verdict</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              After {loanTenure} years, <span className="font-bold text-foreground">{results.isBuyingBetter ? "Buying" : "Renting"}</span> is financially better by <span className="font-bold text-brand-600 dark:text-brand-400">{formatCurrency(results.difference)}</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card border shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-brand-500" />
                  Net Worth if Buying
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {formatCurrency(results.finalNetWorthBuy)}
                </div>
                <div className="text-xs text-muted-foreground">
                  (Property Value: {formatCurrency(results.finalPropertyValue)})
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  Net Worth if Renting
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {formatCurrency(results.finalNetWorthRent)}
                </div>
                <div className="text-xs text-muted-foreground">
                  (Investment Portfolio Size)
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard 
              title="Total Rent Paid" 
              value={formatCurrency(results.totalRentPaid)}
              variant="default"
            />
            <ResultCard 
              title="Total EMI Paid" 
              value={formatCurrency(results.totalEMIPaid)}
              variant="default"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
