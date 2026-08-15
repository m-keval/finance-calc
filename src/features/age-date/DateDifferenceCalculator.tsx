"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateDateDiff, formatDate, parseDate, formatNumber } from "@/lib/dateMath"

export function DateDifferenceCalculator() {
  const d1 = new Date()
  d1.setFullYear(d1.getFullYear() - 1)
  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(new Date()))

  const first = parseDate(date1)
  const second = parseDate(date2)
  const isOrderCorrect = first <= second
  const startDate = isOrderCorrect ? first : second
  const endDate = isOrderCorrect ? second : first
  const result = calculateDateDiff(startDate, endDate)

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Start Date" value={date1} onChange={setDate1} />
          <DatePicker label="End Date" value={date2} onChange={setDate2} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {result.years}y {result.months}m {result.days}d
            </div>
            <div className="text-xs text-muted-foreground mt-1">Difference</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(result.totalDays)}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(result.totalWeeks)}</div>
              <div className="text-xs text-muted-foreground">Weeks</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(result.totalMonths)}</div>
              <div className="text-xs text-muted-foreground">Months</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(result.totalDays * 24)}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
