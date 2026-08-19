"use client"

import { useEffect } from "react"

export function ScrollRestorationReset() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force manual scroll restoration so browsers don't restore previous scroll position on reload
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual"
      }
      
      // Reset scroll position to top (hero section) on initial page load / refresh
      window.scrollTo(0, 0)
      
      const handleBeforeUnload = () => {
        window.scrollTo(0, 0)
      }
      
      window.addEventListener("beforeunload", handleBeforeUnload)
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [])

  return null
}
