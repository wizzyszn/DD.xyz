import { cn } from "@/lib/utils";

interface RiskTagProps {
  name: string;
  severity: number;
  type?: string;
  size?: "sm" | "md";
  className?: string;
}

export function RiskTag({
  name,
  severity,
  type,
  size = "md",
  className,
}: RiskTagProps) {
  const getTagColors = (severity: number) => {
    if (severity >= 8) {
      return "bg-red-500/10 text-red-500 border-red-500/20 ring-red-500/10";
    }
    if (severity >= 5) {
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 ring-yellow-500/10";
    }
    return "bg-green-500/10 text-green-500 border-green-500/20 ring-green-500/10";
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md border font-medium",
        "transition-all duration-200 animate-in fade-in-0 zoom-in-95",
        "hover:ring-2 hover:ring-offset-2 dark:hover:ring-offset-background",
        getTagColors(severity),
        sizeClasses[size],
        className
      )}
    >
      <span>{name}</span>
      {type && (
        <>
          <span className="mx-1 text-muted-foreground/50">·</span>
          <span className="text-muted-foreground">{type}</span>
        </>
      )}
    </div>
  );
}
