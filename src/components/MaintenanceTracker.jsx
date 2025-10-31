import React, { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Filter,
  Search,
  MoreVertical,
  User,
  Building,
  Calendar
} from 'lucide-react';
import './MaintenanceTracker.css';

const MaintenanceTracker = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample maintenance data
  const maintenanceRequests = [
    {
      id: 1,
      property: 'Sunset Apartments',
      unit: 'Unit 4B',
      tenant: 'Sarah Johnson',
      issue: 'Kitchen sink leaking',
      priority: 'high',
      status: 'open',
      dateSubmitted: '2024-01-20',
      assignedTo: 'Mike Technician',
      estimatedCompletion: '2024-01-25',
      costEstimate: 1200
    },
    {
      id: 2,
      property: 'Garden Complex',
      unit: 'Unit 12',
      tenant: 'David Wilson',
      issue: 'AC not cooling',
      priority: 'medium',
      status: 'in-progress',
      dateSubmitted: '2024-01-18',
      assignedTo: 'Repair Team A',
      estimatedCompletion: '2024-01-22',
      costEstimate: 3500
    },
    {
      id: 3,
      property: 'Skyline Towers',
      unit: 'Penthouse A',
      tenant: 'Emma Roberts',
      issue: 'Elevator stuck',
      priority: 'urgent',
      status: 'open',
      dateSubmitted: '2024-01-20',
      assignedTo: 'Elevator Specialists',
      estimatedCompletion: '2024-01-21',
      costEstimate: 8500
    },
    {
      id: 4,
      property: 'Mountain View Estates',
      unit: 'Villa 3',
      tenant: 'Robert Chen',
      issue: 'Gate motor faulty',
      priority: 'medium',
      status: 'completed',
      dateSubmitted: '2024-01-15',
      dateCompleted: '2024-01-18',
      assignedTo: 'Security Systems',
      costEstimate: 2200
    },
    {
      id: 5,
      property: 'Riverside Villas',
      unit: 'Unit 2',
      tenant: 'Lisa Thompson',
      issue: 'Roof leak during rain',
      priority: 'high',
      status: 'in-progress',
      dateSubmitted: '2024-01-19',
      assignedTo: 'Roofing Experts',
      estimatedCompletion: '2024-01-26',
      costEstimate: 15000
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: '#ef4444',
      high: '#f59e0b',
      medium: '#3b82f6',
      low: '#10b981'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      open: '#ef4444',
      'in-progress': '#f59e0b',
      completed: '#10b981',
      scheduled: '#3b82f6'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      open: AlertTriangle,
      'in-progress': Clock,
      completed: CheckCircle,
      scheduled: Calendar
    };
    return icons[status] || AlertTriangle;
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesFilter = activeFilter === 'all' || request.status === activeFilter;
    const matchesSearch = request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: maintenanceRequests.length,
    open: maintenanceRequests.filter(r => r.status === 'open').length,
    inProgress: maintenanceRequests.filter(r => r.status === 'in-progress').length,
    completed: maintenanceRequests.filter(r => r.status === 'completed').length,
    urgent: maintenanceRequests.filter(r => r.priority === 'urgent').length
  };

  return (
    <div className="maintenance-tracker">
      {/* Header */}
      <div className="maintenance-header">
        <div className="header-content">
          <h2>Maintenance Management</h2>
          <p>Track and manage all maintenance requests across your portfolio</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          New Request
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="maintenance-stats">
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
          <div className="stat-card">
          <div className="stat-icon urgent">
            <AlertTriangle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.urgent}</span>
            <span className="stat-label">Urgent</span>
          </div>
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
      <div className="maintenance-controls">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search maintenance requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'open' ? 'active' : ''}`}
            onClick={() => setActiveFilter('open')}
          >
            Open
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="maintenance-table">
        <div className="table-header">
          <div className="col property">Property & Unit</div>
          <div className="col issue">Issue Description</div>
          <div className="col tenant">Tenant</div>
          <div className="col priority">Priority</div>
          <div className="col status">Status</div>
          <div className="col cost">Cost Estimate</div>
          <div className="col actions">Actions</div>
        </div>

        <div className="table-body">
          {filteredRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <div key={request.id} className="table-row">
                <div className="col property">
                  <div className="property-info">
                    <Building size={14} />
                    <div>
                      <div className="property-name">{request.property}</div>
                      <div className="unit-number">{request.unit}</div>
                    </div>
                  </div>
                </div>
                <div className="col issue">
                  <div className="issue-description">{request.issue}</div>
                  <div className="date-submitted">
                    Submitted: {new Date(request.dateSubmitted).toLocaleDateString()}
                  </div>
                </div>
                <div className="col tenant">
                  <div className="tenant-info">
                    <User size={14} />
                    <span>{request.tenant}</span>
                  </div>
                </div>
                <div className="col priority">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(request.priority) }}
                  >
                    {request.priority}
                  </span>
                </div>
                <div className="col status">
                  <div className="status-info">
                    <StatusIcon size={14} />
                    <span 
                      className="status-text"
                      style={{ color: getStatusColor(request.status) }}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>
                <div className="col cost">
                  {formatCurrency(request.costEstimate)}
                </div>
                <div className="col actions">
                  <button className="action-more">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="empty-state">
          <Wrench size={48} />
          <h3>No maintenance requests found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default MaintenanceTracker;