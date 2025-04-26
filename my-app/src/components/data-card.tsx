import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  glowing?: boolean;
  className?: string;
}

export function DataCard({
  title,
  icon,
  children,
  glowing,
  className,
}: DataCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
        "transition-all duration-300",
        "hover:shadow-md hover:border-border/60",
        "animate-in fade-in-0 zoom-in-95",
        glowing &&
          "after:absolute after:-inset-px after:rounded-xl after:shadow-[0_0_15px_rgba(24,182,150,0.4)] after:animate-pulse",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon && (
          <div className="transition-transform duration-300 hover:scale-110">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
