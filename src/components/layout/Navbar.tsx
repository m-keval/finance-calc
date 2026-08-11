"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Calculator, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image 
              src="/logo.png" 
              alt="CalcNiv Logo" 
              width={32} 
              height={32} 
              className="group-hover:scale-105 transition-all duration-300"
            />
            <span className="inline-block font-extrabold text-2xl tracking-tighter text-brand-600 dark:text-brand-400">
              CalcNiv
            </span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/calculators/sip" className="transition-colors hover:text-brand-600 text-foreground/80">Calculators</Link>

          
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background px-4 py-4 space-y-3">
          <div className="text-xs font-bold text-muted-foreground mb-2">Decisions & Calculators</div>
          <Link href="/calculators/sip" className="block text-sm font-medium pl-2" onClick={() => setIsMobileMenuOpen(false)}>Investment</Link>
          <Link href="/calculators/fd" className="block text-sm font-medium pl-2" onClick={() => setIsMobileMenuOpen(false)}>Savings</Link>
          <Link href="/calculators/loan-emi" className="block text-sm font-medium pl-2" onClick={() => setIsMobileMenuOpen(false)}>Loans</Link>
          

        </div>
      )}
    </nav>
  )
}
