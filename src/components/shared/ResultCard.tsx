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

const variantStyles: Record<ResultCardVariant, { card: string; value: string; icon: string }> = {
  default:    { card: "", value: "", icon: "" },
  highlight:  {
    card: "border-brand-300/60 dark:border-brand-700/60 bg-gradient-to-br from-brand-50/80 to-brand-100/40 dark:from-brand-950/40 dark:to-brand-900/20",
    value: "text-brand-600 dark:text-brand-400",
    icon: "text-brand-500 dark:text-brand-400",
  },
  principal: {
    card: "border-blue-200/60 dark:border-blue-800/60 bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-950/40 dark:to-blue-900/20",
    value: "text-blue-600 dark:text-blue-400",
    icon: "text-blue-500 dark:text-blue-400",
  },
  returns: {
    card: "border-amber-200/60 dark:border-amber-800/60 bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-950/40 dark:to-amber-900/20",
    value: "text-amber-600 dark:text-amber-400",
    icon: "text-amber-500 dark:text-amber-400",
  },
  interest: {
    card: "border-amber-200/60 dark:border-amber-800/60 bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-950/40 dark:to-amber-900/20",
    value: "text-amber-600 dark:text-amber-400",
    icon: "text-amber-500 dark:text-amber-400",
  },
  danger: {
    card: "border-rose-200/60 dark:border-rose-800/60 bg-gradient-to-br from-rose-50/80 to-rose-100/40 dark:from-rose-950/40 dark:to-rose-900/20",
    value: "text-rose-600 dark:text-rose-400",
    icon: "text-rose-500 dark:text-rose-400",
  },
};

export function ResultCard({ title, value, subValue, icon, highlight = false, variant }: ResultCardProps) {
  const resolvedVariant: ResultCardVariant = variant ?? (highlight ? "highlight" : "default");
  const styles = variantStyles[resolvedVariant];

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const textNode = textRef.current;
    if (!container || !textNode) return;

    const updateScale = () => {
      const currentTransform = textNode.style.transform;
      textNode.style.transform = "none";

      const containerWidth = container.offsetWidth;
      const textWidth = textNode.scrollWidth;

      textNode.style.transform = currentTransform;

      if (textWidth > containerWidth && containerWidth > 0) {
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
    <Card
      className={`transition-all duration-500 ${styles.card} overflow-hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className={styles.icon}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full flex items-center">
          <div
            ref={textRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "left center",
              whiteSpace: "nowrap",
            }}
            className="text-2xl sm:text-3xl font-bold tracking-tight origin-left transition-transform duration-100 ease-out"
          >
            <span className={styles.value}>{value}</span>
          </div>
        </div>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-1.5">{subValue}</p>
        )}
      </CardContent>
    </Card>
  );
}
