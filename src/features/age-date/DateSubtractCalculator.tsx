"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { subtractDaysFromDate, formatDate, formatDateDisplay, parseDate } from "@/lib/dateMath"

export function DateSubtractCalculator() {
  const [startDate, setStartDate] = useState(formatDate(new Date()))
  const [days, setDays] = useState(30)

  const start = parseDate(startDate)
  const result = subtractDaysFromDate(start, days)

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Start Date" value={startDate} onChange={setStartDate} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtract (Days)</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min={0}
              max={36500}
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{Math.floor(days / 7)}</div>
              <div className="text-xs text-muted-foreground">Weeks</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{Math.floor(days / 30)}</div>
              <div className="text-xs text-muted-foreground">Months</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{Math.floor(days / 365)}</div>
              <div className="text-xs text-muted-foreground">Years</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="p-5 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="text-xs text-muted-foreground mb-1">Result Date</div>
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{formatDateDisplay(result)}</div>
            <div className="text-sm text-muted-foreground mt-1">{result.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
