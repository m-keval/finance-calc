"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import {
  calculateAge,
  calculateBirthday,
  formatDate,
  formatDateDisplay,
  formatDateFull,
  parseDate,
  formatNumber,
} from "@/lib/dateMath"
import { Cake, Gift, Sparkles, Star, Calendar, PartyPopper, Check, Copy } from "lucide-react"

export function BirthdayCalculator() {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 25)
  const [birthDate, setBirthDate] = useState(formatDate(d))
  const [copied, setCopied] = useState(false)

  const birth = useMemo(() => parseDate(birthDate), [birthDate])
  const today = new Date()
  const age = useMemo(() => calculateAge(birth, today), [birth, today])

  const futureBirthdays = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const ageNum = age.years + i + 1
      const bd = calculateBirthday(birth, ageNum)
      const dayName = bd.toLocaleDateString("en-IN", { weekday: "long" })
      const isWeekend = bd.getDay() === 0 || bd.getDay() === 6
      const daysUntil = Math.max(0, Math.ceil((bd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))

      let badge: string | undefined = undefined
      if (ageNum % 10 === 0) badge = `Big ${ageNum}th!`
      else if (ageNum === 18) badge = "Adult (18)"
      else if (ageNum === 21) badge = "Milestone 21"
      else if (ageNum === 50) badge = "Golden 50 🌟"
      else if (ageNum === 75) badge = "Diamond 75"
      else if (ageNum === 100) badge = "Centennial 👑"

      return {
        age: ageNum,
        date: bd,
        day: dayName,
        isWeekend,
        daysUntil,
        badge,
      }
    })
  }, [birth, age.years, today])

  const weekendCount = futureBirthdays.filter((b) => b.isWeekend).length

  const handleCopySchedule = () => {
    const lines = futureBirthdays
      .map((b) => `• ${b.age}th Birthday: ${formatDateDisplay(b.date)} (${b.day})${b.isWeekend ? " 🎉 Weekend" : ""}`)
      .join("\n")
    navigator.clipboard.writeText(`🎂 Upcoming 10-Year Birthday Schedule:\n${lines}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls & Birth Profile */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Birthday Calendar Hub</h2>
              <p className="text-xs text-muted-foreground">Predict upcoming birthdays and weekend celebrations</p>
            </div>
          </div>

          <DatePicker label="Your Date of Birth" value={birthDate} onChange={setBirthDate} />

          {/* Birth Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-card border border-border/70">
              <div className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Day Born</div>
              <div className="text-base font-bold text-foreground mt-1 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                {age.dayOfWeek}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/70">
              <div className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Current Age</div>
              <div className="text-base font-bold text-brand-600 dark:text-brand-400 mt-1">
                {age.years} Yrs, {age.months} Mos
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Born On:</span>
              <span className="font-semibold text-foreground">{formatDateFull(birth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Zodiac Sign:</span>
              <span className="font-semibold text-foreground">
                {age.cosmic.zodiac.sign} ({age.cosmic.zodiac.symbol})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Days Lived:</span>
              <span className="font-semibold text-foreground">{formatNumber(age.totalDaysLived)} days</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySchedule}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-medium text-sm border border-brand-200 dark:border-brand-800 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Schedule Copied!" : "Copy 10-Year Schedule"}
          </button>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Next Birthday"
              value={formatDateDisplay(age.nextBirthday)}
              subValue={`${age.daysUntilBirthday} Days Remaining`}
              variant="highlight"
            />
            <ResultCard
              title="Turning Age"
              value={`${age.years + 1}th Birthday`}
              subValue={`Currently ${age.years} Yrs Old`}
              variant="principal"
            />
            <ResultCard
              title="Weekend Celebrations"
              value={`${weekendCount} of Next 10`}
              subValue="Falls on Saturday / Sunday"
              variant="returns"
            />
          </div>

          {/* 10-Year Birthday Schedule Table */}
          <Card className="border-border/70 overflow-hidden">
            <div className="p-4 bg-muted/40 border-b border-border/60 flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Next 10 Birthdays Schedule
              </h3>
              <span className="text-xs text-muted-foreground">{weekendCount} Weekend Birthdays</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/30 text-muted-foreground uppercase font-semibold border-b">
                  <tr>
                    <th className="px-4 py-2.5">Milestone</th>
                    <th className="px-4 py-2.5">Date</th>
                    <th className="px-4 py-2.5">Day of Week</th>
                    <th className="px-4 py-2.5">Countdown</th>
                    <th className="px-4 py-2.5 text-right">Party Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {futureBirthdays.map((b) => (
                    <tr key={b.age} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-bold text-foreground flex items-center gap-2">
                        <span>{b.age}th Birthday</span>
                        {b.badge && (
                          <span className="px-1.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-[10px] font-bold border border-brand-200 dark:border-brand-800">
                            {b.badge}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{formatDateDisplay(b.date)}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        <span className={b.isWeekend ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""}>
                          {b.day}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono">
                        {b.daysUntil === 0 ? "Today! 🎂" : `in ${formatNumber(b.daysUntil)} days`}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {b.isWeekend ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                            🎉 Weekend
                          </span>
                        ) : (
                          <span className="text-muted-foreground/70 text-[11px]">Weekday</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Dynamic Result Interpretation Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/30 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-lg font-bold text-foreground">Birthday Milestone Highlights</h3>
            <p className="text-xs text-muted-foreground">
              Celebration insights for your next milestone {age.years + 1}th birthday.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span>{age.daysUntilBirthday} Days to Next Party</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Next Birthday Day</div>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              {futureBirthdays[0]?.day}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              {futureBirthdays[0]?.isWeekend ? "🎉 Weekend party ready!" : "Weekday celebration."}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Birthstone Gem</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {age.cosmic.birthstone.name}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">{age.cosmic.birthstone.meaning}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Decade Milestone</div>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {Math.ceil((age.years + 1) / 10) * 10}th Birthday
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Next major round decade milestone.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
