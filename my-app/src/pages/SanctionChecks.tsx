"use client"

import { useState } from "react"
import { Shield, AlertCircle, CheckCircle, X, AlertOctagon } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { DataCard } from "@/components/data-card"
import { Button } from "@/components/ui/button"

// Sample data for demonstration
const sanctionedSample = {
  address: "0x8589427373D6D84E98730D7795D8f6f8731FDA16",
  is_sanctioned: true,
}

const nonSanctionedSample = {
  address: "0x40f41c762763436d73DE1bafb11729C36Ad32a54",
  is_sanctioned: false,
}

export default function SanctionChecks() {
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Simulate API call
  const handleSearch = (value: string) => {
    setSearchValue(value)
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, show sanctioned data if address starts with "0x8"
      if (value.startsWith("0x8")) {
        setData(sanctionedSample)
      } else if (value.startsWith("0x")) {
        setData(nonSanctionedSample)
      } else {
        setData(null)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen grid-pattern">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">Sanction Checks</h1>
          <p className="text-muted-foreground max-w-3xl">
            This API checks if the supplied address is sanctioned or included in any sanctioned address databases.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <SearchBar
              placeholder="Enter wallet or contract address..."
              types={[
                { value: "address", label: "Address" },
                { value: "contract", label: "Contract" },
              ]}
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
              title="Sanction Check Results"
              description={`${searchValue} (Address)`}
              icon={<Shield className="h-5 w-5" />}
              glowing
            >
              {data.is_sanctioned ? (
                // Sanctioned Address View
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center">
                      <X className="h-16 w-16 text-red-500" />
                    </div>
                    <p className="mt-4 text-lg font-bold text-red-500">SANCTIONED</p>
                    <p className="text-sm text-muted-foreground">Global Sanctions List</p>
                  </div>

                  <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-2">Sanction Details</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This address has been identified on global sanctions lists. Interacting with this address may
                      violate sanctions regulations and could result in legal penalties.
                    </p>

                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-red-500">Warning</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Transacting with sanctioned addresses may result in legal penalties. It is recommended to
                            avoid any interaction with this address.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                        <h4 className="text-sm font-medium mb-2">Compliance Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Do not send funds to this address</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Do not accept funds from this address</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>
                              Report any previous transactions with this address to your compliance department
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Consider freezing any assets received from this address</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                        <h4 className="text-sm font-medium mb-2">Potential Risks</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Legal penalties and fines</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Account freezes by exchanges or service providers</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Increased regulatory scrutiny</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>Reputational damage</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Non-Sanctioned Address View
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <p className="mt-4 text-lg font-bold text-green-500">NOT SANCTIONED</p>
                    <p className="text-sm text-muted-foreground">Clear Status</p>
                  </div>

                  <div className="col-span-2">
                    <h3 className="text-lg font-medium mb-2">Sanction Status</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This address has not been identified on any known sanctions lists. Based on current data, there
                      are no sanctions-related restrictions on interacting with this address.
                    </p>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-green-500">Clear Status</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            No sanctions have been detected for this address. Standard due diligence is still
                            recommended when transacting with any blockchain address.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card/50 p-4 rounded-lg border border-border/50">
                      <h4 className="text-sm font-medium mb-2">Compliance Information</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        While this address is not currently sanctioned, please note:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Sanctions lists are regularly updated</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>This check represents a point-in-time assessment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>Regular re-screening is recommended for ongoing compliance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Add to Watchlist</span>
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
              <h2 className="text-2xl font-bold mb-2">Sanctions Compliance Check</h2>
              <p className="text-muted-foreground mb-6">
                Enter any blockchain address to verify if it appears on global sanctions lists. This tool helps ensure
                compliance with international regulations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <AlertCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Regulatory Compliance</h3>
                  <p className="text-xs text-muted-foreground">Verify addresses against global sanctions lists</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">Risk Mitigation</h3>
                  <p className="text-xs text-muted-foreground">
                    Avoid penalties from interacting with sanctioned entities
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
