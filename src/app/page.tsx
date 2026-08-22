import Link from "next/link";
import {
  ArrowRight, Calculator, PieChart, TrendingUp, PiggyBank,
  ShieldCheck, Zap, Target, ArrowUpRight, Users, BarChart3,
  ChevronRight, Scale, FileText, Landmark, Building,
  Wallet, FastForward, MapPin, Calendar, Clock, Cake, Timer, Sparkles
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroCalculator } from "@/components/calculator/HeroCalculator";
import { ScrollRestorationReset } from "@/components/shared/ScrollRestorationReset";

const financeCalculators = [
  {
    title: "SIP Calculator",
    description: "Calculate how much your monthly investments can grow over time with the power of compounding.",
    icon: <TrendingUp className="h-6 w-6" />,
    href: "/calculators/investment/sip-calculator",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Step-up SIP",
    description: "Supercharge your wealth by increasing your SIP amount every year as your income grows.",
    icon: <ArrowUpRight className="h-6 w-6" />,
    href: "/calculators/investment/step-up-sip-calculator",
    gradient: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Goal Planning",
    description: "Work backwards from your target amount to find out exactly how much you need to invest today.",
    icon: <Target className="h-6 w-6" />,
    href: "/calculators/financial/goal-calculator",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "FD Calculator",
    description: "Calculate the maturity amount and interest earned on your Fixed Deposit.",
    icon: <PiggyBank className="h-6 w-6" />,
    href: "/calculators/investment/fd-calculator",
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Loan Calculator",
    description: "Calculate your Equated Monthly Installment (EMI) for any loan and see the amortization schedule.",
    icon: <PieChart className="h-6 w-6" />,
    href: "/calculators/loan/emi-calculator",
    gradient: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Inflation Calculator",
    description: "Understand how inflation erodes purchasing power and calculate the future cost of current expenses.",
    icon: <Calculator className="h-6 w-6" />,
    href: "/calculators/financial/inflation-calculator",
    gradient: "from-sky-500 to-cyan-500",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
];


const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast",
    description: "Calculations happen instantly on your device without waiting for page loads.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Accurate & Reliable",
    description: "Using standard formulas for precision you can trust for your planning.",
  },
  {
    icon: <PieChart className="h-6 w-6" />,
    title: "Visual Insights",
    description: "Beautiful interactive charts and graphs that help you understand your metrics.",
  },
];

const stats = [
  { value: "20+", label: "Calculators" },
  { value: "100%", label: "Free" },
  { value: "0", label: "Ads Experience" },
  { value: "Instant", label: "Results" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Reset scroll on refresh to hero default position */}
      <ScrollRestorationReset />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-8 sm:py-10 lg:py-12">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/4 top-0 -z-10 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[100px] animate-pulse-glow" />
        <div className="absolute right-0 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[80px] animate-float" />
        <div className="absolute left-0 bottom-0 -z-10 h-[200px] w-[200px] rounded-full bg-brand-300/10 blur-[60px] animate-float-delayed" />

        <div className="container relative mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-1.5 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
                Quick Basic Calculator & 20+ Free Financial Tools
              </div>

              {/* Heading */}
              <h1 className="animate-fade-in-up stagger-1 text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight leading-[1.12] mb-3">
                Free Financial,
                <br />
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                  Investment & Loan Calculators
                </span>
              </h1>

              {/* Subheading */}
              <p className="animate-fade-in-up stagger-2 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-4 leading-relaxed">
                Compute basic numbers and daily calculations directly with our interactive keypad, or jump into 20+ purpose-built calculators for wealth, taxes, loans, and life events.
              </p>

              {/* Quick Jump Pills */}
              <div className="animate-fade-in-up stagger-2 flex flex-wrap gap-1.5 justify-center lg:justify-start mb-5">
                <Link
                  href="/calculators/sip"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-card border border-border/70 hover:border-brand-300 dark:hover:border-brand-700 px-2.5 py-1 text-[11px] font-semibold text-foreground hover:text-brand-600 transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <TrendingUp className="h-3 w-3 text-emerald-500" /> SIP Return
                </Link>
                <Link
                  href="/calculators/loan-emi"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-card border border-border/70 hover:border-brand-300 dark:hover:border-brand-700 px-2.5 py-1 text-[11px] font-semibold text-foreground hover:text-brand-600 transition-all shadow-xs hover:-translate-y-0.5"
                >
                  <PieChart className="h-3 w-3 text-rose-500" /> Loan EMI
                </Link>

              </div>

              {/* CTA Buttons */}
              <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                <Link
                  href="#finance-calculators"
                  className={buttonVariants({
                    size: "default",
                    className: "h-10 px-6 text-sm font-semibold rounded-lg shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5 transition-all duration-200",
                  })}
                >
                  Explore Calculators
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
                <Link
                  href="#features"
                  className={buttonVariants({
                    variant: "outline",
                    size: "default",
                    className: "h-10 px-6 text-sm font-semibold rounded-lg border-2 hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:-translate-y-0.5 transition-all duration-200",
                  })}
                >
                  Why CalcNiv?
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="animate-fade-in-up stagger-4 max-w-lg mx-auto lg:mx-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center lg:text-left p-2.5 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                      <div className="text-lg sm:text-xl font-extrabold text-brand-600 dark:text-brand-400 leading-tight">{stat.value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Hero Calculator */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-up stagger-2">
              <HeroCalculator />
            </div>
          </div>
        </div>
      </section>


      {/* Finance Calculators Grid */}
      <section id="finance-calculators" className="py-20 sm:py-24 bg-muted/20 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/30 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-4 uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5" />
              Finance Tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Finance Calculators
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to calculate returns, plan loans, and manage your financial future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {financeCalculators.map((calc, i) => (
              <Link key={i} href={calc.href} className="group flex h-full">
                <div className={`flex-1 animate-fade-in-up stagger-${(i % 4) + 1} relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-500/10 dark:hover:shadow-brand-500/5 hover:border-brand-400 dark:hover:border-brand-600 flex flex-col justify-between cursor-pointer`}>
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 h-28 w-28 rounded-full bg-brand-500/10 dark:bg-brand-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Top Row: Icon + Arrow Pill */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${calc.bgColor} ${calc.iconColor} group-hover:scale-105 group-hover:shadow-sm transition-all duration-300`}>
                        {calc.icon}
                      </div>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/60 text-muted-foreground group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 line-clamp-2">
                      {calc.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-muted-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    <span>Calculate Now</span>
                    <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="mt-12 text-center">
            <Link
              href="/calculators/sip"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors group"
            >
              View All 20+ Calculators
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 border-t border-border/50 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Why Choose CalcNiv?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Built for speed, accuracy, and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`animate-fade-in-up stagger-${i + 1} group relative text-center p-8 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-brand-200 dark:hover:border-brand-800 transition-all duration-300`}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-200 dark:group-hover:bg-brand-900/40 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 p-12 sm:p-16 text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Start Planning Your Financial Future
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                Use our calculators to make informed decisions about investments, loans, and savings.
              </p>
              <Link
                href="/calculators/sip"
                className={buttonVariants({
                  size: "lg",
                  className: "h-13 px-8 text-base font-semibold rounded-xl !bg-white !text-brand-700 hover:!bg-white/90 shadow-xl shadow-black/10 hover:-translate-y-0.5 transition-all duration-300",
                })}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
