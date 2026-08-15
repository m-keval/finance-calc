"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Clock, Cake, ArrowRightLeft, Timer, Hash, Plus, Minus, Briefcase, GitCompare, User } from "lucide-react";
import { ReactNode } from "react";

export default function AgeDateLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const categories = [
    {
      title: "Age",
      items: [
        { name: "Age Calculator", href: "/age-date/age", icon: <User className="w-4 h-4" /> },
        { name: "Age Difference", href: "/age-date/age-difference", icon: <ArrowRightLeft className="w-4 h-4" /> },
        { name: "Date of Birth", href: "/age-date/date-of-birth", icon: <Calendar className="w-4 h-4" /> },
      ]
    },
    {
      title: "Birthday",
      items: [
        { name: "Birthday Calculator", href: "/age-date/birthday", icon: <Cake className="w-4 h-4" /> },
        { name: "Birthday Countdown", href: "/age-date/birthday-countdown", icon: <Timer className="w-4 h-4" /> },
      ]
    },
    {
      title: "Date",
      items: [
        { name: "Date Difference", href: "/age-date/date-difference", icon: <GitCompare className="w-4 h-4" /> },
        { name: "Days Between", href: "/age-date/days-between", icon: <Hash className="w-4 h-4" /> },
        { name: "Weeks Between", href: "/age-date/weeks-between", icon: <Calendar className="w-4 h-4" /> },
      ]
    },
    {
      title: "Date Math",
      items: [
        { name: "Date Add", href: "/age-date/date-add", icon: <Plus className="w-4 h-4" /> },
        { name: "Date Subtract", href: "/age-date/date-subtract", icon: <Minus className="w-4 h-4" /> },
        { name: "Working Days", href: "/age-date/working-days", icon: <Briefcase className="w-4 h-4" /> },
      ]
    },
    {
      title: "Time",
      items: [
        { name: "Time Duration", href: "/age-date/time-duration", icon: <Clock className="w-4 h-4" /> },
      ]
    },
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
