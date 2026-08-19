import { Metadata } from "next";
import { HraCalculator } from "@/features/hra/HraCalculator";
import { Building, HelpCircle, ShieldCheck, FileText, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "HRA Calculator | Calculate House Rent Allowance Tax Exemption (Section 10(13A))",
  description: "Calculate exempt and taxable House Rent Allowance (HRA) under Section 10(13A) of Income Tax Act for metro and non-metro cities.",
};

export default function HRAPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Building className="h-3.5 w-3.5" /> Section 10(13A) Tax Relief
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          House Rent Allowance (HRA) Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Compute your eligible tax-free HRA exemption amount based on your Basic Salary, HRA received, actual rent paid, and city category.
        </p>
      </div>

      <HraCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* The 3-Rule Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> How HRA Exemption is Calculated
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Under Section 10(13A) read with Rule 2A of the Income Tax Rules, salaried employees living in rented accommodation can claim tax exemption on their HRA.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The exempt HRA is calculated as the <strong>lowest (minimum)</strong> among three statutory limits:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-muted-foreground font-medium">
              <li>Actual HRA received from your employer.</li>
              <li>50% of Basic Salary (+ DA) for Metro cities, or 40% for Non-Metro cities.</li>
              <li>Actual rent paid minus 10% of Basic Salary (+ DA).</li>
            </ol>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-600" /> Metro Cities Defined by Income Tax Dept
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For the 50% basic salary exemption criteria, only the following four cities are legally classified as Metros:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground">
              <div className="p-2.5 rounded-lg bg-card border border-border">🏛️ Mumbai</div>
              <div className="p-2.5 rounded-lg bg-card border border-border">🏛️ Delhi (NCR)</div>
              <div className="p-2.5 rounded-lg bg-card border border-border">🏛️ Kolkata</div>
              <div className="p-2.5 rounded-lg bg-card border border-border">🏛️ Chennai</div>
            </div>
            <p className="text-[11px] text-muted-foreground">
              All other major IT hubs (Bengaluru, Hyderabad, Pune, Gurugram, Ahmedabad) fall under the <strong>40% non-metro rate</strong>.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (HRA FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I claim HRA exemption under the New Tax Regime?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No. HRA exemption under Section 10(13A) is <strong>only available under the Old Tax Regime</strong>. Under the New Tax Regime, you receive an enhanced Standard Deduction of ₹75,000 instead.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I pay rent to my parents and claim HRA?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, provided the house is legally owned by your parents. You must transfer the rent via bank transfer, maintain rent receipts, and your parents must declare this rental income in their tax returns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When is landlord's PAN mandatory?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If annual rent paid exceeds <strong>₹1,00,000 (₹8,333/month)</strong>, furnishing your landlord's Permanent Account Number (PAN) to your employer is mandatory by law.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I claim both HRA and Home Loan tax deduction?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes, if you own a home in another city (or your owned home is rented out) and you live in a rented house in the city of your employment for genuine work reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
