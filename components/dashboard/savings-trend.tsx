// components/dashboard/savings-trend.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', savings: 1500 },
  { month: 'Feb', savings: 2300 },
  { month: 'Mar', savings: 3200 },
  { month: 'Apr', savings: 2800 },
  { month: 'May', savings: 3800 },
  { month: 'Jun', savings: 4100 },
]

export function SavingsTrend() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Savings Trend</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: '#8884d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}