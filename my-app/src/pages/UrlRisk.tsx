"use client"

import { useState } from "react"
import { Globe, AlertTriangle, ShieldAlert, CheckCircle, ExternalLink, XCircle, Info } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { DataCard } from "@/components/data-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Define the API response type
interface UrlRiskResponse {
  riskLevel: "high" | "medium" | "low" | "unknown"
  description: string
  message: string
}

export default function UrlRisks() {
  const [url, setUrl] = useState<string>("")
  const [riskData, setRiskData] = useState<UrlRiskResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Function to handle search
  const handleSearch = (searchValue: string) => {
    setUrl(searchValue)
    fetchUrlRiskData(searchValue)
  }

  // Function to fetch URL risk data
  const fetchUrlRiskData = async (urlToCheck: string) => {
    if (!urlToCheck) return

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, this would be an API call
      // For now, we'll simulate the API response

      // Simulate different risk levels based on URL patterns for demo purposes
      let mockResponse: UrlRiskResponse

      if (urlToCheck.includes("scam") || urlToCheck.includes("phish")) {
        mockResponse = {
          riskLevel: "high",
          description: "This URL has been blacklisted as a known phishing site.",
          message: "Wrong response? Please report: https://forms.gle/4ievDbQDqRgrHcRV9",
        }
      } else if (urlToCheck.includes("new") || urlToCheck.includes("unknown")) {
        mockResponse = {
          riskLevel: "medium",
          description: "Webacy AI engine predicted this URL as a medium risk address.",
          message: "Wrong response? Please report: https://forms.gle/4ievDbQDqRgrHcRV9",
        }
      } else if (urlToCheck.includes("safe") || urlToCheck.includes("official")) {
        mockResponse = {
          riskLevel: "low",
          description: "This URL is known as a safe project address.",
          message: "Wrong response? Please report: https://forms.gle/4ievDbQDqRgrHcRV9",
        }
      } else {
        mockResponse = {
          riskLevel: "unknown",
          description: "Inconclusive. Not enough data to determine risk level.",
          message: "Wrong response? Please report: https://forms.gle/4ievDbQDqRgrHcRV9",
        }
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRiskData(mockResponse)
    } catch (err) {
      setError("Failed to analyze URL. Please try again.")
      console.error("Error analyzing URL:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to get icon and color based on risk level
  const getRiskLevelInfo = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return {
          icon: <ShieldAlert className="h-16 w-16 text-red-500" />,
          color: "text-red-500",
          borderColor: "border-red-500",
          bgColor: "bg-red-500/10",
          borderBgColor: "border-red-500/30",
          label: "HIGH RISK",
        }
      case "medium":
        return {
          icon: <AlertTriangle className="h-16 w-16 text-yellow-500" />,
          color: "text-yellow-500",
          borderColor: "border-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderBgColor: "border-yellow-500/30",
          label: "MEDIUM RISK",
        }
      case "low":
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          color: "text-green-500",
          borderColor: "border-green-500",
          bgColor: "bg-green-500/10",
          borderBgColor: "border-green-500/30",
          label: "LOW RISK",
        }
      default:
        return {
          icon: <Info className="h-16 w-16 text-blue-500" />,
          color: "text-blue-500",
          borderColor: "border-blue-500",
          bgColor: "bg-blue-500/10",
          borderBgColor: "border-blue-500/30",
          label: "UNKNOWN",
        }
    }
  }

  // Extract the form URL from the message
  const extractFormUrl = (message: string): string => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const matches = message.match(urlRegex)
    return matches ? matches[0] : "#"
  }

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">URL Risks</h1>
          <p className="text-muted-foreground max-w-3xl">
            This API predicts the maliciousness of a given URL and helps protect you from phishing attempts.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar
              placeholder="Enter URL to analyze..."
              types={[{ value: "url", label: "URL" }]}
              onSearch={handleSearch}
            />
          </div>
        </div>

        {isLoading && (
          <div className="mb-8">
            <DataCard title="Analyzing URL..." description="Please wait while we check the URL">
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
                <Button className="mt-4" onClick={() => fetchUrlRiskData(url)}>
                  Try Again
                </Button>
              </div>
            </DataCard>
          </div>
        )}

        {riskData && !isLoading && !error && (
          <div className="mb-8">
            <DataCard
              title="URL Risk Analysis"
              description={url || "URL Analysis"}
              icon={<Globe className="h-5 w-5" />}
              glowing
            >
              {/* Risk Level Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col items-center justify-center">
                  {(() => {
                    const { icon, color, borderColor, label } = getRiskLevelInfo(riskData.riskLevel)
                    return (
                      <>
                        <div
                          className={`w-32 h-32 rounded-full border-4 ${borderColor} flex items-center justify-center`}
                        >
                          {icon}
                        </div>
                        <p className={`mt-4 text-lg font-bold ${color}`}>{label}</p>
                        <p className="text-sm text-muted-foreground">Risk Assessment</p>
                      </>
                    )
                  })()}
                </div>

                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>

                  {/* Risk Description */}
                  <div
                    className={`${getRiskLevelInfo(riskData.riskLevel).bgColor} ${getRiskLevelInfo(riskData.riskLevel).borderBgColor} border rounded-lg p-4 mb-4`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`h-5 w-5 ${getRiskLevelInfo(riskData.riskLevel).color} mt-0.5`} />
                      <div>
                        <h4 className={`text-sm font-medium ${getRiskLevelInfo(riskData.riskLevel).color}`}>
                          {riskData.riskLevel.charAt(0).toUpperCase() + riskData.riskLevel.slice(1)} Risk
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{riskData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations based on risk level */}
                  <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                    <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                    {riskData.riskLevel === "high" && (
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          <span>Do not visit this website or enter any personal information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          <span>Do not connect your wallet or sign any transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                          <span>Report this URL to your browser or security provider</span>
                        </li>
                      </ul>
                    )}
                    {riskData.riskLevel === "medium" && (
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                          <span>Proceed with caution and verify the URL from official sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                          <span>Do not share sensitive information unless you're certain of legitimacy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                          <span>Consider using a secure browser extension for additional protection</span>
                        </li>
                      </ul>
                    )}
                    {riskData.riskLevel === "low" && (
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>This URL appears to be safe based on our analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Always maintain standard security practices when browsing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Report any suspicious behavior if encountered</span>
                        </li>
                      </ul>
                    )}
                    {riskData.riskLevel === "unknown" && (
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          <span>We couldn't determine the risk level of this URL</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          <span>Proceed with caution and verify from official sources</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                          <span>Consider running additional security checks</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Report False Positive/Negative */}
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => window.open(extractFormUrl(riskData.message), "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Report Incorrect Result</span>
                </Button>
                <Button className="gap-2" onClick={() => fetchUrlRiskData(url)}>
                  <Globe className="h-4 w-4" />
                  <span>Scan Another URL</span>
                </Button>
              </div>
            </DataCard>
          </div>
        )}

        {!riskData && !isLoading && !error && (
          <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border/50 p-6">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <Globe className="h-16 w-16 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">URL Risk Scanner</h2>
              <p className="text-muted-foreground mb-6">
                Enter any URL to check if it's potentially malicious or a phishing attempt. Our AI-powered scanner will
                analyze the URL and provide a risk assessment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <ShieldAlert className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Phishing Detection</h3>
                  <p className="text-xs text-muted-foreground">
                    Identify malicious websites trying to steal your information
                  </p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Scam Prevention</h3>
                  <p className="text-xs text-muted-foreground">Avoid cryptocurrency scams and fraudulent websites</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Safe Browsing</h3>
                  <p className="text-xs text-muted-foreground">Browse with confidence knowing which sites are safe</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
