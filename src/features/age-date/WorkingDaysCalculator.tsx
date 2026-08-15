"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateWorkingDays, formatDate, parseDate, formatNumber } from "@/lib/dateMath"

export function WorkingDaysCalculator() {
  const d1 = new Date()
  d1.setDate(d1.getDate() - 30)
  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(new Date()))

  const first = parseDate(date1)
  const second = parseDate(date2)
  const isOrderCorrect = first <= second
  const startDate = isOrderCorrect ? first : second
  const endDate = isOrderCorrect ? second : first
  const result = calculateWorkingDays(startDate, endDate)
  const totalDays = result.workingDays + result.weekendDays

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Start Date" value={date1} onChange={setDate1} />
          <DatePicker label="End Date" value={date2} onChange={setDate2} />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{formatNumber(result.workingDays)}</div>
            <div className="text-xs text-muted-foreground mt-1">Working Days (Mon-Fri)</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-brand-600 dark:text-brand-400">{formatNumber(result.workingDays)}</div>
              <div className="text-xs text-muted-foreground">Working</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-rose-500">{formatNumber(result.weekendDays)}</div>
              <div className="text-xs text-muted-foreground">Weekend</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{formatNumber(totalDays)}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
