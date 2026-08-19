"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { ResultCard } from "@/components/shared/ResultCard"
import {
  calculateDateDiff,
  calculateDoubleAgeMilestone,
  formatDate,
  formatDateDisplay,
  formatDateFull,
  parseDate,
  formatNumber,
} from "@/lib/dateMath"
import { ArrowRightLeft, User, Users, Calendar, Sparkles, Scale, HeartHandshake, Hourglass } from "lucide-react"

export function AgeDifferenceCalculator() {
  const d1 = new Date()
  d1.setFullYear(d1.getFullYear() - 30)
  const d2 = new Date()
  d2.setFullYear(d2.getFullYear() - 25)

  const [date1, setDate1] = useState(formatDate(d1))
  const [date2, setDate2] = useState(formatDate(d2))
  const [name1, setName1] = useState("First Person")
  const [name2, setName2] = useState("Second Person")

  const first = useMemo(() => parseDate(date1), [date1])
  const second = useMemo(() => parseDate(date2), [date2])

  const isP1Older = first <= second
  const olderDate = isP1Older ? first : second
  const youngerDate = isP1Older ? second : first
  const olderName = isP1Older ? name1 || "First Person" : name2 || "Second Person"
  const youngerName = isP1Older ? name2 || "Second Person" : name1 || "First Person"

  const diff = useMemo(() => calculateDateDiff(olderDate, youngerDate), [olderDate, youngerDate])
  const doubleAge = useMemo(() => calculateDoubleAgeMilestone(first, second), [first, second])

  const now = new Date()
  const p1Age = useMemo(() => calculateDateDiff(first, now), [first, now])
  const p2Age = useMemo(() => calculateDateDiff(second, now), [second, now])

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Input & Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Card */}
        <Card className="lg:col-span-5 p-6 border-brand-100 dark:border-brand-950 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Compare Two People</h2>
              <p className="text-xs text-muted-foreground">Enter names and birth dates to compare</p>
            </div>
          </div>

          {/* Person 1 Input */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Person 1
              </span>
              <span className="text-xs text-muted-foreground font-mono">{p1Age.years} yrs old</span>
            </div>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Person 1 Name"
              className="w-full px-3 py-1.5 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <DatePicker label="Birth Date" value={date1} onChange={setDate1} />
          </div>

          {/* Person 2 Input */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Person 2
              </span>
              <span className="text-xs text-muted-foreground font-mono">{p2Age.years} yrs old</span>
            </div>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Person 2 Name"
              className="w-full px-3 py-1.5 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <DatePicker label="Birth Date" value={date2} onChange={setDate2} />
          </div>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              title="Age Gap"
              value={`${diff.years}Y ${diff.months}M ${diff.days}D`}
              subValue={`${olderName} is older than ${youngerName}`}
              variant="highlight"
            />
            <ResultCard
              title="Difference in Days"
              value={`${formatNumber(diff.totalDays)} Days`}
              subValue={`${formatNumber(diff.totalWeeks)} Full Weeks`}
              variant="principal"
            />
            <ResultCard
              title="Double-Age Milestone"
              value={doubleAge ? formatDateDisplay(doubleAge.milestoneDate) : "Passed"}
              subValue={
                doubleAge
                  ? `${doubleAge.olderAgeAtMilestone} vs ${doubleAge.youngerAgeAtMilestone} yrs old`
                  : "Milestone already occurred"
              }
              variant="returns"
            />
          </div>

          {/* Side-by-Side Comparison Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 border-border/70 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">{name1 || "Person 1"}</h4>
                <span className="text-xs text-muted-foreground font-mono">{formatDateDisplay(first)}</span>
              </div>
              <div className="text-xl font-bold text-brand-600 dark:text-brand-400">
                {p1Age.years} Yrs, {p1Age.months} Mos, {p1Age.days} Days
              </div>
              <div className="text-xs text-muted-foreground pt-1 border-t border-border/40">
                Total Days Lived: <strong>{formatNumber(p1Age.totalDays)} days</strong>
              </div>
            </Card>

            <Card className="p-5 border-border/70 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-foreground">{name2 || "Person 2"}</h4>
                <span className="text-xs text-muted-foreground font-mono">{formatDateDisplay(second)}</span>
              </div>
              <div className="text-xl font-bold text-foreground">
                {p2Age.years} Yrs, {p2Age.months} Mos, {p2Age.days} Days
              </div>
              <div className="text-xs text-muted-foreground pt-1 border-t border-border/40">
                Total Days Lived: <strong>{formatNumber(p2Age.totalDays)} days</strong>
              </div>
            </Card>
          </div>

          {/* Double Age Milestone Card */}
          {doubleAge && (
            <Card className="p-5 border-border/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Double Age Milestone Prediction
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                On <strong>{formatDateFull(doubleAge.milestoneDate)}</strong>, {olderName} will be exactly twice as old as {youngerName} ({doubleAge.olderAgeAtMilestone} years vs {doubleAge.youngerAgeAtMilestone} years old).
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Dynamic Interpretation Section */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-brand-50 via-card to-emerald-50/30 dark:from-brand-950/40 dark:via-card dark:to-emerald-950/20 border border-brand-200 dark:border-brand-900/60 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-lg font-bold text-foreground">Age Comparison Insights</h3>
            <p className="text-xs text-muted-foreground">
              Comparing life timelines between {name1} and {name2}.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-brand-600 dark:text-brand-400">
            <span>{diff.years} Years {diff.months} Months Gap</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Seniority Advantage</div>
            <div className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
              {olderName}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Born {formatNumber(diff.totalDays)} days earlier.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Age Ratio</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {p2Age.totalDays > 0 ? (p1Age.totalDays / p2Age.totalDays).toFixed(2) : 1}x Ratio
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Current comparative age multiplier.</div>
          </div>

          <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
            <div className="text-xs text-muted-foreground font-medium">Generational Gap</div>
            <div className="text-xl font-bold text-foreground mt-0.5">
              {diff.years < 3 ? "Peers / Cohort" : diff.years < 10 ? "Close Age" : "Cross-Generation"}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Demographic relationship classification.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
