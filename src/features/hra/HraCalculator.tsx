"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateHRA, formatCurrency } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Building, MapPin, Calculator, HelpCircle } from "lucide-react"

export function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState(500000)
  const [hraReceived, setHraReceived] = useState(250000)
  const [rentPaid, setRentPaid] = useState(300000)
  const [isMetro, setIsMetro] = useState(true)

  const results = useMemo(() => {
    return calculateHRA(basicSalary, hraReceived, rentPaid, isMetro)
  }, [basicSalary, hraReceived, rentPaid, isMetro])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-brand-100 dark:border-brand-950">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <Building className="w-5 h-5" /> HRA Details
            </h3>
            <div className="space-y-6">
              <NumberInput
                id="basicSalary"
                label="Annual Basic Salary + DA"
                value={basicSalary}
                onChange={setBasicSalary}
                min={0}
                max={50000000}
                step={10000}
                prefix="₹"
                description="Include Dearness Allowance (DA) if it forms part of retirement benefits."
              />
              <NumberInput
                id="hraReceived"
                label="Annual HRA Received"
                value={hraReceived}
                onChange={setHraReceived}
                min={0}
                max={10000000}
                step={5000}
                prefix="₹"
              />
              <NumberInput
                id="rentPaid"
                label="Annual Rent Paid"
                value={rentPaid}
                onChange={setRentPaid}
                min={0}
                max={10000000}
                step={5000}
                prefix="₹"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  City Type
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsMetro(true)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      isMetro 
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 font-medium" 
                        : "border-border bg-card hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    Metro City
                    <span className="block text-xs mt-1 opacity-70 font-normal">Delhi, Mumbai, Chennai, Kolkata</span>
                  </button>
                  <button
                    onClick={() => setIsMetro(false)}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      !isMetro 
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 font-medium" 
                        : "border-border bg-card hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    Non-Metro City
                    <span className="block text-xs mt-1 opacity-70 font-normal">Any other city</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-8 border-2 border-brand-100 dark:border-brand-900 shadow-sm relative overflow-hidden bg-gradient-to-br from-card to-brand-50/50 dark:to-brand-950/20">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Calculator className="w-32 h-32" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Exemption Summary</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Out of your total HRA of {formatCurrency(hraReceived)}, an amount of <span className="font-bold text-brand-600 dark:text-brand-400">{formatCurrency(results.exemptHRA)}</span> is exempt from tax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card border shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-500" />
                  Exempt HRA
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {formatCurrency(results.exemptHRA)}
                </div>
                <div className="text-xs text-muted-foreground">
                  (Tax-free portion)
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-rose-500" />
                  Taxable HRA
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {formatCurrency(results.taxableHRA)}
                </div>
                <div className="text-xs text-muted-foreground">
                  (Added to taxable income)
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-brand-100 dark:border-brand-950">
            <h3 className="text-lg font-bold mb-4">How is this calculated?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The exempt HRA is the minimum of the following three conditions under Section 10(13A):
            </p>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${results.exemptHRA === results.rule1 ? 'bg-brand-50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800' : 'bg-card'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">1. Actual HRA Received</span>
                  <span className="font-bold">{formatCurrency(results.rule1)}</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${results.exemptHRA === results.rule2 ? 'bg-brand-50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800' : 'bg-card'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">2. {isMetro ? '50%' : '40%'} of Basic Salary</span>
                  <span className="font-bold">{formatCurrency(results.rule2)}</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${results.exemptHRA === results.rule3 ? 'bg-brand-50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800' : 'bg-card'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">3. Rent Paid minus 10% of Basic</span>
                  <span className="font-bold">{formatCurrency(results.rule3)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
