import Link from "next/link";
import { ArrowRight, Calculator, PieChart, TrendingUp, PiggyBank, ShieldCheck, Zap, Target, ArrowUpRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DummyAd } from "@/components/shared/DummyAd";

export default function Home() {
  const calculators = [
    {
      title: "SIP Calculator",
      description: "Calculate how much your monthly investments can grow over time with the power of compounding.",
      icon: <TrendingUp className="h-6 w-6 text-indigo-500" />,
      href: "/calculators/sip",
    },
    {
      title: "Step-up SIP",
      description: "Supercharge your wealth by increasing your SIP amount every year as your income grows.",
      icon: <ArrowUpRight className="h-6 w-6 text-indigo-500" />,
      href: "/calculators/step-up-sip",
    },
    {
      title: "Goal Planning",
      description: "Work backwards from your target amount to find out exactly how much you need to invest today.",
      icon: <Target className="h-6 w-6 text-indigo-500" />,
      href: "/calculators/goal",
    },
    {
      title: "FD Calculator",
      description: "Calculate the maturity amount and interest earned on your Fixed Deposit.",
      icon: <PiggyBank className="h-6 w-6 text-indigo-500" />,
      href: "/calculators/fd",
    },
    {
      title: "Loan Calculator",
      description: "Calculate your Equated Monthly Installment (EMI) for any loan and see the amortization schedule.",
      icon: <PieChart className="h-6 w-6 text-indigo-500" />,
      href: "/calculators/loan-emi",
    },
    {
      title: "Inflation Calculator",
      description: "Understand how inflation erodes purchasing power and calculate the future cost of current expenses.",
      icon: <Calculator className="h-6 w-6 text-indigo-500" />,
      href: "/calculators/inflation",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mb-6">
            New & Improved Calculators
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
            Smart Financial Calculators for the <span className="text-indigo-600 dark:text-indigo-400">Modern Investor</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10">
            Make better financial decisions with our fast, accurate, and beautifully designed calculators. Planning your wealth has never been easier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#calculators" className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base font-medium" })}>
              Explore Calculators <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/blog" className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-8 text-base font-medium" })}>
              Read our Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement 1 */}
      <div className="w-full py-8 border-b border-border/30 bg-background/50 flex justify-center items-center">
        <DummyAd type="horizontal" className="mx-auto" />
      </div>

      {/* Finance Calculators Grid */}
      <section id="finance-calculators" className="py-20 bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Finance Calculators</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to calculate returns, plan loans, and manage your financial future.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {calculators.map((calc, i) => (
              <Link key={i} href={calc.href} className="group flex h-full">
                <Card className="flex-1 transition-all duration-300 hover:border-indigo-500/50 dark:hover:border-indigo-500/30 cursor-pointer">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/20 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/40 transition-colors">
                      {calc.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{calc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {calc.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placement 2 */}
      <div className="w-full py-12 flex justify-center items-center">
        <DummyAd type="horizontal" className="mx-auto" />
      </div>

      {/* Features Section */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">Calculations happen instantly on your device without waiting for page loads.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accurate & Reliable</h3>
              <p className="text-muted-foreground">Using standard formulas for precision you can trust for your planning.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                <PieChart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Insights</h3>
              <p className="text-muted-foreground">Beautiful interactive interfaces that help you understand your metrics better.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
