import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  level: "low" | "medium" | "high" | "critical"
  className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const baseClasses = "px-2 py-0.5 rounded-full text-xs font-medium"

  const levelClasses = {
    low: "bg-green-500/20 text-green-500 border border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-500 border border-orange-500/30",
    critical: "bg-red-500/20 text-red-500 border border-red-500/30",
  }

  return (
    <span className={cn(baseClasses, levelClasses[level], className)}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}
