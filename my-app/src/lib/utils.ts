import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function truncateAddress(address: string, chars = 4) {
  if (!address) return "";
  const start = address.slice(0, chars + 2);
  const end = address.slice(-chars);
  return `${start}...${end}`;
}

export function getAnimationClass(index: number, baseDelay = 100) {
  return {
    "animate-in": true,
    "fade-in-0": true,
    "slide-in-from-bottom-3": true,
    "[--stagger-delay:0ms]": index === 0,
    "[--stagger-delay:50ms]": index === 1,
    "[--stagger-delay:100ms]": index === 2,
    "[--stagger-delay:150ms]": index === 3,
    "[--stagger-delay:200ms]": index === 4,
  };
}

export function getRiskColor(score: number) {
  if (score >= 7.5) return "text-red-500";
  if (score >= 5) return "text-yellow-500";
  return "text-green-500";
}

export function getRiskGradient(score: number) {
  if (score >= 7.5) return "from-red-500 to-orange-500";
  if (score >= 5) return "from-yellow-500 to-orange-500";
  return "from-green-500 to-emerald-500";
}

export function formatCurrency(value: number, currency = "ETH") {
  return `${formatNumber(value)} ${currency}`;
}

export function getTimeAgo(date: string | Date) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }
  return "Just now";
}
export function formatAddress(address: string): string {
  if (address.length < 10) return address; // if address is weird/too short

  const start = address.slice(0, 3);   // "0x8"
  const end = address.slice(-4);       // "DA16"

  return `${start}......${end}`;
}
