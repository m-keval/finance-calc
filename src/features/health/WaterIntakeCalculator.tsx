"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateWaterIntake, ACTIVITY_MULTIPLIERS } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Droplet } from "lucide-react"

type ActivityLevel = keyof typeof ACTIVITY_MULTIPLIERS;

export function WaterIntakeCalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
  const [weight, setWeight] = useState(65)
  const [activity, setActivity] = useState<ActivityLevel>("moderate")
  const [climate, setClimate] = useState<"normal" | "hot">("normal")

  const handleUnitToggle = (newUnit: "metric" | "imperial") => {
    if (newUnit === unitSystem) return;
    if (newUnit === 'imperial') {
      setWeight(Math.round(weight * 2.20462));
    } else {
      setWeight(Math.round(weight / 2.20462));
    }
    setUnitSystem(newUnit);
  }

  const waterLiters = useMemo(() => {
    const calcWeight = unitSystem === 'metric' ? weight : weight / 2.20462;
    return calculateWaterIntake(calcWeight, activity, climate)
  }, [weight, activity, climate, unitSystem])

  const waterOunces = waterLiters * 33.814;
  const glasses = Math.round((waterLiters * 1000) / 250);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-4">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">UNIT SYSTEM</label>
                <Tabs value={unitSystem} onValueChange={(v) => handleUnitToggle(v as "metric" | "imperial")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric">Metric (kg)</TabsTrigger>
                    <TabsTrigger value="imperial">Imperial (lbs)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <NumberInput label={`WEIGHT (${unitSystem === 'metric' ? 'KG' : 'LBS'})`} value={weight} onChange={setWeight} min={unitSystem === 'metric' ? 20 : 45} max={unitSystem === 'metric' ? 300 : 660} step={1} prefix="" suffix={unitSystem === 'metric' ? " kg" : " lbs"} />
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Climate</label>
                <Tabs value={climate} onValueChange={(v) => setClimate(v as "normal" | "hot")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="normal">Normal / Cool</TabsTrigger>
                    <TabsTrigger value="hot">Hot / Humid</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Activity Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => (
                    <button key={level} onClick={() => setActivity(level)} className={`text-left p-2 rounded-lg border text-xs transition-all ${activity === level ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-800 dark:text-brand-300 ring-1 ring-brand-500" : "border-border/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground"}`}>
                      <div className="font-semibold capitalize">{level.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <ResultCard title="DAILY WATER INTAKE" value={`${waterLiters.toFixed(2)}`} subValue="Liters per day" highlight />

          <div className="grid grid-cols-2 gap-3">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-3 flex items-center gap-3">
                <Droplet className="w-6 h-6 text-blue-500 opacity-80 shrink-0" />
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{glasses}</div>
                  <div className="text-xs text-muted-foreground">Glasses (250ml)</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-3 flex items-center gap-3">
                <div>
                  <div className="text-lg font-bold text-brand-600 dark:text-brand-400">{waterOunces.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Fluid Ounces</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground border border-border/50">
            <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <p>Calculated based on body weight, activity level, and climate. Adjust for your individual needs.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
