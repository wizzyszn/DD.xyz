"use client"

import { useState } from "react"
import { AlertTriangle, ExternalLink, Shield, AlertOctagon } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { DataCard } from "@/components/data-card"
import { RiskScore } from "@/components/risk-score"
import { RiskTag } from "@/components/risk-tag"
import { AddressInfoCard } from "@/components/address-info-card"
import { FundFlowCard } from "@/components/fund-flow-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for demonstration
const sampleData = {
  count: 1,
  medium: 0,
  high: 1,
  overallRisk: 75.16648189186454,
  issues: [
    {
      score: 11.299999999999999,
      tags: [
        {
          name: "Interacted with Mixer",
          description:
            "This address has interacted with a coin mixer. Interacting with coin mixers may result in your address being added to the risk list of third-party institutions and governing bodies.",
          type: "addressRisk",
          severity: 0.1,
          key: "associated_mixer",
        },
        {
          name: "Sanctioned",
          description: "This is a Sanctioned Activity that has been found and reported by world authorities.",
          type: "addressRisk",
          severity: 10,
          key: "sanctioned",
        },
        {
          name: "Interacted with Sanctioned",
          description: "This address has interacted with an address associated with sanctioned activity.",
          type: "addressRisk",
          severity: 0.1,
          key: "associated_sanctioned",
        },
        {
          name: "Interacted with Drainer",
          description:
            "This address has interacted with an address associated with draining activity. Proceed with caution.",
          type: "addressRisk",
          severity: 1,
          key: "associated_drainer",
        },
        {
          name: "Address Poisoning",
          description:
            "This entity is involved in address poisoning attacks, where fake or misleading addresses are used to confuse users and potentially trick them into sending funds to the wrong destination.",
          type: "addressRisk",
          severity: 0.1,
          key: "address_poisoning",
        },
      ],
      categories: {
        fraudulent_malicious: {
          key: "fraudulent_malicious",
          name: "Fraudulent/Malicious",
          gradedDescription: {
            high: "The smart contract/address in this transaction has been used in and is associated with confirmed fraud and malicious activity, or the asset is a known malicious token. Interacting with it may also cause your address to be marked as fraudulent.",
            medium:
              "Elements of the smart contract in this transaction can be used a fraudulent and malicious fashion, or the address in this transaction has been involved in some risk activity.",
            low: "Properties of this transaction indicate the possibility of nefarious activity, but we have not detected anything that would constitute elevated risk",
          },
          tags: {
            sanctioned: true,
            address_poisoning: true,
          },
        },
      },
      riskScore: "High Risk",
    },
  ],
  details: {
    fund_flows: {
      risk: {
        ofac: true,
        hacker: false,
        mixers: false,
        drainer: false,
        fbi_ic3: false,
        tornado: false,
      },
      flows: [],
      label: "Tornado.Cash",
      accounts: {
        "0x16D86Bc643feD8336621092975201194C09CCa36": {
          type: "eoa",
          label: "0x16D86Bc643feD8336621092975201194C09CCa36",
          address: "0x16D86Bc643feD8336621092975201194C09CCa36",
          risk_score: 150,
          additional_labels: {
            ofac: true,
            hacker: false,
            mixers: false,
            drainer: true,
            fbi_ic3: false,
            tornado: true,
          },
        },
        "0x40f41c762763436d73DE1bafb11729C36Ad32a54": {
          type: "eoa",
          label: "0x40f41c762763436d73DE1bafb11729C36Ad32a54",
          address: "0x40f41c762763436d73DE1bafb11729C36Ad32a54",
          risk_score: 0,
          additional_labels: {
            ofac: false,
            hacker: false,
            mixers: false,
            drainer: false,
            fbi_ic3: false,
            tornado: false,
          },
        },
        "0x8589427373D6D84E98730D7795D8f6f8731FDA16": {
          type: "eoa",
          label: "Tornado.Cash",
          address: "0x8589427373D6D84E98730D7795D8f6f8731FDA16",
          risk_score: 20,
          additional_labels: {
            ofac: true,
            hacker: false,
            mixers: false,
            drainer: false,
            fbi_ic3: false,
            tornado: false,
          },
        },
        "0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf": {
          type: "contract",
          label: "Tornado.Cash",
          address: "0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf",
          risk_score: 20,
          additional_labels: {
            ofac: true,
            hacker: false,
            mixers: false,
            drainer: false,
            fbi_ic3: false,
            tornado: false,
          },
        },
        "0xA43Ce8Cc89Eff3AA5593c742fC56A30Ef2427CB0": {
          type: "eoa",
          label: "0xA43Ce8Cc89Eff3AA5593c742fC56A30Ef2427CB0",
          address: "0xA43Ce8Cc89Eff3AA5593c742fC56A30Ef2427CB0",
          risk_score: 0,
          additional_labels: {
            ofac: false,
            hacker: false,
            mixers: false,
            drainer: false,
            fbi_ic3: false,
            tornado: false,
          },
        },
        "0xb541fc07bC7619fD4062A54d96268525cBC6FfEF": {
          type: "contract",
          label: "Tornado.Cash",
          address: "0xb541fc07bC7619fD4062A54d96268525cBC6FfEF",
          risk_score: 20,
          additional_labels: {
            ofac: true,
            hacker: false,
            mixers: false,
            drainer: false,
            fbi_ic3: false,
            tornado: false,
          },
        },
      },
      fund_flow_risk: {
        ofac: true,
        hacker: false,
        mixers: false,
        drainer: true,
        fbi_ic3: false,
        tornado: true,
      },
    },
    address_info: {
      balance: 0.000558068057547,
      expiresAt: 1733503210635,
      time_1st_tx: "2019-08-02T14:25:28.000Z",
      time_verified: 1733416810635,
      has_no_balance: false,
      automated_trading: false,
      transaction_count: 101,
      has_no_transactions: false,
    },
    token_risk: {},
    token_metadata_risk: {},
    marketData: {},
    buy_sell_taxes: {
      has_buy_tax: false,
      has_sell_tax: false,
    },
    dev_launched_tokens_in_24_hours: null,
  },
  isContract: false,
}

// Sample data for a safe address
const safeSampleData = {
  count: 0,
  medium: 0,
  high: 0,
  overallRisk: 5.2,
  issues: [],
  details: {
    fund_flows: {
      risk: {
        ofac: false,
        hacker: false,
        mixers: false,
        drainer: false,
        fbi_ic3: false,
        tornado: false,
      },
      flows: [],
      label: "",
      accounts: {
        "0x40f41c762763436d73DE1bafb11729C36Ad32a54": {
          type: "eoa",
          label: "0x40f41c762763436d73DE1bafb11729C36Ad32a54",
          address: "0x40f41c762763436d73DE1bafb11729C36Ad32a54",
          risk_score: 0,
          additional_labels: {
            ofac: false,
            hacker: false,
            mixers: false,
            drainer: false,
            fbi_ic3: false,
            tornado: false,
          },
        },
      },
      fund_flow_risk: {
        ofac: false,
        hacker: false,
        mixers: false,
        drainer: false,
        fbi_ic3: false,
        tornado: false,
      },
    },
    address_info: {
      balance: 1.25,
      expiresAt: 1733503210635,
      time_1st_tx: "2021-05-12T10:15:28.000Z",
      time_verified: 1733416810635,
      has_no_balance: false,
      automated_trading: false,
      transaction_count: 45,
      has_no_transactions: false,
    },
    token_risk: {},
    token_metadata_risk: {},
    marketData: {},
    buy_sell_taxes: {
      has_buy_tax: false,
      has_sell_tax: false,
    },
    dev_launched_tokens_in_24_hours: null,
  },
  isContract: false,
}

export default function ThreatRisks() {
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Simulate API call
  const handleSearch = (value: string) => {
    setSearchValue(value)
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, show safe data if address starts with "0x1"
      if (value.startsWith("0x1")) {
        setData(sampleData)
      } else if (value.startsWith("0x")) {
        setData(safeSampleData)
      } else {
        setData(null)
      }
      setLoading(false)
    }, 1000)
  }

  const getRiskLevel = (score: number) => {
    if (score >= 70) return "critical"
    if (score >= 50) return "high"
    if (score >= 30) return "medium"
    return "low"
  }

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">Threat Risks</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover the Due Diligence risk of anything on-chain. This includes any contract, wallet, EOA, token, NFT,
            or otherwise.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar placeholder="Enter address, token, contract, or NFT..." onSearch={handleSearch} />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && data && (
          <div className="mb-8">
            <DataCard
              title="Risk Assessment Results"
              description={`${searchValue} (${data.isContract ? "Contract" : "Address"})`}
              icon={<AlertTriangle className="h-5 w-5" />}
              glowing
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center justify-center">
                  <RiskScore score={data.overallRisk} size="lg" />
                  <p className="mt-2 text-sm text-muted-foreground">Overall Risk Score</p>
                </div>

                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-2">Risk Summary</h3>
                  {data.overallRisk > 30 ? (
                    <p className="text-sm text-muted-foreground mb-4">
                      This {data.isContract ? "contract" : "address"} has been identified as{" "}
                      {getRiskLevel(data.overallRisk)} risk due to
                      {data.high > 0 ? ` ${data.high} high risk and ` : ""}
                      {data.medium > 0 ? ` ${data.medium} medium risk ` : ""}
                      {data.high > 0 || data.medium > 0
                        ? "issues."
                        : "suspicious activities and potential security concerns."}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-4">
                      This {data.isContract ? "contract" : "address"} appears to be safe with no significant risk
                      factors detected.
                    </p>
                  )}

                  {data.issues.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {data.issues[0].tags.slice(0, 4).map((tag: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${tag.severity >= 10 ? "bg-red-500" : tag.severity >= 1 ? "bg-orange-500" : "bg-yellow-500"}`}
                          ></div>
                          <span className="text-sm">{tag.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">No significant risk factors</span>
                    </div>
                  )}
                </div>
              </div>

              <Tabs defaultValue="risk-factors">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
                  <TabsTrigger value="fund-flows">Fund Flows</TabsTrigger>
                  <TabsTrigger value="address-info">Address Info</TabsTrigger>
                </TabsList>

                <TabsContent value="risk-factors" className="mt-4">
                  {data.issues.length > 0 ? (
                    <div className="space-y-4">
                      {data.issues.map((issue: any, index: number) => (
                        <div key={index} className="bg-card/50 p-4 rounded-lg border border-border/50">
                          <div className="flex items-start gap-2 mb-4">
                            <AlertTriangle
                              className={`h-5 w-5 ${issue.riskScore === "High Risk" ? "text-red-500" : "text-yellow-500"} mt-0.5`}
                            />
                            <div>
                              <h4 className="text-sm font-medium">{issue.riskScore}</h4>
                              {issue.categories &&
                                Object.values(issue.categories).map((category: any, idx: number) => (
                                  <p key={idx} className="text-xs text-muted-foreground mt-1">
                                    {
                                      category.gradedDescription[
                                        issue.riskScore.toLowerCase().includes("high") ? "high" : "medium"
                                      ]
                                    }
                                  </p>
                                ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {issue.tags.map((tag: any, tagIndex: number) => (
                              <RiskTag
                                key={tagIndex}
                                name={tag.name}
                                severity={tag.severity}
                                description={tag.description}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-green-500">No Risk Factors Detected</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            This {data.isContract ? "contract" : "address"} appears to be safe with no significant risk
                            factors detected.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="fund-flows" className="mt-4">
                  <FundFlowCard fundFlows={data.details.fund_flows} />
                </TabsContent>

                <TabsContent value="address-info" className="mt-4">
                  <AddressInfoCard addressInfo={data.details.address_info} isContract={data.isContract} />
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-end">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>View on Explorer</span>
                </Button>
              </div>
            </DataCard>
          </div>
        )}

        {!loading && !data && searchValue && (
          <div className="flex flex-col items-center justify-center py-16">
            <AlertOctagon className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Results Found</h3>
            <p className="text-muted-foreground">No data found for the address {searchValue}</p>
          </div>
        )}

        {!loading && !data && !searchValue && (
          <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <Shield className="h-16 w-16 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Analyze On-Chain Risk</h2>
              <p className="text-muted-foreground mb-6">
                Enter any blockchain address, contract, token, or NFT to perform a comprehensive risk assessment and
                discover potential threats.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Threat Detection</h3>
                  <p className="text-xs text-muted-foreground">Identify malicious contracts and addresses</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Sanction Checks</h3>
                  <p className="text-xs text-muted-foreground">Verify compliance with regulations</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <AlertOctagon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Risk Scoring</h3>
                  <p className="text-xs text-muted-foreground">Get detailed risk assessment scores</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
