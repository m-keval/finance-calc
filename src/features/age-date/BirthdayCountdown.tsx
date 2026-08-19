"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
import {
  calculateAge,
  formatDate,
  formatDateDisplay,
  formatDateFull,
  parseDate,
  formatNumber,
} from "@/lib/dateMath"
import { Gift, Sparkles, Clock, PartyPopper, Calendar, Copy, Check, Timer } from "lucide-react"
import { ConfettiEffect } from "@/components/shared/ConfettiEffect"

export function BirthdayCountdown() {
  const [birthDate, setBirthDate] = useState(() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 25)
    return formatDate(d)
  })
  const [now, setNow] = useState(new Date())
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)

  // Live timer interval
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const birth = useMemo(() => parseDate(birthDate), [birthDate])
  const age = useMemo(() => calculateAge(birth, now), [birth, now])

  const isTodayBirthday = age.daysUntilBirthday === 0 || age.daysUntilBirthday === 365

  const triggerCelebration = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3500)
  }

  const handleCopy = () => {
    const text = `🎂 My Birthday Countdown:\n🎉 Turning ${age.years + 1} on ${formatDateDisplay(age.nextBirthday)} (${age.nextBirthday.toLocaleDateString("en-IN", { weekday: "long" })})\n⏳ ${age.daysUntilBirthday} Days, ${age.hoursUntilBirthday} Hours, ${age.minutesUntilBirthday} Minutes, ${age.secondsUntilBirthday} Seconds left!`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ConfettiEffect active={showConfetti || isTodayBirthday} onComplete={() => setShowConfetti(false)} />

      {/* Input & Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Controls & Info */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Birthday Countdown</h2>
              <p className="text-xs text-muted-foreground">Live ticking countdown to your next birthday</p>
            </div>
          </div>

          <DatePicker label="Your Date of Birth" value={birthDate} onChange={setBirthDate} />

          {/* Birthday Status */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-foreground">
                Turning <strong className="text-brand-600 dark:text-brand-400 font-extrabold text-base">{age.years + 1}th Birthday</strong>
              </span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 pl-6">
              <div>Date: <span className="font-medium text-foreground">{formatDateFull(age.nextBirthday)}</span></div>
              <div>Day: <span className="font-semibold text-foreground">{age.nextBirthday.toLocaleDateString("en-IN", { weekday: "long" })}</span></div>
            </div>
          </div>

          {/* Half Birthday & Current Age */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-card border border-border/70">
              <div className="text-muted-foreground font-semibold">Half-Birthday</div>
              <div className="font-bold text-foreground mt-1">{formatDateDisplay(age.halfBirthday)}</div>
              <div className="text-[11px] text-brand-600 dark:text-brand-400 mt-0.5">{age.daysUntilHalfBirthday} days left</div>
            </div>
            <div className="p-3 rounded-xl bg-card border border-border/70">
              <div className="text-muted-foreground font-semibold">Current Age</div>
              <div className="font-bold text-foreground mt-1">{age.years} yrs, {age.months} mos</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{formatNumber(age.totalDaysLived)} days lived</div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={triggerCelebration}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-medium text-sm border border-brand-200 dark:border-brand-800 transition-all cursor-pointer shadow-xs"
            >
              <PartyPopper className="w-4 h-4 text-brand-500" />
              Celebrate Birthday Blast! 🎉
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-card hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-xs border border-border transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Countdown Copied!" : "Share / Copy Countdown"}
            </button>
          </div>
        </Card>

        {/* Right Side: Live Countdown Hero */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Next Birthday"
              value={formatDateDisplay(age.nextBirthday)}
              subValue={age.nextBirthday.toLocaleDateString("en-IN", { weekday: "long" })}
              variant="highlight"
            />
            <ResultCard
              title="Days Remaining"
              value={`${age.daysUntilBirthday} Days`}
              subValue={`Turning ${age.years + 1} Yrs Old`}
              variant="principal"
            />
            <ResultCard
              title="Half-Birthday"
              value={formatDateDisplay(age.halfBirthday)}
              subValue={`in ${age.daysUntilHalfBirthday} days`}
              variant="returns"
            />
          </div>

          {/* Live Real-time Clock Grid */}
          <Card className="p-6 border-border/70 space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-brand-500 animate-spin" style={{ animationDuration: "6s" }} />
                Real-Time Countdown
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            {/* 4 Ticking Units Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-mono">
                  {String(age.daysUntilBirthday).padStart(2, "0")}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Days</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-mono">
                  {String(age.hoursUntilBirthday).padStart(2, "0")}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Hours</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-foreground font-mono">
                  {String(age.minutesUntilBirthday).padStart(2, "0")}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Minutes</div>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-brand-600 dark:text-brand-400 font-mono">
                  {String(age.secondsUntilBirthday).padStart(2, "0")}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Seconds</div>
              </div>
            </div>

            {/* Year Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Last Birthday ({age.years} yrs)</span>
                <span className="font-semibold text-foreground">{age.yearProgressPercent}% completed</span>
                <span>Next ({age.years + 1} yrs)</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${age.yearProgressPercent}%` }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Upcoming Birthday Milestones */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground">Next 6 Birthdays Preview</h3>
            <p className="text-xs text-muted-foreground">Look ahead to future party dates and weekend celebrations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {age.upcomingBirthdays.map((bday) => (
            <div
              key={bday.age}
              className="p-4 rounded-2xl bg-card border border-border/70 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-foreground">{bday.age}th Birthday</span>
                  {bday.label && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-[10px] font-bold">
                      {bday.label}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  <span>{formatDateDisplay(bday.date)}</span>
                  <span>•</span>
                  <span className="font-semibold text-foreground">{bday.dayOfWeek}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 block">
                  {bday.daysUntil} days
                </span>
                {bday.isWeekend ? (
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800">
                    🎉 Weekend
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Weekday</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
