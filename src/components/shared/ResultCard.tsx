import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type ResultCardVariant = "default" | "highlight" | "principal" | "returns" | "interest" | "danger";

interface ResultCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon?: ReactNode;
  highlight?: boolean;
  variant?: ResultCardVariant;
}

const variantStyles: Record<ResultCardVariant, { card: string; value: string }> = {
  default:    { card: "shadow-sm", value: "" },
  highlight:  { card: "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md", value: "text-emerald-600 dark:text-emerald-400" },
  principal:  { card: "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 shadow-md", value: "text-blue-600 dark:text-blue-400" },
  returns:    { card: "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 shadow-md", value: "text-amber-600 dark:text-amber-400" },
  interest:   { card: "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 shadow-md", value: "text-amber-600 dark:text-amber-400" },
  danger:     { card: "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 shadow-md", value: "text-rose-600 dark:text-rose-400" },
};

export function ResultCard({ title, value, subValue, icon, highlight = false, variant }: ResultCardProps) {
  // Resolve variant: explicit variant wins, otherwise fall back to highlight bool
  const resolvedVariant: ResultCardVariant = variant ?? (highlight ? "highlight" : "default");
  const styles = variantStyles[resolvedVariant];

  return (
    <Card className={`transition-all duration-300 ${styles.card}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl sm:text-3xl font-bold tracking-tight ${styles.value}`}>
          {value}
        </div>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-1">
            {subValue}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
