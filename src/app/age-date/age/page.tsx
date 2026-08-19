import { Metadata } from "next";
import { AgeCalculator } from "@/features/age-date/AgeCalculator";
import { Calendar, HelpCircle, Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Age Calculator | Exact Chronological Age, Days, Hours & Next Birthday",
  description: "Calculate your exact age in years, months, weeks, days, hours, and minutes from your date of birth, complete with zodiac sign and next birthday countdown.",
};

export default function AgePage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Calendar className="h-3.5 w-3.5" /> Chronological Precision
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Age Calculator</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Calculate your exact age in years, months, and days, along with fascinating life milestones and your upcoming birthday countdown.
        </p>
      </div>

      <AgeCalculator />

      {/* Educational & Guide Section */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> How Exact Age is Calculated
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our calculator uses precise calendar arithmetic accounting for varying days in months (28, 29, 30, or 31 days) and leap years (366 days).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The age system used follows the international standard where a person starts at age 0 on the day of birth and becomes 1 year older on each birthday.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-600" /> Fun Life Milestones Tracked
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Total Days Lived:</strong> Number of 24-hour cycles on Earth.</li>
              <li><strong>Estimated Breaths & Heartbeats:</strong> Based on standard human resting averages (~16 breaths/min and ~72 bpm).</li>
              <li><strong>Western Zodiac Sign:</strong> Determined by astronomical solar coordinates.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Age FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How does the calculator handle leap years?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The algorithm dynamically checks for leap years (years divisible by 4, except centuries not divisible by 400) so February 29 is accurately calculated in total day counts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I calculate my age on a past or future date?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, by changing the target "Age at Date" field, you can determine how old you were during a historical event or how old you will be on a future date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
