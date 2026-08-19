"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateIdealWeight } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

export function IdealWeightCalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)

  const handleUnitToggle = (newUnit: "metric" | "imperial") => {
    if (newUnit === unitSystem) return;
    if (newUnit === 'imperial') {
      setHeight(Math.round(height / 2.54));
    } else {
      setHeight(Math.round(height * 2.54));
    }
    setUnitSystem(newUnit);
  }

  const idealWeightMetric = useMemo(() => {
    const calcHeight = unitSystem === 'metric' ? height : height * 2.54;
    return calculateIdealWeight(gender, calcHeight)
  }, [gender, height, unitSystem])

  const idealWeight = unitSystem === 'metric' ? idealWeightMetric : idealWeightMetric * 2.20462;
  const rangeLow = idealWeight * 0.9;
  const rangeHigh = idealWeight * 1.1;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground">Gender</label>
                <Tabs value={gender} onValueChange={(v) => setGender(v as "male" | "female")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="male">Male</TabsTrigger>
                    <TabsTrigger value="female">Female</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <NumberInput label="AGE (YEARS)" value={age} onChange={setAge} min={1} max={120} step={1} prefix="" suffix=" Yr" />
              <NumberInput label={`HEIGHT (${unitSystem === 'metric' ? 'CM' : 'IN'})`} value={height} onChange={setHeight} min={unitSystem === 'metric' ? 50 : 20} max={unitSystem === 'metric' ? 300 : 120} step={1} prefix="" suffix={unitSystem === 'metric' ? " cm" : " in"} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard title="IDEAL WEIGHT" value={`${idealWeight.toFixed(1)}`} subValue={unitSystem === 'metric' ? "kg" : "lbs"} highlight />
            <ResultCard title="HEALTHY RANGE" value={`${rangeLow.toFixed(1)} - ${rangeHigh.toFixed(1)}`} subValue={unitSystem === 'metric' ? "kg" : "lbs"} />
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground border border-border/50">
            <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
            <p>Calculated using the Devine Formula. &quot;Ideal&quot; weight is a general guideline — muscle mass, bone density, and body composition are not accounted for.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
