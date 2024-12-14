// components/dashboard/recent-transactions.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

const transactions = [
  { id: 1, description: "Grocery Shopping", amount: -120, category: "Shopping", date: "2024-12-14" },
  { id: 2, description: "Salary Deposit", amount: 3000, category: "Income", date: "2024-12-13" },
  { id: 3, description: "Netflix Subscription", amount: -15.99, category: "Entertainment", date: "2024-12-12" },
  { id: 4, description: "Investment Dividend", amount: 50, category: "Investment", date: "2024-12-11" },
]

export function RecentTransactions() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
              <div className="flex items-center">
                {transaction.amount > 0 ? (
                  <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
                  ${Math.abs(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}