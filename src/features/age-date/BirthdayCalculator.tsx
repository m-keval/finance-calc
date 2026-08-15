"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateAge, calculateBirthday, formatDate, formatDateDisplay, parseDate } from "@/lib/dateMath"
import { Star } from "lucide-react"

export function BirthdayCalculator() {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 25)
  const [birthDate, setBirthDate] = useState(formatDate(d))

  const birth = parseDate(birthDate)
  const today = new Date()
  const age = calculateAge(birth, today)

  const futureBirthdays = Array.from({ length: 5 }, (_, i) => {
    const bd = calculateBirthday(birth, age.years + i + 1)
    return {
      number: age.years + i + 1,
      date: bd,
      day: bd.toLocaleDateString('en-IN', { weekday: 'short' }),
    }
  })

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <DatePicker label="Your Date of Birth" value={birthDate} onChange={setBirthDate} />
          <div className="grid grid-cols-2 gap-2 text-sm text-center">
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{age.dayOfWeek}</div>
              <div className="text-xs text-muted-foreground">Day Born</div>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30">
              <div className="font-bold text-foreground">{age.years}</div>
              <div className="text-xs text-muted-foreground">Current Age</div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Upcoming Birthdays</div>
          <div className="space-y-2">
            {futureBirthdays.map((bd) => (
              <div key={bd.number} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-brand-500" />
                  <span className="font-medium">{bd.number}th Birthday</span>
                  <span className="text-muted-foreground">({bd.day})</span>
                </div>
                <span className="text-brand-600 dark:text-brand-400 font-medium">{formatDateDisplay(bd.date)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
