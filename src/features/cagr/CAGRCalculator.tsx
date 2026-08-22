"use client"

import { useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CAGRCalculator() {
  const [initialValue, setInitialValue] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(200000);
  const [years, setYears] = useState<number>(5);

  const calculateCAGR = () => {
    if (initialValue <= 0 || finalValue <= 0 || years <= 0) return 0;
    const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    return cagr;
  };

  const cagr = calculateCAGR();
  const absoluteReturn = finalValue - initialValue;
  const absoluteReturnPercent = initialValue > 0 ? (absoluteReturn / initialValue) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-5 space-y-6 bg-card border border-border/60 p-6 rounded-3xl shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-brand-600" /> Investment Details
        </h2>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Initial Investment (₹)</Label>
            <Input
              type="number"
              value={initialValue || ""}
              onChange={(e) => setInitialValue(Number(e.target.value))}
              className="h-12 text-lg rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Final Value (₹)</Label>
            <Input
              type="number"
              value={finalValue || ""}
              onChange={(e) => setFinalValue(Number(e.target.value))}
              className="h-12 text-lg rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Duration (Years)</Label>
            <Input
              type="number"
              value={years || ""}
              onChange={(e) => setYears(Number(e.target.value))}
              className="h-12 text-lg rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-gradient-to-br from-brand-900 to-brand-950 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Calculator className="w-48 h-48" />
          </div>
          
          <h3 className="text-brand-100 font-medium mb-8">CAGR Results</h3>
          
          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-brand-200 text-sm mb-1">Compound Annual Growth Rate</p>
              <p className="text-5xl font-bold text-white tracking-tight">
                {cagr.toFixed(2)}%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-800/50">
              <div>
                <p className="text-brand-300 text-xs mb-1">Absolute Return</p>
                <p className="text-xl font-semibold">₹{absoluteReturn.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-brand-300 text-xs mb-1">Total Return (%)</p>
                <p className="text-xl font-semibold">{absoluteReturnPercent.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
