"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { AutoScaleValue } from "@/components/shared/AutoScaleValue"
import {
  calculateAge,
  calculateBirthday,
  formatDate,
  formatDateDisplay,
  formatDateFull,
  parseDate,
  formatNumber,
  AgeResult,
} from "@/lib/dateMath"
import {
  Calendar,
  CalendarDays,
  Sparkles,
  Gift,
  Clock,
  Heart,
  Moon,
  Compass,
  Copy,
  Check,
  Flame,
  Globe,
  Share2,
  Hourglass,
  Award,
  Zap,
  Info,
  Layers,
  Activity,
  Timer,
} from "lucide-react"
import { ConfettiEffect } from "@/components/shared/ConfettiEffect"

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState(() => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 25)
    return formatDate(d)
  })
  const [onDate, setOnDate] = useState(formatDate(new Date()))
  const [isLive, setIsLive] = useState(true)
  const [now, setNow] = useState(new Date())
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Live timer ticker
  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [isLive])

  const birth = useMemo(() => parseDate(birthDate), [birthDate])
  const targetDate = useMemo(() => {
    const onParsed = parseDate(onDate)
    const todayStr = formatDate(now)
    if (isLive && onDate === todayStr) {
      return now
    }
    return onParsed
  }, [onDate, now, isLive])

  const result: AgeResult = useMemo(() => {
    return calculateAge(birth, targetDate)
  }, [birth, targetDate])

  const lastBirthday = useMemo(() => {
    return calculateBirthday(birth, result.years)
  }, [birth, result.years])

  const handlePreset = (yearsAgo: number) => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - yearsAgo)
    setBirthDate(formatDate(d))
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
  }

  const handleCopySummary = () => {
    const summary = `🎂 Age Summary:\n• Age: ${result.years} Years, ${result.months} Months, ${result.days} Days\n• Born On: ${formatDateFull(birth)} (${result.dayOfWeek})\n• Zodiac: ${result.cosmic.zodiac.sign} (${result.cosmic.zodiac.symbol})\n• Days Lived: ${formatNumber(result.totalDaysLived)} days\n• Next Birthday: ${formatDateDisplay(result.nextBirthday)} (${result.daysUntilBirthday} days left)\n• Generation: ${result.cosmic.generation.name}`
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Main Grid: Controls & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Section */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Select Dates</h2>
                <p className="text-xs text-muted-foreground">Pick birth date and calculation date</p>
              </div>
            </div>

            {/* Live counter toggle */}
            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isLive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                  : "bg-muted text-muted-foreground"
              }`}
              title="Toggle live real-time ticking"
            >
              <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
              {isLive ? "Live Sync" : "Static"}
            </button>
          </div>

          <div className="space-y-4">
            <DatePicker label="Date of Birth" value={birthDate} onChange={setBirthDate} />
            <DatePicker label="Calculate Age On" value={onDate} onChange={setOnDate} />
          </div>

          {/* Quick Age Presets */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Quick Age Presets
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "18 Yrs", years: 18 },
                { label: "21 Yrs", years: 21 },
                { label: "25 Yrs", years: 25 },
                { label: "30 Yrs", years: 30 },
                { label: "40 Yrs", years: 40 },
                { label: "50 Yrs", years: 50 },
                { label: "60 Yrs", years: 60 },
                { label: "Gen 2000", years: new Date().getFullYear() - 2000 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handlePreset(item.years)}
                  className="py-1.5 px-2 text-xs font-medium rounded-lg border border-border bg-background hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950/40 dark:hover:border-brand-800 transition-all text-center cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Born info badge */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 text-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Day Born:</span>
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                {result.dayOfWeek}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs">Day of the Year:</span>
              <span className="font-medium text-foreground">Day {result.dayOfYear} of 365</span>
            </div>
            {result.isLeapYearBorn && (
              <div className="flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-medium">
                <span>Born in Leap Year:</span>
                <span>Yes (366 days)</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/50 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-medium text-sm border border-brand-200 dark:border-brand-800 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Age Summary Copied!" : "Copy Full Age Summary"}
            </button>
          </div>
        </Card>

        {/* Right Results Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Primary Age Hero Card */}
          <Card className="p-6 border-brand-200 dark:border-brand-900/80 bg-gradient-to-br from-brand-50/60 via-card to-card dark:from-brand-950/30 dark:via-card dark:to-card shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Current Chronological Age
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Born on {formatDateDisplay(birth)}
              </span>
            </div>

            {/* Big 3-Unit Stat Display */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center py-1">
              <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {result.years}
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                  Years
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {result.months}
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                  Months
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {result.days}
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                  Days
                </div>
              </div>
            </div>

            {/* Sub-Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/50 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-muted-foreground">Total Days Lived:</span>
                <span className="font-bold text-foreground font-mono">{formatNumber(result.totalDaysLived)} Days</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-muted-foreground">Next Birthday:</span>
                <span className="font-bold text-brand-600 dark:text-brand-400 font-mono">
                  in {result.daysUntilBirthday} Days
                </span>
              </div>
            </div>
          </Card>

          {/* Birthday Countdown & Progress Card */}
          <Card className="p-5 border-border/70 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                <Gift className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Upcoming Birthday Countdown
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                Turns {result.years + 1} on {formatDateDisplay(result.nextBirthday)}
              </span>
            </div>

            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, result.yearProgressPercent)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
              <span>Last: {formatDateDisplay(lastBirthday)}</span>
              <span>{result.yearProgressPercent}% of Current Age Year Completed</span>
              <span>Next: {formatDateDisplay(result.nextBirthday)}</span>
            </div>
          </Card>

          {/* Alternative Life Units Grid (2 in one row) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              Life Span in Alternative Units
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weeks */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-br from-card via-card to-blue-50/40 dark:to-blue-950/20 p-5 shadow-xs transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-900/60 shadow-2xs">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Weeks</div>
                      <div className="text-[11px] text-muted-foreground">7-day cycles lived</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-900/60">
                    Weeks
                  </span>
                </div>
                <div className="pt-1">
                  <AutoScaleValue
                    value={formatNumber(result.lifeStats.totalWeeks)}
                    className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                  />
                </div>
              </div>

              {/* Months */}
              <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/70 dark:border-emerald-900/60 bg-gradient-to-br from-card via-card to-emerald-50/40 dark:to-emerald-950/20 p-5 shadow-xs transition-all hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900/60 shadow-2xs">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Months</div>
                      <div className="text-[11px] text-muted-foreground">Calendar months lived</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-900/60">
                    Months
                  </span>
                </div>
                <div className="pt-1">
                  <AutoScaleValue
                    value={formatNumber(result.lifeStats.totalMonths)}
                    className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="group relative overflow-hidden rounded-2xl border border-amber-200/70 dark:border-amber-900/60 bg-gradient-to-br from-card via-card to-amber-50/40 dark:to-amber-950/20 p-5 shadow-xs transition-all hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-900/60 shadow-2xs">
                      <Hourglass className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Hours</div>
                      <div className="text-[11px] text-muted-foreground">24-hour cycles lived</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-900/60">
                    Hours
                  </span>
                </div>
                <div className="pt-1">
                  <AutoScaleValue
                    value={formatNumber(result.totalHoursLived)}
                    className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                  />
                </div>
              </div>

              {/* Minutes */}
              <div className="group relative overflow-hidden rounded-2xl border border-purple-200/70 dark:border-purple-900/60 bg-gradient-to-br from-card via-card to-purple-50/40 dark:to-purple-950/20 p-5 shadow-xs transition-all hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-900/60 shadow-2xs">
                      <Timer className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground">Total Minutes</div>
                      <div className="text-[11px] text-muted-foreground">60-second intervals</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-900/60">
                    Minutes
                  </span>
                </div>
                <div className="pt-1">
                  <AutoScaleValue
                    value={formatNumber(result.totalMinutesLived)}
                    className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cosmic Profile & Identity Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground">Cosmic & Generational Identity</h3>
            <p className="text-xs text-muted-foreground">Astrological signs, birth gems, and generational cohort</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Western Zodiac */}
          <Card className="p-5 border-border/70 hover:border-brand-300 dark:hover:border-brand-800 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Zodiac Sign</span>
                <h4 className="text-lg font-bold text-foreground mt-0.5 flex items-center gap-2">
                  {result.cosmic.zodiac.sign}
                  <span className="text-xl">{result.cosmic.zodiac.glyph}</span>
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{result.cosmic.zodiac.dates}</p>
              </div>
              <div className="p-2 rounded-xl bg-muted/60 text-foreground font-semibold text-xs flex items-center gap-1">
                <Flame className={`w-3.5 h-3.5 ${result.cosmic.zodiac.elementColor}`} />
                {result.cosmic.zodiac.element}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Ruling Planet:</span>
                <span className="font-medium text-foreground">{result.cosmic.zodiac.rulingPlanet}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {result.cosmic.zodiac.traits.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Chinese Zodiac */}
          <Card className="p-5 border-border/70 hover:border-brand-300 dark:hover:border-brand-800 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Chinese Zodiac</span>
                <h4 className="text-lg font-bold text-foreground mt-0.5">
                  Year of the {result.cosmic.chineseZodiac.animal}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {result.cosmic.chineseZodiac.element} • {result.cosmic.chineseZodiac.yinYang}
                </p>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 font-semibold text-xs">
                🐉
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Lucky Numbers:</span>
                <span className="font-medium text-foreground">{result.cosmic.chineseZodiac.luckyNumbers.join(", ")}</span>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Lucky Colors:</span>
                <span className="font-medium text-foreground">{result.cosmic.chineseZodiac.luckyColors.join(", ")}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {result.cosmic.chineseZodiac.traits.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Birthstone & Flower */}
          <Card className="p-5 border-border/70 hover:border-brand-300 dark:hover:border-brand-800 transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Birthstone & Flower</span>
              <div className="mt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center text-xs font-bold">
                    💎
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{result.cosmic.birthstone.name}</div>
                    <div className="text-[11px] text-muted-foreground">{result.cosmic.birthstone.meaning}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center text-xs font-bold">
                    🌸
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{result.cosmic.birthFlower.name}</div>
                    <div className="text-[11px] text-muted-foreground">{result.cosmic.birthFlower.meaning}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Generation Cohort */}
          <Card className="p-5 border-border/70 hover:border-brand-300 dark:hover:border-brand-800 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Generation</span>
                <h4 className="text-lg font-bold text-foreground mt-0.5">{result.cosmic.generation.name}</h4>
                <span className="inline-block px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 font-mono text-[11px] font-semibold mt-1">
                  {result.cosmic.generation.range}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-semibold text-xs">
                🌐
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/50 space-y-1 text-xs text-muted-foreground">
              <p className="leading-relaxed">{result.cosmic.generation.description}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Dynamic Health & Biological Milestones */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/30 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-lg font-bold text-foreground">Biological Milestones on Earth</h3>
            <p className="text-xs text-muted-foreground">
              Estimated physiological statistics since your birth on {formatDateDisplay(birth)}.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span>{formatNumber(result.lifeStats.totalDays)} Days on Earth</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Estimated Heartbeats
            </div>
            <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
              ~{formatNumber(result.lifeStats.estimatedHeartbeats)}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Based on ~72 bpm average pulse rate.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              Estimated Breaths Taken
            </div>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              ~{formatNumber(result.lifeStats.estimatedBreaths)}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Based on ~16 breaths per minute.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-amber-500" />
              Years Spent Sleeping
            </div>
            <div className="text-xl font-bold text-foreground mt-0.5 flex items-center gap-2">
              ~{result.lifeStats.estimatedSleepYears.toFixed(1)} Years
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Based on ~8 hours of sleep per night.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
