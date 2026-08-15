"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
import { calculateIncomeTax, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Calculator, CheckCircle2, AlertTriangle, FileText } from "lucide-react"

export function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(1200000)
  const [totalDeductions, setTotalDeductions] = useState(200000)

  const results = useMemo(() => {
    return calculateIncomeTax(grossIncome, totalDeductions)
  }, [grossIncome, totalDeductions])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-brand-100 dark:border-brand-950">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <FileText className="w-5 h-5" /> Income & Deductions
            </h3>
            <div className="space-y-6">
              <NumberInput
                id="grossIncome"
                label="Gross Annual Salary / Income"
                value={grossIncome}
                onChange={setGrossIncome}
                min={0}
                max={500000000}
                step={50000}
                prefix="₹"
                description="Total income before any deductions or exemptions."
              />
              <NumberInput
                id="totalDeductions"
                label="Total Deductions (Old Regime)"
                value={totalDeductions}
                onChange={setTotalDeductions}
                min={0}
                max={grossIncome}
                step={10000}
                prefix="₹"
                description="Total of 80C, 80D, HRA Exemption, LTA, etc. (Excluding standard deduction of 50k)"
              />
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg text-sm text-amber-800 dark:text-amber-200 flex gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p>Standard deductions of ₹50,000 (Old) and ₹75,000 (New) are automatically applied in the calculation.</p>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-8 border border-brand-100 dark:border-brand-900 relative overflow-hidden bg-gradient-to-br from-card to-brand-50/50 dark:to-brand-950/20">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Calculator className="w-32 h-32" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Regime Recommendation</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Based on your inputs, the <span className="font-bold text-foreground capitalize">{results.betterRegime} Tax Regime</span> is better for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-xl border transition-all ${results.betterRegime === 'new' ? 'bg-brand-50 border-brand-500 dark:bg-brand-950/50' : 'bg-card border-border'}`}>
                <div className="text-sm font-bold text-muted-foreground mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">New Tax Regime</span>
                  {results.betterRegime === 'new' && <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
                </div>
                <AutoScaleValue
                  value={formatCurrency(results.finalTaxNew)}
                  className="text-3xl sm:text-4xl font-black text-foreground tracking-tight"
                />
                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 h-5 mt-1">
                  {results.taxSavedNew > 0 ? `Saves ${formatCurrency(results.taxSavedNew)}` : ''}
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span>{formatCurrency(results.taxableNew)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Std Deduction:</span>
                    <span>{formatCurrency(results.stdDeductionNew)}</span>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl border transition-all ${results.betterRegime === 'old' ? 'bg-brand-50 border-brand-500 dark:bg-brand-950/50' : 'bg-card border-border'}`}>
                <div className="text-sm font-bold text-muted-foreground mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">Old Tax Regime</span>
                  {results.betterRegime === 'old' && <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />}
                </div>
                <AutoScaleValue
                  value={formatCurrency(results.finalTaxOld)}
                  className="text-3xl sm:text-4xl font-black text-foreground tracking-tight"
                />
                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 h-5 mt-1">
                  {results.taxSavedOld > 0 ? `Saves ${formatCurrency(results.taxSavedOld)}` : ''}
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span>{formatCurrency(results.taxableOld)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductions:</span>
                    <span>{formatCurrency(results.totalDeductions + results.stdDeductionOld)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
