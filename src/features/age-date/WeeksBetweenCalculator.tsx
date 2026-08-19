"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateWeeksBetween, formatDate, formatDateDisplay, parseDate, formatNumber } from "@/lib/dateMath"
import { Calendar, Zap, Clock, Bookmark, Sun } from "lucide-react"

export function WeeksBetweenCalculator() {
  const d1 = new Date()
  d1.setDate(d1.getDate() - 84) // 12 weeks ago
  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(new Date()))

  const first = useMemo(() => parseDate(date1), [date1])
  const second = useMemo(() => parseDate(date2), [date2])
  const isOrderCorrect = first <= second
  const startDate = isOrderCorrect ? first : second
  const endDate = isOrderCorrect ? second : first

  const result = useMemo(() => calculateWeeksBetween(startDate, endDate), [startDate, endDate])

  const handlePresetWeeks = (weeks: number) => {
    const today = new Date()
    const past = new Date()
    past.setDate(past.getDate() - weeks * 7)
    setDate1(formatDate(past))
    setDate2(formatDate(today))
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Weeks Between Dates</h2>
              <p className="text-xs text-muted-foreground">Calculate time span in full weeks and days</p>
            </div>
          </div>

          <div className="space-y-4">
            <DatePicker label="Start Date" value={date1} onChange={setDate1} />
            <DatePicker label="End Date" value={date2} onChange={setDate2} />
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Common Week Spans
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: "4 Weeks (1 Mo)", weeks: 4 },
                { label: "12 Weeks (Quarter)", weeks: 12 },
                { label: "26 Weeks (Half Yr)", weeks: 26 },
                { label: "40 Weeks (Term)", weeks: 40 },
                { label: "52 Weeks (1 Year)", weeks: 52 },
                { label: "104 Weeks (2 Yrs)", weeks: 104 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePresetWeeks(p.weeks)}
                  className="py-2 px-3 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left font-medium transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-center text-muted-foreground">
            {formatDateDisplay(startDate)} → {formatDateDisplay(endDate)}
          </div>
        </Card>

        {/* Hero Display */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Total Weeks"
              value={`${formatNumber(result.weeks)} Weeks, ${result.remainingDays} Days`}
              subValue={`${(result.totalDays / 7).toFixed(1)} Weeks Decimal`}
              variant="highlight"
            />
            <ResultCard
              title="Total Days"
              value={`${formatNumber(result.totalDays)} Days`}
              subValue={`${result.totalMonthsDecimal} Months Equivalent`}
              variant="principal"
            />
            <ResultCard
              title="Total Hours"
              value={`${formatNumber(result.totalHours)} Hours`}
              subValue={`${result.remainingDays} Days Remainder`}
              variant="returns"
            />
          </div>

          {/* Breakdown Units Card */}
          <Card className="p-6 border-border/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Span Breakdown</span>
              <span className="text-xs font-mono text-muted-foreground">
                {formatDateDisplay(startDate)} to {formatDateDisplay(endDate)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Total Weeks</div>
                <div className="text-xl font-black text-brand-600 dark:text-brand-400 mt-1">
                  {formatNumber(result.weeks)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Remaining Days</div>
                <div className="text-xl font-black text-foreground mt-1">
                  {result.remainingDays}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Total Days</div>
                <div className="text-xl font-black text-foreground mt-1">
                  {formatNumber(result.totalDays)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Total Hours</div>
                <div className="text-xl font-black text-foreground mt-1">
                  {formatNumber(result.totalHours)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
