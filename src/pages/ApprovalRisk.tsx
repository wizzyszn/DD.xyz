"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  ExternalLink,
  Shield,
  Clock,
  Info,
  AlertOctagon,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskBadge } from "@/components/risk-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, formatDistanceToNow } from "date-fns";

interface ApprovalStatus {
  total: number;
  active: number;
  expired: number;
  distribution: {
    high: number;
    medium: number;
    low: number;
    highPercent: number;
    mediumPercent: number;
    lowPercent: number;
  };
}

export default function ApprovalRisks() {
  const [loading, setLoading] = useState(false);
  const [approvalData, setApprovalData] = useState<ApprovalStatus | null>(null);

  const handleSearch = (value: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setApprovalData({
        total: 15,
        active: 8,
        expired: 7,
        distribution: {
          high: 3,
          medium: 4,
          low: 8,
          highPercent: 20,
          mediumPercent: 27,
          lowPercent: 53,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Approval Risk Analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          Analyze and monitor smart contract approval risks and permissions
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Enter address to check approvals..."
        />
      </div>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[200px] rounded-xl bg-muted"></div>
            ))}
          </div>
        </div>
      ) : approvalData ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DataCard
              title="Approval Overview"
              icon={<Shield className="text-primary" />}
              glowing
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Approvals</span>
                  <span className="text-2xl font-bold">
                    {approvalData.total}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Active</span>
                    <span className="font-medium">{approvalData.active}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <span>Expired</span>
                    <span className="font-medium">{approvalData.expired}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${
                        (approvalData.active / approvalData.total) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </DataCard>

            <DataCard
              title="Risk Distribution"
              icon={<AlertOctagon className="text-orange-500" />}
            >
              <div className="space-y-4">
                {approvalData.distribution.high > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-red-500">High Risk</span>
                      <span className="text-sm text-red-500">
                        {approvalData.distribution.highPercent}%
                      </span>
                    </div>
                    <Progress
                      value={approvalData.distribution.highPercent}
                      className="h-2 bg-muted [&>div]:bg-red-500"
                    />
                  </div>
                )}
                {approvalData.distribution.medium > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-yellow-500">
                        Medium Risk
                      </span>
                      <span className="text-sm text-yellow-500">
                        {approvalData.distribution.mediumPercent}%
                      </span>
                    </div>
                    <Progress
                      value={approvalData.distribution.mediumPercent}
                      className="h-2 bg-muted [&>div]:bg-yellow-500"
                    />
                  </div>
                )}
                {approvalData.distribution.low > 0 && (
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-green-500">Low Risk</span>
                      <span className="text-sm text-green-500">
                        {approvalData.distribution.lowPercent}%
                      </span>
                    </div>
                    <Progress
                      value={approvalData.distribution.lowPercent}
                      className="h-2 bg-muted [&>div]:bg-green-500"
                    />
                  </div>
                )}
              </div>
            </DataCard>

            <DataCard
              title="Status Summary"
              icon={<Info className="text-blue-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    High Risk Approvals
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    {approvalData.distribution.high}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Medium Risk Approvals
                  </span>
                  <span className="text-sm font-bold text-yellow-500">
                    {approvalData.distribution.medium}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Low Risk Approvals
                  </span>
                  <span className="text-sm font-bold text-green-500">
                    {approvalData.distribution.low}
                  </span>
                </div>
                <div className="h-[1px] bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </DataCard>
          </div>

          <div className="rounded-xl border bg-card">
            <Tabs defaultValue="active-approvals" className="w-full">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList className="w-auto">
                  <TabsTrigger value="active-approvals">
                    Active Approvals
                  </TabsTrigger>
                  <TabsTrigger value="risk-details">Risk Details</TabsTrigger>
                  <TabsTrigger value="history">Approval History</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  View on Explorer
                </Button>
              </div>

              <TabsContent value="active-approvals" className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Token Approval
                          </h4>
                          <RiskBadge level="medium" size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Unlimited approval for DEX contract
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            Approved 2 days ago
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Shield className="h-3.5 w-3.5" />
                            Contract verified
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="risk-details" className="p-4">
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Risk Categories
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Unlimited Approvals</span>
                        </div>
                        <span className="text-xs text-red-500">
                          3 contracts
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">High Value Approvals</span>
                        </div>
                        <span className="text-xs text-yellow-500">
                          2 contracts
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Suggested Actions
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">
                            Review high-risk approvals
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">Set approval limits</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Set Limits
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="p-4">
                <div className="relative space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {i !== 2 && <div className="h-full w-px bg-border" />}
                      </div>
                      <div className="flex-1 space-y-1 pb-8">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            Approval Granted
                          </p>
                          <time className="text-xs text-muted-foreground">
                            {format(new Date(), "MMM d, yyyy")}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          New approval for DEX contract with unlimited allowance
                        </p>
                        <div className="mt-2">
                          <RiskBadge level="medium" size="sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card/50 p-8 text-center">
          <Shield className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No Address Selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter an address above to analyze its token approvals and
            permissions
          </p>
        </div>
      )}
    </div>
  );
}
