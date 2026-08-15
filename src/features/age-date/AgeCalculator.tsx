"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateAge, formatDate, formatDateDisplay, parseDate, formatNumber } from "@/lib/dateMath"
import { Star, Gift, Hash } from "lucide-react"

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState(() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 25)
    return formatDate(d)
  })
  const [onDate, setOnDate] = useState(formatDate(new Date()))

  const birth = parseDate(birthDate)
  const on = parseDate(onDate)
  const result = calculateAge(birth, on)

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Date of Birth" value={birthDate} onChange={setBirthDate} />
          <DatePicker label="Calculate Age On" value={onDate} onChange={setOnDate} />
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-sm">
            <Star className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-muted-foreground">Born:</span>
            <span className="font-medium">{result.dayOfWeek}</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{result.years}</div>
              <div className="text-xs text-muted-foreground mt-1">Years</div>
            </div>
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{result.months}</div>
              <div className="text-xs text-muted-foreground mt-1">Months</div>
            </div>
            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{result.days}</div>
              <div className="text-xs text-muted-foreground mt-1">Days</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30">
              <Gift className="w-3.5 h-3.5 text-brand-500" />
              <div>
                <div className="text-muted-foreground text-xs">Next Birthday</div>
                <div className="font-medium">{formatDateDisplay(result.nextBirthday)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30">
              <Hash className="w-3.5 h-3.5 text-brand-500" />
              <div>
                <div className="text-muted-foreground text-xs">Days Lived</div>
                <div className="font-medium">{formatNumber(result.totalDaysLived)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30">
              <Star className="w-3.5 h-3.5 text-brand-500" />
              <div>
                <div className="text-muted-foreground text-xs">Days to Birthday</div>
                <div className="font-medium">{result.daysUntilBirthday} days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
