import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  Plus,
  Mail,
  Phone,
  MoreVertical,
  Edit,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Send,
  Building,
  Home
} from 'lucide-react';
import './TenantDirectory.css';

const TenantDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState(null);

  // Sample tenant data
  const tenants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+27 72 123 4567',
      property: 'Sunset Apartments',
      unit: 'Unit 4B',
      leaseStart: '2023-06-01',
      leaseEnd: '2024-05-31',
      rentAmount: 15000,
      status: 'active',
      paymentStatus: 'current',
      lastPayment: '2024-01-01',
      notes: 'Excellent tenant, always pays on time',
      emergencyContact: {
        name: 'Michael Johnson',
        phone: '+27 83 987 6543',
        relationship: 'Spouse'
      }
    },
    {
      id: 2,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+27 82 456 7890',
      property: 'Garden Complex',
      unit: 'Unit 12',
      leaseStart: '2023-08-15',
      leaseEnd: '2024-08-14',
      rentAmount: 16000,
      status: 'active',
      paymentStatus: 'current',
      lastPayment: '2024-01-01',
      notes: 'Works night shifts, prefers email communication',
      emergencyContact: {
        name: 'Jennifer Wilson',
        phone: '+27 71 234 5678',
        relationship: 'Sister'
      }
    },
    {
      id: 3,
      name: 'Emma Roberts',
      email: 'emma.roberts@email.com',
      phone: '+27 84 567 8901',
      property: 'Skyline Towers',
      unit: 'Penthouse A',
      leaseStart: '2023-11-01',
      leaseEnd: '2024-10-31',
      rentAmount: 24000,
      status: 'active',
      paymentStatus: 'overdue',
      lastPayment: '2023-12-01',
      notes: 'Rent overdue by 20 days, following up',
      emergencyContact: {
        name: 'Robert Chen',
        phone: '+27 83 345 6789',
        relationship: 'Partner'
      }
    },
    {
      id: 4,
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+27 76 678 9012',
      property: 'Mountain View Estates',
      unit: 'Villa 3',
      leaseStart: '2023-05-01',
      leaseEnd: '2024-04-30',
      rentAmount: 21000,
      status: 'active',
      paymentStatus: 'current',
      lastPayment: '2024-01-01',
      notes: 'Quiet tenant, minimal maintenance requests',
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '+27 82 456 1234',
        relationship: 'Spouse'
      }
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+27 79 789 0123',
      property: 'Riverside Villas',
      unit: 'Unit 2',
      leaseStart: '2023-09-01',
      leaseEnd: '2024-08-31',
      rentAmount: 20000,
      status: 'pending',
      paymentStatus: 'pending',
      lastPayment: null,
      notes: 'New tenant, move-in scheduled for next week',
      emergencyContact: {
        name: 'John Thompson',
        phone: '+27 83 567 8901',
        relationship: 'Brother'
      }
    },
    {
      id: 6,
      name: 'Mike Peterson',
      email: 'mike.p@email.com',
      phone: '+27 81 890 1234',
      property: 'City Center Lofts',
      unit: 'Unit 15',
      leaseStart: '2022-12-01',
      leaseEnd: '2023-11-30',
      rentAmount: 20000,
      status: 'inactive',
      paymentStatus: 'na',
      lastPayment: '2023-11-01',
      notes: 'Lease ended, unit being prepared for new tenant',
      emergencyContact: {
        name: 'Sarah Peterson',
        phone: '+27 72 234 5678',
        relationship: 'Spouse'
      }
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: '#10b981',
      pending: '#f59e0b',
      inactive: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      current: '#10b981',
      overdue: '#ef4444',
      pending: '#f59e0b',
      na: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getPaymentStatusIcon = (status) => {
    const icons = {
      current: CheckCircle,
      overdue: AlertCircle,
      pending: AlertCircle,
      na: XCircle
    };
    return icons[status] || XCircle;
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || tenant.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === 'active').length,
    pending: tenants.filter(t => t.status === 'pending').length,
    overdue: tenants.filter(t => t.paymentStatus === 'overdue').length
  };

  const TenantDetailModal = ({ tenant, onClose }) => {
    if (!tenant) return null;

    const PaymentStatusIcon = getPaymentStatusIcon(tenant.paymentStatus);

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="tenant-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Tenant Details</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-content">
            <div className="tenant-profile">
              <div className="profile-header">
                <div className="avatar">
                  {tenant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="profile-info">
                  <h4>{tenant.name}</h4>
                  <p>{tenant.property} • {tenant.unit}</p>
                  <div className="status-badges">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(tenant.status) }}
                    >
                      {tenant.status}
                    </span>
                    <span 
                      className="payment-badge"
                      style={{ backgroundColor: getPaymentStatusColor(tenant.paymentStatus) }}
                    >
                      <PaymentStatusIcon size={12} />
                      {tenant.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="contact-info">
                <h5>Contact Information</h5>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>{tenant.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{tenant.phone}</span>
                </div>
              </div>

              <div className="lease-info">
                <h5>Lease Information</h5>
                <div className="lease-details">
                  <div className="lease-item">
                    <Calendar size={16} />
                    <div>
                      <span className="label">Lease Start</span>
                      <span className="value">{formatDate(tenant.leaseStart)}</span>
                    </div>
                  </div>
                  <div className="lease-item">
                    <Calendar size={16} />
                    <div>
                      <span className="label">Lease End</span>
                      <span className="value">{formatDate(tenant.leaseEnd)}</span>
                    </div>
                  </div>
                  <div className="lease-item">
                    <DollarSign size={16} />
                    <div>
                      <span className="label">Monthly Rent</span>
                      <span className="value">{formatCurrency(tenant.rentAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="emergency-contact">
                <h5>Emergency Contact</h5>
                <div className="emergency-details">
                  <span className="name">{tenant.emergencyContact.name}</span>
                  <span className="phone">{tenant.emergencyContact.phone}</span>
                  <span className="relationship">{tenant.emergencyContact.relationship}</span>
                </div>
              </div>

              <div className="tenant-notes">
                <h5>Notes</h5>
                <p>{tenant.notes}</p>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn btn-secondary">
              <Mail size={16} />
              Send Message
            </button>
            <button className="btn btn-primary">
              <Edit size={16} />
              Edit Tenant
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tenant-directory">
      {/* Header */}
      <div className="tenant-header">
        <div className="header-content">
          <h2>Tenant Directory</h2>
          <p>Manage all tenant information and communications</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          Add Tenant
        </button>
      </div>

      {/* Statistics */}
      <div className="tenant-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Tenants</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon overdue">
            <XCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.overdue}</span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="tenant-controls">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search tenants by name, email, or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-controls">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Tenants Grid */}
      <div className="tenants-grid">
        {filteredTenants.map((tenant) => {
          const PaymentStatusIcon = getPaymentStatusIcon(tenant.paymentStatus);
          
          return (
            <div key={tenant.id} className="tenant-card">
              <div className="tenant-card-header">
                <div className="tenant-avatar">
                  {tenant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="tenant-basic-info">
                  <h4 className="tenant-name">{tenant.name}</h4>
                  <p className="tenant-property">
                    <Building size={12} />
                    {tenant.property} • {tenant.unit}
                  </p>
                </div>
                <button className="more-actions">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="tenant-details">
                <div className="detail-item">
                  <Mail size={14} />
                  <span>{tenant.email}</span>
                </div>
                <div className="detail-item">
                  <Phone size={14} />
                  <span>{tenant.phone}</span>
                </div>
                <div className="detail-item">
                  <Calendar size={14} />
                  <span>Lease: {formatDate(tenant.leaseEnd)}</span>
                </div>
                <div className="detail-item">
                  <DollarSign size={14} />
                  <span>{formatCurrency(tenant.rentAmount)}/mo</span>
                </div>
              </div>

              <div className="tenant-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(tenant.status) }}
                >
                  {tenant.status}
                </span>
                <span 
                  className="payment-status"
                  style={{ color: getPaymentStatusColor(tenant.paymentStatus) }}
                >
                  <PaymentStatusIcon size={14} />
                  {tenant.paymentStatus}
                </span>
              </div>

              <div className="tenant-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => setSelectedTenant(tenant)}
                >
                  View Details
                </button>
                <div className="quick-actions">
                  <button className="icon-btn" title="Send Email">
                    <Mail size={16} />
                  </button>
                  <button className="icon-btn" title="Call Tenant">
                    <Phone size={16} />
                  </button>
                  <button className="icon-btn" title="View Lease">
                    <FileText size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTenants.length === 0 && (
        <div className="empty-state">
          <Users size={48} />
          <h3>No tenants found</h3>
          <p>Try adjusting your search criteria or add new tenants</p>
        </div>
      )}

      {/* Tenant Detail Modal */}
      <TenantDetailModal 
        tenant={selectedTenant}
        onClose={() => setSelectedTenant(null)}
      />
    </div>
  );
};

export default TenantDirectory;