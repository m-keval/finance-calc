"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { BMIGauge } from "./BMIGauge"
import { calculateBMI } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Activity, Heart, Apple, Dumbbell, ShieldAlert, Sparkles } from "lucide-react"

export function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)

  const handleUnitToggle = (newUnit: "metric" | "imperial") => {
    if (newUnit === unitSystem) return
    if (newUnit === "imperial") {
      setHeight(Math.round(height / 2.54))
      setWeight(Math.round(weight * 2.20462))
    } else {
      setHeight(Math.round(height * 2.54))
      setWeight(Math.round(weight / 2.20462))
    }
    setUnitSystem(newUnit)
  }

  const { score, category } = useMemo(() => {
    const calcWeight = unitSystem === "metric" ? weight : weight / 2.20462
    const calcHeight = unitSystem === "metric" ? height : height * 2.54
    return calculateBMI(calcWeight, calcHeight)
  }, [weight, height, unitSystem])

  const idealWeightRange = useMemo(() => {
    const heightInMeters = unitSystem === "metric" ? height / 100 : (height * 2.54) / 100
    const minKg = 18.5 * heightInMeters * heightInMeters
    const maxKg = 24.9 * heightInMeters * heightInMeters

    if (unitSystem === "metric") {
      return `${minKg.toFixed(1)} kg – ${maxKg.toFixed(1)} kg`
    } else {
      return `${(minKg * 2.20462).toFixed(1)} lbs – ${(maxKg * 2.20462).toFixed(1)} lbs`
    }
  }, [height, unitSystem])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">UNIT SYSTEM</label>
                <Tabs value={unitSystem} onValueChange={(v) => handleUnitToggle(v as "metric" | "imperial")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
                    <TabsTrigger value="imperial">Imperial (in, lbs)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <NumberInput label="AGE (YEARS)" value={age} onChange={setAge} min={1} max={120} step={1} prefix="" suffix=" Yr" />
              <NumberInput label={`HEIGHT (${unitSystem === "metric" ? "CM" : "IN"})`} value={height} onChange={setHeight} min={unitSystem === "metric" ? 50 : 20} max={unitSystem === "metric" ? 300 : 120} step={1} prefix="" suffix={unitSystem === "metric" ? " cm" : " in"} />
              <NumberInput label={`WEIGHT (${unitSystem === "metric" ? "KG" : "LBS"})`} value={weight} onChange={setWeight} min={unitSystem === "metric" ? 20 : 45} max={unitSystem === "metric" ? 300 : 660} step={1} prefix="" suffix={unitSystem === "metric" ? " kg" : " lbs"} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <BMIGauge score={score} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard title="YOUR BMI SCORE" value={score.toFixed(1)} highlight />
            <ResultCard title="CATEGORY" value={category} />
          </div>

          <Card className="border-none bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 tracking-tight">BMI Categories (WHO Standard)</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs items-center p-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
                  <span>Underweight</span><span className="font-medium">&lt; 18.5</span>
                </div>
                <div className="flex justify-between text-xs items-center p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <span>Normal weight</span><span className="font-medium">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between text-xs items-center p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  <span>Overweight</span><span className="font-medium">25 - 29.9</span>
                </div>
                <div className="flex justify-between text-xs items-center p-2 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400">
                  <span>Obese</span><span className="font-medium">&ge; 30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dynamic Result Interpretation & Health Guidance Section */}
      <div className="mt-10 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-50 via-card to-brand-50/30 dark:from-emerald-950/40 dark:via-card dark:to-brand-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Body Composition & Health Insights
                </h3>
                <p className="text-xs text-muted-foreground">
                  Personalized wellness interpretation based on your BMI of {score.toFixed(1)} ({category}).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Target Weight: {idealWeightRange}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Ideal Normal Range</div>
              <div className="text-base font-bold text-foreground mt-0.5">{idealWeightRange}</div>
              <div className="text-[11px] text-muted-foreground mt-1">Healthy BMI range of 18.5–24.9.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Health Risk Classification</div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {score < 18.5 ? "Nutrient Deficiency Risk" : score <= 24.9 ? "Lowest Cardiovascular Risk" : score <= 29.9 ? "Moderate Health Risk" : "High Risk (Cardiovascular / Diabetes)"}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">Based on WHO clinical guidelines.</div>
            </div>

            <div className="p-3.5 rounded-xl bg-card/80 border border-border/60">
              <div className="text-xs text-muted-foreground font-medium">Daily Activity Target</div>
              <div className="text-base font-bold text-brand-600 dark:text-brand-400 mt-0.5">150 mins / week</div>
              <div className="text-[11px] text-muted-foreground mt-1">Moderate aerobic exercise recommendation.</div>
            </div>
          </div>
        </div>

        {/* 4 Health Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <Apple className="h-4 w-4 text-emerald-600" /> 1. Balanced Nutrition Strategy
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Focus on whole foods, lean proteins, complex carbohydrates, and high-fiber vegetables. Minimize ultra-processed foods, refined sugars, and trans fats to optimize visceral fat levels.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-brand-600" /> 2. Strength & Resistance Training
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Include resistance training 2–3 times a week. Building lean muscle mass increases your resting metabolic rate (BMR), ensuring healthy long-term weight management.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" /> 3. Beyond BMI: Waist-to-Hip Ratio
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              BMI cannot distinguish between muscle mass and body fat. Athletes may have a high BMI due to muscle. Also measure your waist circumference (ideally &lt; 90cm for men, &lt; 80cm for women in Asian populations).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs">
            <h4 className="font-bold text-sm text-foreground mb-2 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-600" /> 4. Medical Consultation
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              BMI is a screening tool, not a diagnostic measure. Consult a registered dietitian or physician for personalized health advice, lipid profiles, and blood glucose testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
