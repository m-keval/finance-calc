"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, PiggyBank, PieChart, Calculator, Target, ArrowUpRight, Scale, Wallet, ArrowRightLeft, FastForward, Home, Building, FileText, Landmark, MapPin } from "lucide-react";
import { ReactNode } from "react";

export default function CalculatorsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const categories = [
    {
      title: "Investment",
      items: [
        { name: "SIP Calculator", href: "/calculators/sip", icon: <TrendingUp className="w-4 h-4" /> },
        { name: "Step-up SIP", href: "/calculators/step-up-sip", icon: <ArrowUpRight className="w-4 h-4" /> },
        { name: "Goal Planning", href: "/calculators/goal", icon: <Target className="w-4 h-4" /> },
        { name: "SIP vs FD", href: "/calculators/sip-vs-fd", icon: <Scale className="w-4 h-4" /> },
      ]
    },
    {
      title: "Savings",
      items: [
        { name: "FD Calculator", href: "/calculators/fd", icon: <PiggyBank className="w-4 h-4" /> },
      ]
    },

    {
      title: "Loans",
      items: [
        { name: "Rent vs Buy", href: "/calculators/rent-vs-buy", icon: <Home className="w-4 h-4" /> },
        { name: "Eligibility", href: "/calculators/home-loan-eligibility", icon: <Building className="w-4 h-4" /> },
        { name: "Loan Calculator", href: "/calculators/loan-emi", icon: <PieChart className="w-4 h-4" /> },
        { name: "Invest vs Repay", href: "/calculators/invest-vs-repay", icon: <Wallet className="w-4 h-4" /> },
        { name: "Loan Prepayment", href: "/calculators/loan-prepayment", icon: <FastForward className="w-4 h-4" /> },
      ]
    },
    {
      title: "Planning",
      items: [
        { name: "Inflation Calculator", href: "/calculators/inflation", icon: <Calculator className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-140px)]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24 bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl p-5">
          {categories.map((category, idx) => (
            <div key={category.title} className={idx > 0 ? "mt-5" : ""}>
              <h3 className="font-bold text-[11px] text-muted-foreground/70 mb-2.5 px-3 uppercase tracking-wider">
                {category.title}
              </h3>
              <nav className="flex flex-col gap-0.5">
                {category.items.map((calc) => {
                  const isActive = pathname === calc.href;
                  return (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-400"
                          : "text-muted-foreground hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950/50 dark:hover:text-brand-400"
                      }`}
                    >
                      <div className={`transition-colors duration-200 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-muted-foreground/50"}`}>
                        {calc.icon}
                      </div>
                      {calc.name}
                      {isActive && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}


        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1">
          {children}
        </div>


      </main>
    </div>
  );
}
