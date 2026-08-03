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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px] w-full mt-4">
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
                    <stop offset="5%" stopColor={area.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={area.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
              />
              <XAxis
                dataKey={xAxisKey}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                fontSize={12}
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
                stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                fontSize={12}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ fontSize: "14px", fontWeight: 500 }}
                labelStyle={{ color: isDark ? "#94a3b8" : "#64748b", marginBottom: "4px" }}
                formatter={(value: any, name: any) => [valueFormatter(Number(value)), name]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              {areas.map((area) => (
                <Area
                  key={area.key}
                  type="monotone"
                  dataKey={area.key}
                  name={area.name}
                  stroke={area.color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${area.key})`}
                  stackId="1"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
