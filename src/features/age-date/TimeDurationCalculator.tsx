"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { ResultCard } from "@/components/shared/ResultCard"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
import { calculateTimeDuration, formatNumber } from "@/lib/dateMath"
import { formatCurrency } from "@/lib/math"
import { Clock, Coffee, DollarSign, Zap, Sparkles, Moon, Sun } from "lucide-react"

export function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:30")
  const [breakMinutes, setBreakMinutes] = useState(30)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [crossMidnight, setCrossMidnight] = useState(false)

  const result = useMemo(() => {
    return calculateTimeDuration(startTime, endTime, breakMinutes, hourlyRate, crossMidnight)
  }, [startTime, endTime, breakMinutes, hourlyRate, crossMidnight])

  const handleShiftPreset = (start: string, end: string, breakMins: number = 30, overnight: boolean = false) => {
    setStartTime(start)
    setEndTime(end)
    setBreakMinutes(breakMins)
    setCrossMidnight(overnight)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Time Duration & Shift</h2>
              <p className="text-xs text-muted-foreground">Calculate hours between times, breaks, and earnings</p>
            </div>
          </div>

          {/* Time Pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border bg-background text-foreground font-bold text-base focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border bg-background text-foreground font-bold text-base focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
              />
            </div>
          </div>

          {/* Break & Hourly Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                Break (Minutes)
              </label>
              <input
                type="number"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Math.max(0, Number(e.target.value)))}
                min={0}
                step={5}
                className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Hourly Rate (₹)
              </label>
              <input
                type="number"
                value={hourlyRate || ""}
                onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Overnight Toggle */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Cross Midnight Shift</div>
              <div className="text-xs text-muted-foreground">Shift spans across to the next day</div>
            </div>
            <button
              type="button"
              onClick={() => setCrossMidnight(!crossMidnight)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                crossMidnight ? "bg-brand-600 justify-end" : "bg-muted-foreground/30 justify-start"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Standard Shifts
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleShiftPreset("09:00", "17:00", 30)}
                className="p-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left font-medium transition-colors cursor-pointer"
              >
                <div>Standard 9 to 5</div>
                <span className="text-[11px] text-muted-foreground">8h Shift (30m break)</span>
              </button>
              <button
                type="button"
                onClick={() => handleShiftPreset("09:00", "18:00", 60)}
                className="p-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left font-medium transition-colors cursor-pointer"
              >
                <div>Corporate 9 to 6</div>
                <span className="text-[11px] text-muted-foreground">9h Shift (1h break)</span>
              </button>
              <button
                type="button"
                onClick={() => handleShiftPreset("14:00", "22:00", 30)}
                className="p-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left font-medium transition-colors cursor-pointer"
              >
                <div>Evening Shift</div>
                <span className="text-[11px] text-muted-foreground">2 PM - 10 PM</span>
              </button>
              <button
                type="button"
                onClick={() => handleShiftPreset("22:00", "06:00", 30, true)}
                className="p-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-left font-medium transition-colors cursor-pointer"
              >
                <div>Night Shift 🌙</div>
                <span className="text-[11px] text-muted-foreground">10 PM - 6 AM (Next Day)</span>
              </button>
            </div>
          </div>
        </Card>

        {/* Hero Result Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Net Working Time"
              value={`${result.netHours}h ${result.netMinutes}m`}
              subValue={`${result.totalHoursDecimal.toFixed(2)} Decimal Hours`}
              variant="highlight"
            />
            <ResultCard
              title="Break Deducted"
              value={`${result.breakMinutes} Mins`}
              subValue={`Gross: ${result.hours}h ${result.minutes}m`}
              variant="principal"
            />
            <ResultCard
              title="Shift Earnings"
              value={result.estimatedEarnings ? formatCurrency(result.estimatedEarnings) : `${formatNumber(result.totalMinutes)} Mins`}
              subValue={hourlyRate > 0 ? `@ ${formatCurrency(hourlyRate)}/hr` : "No hourly rate set"}
              variant="returns"
            />
          </div>

          {/* Time Span Summary Card */}
          <Card className="p-6 border-border/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Shift Breakdown</span>
              <span className="text-xs font-mono text-muted-foreground">
                {startTime} → {endTime} {crossMidnight && "(+1 Day)"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Total Hours</div>
                <div className="text-xl font-black text-brand-600 dark:text-brand-400 mt-1">
                  {result.totalHoursDecimal.toFixed(2)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Total Minutes</div>
                <div className="text-xl font-black text-foreground mt-1">
                  {formatNumber(result.totalMinutes)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Total Seconds</div>
                <div className="text-xl font-black text-foreground mt-1">
                  {formatNumber(result.totalSeconds)}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground uppercase font-bold">Break Time</div>
                <div className="text-xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  {result.breakMinutes}m
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
