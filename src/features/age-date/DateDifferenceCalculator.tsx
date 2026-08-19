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
import { Calendar, CalendarDays, Clock, Briefcase, Zap, CheckCircle2, Layers, Hourglass, Timer } from "lucide-react"

export function DateDifferenceCalculator() {
  const d1 = new Date()
  d1.setMonth(d1.getMonth() - 6)
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

  const handlePreset = (type: "last30" | "last90" | "ytd" | "yearEnd" | "next90") => {
    const today = new Date()
    if (type === "last30") {
      const past = new Date()
      past.setDate(past.getDate() - 30)
      setDate1(formatDate(past))
      setDate2(formatDate(today))
    } else if (type === "last90") {
      const past = new Date()
      past.setDate(past.getDate() - 90)
      setDate1(formatDate(past))
      setDate2(formatDate(today))
    } else if (type === "ytd") {
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      setDate1(formatDate(startOfYear))
      setDate2(formatDate(today))
    } else if (type === "yearEnd") {
      const endOfYear = new Date(today.getFullYear(), 11, 31)
      setDate1(formatDate(today))
      setDate2(formatDate(endOfYear))
    } else if (type === "next90") {
      const future = new Date()
      future.setDate(future.getDate() + 90)
      setDate1(formatDate(today))
      setDate2(formatDate(future))
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Select Two Dates</h2>
              <p className="text-xs text-muted-foreground">Calculate the exact span between dates</p>
            </div>
          </div>

          <div className="space-y-4">
            <DatePicker label="Start Date" value={date1} onChange={setDate1} />
            <DatePicker label="End Date" value={date2} onChange={setDate2} />
          </div>

          {/* Include End Date Toggle */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Include End Date (+1 day)</div>
              <div className="text-xs text-muted-foreground">Count both the start and end days</div>
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
              Quick Intervals
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handlePreset("last30")}
                className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
              >
                Past 30 Days
              </button>
              <button
                type="button"
                onClick={() => handlePreset("last90")}
                className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
              >
                Past 90 Days
              </button>
              <button
                type="button"
                onClick={() => handlePreset("ytd")}
                className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
              >
                Year to Date
              </button>
              <button
                type="button"
                onClick={() => handlePreset("yearEnd")}
                className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
              >
                Today to Dec 31
              </button>
              <button
                type="button"
                onClick={() => handlePreset("next90")}
                className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors col-span-2 cursor-pointer"
              >
                Next 90 Days Ahead
              </button>
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
              title="Exact Difference"
              value={`${result.years}Y ${result.months}M ${result.days}D`}
              subValue={`${result.years} Years, ${result.months} Months, ${result.days} Days`}
              variant="highlight"
            />
            <ResultCard
              title="Total Days"
              value={`${formatNumber(result.totalDays)} Days`}
              subValue={`${formatNumber(result.totalWeeks)} Weeks Total`}
              variant="principal"
            />
            <ResultCard
              title="Working Days"
              value={`${formatNumber(result.workingDays)} Days`}
              subValue={`${formatNumber(result.weekendDays)} Weekend Days`}
              variant="returns"
            />
          </div>

          {/* Working Days vs Weekend Breakdown Card */}
          <Card className="p-6 border-border/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Working Days vs. Weekend Distribution
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {((result.workingDays / (result.totalDays || 1)) * 100).toFixed(0)}% Workdays
              </span>
            </div>

            <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{
                  width: `${(result.workingDays / (result.totalDays || 1)) * 100}%`,
                }}
                title={`Working days: ${result.workingDays}`}
              />
              <div
                className="h-full bg-amber-500 transition-all duration-700"
                style={{
                  width: `${(result.weekendDays / (result.totalDays || 1)) * 100}%`,
                }}
                title={`Weekend days: ${result.weekendDays}`}
              />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                Working Days (Mon–Fri): <strong>{formatNumber(result.workingDays)}</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                Weekend Days (Sat–Sun): <strong>{formatNumber(result.weekendDays)}</strong>
              </span>
            </div>
          </Card>

          {/* Breakdown Units Grid (2 in one row) */}
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
                    <div className="text-[11px] text-muted-foreground">7-day cycles span</div>
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
                    <div className="text-[11px] text-muted-foreground">Calendar months span</div>
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
        </div>
      </div>

      {/* Dynamic Result Interpretation Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/30 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-lg font-bold text-foreground">Time Interval Insights</h3>
            <p className="text-xs text-muted-foreground">
              Granular breakdown between {formatDateDisplay(startDate)} and {formatDateDisplay(endDate)}.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span>{formatNumber(result.totalDays)} Total Days</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Standard Work Weeks</div>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              {(result.workingDays / 5).toFixed(1)} Weeks
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Equivalent 5-day professional work weeks.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Working Hours (8h/day)</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {formatNumber(result.workingDays * 8)} Hours
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Total productive office billable hours.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Total Seconds</div>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {formatNumber(result.totalSeconds)}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Precise physical elapsed time.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
