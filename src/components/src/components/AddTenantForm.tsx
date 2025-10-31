'use client'
import { useState } from 'react'

export default function AddTenantForm({ properties, onTenantAdded }: { properties: any[], onTenantAdded: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    unitNumber: '',
    rentAmount: '',
    startDate: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // We'll implement this next
    console.log('Adding tenant:', formData)
    setIsOpen(false)
    onTenantAdded()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        + Add Tenant
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Tenant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tenant Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Property</label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.propertyId}
                  onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                >
                  <option value="">Select Property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
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
                  value={formData.unitNumber}
                  onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Rent (ZAR)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.rentAmount}
                  onChange={(e) => setFormData({...formData, rentAmount: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lease Start Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
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