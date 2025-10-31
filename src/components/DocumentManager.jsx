import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  Upload, 
  Download, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Share2,
  Lock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Building,
  Home,
  Plus,
  Image,
  File
} from 'lucide-react';
import './DocumentManager.css';

const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Sample documents data
  const documents = [
    {
      id: 1,
      name: 'Lease Agreement - Sarah Johnson',
      type: 'lease',
      category: 'Lease Agreements',
      size: '2.4 MB',
      uploaded: '2024-01-15T10:30:00',
      modified: '2024-01-15T10:30:00',
      uploadedBy: 'Property Manager',
      property: 'Sunset Apartments',
      unit: 'Unit 4B',
      tenant: 'Sarah Johnson',
      status: 'active',
      version: '1.0',
      tags: ['lease', 'signed', 'current'],
      access: ['manager', 'tenant'],
      fileType: 'pdf',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Maintenance Request Form - David Wilson',
      type: 'form',
      category: 'Maintenance',
      size: '1.2 MB',
      uploaded: '2024-01-18T14:20:00',
      modified: '2024-01-20T09:15:00',
      uploadedBy: 'David Wilson',
      property: 'Garden Complex',
      unit: 'Unit 12',
      tenant: 'David Wilson',
      status: 'pending',
      version: '1.0',
      tags: ['maintenance', 'ac-repair'],
      access: ['manager', 'maintenance'],
      fileType: 'pdf',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Property Insurance Certificate',
      type: 'insurance',
      category: 'Insurance',
      size: '3.1 MB',
      uploaded: '2024-01-10T09:00:00',
      modified: '2024-01-10T09:00:00',
      uploadedBy: 'Insurance Provider',
      property: 'All Properties',
      unit: 'Portfolio',
      tenant: 'N/A',
      status: 'active',
      version: '2.1',
      tags: ['insurance', 'renewal-2024'],
      access: ['manager'],
      fileType: 'pdf',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Tenant Welcome Package',
      type: 'guide',
      category: 'Tenant Resources',
      size: '4.5 MB',
      uploaded: '2023-12-01T08:45:00',
      modified: '2023-12-15T11:30:00',
      uploadedBy: 'Property Manager',
      property: 'All Properties',
      unit: 'All Units',
      tenant: 'All Tenants',
      status: 'active',
      version: '3.2',
      tags: ['welcome', 'guide', 'resources'],
      access: ['manager', 'tenant'],
      fileType: 'pdf',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Rental Application - Emma Roberts',
      type: 'application',
      category: 'Applications',
      size: '1.8 MB',
      uploaded: '2023-11-25T16:20:00',
      modified: '2023-11-25T16:20:00',
      uploadedBy: 'Emma Roberts',
      property: 'Skyline Towers',
      unit: 'Penthouse A',
      tenant: 'Emma Roberts',
      status: 'approved',
      version: '1.0',
      tags: ['application', 'approved'],
      access: ['manager'],
      fileType: 'pdf',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'Building Floor Plan - Garden Complex',
      type: 'plan',
      category: 'Property Plans',
      size: '5.2 MB',
      uploaded: '2023-10-15T13:10:00',
      modified: '2023-10-15T13:10:00',
      uploadedBy: 'Architect',
      property: 'Garden Complex',
      unit: 'Common Areas',
      tenant: 'N/A',
      status: 'active',
      version: '1.0',
      tags: ['floor-plan', 'building'],
      access: ['manager', 'maintenance'],
      fileType: 'image',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 7,
      name: 'Emergency Contact List',
      type: 'contact',
      category: 'Emergency',
      size: '0.8 MB',
      uploaded: '2024-01-05T07:30:00',
      modified: '2024-01-12T15:45:00',
      uploadedBy: 'Property Manager',
      property: 'All Properties',
      unit: 'All Units',
      tenant: 'All Tenants',
      status: 'active',
      version: '2.3',
      tags: ['emergency', 'contacts'],
      access: ['manager', 'tenant', 'maintenance'],
      fileType: 'pdf',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 8,
      name: 'Rent Increase Notice - Mountain View',
      type: 'notice',
      category: 'Notices',
      size: '1.1 MB',
      uploaded: '2024-01-22T11:00:00',
      modified: '2024-01-22T11:00:00',
      uploadedBy: 'Property Manager',
      property: 'Mountain View Estates',
      unit: 'All Units',
      tenant: 'All Tenants',
      status: 'draft',
      version: '1.0',
      tags: ['rent-increase', 'notice'],
      access: ['manager'],
      fileType: 'doc',
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length, icon: FileText },
    { id: 'lease', name: 'Lease Agreements', count: documents.filter(d => d.category === 'Lease Agreements').length, icon: FileText },
    { id: 'maintenance', name: 'Maintenance', count: documents.filter(d => d.category === 'Maintenance').length, icon: FileText },
    { id: 'insurance', name: 'Insurance', count: documents.filter(d => d.category === 'Insurance').length, icon: FileText },
    { id: 'applications', name: 'Applications', count: documents.filter(d => d.category === 'Applications').length, icon: FileText },
    { id: 'resources', name: 'Tenant Resources', count: documents.filter(d => d.category === 'Tenant Resources').length, icon: FileText },
    { id: 'emergency', name: 'Emergency', count: documents.filter(d => d.category === 'Emergency').length, icon: FileText },
    { id: 'notices', name: 'Notices', count: documents.filter(d => d.category === 'Notices').length, icon: FileText },
    { id: 'plans', name: 'Property Plans', count: documents.filter(d => d.category === 'Property Plans').length, icon: FileText }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileType) => {
    const icons = {
      pdf: FileText,
      doc: FileText,
      image: Image,
      default: File
    };
    return icons[fileType] || icons.default;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: '#10b981',
      pending: '#f59e0b',
      draft: '#6b7280',
      approved: '#3b82f6',
      expired: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getAccessColor = (accessLevel) => {
    const colors = {
      manager: '#3b82f6',
      tenant: '#10b981',
      maintenance: '#f59e0b',
      public: '#6b7280'
    };
    return colors[accessLevel] || '#6b7280';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || 
      categories.find(cat => cat.id === categoryFilter)?.name === doc.category;
    
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: documents.length,
    leases: documents.filter(d => d.category === 'Lease Agreements').length,
    pending: documents.filter(d => d.status === 'pending').length,
    recent: documents.filter(d => new Date(d.uploaded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
  };

  const UploadModal = ({ onClose, onUpload }) => {
    const [uploadData, setUploadData] = useState({
      file: null,
      category: '',
      property: '',
      unit: '',
      tenant: '',
      tags: [],
      access: ['manager']
    });

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadData(prev => ({
          ...prev,
          file,
          name: file.name
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically upload to cloud storage
      console.log('Upload document:', uploadData);
      onUpload(uploadData);
      onClose();
    };

    const addTag = (tag) => {
      if (tag && !uploadData.tags.includes(tag)) {
        setUploadData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
      }
    };

    const removeTag = (tagToRemove) => {
      setUploadData(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagToRemove)
      }));
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Upload New Document</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="upload-form">
            <div className="upload-area">
              <input
                type="file"
                onChange={handleFileSelect}
                className="file-input"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="upload-dropzone">
                <Upload size={32} />
                <div>
                  <strong>Choose a file or drag and drop here</strong>
                  <p>PDF, DOC, JPG, PNG up to 10MB</p>
                </div>
                {uploadData.file && (
                  <div className="selected-file">
                    <FileText size={16} />
                    <span>{uploadData.file.name}</span>
                  </div>
                )}
              </label>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Document Name</label>
                <input
                  type="text"
                  value={uploadData.name || ''}
                  onChange={(e) => setUploadData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter document name..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={uploadData.category}
                  onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.filter(cat => cat.id !== 'all').map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Property</label>
                <select
                  value={uploadData.property}
                  onChange={(e) => setUploadData(prev => ({ ...prev, property: e.target.value }))}
                >
                  <option value="">Select Property</option>
                  <option value="Sunset Apartments">Sunset Apartments</option>
                  <option value="Garden Complex">Garden Complex</option>
                  <option value="Skyline Towers">Skyline Towers</option>
                  <option value="Mountain View Estates">Mountain View Estates</option>
                  <option value="All Properties">All Properties</option>
                </select>
              </div>

              <div className="form-group">
                <label>Unit</label>
                <input
                  type="text"
                  value={uploadData.unit}
                  onChange={(e) => setUploadData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="Unit number or 'All Units'"
                />
              </div>

              <div className="form-group">
                <label>Tenant</label>
                <input
                  type="text"
                  value={uploadData.tenant}
                  onChange={(e) => setUploadData(prev => ({ ...prev, tenant: e.target.value }))}
                  placeholder="Tenant name or 'All Tenants'"
                />
              </div>

              <div className="form-group">
                <label>Access Level</label>
                <div className="access-select">
                  {['manager', 'tenant', 'maintenance'].map(level => (
                    <label key={level} className="access-option">
                      <input
                        type="checkbox"
                        checked={uploadData.access.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUploadData(prev => ({
                              ...prev,
                              access: [...prev.access, level]
                            }));
                          } else {
                            setUploadData(prev => ({
                              ...prev,
                              access: prev.access.filter(a => a !== level)
                            }));
                          }
                        }}
                      />
                      <span className="access-label">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input">
                <input
                  type="text"
                  placeholder="Add tags..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <div className="tags-list">
                  {uploadData.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={!uploadData.file}>
                Upload Document
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const DocumentDetailModal = ({ document, onClose }) => {
    const FileIcon = getFileIcon(document.fileType);

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Document Details</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="document-details">
            <div className="document-preview">
              <div className="preview-header">
                <div className="file-icon">
                  <FileIcon size={32} />
                </div>
                <div className="file-info">
                  <h4>{document.name}</h4>
                  <p>{document.size} • {document.fileType.toUpperCase()}</p>
                </div>
                <div className="file-actions">
                  <button className="btn btn-secondary">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="btn btn-secondary">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>

              <div className="preview-content">
                <img 
                  src={document.thumbnail} 
                  alt={document.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=Document+Preview`;
                  }}
                />
              </div>
            </div>

            <div className="document-meta">
              <div className="meta-section">
                <h5>Document Information</h5>
                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Category</span>
                    <span className="meta-value">{document.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <span 
                      className="meta-value status-badge"
                      style={{ backgroundColor: getStatusColor(document.status) }}
                    >
                      {document.status}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Version</span>
                    <span className="meta-value">{document.version}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Uploaded</span>
                    <span className="meta-value">{formatDate(document.uploaded)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Modified</span>
                    <span className="meta-value">{formatDate(document.modified)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Uploaded By</span>
                    <span className="meta-value">{document.uploadedBy}</span>
                  </div>
                </div>
              </div>

              <div className="meta-section">
                <h5>Property Information</h5>
                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Property</span>
                    <div className="meta-value">
                      <Building size={14} />
                      <span>{document.property}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Unit</span>
                    <div className="meta-value">
                      <Home size={14} />
                      <span>{document.unit}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Tenant</span>
                    <div className="meta-value">
                      <User size={14} />
                      <span>{document.tenant}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="meta-section">
                <h5>Access & Permissions</h5>
                <div className="access-list">
                  {document.access.map(level => (
                    <span 
                      key={level}
                      className="access-badge"
                      style={{ backgroundColor: getAccessColor(level) }}
                    >
                      <Lock size={12} />
                      {level}
                    </span>
                  ))}
                </div>
              </div>

              <div className="meta-section">
                <h5>Tags</h5>
                <div className="tags-list">
                  {document.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="meta-section">
                <h5>Document History</h5>
                <div className="history-timeline">
                  <div className="history-item">
                    <div className="history-marker"></div>
                    <div className="history-content">
                      <p>Document uploaded</p>
                      <span className="history-date">{formatDate(document.uploaded)}</span>
                      <span className="history-author">by {document.uploadedBy}</span>
                    </div>
                  </div>
                  {document.modified !== document.uploaded && (
                    <div className="history-item">
                      <div className="history-marker"></div>
                      <div className="history-content">
                        <p>Document modified</p>
                        <span className="history-date">{formatDate(document.modified)}</span>
                        <span className="history-author">by {document.uploadedBy}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="document-manager">
      {/* Header */}
      <div className="documents-header">
        <div className="header-content">
          <h2>Document Manager</h2>
          <p>Secure storage and management for all property documents</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={16} />
          Upload Document
        </button>
      </div>

      {/* Statistics */}
      <div className="documents-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Documents</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon leases">
            <Folder size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.leases}</span>
            <span className="stat-label">Lease Agreements</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending Review</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon recent">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.recent}</span>
            <span className="stat-label">Recent Uploads</span>
          </div>
        </div>
      </div>

      <div className="documents-layout">
        {/* Sidebar Categories */}
        <div className="categories-sidebar">
          <h3>Categories</h3>
          <div className="categories-list">
            {categories.map(category => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  className={`category-item ${categoryFilter === category.id ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(category.id)}
                >
                  <CategoryIcon size={16} />
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="documents-content">
          {/* Search and Filters */}
          <div className="documents-controls">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="view-controls">
              <button className="btn btn-secondary">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="documents-grid">
            {filteredDocuments.map(document => {
              const FileIcon = getFileIcon(document.fileType);
              
              return (
                <div 
                  key={document.id} 
                  className="document-card"
                  onClick={() => setSelectedDocument(document)}
                >
                  <div className="document-thumbnail">
                    <img 
                      src={document.thumbnail} 
                      alt={document.name}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/200x150/3b82f6/ffffff?text=${document.fileType.toUpperCase()}`;
                      }}
                    />
                    <div className="document-overlay">
                      <FileIcon size={24} />
                    </div>
                    <div className="document-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(document.status) }}
                      >
                        {document.status}
                      </span>
                      {document.access.includes('tenant') && (
                        <span className="access-badge">
                          <Lock size={10} />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="document-info">
                    <h4 className="document-name">{document.name}</h4>
                    <div className="document-meta">
                      <span className="file-size">{document.size}</span>
                      <span className="file-type">{document.fileType}</span>
                    </div>
                    <div className="document-location">
                      <Building size={12} />
                      <span>{document.property}</span>
                      {document.unit !== 'All Units' && (
                        <>
                          <span>•</span>
                          <Home size={12} />
                          <span>{document.unit}</span>
                        </>
                      )}
                    </div>
                    <div className="document-tenant">
                      <User size={12} />
                      <span>{document.tenant}</span>
                    </div>
                    <div className="document-date">
                      <Calendar size={12} />
                      <span>{formatDate(document.uploaded)}</span>
                    </div>
                  </div>

                  <div className="document-actions">
                    <button className="action-btn" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn" title="Download">
                      <Download size={16} />
                    </button>
                    <button className="action-btn" title="More">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="empty-state">
              <FileText size={48} />
              <h3>No documents found</h3>
              <p>Try adjusting your search criteria or upload new documents</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(data) => console.log('Upload:', data)}
        />
      )}

      {selectedDocument && (
        <DocumentDetailModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default DocumentManager;