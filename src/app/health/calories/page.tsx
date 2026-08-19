import { Metadata } from "next";
import { CalorieCalculator } from "@/features/health/CalorieCalculator";
import { Flame, HelpCircle, Activity, Apple, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Calorie Calculator | Calculate Daily TDEE & Macronutrient Needs",
  description: "Calculate your Total Daily Energy Expenditure (TDEE), Basal Metabolic Rate (BMR), and daily calories required for weight loss, maintenance, or muscle gain.",
};

export default function CaloriePage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-950/40 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-300 mb-2 border border-orange-200 dark:border-orange-900">
          <Flame className="h-3.5 w-3.5" /> Energy & Metabolic Science
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Daily Calorie & Macronutrient Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Determine your exact daily caloric targets for fat loss, muscle building, or body recomposition based on your Mifflin-St Jeor metabolic profile.
        </p>
      </div>

      <CalorieCalculator />

      {/* In-Depth Educational Guide & Nutrition Rules */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Concepts: BMR vs TDEE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> BMR vs. TDEE: What's the Difference?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at complete rest just to keep vital organs functioning (heart beating, lungs breathing, cells regenerating).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Total Daily Energy Expenditure (TDEE)</strong> is your total daily calorie burn after factoring in your physical activity level, work routine, and exercise regimen.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> The Mifflin-St Jeor BMR Formula
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Considered the gold standard for clinical metabolic estimation:
            </p>
            <div className="space-y-1.5 font-mono text-xs text-brand-700 dark:text-brand-300">
              <div className="p-2 rounded bg-card border border-border">Men: (10 × W) + (6.25 × H) - (5 × A) + 5</div>
              <div className="p-2 rounded bg-card border border-border">Women: (10 × W) + (6.25 × H) - (5 × A) - 161</div>
            </div>
            <p className="text-[11px] text-muted-foreground">W = Weight (kg), H = Height (cm), A = Age (years).</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Calorie FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How big of a calorie deficit should I create for fat loss?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A moderate deficit of <strong>300 to 500 calories below your TDEE</strong> is optimal. This produces a steady, healthy fat loss of ~0.5 kg per week while preserving lean muscle mass and preventing metabolic slowdown.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How much protein should I eat per day?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                For active individuals and weight training, sports nutritionists recommend <strong>1.6g to 2.2g of protein per kilogram of body weight</strong> to maximize muscle protein synthesis and satiety.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the "Starvation Mode" myth?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                While extreme crash diets do cause adaptive thermogenesis (lowering NEAT and energy expenditure), your body will still lose weight in a verified calorie deficit. However, severe restriction leads to muscle loss and fatigue.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How should I adjust calories when my weight plateaus?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As your body weight drops, your BMR and TDEE naturally decrease. Recalculate your TDEE every 4-5 kg of weight change or slightly increase daily step counts (NEAT).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
