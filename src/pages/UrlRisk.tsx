"use client";

import { useState } from "react";
import {
  Link2,
  ShieldAlert,
  Globe,
  AlertTriangle,
  FileWarning,
  Users,
  History,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskScore } from "@/components/risk-score";
import { RiskBadge } from "@/components/risk-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface UrlRiskResult {
  url: string;
  score: number;
  riskLevel: "high" | "medium" | "low";
  lastChecked: string;
  categories: {
    phishing: number;
    malware: number;
    scam: number;
  };
}

export default function UrlRisk() {
  const [results, setResults] = useState<UrlRiskResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        url: value,
        score: 7.8,
        riskLevel: "high",
        lastChecked: new Date().toISOString(),
        categories: {
          phishing: 85,
          malware: 45,
          scam: 65,
        },
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">URL Risk Analysis</h1>
        <p className="text-lg text-muted-foreground">
          Analyze URLs and domains for potential security threats and malicious
          activity
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Enter URL to analyze..."
          types={[
            { value: "url", label: "URL" },
            { value: "domain", label: "Domain" },
          ]}
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
              title="Risk Overview"
              icon={<ShieldAlert className="text-red-500" />}
              glowing
            >
              <div className="flex flex-col items-center gap-4">
                <RiskScore score={results.score} size="lg" />
                <RiskBadge level={results.riskLevel} />
                <p className="text-sm text-center text-muted-foreground">
                  High risk of malicious activity detected
                </p>
              </div>
            </DataCard>

            <DataCard
              title="Risk Categories"
              icon={<FileWarning className="text-orange-500" />}
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Phishing Risk</span>
                    <span className="text-red-500 font-bold">
                      {results.categories.phishing}%
                    </span>
                  </div>
                  <Progress
                    value={results.categories.phishing}
                    className="h-2 bg-muted [&>div]:bg-red-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Malware Risk</span>
                    <span className="text-yellow-500 font-bold">
                      {results.categories.malware}%
                    </span>
                  </div>
                  <Progress
                    value={results.categories.malware}
                    className="h-2 bg-muted [&>div]:bg-yellow-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Scam Risk</span>
                    <span className="text-orange-500 font-bold">
                      {results.categories.scam}%
                    </span>
                  </div>
                  <Progress
                    value={results.categories.scam}
                    className="h-2 bg-muted [&>div]:bg-orange-500"
                  />
                </div>
              </div>
            </DataCard>

            <DataCard
              title="Domain Info"
              icon={<Globe className="text-blue-500" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Registered</span>
                  <span className="text-sm text-muted-foreground">
                    2 months ago
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SSL Status</span>
                  <span className="text-sm font-medium text-red-500">
                    Invalid
                  </span>
                </div>
                <div className="h-[1px] bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Scan</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(results.lastChecked).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </DataCard>
          </div>

          <div className="rounded-xl border bg-card">
            <Tabs defaultValue="analysis" className="w-full">
              <TabsList className="w-full border-b px-4 py-2">
                <TabsTrigger value="analysis">Detailed Analysis</TabsTrigger>
                <TabsTrigger value="threats">Active Threats</TabsTrigger>
                <TabsTrigger value="related">Related URLs</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="p-4">
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
                            Critical Security Risk
                          </h4>
                          <time className="text-xs text-muted-foreground">
                            1 hour ago
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Domain associated with known phishing campaigns
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <History className="h-3.5 w-3.5" />
                            First seen 2 days ago
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            Multiple reports
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="threats" className="p-4">
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Active Security Threats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Phishing Campaign</span>
                        </div>
                        <span className="text-xs text-red-500">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Suspicious Scripts</span>
                        </div>
                        <span className="text-xs text-yellow-500">
                          Detected
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-4">
                      Historical Incidents
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Previous Attacks</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          3 incidents
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
                      <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            Similar Malicious Domain
                          </h4>
                          <RiskBadge level="high" size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Related domain with similar malicious patterns
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Globe className="h-3.5 w-3.5" />
                            example-{i + 1}.com
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
          <Link2 className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No URL Selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a URL or domain above to analyze its security risks and
            threats
          </p>
        </div>
      )}
    </div>
  );
}
