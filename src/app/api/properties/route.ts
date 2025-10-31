import { NextResponse } from 'next/server'

// Temporary in-memory storage (for demo only)
let properties: any[] = []

export async function POST(request: Request) {
  try {
    const { name, address, city, rentAmount } = await request.json()

    // Create a temporary property object
    const property = {
      id: Date.now().toString(),
      name,
      address, 
      city,
      rentAmount,
      landlordId: 'temp-landlord-id',
      createdAt: new Date()
    }

    properties.push(property)

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}