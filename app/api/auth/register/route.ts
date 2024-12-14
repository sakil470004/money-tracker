// app/api/auth/register/route.ts
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Create default categories for the user
    const defaultCategories = [
      { name: 'Salary', type: 'INCOME' },
      { name: 'Food', type: 'EXPENSE' },
      { name: 'Transport', type: 'EXPENSE' },
      { name: 'Shopping', type: 'SHOPPING' },
      { name: 'Investment', type: 'INVESTMENT' },
    ]

    await Promise.all(
      defaultCategories.map((category) =>
        prisma.category.create({
          data: {
            name: category.name,
            type: category.type as any,
            userId: user.id,
          },
        })
      )
    )

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
}