import { NextResponse } from 'next/server'

// Temporary in-memory storage for payments
let payments: any[] = []

export async function POST(request: Request) {
  try {
    const { tenantId, amount, paymentDate, method, reference } = await request.json()

    const payment = {
      id: Date.now().toString(),
      tenantId,
      amount: parseFloat(amount),
      paymentDate: new Date(paymentDate),
      method: method || 'Bank Transfer',
      reference: reference || '',
      status: 'COMPLETED',
      createdAt: new Date()
    }

    payments.push(payment)

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    console.error('Error recording payment:', error)
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}