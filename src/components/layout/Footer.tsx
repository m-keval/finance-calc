import Link from "next/link"
import Image from "next/image"

const calculatorLinks = [
  { label: "SIP Calculator", href: "/calculators/sip" },
  { label: "FD Calculator", href: "/calculators/fd" },
  { label: "Loan EMI Calculator", href: "/calculators/loan-emi" },
  { label: "Inflation Calculator", href: "/calculators/inflation" },
  { label: "Income Tax", href: "/calculators/income-tax" },
  { label: "Capital Gains", href: "/calculators/capital-gains" },
];

const healthLinks = [
  { label: "BMI Calculator", href: "/health/bmi" },
  { label: "Calorie Calculator", href: "/health/calories" },
  { label: "BMR Calculator", href: "/health/bmr" },
  { label: "Body Fat Calculator", href: "/health/body-fat" },
];

const ageDateLinks = [
  { label: "Age Calculator", href: "/age-date/age" },
  { label: "Birthday Countdown", href: "/age-date/birthday-countdown" },
  { label: "Date Difference", href: "/age-date/date-difference" },
  { label: "Working Days", href: "/age-date/working-days" },
];

const moreLinks = [
  { label: "SIP vs FD", href: "/calculators/sip-vs-fd" },
  { label: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
  { label: "HRA Exemption", href: "/calculators/hra" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.svg"
                alt="CalcNiv Logo"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The foundation for smarter financial decisions. Fast, accurate, and beautifully designed calculators for the modern investor.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xs font-bold">IN</span>
              </div>
              <span className="text-xs text-muted-foreground">Built for Indian investors</span>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Calculators</h3>
            <ul className="space-y-2.5">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Health */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Health Tools</h3>
            <ul className="space-y-2.5">
              {healthLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Age & Date */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Age & Date</h3>
            <ul className="space-y-2.5">
              {ageDateLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">More</h3>
            <ul className="space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CalcNiv. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Made with accuracy</span>
            <span className="text-border">|</span>
            <span>No data stored</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
