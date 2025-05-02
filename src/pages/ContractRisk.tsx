"use client";

import { useState } from "react";
import {
  FileWarning,
  AlertTriangle,
  FileCode,
  ExternalLink,
  Shield,
  XCircle,
  Clock,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskScore } from "@/components/risk-score";
import { RiskBadge } from "@/components/risk-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// Define types for the API response
interface ContractRiskTag {
  key: string;
  name: string;
  type: string;
  severity: number;
  description: string;
}

interface ContractRiskData {
  tags: ContractRiskTag[];
  score: number;
  analysis: any[];
  deployer: Record<string, any>;
  expiresAt: number;
  riskScore: string;
  categories: Record<string, any>;
  analysis_type: string;
  analysis_status: string;
  similar_contracts: any[];
  isExpired: boolean;
}

export default function ContractRisk() {
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState<ContractRiskData | null>(
    null
  );

  const handleSearch = (value: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setContractData({
        tags: [
          {
            key: "trust_list",
            name: "Trusted",
            type: "tokenRisk",
            severity: 0,
            description:
              "This asset is a trusted project with a history or reputation, and has been verified as authentic.",
          },
        ],
        score: 0,
        analysis: [],
        deployer: {},
        expiresAt: 1744699499055,
        riskScore: "Low Risk",
        categories: {},
        analysis_type: "static",
        analysis_status: "done",
        similar_contracts: [],
        isExpired: true,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Contract Risk Analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          Analyze smart contracts for potential security risks and
          vulnerabilities
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Enter contract address..."
        />
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
        </div>
      ) : contractData ? (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DataCard
              title="Risk Overview"
              icon={<FileWarning className="text-red-500" />}
              glowing
            >
              <div className="flex flex-col items-center gap-4">
                <RiskScore score={8.5} size="lg" />
                <RiskBadge level="high" />
              </div>
            </DataCard>

            <DataCard
              title="Security Analysis"
              icon={<Shield className="text-yellow-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Critical Issues</span>
                  <span className="text-sm font-bold text-red-500">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk Issues</span>
                  <span className="text-sm font-bold text-orange-500">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Medium Risk Issues
                  </span>
                  <span className="text-sm font-bold text-yellow-500">5</span>
                </div>
              </div>
            </DataCard>

            <DataCard
              title="Contract Info"
              icon={<FileCode className="text-blue-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Created</span>
                  <span className="text-sm text-muted-foreground">
                    2 days ago
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Updated</span>
                  <span className="text-sm text-muted-foreground">
                    5 hours ago
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-sm font-medium text-orange-500">
                    Under Review
                  </span>
                </div>
              </div>
            </DataCard>
          </div>

          <div className="rounded-xl border bg-card">
            <Tabs defaultValue="analysis" className="w-full">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList className="w-auto">
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="details">Contract Details</TabsTrigger>
                  <TabsTrigger value="similar">Similar Contracts</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  View on Explorer
                </Button>
              </div>

              <TabsContent value="analysis" className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">
                          High Severity Vulnerability
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Potential reentrancy vulnerability detected in
                          transfer function
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            Detected 2 hours ago
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <XCircle className="h-3.5 w-3.5" />
                            Not Fixed
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      Contract Analysis
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">
                      Detailed analysis of the smart contract's security posture
                      and potential risks.
                    </p>
                  </div>
                  {/* Add more contract details here */}
                </div>
              </TabsContent>

              <TabsContent value="similar" className="p-4">
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">
                          Similar Contract #{i + 1}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Contract with similar vulnerability patterns
                        </p>
                      </div>
                      <RiskBadge level="high" size="sm" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card/50 p-8 text-center">
          <FileCode className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No Contract Selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a contract address above to analyze its security risks and
            vulnerabilities
          </p>
        </div>
      )}
    </div>
  );
}
