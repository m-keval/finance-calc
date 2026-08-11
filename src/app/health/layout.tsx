"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Heart, Flame, Percent, Scale, Droplet } from "lucide-react";

export default function HealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const healthCalculators = [
    { name: "BMI Calculator", href: "/health/bmi", icon: <Activity className="w-5 h-5" /> },
    { name: "BMR Calculator", href: "/health/bmr", icon: <Heart className="w-5 h-5" /> },
    { name: "Calorie Calculator", href: "/health/calories", icon: <Flame className="w-5 h-5" /> },
    { name: "Body Fat %", href: "/health/body-fat", icon: <Percent className="w-5 h-5" /> },
    { name: "Ideal Weight", href: "/health/ideal-weight", icon: <Scale className="w-5 h-5" /> },
    { name: "Water Intake", href: "/health/water-intake", icon: <Droplet className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-140px)]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24 bg-card border rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-4 px-2 tracking-tight">Health Metrics</h3>
          <nav className="flex flex-col gap-1">
            {healthCalculators.map((calc) => {
              const isActive = pathname === calc.href;
              return (
                <Link 
                  key={calc.href} 
                  href={calc.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-400" 
                      : "text-muted-foreground hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950/50 dark:hover:text-brand-400"
                  }`}
                >
                  <div className={isActive ? "text-brand-600 dark:text-brand-400" : "text-muted-foreground"}>
                    {calc.icon}
                  </div>
                  {calc.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
