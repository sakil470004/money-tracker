// types/currency.ts
export type CurrencyCode = 'USD' | 'BDT' | 'INR'

export interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  name: string
  exchangeRate: number // Rate relative to USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    exchangeRate: 1,
  },
  BDT: {
    code: 'BDT',
    symbol: '৳',
    name: 'Bangladeshi Taka',
    exchangeRate: 110.32, // 1 USD = 110.32 BDT (approximate)
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    exchangeRate: 83.12, // 1 USD = 83.12 INR (approximate)
  },
}

