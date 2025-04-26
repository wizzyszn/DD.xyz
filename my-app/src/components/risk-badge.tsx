import { AlertTriangle, ShieldCheck, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: "high" | "medium" | "low";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RiskBadge({ level, size = "md", className }: RiskBadgeProps) {
  const variants = {
    high: {
      base: "bg-red-500/10 text-red-500 border-red-500/20",
      icon: <AlertOctagon className="h-3.5 w-3.5" />,
      text: "High Risk",
    },
    medium: {
      base: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      text: "Medium Risk",
    },
    low: {
      base: "bg-green-500/10 text-green-500 border-green-500/20",
      icon: <ShieldCheck className="h-3.5 w-3.5" />,
      text: "Low Risk",
    },
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        "transition-all duration-200 animate-in fade-in-0 zoom-in-95",
        variants[level].base,
        sizeClasses[size],
        className
      )}
    >
      {variants[level].icon}
      <span>{variants[level].text}</span>
    </div>
  );
}
