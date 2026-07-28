"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, PiggyBank, PieChart, Calculator } from "lucide-react";
import { ReactNode } from "react";

export default function CalculatorsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  const calculators = [
    { name: "SIP Calculator", href: "/calculators/sip", icon: <TrendingUp className="w-5 h-5" /> },
    { name: "FD Calculator", href: "/calculators/fd", icon: <PiggyBank className="w-5 h-5" /> },
    { name: "Loan EMI Calculator", href: "/calculators/loan-emi", icon: <PieChart className="w-5 h-5" /> },
    { name: "Inflation Calculator", href: "/calculators/inflation", icon: <Calculator className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-140px)]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24 bg-card border rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-lg mb-4 px-2 tracking-tight">Calculators</h3>
          <nav className="flex flex-col gap-1">
            {calculators.map((calc) => {
              const isActive = pathname === calc.href;
              return (
                <Link 
                  key={calc.href} 
                  href={calc.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400" 
                      : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/50 dark:hover:text-emerald-400"
                  }`}
                >
                  <div className={isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}>
                    {calc.icon}
                  </div>
                  {calc.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
