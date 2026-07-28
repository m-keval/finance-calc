"use client"

import { useEffect } from "react"

interface AdBannerProps {
  dataAdSlot: string
  dataAdFormat?: string
  dataFullWidthResponsive?: boolean
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error("Google Adsense error:", err)
    }
  }, [])

  return (
    <div className="w-full flex justify-center overflow-hidden my-6">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "300px", minHeight: "250px", backgroundColor: "rgba(0,0,0,0.05)" }}
        data-ad-client="ca-pub-0000000000000000"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      >
        {/* Placeholder text for dev mode / adblockers */}
        <div className="flex items-center justify-center h-full w-full text-muted-foreground text-sm border border-dashed border-border rounded-lg p-4">
          Advertisement Space
        </div>
      </ins>
    </div>
  )
}
