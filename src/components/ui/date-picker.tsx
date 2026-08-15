"use client"

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react"
import { createPortal } from "react-dom"
import { format, parse, isValid, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, setMonth, setYear } from "date-fns"
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  label?: string
  className?: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const CURRENT_YEAR = new Date().getFullYear()
const YEAR_RANGE = Array.from({ length: 200 }, (_, i) => CURRENT_YEAR - 120 + i)

export function DatePicker({ value, onChange, label, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const d = value ? parse(value, "yyyy-MM-dd", new Date()) : new Date()
    return isValid(d) ? d : new Date()
  })
  const [showMonthPicker, setShowMonthPicker] = useState(false)
  const [showYearPicker, setShowYearPicker] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null)

  const parsed = value ? parse(value, "yyyy-MM-dd", new Date()) : new Date()
  const display = isValid(parsed) ? format(parsed, "dd MMM yyyy") : "Pick a date"

  const measure = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    })
  }, [])

  useLayoutEffect(() => {
    if (open) {
      measure()
    }
  }, [open, measure])

  useEffect(() => {
    if (open) {
      const d = value ? parse(value, "yyyy-MM-dd", new Date()) : new Date()
      if (isValid(d)) setViewDate(d)
      setShowMonthPicker(false)
      setShowYearPicker(false)
    }
  }, [open, value])

  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current && triggerRef.current.contains(target)) return
      if (dropdownRef.current && dropdownRef.current.contains(target)) return
      setOpen(false)
    }

    const handleReposition = () => measure()

    document.addEventListener("mousedown", handleClick)
    window.addEventListener("scroll", handleReposition, true)
    window.addEventListener("resize", handleReposition)

    return () => {
      document.removeEventListener("mousedown", handleClick)
      window.removeEventListener("scroll", handleReposition, true)
      window.removeEventListener("resize", handleReposition)
    }
  }, [open, measure])

  const monthStart = startOfMonth(viewDate)
  const monthEnd = endOfMonth(viewDate)
  const calStart = startOfWeek(monthStart)
  const calEnd = endOfWeek(monthEnd)
  const days = eachDayOfInterval({ start: calStart, end: calEnd })
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const calendar = open && pos ? createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[9999] rounded-xl border bg-card shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150"
      style={{ top: pos.top, left: pos.left, width: pos.width }}
    >
      {showYearPicker ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Select Year</span>
            <button
              type="button"
              onClick={() => setShowYearPicker(false)}
              className="text-xs text-brand-500 hover:text-brand-600 font-medium"
            >
              Done
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
            {YEAR_RANGE.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => {
                  setViewDate(setYear(viewDate, year))
                  setShowYearPicker(false)
                  setShowMonthPicker(true)
                }}
                className={cn(
                  "px-2 py-1.5 rounded-md text-sm transition-colors",
                  year === viewDate.getFullYear()
                    ? "bg-brand-500 text-white"
                    : "text-foreground hover:bg-accent"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      ) : showMonthPicker ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">{viewDate.getFullYear()}</span>
            <button
              type="button"
              onClick={() => setShowMonthPicker(false)}
              className="text-xs text-brand-500 hover:text-brand-600 font-medium"
            >
              Done
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {MONTHS.map((month, i) => (
              <button
                key={month}
                type="button"
                onClick={() => {
                  setViewDate(setMonth(viewDate, i))
                  setShowMonthPicker(false)
                }}
                className={cn(
                  "px-2 py-2 rounded-md text-sm transition-colors",
                  i === viewDate.getMonth()
                    ? "bg-brand-500 text-white"
                    : "text-foreground hover:bg-accent"
                )}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setViewDate(subMonths(viewDate, 1))}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => { setShowMonthPicker(true); setShowYearPicker(false) }}
                className="text-sm font-semibold text-foreground hover:text-brand-500 transition-colors flex items-center gap-0.5"
              >
                {format(viewDate, "MMMM")}
                <ChevronDown className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => { setShowYearPicker(true); setShowMonthPicker(false) }}
                className="text-sm font-semibold text-foreground hover:text-brand-500 transition-colors flex items-center gap-0.5"
              >
                {format(viewDate, "yyyy")}
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setViewDate(addMonths(viewDate, 1))}
              className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0">
            {weekdays.map((wd) => (
              <div key={wd} className="w-9 h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
                {wd}
              </div>
            ))}
            {days.map((day) => {
              const inMonth = isSameMonth(day, viewDate)
              const selected = isValid(parsed) && isSameDay(day, parsed)
              const today = isToday(day)
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    onChange(format(day, "yyyy-MM-dd"))
                    setOpen(false)
                  }}
                  className={cn(
                    "w-9 h-8 flex items-center justify-center text-sm rounded-md transition-colors cursor-pointer",
                    inMonth ? "text-foreground hover:bg-accent" : "text-muted-foreground/30",
                    selected && "bg-brand-500 text-white hover:bg-brand-600",
                    today && !selected && "font-bold text-brand-600"
                  )}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>,
    document.body
  ) : null

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="text-sm font-medium mb-1.5 block">{label}</label>
      )}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 rounded-lg border bg-background text-foreground font-medium text-sm",
          "focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors",
          open && "ring-2 ring-brand-500"
        )}
      >
        <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
        <span className="text-left flex-1">{display}</span>
        <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-90")} />
      </button>

      {calendar}
    </div>
  )
}
