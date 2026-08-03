"use client"

import { useState, useMemo } from "react"
import { NumberInput } from "@/components/shared/NumberInput"
import { ResultCard } from "@/components/shared/ResultCard"
import { calculateBMR } from "@/lib/healthMath"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from "lucide-react"

export function BMRCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male")
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)

  const bmr = useMemo(() => {
    return calculateBMR(weight, height, age, gender)
  }, [weight, height, age, gender])

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
                label="WEIGHT (KG)"
                value={weight}
                onChange={setWeight}
                min={20}
                max={300}
                step={1}
                prefix=""
                suffix=" kg"
              />

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-6 space-y-6">
          <ResultCard
            title="YOUR BMR (BASAL METABOLIC RATE)"
            value={bmr.toFixed(0)}
            subValue="Calories / day"
            highlight
          />
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground border border-border/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              Your Basal Metabolic Rate (BMR) represents the number of calories your body burns at rest just to maintain basic life functions (breathing, circulating blood, cell production). To calculate your total daily caloric needs, you must multiply this number by your activity level.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
