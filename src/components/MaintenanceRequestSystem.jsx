import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Upload,
  MessageCircle,
  Building,
  Home,
  User,
  Calendar,
  DollarSign,
  Image,
  Paperclip,
  Send
} from 'lucide-react';
import './MaintenanceRequestSystem.css';

const MaintenanceRequestSystem = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Sample maintenance requests data
  const maintenanceRequests = [
    {
      id: 1,
      tenant: 'Sarah Johnson',
      property: 'Sunset Apartments',
      unit: 'Unit 4B',
      issue: 'Kitchen sink leaking under counter',
      description: 'Water leaking from under the kitchen sink when using faucet. Appears to be coming from pipe connection.',
      category: 'Plumbing',
      priority: 'high',
      status: 'open',
      dateSubmitted: '2024-01-20T10:30:00',
      dateUpdated: '2024-01-20T14:45:00',
      assignedTo: 'Mike Technician',
      estimatedCost: 1200,
      images: ['/api/placeholder/300/200'],
      tenantContact: {
        phone: '+27 72 123 4567',
        email: 'sarah.j@email.com',
        preferredContact: 'email'
      },
      updates: [
        {
          id: 1,
          type: 'status',
          message: 'Request submitted by tenant',
          date: '2024-01-20T10:30:00',
          author: 'Sarah Johnson'
        },
        {
          id: 2,
          type: 'assignment',
          message: 'Assigned to maintenance team',
          date: '2024-01-20T14:45:00',
          author: 'Property Manager'
        }
      ]
    },
    {
      id: 2,
      tenant: 'David Wilson',
      property: 'Garden Complex',
      unit: 'Unit 12',
      issue: 'Air conditioning not cooling properly',
      description: 'AC unit running but not producing cold air. Temperature stays at 25°C despite setting to 18°C.',
      category: 'HVAC',
      priority: 'medium',
      status: 'in-progress',
      dateSubmitted: '2024-01-18T09:15:00',
      dateUpdated: '2024-01-20T11:20:00',
      assignedTo: 'Repair Team A',
      estimatedCost: 3500,
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
      tenantContact: {
        phone: '+27 82 456 7890',
        email: 'david.wilson@email.com',
        preferredContact: 'phone'
      },
      updates: [
        {
          id: 1,
          type: 'status',
          message: 'Request submitted',
          date: '2024-01-18T09:15:00',
          author: 'David Wilson'
        },
        {
          id: 2,
          type: 'assignment',
          message: 'Diagnosis in progress',
          date: '2024-01-19T10:30:00',
          author: 'Repair Team A'
        },
        {
          id: 3,
          type: 'update',
          message: 'Found issue with compressor, parts ordered',
          date: '2024-01-20T11:20:00',
          author: 'Repair Team A'
        }
      ]
    },
    {
      id: 3,
      tenant: 'Emma Roberts',
      property: 'Skyline Towers',
      unit: 'Penthouse A',
      issue: 'Elevator occasionally gets stuck between floors',
      description: 'Elevator sometimes stops between 3rd and 4th floors. Requires emergency button to resume operation.',
      category: 'Elevator',
      priority: 'urgent',
      status: 'open',
      dateSubmitted: '2024-01-20T08:45:00',
      dateUpdated: '2024-01-20T08:45:00',
      assignedTo: 'Elevator Specialists',
      estimatedCost: 8500,
      images: [],
      tenantContact: {
        phone: '+27 84 567 8901',
        email: 'emma.roberts@email.com',
        preferredContact: 'email'
      },
      updates: [
        {
          id: 1,
          type: 'status',
          message: 'Urgent request submitted',
          date: '2024-01-20T08:45:00',
          author: 'Emma Roberts'
        }
      ]
    },
    {
      id: 4,
      tenant: 'Robert Chen',
      property: 'Mountain View Estates',
      unit: 'Villa 3',
      issue: 'Gate motor making grinding noise',
      description: 'Gate motor producing loud grinding sound when opening/closing. Still functional but noise concerning.',
      category: 'Security',
      priority: 'medium',
      status: 'completed',
      dateSubmitted: '2024-01-15T14:20:00',
      dateCompleted: '2024-01-18T16:30:00',
      dateUpdated: '2024-01-18T16:30:00',
      assignedTo: 'Security Systems',
      actualCost: 2200,
      estimatedCost: 2200,
      images: ['/api/placeholder/300/200'],
      tenantContact: {
        phone: '+27 76 678 9012',
        email: 'robert.chen@email.com',
        preferredContact: 'email'
      },
      updates: [
        {
          id: 1,
          type: 'status',
          message: 'Request submitted',
          date: '2024-01-15T14:20:00',
          author: 'Robert Chen'
        },
        {
          id: 2,
          type: 'assignment',
          message: 'Scheduled for inspection',
          date: '2024-01-16T09:00:00',
          author: 'Property Manager'
        },
        {
          id: 3,
          type: 'update',
          message: 'Motor replaced, gate functioning normally',
          date: '2024-01-18T16:30:00',
          author: 'Security Systems'
        },
        {
          id: 4,
          type: 'completion',
          message: 'Request completed and closed',
          date: '2024-01-18T16:30:00',
          author: 'System'
        }
      ]
    }
  ];

  const categories = [
    'Plumbing', 'Electrical', 'HVAC', 'Appliances', 'Structural', 
    'Pest Control', 'Security', 'Elevator', 'Common Areas', 'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#10b981' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626' }
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      open: AlertCircle,
      'in-progress': Clock,
      completed: CheckCircle,
      cancelled: XCircle
    };
    return icons[status] || AlertCircle;
  };

  const getStatusColor = (status) => {
    const colors = {
      open: '#ef4444',
      'in-progress': '#f59e0b',
      completed: '#10b981',
      cancelled: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    const matchesSearch = 
      request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const stats = {
    total: maintenanceRequests.length,
    open: maintenanceRequests.filter(r => r.status === 'open').length,
    inProgress: maintenanceRequests.filter(r => r.status === 'in-progress').length,
    completed: maintenanceRequests.filter(r => r.status === 'completed').length,
    urgent: maintenanceRequests.filter(r => r.priority === 'urgent').length
  };

  const NewRequestModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      issue: '',
      description: '',
      category: '',
      priority: 'medium',
      images: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send to backend
      console.log('New maintenance request:', formData);
      onSubmit(formData);
      onClose();
    };

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      // Simulate image upload - in real app, upload to cloud storage
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files.map(file => URL.createObjectURL(file))]
      }));
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Submit Maintenance Request</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-group">
              <label>Issue Title *</label>
              <input
                type="text"
                placeholder="Brief description of the issue..."
                value={formData.issue}
                onChange={(e) => setFormData(prev => ({ ...prev, issue: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Description *</label>
              <textarea
                placeholder="Please provide detailed information about the issue..."
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Priority *</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Attach Photos (Optional)</label>
              <div className="image-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-btn">
                  <Upload size={16} />
                  Choose Photos
                </label>
                {formData.images.length > 0 && (
                  <span className="image-count">{formData.images.length} photos selected</span>
                )}
              </div>
              {formData.images.length > 0 && (
                <div className="image-preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="preview-item">
                      <img src={image} alt={`Preview ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const RequestDetailModal = ({ request, onClose }) => {
    const [newUpdate, setNewUpdate] = useState('');
    const StatusIcon = getStatusIcon(request.status);

    const handleAddUpdate = (e) => {
      e.preventDefault();
      if (!newUpdate.trim()) return;
      
      // In real app, this would send to backend
      console.log('New update:', newUpdate);
      setNewUpdate('');
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Maintenance Request Details</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="request-details">
            {/* Header Info */}
            <div className="detail-header">
              <div className="request-title">
                <h4>{request.issue}</h4>
                <div className="status-info">
                  <StatusIcon size={16} />
                  <span 
                    className="status-text"
                    style={{ color: getStatusColor(request.status) }}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
              <div 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(request.priority) }}
              >
                {request.priority}
              </div>
            </div>

            {/* Basic Info */}
            <div className="detail-grid">
              <div className="detail-item">
                <label>Tenant</label>
                <div className="tenant-info">
                  <User size={14} />
                  <span>{request.tenant}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Property</label>
                <div className="property-info">
                  <Building size={14} />
                  <span>{request.property} • {request.unit}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Category</label>
                <span>{request.category}</span>
              </div>
              <div className="detail-item">
                <label>Submitted</label>
                <div className="date-info">
                  <Calendar size={14} />
                  <span>{formatDate(request.dateSubmitted)}</span>
                </div>
              </div>
              <div className="detail-item">
                <label>Assigned To</label>
                <span>{request.assignedTo || 'Not assigned'}</span>
              </div>
              <div className="detail-item">
                <label>Estimated Cost</label>
                <div className="cost-info">
                  <DollarSign size={14} />
                  <span>{formatCurrency(request.estimatedCost)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h5>Issue Description</h5>
              <p>{request.description}</p>
            </div>

            {/* Images */}
            {request.images && request.images.length > 0 && (
              <div className="images-section">
                <h5>Attached Images</h5>
                <div className="images-grid">
                  {request.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img 
                        src={image} 
                        alt={`Issue photo ${index + 1}`}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x200/3b82f6/ffffff?text=Image+${index + 1}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Updates Timeline */}
            <div className="updates-section">
              <h5>Updates & Timeline</h5>
              <div className="timeline">
                {request.updates.map((update, index) => (
                  <div key={update.id} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <p>{update.message}</p>
                      <div className="timeline-meta">
                        <span className="author">{update.author}</span>
                        <span className="date">{formatDate(update.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Update */}
            <form onSubmit={handleAddUpdate} className="update-form">
              <div className="form-group">
                <label>Add Update</label>
                <div className="update-input">
                  <input
                    type="text"
                    placeholder="Add an update or comment..."
                    value={newUpdate}
                    onChange={(e) => setNewUpdate(e.target.value)}
                  />
                  <button type="submit" className="send-btn">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="maintenance-request-system">
      {/* Header */}
      <div className="system-header">
        <div className="header-content">
          <h2>Maintenance Requests</h2>
          <p>Manage and track all maintenance requests from tenants</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewRequestModal(true)}
        >
          <Plus size={16} />
          New Request
        </button>
      </div>

      {/* Statistics */}
      <div className="request-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <Wrench size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Requests</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon urgent">
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.urgent}</span>
            <span className="stat-label">Urgent</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon progress">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="system-controls">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="tab-filters">
          <button 
            className={`tab-filter ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Requests
          </button>
          <button 
            className={`tab-filter ${activeTab === 'open' ? 'active' : ''}`}
            onClick={() => setActiveTab('open')}
          >
            Open
          </button>
          <button 
            className={`tab-filter ${activeTab === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`tab-filter ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="requests-list">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          
          return (
            <div 
              key={request.id} 
              className="request-card"
              onClick={() => setSelectedRequest(request)}
            >
              <div className="request-header">
                <div className="request-info">
                  <h4 className="request-title">{request.issue}</h4>
                  <div className="request-meta">
                    <span className="tenant">{request.tenant}</span>
                    <span className="property">
                      <Building size={12} />
                      {request.property} • {request.unit}
                    </span>
                    <span className="category">{request.category}</span>
                  </div>
                </div>
                <div className="request-status">
                  <div className="status-indicator">
                    <StatusIcon size={14} />
                    <span style={{ color: getStatusColor(request.status) }}>
                      {request.status}
                    </span>
                  </div>
                  <div 
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor(request.priority) }}
                  ></div>
                </div>
              </div>

              <p className="request-description">{request.description}</p>

              <div className="request-footer">
                <div className="request-dates">
                  <span>Submitted: {formatDate(request.dateSubmitted)}</span>
                  {request.dateUpdated && (
                    <span>Updated: {formatDate(request.dateUpdated)}</span>
                  )}
                </div>
                <div className="request-actions">
                  <span className="assigned-to">{request.assignedTo}</span>
                  <button className="view-details-btn">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="empty-state">
          <Wrench size={48} />
          <h3>No maintenance requests found</h3>
          <p>Try adjusting your search criteria or create a new request</p>
        </div>
      )}

      {/* Modals */}
      {showNewRequestModal && (
        <NewRequestModal
          onClose={() => setShowNewRequestModal(false)}
          onSubmit={(data) => console.log('New request:', data)}
        />
      )}

      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default MaintenanceRequestSystem;