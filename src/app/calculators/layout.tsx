"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, PiggyBank, PieChart, Calculator, Target, ArrowUpRight, Scale, Wallet, ArrowRightLeft, FastForward } from "lucide-react";
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
        { name: "Lumpsum vs SIP", href: "/calculators/lumpsum-vs-sip", icon: <ArrowRightLeft className="w-4 h-4" /> },
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
        { name: "EMI Calculator", href: "/calculators/loan-emi", icon: <PieChart className="w-4 h-4" /> },
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
        <div className="sticky top-24 bg-card border rounded-xl p-4 shadow-sm">
          {categories.map((category, idx) => (
            <div key={category.title} className={idx > 0 ? "mt-6" : ""}>
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3 px-2">
                {category.title}
              </h3>
              <nav className="flex flex-col gap-1">
                {category.items.map((calc) => {
                  const isActive = pathname === calc.href;
                  return (
                    <Link 
                      key={calc.href} 
                      href={calc.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-400" 
                          : "text-muted-foreground hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                      }`}
                    >
                      <div className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground/70"}>
                        {calc.icon}
                      </div>
                      {calc.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
