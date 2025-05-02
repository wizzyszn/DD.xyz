import { Wallet, Clock, ArrowUpDown } from "lucide-react";
import { DataCard } from "./data-card";
import { formatAddress } from "@/lib/utils";
import EthereumIcon from "./Icons/Ethereum";
import SolanaLogo from "./Icons/Solana";
import ArbitrumLogo from "./Icons/Arbitrum";
import TonLogo from "./Icons/Ton";
import SeiLogo from "./Icons/Sei";
import PolygonIcon from "./Icons/Polygon";
import BinanceLogo from "./Icons/Binance";
import React from "react";
interface AddressInfoProps {
  data: AddressInfo;
  className?: string;
  address: string;
  chain: string;
}
interface AddressInfo {
  balance: number;
  expiresAt: number;
  time_1st_tx: string;
  time_verified: number;
  has_no_balance: boolean;
  automated_trading: boolean;
  transaction_count: number;
  has_no_transactions: boolean;
}
export function AddressInfoCard({
  data,
  className,
  address,
  chain,
}: AddressInfoProps) {
  return (
    <DataCard
      title="Address Information"
      icon={<Wallet className="text-blue-500" />}
      className={className}
      glowing
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Address</span>
          <div className="flex items-center gap-2">
            <SelectIcon chain={chain} />
            <span className="text-sm font-mono hover:text-primary transition-colors">
              {formatAddress(address)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between group">
          <span className="text-sm font-medium">Balance</span>
          <span className="text-sm tabular-nums transition-colors group-hover:text-primary">
            {data.has_no_balance ? 0 : data.balance.toFixed(9)}{" "}
            {!data.has_no_balance && chain.toLocaleUpperCase()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Transactions</span>
          </div>
          <span className="text-sm tabular-nums text-muted-foreground">
            {data.transaction_count.toLocaleString()}
          </span>
        </div>
        <div className="h-[1px] bg-border" />
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4" />
            <span>Age</span>
          </div>
          <time
            className="text-sm"
            dateTime={new Date(data.time_verified).toDateString()}
          >
            {new Date(data.time_1st_tx).toLocaleDateString()}
          </time>
        </div>
      </div>
    </DataCard>
  );
}

interface SelectIconProps {
  chain: string;
}
export const SelectIcon: React.FC<SelectIconProps> = ({ chain }) => {
  switch (chain) {
    case "eth":
      return <EthereumIcon size={24} />;
    case "sol":
      return <SolanaLogo size={24} />;
    case "arb":
      return <ArbitrumLogo size={24} />;
    case "ton":
      return <TonLogo size={24} />;
    case "sei":
      return <SeiLogo size={24} />;
    case "poly":
      return <PolygonIcon size={24} />;
    case "bnb":
      return <BinanceLogo size={24} />;
    default:
      return null;
  }
};
