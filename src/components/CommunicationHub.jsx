import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Plus, 
  Search, 
  Filter,
  Users,
  User,
  Building,
  Home,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Copy,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Paperclip,
  Smile,
  Image,
  Video
} from 'lucide-react';
import './CommunicationHub.css';

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Sample communication data
  const communications = {
    announcements: [
      {
        id: 1,
        title: 'Quarterly Maintenance Schedule',
        content: 'Please be advised that quarterly building maintenance will take place from January 25th to January 30th. Common areas may have limited access during this period.',
        type: 'announcement',
        category: 'maintenance',
        priority: 'medium',
        status: 'sent',
        sentTo: 'all-tenants',
        delivery: {
          email: 187,
          sms: 142,
          push: 89
        },
        sentBy: 'Property Manager',
        sentDate: '2024-01-20T09:00:00',
        opened: 156,
        clicked: 89,
        replies: 12,
        attachments: ['maintenance_schedule.pdf']
      },
      {
        id: 2,
        title: 'Rent Payment Reminder',
        content: 'Friendly reminder that rent is due on February 1st. Late payments will incur a 5% penalty after the 5th of the month.',
        type: 'reminder',
        category: 'financial',
        priority: 'high',
        status: 'sent',
        sentTo: 'all-tenants',
        delivery: {
          email: 187,
          sms: 187,
          push: 123
        },
        sentBy: 'Finance Department',
        sentDate: '2024-01-25T14:30:00',
        opened: 178,
        clicked: 134,
        replies: 23,
        attachments: []
      },
      {
        id: 3,
        title: 'Community Event: Summer BBQ',
        content: 'Join us for our annual summer BBQ on February 15th at the pool area! Food and drinks provided. RSVP by February 10th.',
        type: 'event',
        category: 'community',
        priority: 'low',
        status: 'scheduled',
        sentTo: 'all-tenants',
        delivery: {
          email: 0,
          sms: 0,
          push: 0
        },
        sentBy: 'Community Manager',
        sentDate: '2024-02-01T10:00:00',
        scheduledFor: '2024-02-01T10:00:00',
        opened: 0,
        clicked: 0,
        replies: 0,
        attachments: ['bbq_flyer.jpg']
      },
      {
        id: 4,
        title: 'Elevator Maintenance Notice',
        content: 'Elevator maintenance scheduled for February 5th, 9 AM - 12 PM. Elevators will be temporarily unavailable. Please use stairs during this time.',
        type: 'alert',
        category: 'maintenance',
        priority: 'high',
        status: 'draft',
        sentTo: 'skyline-towers',
        delivery: {
          email: 0,
          sms: 0,
          push: 0
        },
        sentBy: 'Maintenance Team',
        sentDate: null,
        opened: 0,
        clicked: 0,
        replies: 0,
        attachments: []
      }
    ],
    templates: [
      {
        id: 1,
        name: 'Welcome New Tenant',
        subject: 'Welcome to {Property Name}!',
        content: 'Dear {Tenant Name}, Welcome to {Property Name}! We are excited to have you as part of our community...',
        type: 'email',
        category: 'onboarding',
        used: 24,
        lastUsed: '2024-01-15',
        created: '2023-06-01'
      },
      {
        id: 2,
        name: 'Rent Reminder',
        subject: 'Rent Due Reminder - {Property Name}',
        content: 'Hello {Tenant Name}, This is a friendly reminder that rent for {Month} is due on {Due Date}...',
        type: 'sms',
        category: 'financial',
        used: 156,
        lastUsed: '2024-01-25',
        created: '2023-01-15'
      },
      {
        id: 3,
        name: 'Maintenance Notice',
        subject: 'Maintenance Alert - {Property Name}',
        content: 'Important maintenance notice for {Property Name}. {Maintenance Details}...',
        type: 'email',
        category: 'maintenance',
        used: 42,
        lastUsed: '2024-01-20',
        created: '2023-03-10'
      },
      {
        id: 4,
        name: 'Emergency Alert',
        subject: 'EMERGENCY: {Emergency Type} - {Property Name}',
        content: 'URGENT: {Emergency Details}. Please follow safety protocols...',
        type: 'sms',
        category: 'emergency',
        used: 3,
        lastUsed: '2023-11-05',
        created: '2023-01-10'
      }
    ],
    conversations: [
      {
        id: 1,
        tenant: 'Sarah Johnson',
        property: 'Sunset Apartments',
        unit: 'Unit 4B',
        lastMessage: 'Thank you for the quick response! The maintenance team was very professional.',
        lastActivity: '2024-01-20T16:45:00',
        unread: 0,
        status: 'resolved',
        messages: 8,
        assignedTo: 'Property Manager'
      },
      {
        id: 2,
        tenant: 'David Wilson',
        property: 'Garden Complex',
        unit: 'Unit 12',
        lastMessage: 'Is there an update on the AC repair? Its getting quite warm in the unit.',
        lastActivity: '2024-01-20T15:20:00',
        unread: 2,
        status: 'in-progress',
        messages: 12,
        assignedTo: 'Maintenance Team'
      },
      {
        id: 3,
        tenant: 'Emma Roberts',
        property: 'Skyline Towers',
        unit: 'Penthouse A',
        lastMessage: 'I would like to schedule a viewing for the additional storage unit.',
        lastActivity: '2024-01-20T14:10:00',
        unread: 1,
        status: 'new',
        messages: 3,
        assignedTo: 'Property Manager'
      }
    ]
  };

  const recipientGroups = [
    { id: 'all-tenants', name: 'All Tenants', count: 187 },
    { id: 'sunset-apartments', name: 'Sunset Apartments', count: 24 },
    { id: 'garden-complex', name: 'Garden Complex', count: 18 },
    { id: 'skyline-towers', name: 'Skyline Towers', count: 32 },
    { id: 'mountain-view', name: 'Mountain View Estates', count: 42 },
    { id: 'riverside-villas', name: 'Riverside Villas', count: 12 },
    { id: 'city-center-lofts', name: 'City Center Lofts', count: 28 },
    { id: 'overdue-rent', name: 'Overdue Rent', count: 8 },
    { id: 'new-tenants', name: 'New Tenants (30 days)', count: 15 }
  ];

  const messageTypes = [
    { id: 'announcement', name: 'Announcement', icon: Megaphone },
    { id: 'reminder', name: 'Reminder', icon: Bell },
    { id: 'alert', name: 'Alert', icon: AlertCircle },
    { id: 'event', name: 'Event', icon: Calendar },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench }
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

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      urgent: '#dc2626'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: '#6b7280',
      scheduled: '#f59e0b',
      sent: '#10b981',
      failed: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      draft: Edit,
      scheduled: Clock,
      sent: CheckCircle,
      failed: AlertCircle
    };
    return icons[status] || Edit;
  };

  const getConversationStatusColor = (status) => {
    const colors = {
      new: '#3b82f6',
      'in-progress': '#f59e0b',
      resolved: '#10b981',
      closed: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const stats = {
    totalSent: 245,
    deliveryRate: 92.5,
    openRate: 78.3,
    replyRate: 15.2,
    activeConversations: communications.conversations.filter(c => c.status !== 'resolved').length
  };

  const NewMessageModal = ({ onClose, onSend }) => {
    const [messageData, setMessageData] = useState({
      type: 'announcement',
      subject: '',
      content: '',
      recipients: ['all-tenants'],
      priority: 'medium',
      schedule: null,
      channels: ['email', 'sms'],
      attachments: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send to backend
      console.log('New message:', messageData);
      onSend(messageData);
      onClose();
    };

    const handleRecipientToggle = (recipientId) => {
      setMessageData(prev => ({
        ...prev,
        recipients: prev.recipients.includes(recipientId)
          ? prev.recipients.filter(id => id !== recipientId)
          : [...prev.recipients, recipientId]
      }));
    };

    const handleChannelToggle = (channel) => {
      setMessageData(prev => ({
        ...prev,
        channels: prev.channels.includes(channel)
          ? prev.channels.filter(c => c !== channel)
          : [...prev.channels, channel]
      }));
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Create New Message</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="message-form">
            <div className="form-section">
              <h4>Message Details</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>Message Type</label>
                  <select
                    value={messageData.type}
                    onChange={(e) => setMessageData(prev => ({ ...prev, type: e.target.value }))}
                  >
                    {messageTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={messageData.priority}
                    onChange={(e) => setMessageData(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Enter message subject..."
                  value={messageData.subject}
                  onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message Content</label>
                <div className="message-editor">
                  <div className="editor-toolbar">
                    <button type="button" className="toolbar-btn">
                      <FileText size={16} />
                    </button>
                    <button type="button" className="toolbar-btn">
                      <Image size={16} />
                    </button>
                    <button type="button" className="toolbar-btn">
                      <Paperclip size={16} />
                    </button>
                    <button type="button" className="toolbar-btn">
                      <Smile size={16} />
                    </button>
                  </div>
                  <textarea
                    placeholder="Write your message here..."
                    rows="8"
                    value={messageData.content}
                    onChange={(e) => setMessageData(prev => ({ ...prev, content: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Recipients</h4>
              <div className="recipients-grid">
                {recipientGroups.map(group => (
                  <label key={group.id} className="recipient-option">
                    <input
                      type="checkbox"
                      checked={messageData.recipients.includes(group.id)}
                      onChange={() => handleRecipientToggle(group.id)}
                    />
                    <div className="recipient-info">
                      <span className="recipient-name">{group.name}</span>
                      <span className="recipient-count">{group.count} tenants</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h4>Delivery Settings</h4>
              <div className="delivery-settings">
                <div className="channel-selection">
                  <label className="channel-option">
                    <input
                      type="checkbox"
                      checked={messageData.channels.includes('email')}
                      onChange={() => handleChannelToggle('email')}
                    />
                    <Mail size={16} />
                    <span>Email</span>
                  </label>
                  <label className="channel-option">
                    <input
                      type="checkbox"
                      checked={messageData.channels.includes('sms')}
                      onChange={() => handleChannelToggle('sms')}
                    />
                    <Phone size={16} />
                    <span>SMS</span>
                  </label>
                  <label className="channel-option">
                    <input
                      type="checkbox"
                      checked={messageData.channels.includes('push')}
                      onChange={() => handleChannelToggle('push')}
                    />
                    <Bell size={16} />
                    <span>Push Notification</span>
                  </label>
                </div>

                <div className="scheduling">
                  <label>
                    <input
                      type="checkbox"
                      checked={!!messageData.schedule}
                      onChange={(e) => setMessageData(prev => ({ 
                        ...prev, 
                        schedule: e.target.checked ? new Date().toISOString() : null 
                      }))}
                    />
                    Schedule for later
                  </label>
                  {messageData.schedule && (
                    <input
                      type="datetime-local"
                      value={messageData.schedule}
                      onChange={(e) => setMessageData(prev => ({ ...prev, schedule: e.target.value }))}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Save Draft
              </button>
              <div className="action-group">
                <button type="button" className="btn btn-secondary">
                  <Eye size={16} />
                  Preview
                </button>
                <button type="submit" className="btn btn-primary">
                  {messageData.schedule ? 'Schedule Message' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const MessageDetailModal = ({ message, onClose }) => {
    const StatusIcon = getStatusIcon(message.status);

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Message Details</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="message-details">
            <div className="message-header">
              <div className="message-title">
                <h4>{message.title}</h4>
                <div className="message-meta">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(message.priority) }}
                  >
                    {message.priority}
                  </span>
                  <div className="status-info">
                    <StatusIcon size={14} />
                    <span style={{ color: getStatusColor(message.status) }}>
                      {message.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="message-actions">
                <button className="btn btn-secondary">
                  <Copy size={16} />
                  Copy
                </button>
                <button className="btn btn-secondary">
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>

            <div className="message-content">
              <p>{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="attachments">
                  <h5>Attachments</h5>
                  {message.attachments.map((file, index) => (
                    <div key={index} className="attachment-item">
                      <FileText size={16} />
                      <span>{file}</span>
                      <button className="download-btn">
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="message-stats">
              <h5>Delivery Statistics</h5>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Sent To</span>
                  <span className="stat-value">
                    {recipientGroups.find(g => g.id === message.sentTo)?.name || message.sentTo}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Delivery Rate</span>
                  <span className="stat-value">
                    {Math.round((message.delivery.email + message.delivery.sms + message.delivery.push) / 187 * 100)}%
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Open Rate</span>
                  <span className="stat-value">
                    {Math.round((message.opened / 187) * 100)}%
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Click Rate</span>
                  <span className="stat-value">
                    {Math.round((message.clicked / 187) * 100)}%
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Replies</span>
                  <span className="stat-value">{message.replies}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Sent Date</span>
                  <span className="stat-value">{formatDate(message.sentDate)}</span>
                </div>
              </div>

              <div className="channel-breakdown">
                <h6>Delivery by Channel</h6>
                <div className="channel-stats">
                  <div className="channel-stat">
                    <Mail size={16} />
                    <span>Email: {message.delivery.email}</span>
                  </div>
                  <div className="channel-stat">
                    <Phone size={16} />
                    <span>SMS: {message.delivery.sms}</span>
                  </div>
                  <div className="channel-stat">
                    <Bell size={16} />
                    <span>Push: {message.delivery.push}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="communication-hub">
      {/* Header */}
      <div className="hub-header">
        <div className="header-content">
          <h2>Communication Hub</h2>
          <p>Manage all tenant communications and announcements</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewMessageModal(true)}
        >
          <Send size={16} />
          New Message
        </button>
      </div>

      {/* Statistics */}
      <div className="communication-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <Send size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.totalSent}</span>
            <span className="stat-label">Messages Sent</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon delivery">
            <BarChart3 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.deliveryRate}%</span>
            <span className="stat-label">Delivery Rate</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon open">
            <Eye size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.openRate}%</span>
            <span className="stat-label">Open Rate</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon conversations">
            <MessageCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.activeConversations}</span>
            <span className="stat-label">Active Conversations</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="hub-tabs">
        <button 
          className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          <Megaphone size={16} />
          Announcements
        </button>
        <button 
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <FileText size={16} />
          Templates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'conversations' ? 'active' : ''}`}
          onClick={() => setActiveTab('conversations')}
        >
          <MessageCircle size={16} />
          Conversations
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={16} />
          Analytics
        </button>
      </div>

      {/* Content */}
      <div className="hub-content">
        {/* Controls */}
        <div className="content-controls">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-controls">
            <button className="btn btn-secondary">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="announcements-grid">
            {communications.announcements.map(announcement => {
              const StatusIcon = getStatusIcon(announcement.status);
              
              return (
                <div 
                  key={announcement.id} 
                  className="announcement-card"
                  onClick={() => setSelectedMessage(announcement)}
                >
                  <div className="announcement-header">
                    <h4 className="announcement-title">{announcement.title}</h4>
                    <div className="announcement-meta">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                      >
                        {announcement.priority}
                      </span>
                      <div className="status-info">
                        <StatusIcon size={14} />
                        <span style={{ color: getStatusColor(announcement.status) }}>
                          {announcement.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="announcement-content">{announcement.content}</p>

                  <div className="announcement-footer">
                    <div className="announcement-info">
                      <div className="info-item">
                        <Users size={14} />
                        <span>{recipientGroups.find(g => g.id === announcement.sentTo)?.name}</span>
                      </div>
                      <div className="info-item">
                        <User size={14} />
                        <span>{announcement.sentBy}</span>
                      </div>
                      <div className="info-item">
                        <Calendar size={14} />
                        <span>
                          {announcement.sentDate ? formatDate(announcement.sentDate) : 'Not sent'}
                        </span>
                      </div>
                    </div>

                    <div className="announcement-stats">
                      {announcement.status === 'sent' && (
                        <>
                          <div className="stat">
                            <Eye size={12} />
                            <span>{announcement.opened}</span>
                          </div>
                          <div className="stat">
                            <MessageCircle size={12} />
                            <span>{announcement.replies}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="templates-grid">
            {communications.templates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <h4 className="template-name">{template.name}</h4>
                  <div className="template-type">
                    {template.type === 'email' ? <Mail size={14} /> : <Phone size={14} />}
                    <span>{template.type.toUpperCase()}</span>
                  </div>
                </div>

                <div className="template-content">
                  <p className="template-subject">{template.subject}</p>
                  <p className="template-preview">{template.content.substring(0, 100)}...</p>
                </div>

                <div className="template-footer">
                  <div className="template-stats">
                    <span>Used {template.used} times</span>
                    <span>Last used: {formatDate(template.lastUsed)}</span>
                  </div>
                  <div className="template-actions">
                    <button className="action-btn" title="Use Template">
                      <Send size={16} />
                    </button>
                    <button className="action-btn" title="Edit Template">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn" title="Duplicate Template">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Conversations Tab */}
        {activeTab === 'conversations' && (
          <div className="conversations-list">
            {communications.conversations.map(conversation => (
              <div key={conversation.id} className="conversation-card">
                <div className="conversation-header">
                  <div className="tenant-avatar">
                    {conversation.tenant.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="conversation-info">
                    <h4 className="tenant-name">{conversation.tenant}</h4>
                    <div className="property-info">
                      <Building size={12} />
                      <span>{conversation.property}</span>
                      <span>•</span>
                      <Home size={12} />
                      <span>{conversation.unit}</span>
                    </div>
                  </div>
                  <div className="conversation-meta">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getConversationStatusColor(conversation.status) }}
                    >
                      {conversation.status}
                    </span>
                    {conversation.unread > 0 && (
                      <span className="unread-badge">{conversation.unread}</span>
                    )}
                  </div>
                </div>

                <p className="last-message">{conversation.lastMessage}</p>

                <div className="conversation-footer">
                  <div className="conversation-details">
                    <span className="last-activity">
                      {formatDate(conversation.lastActivity)}
                    </span>
                    <span className="message-count">
                      {conversation.messages} messages
                    </span>
                    <span className="assigned-to">
                      Assigned to: {conversation.assignedTo}
                    </span>
                  </div>
                  <button className="reply-btn">
                    <MessageCircle size={16} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {communications[activeTab]?.length === 0 && (
          <div className="empty-state">
            <MessageCircle size={48} />
            <h3>No {activeTab} found</h3>
            <p>Try adjusting your search criteria or create new content</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showNewMessageModal && (
        <NewMessageModal
          onClose={() => setShowNewMessageModal(false)}
          onSend={(data) => console.log('Send message:', data)}
        />
      )}

      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

// Add missing icon components
const Megaphone = ({ size }) => <div>📢</div>;
const Bell = ({ size }) => <div>🔔</div>;

export default CommunicationHub;