"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { DistributionChart } from "@/components/charts/DistributionChart"
import { calculateLoanEMI, formatCurrency, generateLoanAmortizationSchedule } from "@/lib/math"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  ChevronUp,
  TrendingDown,
  Calendar,
  IndianRupee,
  Wallet,
  Receipt,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Percent,
} from "lucide-react"

export function LoanCalculator() {
  const [principal, setPrincipal] = useState(3000000)
  const [expectedReturn, setExpectedReturn] = useState(8.5)
  const [years, setYears] = useState(20)
  const [schedulePeriod, setSchedulePeriod] = useState<"yearly" | "monthly">("yearly")
  const [showAll, setShowAll] = useState(false)

  // Other Loan Expenses & Fees
  const [showExpenses, setShowExpenses] = useState(true)
  const [processingFeeType, setProcessingFeeType] = useState<"percent" | "fixed">("percent")
  const [processingFeePercent, setProcessingFeePercent] = useState(0.5)
  const [processingFeeFixed, setProcessingFeeFixed] = useState(15000)
  const [docCharges, setDocCharges] = useState(5000)
  const [insuranceFee, setInsuranceFee] = useState(0)
  const [applyGST, setApplyGST] = useState(true)

  const results = useMemo(() => {
    return calculateLoanEMI(principal, expectedReturn, years)
  }, [principal, expectedReturn, years])

  // Calculate upfront expenses & fees
  const feeDetails = useMemo(() => {
    const rawProcessingFee =
      processingFeeType === "percent"
        ? (principal * processingFeePercent) / 100
        : processingFeeFixed

    const taxableFees = rawProcessingFee + docCharges
    const gstAmount = applyGST ? taxableFees * 0.18 : 0
    const totalFees = Math.round(rawProcessingFee + docCharges + insuranceFee + gstAmount)
    const netDisbursed = Math.max(0, principal - totalFees)
    const totalLoanCost = results.totalPayment + totalFees

    return {
      processingFee: Math.round(rawProcessingFee),
      gstAmount: Math.round(gstAmount),
      docCharges: Math.round(docCharges),
      insuranceFee: Math.round(insuranceFee),
      totalFees,
      netDisbursed,
      totalLoanCost,
    }
  }, [
    principal,
    processingFeeType,
    processingFeePercent,
    processingFeeFixed,
    docCharges,
    insuranceFee,
    applyGST,
    results.totalPayment,
  ])

  const schedule = useMemo(() => {
    return generateLoanAmortizationSchedule(principal, expectedReturn, years, schedulePeriod)
  }, [principal, expectedReturn, years, schedulePeriod])

  const pieData = useMemo(() => {
    const data = [
      { name: "Principal Amount", value: results.principal, color: "#2563eb" },
      { name: "Interest Amount", value: results.totalInterest, color: "#f43f5e" },
    ]
    if (feeDetails.totalFees > 0) {
      data.push({ name: "Fees & Expenses", value: feeDetails.totalFees, color: "#8b5cf6" })
    }
    return data
  }, [results, feeDetails.totalFees])

  const visibleRows = showAll ? schedule : schedule.slice(0, 12)
  const maxBalance = schedule.length > 0 ? schedule[0].balance : principal

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="space-y-6">
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

          {/* Collapsible Other Expenses & Processing Fees Section */}
          <div className="pt-4 border-t border-border/70">
            <button
              type="button"
              onClick={() => setShowExpenses(!showExpenses)}
              className="w-full flex items-center justify-between py-2 text-sm font-bold text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Other Expenses & Processing Fees
              </span>
              {showExpenses ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showExpenses && (
              <div className="space-y-4 mt-4 pt-3 border-t border-border/50 animate-fade-in">
                {/* Processing Fee Type Switch */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                    Processing Fee Calculation
                  </label>
                  <Tabs
                    value={processingFeeType}
                    onValueChange={(v) => setProcessingFeeType(v as "percent" | "fixed")}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="percent">Percentage (%)</TabsTrigger>
                      <TabsTrigger value="fixed">Fixed (₹)</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {processingFeeType === "percent" ? (
                  <NumberInput
                    id="processingFeePercent"
                    label="Processing Fee Rate"
                    value={processingFeePercent}
                    onChange={setProcessingFeePercent}
                    min={0}
                    max={5}
                    step={0.1}
                    suffix="%"
                  />
                ) : (
                  <NumberInput
                    id="processingFeeFixed"
                    label="Processing Fee Amount"
                    value={processingFeeFixed}
                    onChange={setProcessingFeeFixed}
                    min={0}
                    max={500000}
                    step={1000}
                    prefix="₹"
                  />
                )}

                <NumberInput
                  id="docCharges"
                  label="Documentation & Legal Charges"
                  value={docCharges}
                  onChange={setDocCharges}
                  min={0}
                  max={100000}
                  step={500}
                  prefix="₹"
                />

                <NumberInput
                  id="insuranceFee"
                  label="Loan Insurance / Valuation (Optional)"
                  value={insuranceFee}
                  onChange={setInsuranceFee}
                  min={0}
                  max={500000}
                  step={1000}
                  prefix="₹"
                />

                {/* GST Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">Apply 18% GST on Fees</span>
                    <span className="text-[11px] text-muted-foreground">
                      Govt tax on processing & legal charges: {formatCurrency(feeDetails.gstAmount)}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={applyGST}
                    onChange={(e) => setApplyGST(e.target.checked)}
                    className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500 cursor-pointer accent-brand-600"
                  />
                </div>
              </div>
            )}
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
              title="Total Principal"
              value={formatCurrency(results.principal)}
              variant="principal"
            />
          </div>

          {/* Upfront Fees & Net Disbursal Highlights */}
          {feeDetails.totalFees > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/70">
              <div>
                <span className="text-xs text-muted-foreground font-medium block">Total Upfront Expenses</span>
                <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
                  {formatCurrency(feeDetails.totalFees)}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-medium block">Net Disbursed to Bank</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(feeDetails.netDisbursed)}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground font-medium block">True Total Cost of Loan</span>
                <span className="text-lg font-bold text-foreground">
                  {formatCurrency(feeDetails.totalLoanCost)}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <DistributionChart
              title="Breakdown of Total Outflow"
              data={pieData}
              valueFormatter={formatCurrency}
            />
          </div>
        </div>
      </div>

      {/* Upfront Fee Details Table (When fees are active) */}
      {feeDetails.totalFees > 0 && (
        <Card className="border-border/70 overflow-hidden">
          <div className="p-5 bg-muted/40 border-b border-border/60 flex items-center justify-between">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              Upfront Charges & Expense Breakdown
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-card border border-border text-foreground">
              Total Fees: {formatCurrency(feeDetails.totalFees)}
            </span>
          </div>

          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-card border border-border">
              <span className="text-muted-foreground block mb-0.5">Processing Fee</span>
              <span className="font-bold text-sm text-foreground">{formatCurrency(feeDetails.processingFee)}</span>
            </div>
            <div className="p-3 rounded-xl bg-card border border-border">
              <span className="text-muted-foreground block mb-0.5">Documentation / Legal</span>
              <span className="font-bold text-sm text-foreground">{formatCurrency(feeDetails.docCharges)}</span>
            </div>
            <div className="p-3 rounded-xl bg-card border border-border">
              <span className="text-muted-foreground block mb-0.5">18% GST on Charges</span>
              <span className="font-bold text-sm text-foreground">{formatCurrency(feeDetails.gstAmount)}</span>
            </div>
            <div className="p-3 rounded-xl bg-card border border-border">
              <span className="text-muted-foreground block mb-0.5">Insurance / MODT</span>
              <span className="font-bold text-sm text-foreground">{formatCurrency(feeDetails.insuranceFee)}</span>
            </div>
          </div>
        </Card>
      )}

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
            <Tabs
              value={schedulePeriod}
              onValueChange={(v) => setSchedulePeriod(v as "yearly" | "monthly")}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-y">
              <tr>
                <th className="px-6 py-3">{schedulePeriod === "yearly" ? "Year" : "Month"}</th>
                <th className="px-6 py-3">Principal (A)</th>
                <th className="px-6 py-3">Interest (B)</th>
                <th className="px-6 py-3">Total Payment (A+B)</th>
                <th className="px-6 py-3">Balance</th>
                <th className="px-6 py-3">Loan Paid %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {visibleRows.map((row) => {
                const paidPercent = (((principal - row.balance) / principal) * 100).toFixed(1)
                return (
                  <tr key={row.label} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5 font-medium">{row.label}</td>
                    <td className="px-6 py-3.5 text-blue-600 dark:text-blue-400 font-medium">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="px-6 py-3.5 text-rose-500 dark:text-rose-400">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="px-6 py-3.5 font-medium">{formatCurrency(row.totalPayment)}</td>
                    <td className="px-6 py-3.5 text-muted-foreground">{formatCurrency(row.balance)}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-brand-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${paidPercent}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-10">{paidPercent}%</span>
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
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(results.principal)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-muted-foreground">Interest:</span>
                <span className="font-semibold text-rose-500 dark:text-rose-400">
                  {formatCurrency(results.totalInterest)}
                </span>
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
                className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors cursor-pointer"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show All {schedule.length} {schedulePeriod === "yearly" ? "Years" : "Months"}{" "}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Dynamic Result Interpretation & Loan Guidance Section */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-rose-50 via-card to-brand-50/30 dark:from-rose-950/40 dark:via-card dark:to-brand-950/20 border border-rose-200 dark:border-rose-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Loan Cost Analysis & Financial Guidance
              </h3>
              <p className="text-xs text-muted-foreground">
                Detailed breakdown for ₹{principal.toLocaleString("en-IN")} borrowed at {expectedReturn}% over {years} years.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>{((results.totalInterest / results.principal) * 100).toFixed(1)}% Extra Interest</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Monthly Outflow (EMI)</div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {formatCurrency(results.emi)}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Required net monthly installment.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Daily Interest Cost</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                {formatCurrency(Math.round(results.totalInterest / (years * 365)))}/day
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Pure interest charged per day over the tenure.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Income Rule (FOIR)</div>
              <div className="text-xl font-bold text-foreground mt-0.5">
                {formatCurrency(Math.round(results.emi / 0.4))}
                /mo
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Recommended minimum household net income.
              </div>
            </div>
          </div>
        </div>

        {/* 4 Smart Loan Strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">⚡ 1. Extra EMI Every Year (Prepayment)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Paying just <strong>1 additional EMI per year</strong> directly against the principal can reduce a 20-year home loan by <strong>~3 to 4 years</strong> and save lakhs of rupees in interest.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">📈 2. 5% Annual EMI Step-Up</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Increasing your EMI by 5% every year as your salary increases can cut your loan tenure almost in half and eliminate up to 40% of total interest payable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🏛️ 3. Tax Deduction Benefits (Home Loan)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Under the Old Tax Regime, principal repayment qualifies for up to <strong>₹1.5 Lakh under Section 80C</strong>, and interest payment qualifies for up to <strong>₹2 Lakh under Section 24(b)</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2">🛡️ 4. Crucial Safety Checklist</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always maintain a pure Term Insurance policy covering at least 100% of your outstanding loan liability to protect your family from debt liabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
