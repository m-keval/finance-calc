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
  const glasses = Math.round((waterLiters * 1000) / 250); // assuming a standard glass is 250ml

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground">UNIT SYSTEM</label>
                <Tabs value={unitSystem} onValueChange={(v) => handleUnitToggle(v as "metric" | "imperial")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric">Metric (kg)</TabsTrigger>
                    <TabsTrigger value="imperial">Imperial (lbs)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <NumberInput
                label={`WEIGHT (${unitSystem === 'metric' ? 'KG' : 'LBS'})`}
                value={weight}
                onChange={setWeight}
                min={unitSystem === 'metric' ? 20 : 45}
                max={unitSystem === 'metric' ? 300 : 660}
                step={1}
                prefix=""
                suffix={unitSystem === 'metric' ? " kg" : " lbs"}
              />

              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground">
                  Climate / Weather
                </label>
                <Tabs value={climate} onValueChange={(v) => setClimate(v as "normal" | "hot")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="normal">Normal / Cool</TabsTrigger>
                    <TabsTrigger value="hot">Hot / Humid</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground">
                  Activity Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActivity(level)}
                      className={`text-left p-3 rounded-lg border text-sm transition-all ${
                        activity === level
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500"
                          : "border-border/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className="font-semibold capitalize">{level.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <ResultCard
              title="DAILY WATER INTAKE"
              value={`${waterLiters.toFixed(2)}`}
              subValue="Liters per day"
              highlight
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center justify-center space-y-2 h-full">
                <Droplet className="w-8 h-8 text-blue-500 opacity-80" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{glasses}</div>
                <div className="text-sm text-muted-foreground">Glasses (250ml)</div>
              </CardContent>
            </Card>
            <Card className="border-none bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center text-center justify-center space-y-2 h-full">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{waterOunces.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Fluid Ounces (oz)</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <p>
              Your water intake is dynamically calculated based on your body weight, increased by your physical activity level, and further adjusted if you are in a hot climate where you sweat more.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
