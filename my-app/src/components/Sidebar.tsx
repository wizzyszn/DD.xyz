import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  AlertOctagon,
  FileWarning,
  Globe,
  BarChart3,
  Menu,
  X,
  Home,
} from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Threat Risks",
    href: "/threat-risks",
    icon: AlertTriangle,
  },
  {
    name: "Sanction Checks",
    href: "/sanction-checks",
    icon: Shield,
  },
  {
    name: "Approval Risks",
    href: "/approval-risks",
    icon: CheckCircle,
  },
  {
    name: "Exposure Risk",
    href: "/exposure-risk",
    icon: AlertOctagon,
  },
  {
    name: "Contract Risk",
    href: "/contract-risk",
    icon: FileWarning,
  },
  {
    name: "URL Risks",
    href: "/url-risks",
    icon: Globe,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
]

export function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-primary glow-text">RiskScanner</h1>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary/20 text-primary glow-border"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">System Status</p>
                <p className="text-sm font-medium text-primary">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
