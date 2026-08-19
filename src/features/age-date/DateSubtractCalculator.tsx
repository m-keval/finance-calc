"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import {
  subtractUnitsFromDate,
  formatDate,
  formatDateDisplay,
  formatDateFull,
  parseDate,
  getDayOfYear,
  isLeapYear,
} from "@/lib/dateMath"
import { Minus, Calendar, Sparkles, Briefcase, Zap } from "lucide-react"

export function DateSubtractCalculator() {
  const [startDate, setStartDate] = useState(formatDate(new Date()))
  const [years, setYears] = useState(0)
  const [months, setMonths] = useState(0)
  const [weeks, setWeeks] = useState(0)
  const [days, setDays] = useState(30)
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false)

  const start = useMemo(() => parseDate(startDate), [startDate])

  const result = useMemo(() => {
    return subtractUnitsFromDate(start, {
      years,
      months,
      weeks,
      days,
      businessDaysOnly,
    })
  }, [start, years, months, weeks, days, businessDaysOnly])

  const handleQuickSub = (amount: number, unit: "days" | "weeks" | "months" | "years") => {
    setYears(0)
    setMonths(0)
    setWeeks(0)
    setDays(0)
    if (unit === "days") setDays(amount)
    else if (unit === "weeks") setWeeks(amount)
    else if (unit === "months") setMonths(amount)
    else if (unit === "years") setYears(amount)
  }

  const resultDayOfYear = getDayOfYear(result)
  const quarter = Math.floor(result.getMonth() / 3) + 1
  const daysInYear = isLeapYear(result.getFullYear()) ? 366 : 365
  const daysRemainingInYear = daysInYear - resultDayOfYear

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Minus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Subtract from Date</h2>
              <p className="text-xs text-muted-foreground">Go backward in time by days, weeks, months, or years</p>
            </div>
          </div>

          <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />

          {/* Units Input Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Time to Subtract
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Days</span>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Math.max(0, Number(e.target.value)))}
                  min={0}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Weeks</span>
                <input
                  type="number"
                  value={weeks}
                  onChange={(e) => setWeeks(Math.max(0, Number(e.target.value)))}
                  min={0}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Months</span>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Math.max(0, Number(e.target.value)))}
                  min={0}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Years</span>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
                  min={0}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Business Days Toggle */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                Business Days Only
              </div>
              <div className="text-xs text-muted-foreground">Skip Saturdays & Sundays</div>
            </div>
            <button
              type="button"
              onClick={() => setBusinessDaysOnly(!businessDaysOnly)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                businessDaysOnly ? "bg-brand-600 justify-end" : "bg-muted-foreground/30 justify-start"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Quick Chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Quick Subtract Presets
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { label: "-7 Days", fn: () => handleQuickSub(7, "days") },
                { label: "-14 Days", fn: () => handleQuickSub(14, "days") },
                { label: "-30 Days", fn: () => handleQuickSub(30, "days") },
                { label: "-60 Days", fn: () => handleQuickSub(60, "days") },
                { label: "-90 Days", fn: () => handleQuickSub(90, "days") },
                { label: "-6 Months", fn: () => handleQuickSub(6, "months") },
                { label: "-1 Year", fn: () => handleQuickSub(1, "years") },
                { label: "-5 Years", fn: () => handleQuickSub(5, "years") },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.fn}
                  className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Hero Result Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Calculated Past Date"
              value={formatDateDisplay(result)}
              subValue={result.toLocaleDateString("en-IN", { weekday: "long" })}
              variant="highlight"
            />
            <ResultCard
              title="Quarter & Day"
              value={`Q${quarter}`}
              subValue={`Day ${resultDayOfYear} of ${daysInYear}`}
              variant="principal"
            />
            <ResultCard
              title="Calendar Type"
              value={isLeapYear(result.getFullYear()) ? "Leap Year" : "Regular Year"}
              subValue={`${daysRemainingInYear} Days Left in ${result.getFullYear()}`}
              variant="returns"
            />
          </div>

          {/* Full Target Date Breakdown Card */}
          <Card className="p-6 border-border/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Subtracted Date Overview</span>
              <span className="text-xs font-mono text-muted-foreground">
                {businessDaysOnly ? "Working Days Subtracted" : "Calendar Days Subtracted"}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {formatDateFull(result)}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Subtracted backwards from {formatDateDisplay(start)}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
              <div className="p-3 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Quarter</div>
                <div className="text-lg font-black text-brand-600 dark:text-brand-400 mt-0.5">Q{quarter}</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Day of Year</div>
                <div className="text-lg font-black text-foreground mt-0.5">{resultDayOfYear}</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Days Left</div>
                <div className="text-lg font-black text-foreground mt-0.5">{daysRemainingInYear}</div>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Leap Year</div>
                <div className="text-lg font-black text-foreground mt-0.5">{isLeapYear(result.getFullYear()) ? "Yes" : "No"}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
