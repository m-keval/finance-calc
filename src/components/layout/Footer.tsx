import Link from "next/link"
import { Calculator } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-1 rounded-md text-white">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="inline-block font-bold tracking-tight">FinCalc</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering you to make better financial decisions with modern, accurate, and fast calculators.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculators/sip" className="hover:text-emerald-600 transition-colors">SIP Calculator</Link></li>
              <li><Link href="/calculators/fd" className="hover:text-emerald-600 transition-colors">Fixed Deposit Calculator</Link></li>
              <li><Link href="/calculators/loan-emi" className="hover:text-emerald-600 transition-colors">Loan EMI Calculator</Link></li>
              <li><Link href="/calculators/inflation" className="hover:text-emerald-600 transition-colors">Inflation Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">Personal Finance Guide</Link></li>
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">Tax Saving Strategies</Link></li>
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-emerald-600 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} FinCalc. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for modern investors.</p>
        </div>
      </div>
    </footer>
  )
}
