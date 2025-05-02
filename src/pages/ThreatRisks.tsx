import { useEffect, useState } from "react";
import {ResponseError} from "@/types"
import {
  ExternalLink,
  Shield,
  AlertOctagon,
  Activity,
} from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskScore } from "@/components/risk-score";
import { AddressInfoCard } from "@/components/address-info-card";
import { FundFlowCard } from "@/components/fund-flow-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiskBadge } from "@/components/risk-badge";
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
export interface ThreatData {
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
  const WEBACY_API_KEY = import.meta.env.VITE_WEBACY_API_KEY;
  useEffect(() => {
    if (!threatData) return;
    threatData?.issues.forEach((issue) => {
      let count = 0;
      count += issue.tags.length;
      setActivityCount(count);
    });
  }, [threatData?.issues]);
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
            "x-api-key": WEBACY_API_KEY,
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
                <RiskBadge
                  level={
                    threatData.overallRisk <= 10
                      ? "low"
                      : threatData.overallRisk > 10 &&
                        threatData.overallRisk <= 50
                      ? "medium"
                      : "high"
                  }
                />
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
                  <TabsTrigger value="fund-flows">Network Analysis</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
              </div>

              <TabsContent value="risk-factors" className="p-4">
                <div className="space-y-4">
                  {threatData.issues[0].tags.map((tag) => {
                    return (
                      <SeverityCard
                        title={tag.name}
                        desc={tag.description}
                        severity={tag.severity}
                      />
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="fund-flows" className="p-4">
                <FundFlowCard threatData={threatData} address={address}/>
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

interface SeverityCardProps {
  title: string;
  desc: string;
  severity: number;
}
const SeverityCard = ({ title, desc, severity }: SeverityCardProps) => {
  const [color, setColor] = useState("");
  const [width, setWidth] = useState(1);
  useEffect(() => {
    setWidth(Math.round(severity * 10));
    if (severity > 5 && severity <= 10) {
      setColor("red");
    } else if (severity <= 5 && severity > 2) {
      setColor("yellow");
    } else if (severity <= 2) {
      setColor("green");
    }
  }, []);
  return (
    <div
      className="grid grid-cols-3 gap-4 rounded-lg border p-4 transition-colors duration-200 hover:bg-muted/50"
      key={desc}
    >
      <div className=" flex flex-col gap-2 col-span-1">
        <h3 className=" text-lg">{title}</h3>
        <div className=" flex flex-col gap-1">
          <span className=" text-xs text-muted-foreground">Severity</span>
          <span
            className=" border"
            style={{
              position: "relative",
              background: "#FFFFFF33",
              height: "5px",
              width: "90px",
              borderRadius: "20px",
            }}
          >
            <span
              style={{
                position: "absolute",
                height: "100%",
                width: `${width}%`,
                background: color,
                borderRadius: "20px",
              }}
            ></span>
          </span>
        </div>
      </div>
      <div className="col-start-2 col-end-4 text-sm">{desc}</div>
    </div>
  );
};
