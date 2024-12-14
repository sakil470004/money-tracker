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

interface Category {
  id: string;
  name: string;
  type: string;
}

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: string;
  category: Category;
  categoryId: string;
  tags: string[];
  paymentMethod?: string;
}

interface TransactionListProps {
  initialTransactions: Transaction[];
  categories: Category[];
}

const TRANSACTION_TYPES = [
  { label: "All types", value: "ALL" },
  { label: "Income", value: "INCOME" },
  { label: "Expense", value: "EXPENSE" },
  { label: "Investment", value: "INVESTMENT" },
  { label: "Shopping", value: "SHOPPING" },
  { label: "Gift", value: "GIFT" },
  { label: "Self Investment", value: "SELF_INVESTMENT" }
] as const;

export function TransactionList({ initialTransactions = [], categories }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [filter, setFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("ALL")
  const { formatAmount } = useCurrency()

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.category.name.toLowerCase().includes(filter.toLowerCase()) ||
      transaction.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    
    const matchesType = typeFilter === "ALL" ? true : transaction.type === typeFilter

    return matchesSearch && matchesType
  })

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
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {TRANSACTION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No transactions found. Create your first transaction to get started.</p>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}