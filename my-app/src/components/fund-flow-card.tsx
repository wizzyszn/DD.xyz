import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskBadge } from "@/components/risk-badge"
import { AlertTriangle, AlertOctagon, Droplets, Shield } from "lucide-react"

interface FundFlowRisk {
  ofac: boolean
  hacker: boolean
  mixers: boolean
  drainer: boolean
  fbi_ic3: boolean
  tornado: boolean
}

interface FundFlowAccount {
  type: string
  label: string
  address: string
  risk_score: number
  additional_labels: {
    ofac: boolean
    hacker: boolean
    mixers: boolean
    drainer: boolean
    fbi_ic3: boolean
    tornado: boolean
  }
}

interface FundFlowProps {
  fundFlows: {
    risk: FundFlowRisk
    label: string
    accounts: Record<string, FundFlowAccount>
    fund_flow_risk: FundFlowRisk
  }
}

export function FundFlowCard({ fundFlows }: FundFlowProps) {
  const accounts = Object.values(fundFlows.accounts || {})
  const hasRiskyConnections =
    fundFlows.fund_flow_risk.ofac ||
    fundFlows.fund_flow_risk.hacker ||
    fundFlows.fund_flow_risk.mixers ||
    fundFlows.fund_flow_risk.drainer ||
    fundFlows.fund_flow_risk.fbi_ic3 ||
    fundFlows.fund_flow_risk.tornado

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Fund Flow Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasRiskyConnections ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-500">Risky Connections Detected</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  This address has connections to high-risk entities including
                  {fundFlows.fund_flow_risk.ofac && " sanctioned addresses,"}
                  {fundFlows.fund_flow_risk.tornado && " Tornado Cash,"}
                  {fundFlows.fund_flow_risk.mixers && " coin mixers,"}
                  {fundFlows.fund_flow_risk.drainer && " drainer addresses,"}
                  {fundFlows.fund_flow_risk.hacker && " known hackers,"}
                  {fundFlows.fund_flow_risk.fbi_ic3 && " FBI flagged addresses,"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-500">No Risky Connections</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  This address has no detected connections to high-risk entities.
                </p>
              </div>
            </div>
          </div>
        )}

        {accounts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Connected Addresses</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {accounts.map((account) => (
                <div
                  key={account.address}
                  className="flex items-start justify-between p-2 rounded-md bg-card/50 border border-border/50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      {account.type === "contract" ? (
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <AlertOctagon className="h-3 w-3 text-blue-500" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Droplets className="h-3 w-3 text-purple-500" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-medium">{account.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.address.slice(0, 6)}...{account.address.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5 ml-8">
                      {account.additional_labels.ofac && (
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded-full text-[10px]">OFAC</span>
                      )}
                      {account.additional_labels.tornado && (
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded-full text-[10px]">
                          Tornado
                        </span>
                      )}
                      {account.additional_labels.mixers && (
                        <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-500 rounded-full text-[10px]">
                          Mixer
                        </span>
                      )}
                      {account.additional_labels.drainer && (
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded-full text-[10px]">
                          Drainer
                        </span>
                      )}
                      {account.additional_labels.hacker && (
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded-full text-[10px]">
                          Hacker
                        </span>
                      )}
                      {account.additional_labels.fbi_ic3 && (
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded-full text-[10px]">FBI</span>
                      )}
                    </div>
                  </div>
                  <div>
                    {account.risk_score > 100 ? (
                      <RiskBadge level="critical" />
                    ) : account.risk_score > 50 ? (
                      <RiskBadge level="high" />
                    ) : account.risk_score > 20 ? (
                      <RiskBadge level="medium" />
                    ) : account.risk_score > 0 ? (
                      <RiskBadge level="low" />
                    ) : (
                      <RiskBadge level="low" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
