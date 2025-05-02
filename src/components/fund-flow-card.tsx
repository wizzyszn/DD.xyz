import { ThreatData } from "@/pages/ThreatRisks";
import { Activity, Clipboard, Eye, EyeOff, Users } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import BlockchainConnectionMap from "./Visualizations/ThreeRiskBubbleMaps";
interface FundFlowCardProps {
  threatData: ThreatData;
  address: string;
}
export function FundFlowCard({ threatData, address }: FundFlowCardProps) {
  const fundFlows = Object.entries(threatData.details.fund_flows.accounts);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [toggleBubbleMaps, setToggleBubbleMaps] = useState(false);
  const bubbleMapRef = useRef<HTMLDivElement | null>(null);
  console.log("Fund flows: ", fundFlows);
  const connectedAddresses = Object.keys(
    threatData.details.fund_flows.accounts
  ).length;
  const triggerBubbles = useCallback(() => {
    setToggleBubbleMaps((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (next && bubbleMapRef.current) {
          bubbleMapRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);
      return next;
    });
  }, []);
  const nodes = Object.entries(
    threatData?.details.fund_flows.accounts || {}
  ).map(([key, value]) => {
    return {
      ...value,
      id: key,
    };
  });

  const links = Object.keys(threatData?.details.fund_flows.accounts || {}).map(
    (key) => {
      return {
        source: address,
        target: key,
        value: 1,
      };
    }
  );

  const BlockChainData = {
    nodes,
    links,
  };
  console.log("BlockChainData: ", BlockChainData);
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-4">Recent Fund Flows</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted text-left">
                <th className="px-4 py-2 font-semibold">Address</th>
                <th className="px-4 py-2 font-semibold">Type</th>
                <th className="px-4 py-2 font-semibold">Risk Score</th>
                <th className="px-4 py-2 font-semibold">Labels</th>
                <th className="px-4 py-2 font-semibold">Tags</th>
              </tr>
            </thead>
            <tbody>
              {fundFlows.map(([key, value], idx) => (
                <tr
                  key={key}
                  className={
                    idx % 2 === 0
                      ? "bg-background hover:bg-muted/50 transition-colors"
                      : "bg-muted/20 hover:bg-muted/40 transition-colors"
                  }
                >
                  <td className="px-4 py-2 font-mono truncate min-w-[160px] text-blue-600 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(key);
                        setCopiedIdx(idx);
                        setTimeout(() => setCopiedIdx(null), 1200);
                      }}
                      className="ml-1 p-1 rounded hover:bg-muted"
                      title={copiedIdx === idx ? "Copied!" : "Copy address"}
                    >
                      <Clipboard
                        className={`h-4 w-4 ${
                          copiedIdx === idx
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    {key}
                  </td>
                  <td className="px-4 py-2 capitalize">{value.type}</td>
                  <td className="px-4 py-2 font-semibold text-center">
                    {value.risk_score}
                  </td>
                  <td className="px-4 py-2 text-xs text-muted-foreground">
                    {value.label}
                  </td>
                  <td className="px-4 py-2 text-xs text-muted-foreground flex gap-1">
                    {Object.entries(value.additional_labels).map(
                      ([key, value]) => {
                        if (value === false) return null;
                        return (
                          <span className=" text-[0.6rem] border p-1 rounded-full text-red-400">
                            {key === "ofac"
                              ? "OFAC"
                              : key === "hacker"
                              ? "HACKER"
                              : key === "mixers"
                              ? "MIXERS"
                              : key === "drainer"
                              ? "DRAINER"
                              : key === "fbi_ic3"
                              ? "FBI IC3"
                              : "Tornado"}
                          </span>
                        );
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="rounded-lg border p-4 mt-6">
            <div className=" flex justify-between">
              <h3 className="text-sm font-medium mb-4">Network Statistics</h3>
              <button onClick={triggerBubbles}>
                {toggleBubbleMaps ? (
                  <EyeOff />
                ) : (
                  <Eye className=" hover:text-blue-500" />
                )}
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Connected Addresses</span>
                </div>
                <span className="text-sm font-medium">
                  {connectedAddresses}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Interaction Frequency</span>
                </div>
                <span className="text-sm font-medium">
                  {connectedAddresses <= 2
                    ? "Low"
                    : connectedAddresses > 2 && connectedAddresses <= 5
                    ? "Medium"
                    : "High"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleBubbleMaps && (
        <div ref={bubbleMapRef}>
          <BlockchainConnectionMap data={BlockChainData} />
        </div>
      )}
    </div>
  );
}
