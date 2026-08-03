"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateIdealWeight } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

export function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)

  const idealWeight = useMemo(() => {
    return calculateIdealWeight(gender, height)
  }, [gender, height])

  // Calculate a healthy range around the ideal weight (+/- 10%)
  const rangeLow = idealWeight * 0.9;
  const rangeHigh = idealWeight * 1.1;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
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

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard
              title="IDEAL WEIGHT"
              value={`${idealWeight.toFixed(1)}`}
              subValue="Kilograms (kg)"
              highlight
            />
            <ResultCard
              title="HEALTHY RANGE"
              value={`${rangeLow.toFixed(1)} - ${rangeHigh.toFixed(1)}`}
              subValue="Kilograms (kg)"
            />
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p>
                Calculated using the <strong>Devine Formula</strong>, which is the most widely used formula for estimating ideal body weight.
              </p>
              <p>
                Keep in mind that "ideal" weight is a general medical guideline. Factors like muscle mass, bone density, and body composition are not accounted for in this simple height-based calculation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
