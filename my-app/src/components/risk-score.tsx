import { cn } from "@/lib/utils";

interface RiskScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RiskScore({ score, size = "md", className }: RiskScoreProps) {
  const getRiskColor = (score: number) => {
    if (score >= 7.5) return "text-red-500";
    if (score >= 5) return "text-yellow-500";
    return "text-green-500";
  };

  const getRiskMeter = (score: number) => {
    if (score >= 7.5) return "risk-meter-high";
    if (score >= 5) return "risk-meter-medium";
    return "risk-meter-low";
  };

  const sizeClasses = {
    sm: "text-xl h-12 w-12",
    md: "text-2xl h-16 w-16",
    lg: "text-3xl h-20 w-20",
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border-4 font-bold",
          "transition-all duration-500 animate-in fade-in-0 zoom-in-95",
          getRiskColor(score),
          sizeClasses[size],
          className
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-10",
            getRiskMeter(score)
          )}
        />
        <span className="relative">{score.toFixed(1)}</span>
      </div>
      <div
        className={cn(
          "absolute -inset-1 rounded-full opacity-30 blur-sm transition-opacity",
          getRiskMeter(score)
        )}
      />
    </div>
  );
}
