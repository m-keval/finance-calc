import { Metadata } from "next";
import { StepUpSIPCalculator } from "@/features/step-up-sip/StepUpSIPCalculator";
import { ArrowUpRight, HelpCircle, ShieldCheck, Zap, BookOpen, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Step-Up SIP Calculator | Top-Up Mutual Fund Wealth Growth",
  description: "Calculate how increasing your monthly SIP by a fixed percentage each year compounds your mutual fund corpus into substantial wealth.",
};

export default function StepUpSIPPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/40 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2 border border-brand-200 dark:border-brand-900">
          <ArrowUpRight className="h-3.5 w-3.5" /> Compounding Wealth Booster
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Step-Up SIP Calculator
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-3xl leading-relaxed">
          Supercharge your wealth creation by stepping up your monthly SIP installment every year in tandem with your salary increments.
        </p>
      </div>

      <StepUpSIPCalculator />

      {/* In-Depth Educational Guide & Strategies */}
      <div className="mt-16 space-y-12 border-t border-border pt-12">
        {/* Core Mathematical Concept */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-600" /> What is a Step-Up (Top-Up) SIP?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Step-Up SIP (also called Top-Up SIP) allows you to automatically increase your monthly investment by a fixed percentage (e.g. 10%) or fixed rupee amount (e.g. ₹1,000) once every year.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Because your salary and earning power grow over your career, a static SIP represents an increasingly smaller portion of your income. Stepping up ensures your savings keep pace with your career progression and outpace lifestyle inflation.
            </p>
          </div>

          <div className="rounded-2xl p-6 bg-muted/40 border border-border/70 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" /> Static SIP vs Step-Up SIP Comparison
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Starting with <strong>₹10,000/month for 15 years at 12% return</strong>:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-card border border-border flex justify-between">
                <span>Static SIP:</span>
                <span className="font-bold text-foreground">₹50.45 Lakhs</span>
              </div>
              <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/50 border border-brand-300 dark:border-brand-800 flex justify-between text-brand-700 dark:text-brand-300">
                <span>10% Step-Up SIP:</span>
                <span className="font-bold">₹91.87 Lakhs (+82% More!)</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-600" /> Frequently Asked Questions (Step-Up SIP FAQ)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">How can I activate Step-Up on my mutual fund SIP?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Most investment apps (Zerodha Coin, Groww, Kuvera) and RTAs (CAMS, KFintech) have a <strong>"Top-Up SIP" checkbox</strong> during SIP setup. You can select either a fixed percentage (e.g. 10%) or fixed amount (e.g. ₹1,000) every 6 or 12 months.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Can I set a maximum cap on my monthly Step-Up SIP?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. AMCs allow you to define an upper limit (e.g. stop increasing once monthly installment reaches ₹50,000). Once reached, the SIP continues at that fixed cap amount.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">Is Step-Up SIP better than starting a new SIP every year?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. Step-Up automates the increase on your existing folio, keeping your portfolio consolidated instead of creating dozens of separate SIP mandates and folios across multiple funds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-xs space-y-2">
              <h3 className="font-bold text-sm text-foreground">What happens if I cannot afford the higher SIP next year?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You can modify or remove the Step-Up instruction anytime through your broker or AMC portal without stopping the underlying base SIP installment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
