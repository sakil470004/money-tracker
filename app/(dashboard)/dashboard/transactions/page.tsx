// app/(dashboard)/dashboard/transactions/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { TransactionClient } from "@/components/transactions/transaction-client"

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return null;
  }

  const [categories, transactions] = await Promise.all([
    prisma.category.findMany({
      where: { 
        userId: session.user.id 
      },
      orderBy: { 
        name: 'asc' 
      }
    }),
    prisma.transaction.findMany({
      where: { 
        userId: session.user.id 
      },
      include: { 
        category: true 
      },
      orderBy: { 
        date: 'desc' 
      },
      take: 50
    })
  ]);

  return <TransactionClient categories={categories} initialTransactions={transactions} />
}