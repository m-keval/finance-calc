import { Metadata } from "next";
import { BMICalculator } from "@/features/health/BMICalculator";
import { Heart, Activity, HelpCircle, ShieldCheck, Scale, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "BMI Calculator | Calculate Body Mass Index & Healthy Weight Range",
  description: "Calculate your Body Mass Index (BMI) using metric or imperial units, view WHO weight classifications, and find your ideal healthy weight target.",
};

export default function BMIPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 dark:bg-rose-950/40 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300 mb-2 border border-rose-200 dark:border-rose-900">
          <Heart className="h-3.5 w-3.5" /> Body Composition Metrics
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          BMI Calculator (Body Mass Index)
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Accurately calculate your Body Mass Index (BMI), identify your weight category according to World Health Organization (WHO) standards, and discover your ideal weight range.
        </p>
      </div>

      <BMICalculator />

      {/* In-Depth Educational Guide & Health Information */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Understanding BMI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> What is Body Mass Index (BMI)?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Body Mass Index (BMI) is an internationally recognized screening metric used by physicians and healthcare professionals to evaluate whether a person has a healthy body weight relative to their height.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The formula was developed by Belgian mathematician Adolphe Quetelet and is defined as body mass divided by the square of body height: <code>BMI = Weight (kg) ÷ [Height (m)]²</code>.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Scale className="h-4 w-4 text-brand-600" /> WHO BMI Classifications
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium">
                <span>Underweight:</span> <span>&lt; 18.5 kg/m²</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium">
                <span>Normal Healthy Weight:</span> <span>18.5 – 24.9 kg/m²</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium">
                <span>Overweight:</span> <span>25.0 – 29.9 kg/m²</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-400 font-medium">
                <span>Obesity (Class I, II, III):</span> <span>&ge; 30.0 kg/m²</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (BMI FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Why can BMI sometimes be misleading for athletes?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                BMI only measures total body mass and does not distinguish between dense muscle mass and adipose fat tissue. Muscular athletes and bodybuilders often have a BMI in the "Overweight" or "Obese" range despite having low body fat percentages.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Are BMI cut-offs different for Asian populations?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. Due to higher abdominal visceral fat risk at lower body weights, the WHO recommends Asian cut-offs: Overweight begins at <strong>23.0 kg/m²</strong> and Obesity begins at <strong>27.5 kg/m²</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What other health metrics should I track alongside BMI?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Physicians recommend tracking <strong>Waist Circumference</strong> (&lt; 90cm for men, &lt; 80cm for women), Body Fat Percentage, Blood Pressure, and Fasting Lipid Profiles for a comprehensive health assessment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How can I safely reach a normal BMI range?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Target a gradual, sustainable weight loss of 0.5 kg to 1 kg per week through a moderate caloric deficit (300-500 kcal/day), high protein intake, 150 minutes of weekly exercise, and 7-8 hours of sleep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
