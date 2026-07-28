import Link from "next/link";
import { ArrowRight, Calculator, PieChart, TrendingUp, PiggyBank, ShieldCheck, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const calculators = [
    {
      title: "SIP Calculator",
      description: "Calculate how much your monthly investments can grow over time with the power of compounding.",
      icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
      href: "/calculators/sip",
    },
    {
      title: "FD Calculator",
      description: "Calculate the maturity amount and interest earned on your Fixed Deposit.",
      icon: <PiggyBank className="h-6 w-6 text-emerald-500" />,
      href: "/calculators/fd",
    },
    {
      title: "Loan EMI",
      description: "Calculate your Equated Monthly Installment (EMI) for any loan and see the amortization schedule.",
      icon: <PieChart className="h-6 w-6 text-emerald-500" />,
      href: "/calculators/loan-emi",
    },
    {
      title: "Inflation Calculator",
      description: "Understand how inflation erodes purchasing power and calculate the future cost of current expenses.",
      icon: <Calculator className="h-6 w-6 text-emerald-500" />,
      href: "/calculators/inflation",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 mb-6">
            New & Improved Calculators
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6">
            Smart Financial Calculators for the <span className="text-emerald-600 dark:text-emerald-400">Modern Investor</span>
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

      {/* Calculators Grid */}
      <section id="calculators" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Calculators</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to calculate returns, plan loans, and manage your financial future.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.map((calc, i) => (
              <Link key={i} href={calc.href} className="group flex h-full">
                <Card className="flex-1 transition-all duration-300 hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/30 cursor-pointer">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/20 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/40 transition-colors">
                      {calc.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{calc.title}</CardTitle>
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

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">Calculations happen instantly on your device without waiting for page loads.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accurate & Reliable</h3>
              <p className="text-muted-foreground">Using standard financial formulas for precision you can trust for your planning.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                <PieChart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Insights</h3>
              <p className="text-muted-foreground">Beautiful interactive charts that help you understand your money better.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
