"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateWeeksBetween, formatDate, parseDate, formatNumber } from "@/lib/dateMath"

export function WeeksBetweenCalculator() {
  const d1 = new Date()
  d1.setDate(d1.getDate() - 90)
  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(new Date()))

  const first = parseDate(date1)
  const second = parseDate(date2)
  const isOrderCorrect = first <= second
  const startDate = isOrderCorrect ? first : second
  const endDate = isOrderCorrect ? second : first
  const result = calculateWeeksBetween(startDate, endDate)

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Start Date" value={date1} onChange={setDate1} />
          <DatePicker label="End Date" value={date2} onChange={setDate2} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-3xl font-bold text-brand-600 dark:text-brand-400">{result.weeks}</span>
              <span className="text-lg text-muted-foreground">weeks</span>
              {result.remainingDays > 0 && (
                <>
                  <span className="text-muted-foreground">+</span>
                  <span className="text-xl font-bold text-brand-600 dark:text-brand-400">{result.remainingDays}</span>
                  <span className="text-sm text-muted-foreground">days</span>
                </>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Weeks Between</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(result.totalDays)}</div>
              <div className="text-xs text-muted-foreground">Total Days</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(result.totalDays * 24)}</div>
              <div className="text-xs text-muted-foreground">Total Hours</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
