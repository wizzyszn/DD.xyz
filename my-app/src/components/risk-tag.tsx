import { cn } from "@/lib/utils"

interface RiskTagProps {
  name: string
  severity: number
  description?: string
  className?: string
}

export function RiskTag({ name, severity, description, className }: RiskTagProps) {
  // Determine color based on severity
  let colorClass = ""

  if (severity >= 10) {
    colorClass = "bg-red-500/20 text-red-500 border-red-500/30"
  } else if (severity >= 1) {
    colorClass = "bg-orange-500/20 text-orange-500 border-orange-500/30"
  } else if (severity >= 0.1) {
    colorClass = "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
  } else {
    colorClass = "bg-green-500/20 text-green-500 border-green-500/30"
  }

  return (
    <div className={cn("rounded-md border p-2", colorClass, className)}>
      <div className="flex items-start justify-between">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs px-1.5 py-0.5 rounded-full bg-black/20">
          {severity >= 10 ? "High" : severity >= 1 ? "Medium" : "Low"}
        </div>
      </div>
      {description && <p className="text-xs mt-1 opacity-80">{description}</p>}
    </div>
  )
}
