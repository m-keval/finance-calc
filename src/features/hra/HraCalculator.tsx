"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
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
          <Card className="p-8 border border-brand-100 dark:border-brand-900 relative overflow-hidden bg-gradient-to-br from-card to-brand-50/50 dark:to-brand-950/20">
            <h2 className="text-2xl font-bold mb-2">Exemption Summary</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Out of your total HRA of {formatCurrency(hraReceived)}, an amount of <span className="font-bold text-brand-600 dark:text-brand-400">{formatCurrency(results.exemptHRA)}</span> is exempt from tax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-card border overflow-hidden">
                <div className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-500" />
                  Exempt HRA
                </div>
                <AutoScaleValue
                  value={formatCurrency(results.exemptHRA)}
                  className="text-foreground"
                />
                <div className="text-xs text-muted-foreground mt-2">
                  (Tax-free portion)
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border overflow-hidden">
                <div className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-rose-500" />
                  Taxable HRA
                </div>
                <AutoScaleValue
                  value={formatCurrency(results.taxableHRA)}
                  className="text-foreground"
                />
                <div className="text-xs text-muted-foreground mt-2">
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

      {/* Dynamic Result Interpretation & HRA Guidance Section */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 via-card to-brand-50/30 dark:from-emerald-950/40 dark:via-card dark:to-brand-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                HRA Exemption Insights & Tax Savings
              </h3>
              <p className="text-xs text-muted-foreground">
                Estimated tax relief from your ₹{formatCurrency(results.exemptHRA)} exemption.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Save ~{formatCurrency(Math.round(results.exemptHRA * 0.312))} (At 30% Slab)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Exemption Efficiency</div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {hraReceived > 0 ? ((results.exemptHRA / hraReceived) * 100).toFixed(0) : 0}% Tax-Free
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">Portion of HRA received that escapes tax.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Monthly Tax Reduction</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                ~{formatCurrency(Math.round((results.exemptHRA * 0.208) / 12))}/mo
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">Average tax saved per month (20% slab).</div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Regime Availability</div>
              <div className="text-xl font-bold text-foreground mt-0.5">Old Regime Only</div>
              <div className="text-[11px] text-muted-foreground mt-1">Section 10(13A) is not eligible in New Regime.</div>
            </div>
          </div>
        </div>

        {/* 4 HRA Practical Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📋 1. Landlord PAN Requirement</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your total annual rent paid exceeds <strong>₹1,00,000 (₹8,333/month)</strong>, submitting your landlord's PAN to your employer is mandatory under income tax rules.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🏡 2. Paying Rent to Parents</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You can legally claim HRA exemption by paying rent to your parents if the property is in their name. Ensure you transfer rent via bank transfer, execute a rent agreement, and they report this rental income in their ITR.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🏙️ 3. Metro City Definition</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For HRA calculations, only <strong>Delhi, Mumbai, Kolkata, and Chennai</strong> qualify for the 50% basic salary exemption. All other cities (including Bengaluru, Hyderabad, and Pune) are classified as non-metro (40%).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📑 4. Documentation Checklist</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always preserve signed monthly rent receipts, the formal lease agreement with revenue stamps, and utility/electricity bills as proof for tax assessment scrutiny.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
