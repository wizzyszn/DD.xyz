import { AlertOctagon, FileWarning, AlertTriangle, Shield } from "lucide-react";
import { DataCard } from "@/components/data-card";
import { RiskScore } from "@/components/risk-score";
import { RiskBadge } from "@/components/risk-badge";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Security Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Monitor and analyze security risks across your assets
        </p>
      </div>

      <div className="w-full max-w-3xl">
        
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DataCard
          title="Overall Risk Score"
          icon={<AlertOctagon className="text-red-500" />}
          glowing
        >
          <div className="flex flex-col items-center gap-4">
            <RiskScore score={7.5} size="lg" />
            <RiskBadge level="high" />
          </div>
        </DataCard>

        <DataCard
          title="Contract Analysis"
          icon={<FileWarning className="text-yellow-500" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">High Risk Issues</span>
              <span className="text-sm font-bold text-red-500">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Medium Risk Issues</span>
              <span className="text-sm font-bold text-yellow-500">5</span>
            </div>
            <div className="h-[1px] bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Contracts</span>
              <span className="text-sm font-bold">12</span>
            </div>
          </div>
        </DataCard>

        <DataCard
          title="Exposure Analysis"
          icon={<AlertTriangle className="text-orange-500" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Suspicious Transfers</span>
              <span className="text-sm font-bold text-orange-500">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Flagged Addresses</span>
              <span className="text-sm font-bold text-yellow-500">4</span>
            </div>
            <div className="h-[1px] bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Exposure</span>
              <span className="text-sm font-bold">$25.5K</span>
            </div>
          </div>
        </DataCard>

        <DataCard
          title="Risk Approvals"
          icon={<Shield className="text-primary" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pending Review</span>
              <span className="text-sm font-bold text-yellow-500">7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Approved</span>
              <span className="text-sm font-bold text-green-500">15</span>
            </div>
            <div className="h-[1px] bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Controls</span>
              <span className="text-sm font-bold">22</span>
            </div>
          </div>
        </DataCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <DataCard
          title="Recent Activity"
         // description="Latest security events and analysis results"
        >
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-lg border p-3 transition-colors duration-200 hover:bg-muted/50"
              >
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    New high-risk contract detected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Potential reentrancy vulnerability found in smart contract
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DataCard>

        <DataCard
          title="Risk Distribution"
         // description="Current risk levels across monitored assets"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">High Risk</span>
                  <span className="text-sm text-muted-foreground">35%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[35%] bg-red-500 transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Medium Risk</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[45%] bg-yellow-500 transition-all duration-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Low Risk</span>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[20%] bg-green-500 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  );
}
