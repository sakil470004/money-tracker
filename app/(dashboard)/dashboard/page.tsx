// app/(dashboard)/dashboard/page.tsx
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ExpenseByCategory } from "@/components/dashboard/expense-by-category"
import { SavingsTrend } from "@/components/dashboard/savings-trend"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <SummaryCards />
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
        <SpendingChart />
        <ExpenseByCategory />
        <SavingsTrend />
        <RecentTransactions />
      </div>
    </div>
  )
}