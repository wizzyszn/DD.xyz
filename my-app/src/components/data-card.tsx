import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DataCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  glowing?: boolean
}

export function DataCard({ title, description, icon, children, className, glowing = false }: DataCardProps) {
  return (
    <Card className={cn("overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm", glowing && "glow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
