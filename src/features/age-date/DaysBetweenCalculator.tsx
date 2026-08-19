"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
import {
  calculateDateDiff,
  formatDate,
  formatDateDisplay,
  parseDate,
  formatNumber,
} from "@/lib/dateMath"
import { Hash, Calendar, CalendarDays, Zap, Clock, Sun, Moon, Layers, Hourglass, Timer } from "lucide-react"

export function DaysBetweenCalculator() {
  const d1 = new Date()
  d1.setDate(d1.getDate() - 45)
  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(new Date()))
  const [includeEndDate, setIncludeEndDate] = useState(false)

  const first = useMemo(() => parseDate(date1), [date1])
  const second = useMemo(() => parseDate(date2), [date2])
  const isOrderCorrect = first <= second
  const startDate = isOrderCorrect ? first : second
  const endDate = isOrderCorrect ? second : first

  const result = useMemo(() => {
    return calculateDateDiff(startDate, endDate, includeEndDate)
  }, [startDate, endDate, includeEndDate])

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
        {/* Input Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Days Between Dates</h2>
              <p className="text-xs text-muted-foreground">Count exact total days and weekdays</p>
            </div>
          </div>

          <div className="space-y-4">
            <DatePicker label="Start Date" value={date1} onChange={setDate1} />
            <DatePicker label="End Date" value={date2} onChange={setDate2} />
          </div>

          {/* Toggle */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Include End Date</div>
              <div className="text-xs text-muted-foreground">+1 day in total duration</div>
            </div>
            <button
              type="button"
              onClick={() => setIncludeEndDate(!includeEndDate)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                includeEndDate ? "bg-brand-600 justify-end" : "bg-muted-foreground/30 justify-start"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Quick Day Intervals
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { label: "15 Days", days: 15 },
                { label: "30 Days", days: 30 },
                { label: "60 Days", days: 60 },
                { label: "100 Days", days: 100 },
                { label: "180 Days", days: 180 },
                { label: "365 Days", days: 365 },
                { label: "500 Days", days: 500 },
                { label: "1000 Days", days: 1000 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePresetDays(p.days)}
                  className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-center text-muted-foreground">
            From <span className="font-semibold text-foreground">{formatDateDisplay(startDate)}</span> to{" "}
            <span className="font-semibold text-foreground">{formatDateDisplay(endDate)}</span>
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Total Days"
              value={`${formatNumber(result.totalDays)} Days`}
              subValue={`${result.years}Y ${result.months}M ${result.days}D equivalent`}
              variant="highlight"
            />
            <ResultCard
              title="Working Days"
              value={`${formatNumber(result.workingDays)} Days`}
              subValue={`${((result.workingDays / (result.totalDays || 1)) * 100).toFixed(0)}% of total span`}
              variant="principal"
            />
            <ResultCard
              title="Weekend Days"
              value={`${formatNumber(result.weekendDays)} Days`}
              subValue={`${formatNumber(result.totalWeeks)} Full Weeks`}
              variant="returns"
            />
          </div>

          {/* Alternative Units (2 in one row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weeks */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-br from-card via-card to-blue-50/40 dark:to-blue-950/20 p-5 shadow-xs transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-900/60 shadow-2xs">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Weeks</div>
                    <div className="text-[11px] text-muted-foreground">7-day continuous blocks</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-900/60">
                  Weeks
                </span>
              </div>
              <div className="pt-1">
                <AutoScaleValue
                  value={formatNumber(result.totalWeeks)}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                />
              </div>
            </div>

            {/* Months */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/70 dark:border-emerald-900/60 bg-gradient-to-br from-card via-card to-emerald-50/40 dark:to-emerald-950/20 p-5 shadow-xs transition-all hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/60 shadow-2xs">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Months</div>
                    <div className="text-[11px] text-muted-foreground">Calendar month span</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
                  Months
                </span>
              </div>
              <div className="pt-1">
                <AutoScaleValue
                  value={formatNumber(result.totalMonths)}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                />
              </div>
            </div>

            {/* Hours */}
            <div className="group relative overflow-hidden rounded-2xl border border-amber-200/70 dark:border-amber-900/60 bg-gradient-to-br from-card via-card to-amber-50/40 dark:to-amber-950/20 p-5 shadow-xs transition-all hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-900/60 shadow-2xs">
                    <Hourglass className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Hours</div>
                    <div className="text-[11px] text-muted-foreground">24-hour day cycles</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60">
                  Hours
                </span>
              </div>
              <div className="pt-1">
                <AutoScaleValue
                  value={formatNumber(result.totalHours)}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                />
              </div>
            </div>

            {/* Minutes */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-200/70 dark:border-purple-900/60 bg-gradient-to-br from-card via-card to-purple-50/40 dark:to-purple-950/20 p-5 shadow-xs transition-all hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-900/60 shadow-2xs">
                    <Timer className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Minutes</div>
                    <div className="text-[11px] text-muted-foreground">60-second intervals</div>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-900/60">
                  Minutes
                </span>
              </div>
              <div className="pt-1">
                <AutoScaleValue
                  value={formatNumber(result.totalMinutes)}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Calendar Span Summary Card */}
          <Card className="p-6 border-border/70 space-y-3">
            <div className="text-sm font-bold text-foreground">Exact Calendar Duration</div>
            <div className="text-2xl font-black text-foreground">
              {result.years > 0 && `${result.years} years, `}
              {result.months > 0 && `${result.months} months, `}
              {result.days} days
            </div>
            <p className="text-xs text-muted-foreground">
              Calculated taking into account leap years and varying month lengths (28, 29, 30, or 31 days).
            </p>
          </Card>
        </div>
      </div>

      {/* Dynamic Result Interpretation Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/30 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-lg font-bold text-foreground">Day Count Insights</h3>
            <p className="text-xs text-muted-foreground">
              From {formatDateDisplay(startDate)} through {formatDateDisplay(endDate)}.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span>{formatNumber(result.totalDays)} Days Duration</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Percent of a Year</div>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              {((result.totalDays / 365) * 100).toFixed(1)}% of 1 Year
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Portion of standard 365-day year.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Full Week Cycles</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {Math.floor(result.totalDays / 7)} Weeks + {result.totalDays % 7} Days
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">7-day continuous cycle breakdown.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Sleeping Hours (8h/day)</div>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {formatNumber(result.totalDays * 8)} Hours
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Estimated rest & sleep time.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
