// components/transactions/transaction-client.tsx
"use client"

import { TransactionForm } from "@/components/transactions/transaction-form"
import { TransactionList } from "@/components/transactions/transaction-list"
import { useRouter } from "next/navigation"

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

interface TransactionClientProps {
  categories: Category[];
  initialTransactions: Transaction[];
}

export function TransactionClient({ 
  categories, 
  initialTransactions 
}: TransactionClientProps) {
  const router = useRouter()

  const handleSuccess = () => {
    router.refresh()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        
        <TransactionForm 
          categories={categories} 
          onSuccess={handleSuccess}
        />
      </div>
      
      <TransactionList 
        initialTransactions={initialTransactions} 
        categories={categories} 
      />
    </div>
  )
}