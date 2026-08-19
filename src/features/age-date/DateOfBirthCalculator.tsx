"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import {
  calculateDateOfBirthExact,
  formatDate,
  formatDateDisplay,
  formatDateFull,
  parseDate,
  getZodiacSignInfo,
  getChineseZodiac,
  getGeneration,
} from "@/lib/dateMath"
import { Calendar, User, Sparkles, Compass, Zap, Flame } from "lucide-react"

export function DateOfBirthCalculator() {
  const [years, setYears] = useState(25)
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  const [onDate, setOnDate] = useState(formatDate(new Date()))

  const targetDate = useMemo(() => parseDate(onDate), [onDate])
  const dob = useMemo(() => {
    return calculateDateOfBirthExact(years, months, days, targetDate)
  }, [years, months, days, targetDate])

  const zodiac = useMemo(() => getZodiacSignInfo(dob), [dob])
  const chineseZodiac = useMemo(() => getChineseZodiac(dob.getFullYear()), [dob])
  const generation = useMemo(() => getGeneration(dob.getFullYear()), [dob])

  const handleQuickAge = (y: number) => {
    setYears(y)
    setMonths(0)
    setDays(0)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Find Date of Birth</h2>
              <p className="text-xs text-muted-foreground">Calculate DOB from a known age and target date</p>
            </div>
          </div>

          {/* Age Input Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Age Details
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Years</span>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
                  min={0}
                  max={150}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Months</span>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Math.max(0, Math.min(11, Number(e.target.value))))}
                  min={0}
                  max={11}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground">Days</span>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Math.max(0, Math.min(30, Number(e.target.value))))}
                  min={0}
                  max={30}
                  className="w-full px-3 py-2 rounded-lg border bg-background font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          <DatePicker label="As of Date" value={onDate} onChange={setOnDate} />

          {/* Quick Age Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Quick Age Presets
            </label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[18, 21, 25, 30, 40, 50, 60, 65].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleQuickAge(y)}
                  className="py-1.5 px-2 rounded-lg border border-border bg-background hover:bg-brand-50 dark:hover:bg-brand-950/40 text-center font-medium transition-colors cursor-pointer"
                >
                  {y} Years
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Hero Result Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Calculated Birth Date"
              value={formatDateDisplay(dob)}
              subValue={dob.toLocaleDateString("en-IN", { weekday: "long" })}
              variant="highlight"
            />
            <ResultCard
              title="Zodiac Sign"
              value={`${zodiac.sign} ${zodiac.glyph}`}
              subValue={`${zodiac.element} Element • ${zodiac.rulingPlanet}`}
              variant="principal"
            />
            <ResultCard
              title="Generation"
              value={generation.name}
              subValue={`Year of the ${chineseZodiac.animal}`}
              variant="returns"
            />
          </div>

          {/* Full DOB Card */}
          <Card className="p-6 border-border/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Exact Date of Birth</span>
              <span className="text-xs font-mono text-muted-foreground">
                As of {formatDateDisplay(targetDate)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-foreground">
                {formatDateFull(dob)}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Calculated for age {years} years, {months} months, {days} days
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground font-bold uppercase">Zodiac Sign</div>
                <div className="text-base font-bold text-foreground mt-1 flex items-center gap-1">
                  <span>{zodiac.sign}</span>
                  <span className="text-lg">{zodiac.glyph}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{zodiac.dates}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground font-bold uppercase">Chinese Zodiac</div>
                <div className="text-base font-bold text-foreground mt-1">
                  Year of the {chineseZodiac.animal}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{chineseZodiac.element} • {chineseZodiac.yinYang}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70">
                <div className="text-[11px] text-muted-foreground font-bold uppercase">Generation</div>
                <div className="text-base font-bold text-foreground mt-1">{generation.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{generation.range}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
