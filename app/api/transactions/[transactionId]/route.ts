// app/api/transactions/[transactionId]/route.ts
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { transactionId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Verify transaction belongs to user
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.transactionId,
        userId: session.user.id,
      },
    })

    if (!transaction) {
      return new NextResponse("Not found", { status: 404 })
    }

    await prisma.transaction.delete({
      where: {
        id: params.transactionId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[TRANSACTION_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { transactionId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { amount, type, categoryId, description, date, tags, paymentMethod } = body

    const transaction = await prisma.transaction.update({
      where: {
        id: params.transactionId,
        userId: session.user.id,
      },
      data: {
        amount: parseFloat(amount),
        type,
        categoryId,
        description,
        date: new Date(date),
        tags: tags || [],
        paymentMethod,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("[TRANSACTION_UPDATE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}