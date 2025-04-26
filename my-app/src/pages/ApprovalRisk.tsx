"use client"

import { useState } from "react"
import { CheckCircle, AlertTriangle, ShieldAlert, ExternalLink, Shield, Clock, Info, AlertOctagon } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { DataCard } from "@/components/data-card"
import { RiskBadge } from "@/components/risk-badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, formatDistanceToNow } from "date-fns"

// Sample data for demonstration
const sampleData = {
  totalPages: 1,
  page: 1,
  limit: 50,
  total: 10,
  results: [
    {
      txData: {
        blockNum: "10002851",
        uniqueId: "hash#7b912f3",
        hash: "0xaf7a407afc4cbc650d82ec289293ea7db961ccfc7d31a8c002c7fd6803a09d9c",
        from: "0x8589427373d6d84e98730d7795d8f6f8731fda16",
        to: "0xe4c9194962532feb467dce8b3d42419641c6ed2e",
        value: 0,
        erc721TokenId: "",
        erc1155Metadata: null,
        tokenId: "",
        asset: "ETH",
        assetAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        category: "external",
        rawContract: {
          address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
          value: "57896044618658097711785492504343953926634992332820282019728792003956564819968",
        },
        metadata: {
          blockTimestamp: "2020-05-04T23:55:51.000Z",
        },
        blockNumDec: 10002851,
        timestamp: 1588636551,
        datetime: "2020-05-04T23:55:51.000Z",
        direction: "outgoing",
        isContract: true,
        tokenType: "ERC20",
        functionName: "approve(address _spender, uint256 _value)",
        chain: "eth",
        counterparty: "0xe4c9194962532feb467dce8b3d42419641c6ed2e",
        isApproval: true,
      },
      isApprovedForAll: true,
      remainingAllowance: 5.78960446186581e58,
      tokenMetadata: {
        name: "Single Collateral DAI",
        symbol: "SAI",
        logo: "https://static.alchemyapi.io/images/assets/2308.png",
        decimals: 18,
        assetAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
      },
      risk: {
        score: 0.30000000000000004,
        tags: [
          {
            name: "Trusted",
            description:
              "This asset is a trusted project with a history or reputation, and has been verified as authentic.",
            type: "tokenRisk",
            severity: 0,
            key: "trust_list",
          },
          {
            name: "Access Control",
            description:
              "The token has users with special privileges, such as the ability to mint new tokens, burn existing tokens, or change the contract's code. Refer to the code for more details.",
            type: "tokenRisk",
            severity: 0.5,
            key: "access_control",
          },
          {
            name: "Mintable",
            description:
              "Tokens can be created (minted) by the token authority, introducing inflationary risks or vulnerabilities if not properly controlled, potentially leading to dilution of value.",
            type: "tokenRisk",
            severity: 5,
            key: "is_mintable",
          },
          {
            name: "Hidden Owner",
            description:
              "Hidden ownership is used by developers to maintain ownership ability even after abandoning ownership, and is often an indicator of malicious intent. When a hidden owner exists, it is safe to assume that ownership has not been abandoned.",
            type: "tokenRisk",
            severity: 1,
            key: "hidden_owner",
          },
        ],
        categories: {
          governance_issues: {
            key: "governance_issues",
            name: "Contract Governance",
            description:
              "Suspect logic in the smart contract for this asset indicates elevated governance risk. This means that the owner or creator has the ability to change elements of the smart contract that may affect the nature of your ownership of the tokens. Token scams like rugpulls typically exhibit signs of governance issues.",
            tags: {
              access_control: true,
              is_mintable: true,
            },
          },
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
              hidden_owner: true,
            },
          },
        },
        riskScore: "Low Risk",
      },
    },
    {
      txData: {
        blockNum: "11522169",
        uniqueId: "hash#cb1fe7d",
        hash: "0x4a0fa67487111d6c13d24b0f3d99d3bb34dc1b0c942b5db3649f70a49159c3f5",
        from: "0x8589427373d6d84e98730d7795d8f6f8731fda16",
        to: "0x111111125434b319222cdbf8c261674adb56f3ae",
        value: 0,
        erc721TokenId: "",
        erc1155Metadata: null,
        tokenId: "",
        asset: "ETH",
        assetAddress: "0x111111111117dc0aa78b770fa6a738034120c302",
        category: "external",
        rawContract: {
          address: "0x111111111117dc0aa78b770fa6a738034120c302",
          value: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        },
        metadata: {
          blockTimestamp: "2020-12-25T10:08:40.000Z",
        },
        blockNumDec: 11522169,
        timestamp: 1608890920,
        datetime: "2020-12-25T10:08:40.000Z",
        direction: "outgoing",
        isContract: true,
        tokenType: "ERC20",
        functionName: "approve(address _spender, uint256 _value)",
        chain: "eth",
        counterparty: "0x111111125434b319222cdbf8c261674adb56f3ae",
        isApproval: true,
      },
      isApprovedForAll: true,
      remainingAllowance: 1.157920892373162e59,
      tokenMetadata: {
        name: "1inch Network",
        symbol: "1INCH",
        logo: "https://static.alchemyapi.io/images/assets/8104.png",
        decimals: 18,
        assetAddress: "0x111111111117dc0aa78b770fa6a738034120c302",
      },
      risk: {
        score: 0.2,
        tags: [
          {
            name: "Trusted",
            description:
              "This asset is a trusted project with a history or reputation, and has been verified as authentic.",
            type: "tokenRisk",
            severity: 0,
            key: "trust_list",
          },
          {
            name: "Access Control",
            description:
              "The token has users with special privileges, such as the ability to mint new tokens, burn existing tokens, or change the contract's code. Refer to the code for more details.",
            type: "tokenRisk",
            severity: 0.5,
            key: "access_control",
          },
          {
            name: "Mintable",
            description:
              "Tokens can be created (minted) by the token authority, introducing inflationary risks or vulnerabilities if not properly controlled, potentially leading to dilution of value.",
            type: "tokenRisk",
            severity: 5,
            key: "is_mintable",
          },
        ],
        categories: {
          governance_issues: {
            key: "governance_issues",
            name: "Contract Governance",
            description:
              "Suspect logic in the smart contract for this asset indicates elevated governance risk. This means that the owner or creator has the ability to change elements of the smart contract that may affect the nature of your ownership of the tokens. Token scams like rugpulls typically exhibit signs of governance issues.",
            tags: {
              access_control: true,
              is_mintable: true,
            },
          },
        },
        riskScore: "Low Risk",
      },
    },
    {
      txData: {
        blockNum: "12144632",
        uniqueId: "hash#8ee30a7",
        hash: "0x3f861cddfb35d920df7ee4b2ab51db935b286febb189372742bed183a52e2a65",
        from: "0x8589427373d6d84e98730d7795d8f6f8731fda16",
        to: "0x11111112542d85b3ef69ae05771c2dccff4faa26",
        value: 0,
        erc721TokenId: "",
        erc1155Metadata: null,
        tokenId: "",
        asset: "ETH",
        assetAddress: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
        category: "external",
        rawContract: {
          address: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
          value: "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        },
        metadata: {
          blockTimestamp: "2021-03-31T03:10:39.000Z",
        },
        blockNumDec: 12144632,
        timestamp: 1617160239,
        datetime: "2021-03-31T03:10:39.000Z",
        direction: "outgoing",
        isContract: true,
        tokenType: "ERC20",
        functionName: "approve(address _spender, uint256 _value)",
        chain: "eth",
        counterparty: "0x11111112542d85b3ef69ae05771c2dccff4faa26",
        isApproval: true,
      },
      isApprovedForAll: true,
      remainingAllowance: 1.157920892373162e69,
      tokenMetadata: {
        name: "Compound USD Coin",
        symbol: "CUSDC",
        logo: "https://static.alchemyapi.io/images/assets/5265.png",
        decimals: 8,
        assetAddress: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
      },
      risk: {
        score: 0,
        tags: [
          {
            name: "Trusted",
            description:
              "This asset is a trusted project with a history or reputation, and has been verified as authentic.",
            type: "tokenRisk",
            severity: 0,
            key: "trust_list",
          },
        ],
        categories: {},
        riskScore: "Low Risk",
      },
    },
  ],
}

export default function ApprovalRisks() {
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Simulate API call
  const handleSearch = (value: string) => {
    setSearchValue(value)
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      if (value.startsWith("0x")) {
        setData(sampleData)
      } else {
        setData(null)
      }
      setLoading(false)
    }, 1000)
  }

  // Calculate risk distribution
  const calculateRiskDistribution = (results: any[]) => {
    let high = 0
    let medium = 0
    let low = 0

    results.forEach((item) => {
      const score = item.risk.score
      if (score >= 0.5) high++
      else if (score >= 0.2) medium++
      else low++
    })

    const total = results.length
    return {
      high,
      medium,
      low,
      highPercent: Math.round((high / total) * 100),
      mediumPercent: Math.round((medium / total) * 100),
      lowPercent: Math.round((low / total) * 100),
    }
  }

  // Format large allowance numbers
  const formatAllowance = (allowance: number, decimals = 18) => {
    if (allowance > 1e50) return "Unlimited"

    // Format to a reasonable number of decimal places
    const formatted = allowance.toLocaleString(undefined, {
      maximumFractionDigits: 6,
    })

    return formatted
  }

  // Get risk level from score
  const getRiskLevel = (score: number) => {
    if (score >= 0.5) return "high"
    if (score >= 0.2) return "medium"
    return "low"
  }

  // Format date to relative time (e.g., "2 years ago")
  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return "Unknown date"
    }
  }

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">Approval Risks</h1>
          <p className="text-muted-foreground max-w-3xl">
            This API returns a list of approvals and the associated risk of the spender of that approval for the given
            address.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar
              placeholder="Enter wallet address..."
              types={[{ value: "address", label: "Address" }]}
              onSearch={handleSearch}
            />
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
              title="Approval Risk Assessment"
              description={`${searchValue} (Address)`}
              icon={<CheckCircle className="h-5 w-5" />}
              glowing
            >
              {data.results.length > 0 ? (
                <>
                  <div className="mb-6">
                    {/* Risk Summary */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Token Approvals Summary</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Total Approvals:</span>
                        <span className="text-sm font-medium">{data.results.length}</span>
                      </div>
                    </div>

                    {/* Risk Distribution Cards */}
                    {(() => {
                      const distribution = calculateRiskDistribution(data.results)
                      return (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-card/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-2">
                                <ShieldAlert className="h-8 w-8 text-red-500" />
                              </div>
                              <p className="text-lg font-bold text-red-500">{distribution.high}</p>
                              <p className="text-xs text-muted-foreground">High Risk Approvals</p>
                            </div>

                            <div className="bg-card/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center mb-2">
                                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                              </div>
                              <p className="text-lg font-bold text-yellow-500">{distribution.medium}</p>
                              <p className="text-xs text-muted-foreground">Medium Risk Approvals</p>
                            </div>

                            <div className="bg-card/50 p-4 rounded-lg border border-border/50 flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-2">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                              </div>
                              <p className="text-lg font-bold text-green-500">{distribution.low}</p>
                              <p className="text-xs text-muted-foreground">Low Risk Approvals</p>
                            </div>
                          </div>

                          {/* Risk Distribution Chart */}
                          <div className="bg-card/50 p-4 rounded-lg border border-border/50 mb-6">
                            <h4 className="text-sm font-medium mb-4">Risk Distribution</h4>
                            <div className="space-y-4">
                              {distribution.high > 0 && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs text-red-500">High Risk</span>
                                    <span className="text-xs text-red-500">{distribution.highPercent}%</span>
                                  </div>
                                  <Progress
                                    value={distribution.highPercent}
                                    className="h-2 bg-muted [&>div]:bg-red-500"
                                  />
                                </div>
                              )}
                              {distribution.medium > 0 && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs text-yellow-500">Medium Risk</span>
                                    <span className="text-xs text-yellow-500">{distribution.mediumPercent}%</span>
                                  </div>
                                  <Progress
                                    value={distribution.mediumPercent}
                                    className="h-2 bg-muted [&>div]:bg-yellow-500"
                                  />
                                </div>
                              )}
                              {distribution.low > 0 && (
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-xs text-green-500">Low Risk</span>
                                    <span className="text-xs text-green-500">{distribution.lowPercent}%</span>
                                  </div>
                                  <Progress
                                    value={distribution.lowPercent}
                                    className="h-2 bg-muted [&>div]:bg-green-500"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  {/* Tabs for different views */}
                  <Tabs defaultValue="active-approvals">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="active-approvals">Active Approvals</TabsTrigger>
                      <TabsTrigger value="risk-details">Risk Details</TabsTrigger>
                    </TabsList>

                    {/* Active Approvals Tab */}
                    <TabsContent value="active-approvals" className="mt-4">
                      <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-medium">Active Approvals</h4>
                          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>View on Explorer</span>
                          </Button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Token</th>
                                <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                  Spender
                                </th>
                                <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                  Allowance
                                </th>
                                <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                  Approved
                                </th>
                                <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                  Risk Level
                                </th>
                                <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.results.map((approval: any, index: number) => (
                                <tr key={index} className="border-b border-border/50 hover:bg-primary/5">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-card flex items-center justify-center overflow-hidden">
                                        {approval.tokenMetadata.logo ? (
                                          <img
                                            src={approval.tokenMetadata.logo || "/placeholder.svg"}
                                            alt={approval.tokenMetadata.symbol}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                            {approval.tokenMetadata.symbol.charAt(0)}
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium">{approval.tokenMetadata.symbol}</p>
                                        <p className="text-xs text-muted-foreground">{approval.tokenMetadata.name}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div>
                                      <p className="text-xs">
                                        {approval.txData.counterparty.slice(0, 6)}...
                                        {approval.txData.counterparty.slice(-4)}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {approval.txData.functionName.split("(")[0]}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <p className="text-xs font-medium">
                                      {formatAllowance(approval.remainingAllowance, approval.tokenMetadata.decimals)}{" "}
                                      {approval.tokenMetadata.symbol}
                                    </p>
                                    {approval.isApprovedForAll && (
                                      <p className="text-xs text-red-500">Unlimited Approval</p>
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3 text-muted-foreground" />
                                      <p className="text-xs text-muted-foreground">
                                        {formatRelativeTime(approval.txData.datetime)}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    <RiskBadge level={getRiskLevel(approval.risk.score)} />
                                  </td>
                                  <td className="py-3 px-4">
                                    <Button variant="destructive" size="sm" className="h-7 text-xs">
                                      Revoke
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 text-xs text-muted-foreground">
                          <p>* Unlimited approvals allow spenders to access all of your tokens without limits</p>
                          <p>* Revoke approvals to protect your assets from potential security risks</p>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Risk Details Tab */}
                    <TabsContent value="risk-details" className="mt-4">
                      <div className="space-y-6">
                        {data.results.map((approval: any, index: number) => (
                          <div key={index} className="bg-card/50 p-4 rounded-lg border border-border/50">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center overflow-hidden">
                                  {approval.tokenMetadata.logo ? (
                                    <img
                                      src={approval.tokenMetadata.logo || "/placeholder.svg"}
                                      alt={approval.tokenMetadata.symbol}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                      {approval.tokenMetadata.symbol.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    {approval.tokenMetadata.name} ({approval.tokenMetadata.symbol})
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Approved to: {approval.txData.counterparty.slice(0, 6)}...
                                    {approval.txData.counterparty.slice(-4)}
                                  </p>
                                </div>
                              </div>
                              <RiskBadge level={getRiskLevel(approval.risk.score)} />
                            </div>

                            {/* Risk Tags */}
                            {approval.risk.tags.length > 0 && (
                              <div className="mb-4">
                                <h5 className="text-xs font-medium mb-2">Risk Factors</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {approval.risk.tags.map((tag: any, tagIndex: number) => (
                                    <div
                                      key={tagIndex}
                                      className={`rounded-md border p-2 ${
                                        tag.severity >= 5
                                          ? "bg-red-500/20 text-red-500 border-red-500/30"
                                          : tag.severity >= 1
                                            ? "bg-orange-500/20 text-orange-500 border-orange-500/30"
                                            : tag.severity > 0
                                              ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                                              : "bg-green-500/20 text-green-500 border-green-500/30"
                                      }`}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="font-medium text-sm">{tag.name}</div>
                                        <div className="text-xs px-1.5 py-0.5 rounded-full bg-black/20">
                                          {tag.severity >= 5 ? "High" : tag.severity >= 1 ? "Medium" : "Low"}
                                        </div>
                                      </div>
                                      <p className="text-xs mt-1 opacity-80">{tag.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Transaction Details */}
                            <div className="mt-4 pt-4 border-t border-border/50">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-medium">Transaction Details</h5>
                                <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
                                  <ExternalLink className="h-3 w-3" />
                                  <span>View Transaction</span>
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Hash:</span>
                                  <span className="text-xs">
                                    {approval.txData.hash.slice(0, 10)}...{approval.txData.hash.slice(-8)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Date:</span>
                                  <span className="text-xs">
                                    {format(new Date(approval.txData.datetime), "MMM d, yyyy HH:mm")}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Block:</span>
                                  <span className="text-xs">{approval.txData.blockNumDec}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Chain:</span>
                                  <span className="text-xs">{approval.txData.chain.toUpperCase()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Info className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Approvals Found</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    This address has no active token approvals. Token approvals allow other contracts to spend your
                    tokens.
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Check Another Address</span>
                </Button>
                <Button className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Export Report</span>
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
              <h2 className="text-2xl font-bold mb-2">Check Token Approvals</h2>
              <p className="text-muted-foreground mb-6">
                Enter any wallet address to scan for token approvals and assess their risk level. Identify and revoke
                risky approvals to protect your assets.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Identify Risky Approvals</h3>
                  <p className="text-xs text-muted-foreground">Detect unlimited or high-risk token approvals</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Protect Your Assets</h3>
                  <p className="text-xs text-muted-foreground">Revoke unnecessary approvals to enhance security</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
