// components/transactions/transaction-list.tsx
"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCurrency } from "@/context/currency-context"
import { DateRangePicker } from "@/components/date-range-picker"

interface Transaction {
  id: string
  amount: number
  date: string
  description: string
  type: string
  category: {
    id: string
    name: string
  }
  tags: string[]
  paymentMethod?: string
}

interface TransactionListProps {
  initialTransactions: Transaction[]
}

export function TransactionList({ initialTransactions }: TransactionListProps) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [filter, setFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const { formatAmount } = useCurrency()

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.category.name.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    
    const matchesType = typeFilter ? transaction.type === typeFilter : true

    return matchesSearch && matchesType
  })

  const handleDateRangeChange = async (from: Date, to: Date) => {
    const response = await fetch(
      `/api/transactions?from=${from.toISOString()}&to=${to.toISOString()}`
    )
    const data = await response.json()
    setTransactions(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:items-center">
            <Input
              placeholder="Search transactions..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-sm"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                <SelectItem value="INCOME">Income</SelectItem>
                <SelectItem value="EXPENSE">Expense</SelectItem>
                <SelectItem value="INVESTMENT">Investment</SelectItem>
                <SelectItem value="SHOPPING">Shopping</SelectItem>
                <SelectItem value="GIFT">Gift</SelectItem>
                <SelectItem value="SELF_INVESTMENT">Self Investment</SelectItem>
              </SelectContent>
            </Select>
            <DateRangePicker onChange={handleDateRangeChange} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{format(new Date(transaction.date), "MMM d, yyyy")}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category.name}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.tags.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <span className={transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}>
                    {formatAmount(transaction.amount)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}