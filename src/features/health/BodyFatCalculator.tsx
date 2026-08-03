"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateBodyFat } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

export function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [neck, setNeck] = useState(38)
  const [waist, setWaist] = useState(85)
  const [hip, setHip] = useState(95)

  const { percentage, category } = useMemo(() => {
    return calculateBodyFat(gender, height, neck, waist, gender === 'female' ? hip : 0)
  }, [gender, height, neck, waist, hip])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-6 space-y-6">
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
                label="NECK (CM)"
                value={neck}
                onChange={setNeck}
                min={20}
                max={100}
                step={1}
                prefix=""
                suffix=" cm"
              />

              <NumberInput
                label="WAIST (CM)"
                value={waist}
                onChange={setWaist}
                min={30}
                max={200}
                step={1}
                prefix=""
                suffix=" cm"
              />
              
              {gender === 'female' && (
                <NumberInput
                  label="HIP (CM)"
                  value={hip}
                  onChange={setHip}
                  min={30}
                  max={200}
                  step={1}
                  prefix=""
                  suffix=" cm"
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
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
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
