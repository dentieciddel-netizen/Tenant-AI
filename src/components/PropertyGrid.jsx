import React, { useState } from 'react';
import { 
  Building, 
  Home, 
  MapPin, 
  DollarSign, 
  Users, 
  AlertTriangle,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import './PropertyGrid.css';

const PropertyGrid = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Sample property data
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Beach Road, Cape Town',
      type: 'Apartment Complex',
      totalUnits: 24,
      occupiedUnits: 22,
      monthlyRevenue: 360000,
      status: 'excellent',
      image: '/api/placeholder/300/200',
      lastMaintenance: '2024-01-15',
      issues: 1
    },
    {
      id: 2,
      name: 'Garden Complex',
      address: '45 Oak Street, Johannesburg',
      type: 'Townhouse Complex',
      totalUnits: 18,
      occupiedUnits: 16,
      monthlyRevenue: 288000,
      status: 'good',
      image: '/api/placeholder/300/200',
      lastMaintenance: '2024-01-10',
      issues: 2
    },
    {
      id: 3,
      name: 'Skyline Towers',
      address: '78 High Street, Durban',
      type: 'Luxury Apartments',
      totalUnits: 32,
      occupiedUnits: 26,
      monthlyRevenue: 624000,
      status: 'warning',
      image: '/api/placeholder/300/200',
      lastMaintenance: '2023-12-20',
      issues: 4
    },
    {
      id: 4,
      name: 'Mountain View Estates',
      address: '12 Valley Road, Pretoria',
      type: 'Gated Community',
      totalUnits: 42,
      occupiedUnits: 35,
      monthlyRevenue: 735000,
      status: 'good',
      image: '/api/placeholder/300/200',
      lastMaintenance: '2024-01-05',
      issues: 1
    },
    {
      id: 5,
      name: 'Riverside Villas',
      address: '56 Riverbank Drive, Port Elizabeth',
      type: 'Luxury Villas',
      totalUnits: 12,
      occupiedUnits: 8,
      monthlyRevenue: 240000,
      status: 'critical',
      image: '/api/placeholder/300/200',
      lastMaintenance: '2023-11-15',
      issues: 6
    },
    {
      id: 6,
      name: 'City Center Lofts',
      address: '89 Urban Avenue, Sandton',
      type: 'Commercial Residential',
      totalUnits: 28,
      occupiedUnits: 28,
      monthlyRevenue: 560000,
      status: 'excellent',
      image: '/api/placeholder/300/200',
      lastMaintenance: '2024-01-18',
      issues: 0
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      excellent: '#10b981',
      good: '#3b82f6',
      warning: '#f59e0b',
      critical: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status) => {
    const texts = {
      excellent: 'Excellent',
      good: 'Good',
      warning: 'Needs Attention',
      critical: 'Critical'
    };
    return texts[status] || 'Unknown';
  };

  const calculateOccupancyRate = (occupied, total) => {
    return Math.round((occupied / total) * 100);
  };

  return (
    <div className="property-grid">
      <div className="property-grid-header">
        <div className="header-content">
          <h2>Property Portfolio</h2>
          <p>Manage and monitor all your properties in one place</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <Building size={16} />
            Add New Property
          </button>
          <button className="btn btn-secondary">
            Filter Properties
          </button>
        </div>
      </div>

      <div className="properties-container">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            {/* Property Image and Status */}
            <div className="property-image">
              <img 
                src={property.image} 
                alt={property.name}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/3b82f6/ffffff?text=${encodeURIComponent(property.name)}`;
                }}
              />
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(property.status) }}
              >
                {getStatusText(property.status)}
              </div>
              {property.issues > 0 && (
                <div className="issues-badge">
                  <AlertTriangle size={12} />
                  {property.issues} issue{property.issues !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="property-details">
              <h3 className="property-name">{property.name}</h3>
              <p className="property-address">
                <MapPin size={14} />
                {property.address}
              </p>
              <p className="property-type">{property.type}</p>

              {/* Key Metrics */}
              <div className="property-metrics">
                <div className="metric">
                  <Home size={16} />
                  <span>{property.totalUnits} units</span>
                </div>
                <div className="metric">
                  <Users size={16} />
                  <span>{calculateOccupancyRate(property.occupiedUnits, property.totalUnits)}% occupied</span>
                </div>
                <div className="metric">
                  <DollarSign size={16} />
                  <span>{formatCurrency(property.monthlyRevenue)}/mo</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="occupancy-bar">
                <div 
                  className="occupancy-fill"
                  style={{ 
                    width: `${calculateOccupancyRate(property.occupiedUnits, property.totalUnits)}%`,
                    backgroundColor: getStatusColor(property.status)
                  }}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="property-actions">
                <button className="action-btn view-btn">
                  <Eye size={16} />
                  View
                </button>
                <button className="action-btn edit-btn">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="action-btn more-btn">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="properties-summary">
        <div className="summary-item">
          <span className="summary-label">Total Properties</span>
          <span className="summary-value">{properties.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Revenue</span>
          <span className="summary-value">
            {formatCurrency(properties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0))}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Average Occupancy</span>
          <span className="summary-value">
            {Math.round(
              properties.reduce((sum, prop) => 
                sum + calculateOccupancyRate(prop.occupiedUnits, prop.totalUnits), 0
              ) / properties.length
            )}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;