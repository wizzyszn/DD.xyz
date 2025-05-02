import { useState } from "react";
import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { DataCard } from "@/components/data-card";
import { RiskBadge } from "@/components/risk-badge";
import { ResponseError } from "@/types";
interface SanctionResult {
  address: string;
  is_sanctioned: boolean;
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

export default function SanctionChecks() {
  const [results, setResults] = useState<SanctionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResponseError | null>(null);
  const WEBACY_API_KEY = import.meta.env.VITE_WEBACY_API_KEY;
  const handleSearch = async (value: string, chain?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.webacy.com/addresses/sanctioned/${value}?chain=${chain}`,
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
          setResults(null);
          return;
        } catch {}
      }
      const data = await response.json() as SanctionResult;
      setResults({
        address : data.address,
        is_sanctioned : data.is_sanctioned
      })
    } catch (err: any) {
      console.error(err);
      setError({
        name: err.name || "NetworkError",
        message: err.message || "Network error occurred",
        error: err.message || "",
        statusCode: 0,
      });
    } finally {
      setLoading(false);
    }
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
          types={Chains}
          loading={loading}
        />
        {error && <span className="text-xs text-red-500">{error.message}</span>}
      </div>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="">
            {[1].map((i) => (
              <div key={i} className="h-[200px] rounded-xl bg-muted"></div>
            ))}
          </div>
        </div>
      ) : results ? (
        <div className="space-y-6 w-full">
          <div className=" w-full">
            <DataCard
              title="Sanction Status"
              icon={<Shield className="text-primary" />}
              glowing
            >
              <div className="flex flex-col items-center gap-4">
                {!results.is_sanctioned ? 
                <CheckCircle2 className="h-12 w-12 text-green-500" /> : <AlertTriangle className="h-6 w-6 text-yellow-500" />}
                <RiskBadge level={results.is_sanctioned ? "high" : "low"} />
                <p className="text-sm text-center text-muted-foreground">
                  {results.is_sanctioned
                    ? "This address is sanctioned"
                    : "This address has passed all sanction checks"}
                </p>
              </div>
            </DataCard>
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
