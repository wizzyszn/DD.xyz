"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ExternalLink,
  Shield,
  AlertOctagon,
  History,
  Activity,
  Users,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskScore } from "@/components/risk-score";
import { RiskTag } from "@/components/risk-tag";
import { AddressInfoCard } from "@/components/address-info-card";
import { FundFlowCard } from "@/components/fund-flow-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ThreatRisks() {
  const [loading, setLoading] = useState(false);
  const [threatData, setThreatData] = useState<any>(null);

  const handleSearch = (value: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setThreatData({
        score: 8.5,
        riskLevel: "high",
        tags: [
          { name: "Malicious Activity", severity: 9, type: "Security" },
          { name: "Suspicious Transfers", severity: 7, type: "Transaction" },
          { name: "Compromised Account", severity: 8, type: "Account" },
        ],
        addressInfo: {
          address: "0x1234...5678",
          balance: 2.5,
          transactionCount: 156,
          firstTxTime: "2024-01-15T10:30:00Z",
          automated: true,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Threat Risk Analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive analysis of security threats and malicious activities
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Enter address to analyze threats..."
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
      ) : threatData ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DataCard
              title="Threat Score"
              icon={<AlertOctagon className="text-red-500" />}
              glowing
            >
              <div className="flex flex-col items-center gap-4">
                <RiskScore score={threatData.score} size="lg" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {threatData.tags.map((tag: any, i: number) => (
                    <RiskTag
                      key={i}
                      name={tag.name}
                      severity={tag.severity}
                      type={tag.type}
                    />
                  ))}
                </div>
              </div>
            </DataCard>

            <AddressInfoCard
              data={threatData.addressInfo}
              className="md:col-span-2 lg:col-span-1"
            />

            <DataCard
              title="Activity Analysis"
              icon={<Activity className="text-purple-500" />}
              className="md:col-span-2 lg:col-span-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk Actions</span>
                  <span className="text-sm font-bold text-red-500">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Suspicious Patterns
                  </span>
                  <span className="text-sm font-bold text-yellow-500">8</span>
                </div>
                <div className="h-[1px] bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Activities</span>
                  <span className="text-sm font-bold">45</span>
                </div>
              </div>
            </DataCard>
          </div>

          <div className="rounded-xl border bg-card">
            <Tabs defaultValue="risk-factors" className="w-full">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList className="w-auto">
                  <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
                  <TabsTrigger value="fund-flows">Fund Flows</TabsTrigger>
                  <TabsTrigger value="network">Network Analysis</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
              </div>

              <TabsContent value="risk-factors" className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            High Risk Activity Detected
                          </h4>
                          <time className="text-xs text-muted-foreground">
                            2 hours ago
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Multiple high-value transfers to known malicious
                          addresses
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <History className="h-3.5 w-3.5" />
                            Pattern detected
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            Multiple entities involved
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="fund-flows" className="p-4">
                <FundFlowCard />
              </TabsContent>

              <TabsContent value="network" className="p-4">
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Connected Entities
                    </h3>
                    <div className="space-y-4">
                      {[1, 2].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-4 rounded-lg border p-3 transition-colors duration-200 hover:bg-muted/50"
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium">
                              Related Address #{i + 1}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              High-risk interaction pattern
                            </p>
                          </div>
                          <RiskTag severity={8} name="High Risk" size="sm" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Network Statistics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Connected Addresses</span>
                        </div>
                        <span className="text-sm font-medium">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Interaction Frequency</span>
                        </div>
                        <span className="text-sm font-medium">High</span>
                      </div>
                    </div>
                  </div>
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
            Enter an address above to analyze potential security threats
          </p>
        </div>
      )}
    </div>
  );
}
