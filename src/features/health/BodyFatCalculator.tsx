"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateBodyFat } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

export function BodyFatCalculator() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [neck, setNeck] = useState(38)
  const [waist, setWaist] = useState(85)
  const [hip, setHip] = useState(95)

  const handleUnitToggle = (newUnit: "metric" | "imperial") => {
    if (newUnit === unitSystem) return;
    if (newUnit === 'imperial') {
      setHeight(Math.round(height / 2.54));
      setNeck(Math.round(neck / 2.54));
      setWaist(Math.round(waist / 2.54));
      setHip(Math.round(hip / 2.54));
    } else {
      setHeight(Math.round(height * 2.54));
      setNeck(Math.round(neck * 2.54));
      setWaist(Math.round(waist * 2.54));
      setHip(Math.round(hip * 2.54));
    }
    setUnitSystem(newUnit);
  }

  const { percentage, category } = useMemo(() => {
    const calcHeight = unitSystem === 'metric' ? height : height * 2.54;
    const calcNeck = unitSystem === 'metric' ? neck : neck * 2.54;
    const calcWaist = unitSystem === 'metric' ? waist : waist * 2.54;
    const calcHip = unitSystem === 'metric' ? hip : hip * 2.54;
    return calculateBodyFat(gender, calcHeight, calcNeck, calcWaist, gender === 'female' ? calcHip : 0)
  }, [gender, height, neck, waist, hip, unitSystem])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="border-none bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 space-y-8">
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">UNIT SYSTEM</label>
                <Tabs value={unitSystem} onValueChange={(v) => handleUnitToggle(v as "metric" | "imperial")} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metric">Metric (cm)</TabsTrigger>
                    <TabsTrigger value="imperial">Imperial (in)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

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
                label={`HEIGHT (${unitSystem === 'metric' ? 'CM' : 'IN'})`}
                value={height}
                onChange={setHeight}
                min={unitSystem === 'metric' ? 50 : 20}
                max={unitSystem === 'metric' ? 300 : 120}
                step={1}
                prefix=""
                suffix={unitSystem === 'metric' ? " cm" : " in"}
              />

              <NumberInput
                label={`NECK (${unitSystem === 'metric' ? 'CM' : 'IN'})`}
                value={neck}
                onChange={setNeck}
                min={unitSystem === 'metric' ? 20 : 8}
                max={unitSystem === 'metric' ? 100 : 40}
                step={1}
                prefix=""
                suffix={unitSystem === 'metric' ? " cm" : " in"}
              />

              <NumberInput
                label={`WAIST (${unitSystem === 'metric' ? 'CM' : 'IN'})`}
                value={waist}
                onChange={setWaist}
                min={unitSystem === 'metric' ? 30 : 12}
                max={unitSystem === 'metric' ? 200 : 80}
                step={1}
                prefix=""
                suffix={unitSystem === 'metric' ? " cm" : " in"}
              />
              
              {gender === 'female' && (
                <NumberInput
                  label={`HIP (${unitSystem === 'metric' ? 'CM' : 'IN'})`}
                  value={hip}
                  onChange={setHip}
                  min={unitSystem === 'metric' ? 30 : 12}
                  max={unitSystem === 'metric' ? 200 : 80}
                  step={1}
                  prefix=""
                  suffix={unitSystem === 'metric' ? " cm" : " in"}
                />
              )}

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              title="BODY FAT %"
              value={`${percentage.toFixed(1)}%`}
              highlight
            />
            <ResultCard
              title="CATEGORY"
              value={category}
            />
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p>
                Calculated using the <strong>U.S. Navy Method</strong>, which estimates body fat based on circumference measurements.
              </p>
              <p>
                <em>How to measure:</em> Measure your waist exactly at the navel. Measure your neck below the larynx sloping slightly downward. For females, measure hips at the widest horizontal circumference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
