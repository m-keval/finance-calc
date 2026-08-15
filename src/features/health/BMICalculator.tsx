"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { BMIGauge } from "./BMIGauge"
import { calculateBMI } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

export function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric')
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)

  const handleUnitToggle = (newUnit: 'metric' | 'imperial') => {
    if (newUnit === unitSystem) return;
    if (newUnit === 'imperial') {
      setHeight(Math.round(height / 2.54));
      setWeight(Math.round(weight * 2.20462));
    } else {
      setHeight(Math.round(height * 2.54));
      setWeight(Math.round(weight / 2.20462));
    }
    setUnitSystem(newUnit);
  }

  const { score, category } = useMemo(() => {
    const calcWeight = unitSystem === 'metric' ? weight : weight / 2.20462;
    const calcHeight = unitSystem === 'metric' ? height : height * 2.54;
    return calculateBMI(calcWeight, calcHeight)
  }, [weight, height, unitSystem])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">UNIT SYSTEM</label>
                <Tabs value={unitSystem} onValueChange={(v) => handleUnitToggle(v as 'metric' | 'imperial')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric">Metric (cm, kg)</TabsTrigger>
                    <TabsTrigger value="imperial">Imperial (in, lbs)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <NumberInput label="AGE (YEARS)" value={age} onChange={setAge} min={1} max={120} step={1} prefix="" suffix=" Yr" />
              <NumberInput label={`HEIGHT (${unitSystem === 'metric' ? 'CM' : 'IN'})`} value={height} onChange={setHeight} min={unitSystem === 'metric' ? 50 : 20} max={unitSystem === 'metric' ? 300 : 120} step={1} prefix="" suffix={unitSystem === 'metric' ? " cm" : " in"} />
              <NumberInput label={`WEIGHT (${unitSystem === 'metric' ? 'KG' : 'LBS'})`} value={weight} onChange={setWeight} min={unitSystem === 'metric' ? 20 : 45} max={unitSystem === 'metric' ? 300 : 660} step={1} prefix="" suffix={unitSystem === 'metric' ? " kg" : " lbs"} />
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
              <h3 className="text-sm font-semibold mb-3 tracking-tight">BMI Categories</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs items-center p-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
                  <span>Underweight</span><span className="font-medium">&lt; 18.5</span>
                </div>
                <div className="flex justify-between text-xs items-center p-2 rounded-lg bg-brand-500/10 text-brand-700 dark:text-brand-400">
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

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground border border-border/50">
            <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <p>BMI is a useful measure of overweight and obesity. It is calculated from your height and weight.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
