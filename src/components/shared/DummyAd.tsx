import { Info, Megaphone } from "lucide-react"

interface DummyAdProps {
  className?: string;
  type?: "horizontal" | "vertical" | "square";
}

export function DummyAd({ className = "", type = "horizontal" }: DummyAdProps) {
  // Standard IAB Ad Sizes
  const dimensions = {
    horizontal: "w-full max-w-[728px] h-[90px] mx-auto", // Leaderboard
    vertical: "w-[300px] h-[600px] mx-auto", // Half Page
    square: "w-[300px] h-[250px] mx-auto", // Medium Rectangle
  }

  return (
    <div 
      className={`relative group flex items-center justify-center overflow-hidden rounded border border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-all duration-300 ${dimensions[type]} ${className}`}
    >
      {/* Ad Choices Icon */}
      <div className="absolute top-0 right-0 bg-background/50 backdrop-blur-md px-1.5 py-0.5 rounded-bl flex items-center gap-1 z-10">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Ad</span>
        <Info className="w-3 h-3 text-muted-foreground" />
      </div>

      <div className="flex flex-col items-center justify-center text-center p-4 opacity-50 group-hover:opacity-80 transition-opacity">
        <Megaphone className={`mb-2 text-muted-foreground ${type === 'horizontal' ? 'w-5 h-5 hidden sm:block' : 'w-8 h-8'}`} />
        <h4 className={`font-semibold text-muted-foreground ${type === 'horizontal' ? 'text-sm' : 'text-lg'}`}>
          Advertisement Space
        </h4>
        {type !== 'horizontal' && (
          <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
            Standard {type === 'square' ? '300x250' : '300x600'} placement for Google AdSense or sponsors.
          </p>
        )}
        {type === 'horizontal' && (
          <p className="text-xs text-muted-foreground/70 mt-0.5 hidden sm:block">
            Standard 728x90 Leaderboard placement
          </p>
        )}
      </div>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-muted-foreground/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
    </div>
  )
}
