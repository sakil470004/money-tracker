// components/dashboard/summary-cards.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react"

interface SummaryCardProps {
  label: string
  amount: number
  currency?: string
  trend?: number
  icon?: React.ReactNode
}

function SummaryCard({ label, amount, currency = "USD", trend, icon }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {label}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currency} {amount.toLocaleString()}
        </div>
        {trend && (
          <p className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {trend > 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
            {Math.abs(trend)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function SummaryCards() {
  // This would come from your API in a real app
  const summaryData = {
    totalBalance: 12500,
    monthlyIncome: 4500,
    monthlyExpenses: 2800,
    investments: 5000,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        label="Total Balance"
        amount={summaryData.totalBalance}
        icon={<WalletIcon className="h-4 w-4 text-gray-500" />}
      />
      <SummaryCard
        label="Monthly Income"
        amount={summaryData.monthlyIncome}
        trend={12.5}
        icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
      />
      <SummaryCard
        label="Monthly Expenses"
        amount={summaryData.monthlyExpenses}
        trend={-4.2}
        icon={<ArrowDownIcon className="h-4 w-4 text-red-500" />}
      />
      <SummaryCard
        label="Investments"
        amount={summaryData.investments}
        trend={8.1}
        icon={<TrendingUpIcon className="h-4 w-4 text-blue-500" />}
      />
    </div>
  )
}
