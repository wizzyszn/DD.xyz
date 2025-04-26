import { useState } from "react";
import {
  AlertTriangle,
  FileWarning,
  Link2,
  Clock,
  ShieldAlert,
  AlertOctagon,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskScore } from "@/components/risk-score";
import { RiskBadge } from "@/components/risk-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function ExposureRisk() {
  const [exposureData, setExposureData] = useState<any>(null);

  const handleSearch = (value: string) => {
    // Simulate API call
    setExposureData({
      // Mock data structure
      score: 6.8,
      riskLevel: "medium",
      stats: {
        suspicious_transfers: 3,
        flagged_contracts: 2,
        total_exposure: 15000,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Exposure Risk Analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          Monitor and analyze exposure to risky contracts and suspicious
          activities
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Enter address to analyze exposure..."
        />
      </div>

      {exposureData ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DataCard
              title="Risk Score"
              icon={<AlertOctagon className="text-yellow-500" />}
              glowing
            >
              <div className="flex flex-col items-center gap-4">
                <RiskScore score={exposureData.score} size="lg" />
                <RiskBadge level={exposureData.riskLevel as any} />
              </div>
            </DataCard>

            <DataCard
              title="Risk Distribution"
              icon={<ShieldAlert className="text-orange-500" />}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">High Risk Exposure</span>
                    <span className="text-red-500 font-bold">35%</span>
                  </div>
                  <Progress
                    value={35}
                    className="h-2 bg-muted [&>div]:bg-red-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Medium Risk Exposure</span>
                    <span className="text-yellow-500 font-bold">45%</span>
                  </div>
                  <Progress
                    value={45}
                    className="h-2 bg-muted [&>div]:bg-yellow-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Low Risk Exposure</span>
                    <span className="text-green-500 font-bold">20%</span>
                  </div>
                  <Progress
                    value={20}
                    className="h-2 bg-muted [&>div]:bg-green-500"
                  />
                </div>
              </div>
            </DataCard>

            <DataCard
              title="Exposure Statistics"
              icon={<FileWarning className="text-primary" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Suspicious Transfers
                  </span>
                  <span className="text-sm font-bold text-orange-500">
                    {exposureData.stats.suspicious_transfers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Flagged Contracts</span>
                  <span className="text-sm font-bold text-yellow-500">
                    {exposureData.stats.flagged_contracts}
                  </span>
                </div>
                <div className="h-[1px] bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Exposure</span>
                  <span className="text-sm font-bold">
                    ${exposureData.stats.total_exposure.toLocaleString()}
                  </span>
                </div>
              </div>
            </DataCard>
          </div>

          <div className="rounded-xl border bg-card">
            <Tabs defaultValue="interactions" className="w-full">
              <TabsList className="w-full border-b px-4 py-2">
                <TabsTrigger value="interactions">
                  Risky Interactions
                </TabsTrigger>
                <TabsTrigger value="tokens">Suspicious Tokens</TabsTrigger>
                <TabsTrigger value="timeline">Exposure Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="interactions" className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Suspicious Contract Interaction
                          </h4>
                          <RiskBadge level="medium" size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Interaction with a contract flagged for suspicious
                          activity
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />3 hours ago
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Link2 className="h-3.5 w-3.5" />
                            View Transaction
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tokens" className="p-4">
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Suspicious Token Transfer
                          </h4>
                          <RiskBadge level="high" size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Transfer of tokens with suspicious characteristics
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />1 day ago
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Link2 className="h-3.5 w-3.5" />
                            View Token
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="p-4">
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
                            First Exposure Detected
                          </p>
                          <time className="text-xs text-muted-foreground">
                            2 days ago
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Initial interaction with a flagged contract detected
                        </p>
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
          <AlertTriangle className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No Address Selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter an address above to analyze its exposure to risky contracts
            and activities
          </p>
        </div>
      )}
    </div>
  );
}
