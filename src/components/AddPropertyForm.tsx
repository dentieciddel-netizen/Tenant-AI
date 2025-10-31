// Enhanced Properties Management Component
const PropertiesManagement = () => {
  const totalProperties = properties.length
  const occupiedProperties = properties.filter(p => p.status === 'occupied').length
  const vacantProperties = properties.filter(p => p.status === 'vacant').length
  const totalRentalValue = properties.reduce((sum, property) => sum + property.rentAmount, 0)

  // Direct handlers for this component
  const handleToggleStatus = (id: string) => {
    const propertyIndex = propertiesDB.findIndex(property => property.id === id)
    if (propertyIndex !== -1) {
      propertiesDB[propertyIndex].status = propertiesDB[propertyIndex].status === 'occupied' ? 'vacant' : 'occupied'
      setProperties([...propertiesDB])
    }
  }

  const handleDelete = (id: string) => {
    const property = propertiesDB.find(p => p.id === id)
    if (property && confirm(`Are you sure you want to delete "${property.name}"?`)) {
      propertiesDB = propertiesDB.filter(property => property.id !== id)
      setProperties([...propertiesDB])
    }
  }

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    const property: Property = {
      id: Date.now().toString(),
      name: newProperty.name,
      address: newProperty.address,
      unitNumber: newProperty.unitNumber,
      type: newProperty.type,
      rentAmount: parseFloat(newProperty.rentAmount),
      status: newProperty.status,
      amenities: newProperty.amenities,
      images: ['/properties/default.jpg']
    }
    
    propertiesDB.push(property)
    setProperties([...propertiesDB])
    setShowPropertyForm(false)
    setNewProperty({
      name: '',
      address: '',
      unitNumber: '',
      type: 'Apartment',
      rentAmount: '',
      status: 'vacant',
      amenities: []
    })
  }

  return (
    <div className="space-y-6">
      {/* Properties Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
            </div>
            <div className="text-3xl text-blue-600">🏠</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-gray-900">{occupiedProperties}</p>
              <p className="text-sm text-green-600">
                {totalProperties > 0 ? ((occupiedProperties / totalProperties) * 100).toFixed(1) : 0}% occupancy
              </p>
            </div>
            <div className="text-3xl text-green-600">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vacant</p>
              <p className="text-2xl font-bold text-gray-900">{vacantProperties}</p>
              <p className="text-sm text-orange-600">
                {totalProperties > 0 ? ((vacantProperties / totalProperties) * 100).toFixed(1) : 0}% vacant
              </p>
            </div>
            <div className="text-3xl text-orange-600">🔄</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">R{totalRentalValue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Potential income</p>
            </div>
            <div className="text-3xl text-purple-600">💰</div>
          </div>
        </div>
      </div>

      {/* Properties Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Property Portfolio</h3>
          <p className="text-gray-600">Manage your rental properties</p>
        </div>
        <button
          onClick={() => setShowPropertyForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Property</span>
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Property Image */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
              {property.images && property.images.length > 0 ? (
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-4xl">
                  🏠
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === 'occupied' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {property.status === 'occupied' ? 'Occupied' : 'Vacant'}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-semibold text-gray-900">{property.name}</h4>
                <span className="text-2xl font-bold text-blue-600">R{property.rentAmount}</span>
              </div>
              
              <p className="text-gray-600 mb-3">{property.address}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center space-x-1">
                  <span>🏢</span>
                  <span>{property.type}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>🚪</span>
                  <span>{property.unitNumber}</span>
                </span>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(property.id)}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium ${
                    property.status === 'occupied'
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {property.status === 'occupied' ? 'Mark Vacant' : 'Mark Occupied'}
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="py-2 px-3 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Added</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first property</p>
          <button
            onClick={() => setShowPropertyForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            + Add First Property
          </button>
        </div>
      )}
    </div>
  )
}