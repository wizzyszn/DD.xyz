import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface AddressInfoProps {
  addressInfo: {
    balance: number
    transaction_count: number
    time_1st_tx: string
    automated_trading: boolean
    has_no_balance: boolean
    has_no_transactions: boolean
  }
  isContract: boolean
}

export function AddressInfoCard({ addressInfo, isContract }: AddressInfoProps) {
  const firstTxDate = new Date(addressInfo.time_1st_tx)
  const accountAge = formatDistanceToNow(firstTxDate, { addSuffix: true })

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Address Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Address Type</p>
            <p className="text-sm font-medium">{isContract ? "Contract" : "EOA (Wallet)"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="text-sm font-medium">{addressInfo.balance.toFixed(6)} ETH</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Transaction Count</p>
            <p className="text-sm font-medium">{addressInfo.transaction_count}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">First Transaction</p>
            <p className="text-sm font-medium">{accountAge}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {addressInfo.automated_trading && (
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded-full text-xs">
              Automated Trading
            </span>
          )}
          {addressInfo.has_no_balance && (
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-xs">
              No Balance
            </span>
          )}
          {addressInfo.has_no_transactions && (
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-xs">
              No Transactions
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
