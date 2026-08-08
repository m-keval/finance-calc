import React from "react"
import { cn } from "@/lib/utils"

interface BMIGaugeProps {
  score: number
  className?: string
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, startAngle)
  const end = polarToCartesian(x, y, radius, endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ")
}

const bmiToAngle = (bmi: number) => {
  if (bmi < 18.5) {
    const minBmi = 12
    const clamped = Math.max(minBmi, bmi)
    return 180 + ((clamped - minBmi) / (18.5 - minBmi)) * 36
  } else if (bmi < 25) {
    return 216 + ((bmi - 18.5) / 6.5) * 36
  } else if (bmi < 30) {
    return 252 + ((bmi - 25) / 5) * 36
  } else if (bmi < 40) {
    return 288 + ((bmi - 30) / 10) * 36
  } else {
    const maxBmi = 48
    const clamped = Math.min(maxBmi, bmi)
    return 324 + ((clamped - 40) / 8) * 36
  }
}

const slices = [
  { start: 180, end: 215, color: "#38bdf8", label1: "< 18.5", label2: "(Underweight)" },
  { start: 216.5, end: 251.5, color: "#a3e635", label1: "18.5 - 24.9", label2: "Normal" },
  { start: 253, end: 287, color: "#facc15", label1: "25.0 - 29.9", label2: "(Overweight)" },
  { start: 288.5, end: 323.5, color: "#f97316", label1: "30.0 - 39.9", label2: "Obese" },
  { start: 325, end: 360, color: "#ef4444", label1: "> 40.0", label2: "(Severely Obese)" }
]

export function BMIGauge({ score, className }: BMIGaugeProps) {
  const angle = bmiToAngle(score)
  
  const cx = 200
  const cy = 200
  const r = 130
  const strokeWidth = 60

  // Text path for the title
  const textPathD = describeArc(cx, cy, 168, 180, 360)

  return (
    <div className={cn("relative w-full max-w-[450px] mx-auto", className)}>
      <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-sm overflow-visible">
        {/* Title Text along path */}
        <defs>
          <path id="titlePath" d={textPathD} fill="none" />
        </defs>
        <text className="text-xl font-bold fill-foreground tracking-wide">
          <textPath href="#titlePath" startOffset="50%" textAnchor="middle">
            BODY MASS INDEX METER
          </textPath>
        </text>

        {/* Gauge Segments */}
        {slices.map((slice, i) => {
          const midpoint = (slice.start + slice.end) / 2
          const pos = polarToCartesian(cx, cy, r, midpoint)
          const textRotation = midpoint + 90
          return (
            <g key={i}>
              <path 
                d={describeArc(cx, cy, r, slice.start, slice.end)} 
                fill="none" 
                stroke={slice.color} 
                strokeWidth={strokeWidth} 
                strokeLinecap="butt" 
              />
              <g transform={`translate(${pos.x}, ${pos.y}) rotate(${textRotation})`}>
                <text y="-6" textAnchor="middle" className="text-[11px] font-bold fill-black/80 dark:fill-black/90">{slice.label1}</text>
                <text y="8" textAnchor="middle" className="text-[10px] font-bold fill-black/80 dark:fill-black/90">{slice.label2}</text>
              </g>
            </g>
          )
        })}

        {/* Needle */}
        <g transform={`rotate(${angle}, ${cx}, ${cy})`} style={{ transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <polygon points={`${cx},${cy-8} ${cx+110},${cy} ${cx},${cy+8}`} className="fill-slate-900 dark:fill-slate-100" />
          <circle cx={cx} cy={cy} r="16" className="fill-slate-900 dark:fill-slate-100" />
          <circle cx={cx} cy={cy} r="5" className="fill-white dark:fill-slate-900" />
        </g>
      </svg>
    </div>
  )
}
