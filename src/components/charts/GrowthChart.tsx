"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DataPoint {
  year: string | number;
  [key: string]: string | number;
}

interface GrowthChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  xAxisKey: string;
  areas: {
    key: string;
    name: string;
    color: string;
  }[];
  valueFormatter?: (value: number) => string;
}

export function GrowthChart({
  title,
  description,
  data,
  xAxisKey,
  areas,
  valueFormatter = (val) => val.toString(),
}: GrowthChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[380px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                {areas.map((area) => (
                  <linearGradient
                    key={`gradient-${area.key}`}
                    id={`gradient-${area.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={area.color} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={area.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
              />
              <XAxis
                dataKey={xAxisKey}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}
                fontSize={12}
                fontWeight={500}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => {
                  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
                  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
                  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`
                  return `₹${value}`
                }}
                stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}
                fontSize={12}
                fontWeight={500}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                  padding: "12px 16px",
                }}
                itemStyle={{ fontSize: "14px", fontWeight: 500 }}
                labelStyle={{ color: isDark ? "#94a3b8" : "#64748b", marginBottom: "6px", fontWeight: 600 }}
                formatter={(value: any, name: any) => [valueFormatter(Number(value)), name]}
                labelFormatter={(label) => `Year ${label}`}
              />
              {areas.map((area) => (
                <Area
                  key={area.key}
                  type="monotone"
                  dataKey={area.key}
                  name={area.name}
                  stroke={area.color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#gradient-${area.key})`}
                  stackId="1"
                  animationDuration={1000}
                  animationBegin={200}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
