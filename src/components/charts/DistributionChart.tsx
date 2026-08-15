"use client"

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface DistributionChartProps {
  title: string;
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
}

export function DistributionChart({
  title,
  data,
  valueFormatter = (val) => val.toString(),
}: DistributionChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card className="h-full flex flex-col border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                  padding: "12px 16px",
                }}
                itemStyle={{ color: isDark ? "#e2e8f0" : "#334155", fontWeight: 500 }}
                formatter={(value: any) => valueFormatter(Number(value))}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                animationBegin={200}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={40}
                formatter={(value, entry) => {
                  const dataPoint = data.find(d => d.name === value);
                  const pct = dataPoint ? ((dataPoint.value / total) * 100).toFixed(0) : "0";
                  return (
                    <span style={{ color: isDark ? "#e2e8f0" : "#334155", fontSize: "13px" }}>
                      {value} ({pct}%)
                    </span>
                  );
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
