"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateAge, formatDate, parseDate } from "@/lib/dateMath"
import { Gift } from "lucide-react"

export function BirthdayCountdown() {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 25)
  const [birthDate, setBirthDate] = useState(formatDate(d))
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const birth = parseDate(birthDate)
  const age = calculateAge(birth, now)
  const progress = age.years > 0 ? ((365 - age.daysUntilBirthday) / 365) * 100 : 0

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Your Date of Birth" value={birthDate} onChange={setBirthDate} />
          <div className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-muted/30">
            <Gift className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-muted-foreground">Turn <span className="font-bold text-foreground">{age.years + 1}</span> on <span className="font-medium">{age.nextBirthday.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span></span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">
              {age.daysUntilBirthday}
            </div>
            <div className="text-sm text-muted-foreground mt-1">days to go</div>
          </div>

          <div className="max-w-sm mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Last Birthday</span>
              <span>{Math.round(progress)}% passed</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{age.daysUntilBirthday}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{age.daysUntilBirthday * 24}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{age.daysUntilBirthday * 24 * 60}</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
