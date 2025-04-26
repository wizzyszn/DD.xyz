"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  types?: { value: string; label: string }[];
}

export function SearchBar({ onSearch, placeholder, types }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [type, setType] = useState(types?.[0]?.value || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "group relative flex gap-2",
        "animate-in fade-in-0 slide-in-from-top-4"
      )}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "pl-9 pr-4 transition-all duration-200",
            "focus-visible:ring-2",
            "hover:border-border/80",
            "placeholder:transition-colors placeholder:duration-200"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-md opacity-0 shadow-[0_0_0_3px_rgba(24,182,150,0.15)]",
            "transition-all duration-500",
            "group-focus-within:opacity-100"
          )}
        />
      </div>

      {types && (
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[140px] shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem
                key={type.value}
                value={type.value}
                className="transition-colors duration-200"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </form>
  );
}
