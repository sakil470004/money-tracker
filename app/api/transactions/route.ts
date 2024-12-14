// app/api/transactions/route.ts
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { amount, type, categoryId, description, date, tags, paymentMethod } = body

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        categoryId,
        description,
        date: new Date(date),
        tags: tags || [],
        paymentMethod,
        userId: session.user.id,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("[TRANSACTIONS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
        ...(from && to ? {
          date: {
            gte: new Date(from),
            lte: new Date(to),
          }
        } : {}),
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("[TRANSACTIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}