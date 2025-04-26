"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Shield,
  Users,
  Globe,
  History,
  XCircle,
  ArrowUpDown,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskBadge } from "@/components/risk-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SanctionResult {
  address: string;
  status: "clean" | "flagged" | "suspicious";
  lastChecked: string;
  jurisdiction: string;
  category?: string;
  details?: string;
}

export default function SanctionChecks() {
  const [results, setResults] = useState<SanctionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        address: value,
        status: "clean",
        lastChecked: new Date().toISOString(),
        jurisdiction: "Global",
        category: "Individual",
        details: "No sanctions or restrictions found",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Sanction Checks</h1>
        <p className="text-lg text-muted-foreground">
          Verify addresses against global sanctions and compliance lists
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Enter address to check sanctions..."
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
      ) : results ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DataCard
              title="Sanction Status"
              icon={<Shield className="text-primary" />}
              glowing
            >
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <RiskBadge level="low" />
                <p className="text-sm text-center text-muted-foreground">
                  This address has passed all sanction checks
                </p>
              </div>
            </DataCard>

            <DataCard
              title="Jurisdiction Info"
              icon={<Globe className="text-blue-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Region</span>
                  <span className="text-sm">{results.jurisdiction}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Category</span>
                  <span className="text-sm">{results.category}</span>
                </div>
                <div className="h-[1px] bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(results.lastChecked).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </DataCard>

            <DataCard
              title="Compliance Summary"
              icon={<Users className="text-purple-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">OFAC Status</span>
                  <span className="text-sm font-medium text-green-500">
                    Clear
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">UN Lists</span>
                  <span className="text-sm font-medium text-green-500">
                    Clear
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">EU Sanctions</span>
                  <span className="text-sm font-medium text-green-500">
                    Clear
                  </span>
                </div>
              </div>
            </DataCard>
          </div>

          <div className="rounded-xl border bg-card">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="w-full border-b px-4 py-2">
                <TabsTrigger value="history">Check History</TabsTrigger>
                <TabsTrigger value="details">Detailed Results</TabsTrigger>
                <TabsTrigger value="related">Related Entities</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <History className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Sanction Check Performed
                          </h4>
                          <time className="text-xs text-muted-foreground">
                            {new Date().toLocaleDateString()}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive check against all major sanctions lists
                        </p>
                        <div className="mt-2">
                          <RiskBadge level="low" size="sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="p-4">
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Sanction List Coverage
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">OFAC SDN List</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">UN Sanctions Lists</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">EU Consolidated List</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Additional Checks
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Transaction Monitoring
                          </span>
                        </div>
                        <span className="text-xs text-green-500">
                          No Suspicious Activity
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Associated Entities</span>
                        </div>
                        <span className="text-xs text-green-500">
                          All Clear
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="related" className="p-4">
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <Users className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Related Entity #{i + 1}
                          </h4>
                          <RiskBadge level="low" size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Connected through normal transaction patterns
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Globe className="h-3.5 w-3.5" />
                            Global
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Shield className="h-3.5 w-3.5" />
                            No Sanctions
                          </div>
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
            Enter an address above to check its sanction status and compliance
            information
          </p>
        </div>
      )}
    </div>
  );
}
