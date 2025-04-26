import { AlertOctagon, ArrowRight } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { DataCard } from "@/components/data-card"
import { RiskScore } from "@/components/risk-score"
import { RiskBadge } from "@/components/risk-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExposureRisk() {
  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">Exposure Risk</h1>
          <p className="text-muted-foreground max-w-3xl">
            This API returns any exposure any wallet has had to risk. This differs from Threat risk in so far as
            demonstrating to a user if their wallet has been exposed, vs. a wallet that is a threat to others.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar placeholder="Enter wallet address..." types={[{ value: "address", label: "Address" }]} />
          </div>
        </div>

        {/* Sample result for demonstration */}
        <div className="mb-8">
          <DataCard
            title="Exposure Risk Assessment"
            description="0x1234...5678 (Address)"
            icon={<AlertOctagon className="h-5 w-5" />}
            glowing
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col items-center justify-center">
                <RiskScore score={35} size="lg" />
                <p className="mt-2 text-sm text-muted-foreground">Overall Exposure Risk</p>
              </div>

              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-2">Exposure Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This wallet has been exposed to medium risk through interactions with potentially suspicious contracts
                  and tokens. While no critical exposures were detected, caution is advised.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Suspicious Token Transfers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Questionable Contract Interactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">No Phishing Exposure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">No Sanctioned Address Interactions</span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="interactions">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="interactions">Risky Interactions</TabsTrigger>
                <TabsTrigger value="tokens">Suspicious Tokens</TabsTrigger>
                <TabsTrigger value="timeline">Exposure Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="interactions" className="mt-4">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                  <h4 className="text-sm font-medium mb-4">Risky Contract Interactions</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Contract</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                            Interaction Date
                          </th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Risk Level</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50 hover:bg-primary/5">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-xs">0xdef...789</p>
                              <p className="text-xs text-muted-foreground">UnknownSwap</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs">DEX</td>
                          <td className="py-3 px-4 text-xs">2023-09-15</td>
                          <td className="py-3 px-4">
                            <RiskBadge level="medium" />
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Details
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50 hover:bg-primary/5">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-xs">0xabc...123</p>
                              <p className="text-xs text-muted-foreground">AirdropClaim</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs">Airdrop</td>
                          <td className="py-3 px-4 text-xs">2023-10-22</td>
                          <td className="py-3 px-4">
                            <RiskBadge level="medium" />
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Details
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/5">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-xs">0xghi...456</p>
                              <p className="text-xs text-muted-foreground">NFTMarketplace</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs">NFT</td>
                          <td className="py-3 px-4 text-xs">2023-11-05</td>
                          <td className="py-3 px-4">
                            <RiskBadge level="low" />
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Details
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tokens" className="mt-4">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                  <h4 className="text-sm font-medium mb-4">Suspicious Tokens</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Token</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Amount</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                            Received Date
                          </th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Risk Level</th>
                          <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50 hover:bg-primary/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-white">
                                S
                              </div>
                              <div>
                                <p className="text-xs font-medium">SCAM</p>
                                <p className="text-xs text-muted-foreground">ScamToken</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs">1,000,000</td>
                          <td className="py-3 px-4 text-xs">2023-10-15</td>
                          <td className="py-3 px-4">
                            <RiskBadge level="high" />
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Analyze
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b border-border/50 hover:bg-primary/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
                                A
                              </div>
                              <div>
                                <p className="text-xs font-medium">AIR</p>
                                <p className="text-xs text-muted-foreground">AirdropToken</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs">500</td>
                          <td className="py-3 px-4 text-xs">2023-11-02</td>
                          <td className="py-3 px-4">
                            <RiskBadge level="medium" />
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Analyze
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-primary/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                M
                              </div>
                              <div>
                                <p className="text-xs font-medium">MOON</p>
                                <p className="text-xs text-muted-foreground">MoonToken</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs">250</td>
                          <td className="py-3 px-4 text-xs">2023-11-10</td>
                          <td className="py-3 px-4">
                            <RiskBadge level="low" />
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Analyze
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                  <h4 className="text-sm font-medium mb-4">Exposure Timeline</h4>
                  <div className="relative border-l border-border pl-6 ml-3 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[1.625rem] top-1 w-4 h-4 rounded-full bg-yellow-500"></div>
                      <div>
                        <p className="text-sm font-medium">Interacted with UnknownSwap</p>
                        <p className="text-xs text-muted-foreground">September 15, 2023</p>
                        <p className="text-xs mt-1">Swapped ETH for SCAM token on a DEX with medium risk rating.</p>
                        <div className="mt-2">
                          <RiskBadge level="medium" />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[1.625rem] top-1 w-4 h-4 rounded-full bg-yellow-500"></div>
                      <div>
                        <p className="text-sm font-medium">Received Suspicious Airdrop</p>
                        <p className="text-xs text-muted-foreground">October 22, 2023</p>
                        <p className="text-xs mt-1">
                          Received AIR token airdrop from a contract with suspicious activity patterns.
                        </p>
                        <div className="mt-2">
                          <RiskBadge level="medium" />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[1.625rem] top-1 w-4 h-4 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm font-medium">NFT Marketplace Interaction</p>
                        <p className="text-xs text-muted-foreground">November 5, 2023</p>
                        <p className="text-xs mt-1">Purchased NFT from a marketplace with low risk rating.</p>
                        <div className="mt-2">
                          <RiskBadge level="low" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end">
              <Button className="gap-2">
                <span>Generate Detailed Report</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </DataCard>
        </div>
      </div>
    </div>
  )
}
