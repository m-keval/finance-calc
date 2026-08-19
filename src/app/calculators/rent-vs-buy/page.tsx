import { Metadata } from "next";
import { RentVsBuyCalculator } from "@/features/rent-vs-buy/RentVsBuyCalculator";
import { Home, HelpCircle, Scale, DollarSign, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator | Real Estate vs Mutual Fund Opportunity Cost",
  description: "Compare the financial return of buying a house on home loan vs renting and investing your surplus savings in equity mutual funds.",
};

export default function RentVsBuyPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <Home className="h-3.5 w-3.5" /> Housing Decision Matrix
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Rent vs. Buy Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Evaluate the total financial cost of buying a home on EMI versus renting and investing your down payment and monthly savings in equity markets.
        </p>
      </div>

      <RentVsBuyCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Mathematical Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> The Math Behind Renting vs. Buying
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Buying a home involves substantial upfront cash (20% down payment, 6-8% stamp duty/registration), long-term loan interest (often equaling 80-100% of the loan amount), property maintenance, and municipal taxes.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Renting requires low upfront outlay and lower monthly rent payments (rental yield in top Indian cities is just <strong>2.5% to 3.5%</strong>). If the money saved (down payment + difference between EMI and rent) is invested in equity generating <strong>12-14% CAGR</strong>, renting frequently generates higher net financial wealth over 10-20 years.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Scale className="h-4 w-4 text-brand-600" /> Key Financial Comparison Drivers
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><strong>Property Appreciation:</strong> Typically 5%–8% p.a. for residential real estate in India.</li>
              <li><strong>Investment Returns:</strong> Historical 12%–14% CAGR for diversified equity mutual funds.</li>
              <li><strong>Rental Inflation:</strong> Annual rent hike typically 5%–7% in metropolitan areas.</li>
              <li><strong>Sunk Costs:</strong> Loan interest, property taxes, maintenance, and registration fees.</li>
            </ul>
          </div>
        </div>

        {/* The 5-Year Rule & Guidelines */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" /> The 5-Year Rule for Homeownership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When You Should Rent</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you plan to stay in the city for <strong>less than 5 to 7 years</strong>, your career requires geographic mobility, or property prices in your area are over 30x annual rent (Price-to-Rent ratio &gt; 30).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">When You Should Buy</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you are settled in your permanent city for <strong>10+ years</strong>, have a stable career, have accumulated a 20%+ down payment plus an emergency fund, and value emotional security and pride of ownership.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Rent vs Buy FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What is the Price-to-Rent ratio?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Price-to-Rent ratio is calculated as <code>Property Price ÷ Annual Rent</code>. A ratio above 25-30 strongly favors renting from a pure financial perspective, whereas a ratio below 15-20 favors buying.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Is paying rent really "throwing money away"?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No. Rent pays for the shelter and utility of living in a home without incurring the massive interest, registration, maintenance, and illiquidity costs of owning a property.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What hidden costs come with buying a home?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Beyond the sticker price, buyers must budget 5-7% for stamp duty and registration, 1-2% brokerage, interior furnishings (10-15%), society maintenance charges, and annual property taxes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How does tax deduction affect the buying decision?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Under the Old Tax Regime, Section 24b saves up to ₹60,000/year (for 30% slab on ₹2L interest), which reduces effective loan interest, but does not completely offset the high opportunity cost of capital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
