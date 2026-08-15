"use client"

import { useRef, useEffect, useState } from "react"

interface AutoScaleValueProps {
  value: string
  className?: string
}

export function AutoScaleValue({ value, className = "" }: AutoScaleValueProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const container = containerRef.current
    const textNode = textRef.current
    if (!container || !textNode) return

    const updateScale = () => {
      const currentTransform = textNode.style.transform
      textNode.style.transform = "none"

      const containerWidth = container.offsetWidth
      const textWidth = textNode.scrollWidth

      textNode.style.transform = currentTransform

      if (textWidth > containerWidth && containerWidth > 0) {
        setScale((containerWidth / textWidth) * 0.96)
      } else {
        setScale(1)
      }
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={textRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "left center",
          whiteSpace: "nowrap",
        }}
        className={`text-2xl sm:text-3xl font-bold tracking-tight origin-left transition-transform duration-100 ease-out ${className}`}
      >
        {value}
      </div>
    </div>
  )
}
