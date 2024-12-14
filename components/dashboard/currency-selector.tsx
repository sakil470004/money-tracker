// components/dashboard/currency-selector.tsx
"use client"

import { useCurrency } from "@/context/currency-context"
import { CURRENCIES, CurrencyCode } from "@/types/currency"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CurrencySelector() {
  const { currency, setCurrencyCode } = useCurrency()

  return (
    <Select value={currency.code} onValueChange={(value: CurrencyCode) => setCurrencyCode(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(CURRENCIES).map((curr) => (
          <SelectItem key={curr.code} value={curr.code}>
            {curr.symbol} {curr.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}