// components/dashboard/income-expense-comparison.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 4500, expenses: 2800 },
  { month: 'Mar', income: 4200, expenses: 3000 },
  { month: 'Apr', income: 4800, expenses: 2780 },
  { month: 'May', income: 4300, expenses: 2600 },
  { month: 'Jun', income: 4700, expenses: 3100 },
]

export function IncomeExpenseComparison() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expenses" fill="#FF5252" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
