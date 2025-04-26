import { cn } from "@/lib/utils"

interface RiskScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function RiskScore({ score, size = "md", showLabel = true, className }: RiskScoreProps) {
  // Ensure score is between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score))

  // Determine risk level
  let riskLevel: "Low" | "Medium" | "High" | "Critical"
  let riskColor: string
  let meterClass: string

  if (normalizedScore < 25) {
    riskLevel = "Low"
    riskColor = "text-green-500"
    meterClass = "risk-meter-low"
  } else if (normalizedScore < 50) {
    riskLevel = "Medium"
    riskColor = "text-yellow-500"
    meterClass = "risk-meter-medium"
  } else if (normalizedScore < 75) {
    riskLevel = "High"
    riskColor = "text-orange-500"
    meterClass = "risk-meter-high"
  } else {
    riskLevel = "Critical"
    riskColor = "text-red-500"
    meterClass = "risk-meter-high"
  }

  // Size classes
  const sizeClasses = {
    sm: "w-16 h-16 text-sm",
    md: "w-24 h-24 text-lg",
    lg: "w-32 h-32 text-xl",
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "relative rounded-full border-4 border-muted flex items-center justify-center font-bold",
          sizeClasses[size],
        )}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className={cn("h-full", meterClass)} style={{ width: `${normalizedScore}%` }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span className={cn("font-bold", riskColor)}>{normalizedScore}</span>
        </div>
      </div>
      {showLabel && (
        <div className="mt-2 text-center">
          <p className={cn("font-medium", riskColor)}>{riskLevel} Risk</p>
        </div>
      )}
    </div>
  )
}
