"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { calculateTimeDuration } from "@/lib/dateMath"

export function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:30")

  const result = calculateTimeDuration(startTime, endTime)

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
              {result.hours}h {result.minutes}m {result.seconds}s
            </div>
            <div className="text-xs text-muted-foreground mt-1">Duration</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{result.totalMinutes}</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{result.totalSeconds}</div>
              <div className="text-xs text-muted-foreground">Seconds</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{(result.totalSeconds / 3600).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Decimal Hours</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
