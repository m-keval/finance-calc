"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import {
  calculateWorkingDays,
  formatDate,
  formatDateDisplay,
  parseDate,
  formatNumber,
} from "@/lib/dateMath"
import { formatCurrency } from "@/lib/math"
import { Briefcase, Calendar, Clock, DollarSign, Zap, Sliders, ShieldCheck } from "lucide-react"

export function WorkingDaysCalculator() {
  const d1 = new Date()
  d1.setMonth(d1.getMonth() - 1)
  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(new Date()))
  const [weekendPattern, setWeekendPattern] = useState<"sat-sun" | "sun-only" | "fri-sat">("sat-sun")
  const [holidays, setHolidays] = useState(0)
  const [hoursPerDay, setHoursPerDay] = useState(8)
  const [hourlyRate, setHourlyRate] = useState(0)

  const first = useMemo(() => parseDate(date1), [date1])
  const second = useMemo(() => parseDate(date2), [date2])
  const isOrderCorrect = first <= second
  const startDate = isOrderCorrect ? first : second
  const endDate = isOrderCorrect ? second : first

  const result = useMemo(() => {
    return calculateWorkingDays(startDate, endDate, weekendPattern, holidays)
  }, [startDate, endDate, weekendPattern, holidays])

  const totalWorkingHours = result.workingDays * hoursPerDay
  const estimatedEarnings = hourlyRate > 0 ? totalWorkingHours * hourlyRate : null

  const handlePresetDays = (days: number) => {
    const today = new Date()
    const past = new Date()
    past.setDate(past.getDate() - days)
    setDate1(formatDate(past))
    setDate2(formatDate(today))
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Working Days Parameters</h2>
              <p className="text-xs text-muted-foreground">Configure date range, weekends, and holidays</p>
            </div>
          </div>

          <div className="space-y-4">
            <DatePicker label="Start Date" value={date1} onChange={setDate1} />
            <DatePicker label="End Date" value={date2} onChange={setDate2} />
          </div>

          {/* Weekend Schedule Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Weekend Schedule
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setWeekendPattern("sat-sun")}
                className={`py-2 px-2 rounded-lg border font-semibold transition-all text-center cursor-pointer ${
                  weekendPattern === "sat-sun"
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-background border-border hover:bg-muted text-foreground"
                }`}
              >
                Sat & Sun
              </button>
              <button
                type="button"
                onClick={() => setWeekendPattern("sun-only")}
                className={`py-2 px-2 rounded-lg border font-semibold transition-all text-center cursor-pointer ${
                  weekendPattern === "sun-only"
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-background border-border hover:bg-muted text-foreground"
                }`}
              >
                Sun Only (6-day)
              </button>
              <button
                type="button"
                onClick={() => setWeekendPattern("fri-sat")}
                className={`py-2 px-2 rounded-lg border font-semibold transition-all text-center cursor-pointer ${
                  weekendPattern === "fri-sat"
                    ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                    : "bg-background border-border hover:bg-muted text-foreground"
                }`}
              >
                Fri & Sat
              </button>
            </div>
          </div>

          {/* Custom Holidays & Hours */}
          <div className="space-y-4 pt-1">
            <NumberInput
              id="holidays"
              label="Public Holidays in Period"
              value={holidays}
              onChange={setHolidays}
              min={0}
              max={100}
              step={1}
              suffix="Days"
            />
            <NumberInput
              id="hoursPerDay"
              label="Daily Working Hours"
              value={hoursPerDay}
              onChange={setHoursPerDay}
              min={1}
              max={24}
              step={0.5}
              suffix="Hrs/Day"
            />
            <NumberInput
              id="hourlyRate"
              label="Hourly Billable Rate (Optional)"
              value={hourlyRate}
              onChange={setHourlyRate}
              min={0}
              max={50000}
              step={100}
              prefix="₹"
            />
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Net Working Days"
              value={`${formatNumber(result.workingDays)} Days`}
              subValue={`${result.workingDaysPercent}% of Total Period`}
              variant="highlight"
            />
            <ResultCard
              title="Billable Work Hours"
              value={`${formatNumber(totalWorkingHours)} Hrs`}
              subValue={`@ ${hoursPerDay}h Standard Shift`}
              variant="principal"
            />
            <ResultCard
              title="Non-Working Days"
              value={`${formatNumber(result.weekendDays + result.holidays)} Days`}
              subValue={`${result.holidays} Public Holidays`}
              variant="returns"
            />
          </div>

          {/* Working Days Ratio Card */}
          <Card className="p-6 border-border/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Period Distribution</span>
              <span className="text-xs font-mono text-muted-foreground">
                {result.totalDays} Total Calendar Days
              </span>
            </div>

            <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${result.workingDaysPercent}%` }}
                title={`Working Days: ${result.workingDays}`}
              />
              <div
                className="h-full bg-amber-500 transition-all duration-700"
                style={{ width: `${(result.weekendDays / (result.totalDays || 1)) * 100}%` }}
                title={`Weekend Days: ${result.weekendDays}`}
              />
              {result.holidays > 0 && (
                <div
                  className="h-full bg-rose-500 transition-all duration-700"
                  style={{ width: `${(result.holidays / (result.totalDays || 1)) * 100}%` }}
                  title={`Holidays: ${result.holidays}`}
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Working ({result.workingDays}d)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                Weekends ({result.weekendDays}d)
              </span>
              {result.holidays > 0 && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  Holidays ({result.holidays}d)
                </span>
              )}
            </div>
          </Card>

          {/* Billable Earnings Estimation Card (If rate provided) */}
          {estimatedEarnings !== null && estimatedEarnings > 0 && (
            <Card className="p-5 border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-1">
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Estimated Billable Revenue
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {formatCurrency(estimatedEarnings)}
              </div>
              <div className="text-xs text-muted-foreground">
                Based on {formatNumber(totalWorkingHours)} hours @ {formatCurrency(hourlyRate)}/hr.
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Dynamic Interpretation Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/30 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-lg font-bold text-foreground">Productivity & Sprint Metrics</h3>
            <p className="text-xs text-muted-foreground">
              Work schedule between {formatDateDisplay(startDate)} and {formatDateDisplay(endDate)}.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span>{result.workingDays} Productive Workdays</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Standard 2-Week Sprints</div>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              {(result.workingDays / 10).toFixed(1)} Agile Sprints
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Based on 10 working days per sprint.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Monthly Workload Share</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {(result.workingDays / 21.5).toFixed(1)} Work Months
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Average 21.5 working days per standard month.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Rest & Recovery Ratio</div>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {(( (result.weekendDays + result.holidays) / (result.totalDays || 1) ) * 100).toFixed(0)}% Off Time
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Total proportion of non-workdays.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
