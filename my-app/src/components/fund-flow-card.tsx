import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleDollarSign,
  History,
} from "lucide-react";

export function FundFlowCard() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-medium mb-4">Recent Fund Flows</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-lg border p-3 transition-colors duration-200 hover:bg-muted/50"
            >
              {i % 2 === 0 ? (
                <div className="mt-0.5 rounded-full bg-red-500/10 p-1">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                </div>
              ) : (
                <div className="mt-0.5 rounded-full bg-green-500/10 p-1">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                </div>
              )}
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    {i % 2 === 0 ? "Outgoing Transfer" : "Incoming Transfer"}
                  </h4>
                  <span className="text-sm font-medium">
                    {i % 2 === 0 ? "-" : "+"}2.5 ETH
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">0x1234...5678</p>
                  <time className="text-xs text-muted-foreground">
                    2 hours ago
                  </time>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Activity className="h-3.5 w-3.5" />
                    {i % 2 === 0 ? "High risk recipient" : "Trusted sender"}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <History className="h-3.5 w-3.5" />
                    First interaction
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium mb-4">Flow Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-red-500/10 p-1">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-sm">Outgoing</span>
              </div>
              <span className="text-sm font-medium text-red-500">
                -15.8 ETH
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-500/10 p-1">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-sm">Incoming</span>
              </div>
              <span className="text-sm font-medium text-green-500">
                +12.3 ETH
              </span>
            </div>
            <div className="h-[1px] bg-border" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-500/10 p-1">
                  <CircleDollarSign className="h-4 w-4 text-blue-500" />
                </div>
                <span className="text-sm">Net Flow</span>
              </div>
              <span className="text-sm font-medium text-blue-500">
                -3.5 ETH
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium mb-4">Risk Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm">High Risk</span>
              </div>
              <span className="text-sm text-muted-foreground">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span className="text-sm">Medium Risk</span>
              </div>
              <span className="text-sm text-muted-foreground">35%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm">Low Risk</span>
              </div>
              <span className="text-sm text-muted-foreground">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
