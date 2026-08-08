import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, useEffect, useRef, useState } from "react";

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
  default:    { card: "", value: "" },
  highlight:  { card: "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20", value: "text-indigo-600 dark:text-indigo-400" },
  principal:  { card: "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20", value: "text-blue-600 dark:text-blue-400" },
  returns:    { card: "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20", value: "text-amber-600 dark:text-amber-400" },
  interest:   { card: "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20", value: "text-amber-600 dark:text-amber-400" },
  danger:     { card: "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20", value: "text-rose-600 dark:text-rose-400" },
};

export function ResultCard({ title, value, subValue, icon, highlight = false, variant }: ResultCardProps) {
  // Resolve variant: explicit variant wins, otherwise fall back to highlight bool
  const resolvedVariant: ResultCardVariant = variant ?? (highlight ? "highlight" : "default");
  const styles = variantStyles[resolvedVariant];

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    const textNode = textRef.current;
    if (!container || !textNode) return;

    const updateScale = () => {
      // Temporarily remove transform to get accurate unscaled scrollWidth
      const currentTransform = textNode.style.transform;
      textNode.style.transform = 'none';
      
      const containerWidth = container.offsetWidth;
      const textWidth = textNode.scrollWidth;
      
      textNode.style.transform = currentTransform;

      if (textWidth > containerWidth && containerWidth > 0) {
        // scale down slightly more (0.98) to ensure it doesn't touch the absolute edge
        setScale((containerWidth / textWidth) * 0.98);
      } else {
        setScale(1);
      }
    };

    updateScale();
    
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    
    return () => observer.disconnect();
  }, [value]);

  return (
    <Card className={`transition-all duration-300 ${styles.card} overflow-hidden`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full flex items-center">
          <div 
            ref={textRef}
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: "left center",
              whiteSpace: "nowrap"
            }}
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${styles.value} origin-left transition-transform duration-100 ease-out`}
          >
            {value}
          </div>
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
