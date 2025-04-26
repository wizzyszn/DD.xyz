"use client"

import { useState } from "react"
import { Search, ArrowRight } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string, type: string) => void
  types?: Array<{ value: string; label: string }>
}

export function SearchBar({
  placeholder = "Search by address, token, contract...",
  onSearch,
  types = [
    { value: "address", label: "Address" },
    { value: "token", label: "Token" },
    { value: "contract", label: "Contract" },
    { value: "url", label: "URL" },
  ],
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("")
  const [searchType, setSearchType] = useState(types[0].value)

  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue, searchType)
    }
  }

  return (
    <div className="flex w-full max-w-3xl gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10 bg-card border-primary/20 focus:border-primary focus:ring-primary/20 glow-border"
        />
      </div>

      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger className="w-[140px] border-primary/20 focus:ring-primary/20">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleSearch} className="glow">
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
