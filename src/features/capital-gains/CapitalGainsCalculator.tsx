"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { calculateCapitalGains, formatCurrency, AssetType } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Building, TrendingUp, Calculator, AlertCircle } from "lucide-react"

export function CapitalGainsCalculator() {
  const [assetType, setAssetType] = useState<AssetType>('equity')
  const [purchasePrice, setPurchasePrice] = useState(500000)
  const [salePrice, setSalePrice] = useState(800000)
  const [holdingPeriod, setHoldingPeriod] = useState(24) // in months

  const results = useMemo(() => {
    return calculateCapitalGains(assetType, purchasePrice, salePrice, holdingPeriod)
  }, [assetType, purchasePrice, salePrice, holdingPeriod])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 border-brand-100 dark:border-brand-950">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <TrendingUp className="w-5 h-5" /> Transaction Details
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
                  <Building className="w-4 h-4 text-brand-500" />
                  Asset Class
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAssetType('equity')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      assetType === 'equity' 
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 font-medium" 
                        : "border-border bg-card hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    Equity / MFs
                  </button>
                  <button
                    onClick={() => setAssetType('realEstate')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      assetType === 'realEstate'
                        ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 font-medium" 
                        : "border-border bg-card hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    Real Estate
                  </button>
                </div>
              </div>

              <NumberInput
                id="purchasePrice"
                label="Purchase Price"
                value={purchasePrice}
                onChange={setPurchasePrice}
                min={0}
                max={500000000}
                step={10000}
                prefix="₹"
              />
              <NumberInput
                id="salePrice"
                label="Sale Price"
                value={salePrice}
                onChange={setSalePrice}
                min={0}
                max={500000000}
                step={10000}
                prefix="₹"
              />
              <NumberInput
                id="holdingPeriod"
                label="Holding Period (Months)"
                value={holdingPeriod}
                onChange={setHoldingPeriod}
                min={1}
                max={600}
                step={1}
                suffix=" Mo"
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
            
            <h2 className="text-2xl font-bold mb-2">Tax Calculation</h2>
            <div className="flex items-center gap-2 mb-8">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${results.isLongTerm ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'}`}>
                {results.isLongTerm ? "Long-Term Capital Gain (LTCG)" : "Short-Term Capital Gain (STCG)"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-card border shadow-sm">
                <div className="text-xs font-medium text-muted-foreground mb-1">Total Gain</div>
                <div className="text-xl font-bold text-foreground">
                  {formatCurrency(results.totalGain)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border shadow-sm border-brand-200 dark:border-brand-800">
                <div className="text-xs font-medium text-muted-foreground mb-1">Tax Liability</div>
                <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
                  {formatCurrency(results.taxLiability)}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-card border shadow-sm border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-medium text-muted-foreground mb-1">Net Profit</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(results.netProfit)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg flex gap-3 text-sm text-muted-foreground">
              <AlertCircle className="w-5 h-5 shrink-0 text-brand-500" />
              <div>
                <p>
                  <strong>Note on 2024 Budget:</strong> This calculator uses the latest rules (Union Budget 2024).
                </p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  {assetType === 'equity' ? (
                    <>
                      <li>Equity STCG (&lt;12 months) is taxed at 20%.</li>
                      <li>Equity LTCG (&gt;12 months) is taxed at 12.5%.</li>
                      <li>LTCG exemption of ₹1.25 Lakh per year applies to Equity.</li>
                    </>
                  ) : (
                    <>
                      <li>Real Estate STCG (&lt;24 months) is taxed at your slab rate (calculator assumes 30%).</li>
                      <li>Real Estate LTCG (&gt;24 months) is taxed at 12.5% without indexation benefits.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
