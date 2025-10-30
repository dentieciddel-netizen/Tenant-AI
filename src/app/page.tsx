"use client";

import { useState, useEffect } from "react";

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  unit: string;
  rent: number;
  status: "occupied" | "vacant";
  amenities: string[];
}

interface Notification {
  id: number;
  title: string;
  date: string;
  message: string;
}

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseEnd: string;
  status: "active" | "pending" | "inactive";
}

interface Lease {
  id: number;
  tenantName: string;
  property: string;
  unit: string;
  startDate: string;
  endDate: string;
  rent: number;
  status: "active" | "expiring" | "new";
  deposit: number;
}

interface Financial {
  id: number;
  type: "rent" | "expense" | "deposit";
  description: string;
  amount: number;
  date: string;
  property: string;
  status: "completed" | "pending" | "overdue";
}

interface Maintenance {
  id: number;
  title: string;
  property: string;
  unit: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in-progress" | "completed";
  date: string;
  description: string;
}

interface Message {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  priority: "high" | "normal";
}

interface Payment {
  id: number;
  tenant: string;
  property: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  type: "rent" | "deposit" | "fee";
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("properties");
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Payment Due Soon",
      date: "25/02/2024",
      message: "Your rent payment of R12,000 is due in 3 days"
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Enhanced states
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [leases, setLeases] = useState<Lease[]>([]);
  const [financials, setFinancials] = useState<Financial[]>([]);
  const [maintenance, setMaintenance] = useState<Maintenance[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // New states for enhanced functionality
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedProperties = localStorage.getItem('tenantai-properties');
        const savedTenants = localStorage.getItem('tenantai-tenants');
        const savedLeases = localStorage.getItem('tenantai-leases');
        const savedFinancials = localStorage.getItem('tenantai-financials');
        const savedMaintenance = localStorage.getItem('tenantai-maintenance');
        const savedMessages = localStorage.getItem('tenantai-messages');
        const savedPayments = localStorage.getItem('tenantai-payments');

        // Set default data if nothing exists in localStorage
        if (savedProperties) {
          setProperties(JSON.parse(savedProperties));
        } else {
          const defaultProperties: Property[] = [
            {
              id: 1,
              name: "Sunset Apartments",
              address: "123 Main Street, Johannesburg",
              type: "Apartment",
              unit: "A1",
              rent: 8500,
              status: "vacant",
              amenities: ["Parking", "Security", "Pool", "Gym"]
            },
            {
              id: 2,
              name: "Garden Complex",
              address: "456 Oak Avenue, Cape Town",
              type: "Townhouse",
              unit: "B2",
              rent: 12000,
              status: "occupied",
              amenities: ["Garden", "Parking", "Security"]
            }
          ];
          setProperties(defaultProperties);
          localStorage.setItem('tenantai-properties', JSON.stringify(defaultProperties));
        }

        if (savedTenants) {
          setTenants(JSON.parse(savedTenants));
        } else {
          const defaultTenants: Tenant[] = [
            {
              id: 1,
              name: "Sarah Johnson",
              email: "sarah.j@email.com",
              phone: "+27 72 123 4567",
              property: "Garden Complex",
              unit: "B2",
              leaseEnd: "2024-12-31",
              status: "active"
            },
            {
              id: 2,
              name: "Mike Peterson",
              email: "mike.p@email.com",
              phone: "+27 83 987 6543",
              property: "Sunset Apartments",
              unit: "A1",
              leaseEnd: "2024-06-30",
              status: "pending"
            }
          ];
          setTenants(defaultTenants);
          localStorage.setItem('tenantai-tenants', JSON.stringify(defaultTenants));
        }

        // Load other data similarly...
        if (savedLeases) setLeases(JSON.parse(savedLeases));
        if (savedFinancials) setFinancials(JSON.parse(savedFinancials));
        if (savedMaintenance) setMaintenance(JSON.parse(savedMaintenance));
        if (savedMessages) setMessages(JSON.parse(savedMessages));
        if (savedPayments) setPayments(JSON.parse(savedPayments));

      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('tenantai-properties', JSON.stringify(properties));
    }
  }, [properties, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('tenantai-tenants', JSON.stringify(tenants));
    }
  }, [tenants, loading]);

  // Enhanced property functions
  const togglePropertyStatus = (id: number) => {
    setProperties(properties.map(property => 
      property.id === id 
        ? { 
            ...property, 
            status: property.status === "occupied" ? "vacant" : "occupied" 
          } 
        : property
    ));
  };

  const deleteProperty = (id: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(property => property.id !== id));
    }
  };

  const editProperty = (property: Property) => {
    setEditingProperty(property);
    setShowEditModal(true);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(properties.map(p => 
      p.id === updatedProperty.id ? updatedProperty : p
    ));
    setShowEditModal(false);
    setEditingProperty(null);
  };

  const addNewProperty = () => {
    const newProperty: Property = {
      id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1,
      name: "New Property",
      address: "Enter address here",
      type: "Apartment",
      unit: `Unit ${properties.length + 1}`,
      rent: 10000,
      status: "vacant",
      amenities: ["Parking", "Security"]
    };
    setProperties([...properties, newProperty]);
    // Auto-open edit modal for new properties
    setEditingProperty(newProperty);
    setShowEditModal(true);
  };

  // Filter properties based on search and filter
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const markAllAsRead = () => {
    setNotifications([]);
  };

  const markMessageAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };

  const updateMaintenanceStatus = (id: number, status: "open" | "in-progress" | "completed") => {
    setMaintenance(maintenance.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  // Clear all data function
  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('tenantai-properties');
      localStorage.removeItem('tenantai-tenants');
      localStorage.removeItem('tenantai-leases');
      localStorage.removeItem('tenantai-financials');
      localStorage.removeItem('tenantai-maintenance');
      localStorage.removeItem('tenantai-messages');
      localStorage.removeItem('tenantai-payments');
      window.location.reload();
    }
  };

  // Export data function
  const exportData = () => {
    const data = {
      properties,
      tenants,
      leases,
      financials,
      maintenance,
      messages,
      payments,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tenantai-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(p => p.status === "occupied").length;
  const vacantProperties = properties.filter(p => p.status === "vacant").length;
  const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;
  const monthlyRevenue = properties.reduce((sum, property) => sum + property.rent, 0);
  const totalRevenue = financials.filter(f => f.type === "rent").reduce((sum, f) => sum + f.amount, 0);
  const totalExpenses = financials.filter(f => f.type === "expense").reduce((sum, f) => sum + Math.abs(f.amount), 0);

  const navigationItems = [
    { id: "properties", label: "🏠 Properties", icon: "🏠" },
    { id: "tenants", label: "👥 Tenants", icon: "👥" },
    { id: "financials", label: "💰 Financials", icon: "💰" },
    { id: "leases", label: "📑 Leases", icon: "📑" },
    { id: "maintenance", label: "🔧 Maintenance", icon: "🔧" },
    { id: "messages", label: "💬 Messages", icon: "💬" },
    { id: "payments", label: "💳 Payments", icon: "💳" },
    { id: "tenant-portal", label: "📱 Tenant Portal", icon: "📱" },
  ];

  // Loading skeleton component
  const PropertySkeleton = () => (
    <div className="border rounded-lg p-6 animate-pulse">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="flex space-x-4">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading TenantAI Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 mr-2"
              >
                ☰
              </button>
              <h1 className="text-xl font-bold text-gray-900">TenantAI</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex space-x-2">
                <button 
                  onClick={exportData}
                  className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Export
                </button>
                <button 
                  onClick={clearAllData}
                  className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear Data
                </button>
              </div>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className={`lg:w-64 ${showMenu ? 'block' : 'hidden lg:block'}`}>
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setShowMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Notifications Panel */}
            {showNotifications && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border-l-4 border-orange-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <span className="text-sm text-gray-500">{notification.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No notifications</p>
                )}
              </div>
            )}

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Properties</p>
                    <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-2xl">🏠</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupied</p>
                    <p className="text-2xl font-bold text-gray-900">{occupiedProperties}</p>
                    <p className="text-sm text-gray-500">{occupancyRate.toFixed(1)}% occupancy</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vacant</p>
                    <p className="text-2xl font-bold text-gray-900">{vacantProperties}</p>
                    <p className="text-sm text-gray-500">{(100 - occupancyRate).toFixed(1)}% vacant</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">🔄</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">R{monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Potential income</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Section */}
            {activeSection === "properties" && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">🏠 Property Portfolio</h2>
                      <p className="text-gray-600 mt-1">Manage your rental properties • Data automatically saved</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="occupied">Occupied</option>
                        <option value="vacant">Vacant</option>
                      </select>
                      <button 
                        onClick={addNewProperty}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        +Add Property
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {filteredProperties.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">🏠</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {properties.length === 0 ? 'No Properties Yet' : 'No Properties Match Your Search'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {properties.length === 0 
                          ? 'Get started by adding your first property' 
                          : 'Try adjusting your search or filter criteria'
                        }
                      </p>
                      <button 
                        onClick={addNewProperty}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {properties.length === 0 ? 'Add Your First Property' : 'Add New Property'}
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredProperties.map((property) => (
                        <div key={property.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="text-2xl">🏠</span>
                                <div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    property.status === 'occupied' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {property.status === 'occupied' ? 'Occupied' : 'Vacant'}
                                  </span>
                                </div>
                              </div>
                              
                              <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                              <p className="text-gray-600">{property.address}</p>
                              
                              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  🏢{property.type}
                                </span>
                                <span className="flex items-center">
                                  🚪{property.unit}
                                </span>
                                <span className="text-lg font-semibold text-gray-900">
                                  R{property.rent.toLocaleString()}
                                </span>
                              </div>

                              <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                                <div className="flex flex-wrap gap-2">
                                  {property.amenities.slice(0, 3).map((amenity, index) => (
                                    <span 
                                      key={index}
                                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                                    >
                                      {amenity}
                                    </span>
                                  ))}
                                  {property.amenities.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                                      +{property.amenities.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-3">
                              <button
                                onClick={() => editProperty(property)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => togglePropertyStatus(property.id)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                {property.status === 'occupied' ? 'Mark Vacant' : 'Mark Occupied'}
                              </button>
                              <button
                                onClick={() => deleteProperty(property.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Edit Property Modal */}
            {showEditModal && editingProperty && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-4">Edit Property</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                      <input
                        type="text"
                        value={editingProperty.name}
                        onChange={(e) => setEditingProperty({...editingProperty, name: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Sunset Apartments"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={editingProperty.address}
                        onChange={(e) => setEditingProperty({...editingProperty, address: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123 Main Street, Johannesburg"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                          value={editingProperty.type}
                          onChange={(e) => setEditingProperty({...editingProperty, type: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Apartment</option>
                          <option>Townhouse</option>
                          <option>House</option>
                          <option>Commercial</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                        <input
                          type="text"
                          value={editingProperty.unit}
                          onChange={(e) => setEditingProperty({...editingProperty, unit: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="A1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (R)</label>
                      <input
                        type="number"
                        value={editingProperty.rent}
                        onChange={(e) => setEditingProperty({...editingProperty, rent: Number(e.target.value)})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="8500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                      <div className="flex flex-wrap gap-2">
                        {['Parking', 'Security', 'Pool', 'Gym', 'Garden', 'Elevator', 'Pet Friendly'].map((amenity) => (
                          <label key={amenity} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={editingProperty.amenities.includes(amenity)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditingProperty({
                                    ...editingProperty,
                                    amenities: [...editingProperty.amenities, amenity]
                                  });
                                } else {
                                  setEditingProperty({
                                    ...editingProperty,
                                    amenities: editingProperty.amenities.filter(a => a !== amenity)
                                  });
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => updateProperty(editingProperty)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other sections (Tenants, Financials, etc.) remain the same */}
            {/* ... */}
            
          </main>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
}