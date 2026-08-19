import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

function IndiaFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 225 150"
      className={className}
      role="img"
      aria-label="Flag of India"
    >
      <rect width="225" height="50" fill="#FF9933" />
      <rect y="50" width="225" height="50" fill="#FFFFFF" />
      <rect y="100" width="225" height="50" fill="#138808" />
      <g transform="translate(112.5, 75)">
        <circle r="18" fill="none" stroke="#000080" strokeWidth="2.5" />
        <circle r="3.5" fill="#000080" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-18"
            stroke="#000080"
            strokeWidth="1.2"
            transform={`rotate(${i * 15})`}
          />
        ))}
      </g>
    </svg>
  )
}

const calculatorLinks = [
  { label: "SIP Calculator", href: "/calculators/sip" },
  { label: "FD Calculator", href: "/calculators/fd" },
  { label: "Loan EMI Calculator", href: "/calculators/loan-emi" },
  { label: "Inflation Calculator", href: "/calculators/inflation" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} CalcNiv. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/60 dark:bg-muted/30 px-4 py-1.5 rounded-full border border-border/60 shadow-xs">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline-block shrink-0" />
            <span>in India</span>
            <IndiaFlag className="w-5 h-3.5 shrink-0 ml-1 rounded-[2px] shadow-xs border border-black/10 dark:border-white/10" />
          </div>


        </div>
      </div>
    </footer>
  )
}
