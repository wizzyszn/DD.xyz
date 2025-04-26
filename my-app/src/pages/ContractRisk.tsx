"use client"

import { useState } from "react"
import { FileWarning, AlertTriangle, FileCode, ExternalLink, Shield, XCircle, Clock } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { DataCard } from "@/components/data-card"
import { RiskScore } from "@/components/risk-score"
import { RiskBadge } from "@/components/risk-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

// Define types for the API response
interface ContractRiskTag {
  key: string
  name: string
  type: string
  severity: number
  description: string
}

interface ContractRiskData {
  tags: ContractRiskTag[]
  score: number
  analysis: any[]
  deployer: Record<string, any>
  expiresAt: number
  riskScore: string
  categories: Record<string, any>
  analysis_type: string
  analysis_status: string
  similar_contracts: any[]
  isExpired: boolean
}

export default function ContractRisk() {
  const [address, setAddress] = useState<string>("")
  const [contractData, setContractData] = useState<ContractRiskData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Function to handle search
  const handleSearch = (searchValue: string) => {
    setAddress(searchValue)
    fetchContractData(searchValue)
  }

  // Function to fetch contract data
  const fetchContractData = async (contractAddress: string) => {
    if (!contractAddress) return

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API response with the provided data
      const mockResponse: ContractRiskData = {
        tags: [
          {
            key: "trust_list",
            name: "Trusted",
            type: "tokenRisk",
            severity: 0,
            description:
              "This asset is a trusted project with a history or reputation, and has been verified as authentic.",
          },
        ],
        score: 0,
        analysis: [],
        deployer: {},
        expiresAt: 1744699499055,
        riskScore: "Low Risk",
        categories: {},
        analysis_type: "static",
        analysis_status: "done",
        similar_contracts: [],
        isExpired: true,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setContractData(mockResponse)
    } catch (err) {
      setError("Failed to fetch contract data. Please try again.")
      console.error("Error fetching contract data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to get risk level from risk score string
  const getRiskLevel = (riskScore: string): "low" | "medium" | "high" | "critical" => {
    const score = riskScore.toLowerCase()
    if (score.includes("low")) return "low"
    if (score.includes("medium")) return "medium"
    if (score.includes("high")) return "high"
    if (score.includes("critical")) return "critical"
    return "low" // Default
  }

  // Function to get numeric score from risk score string
  const getNumericScore = (riskScore: string): number => {
    const level = getRiskLevel(riskScore)
    switch (level) {
      case "low":
        return 15
      case "medium":
        return 45
      case "high":
        return 75
      case "critical":
        return 95
      default:
        return 0
    }
  }

  // Function to format timestamp to readable date
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">Contract Risk</h1>
          <p className="text-muted-foreground max-w-3xl">
            This API runs a real-time risk analysis for a given contract address.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar
              placeholder="Enter contract address..."
              types={[{ value: "contract", label: "Contract" }]}
              onSearch={handleSearch}
            />
          </div>
        </div>

        {isLoading && (
          <div className="mb-8">
            <DataCard title="Loading Contract Analysis..." description="Please wait while we analyze the contract">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-32 w-32 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </DataCard>
          </div>
        )}

        {error && !isLoading && (
          <div className="mb-8">
            <DataCard title="Error" icon={<XCircle className="h-5 w-5 text-red-500" />}>
              <div className="flex flex-col items-center justify-center py-6">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-red-500">{error}</p>
                <Button className="mt-4" onClick={() => fetchContractData(address)}>
                  Try Again
                </Button>
              </div>
            </DataCard>
          </div>
        )}

        {contractData && !isLoading && !error && (
          <div className="mb-8">
            <DataCard
              title="Contract Risk Analysis"
              description={address ? `${address.slice(0, 6)}...${address.slice(-4)} (Contract)` : "Contract Analysis"}
              icon={<FileWarning className="h-5 w-5" />}
              glowing
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center justify-center">
                  <RiskScore score={getNumericScore(contractData.riskScore)} size="lg" />
                  <p className="mt-2 text-sm text-muted-foreground">Overall Contract Risk</p>
                  {contractData.isExpired && (
                    <div className="mt-2 flex items-center gap-1 text-yellow-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">Analysis Expired</span>
                    </div>
                  )}
                </div>

                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-2">Risk Summary</h3>
                  {contractData.tags.length > 0 ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">{contractData.tags[0].description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {contractData.tags.map((tag) => (
                          <div key={tag.key} className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${tag.severity === 0 ? "bg-green-500" : "bg-yellow-500"}`}
                            ></div>
                            <span className="text-sm">{tag.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No specific risk tags identified for this contract.</p>
                  )}
                </div>
              </div>

              <Tabs defaultValue="analysis">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="details">Contract Details</TabsTrigger>
                  <TabsTrigger value="similar">Similar Contracts</TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="mt-4">
                  {contractData.analysis && contractData.analysis.length > 0 ? (
                    <div className="space-y-4">
                      {contractData.analysis.map((item, index) => (
                        <div key={index} className="bg-card/50 p-4 rounded-lg border border-border/50">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">{item.title || "Analysis Point"}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.description || "No description available"}
                              </p>
                              {item.severity && (
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Severity:</span>
                                  <RiskBadge level={item.severity} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-card/50 p-6 rounded-lg border border-border/50 text-center">
                      <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-green-500">No Issues Detected</h3>
                      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                        Our analysis did not detect any significant issues with this contract.
                        {contractData.isExpired &&
                          " However, this analysis has expired and may not reflect the current state of the contract."}
                      </p>

                      {contractData.isExpired && (
                        <Button className="mt-4 gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Refresh Analysis</span>
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="details" className="mt-4">
                  <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium">Contract Details</h4>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="text-xs">View on Etherscan</span>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Analysis Type:</span>
                            <span className="text-xs font-medium">{contractData.analysis_type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Analysis Status:</span>
                            <span className="text-xs font-medium">{contractData.analysis_status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Expires At:</span>
                            <span className="text-xs font-medium">{formatDate(contractData.expiresAt)}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Risk Score:</span>
                            <span className="text-xs font-medium">{contractData.riskScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Is Expired:</span>
                            <span className="text-xs font-medium">{contractData.isExpired ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">Tags:</span>
                            <span className="text-xs font-medium">
                              {contractData.tags.map((t) => t.name).join(", ") || "None"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {Object.keys(contractData.deployer).length > 0 ? (
                        <div>
                          <h5 className="text-xs font-medium mb-2">Deployer Information</h5>
                          <div className="bg-black/50 p-3 rounded-md">
                            <pre className="text-xs text-green-400">
                              <code>{JSON.stringify(contractData.deployer, null, 2)}</code>
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-xs text-muted-foreground">No deployer information available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="similar" className="mt-4">
                  {contractData.similar_contracts && contractData.similar_contracts.length > 0 ? (
                    <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                      <h4 className="text-sm font-medium mb-4">Similar Contracts</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Address</th>
                              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                Similarity
                              </th>
                              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">
                                Risk Level
                              </th>
                              <th className="text-left py-2 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contractData.similar_contracts.map((contract, index) => (
                              <tr key={index} className="border-b border-border/50 hover:bg-primary/5">
                                <td className="py-3 px-4 text-xs">{contract.address}</td>
                                <td className="py-3 px-4 text-xs">{contract.similarity}%</td>
                                <td className="py-3 px-4">
                                  <RiskBadge level={contract.risk_level || "low"} />
                                </td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-card/50 p-6 rounded-lg border border-border/50 text-center">
                      <FileCode className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium">No Similar Contracts</h3>
                      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                        We couldn't find any contracts with similar code or behavior patterns.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </DataCard>
          </div>
        )}
      </div>
    </div>
  )
}
