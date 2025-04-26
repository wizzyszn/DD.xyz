import { AlertTriangle, Shield, CheckCircle, AlertOctagon, FileWarning, Globe } from "lucide-react"
import { Link } from "react-router-dom"
import { SearchBar } from "../components/search-bar"
import { DataCard } from "../components/data-card"
import { RiskScore } from "../components/risk-score"
import { Button } from "../components/ui/button"

export default function Dashboard() {
  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary glow-text">Token Risk Scanner</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive on-chain risk assessment platform for contracts, wallets, tokens, and more
          </p>

          <div className="mt-8 flex justify-center">
            <SearchBar />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/threat-risks" className="block">
            <DataCard
              title="Threat Risks"
              description="Assess risk of contracts, wallets, tokens, and NFTs"
              icon={<AlertTriangle className="h-5 w-5" />}
              glowing
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scan any on-chain entity for risk factors</p>
                  <p className="text-sm font-medium mt-1">Most used endpoint</p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  Scan
                </Button>
              </div>
            </DataCard>
          </Link>

          <Link to="/sanction-checks" className="block">
            <DataCard
              title="Sanction Checks"
              description="Check if addresses are in sanctioned databases"
              icon={<Shield className="h-5 w-5" />}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verify compliance with regulatory requirements</p>
                  <p className="text-sm font-medium mt-1">Regulatory compliance</p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  Check
                </Button>
              </div>
            </DataCard>
          </Link>

          <Link to="/approval-risks" className="block">
            <DataCard
              title="Approval Risks"
              description="View approvals and associated spender risks"
              icon={<CheckCircle className="h-5 w-5" />}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Identify risky token approvals</p>
                  <p className="text-sm font-medium mt-1">Protect your assets</p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  Analyze
                </Button>
              </div>
            </DataCard>
          </Link>

          <Link to="/exposure-risk" className="block">
            <DataCard
              title="Exposure Risk"
              description="Check wallet exposure to risky entities"
              icon={<AlertOctagon className="h-5 w-5" />}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Discover if your wallet has been exposed to risk</p>
                  <p className="text-sm font-medium mt-1">Personal risk assessment</p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  Evaluate
                </Button>
              </div>
            </DataCard>
          </Link>

          <Link to="/contract-risk" className="block">
            <DataCard
              title="Contract Risk"
              description="Real-time contract risk analysis"
              icon={<FileWarning className="h-5 w-5" />}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Analyze smart contract security risks</p>
                  <p className="text-sm font-medium mt-1">Deep contract analysis</p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  Analyze
                </Button>
              </div>
            </DataCard>
          </Link>

          <Link to="/url-risks" className="block">
            <DataCard
              title="URL Risks"
              description="Predict maliciousness of URLs"
              icon={<Globe className="h-5 w-5" />}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Identify potentially malicious websites</p>
                  <p className="text-sm font-medium mt-1">Phishing protection</p>
                </div>
                <Button variant="outline" className="border-primary/30 text-primary">
                  Scan
                </Button>
              </div>
            </DataCard>
          </Link>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">Recent Scans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Address/URL</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Risk Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-primary/5">
                  <td className="py-3 px-4 text-sm">0x1234...5678</td>
                  <td className="py-3 px-4 text-sm">Contract</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <RiskScore score={75} size="sm" showLabel={false} />
                      <span className="ml-2 text-orange-500 font-medium">High</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">2 minutes ago</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5">
                  <td className="py-3 px-4 text-sm">0xabcd...efgh</td>
                  <td className="py-3 px-4 text-sm">Wallet</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <RiskScore score={15} size="sm" showLabel={false} />
                      <span className="ml-2 text-green-500 font-medium">Low</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">10 minutes ago</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-primary/5">
                  <td className="py-3 px-4 text-sm">scam-token.xyz</td>
                  <td className="py-3 px-4 text-sm">URL</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <RiskScore score={95} size="sm" showLabel={false} />
                      <span className="ml-2 text-red-500 font-medium">Critical</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">15 minutes ago</td>
                </tr>
                <tr className="hover:bg-primary/5">
                  <td className="py-3 px-4 text-sm">0x9876...4321</td>
                  <td className="py-3 px-4 text-sm">Token</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <RiskScore score={45} size="sm" showLabel={false} />
                      <span className="ml-2 text-yellow-500 font-medium">Medium</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">30 minutes ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
