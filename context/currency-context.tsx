// context/currency-context.tsx
"use client"

import { createContext, useContext, useState } from 'react'
import { CurrencyCode, CurrencyConfig, CURRENCIES } from '@/types/currency'

interface CurrencyContextType {
  currency: CurrencyConfig
  setCurrencyCode: (code: CurrencyCode) => void
  formatAmount: (amount: number) => string
  convertAmount: (amount: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD)

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrency(CURRENCIES[code])
  }

  const formatAmount = (amount: number) => {
    const convertedAmount = amount * currency.exchangeRate
    return `${currency.symbol}${convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const convertAmount = (amount: number) => {
    return amount * currency.exchangeRate
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatAmount, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}