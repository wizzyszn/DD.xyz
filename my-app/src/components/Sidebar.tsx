import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  Globe,
  Shield,
  ShieldAlert,
  FileWarning,
  UserCheck,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Shield,
  },
  {
    name: "Exposure Risk",
    href: "/exposure-risk",
    icon: AlertTriangle,
  },
  {
    name: "Contract Risk",
    href: "/contract-risk",
    icon: FileWarning,
  },
  {
    name: "Approval Risk",
    href: "/approval-risk",
    icon: UserCheck,
  },
  {
    name: "URL Risk",
    href: "/url-risk",
    icon: Link2,
  },
  {
    name: "Sanction Checks",
    href: "/sanction-checks",
    icon: Globe,
  },
  {
    name: "Threat Risks",
    href: "/threat-risks",
    icon: ShieldAlert,
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">DD.xyz</span>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                "transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && [
                  "bg-primary/10 text-primary",
                  "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary",
                  "relative animate-in fade-in slide-in-from-left-1",
                ]
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  "transition-all duration-200",
                  "group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Risk Score</p>
            <p className="text-xs text-muted-foreground">
              Analyzing patterns...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
