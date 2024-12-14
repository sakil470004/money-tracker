// components/dashboard/expense-by-category.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useCurrency } from "@/context/currency-context"

const rawData = [
  { name: 'Food & Dining', value: 800, details: [
    { item: 'Restaurants', amount: 500 },
    { item: 'Groceries', amount: 300 }
  ]},
  { name: 'Transportation', value: 300, details: [
    { item: 'Gas', amount: 200 },
    { item: 'Public Transit', amount: 100 }
  ]},
  { name: 'Shopping', value: 500, details: [
    { item: 'Clothes', amount: 300 },
    { item: 'Electronics', amount: 200 }
  ]},
  { name: 'Entertainment', value: 200, details: [
    { item: 'Movies', amount: 100 },
    { item: 'Games', amount: 100 }
  ]},
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ExpenseByCategory() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const { formatAmount, convertAmount } = useCurrency()

  const data = rawData.map(category => ({
    ...category,
    convertedValue: convertAmount(category.value),
    details: category.details.map(detail => ({
      ...detail,
      convertedAmount: convertAmount(detail.amount)
    }))
  }))

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieClick = (data: any) => {
    setSelectedCategory(data.name === selectedCategory?.name ? null : data)
  }

  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              dataKey="convertedValue"
              onMouseEnter={onPieEnter}
              onClick={onPieClick}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  opacity={selectedCategory && selectedCategory.name !== entry.name ? 0.5 : 1}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow">
                      <p className="font-bold">{data.name}</p>
                      <p>{formatAmount(data.value)}</p>
                      {selectedCategory?.name === data.name && (
                        <div className="mt-2">
                          {data.details.map((detail: any, index: number) => (
                            <p key={index} className="text-sm">
                              {detail.item}: {formatAmount(detail.amount)}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}