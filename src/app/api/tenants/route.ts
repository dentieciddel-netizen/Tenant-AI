import { NextResponse } from 'next/server'

// Temporary in-memory storage for tenants
let tenants: any[] = []
let tenancies: any[] = []

export async function POST(request: Request) {
  try {
    const { name, email, phone, propertyId, unitNumber, rentAmount, startDate } = await request.json()

    // Create tenant
    const tenant = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      createdAt: new Date()
    }

    // Create tenancy
    const tenancy = {
      id: (Date.now() + 1).toString(),
      tenantId: tenant.id,
      propertyId,
      unitNumber,
      rentAmount: parseFloat(rentAmount),
      startDate: new Date(startDate),
      status: 'ACTIVE',
      createdAt: new Date()
    }

    tenants.push(tenant)
    tenancies.push(tenancy)

    return NextResponse.json({ tenant, tenancy }, { status: 201 })
  } catch (error) {
    console.error('Error creating tenant:', error)
    return NextResponse.json(
      { error: 'Failed to create tenant' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Combine tenants with their tenancy info
    const tenantsWithDetails = tenants.map(tenant => {
      const tenancy = tenancies.find(t => t.tenantId === tenant.id)
      return {
        ...tenant,
        tenancy
      }
    })
    return NextResponse.json(tenantsWithDetails)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tenants' },
      { status: 500 }
    )
  }
}