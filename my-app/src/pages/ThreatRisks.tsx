import { useEffect, useState } from "react";
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

type SingleCategory = {
  key: string;
  name: string;
  gradedDescription: Record<"high" | "medium" | "low", string>;
  tags: {
    sanctioned: boolean;
    address_poisoning: boolean;
  };
};
type Category = Record<"fraudulent_malicious", SingleCategory>;
interface Issue {
  score: number;
  tags: Array<{
    name: string;
    description: string;
    type: "addressRisk";
    severity: number;
    key:
      | "associated_mixer"
      | "sanctioned"
      | "associated_sanctioned"
      | "associated_drainer"
      | "address_poisoning";
  }>;
  categories: Category;
  riskScore: string;
}
type RiskTypes = Record<
  "ofac" | "hacker" | "mixers" | "drainer" | "fbi_ic3" | "tornado",
  boolean
>;
type Account = {
  [address: string]: {
    type: "eoa" | "contract";
    label: string;
    address: string;
    risk_score: number;
    additional_labels: RiskTypes;
  };
};
interface AddressInfo {
  balance: number;
  expiresAt: number;
  time_1st_tx: string;
  time_verified: number;
  has_no_balance: boolean;
  automated_trading: boolean;
  transaction_count: number;
  has_no_transactions: boolean;
}
interface ThreatData {
  count: number;
  medium: number;
  high: number;
  overallRisk: number;
  issues: Issue[];
  details: {
    fund_flows: {
      risk: RiskTypes;
      flows: any[];
      label: string;
      accounts: Account;
      fund_flow_risk: RiskTypes;
    };
    address_info: AddressInfo;
  };
}
interface ResponseError extends Error {
  message: string;
  error: string;
  statusCode: number;
}
const Chains = [
  { label: "ETH", value: "eth" },
  { label: "Base", value: "base" },
  {
    label: "BSC",
    value: "bsc",
  },
  { label: "Polygon", value: "pol" },
  { label: "Opt", value: "opt" },
  { label: "Arbitrum", value: "arb" },
  { label: "Solana", value: "sol" },
  { label: "Ton", value: "ton" },
  { label: "Sei", value: "sei" },
];
export default function ThreatRisks() {
  const [loading, setLoading] = useState(false);
  const [threatData, setThreatData] = useState<ThreatData | null>(null);
  const [address, setAddress] = useState("");
  const [chainType, setChainType] = useState("");
  const [error, setError] = useState<ResponseError | null>(null);
  const [activityCount, setActivityCount] = useState(0);

  const handleSearch = async (value: string, chain?: string) => {
    setLoading(true);
    setAddress(value);
    setChainType(chain as string);
    setError(null);
    try {
      const response = await fetch(
        `https://api.webacy.com/addresses/${value}/?chain=${chain}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": "xmKKmaD3Th5tP3PUPUZsB8MaiZ3RvhVe4EpTaTzJ",
          },
        }
      );
      if (!response.ok) {
        let errorMsg = "An error occured. Please try again";
        try {
          const errorData = (await response.json()) || errorMsg;
          errorMsg = errorData.message || errorMsg;
          setError({
            name: "APIError",
            message: errorMsg,
            error: errorMsg,
            statusCode: response.status,
          });
          setThreatData(null);
          return;
        } catch {}
      }
      const data = (await response.json()) as ThreatData;
      setThreatData(data);
    } catch (err: any) {
      console.error(err);
      setError({
        name: err.name || "NetworkError",
        message: err.message || "Network error occurred",
        error: err.message || "",
        statusCode: 0,
      });
      setThreatData(null);
    } finally {
      setLoading(false);
    }
  };
  console.log(threatData);
  useEffect(() => {
    if (!threatData) return;
    threatData?.issues.forEach((issue) => {
      let count = 0;
      count += issue.tags.length;
      setActivityCount(count);
    });
  }, [threatData?.issues]);

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
          types={Chains}
          loading={loading}
        />
        {error && (
          <div className="text-red-500 mt-2 text-xs ">{error.message}</div>
        )}
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
                <RiskScore score={threatData.overallRisk || 0} size="lg" />
                {/*      <div className="flex flex-wrap gap-2 justify-center">
                  {threatData.tags.map((tag: any, i: number) => (
                    <RiskTag
                      key={i}
                      name={tag.name}
                      severity={tag.severity}
                      type={tag.type}
                    />
                  ))}
                </div>*/}
              </div>
            </DataCard>

            <AddressInfoCard
              data={threatData.details.address_info}
              className="md:col-span-2 lg:col-span-1"
              address={address}
              chain={chainType}
            />

            <DataCard
              title="Activity Analysis"
              icon={<Activity className="text-purple-500" />}
              className="md:col-span-2 lg:col-span-1"
              glowing
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Issues</span>
                  <span className="text-sm font-bold text-red-500">
                    {threatData.issues.length}
                  </span>
                </div>
                <div className="h-[1px] bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Total Activities / Interactions
                  </span>
                  <span className="text-sm font-bold">{activityCount}</span>
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
