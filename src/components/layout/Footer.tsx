import Link from "next/link"
import Image from "next/image"
import { Calculator } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="CalcNiv Logo" 
                width={24} 
                height={24} 
              />
              <span className="inline-block font-bold tracking-tight">CalcNiv</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The foundation for smarter decisions through calculation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculators/sip" className="hover:text-brand-600 transition-colors">SIP Calculator</Link></li>
              <li><Link href="/calculators/fd" className="hover:text-brand-600 transition-colors">Fixed Deposit Calculator</Link></li>
              <li><Link href="/calculators/loan-emi" className="hover:text-brand-600 transition-colors">Loan EMI Calculator</Link></li>
              <li><Link href="/calculators/inflation" className="hover:text-brand-600 transition-colors">Inflation Calculator</Link></li>
            </ul>
          </div>

        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} CalcNiv. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for modern investors.</p>
        </div>
      </div>
    </footer>
  )
}
