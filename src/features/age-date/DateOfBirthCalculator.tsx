"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { calculateDateOfBirth, formatDateDisplay, formatDate } from "@/lib/dateMath"

export function DateOfBirthCalculator() {
  const [age, setAge] = useState(25)
  const [onDate, setOnDate] = useState(formatDate(new Date()))

  const targetDate = new Date(onDate)
  const dob = calculateDateOfBirth(age, targetDate)

  return (
    <Card className="p-6 border border-brand-100 dark:border-brand-950">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={0}
              max={150}
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <DatePicker label="As of Date" value={onDate} onChange={setOnDate} />
        </div>

        <div className="lg:col-span-7">
          <div className="p-5 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-center border border-brand-100 dark:border-brand-900">
            <div className="text-xs text-muted-foreground mb-1">Date of Birth</div>
            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {formatDateDisplay(dob)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{dob.toLocaleDateString('en-IN', { weekday: 'long' })}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
