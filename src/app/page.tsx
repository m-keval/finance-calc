import Link from "next/link";
import {
  ArrowRight, Calculator, PieChart, TrendingUp, PiggyBank,
  ShieldCheck, Zap, Target, ArrowUpRight, Users, BarChart3,
  ChevronRight, Scale, FileText, Landmark, Building,
  Wallet, FastForward, MapPin, Calendar, Clock, Cake, Timer
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DummyAd } from "@/components/shared/DummyAd";

const financeCalculators = [
  {
    title: "SIP Calculator",
    description: "Calculate how much your monthly investments can grow over time with the power of compounding.",
    icon: <TrendingUp className="h-6 w-6" />,
    href: "/calculators/sip",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Step-up SIP",
    description: "Supercharge your wealth by increasing your SIP amount every year as your income grows.",
    icon: <ArrowUpRight className="h-6 w-6" />,
    href: "/calculators/step-up-sip",
    gradient: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Goal Planning",
    description: "Work backwards from your target amount to find out exactly how much you need to invest today.",
    icon: <Target className="h-6 w-6" />,
    href: "/calculators/goal",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "FD Calculator",
    description: "Calculate the maturity amount and interest earned on your Fixed Deposit.",
    icon: <PiggyBank className="h-6 w-6" />,
    href: "/calculators/fd",
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Loan Calculator",
    description: "Calculate your Equated Monthly Installment (EMI) for any loan and see the amortization schedule.",
    icon: <PieChart className="h-6 w-6" />,
    href: "/calculators/loan-emi",
    gradient: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Inflation Calculator",
    description: "Understand how inflation erodes purchasing power and calculate the future cost of current expenses.",
    icon: <Calculator className="h-6 w-6" />,
    href: "/calculators/inflation",
    gradient: "from-sky-500 to-cyan-500",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    title: "Income Tax",
    description: "Compare old vs new tax regimes and find out which one saves you more money this financial year.",
    icon: <FileText className="h-6 w-6" />,
    href: "/calculators/income-tax",
    gradient: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    title: "Capital Gains",
    description: "Calculate STCG and LTCG tax on equity, debt, and real estate investments as per Budget 2024.",
    icon: <Landmark className="h-6 w-6" />,
    href: "/calculators/capital-gains",
    gradient: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

const healthCalculators = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your weight category with a visual gauge.",
    icon: <BarChart3 className="h-6 w-6" />,
    href: "/health/bmi",
    gradient: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "Calorie Calculator",
    description: "Find your daily caloric needs based on your activity level and fitness goals.",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/calories",
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
];

const ageDateCalculators = [
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days with zodiac sign and birthday countdown.",
    icon: <Calculator className="h-6 w-6" />,
    href: "/age-date/age",
    gradient: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Birthday Countdown",
    description: "Count down the days, hours, and minutes until your next birthday with a progress bar.",
    icon: <Cake className="h-6 w-6" />,
    href: "/age-date/birthday-countdown",
    gradient: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "Date Difference",
    description: "Calculate the exact time span between any two dates in years, months, weeks, and days.",
    icon: <Calendar className="h-6 w-6" />,
    href: "/age-date/date-difference",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Time Duration",
    description: "Calculate the duration between two times in hours, minutes, and seconds.",
    icon: <Clock className="h-6 w-6" />,
    href: "/age-date/time-duration",
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32 lg:py-40">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-0 top-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-brand-400/10 blur-[100px] animate-float" />
        <div className="absolute left-0 bottom-0 -z-10 h-[250px] w-[250px] rounded-full bg-brand-300/10 blur-[80px] animate-float-delayed" />

        <div className="container relative mx-auto px-4 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/30 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              20+ Free Financial Tools
            </div>

            {/* Heading */}
            <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Smart Financial
              <br />
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Calculators
              </span>
            </h1>

            {/* Subheading */}
            <p className="animate-fade-in-up stagger-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Make better financial decisions with our fast, accurate, and beautifully designed calculators.
              Planning your wealth has never been easier.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#finance-calculators"
                className={buttonVariants({
                  size: "lg",
                  className: "h-13 px-8 text-base font-semibold rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5 transition-all duration-300",
                })}
              >
                Explore Calculators
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "h-13 px-8 text-base font-semibold rounded-xl border-2 hover:bg-brand-50 dark:hover:bg-brand-950/20 hover:-translate-y-0.5 transition-all duration-300",
                })}
              >
                Why CalcNiv?
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="animate-fade-in-up stagger-4 mt-16 sm:mt-20 mx-auto max-w-3xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-brand-300 dark:hover:border-brand-700 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement 1 */}
      <div className="w-full py-8 border-b border-border/30 bg-background/50 flex justify-center items-center">
        <DummyAd type="horizontal" className="mx-auto" />
      </div>

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
                <Card className={`flex-1 animate-fade-in-up stagger-${i + 1} relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border-border/60 hover:border-brand-300 dark:hover:border-brand-700 cursor-pointer`}>
                  {/* Gradient top border on hover */}
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${calc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="pb-3">
                    <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${calc.bgColor} ${calc.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {calc.icon}
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {calc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed">
                      {calc.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      Try Calculator <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
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

      {/* Health Calculators Highlight */}
      <section className="py-20 sm:py-24 border-b border-border/50 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 dark:bg-rose-950/30 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300 mb-4 uppercase tracking-wider">
              <BarChart3 className="h-3.5 w-3.5" />
              Health & Wellness
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Health Calculators
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track your fitness journey with our body metrics and nutrition calculators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {healthCalculators.map((calc, i) => (
              <Link key={i} href={calc.href} className="group">
                <Card className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border-border/60 hover:border-brand-300 dark:hover:border-brand-700 cursor-pointer h-full">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${calc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="flex flex-row items-start gap-4 pb-3">
                    <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${calc.bgColor} ${calc.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {calc.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {calc.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-1">
                        {calc.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/health/bmi"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors group"
            >
              Explore All Health Tools
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Age & Date Calculators */}
      <section className="py-20 sm:py-24 border-b border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 dark:bg-violet-950/30 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300 mb-4 uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5" />
              Age & Date Tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Age & Date Calculators
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Calculate ages, date differences, birthday countdowns, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ageDateCalculators.map((calc, i) => (
              <Link key={i} href={calc.href} className="group flex h-full">
                <Card className={`flex-1 animate-fade-in-up stagger-${i + 1} relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border-border/60 hover:border-brand-300 dark:hover:border-brand-700 cursor-pointer`}>
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${calc.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardHeader className="pb-3">
                    <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${calc.bgColor} ${calc.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {calc.icon}
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {calc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed">
                      {calc.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      Try Calculator <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/age-date/age"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors group"
            >
              View All Age & Date Tools
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement 2 */}
      <div className="w-full py-12 flex justify-center items-center bg-muted/20">
        <DummyAd type="horizontal" className="mx-auto" />
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 border-t border-border/50 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
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
