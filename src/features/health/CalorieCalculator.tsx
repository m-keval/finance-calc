"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateBMR, calculateDailyCalories, ACTIVITY_MULTIPLIERS, GOAL_ADJUSTMENTS } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

type ActivityLevel = keyof typeof ACTIVITY_MULTIPLIERS;
type Goal = keyof typeof GOAL_ADJUSTMENTS;

export function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)
  const [activity, setActivity] = useState<ActivityLevel>("moderate")
  const [goal, setGoal] = useState<Goal>("maintain")

  const results = useMemo(() => {
    const bmr = calculateBMR(weight, height, age, gender)
    const calories = calculateDailyCalories(bmr, activity, goal)
    return { bmr, calories }
  }, [weight, height, age, gender, activity, goal])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Gender
                </label>
                <Tabs value={gender} onValueChange={(v) => setGender(v as "male" | "female")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="male">Male</TabsTrigger>
                    <TabsTrigger value="female">Female</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <NumberInput
                label="AGE (YEARS)"
                value={age}
                onChange={setAge}
                min={1}
                max={120}
                step={1}
                prefix=""
                suffix=" Yr"
              />

              <NumberInput
                label="HEIGHT (CM)"
                value={height}
                onChange={setHeight}
                min={50}
                max={300}
                step={1}
                prefix=""
                suffix=" cm"
              />
              
              <NumberInput
                label="WEIGHT (KG)"
                value={weight}
                onChange={setWeight}
                min={20}
                max={300}
                step={1}
                prefix=""
                suffix=" kg"
              />

              <div className="space-y-3 mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Activity Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActivity(level)}
                      className={`text-left p-3 rounded-lg border text-sm transition-all ${
                        activity === level
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500"
                          : "border-border/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="font-semibold capitalize">{level.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Your Goal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(Object.keys(GOAL_ADJUSTMENTS) as Goal[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`text-center p-3 rounded-lg border text-sm transition-all ${
                        goal === g
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500"
                          : "border-border/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="font-semibold capitalize">{g.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </button>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-5 space-y-6">
          <ResultCard
            title="DAILY CALORIE TARGET"
            value={results.calories.toFixed(0)}
            subValue="Calories / day"
            highlight
          />

          <Card className="border-none bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 tracking-tight">Macro Breakdown (Balanced)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
                  <div>
                    <span className="font-semibold block">Carbs (50%)</span>
                    <span className="text-xs opacity-80">4 calories / gram</span>
                  </div>
                  <span className="font-medium text-lg">{((results.calories * 0.5) / 4).toFixed(0)}g</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-400">
                  <div>
                    <span className="font-semibold block">Protein (30%)</span>
                    <span className="text-xs opacity-80">4 calories / gram</span>
                  </div>
                  <span className="font-medium text-lg">{((results.calories * 0.3) / 4).toFixed(0)}g</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  <div>
                    <span className="font-semibold block">Fats (20%)</span>
                    <span className="text-xs opacity-80">9 calories / gram</span>
                  </div>
                  <span className="font-medium text-lg">{((results.calories * 0.2) / 9).toFixed(0)}g</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              This is an estimate based on the Mifflin-St Jeor equation. Adjust your intake based on your real-world progress. Never consume less than 1,200 calories without medical supervision.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
