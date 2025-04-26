import { Wallet, Clock, ArrowUpDown, Bot } from "lucide-react";
import { DataCard } from "./data-card";
import { cn } from "@/lib/utils";

interface AddressInfoProps {
  data: {
    address: string;
    balance: number;
    transactionCount: number;
    firstTxTime: string;
    automated?: boolean;
  };
  className?: string;
}

export function AddressInfoCard({ data, className }: AddressInfoProps) {
  return (
    <DataCard
      title="Address Information"
      icon={<Wallet className="text-blue-500" />}
      className={className}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Address</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono hover:text-primary transition-colors">
              {data.address}
            </span>
            {data.automated && (
              <Bot
                className="h-4 w-4 text-muted-foreground animate-in fade-in zoom-in"
               // title="Automated Account"
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between group">
          <span className="text-sm font-medium">Balance</span>
          <span className="text-sm tabular-nums transition-colors group-hover:text-primary">
            {data.balance.toFixed(2)} ETH
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Transactions</span>
          </div>
          <span className="text-sm tabular-nums text-muted-foreground">
            {data.transactionCount.toLocaleString()}
          </span>
        </div>
        <div className="h-[1px] bg-border" />
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4" />
            <span>First Transaction</span>
          </div>
          <time className="text-sm" dateTime={data.firstTxTime}>
            {new Date(data.firstTxTime).toLocaleDateString()}
          </time>
        </div>
      </div>
    </DataCard>
  );
}
