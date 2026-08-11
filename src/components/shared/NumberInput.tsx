import React, { useState, useEffect, useRef, useId } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface NumberInputProps {
  id?: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  description?: string;
  showSlider?: boolean;
}

export function NumberInput({
  id: propId,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  prefix,
  suffix,
  description,
  showSlider = true,
}: NumberInputProps) {
  const generatedId = useId();
  const id = propId || generatedId;

  const isFocusedRef = useRef(false);

  // While editing: raw text (no commas). While not editing: formatted with commas.
  const [displayText, setDisplayText] = useState<string>(
    value.toLocaleString("en-IN")
  );

  // Sync display text from external value changes (e.g., slider) when not focused
  useEffect(() => {
    if (!isFocusedRef.current) {
      setDisplayText(value.toLocaleString("en-IN"));
    }
  }, [value]);

  const handleFocus = () => {
    isFocusedRef.current = true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    
    // Strip everything except digits and decimal point
    const stripped = raw.replace(/[^0-9.]/g, "");
    
    if (stripped === "") {
      setDisplayText("");
      return;
    }

    // Preserve the decimal point and numbers after it while typing
    const parts = stripped.split(".");
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? "." + parts[1] : "";
    
    if (integerPart) {
      integerPart = parseInt(integerPart, 10).toLocaleString("en-IN");
    }
    
    const formatted = integerPart + decimalPart;
    setDisplayText(formatted);

    // Parse and propagate in real-time so results update instantly
    const parsed = parseFloat(stripped);
    if (!isNaN(parsed) && parsed >= min && parsed <= max) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    // On blur: parse, clamp, commit, then reformat
    const stripped = displayText.replace(/,/g, "").trim();
    let parsed = parseFloat(stripped);
    if (isNaN(parsed)) parsed = min;
    parsed = Math.min(Math.max(parsed, min), max);
    onChange(parsed);
    setDisplayText(parsed.toLocaleString("en-IN"));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  // Slider updates both the parent and the display text immediately
  const handleSliderChange = (newValues: number | readonly number[]) => {
    const val = Array.isArray(newValues) ? newValues[0] : newValues;
    if (val !== undefined && !isNaN(val)) {
      onChange(val);
      if (!isFocusedRef.current) {
        setDisplayText(val.toLocaleString("en-IN"));
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-left text-foreground font-medium flex flex-col items-start gap-0.5">
          {label}
          {description && (
            <span className="text-xs font-normal text-muted-foreground text-left">{description}</span>
          )}
        </Label>
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm pointer-events-none">
              {prefix}
            </span>
          )}
          <Input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className={`w-36 text-right font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/20 dark:text-brand-400 border-brand-200 dark:border-brand-900 focus:border-brand-500 focus:ring-brand-500 transition-colors ${
              prefix ? "pl-8" : ""
            } ${suffix ? "pr-10" : ""}`}
            value={displayText}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {showSlider && (
        <div className="pt-3 pb-2 px-3">
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={handleSliderChange}
            aria-label={label}
          />
        </div>
      )}
    </div>
  );
}
