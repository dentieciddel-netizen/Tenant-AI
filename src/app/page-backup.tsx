'use client'

import { useState, useEffect } from 'react'

// ============================================================================
// TYPES
// ============================================================================

interface Property {
  id: string
  name: string
  address: string
  unitNumber: string
  type: string
  rentAmount: number
  status: 'occupied' | 'vacant'
}

interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  tenancy: {
    propertyId: string
    unitNumber: string
    rentAmount: number
    leaseStart: string
    leaseEnd: string
  }
}

interface Payment {
  id: string
  tenantId: string
  amount: number
  paymentDate: string
  method: string
  reference: string
  status: string
  createdAt: string
}

interface Lease {
  id: string
  tenantId: string
  propertyId: string
  startDate: string
  endDate: string
  rentAmount: number
  deposit: number
  terms: string
  status: 'active' | 'expired' | 'upcoming'
  createdAt: string
  documentUrl: string
}

interface MaintenanceRequest {
  id: string
  tenantId: string
  propertyId: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Emergency'
  category: string
  status: 'submitted' | 'in-progress' | 'completed' | 'cancelled'
  images: string[]
  createdAt: string
  updatedAt: string
}

interface Message {
  id: string
  type: 'message'
  from: string
  to: string
  subject: string
  content: string
  timestamp: string
  read: boolean
  priority: 'low' | 'normal' | 'high'
}

interface Announcement {
  id: string
  type: 'announcement'
  title: string
  content: string
  author: string
  priority: 'low' | 'normal' | 'high'
  target: string
  timestamp: string
}

type Communication = Message | Announcement

// ============================================================================
// IN-MEMORY DATABASE (No API Needed!)
// ============================================================================

// Mock data storage
let propertiesDB: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Main Street, Johannesburg',
    unitNumber: 'A1',
    type: 'Apartment',
    rentAmount: 8500,
    status: 'vacant'
  },
  {
    id: '2',
    name: 'Garden Complex',
    address: '456 Oak Avenue, Cape Town',
    unitNumber: 'B2',
    type: 'Townhouse',
    rentAmount: 12000,
    status: 'occupied'
  }
]

let tenantsDB: Tenant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+27 12 345 6789',
    tenancy: {
      propertyId: '2',
      unitNumber: 'B2',
      rentAmount: 12000,
      leaseStart: '2024-01-01',
      leaseEnd: '2024-12-31'
    }
  }
]

let paymentsDB: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    amount: 12000,
    paymentDate: '2024-01-01',
    method: 'Bank Transfer',
    reference: 'TRX001',
    status: 'COMPLETED',
    createdAt: '2024-01-01'
  }
]

let leasesDB: Lease[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '2',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rentAmount: 12000,
    deposit: 12000,
    terms: 'Standard residential lease agreement.',
    status: 'active',
    createdAt: '2024-01-01',
    documentUrl: '/leases/1.pdf'
  }
]

let maintenanceDB: MaintenanceRequest[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '2',
    title: 'Leaking faucet',
    description: 'Kitchen faucet is leaking continuously',
    priority: 'Medium',
    category: 'Plumbing',
    status: 'completed',
    images: [],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16'
  }
]

let communicationsDB: Communication[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'Welcome to TenantAI',
    content: 'We are excited to have you onboard!',
    author: 'Admin',
    priority: 'normal',
    target: 'all',
    timestamp: '2024-01-01'
  }
]

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'properties' | 'tenants' | 'financials' | 'leases' | 'maintenance' | 'communications'>('properties')
  const [properties, setProperties] = useState<Property[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [leases, setLeases] = useState<Lease[]>([])
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])
  const [communications, setCommunications] = useState<Communication[]>([])
  
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [showTenantForm, setShowTenantForm] = useState(false)
  const [showLeaseForm, setShowLeaseForm] = useState(false)
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false)
  
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    unitNumber: '',
    type: 'Apartment',
    rentAmount: ''
  })

  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    unitNumber: '',
    rentAmount: '',
    leaseStart: '',
    leaseEnd: ''
  })

  const [newLease, setNewLease] = useState({
    tenantId: '',
    propertyId: '',
    startDate: '',
    endDate: '',
    rentAmount: '',
    deposit: '',
    terms: 'Standard residential lease agreement.'
  })

  const [newMaintenance, setNewMaintenance] = useState({
    tenantId: '',
    propertyId: '',
    title: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High' | 'Emergency',
    category: 'General'
  })

  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: '',
    priority: 'normal' as 'low' | 'normal' | 'high'
  })

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal' as 'low' | 'normal' | 'high',
    target: 'all'
  })

  // ============================================================================
  // DATA MANAGEMENT (No API Calls!)
  // ============================================================================

  // Load all data on component mount
  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = () => {
    setProperties([...propertiesDB])
    setTenants([...tenantsDB])
    setPayments([...paymentsDB])
    setLeases([...leasesDB])
    setMaintenanceRequests([...maintenanceDB])
    setCommunications([...communicationsDB])
  }

  // Property Management
  const addProperty = (e: React.FormEvent) => {
    e.preventDefault()
    const property: Property = {
      id: Date.now().toString(),
      name: newProperty.name,
      address: newProperty.address,
      unitNumber: newProperty.unitNumber,
      type: newProperty.type,
      rentAmount: parseFloat(newProperty.rentAmount),
      status: 'vacant'
    }
    
    propertiesDB.push(property)
    setProperties([...propertiesDB])
    setShowPropertyForm(false)
    setNewProperty({
      name: '',
      address: '',
      unitNumber: '',
      type: 'Apartment',
      rentAmount: ''
    })
  }

  // Tenant Management
  const addTenant = (e: React.FormEvent) => {
    e.preventDefault()
    const tenant: Tenant = {
      id: Date.now().toString(),
      name: newTenant.name,
      email: newTenant.email,
      phone: newTenant.phone,
      tenancy: {
        propertyId: newTenant.propertyId,
        unitNumber: newTenant.unitNumber,
        rentAmount: parseFloat(newTenant.rentAmount),
        leaseStart: newTenant.leaseStart,
        leaseEnd: newTenant.leaseEnd
      }
    }
    
    tenantsDB.push(tenant)
    
    // Update property status to occupied
    const propertyIndex = propertiesDB.findIndex(p => p.id === newTenant.propertyId)
    if (propertyIndex !== -1) {
      propertiesDB[propertyIndex].status = 'occupied'
      setProperties([...propertiesDB])
    }
    
    setTenants([...tenantsDB])
    setShowTenantForm(false)
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      propertyId: '',
      unitNumber: '',
      rentAmount: '',
      leaseStart: '',
      leaseEnd: ''
    })
  }

  // Lease Management
  const addLease = (e: React.FormEvent) => {
    e.preventDefault()
    const lease: Lease = {
      id: Date.now().toString(),
      tenantId: newLease.tenantId,
      propertyId: newLease.propertyId,
      startDate: newLease.startDate,
      endDate: newLease.endDate,
      rentAmount: parseFloat(newLease.rentAmount),
      deposit: parseFloat(newLease.deposit),
      terms: newLease.terms,
      status: 'active',
      createdAt: new Date().toISOString(),
      documentUrl: `/leases/${Date.now()}.pdf`
    }
    
    leasesDB.push(lease)
    setLeases([...leasesDB])
    setShowLeaseForm(false)
    setNewLease({
      tenantId: '',
      propertyId: '',
      startDate: '',
      endDate: '',
      rentAmount: '',
      deposit: '',
      terms: 'Standard residential lease agreement.'
    })
  }

  // Maintenance Management
  const addMaintenanceRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const maintenanceRequest: MaintenanceRequest = {
      id: Date.now().toString(),
      tenantId: newMaintenance.tenantId,
      propertyId: newMaintenance.propertyId,
      title: newMaintenance.title,
      description: newMaintenance.description,
      priority: newMaintenance.priority,
      category: newMaintenance.category,
      status: 'submitted',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    maintenanceDB.push(maintenanceRequest)
    setMaintenanceRequests([...maintenanceDB])
    setShowMaintenanceForm(false)
    setNewMaintenance({
      tenantId: '',
      propertyId: '',
      title: '',
      description: '',
      priority: 'Medium',
      category: 'General'
    })
  }

  const updateMaintenanceStatus = (id: string, status: MaintenanceRequest['status']) => {
    const requestIndex = maintenanceDB.findIndex(req => req.id === id)
    if (requestIndex !== -1) {
      maintenanceDB[requestIndex].status = status
      maintenanceDB[requestIndex].updatedAt = new Date().toISOString()
      setMaintenanceRequests([...maintenanceDB])
    }
  }

  // Payment Management
  const addPayment = (paymentData: {
    tenantId: string
    amount: string
    paymentDate: string
    method: string
    reference: string
  }) => {
    const payment: Payment = {
      id: Date.now().toString(),
      tenantId: paymentData.tenantId,
      amount: parseFloat(paymentData.amount),
      paymentDate: paymentData.paymentDate,
      method: paymentData.method,
      reference: paymentData.reference,
      status: 'COMPLETED',
      createdAt: new Date().toISOString()
    }
    
    paymentsDB.push(payment)
    setPayments([...paymentsDB])
  }

  // Communication Management
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const message: Message = {
      id: Date.now().toString(),
      type: 'message',
      from: 'admin',
      to: newMessage.to,
      subject: newMessage.subject,
      content: newMessage.content,
      timestamp: new Date().toISOString(),
      read: false,
      priority: newMessage.priority
    }
    
    communicationsDB.push(message)
    setCommunications([...communicationsDB])
    setShowMessageForm(false)
    setNewMessage({
      to: '',
      subject: '',
      content: '',
      priority: 'normal'
    })
  }

  const createAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    const announcement: Announcement = {
      id: Date.now().toString(),
      type: 'announcement',
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      author: 'Admin',
      priority: newAnnouncement.priority,
      target: newAnnouncement.target,
      timestamp: new Date().toISOString()
    }
    
    communicationsDB.push(announcement)
    setCommunications([...communicationsDB])
    setShowAnnouncementForm(false)
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'normal',
      target: 'all'
    })
  }

  const markMessageAsRead = (id: string) => {
    const message = communicationsDB.find(comm => comm.id === id && comm.type === 'message') as Message
    if (message) {
      message.read = true
      setCommunications([...communicationsDB])
    }
  }

  // ============================================================================
  // STATS CALCULATIONS
  // ============================================================================

  const totalProperties = properties.length
  const activeTenants = tenants.length
  const occupancyRate = totalProperties > 0 ? Math.round((activeTenants / totalProperties) * 100) : 0
  const monthlyRevenue = tenants.reduce((total, tenant) => total + (tenant.tenancy?.rentAmount || 0), 0)
  const totalRevenue = payments.reduce((total, payment) => total + payment.amount, 0)
  const thisMonthRevenue = payments
    .filter(payment => {
      const paymentDate = new Date(payment.paymentDate)
      const now = new Date()
      return paymentDate.getMonth() === now.getMonth() && 
             paymentDate.getFullYear() === now.getFullYear()
    })
    .reduce((total, payment) => total + payment.amount, 0)

  // Lease stats
  const activeLeases = leases.filter(lease => lease.status === 'active').length
  const expiringLeases = leases.filter(lease => {
    const endDate = new Date(lease.endDate)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return endDate <= thirtyDaysFromNow && lease.status === 'active'
  }).length

  // Maintenance stats
  const openMaintenanceRequests = maintenanceRequests.filter(req => 
    req.status === 'submitted' || req.status === 'in-progress'
  ).length
  const emergencyRequests = maintenanceRequests.filter(req => 
    req.priority === 'Emergency' && (req.status === 'submitted' || req.status === 'in-progress')
  ).length

  // Communication stats
  const unreadMessages = communications.filter(comm => 
    comm.type === 'message' && !(comm as Message).read
  ).length

  // ============================================================================
  // COMPONENTS
  // ============================================================================

  // Payment Form Component
  const PaymentForm = ({ onPaymentAdded }: { onPaymentAdded: () => void }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
      tenantId: '',
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      method: 'Bank Transfer',
      reference: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      addPayment(formData)
      setIsOpen(false)
      setFormData({
        tenantId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        method: 'Bank Transfer',
        reference: ''
      })
      onPaymentAdded()
    }

    const selectedTenant = tenants.find(t => t.id === formData.tenantId)

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          💰 Record Payment
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Record Payment</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tenant</label>
                  <select
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={formData.tenantId}
                    onChange={(e) => setFormData({...formData, tenantId: e.target.value})}
                  >
                    <option value="">Select Tenant</option>
                    {tenants.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name} - {tenant.tenancy?.unitNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedTenant && (
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-blue-800">
                      Rent: <strong>R{selectedTenant.tenancy?.rentAmount}</strong>
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount (ZAR)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="8500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={formData.method}
                    onChange={(e) => setFormData({...formData, method: e.target.value})}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Mobile Money">Mobile Money</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Reference Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    value={formData.reference}
                    onChange={(e) => setFormData({...formData, reference: e.target.value})}
                    placeholder="TRX123456"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                  >
                    Record Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    )
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">TenantAI Dashboard</h1>
        <p className="text-gray-600">Complete Property Management Solution</p>
        <button 
          onClick={loadAllData}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          🔄 Refresh Data
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Properties</p>
              <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{activeTenants}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{occupancyRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">R{monthlyRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Stats for Specific Tabs */}
      {(activeTab === 'financials' || activeTab === 'leases' || activeTab === 'maintenance' || activeTab === 'communications') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">💵</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month's Revenue</p>
                <p className="text-2xl font-bold text-green-600">R{thisMonthRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">R{totalRevenue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${
                activeTab === 'leases' ? 'bg-orange-100' : 
                activeTab === 'maintenance' ? 'bg-red-100' : 
                activeTab === 'communications' ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>
                <span className="text-2xl">
                  {activeTab === 'leases' ? '📑' : 
                   activeTab === 'maintenance' ? '🔧' : 
                   activeTab === 'communications' ? '💬' : '📊'}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {activeTab === 'leases' ? 'Active Leases' : 
                   activeTab === 'maintenance' ? 'Open Requests' : 
                   activeTab === 'communications' ? 'Unread Messages' : 'Total Payments'}
                </p>
                <p className={`text-2xl font-bold ${
                  activeTab === 'leases' ? 'text-orange-600' : 
                  activeTab === 'maintenance' ? 'text-red-600' : 
                  activeTab === 'communications' ? 'text-indigo-600' : 'text-gray-600'
                }`}>
                  {activeTab === 'leases' ? activeLeases : 
                   activeTab === 'maintenance' ? openMaintenanceRequests : 
                   activeTab === 'communications' ? unreadMessages : payments.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border w-fit">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'properties'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('tenants')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'tenants'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tenants ({tenants.length})
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'financials'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Financials
          </button>
          <button
            onClick={() => setActiveTab('leases')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leases'
                ? 'bg-orange-100 text-orange-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leases ({leases.length})
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'maintenance'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Maintenance ({maintenanceRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('communications')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'communications'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Communications {unreadMessages > 0 && (
              <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                {unreadMessages}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Properties</h2>
              <button
                onClick={() => setShowPropertyForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Add Property
              </button>
            </div>

            {properties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                <p className="text-gray-600 mb-4">Add your first property to get started</p>
                <button
                  onClick={() => setShowPropertyForm(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Your First Property
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{property.name}</h3>
                        <p className="text-gray-600">{property.address}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-500">Unit {property.unitNumber}</span>
                          <span className="text-sm text-gray-500">{property.type}</span>
                          <span className="text-sm font-medium">R{property.rentAmount}/month</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          property.status === 'occupied'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {property.status === 'occupied' ? 'Occupied' : 'Vacant'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tenants Tab */}
        {activeTab === 'tenants' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Tenants</h2>
              <div className="flex gap-2">
                <PaymentForm onPaymentAdded={loadAllData} />
                <button
                  onClick={() => setShowTenantForm(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  + Add Tenant
                </button>
              </div>
            </div>

            {tenants.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants yet</h3>
                <p className="text-gray-600 mb-4">Add your first tenant to start managing rentals</p>
                <button
                  onClick={() => setShowTenantForm(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Add Your First Tenant
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {tenants.map((tenant) => {
                  const property = properties.find(p => p.id === tenant.tenancy.propertyId)
                  return (
                    <div key={tenant.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{tenant.name}</h3>
                          <p className="text-gray-600">{tenant.email}</p>
                          <p className="text-gray-600">{tenant.phone}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-500">
                              Unit {tenant.tenancy.unitNumber}
                            </span>
                            <span className="text-sm font-medium">
                              R{tenant.tenancy.rentAmount}/month
                            </span>
                            {property && (
                              <span className="text-sm text-gray-500">
                                {property.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Financials Tab */}
        {activeTab === 'financials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Financial Management</h2>
              <PaymentForm onPaymentAdded={loadAllData} />
            </div>

            {payments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payments recorded</h3>
                <p className="text-gray-600 mb-4">Record your first payment to start tracking finances</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Tenant</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Method</th>
                        <th className="text-left py-2">Reference</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => {
                        const tenant = tenants.find(t => t.id === payment.tenantId)
                        return (
                          <tr key={payment.id} className="border-b hover:bg-gray-50">
                            <td className="py-3">
                              {new Date(payment.paymentDate).toLocaleDateString()}
                            </td>
                            <td className="py-3">
                              {tenant?.name || 'Unknown Tenant'}
                            </td>
                            <td className="py-3 font-medium">
                              R{payment.amount}
                            </td>
                            <td className="py-3 text-sm text-gray-600">
                              {payment.method}
                            </td>
                            <td className="py-3 text-sm text-gray-600">
                              {payment.reference || 'N/A'}
                            </td>
                            <td className="py-3">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leases Tab */}
        {activeTab === 'leases' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Lease Management</h2>
              <button
                onClick={() => setShowLeaseForm(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                + Add Lease
              </button>
            </div>

            {leases.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📑</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No leases yet</h3>
                <p className="text-gray-600 mb-4">Create your first lease agreement</p>
                <button
                  onClick={() => setShowLeaseForm(true)}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                >
                  Create First Lease
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {leases.map((lease) => {
                  const tenant = tenants.find(t => t.id === lease.tenantId)
                  const property = properties.find(p => p.id === lease.propertyId)
                  const isExpiringSoon = new Date(lease.endDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  
                  return (
                    <div key={lease.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {tenant?.name || 'Unknown Tenant'} - {property?.name || 'Unknown Property'}
                          </h3>
                          <p className="text-gray-600">
                            {property?.address || 'No address'}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            lease.status === 'active'
                              ? isExpiringSoon
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {lease.status === 'active' 
                            ? isExpiringSoon ? 'Expiring Soon' : 'Active'
                            : 'Expired'
                          }
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Rent</p>
                          <p className="font-medium">R{lease.rentAmount}/month</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Deposit</p>
                          <p className="font-medium">R{lease.deposit}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Start Date</p>
                          <p className="font-medium">{new Date(lease.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">End Date</p>
                          <p className="font-medium">{new Date(lease.endDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Created {new Date(lease.createdAt).toLocaleDateString()}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Document
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Maintenance Requests</h2>
              <button
                onClick={() => setShowMaintenanceForm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                + New Request
              </button>
            </div>

            {maintenanceRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests</h3>
                <p className="text-gray-600 mb-4">Create your first maintenance request</p>
                <button
                  onClick={() => setShowMaintenanceForm(true)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                >
                  Create First Request
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {maintenanceRequests.map((request) => {
                  const tenant = tenants.find(t => t.id === request.tenantId)
                  const property = properties.find(p => p.id === request.propertyId)
                  
                  return (
                    <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{request.title}</h3>
                          <p className="text-gray-600">
                            {tenant?.name || 'Unknown Tenant'} - {property?.name || 'Unknown Property'}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">{request.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              request.priority === 'Emergency' ? 'bg-red-100 text-red-800' :
                              request.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                              request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {request.priority}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              request.status === 'completed' ? 'bg-green-100 text-green-800' :
                              request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                              request.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {request.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          {request.status === 'submitted' && (
                            <>
                              <button
                                onClick={() => updateMaintenanceStatus(request.id, 'in-progress')}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                              >
                                Start Work
                              </button>
                              <button
                                onClick={() => updateMaintenanceStatus(request.id, 'cancelled')}
                                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {request.status === 'in-progress' && (
                            <button
                              onClick={() => updateMaintenanceStatus(request.id, 'completed')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Mark Complete
                            </button>
                          )}
                          {request.status === 'completed' && (
                            <button
                              onClick={() => updateMaintenanceStatus(request.id, 'submitted')}
                              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                            >
                              Reopen
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Communications Tab */}
        {activeTab === 'communications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Communication Portal</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAnnouncementForm(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  📢 New Announcement
                </button>
                <button
                  onClick={() => setShowMessageForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  ✉️ New Message
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Messages Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Messages</h3>
                {communications.filter(comm => comm.type === 'message').length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-4xl mb-2">✉️</div>
                    <p className="text-gray-600">No messages yet</p>
                    <button
                      onClick={() => setShowMessageForm(true)}
                      className="mt-2 text-blue-600 hover:text-blue-800"
                    >
                      Send your first message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {communications.filter(comm => comm.type === 'message').map((comm) => {
                      const message = comm as Message
                      const tenant = tenants.find(t => t.id === message.to)
                      return (
                        <div 
                          key={message.id} 
                          className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                            !message.read ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                          onClick={() => markMessageAsRead(message.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{message.subject}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                message.priority === 'high' ? 'bg-red-100 text-red-800' :
                                message.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {message.priority}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{message.content}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>To: {tenant?.name || 'Unknown Tenant'}</span>
                            <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                          </div>
                          {!message.read && (
                            <div className="mt-2 text-xs text-blue-600 font-medium">
                              ● Unread
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Announcements Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Announcements</h3>
                {communications.filter(comm => comm.type === 'announcement').length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-4xl mb-2">📢</div>
                    <p className="text-gray-600">No announcements yet</p>
                    <button
                      onClick={() => setShowAnnouncementForm(true)}
                      className="mt-2 text-indigo-600 hover:text-indigo-800"
                    >
                      Create your first announcement
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {communications.filter(comm => comm.type === 'announcement').slice(0, 5).map((comm) => {
                      const announcement = comm as Announcement
                      return (
                        <div key={announcement.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{announcement.title}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                                announcement.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                                'bg-indigo-100 text-indigo-800'
                              }`}
                            >
                              {announcement.priority}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{announcement.content}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>By: {announcement.author}</span>
                            <span>{new Date(announcement.timestamp).toLocaleDateString()}</span>
                          </div>
                          {announcement.target !== 'all' && (
                            <div className="mt-2 text-xs text-gray-500">
                              Targeted announcement
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {communications.filter(comm => comm.type === 'message').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <span className="text-xl">📢</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Announcements</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {communications.filter(comm => comm.type === 'announcement').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-xl">👁️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                    <p className="text-2xl font-bold text-green-600">{unreadMessages}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================
      MODAL FORMS
      ============================================================================ */}

      {/* Property Form Modal */}
      {showPropertyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Property</h2>
            <form onSubmit={addProperty} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newProperty.name}
                  onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                  placeholder="Sunset Apartments"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                  placeholder="123 Main Street, Johannesburg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newProperty.unitNumber}
                  onChange={(e) => setNewProperty({...newProperty, unitNumber: e.target.value})}
                  placeholder="A1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Type</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newProperty.type}
                  onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Rent (ZAR)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newProperty.rentAmount}
                  onChange={(e) => setNewProperty({...newProperty, rentAmount: e.target.value})}
                  placeholder="8500"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Add Property
                </button>
                <button
                  type="button"
                  onClick={() => setShowPropertyForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tenant Form Modal */}
      {showTenantForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Tenant</h2>
            <form onSubmit={addTenant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.email}
                  onChange={(e) => setNewTenant({...newTenant, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.phone}
                  onChange={(e) => setNewTenant({...newTenant, phone: e.target.value})}
                  placeholder="+27 12 345 6789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.propertyId}
                  onChange={(e) => {
                    const property = properties.find(p => p.id === e.target.value)
                    setNewTenant({
                      ...newTenant,
                      propertyId: e.target.value,
                      unitNumber: property?.unitNumber || '',
                      rentAmount: property?.rentAmount.toString() || ''
                    })
                  }}
                >
                  <option value="">Select Property</option>
                  {properties.filter(p => p.status === 'vacant').map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name} - Unit {property.unitNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.unitNumber}
                  onChange={(e) => setNewTenant({...newTenant, unitNumber: e.target.value})}
                  placeholder="A1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Rent (ZAR)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.rentAmount}
                  onChange={(e) => setNewTenant({...newTenant, rentAmount: e.target.value})}
                  placeholder="8500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lease Start Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.leaseStart}
                  onChange={(e) => setNewTenant({...newTenant, leaseStart: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Lease End Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newTenant.leaseEnd}
                  onChange={(e) => setNewTenant({...newTenant, leaseEnd: e.target.value})}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                >
                  Add Tenant
                </button>
                <button
                  type="button"
                  onClick={() => setShowTenantForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lease Form Modal */}
      {showLeaseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Lease</h2>
            <form onSubmit={addLease} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tenant</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newLease.tenantId}
                  onChange={(e) => setNewLease({...newLease, tenantId: e.target.value})}
                >
                  <option value="">Select Tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Property</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newLease.propertyId}
                  onChange={(e) => {
                    const property = properties.find(p => p.id === e.target.value)
                    setNewLease({
                      ...newLease,
                      propertyId: e.target.value,
                      rentAmount: property?.rentAmount.toString() || ''
                    })
                  }}
                >
                  <option value="">Select Property</option>
                  {properties.filter(p => p.status === 'vacant').map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name} - Unit {property.unitNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Rent (ZAR)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newLease.rentAmount}
                  onChange={(e) => setNewLease({...newLease, rentAmount: e.target.value})}
                  placeholder="8500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Deposit Amount (ZAR)</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newLease.deposit}
                  onChange={(e) => setNewLease({...newLease, deposit: e.target.value})}
                  placeholder="8500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lease Start Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newLease.startDate}
                  onChange={(e) => setNewLease({...newLease, startDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lease End Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newLease.endDate}
                  onChange={(e) => setNewLease({...newLease, endDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  value={newLease.terms}
                  onChange={(e) => setNewLease({...newLease, terms: e.target.value})}
                  placeholder="Standard residential lease agreement..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                >
                  Create Lease
                </button>
                <button
                  type="button"
                  onClick={() => setShowLeaseForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Maintenance Form Modal */}
      {showMaintenanceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Maintenance Request</h2>
            <form onSubmit={addMaintenanceRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tenant</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMaintenance.tenantId}
                  onChange={(e) => setNewMaintenance({...newMaintenance, tenantId: e.target.value})}
                >
                  <option value="">Select Tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Property</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMaintenance.propertyId}
                  onChange={(e) => setNewMaintenance({...newMaintenance, propertyId: e.target.value})}
                >
                  <option value="">Select Property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name} - Unit {property.unitNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Issue Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMaintenance.title}
                  onChange={(e) => setNewMaintenance({...newMaintenance, title: e.target.value})}
                  placeholder="e.g., Leaking faucet in kitchen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  value={newMaintenance.description}
                  onChange={(e) => setNewMaintenance({...newMaintenance, description: e.target.value})}
                  placeholder="Please describe the issue in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMaintenance.priority}
                  onChange={(e) => setNewMaintenance({...newMaintenance, priority: e.target.value as any})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMaintenance.category}
                  onChange={(e) => setNewMaintenance({...newMaintenance, category: e.target.value})}
                >
                  <option value="General">General</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Structural">Structural</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Landscaping">Landscaping</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  Create Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowMaintenanceForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Form Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Send Message</h2>
            <form onSubmit={sendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">To Tenant</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                >
                  <option value="">Select Tenant</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  placeholder="Message subject..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={4}
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                  placeholder="Type your message here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newMessage.priority}
                  onChange={(e) => setNewMessage({...newMessage, priority: e.target.value as 'low' | 'normal' | 'high'})}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Form Modal */}
      {showAnnouncementForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Announcement</h2>
            <form onSubmit={createAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  placeholder="Announcement title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={4}
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  placeholder="Announcement content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAnnouncement.priority}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value as 'low' | 'normal' | 'high'})}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={newAnnouncement.target}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, target: e.target.value})}
                >
                  <option value="all">All Tenants</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name} only
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                >
                  Create Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setShowAnnouncementForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}