"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  Calculator as CalcIcon,
  Copy,
  Check,
  History,
  Trash2,
  Delete,
} from "lucide-react"

interface HistoryItem {
  id: string
  expression: string
  result: string
  timestamp: string
}

export function HeroCalculator() {
  const [display, setDisplay] = useState("0")
  const [equation, setEquation] = useState("")
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [currentOperator, setCurrentOperator] = useState<string | null>(null)
  const [isNewNumber, setIsNewNumber] = useState(true)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const calculatorRef = useRef<HTMLDivElement>(null)

  // Floating point precision helper
  const cleanNumber = (num: number): string => {
    const rounded = Math.round(num * 1e10) / 1e10
    if (isNaN(rounded) || !isFinite(rounded)) return "Error"
    return rounded.toString()
  }

  const formatDisplayNumber = (valStr: string): string => {
    if (valStr === "Error") return "Error"
    if (valStr.includes("e") || valStr.includes("E")) return valStr

    const parts = valStr.split(".")
    const integerPart = parts[0]
    const decimalPart = parts[1]

    const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt
  }

  // Handle number input
  const handleDigit = useCallback((digit: string) => {
    setDisplay((prev) => {
      if (prev === "Error" || isNewNumber) {
        setIsNewNumber(false)
        return digit === "00" ? "0" : digit
      }
      if (digit === "00" && prev === "0") return "0"
      if (prev === "0" && digit !== "00") return digit
      if (prev.replace("-", "").replace(".", "").length >= 14) return prev
      return prev + digit
    })
  }, [isNewNumber])

  // Handle decimal dot
  const handleDecimal = useCallback(() => {
    setDisplay((prev) => {
      if (prev === "Error" || isNewNumber) {
        setIsNewNumber(false)
        return "0."
      }
      if (!prev.includes(".")) {
        return prev + "."
      }
      return prev
    })
  }, [isNewNumber])

  // Calculate binary operation
  const compute = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second
      case "-":
        return first - second
      case "×":
      case "*":
        return first * second
      case "÷":
      case "/":
        return second !== 0 ? first / second : NaN
      default:
        return second
    }
  }

  // Handle standard math operators (+, -, ×, ÷)
  const handleOperator = useCallback((op: string) => {
    const currentNum = parseFloat(display)
    if (isNaN(currentNum)) return

    if (prevValue !== null && currentOperator && !isNewNumber) {
      const result = compute(prevValue, currentNum, currentOperator)
      if (isNaN(result) || !isFinite(result)) {
        setDisplay("Error")
        setEquation("")
        setPrevValue(null)
        setCurrentOperator(null)
        setIsNewNumber(true)
        return
      }
      const cleaned = cleanNumber(result)
      setDisplay(cleaned)
      setPrevValue(result)
      setEquation(`${formatDisplayNumber(cleaned)} ${op}`)
    } else {
      setPrevValue(currentNum)
      setEquation(`${formatDisplayNumber(display)} ${op}`)
    }

    setCurrentOperator(op)
    setIsNewNumber(true)
  }, [display, prevValue, currentOperator, isNewNumber])

  // Handle Equals (=)
  const handleEquals = useCallback(() => {
    if (prevValue === null || !currentOperator) return

    const currentNum = parseFloat(display)
    if (isNaN(currentNum)) return

    const result = compute(prevValue, currentNum, currentOperator)
    if (isNaN(result) || !isFinite(result)) {
      setDisplay("Error")
      setEquation("")
      setPrevValue(null)
      setCurrentOperator(null)
      setIsNewNumber(true)
      return
    }

    const cleanResult = cleanNumber(result)
    const exprString = `${formatDisplayNumber(cleanNumber(prevValue))} ${currentOperator} ${formatDisplayNumber(display)}`

    setHistory((prev) => [
      {
        id: Date.now().toString(),
        expression: exprString,
        result: formatDisplayNumber(cleanResult),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      ...prev.slice(0, 19),
    ])

    setEquation(`${exprString} =`)
    setDisplay(cleanResult)
    setPrevValue(null)
    setCurrentOperator(null)
    setIsNewNumber(true)
  }, [prevValue, currentOperator, display])

  // Handle All Clear (AC)
  const handleClear = useCallback(() => {
    setDisplay("0")
    setEquation("")
    setPrevValue(null)
    setCurrentOperator(null)
    setIsNewNumber(true)
  }, [])

  // Handle Backspace (⌫)
  const handleBackspace = useCallback(() => {
    if (isNewNumber || display === "Error") {
      setDisplay("0")
      return
    }
    setDisplay((prev) => {
      if (prev.length <= 1 || (prev.length === 2 && prev.startsWith("-"))) {
        return "0"
      }
      return prev.slice(0, -1)
    })
  }, [isNewNumber, display])

  // Handle Sign Toggle (±)
  const handleToggleSign = useCallback(() => {
    if (display === "0" || display === "Error") return
    setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : `-${prev}`))
  }, [display])

  // Handle Percentage (%)
  const handlePercent = useCallback(() => {
    const currentNum = parseFloat(display)
    if (isNaN(currentNum)) return

    if (prevValue !== null && currentOperator) {
      const percentVal = (prevValue * currentNum) / 100
      const cleaned = cleanNumber(percentVal)
      setDisplay(cleaned)
    } else {
      const result = currentNum / 100
      setDisplay(cleanNumber(result))
      setIsNewNumber(true)
    }
  }, [display, prevValue, currentOperator])



  // Copy result to clipboard
  const handleCopy = () => {
    if (display === "Error") return
    navigator.clipboard.writeText(display)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Restore history item
  const handleRestoreHistory = (item: HistoryItem) => {
    const rawVal = item.result.replace(/,/g, "")
    setDisplay(rawVal)
    setEquation(item.expression)
    setPrevValue(null)
    setCurrentOperator(null)
    setIsNewNumber(true)
    setShowHistory(false)
  }

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault()
        setActiveKey(e.key)
        handleDigit(e.key)
      } else if (e.key === ".") {
        e.preventDefault()
        setActiveKey(".")
        handleDecimal()
      } else if (e.key === "+" || e.key === "-") {
        e.preventDefault()
        setActiveKey(e.key)
        handleOperator(e.key)
      } else if (e.key === "*") {
        e.preventDefault()
        setActiveKey("×")
        handleOperator("×")
      } else if (e.key === "/") {
        e.preventDefault()
        setActiveKey("÷")
        handleOperator("÷")
      } else if (e.key === "%") {
        e.preventDefault()
        setActiveKey("%")
        handlePercent()
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault()
        setActiveKey("=")
        handleEquals()
      } else if (e.key === "Backspace") {
        e.preventDefault()
        setActiveKey("⌫")
        handleBackspace()
      } else if (e.key === "Escape") {
        e.preventDefault()
        setActiveKey("AC")
        handleClear()
      }
    }

    const handleKeyUp = () => {
      setActiveKey(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleDigit, handleDecimal, handleOperator, handleEquals, handleBackspace, handleClear, handlePercent])

  // Dynamic font size with strictly fixed line-height
  const getDisplayFontSize = () => {
    const len = display.length
    if (len <= 8) return "text-3xl sm:text-[34px]"
    if (len <= 12) return "text-2xl sm:text-3xl"
    return "text-xl sm:text-2xl"
  }

  return (
    <div
      ref={calculatorRef}
      className="relative w-full max-w-[390px] sm:max-w-[420px] h-[510px] mx-auto select-none rounded-2xl p-5 bg-card border border-border shadow-md flex flex-col justify-between font-[family-name:var(--font-calc-sans)]"
    >
      {/* Top Header Bar */}
      <div className="h-7 flex items-center justify-between pb-2 border-b border-border mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground border border-border">
            <CalcIcon className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Basic Calculator
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy current value"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          {/* History Toggle Button */}
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            title="Toggle calculation history"
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors border cursor-pointer ${
              showHistory
                ? "bg-brand-600 text-white border-brand-600"
                : "text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border"
            }`}
          >
            <History className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        {showHistory ? (
          /* History Drawer View */
          <div className="h-full flex flex-col rounded-xl bg-muted/40 p-3.5 border border-border">
            <div className="flex items-center justify-between pb-2 border-b border-border mb-2.5">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" /> Calculation History
              </span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="text-xs text-destructive hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Trash2 className="h-3 w-3" /> Clear
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-muted-foreground text-xs">
                  <History className="h-7 w-7 mb-2 opacity-30" />
                  No calculations yet. Enter calculations to see your history tape here!
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleRestoreHistory(item)}
                    className="group flex flex-col p-2.5 rounded-lg bg-card hover:bg-muted border border-border cursor-pointer transition-colors text-right"
                  >
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-0.5 font-[family-name:var(--font-calc-mono)]">
                      <span>{item.timestamp}</span>
                      <span className="truncate max-w-[170px]">{item.expression}</span>
                    </div>
                    <div className="text-sm font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 font-[family-name:var(--font-calc-mono)] tabular-nums">
                      = {item.result}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowHistory(false)}
              className="mt-2.5 w-full py-2 text-xs font-semibold rounded-lg bg-card border border-border hover:bg-muted transition-colors text-center cursor-pointer"
            >
              Back to Keypad
            </button>
          </div>
        ) : (
          /* Normal Keypad View */
          <div className="flex flex-col justify-between h-full">
            {/* Display Box */}
            <div className="h-[80px] rounded-xl bg-muted/40 border border-border px-4 py-2 text-right flex flex-col justify-between relative overflow-hidden mb-2.5">
              {/* Formula Line */}
              <div className="h-4 text-xs font-medium text-muted-foreground tracking-tight truncate leading-4 font-[family-name:var(--font-calc-mono)]">
                {equation || "\u00A0"}
              </div>

              {/* Number Display */}
              <div className="h-9 flex items-center justify-end overflow-hidden">
                <span
                  className={`font-[family-name:var(--font-calc-mono)] font-bold tracking-tight text-foreground select-all leading-none tabular-nums ${getDisplayFontSize()}`}
                >
                  {formatDisplayNumber(display)}
                </span>
              </div>

              {/* Copied indicator pill */}
              {copied && (
                <div className="absolute left-3 bottom-2 inline-flex items-center gap-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 text-[10px] font-semibold">
                  <Check className="h-3 w-3" /> Copied
                </div>
              )}
            </div>



            {/* Keypad Grid (5 rows with matching gap-2.5 all around) */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Row 1: AC, ±, %, ÷ */}
              <button
                type="button"
                onClick={handleClear}
                className={`h-11 rounded-xl font-bold text-sm bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 active:scale-95 transition-all flex items-center justify-center cursor-pointer tracking-wide ${
                  activeKey === "AC" ? "ring-2 ring-rose-500" : ""
                }`}
              >
                AC
              </button>
              <button
                type="button"
                onClick={handleToggleSign}
                className="h-11 rounded-xl font-bold text-base bg-muted hover:bg-muted/80 text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)]"
              >
                ±
              </button>
              <button
                type="button"
                onClick={handlePercent}
                className={`h-11 rounded-xl font-bold text-base bg-muted hover:bg-muted/80 text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)] ${
                  activeKey === "%" ? "ring-2 ring-brand-500" : ""
                }`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() => handleOperator("÷")}
                className={`h-11 rounded-xl font-bold text-lg bg-brand-100 hover:bg-brand-200 text-brand-900 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 dark:text-brand-300 border border-brand-200 dark:border-brand-900 active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)] ${
                  currentOperator === "÷" || activeKey === "÷" ? "ring-2 ring-brand-500 bg-brand-200 dark:bg-brand-900" : ""
                }`}
              >
                ÷
              </button>

              {/* Row 2: 7, 8, 9, × */}
              <button
                type="button"
                onClick={() => handleDigit("7")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "7" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                7
              </button>
              <button
                type="button"
                onClick={() => handleDigit("8")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "8" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                8
              </button>
              <button
                type="button"
                onClick={() => handleDigit("9")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "9" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                9
              </button>
              <button
                type="button"
                onClick={() => handleOperator("×")}
                className={`h-11 rounded-xl font-bold text-lg bg-brand-100 hover:bg-brand-200 text-brand-900 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 dark:text-brand-300 border border-brand-200 dark:border-brand-900 active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)] ${
                  currentOperator === "×" || activeKey === "×" ? "ring-2 ring-brand-500 bg-brand-200 dark:bg-brand-900" : ""
                }`}
              >
                ×
              </button>

              {/* Row 3: 4, 5, 6, - */}
              <button
                type="button"
                onClick={() => handleDigit("4")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "4" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                4
              </button>
              <button
                type="button"
                onClick={() => handleDigit("5")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "5" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                5
              </button>
              <button
                type="button"
                onClick={() => handleDigit("6")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "6" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                6
              </button>
              <button
                type="button"
                onClick={() => handleOperator("-")}
                className={`h-11 rounded-xl font-bold text-lg bg-brand-100 hover:bg-brand-200 text-brand-900 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 dark:text-brand-300 border border-brand-200 dark:border-brand-900 active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)] ${
                  currentOperator === "-" || activeKey === "-" ? "ring-2 ring-brand-500 bg-brand-200 dark:bg-brand-900" : ""
                }`}
              >
                -
              </button>

              {/* Row 4: 1, 2, 3, + */}
              <button
                type="button"
                onClick={() => handleDigit("1")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "1" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => handleDigit("2")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "2" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                2
              </button>
              <button
                type="button"
                onClick={() => handleDigit("3")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "3" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                3
              </button>
              <button
                type="button"
                onClick={() => handleOperator("+")}
                className={`h-11 rounded-xl font-bold text-lg bg-brand-100 hover:bg-brand-200 text-brand-900 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 dark:text-brand-300 border border-brand-200 dark:border-brand-900 active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)] ${
                  currentOperator === "+" || activeKey === "+" ? "ring-2 ring-brand-500 bg-brand-200 dark:bg-brand-900" : ""
                }`}
              >
                +
              </button>

              {/* Row 5: 0, ., ⌫, = */}
              <button
                type="button"
                onClick={() => handleDigit("0")}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "0" ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                0
              </button>
              <button
                type="button"
                onClick={handleDecimal}
                className={`h-11 rounded-xl font-bold text-lg bg-card hover:bg-muted text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                  activeKey === "." ? "ring-2 ring-brand-500 bg-muted" : ""
                }`}
              >
                .
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                title="Delete last digit"
                className={`h-11 rounded-xl font-medium text-sm bg-muted hover:bg-muted/80 text-foreground border border-border active:scale-95 transition-all flex items-center justify-center cursor-pointer ${
                  activeKey === "⌫" ? "ring-2 ring-brand-500" : ""
                }`}
              >
                <Delete className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleEquals}
                className={`h-11 rounded-xl font-bold text-xl bg-brand-600 hover:bg-brand-700 text-white active:scale-95 transition-all flex items-center justify-center cursor-pointer font-[family-name:var(--font-calc-mono)] ${
                  activeKey === "=" ? "ring-2 ring-brand-400" : ""
                }`}
              >
                =
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="h-6 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground mt-3 font-[family-name:var(--font-calc-sans)]">
        <span className="flex items-center gap-1.5 font-[family-name:var(--font-calc-mono)]">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px]">0-9</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px]">+-*/</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px]">Enter</kbd>
        </span>
        <span className="text-brand-600 dark:text-brand-400 font-medium text-xs">
          Keyboard ready
        </span>
      </div>
    </div>
  )
}
