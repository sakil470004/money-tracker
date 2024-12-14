// components/dashboard/spending-chart.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useCurrency } from "@/context/currency-context"

const monthlyData = [
  { month: 'Jan', expense: 2400 },
  { month: 'Feb', expense: 1398 },
  { month: 'Mar', expense: 9800 },
  { month: 'Apr', expense: 3908 },
  { month: 'May', expense: 4800 },
  { month: 'Jun', expense: 3800 },
]

const weeklyData = [
  { month: 'Week 1', expense: 800 },
  { month: 'Week 2', expense: 950 },
  { month: 'Week 3', expense: 700 },
  { month: 'Week 4', expense: 1200 },
]

export function SpendingChart() {
  const [timeFrame, setTimeFrame] = useState('monthly')
  const [selectedBar, setSelectedBar] = useState<string | null>(null)
  const { formatAmount, convertAmount } = useCurrency()

  const data = (timeFrame === 'monthly' ? monthlyData : weeklyData).map(item => ({
    ...item,
    convertedExpense: convertAmount(item.expense)
  }))

  const handleBarClick = (entry: any) => {
    setSelectedBar(entry.month)
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Spending Overview</CardTitle>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow">
                      <p className="font-bold">{payload[0].payload.month}</p>
                      <p>Expense: {formatAmount(payload[0].payload.expense)}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar 
              dataKey="convertedExpense" 
              fill="#8884d8"
              onClick={(data) => handleBarClick(data)}
              opacity={({ month }) => selectedBar && month !== selectedBar ? 0.5 : 1}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}