import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Send,
  User,
  Building,
  Home,
  BarChart3,
  TrendingUp,
  TrendingDown,
  FileText,
  Banknote,
  Receipt
} from 'lucide-react';
import './PaymentTracker.css';

const PaymentTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);

  // Sample payment data
  const payments = [
    {
      id: 1,
      tenant: 'Sarah Johnson',
      property: 'Sunset Apartments',
      unit: 'Unit 4B',
      amount: 15000,
      dueDate: '2024-02-01',
      paidDate: '2024-01-28',
      status: 'paid',
      method: 'bank-transfer',
      reference: 'INV-00124',
      period: 'February 2024',
      lateFee: 0,
      balance: 0,
      history: [
        {
          date: '2024-01-28T10:30:00',
          action: 'payment_received',
          amount: 15000,
          description: 'Bank transfer received',
          processedBy: 'Auto System'
        }
      ]
    },
    {
      id: 2,
      tenant: 'David Wilson',
      property: 'Garden Complex',
      unit: 'Unit 12',
      amount: 16000,
      dueDate: '2024-02-01',
      paidDate: '2024-01-30',
      status: 'paid',
      method: 'credit-card',
      reference: 'INV-00125',
      period: 'February 2024',
      lateFee: 0,
      balance: 0,
      history: [
        {
          date: '2024-01-30T14:15:00',
          action: 'payment_received',
          amount: 16000,
          description: 'Credit card payment',
          processedBy: 'Auto System'
        }
      ]
    },
    {
      id: 3,
      tenant: 'Emma Roberts',
      property: 'Skyline Towers',
      unit: 'Penthouse A',
      amount: 24000,
      dueDate: '2024-02-01',
      paidDate: null,
      status: 'overdue',
      method: null,
      reference: 'INV-00126',
      period: 'February 2024',
      lateFee: 1200,
      balance: 25200,
      history: [
        {
          date: '2024-01-25T09:00:00',
          action: 'invoice_sent',
          amount: 24000,
          description: 'Rent invoice sent',
          processedBy: 'System'
        },
        {
          date: '2024-02-05T11:00:00',
          action: 'reminder_sent',
          amount: 0,
          description: 'Payment reminder sent',
          processedBy: 'Auto System'
        }
      ]
    },
    {
      id: 4,
      tenant: 'Robert Chen',
      property: 'Mountain View Estates',
      unit: 'Villa 3',
      amount: 21000,
      dueDate: '2024-02-01',
      paidDate: null,
      status: 'due',
      method: null,
      reference: 'INV-00127',
      period: 'February 2024',
      lateFee: 0,
      balance: 21000,
      history: [
        {
          date: '2024-01-25T09:00:00',
          action: 'invoice_sent',
          amount: 21000,
          description: 'Rent invoice sent',
          processedBy: 'System'
        }
      ]
    },
    {
      id: 5,
      tenant: 'Lisa Thompson',
      property: 'Riverside Villas',
      unit: 'Unit 2',
      amount: 20000,
      dueDate: '2024-02-01',
      paidDate: '2024-01-29',
      status: 'paid',
      method: 'debit-order',
      reference: 'INV-00128',
      period: 'February 2024',
      lateFee: 0,
      balance: 0,
      history: [
        {
          date: '2024-01-29T08:00:00',
          action: 'payment_received',
          amount: 20000,
          description: 'Auto debit processed',
          processedBy: 'Auto System'
        }
      ]
    },
    {
      id: 6,
      tenant: 'Mike Peterson',
      property: 'City Center Lofts',
      unit: 'Unit 15',
      amount: 20000,
      dueDate: '2024-01-01',
      paidDate: '2024-01-15',
      status: 'paid-late',
      method: 'bank-transfer',
      reference: 'INV-00123',
      period: 'January 2024',
      lateFee: 1000,
      balance: 0,
      history: [
        {
          date: '2024-01-15T16:45:00',
          action: 'payment_received',
          amount: 21000,
          description: 'Bank transfer with late fee',
          processedBy: 'Property Manager'
        }
      ]
    }
  ];

  const paymentMethods = [
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Banknote },
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard },
    { id: 'debit-order', name: 'Debit Order', icon: CreditCard },
    { id: 'cash', name: 'Cash', icon: DollarSign },
    { id: 'check', name: 'Check', icon: FileText }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not paid';
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: '#10b981',
      due: '#f59e0b',
      overdue: '#ef4444',
      'paid-late': '#8b5cf6',
      partial: '#3b82f6'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    const icons = {
      paid: CheckCircle,
      due: Clock,
      overdue: AlertCircle,
      'paid-late': CheckCircle,
      partial: AlertCircle
    };
    return icons[status] || Clock;
  };

  const getMethodColor = (method) => {
    const colors = {
      'bank-transfer': '#3b82f6',
      'credit-card': '#8b5cf6',
      'debit-order': '#06b6d4',
      'cash': '#10b981',
      'check': '#f59e0b'
    };
    return colors[method] || '#6b7280';
  };

  // Calculate financial metrics
  const financialMetrics = {
    totalRevenue: payments.filter(p => p.status === 'paid' || p.status === 'paid-late')
      .reduce((sum, payment) => sum + payment.amount + payment.lateFee, 0),
    pendingPayments: payments.filter(p => p.status === 'due' || p.status === 'overdue')
      .reduce((sum, payment) => sum + payment.balance, 0),
    collectionRate: Math.round(
      (payments.filter(p => p.status === 'paid' || p.status === 'paid-late').length / 
       payments.filter(p => p.status !== 'cancelled').length) * 100
    ),
    averagePaymentTime: 2.3, // days
    latePayments: payments.filter(p => p.status === 'overdue' || p.status === 'paid-late').length,
    onTimePayments: payments.filter(p => p.status === 'paid').length
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const RecordPaymentModal = ({ onClose, onRecord }) => {
    const [paymentData, setPaymentData] = useState({
      tenant: '',
      amount: '',
      method: 'bank-transfer',
      paidDate: new Date().toISOString().split('T')[0],
      reference: '',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send to backend
      console.log('Record payment:', paymentData);
      onRecord(paymentData);
      onClose();
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Record Manual Payment</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Tenant *</label>
                <select
                  value={paymentData.tenant}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, tenant: e.target.value }))}
                  required
                >
                  <option value="">Select Tenant</option>
                  {payments.map(payment => (
                    <option key={payment.id} value={payment.tenant}>
                      {payment.tenant} - {payment.property} {payment.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Amount (ZAR) *</label>
                <input
                  type="number"
                  placeholder="Enter amount..."
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method *</label>
                <select
                  value={paymentData.method}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, method: e.target.value }))}
                  required
                >
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Payment Date *</label>
                <input
                  type="date"
                  value={paymentData.paidDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, paidDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Reference Number</label>
              <input
                type="text"
                placeholder="Payment reference..."
                value={paymentData.reference}
                onChange={(e) => setPaymentData(prev => ({ ...prev, reference: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                placeholder="Additional notes..."
                rows="3"
                value={paymentData.notes}
                onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <div className="payment-summary">
              <h4>Payment Summary</h4>
              <div className="summary-item">
                <span>Amount:</span>
                <span>{formatCurrency(paymentData.amount || 0)}</span>
              </div>
              <div className="summary-item">
                <span>Method:</span>
                <span>
                  {paymentMethods.find(m => m.id === paymentData.method)?.name}
                </span>
              </div>
              <div className="summary-item">
                <span>Date:</span>
                <span>{formatDate(paymentData.paidDate)}</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const PaymentDetailModal = ({ payment, onClose }) => {
    const StatusIcon = getStatusIcon(payment.status);
    const MethodIcon = paymentMethods.find(m => m.id === payment.method)?.icon || DollarSign;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Payment Details</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>

          <div className="payment-details">
            <div className="payment-header">
              <div className="payment-title">
                <h4>Invoice {payment.reference}</h4>
                <div className="payment-meta">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(payment.status) }}
                  >
                    <StatusIcon size={12} />
                    {payment.status}
                  </span>
                  {payment.method && (
                    <span 
                      className="method-badge"
                      style={{ backgroundColor: getMethodColor(payment.method) }}
                    >
                      <MethodIcon size={12} />
                      {paymentMethods.find(m => m.id === payment.method)?.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="payment-amount">
                <span className="amount">{formatCurrency(payment.amount)}</span>
                {payment.lateFee > 0 && (
                  <span className="late-fee">+ {formatCurrency(payment.lateFee)} late fee</span>
                )}
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-section">
                <h5>Tenant Information</h5>
                <div className="detail-item">
                  <User size={16} />
                  <div>
                    <span className="label">Tenant</span>
                    <span className="value">{payment.tenant}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Building size={16} />
                  <div>
                    <span className="label">Property</span>
                    <span className="value">{payment.property}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Home size={16} />
                  <div>
                    <span className="label">Unit</span>
                    <span className="value">{payment.unit}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h5>Payment Information</h5>
                <div className="detail-item">
                  <Calendar size={16} />
                  <div>
                    <span className="label">Due Date</span>
                    <span className="value">{formatDate(payment.dueDate)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Calendar size={16} />
                  <div>
                    <span className="label">Paid Date</span>
                    <span className="value">{formatDate(payment.paidDate)}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FileText size={16} />
                  <div>
                    <span className="label">Period</span>
                    <span className="value">{payment.period}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h5>Financial Summary</h5>
                <div className="financial-summary">
                  <div className="summary-row">
                    <span>Rent Amount:</span>
                    <span>{formatCurrency(payment.amount)}</span>
                  </div>
                  {payment.lateFee > 0 && (
                    <div className="summary-row">
                      <span>Late Fee:</span>
                      <span className="late">{formatCurrency(payment.lateFee)}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(payment.amount + payment.lateFee)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Balance:</span>
                    <span className={payment.balance > 0 ? 'negative' : 'positive'}>
                      {formatCurrency(payment.balance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-history">
              <h5>Payment History</h5>
              <div className="history-timeline">
                {payment.history.map((event, index) => (
                  <div key={index} className="history-item">
                    <div className="history-marker"></div>
                    <div className="history-content">
                      <p className="event-description">{event.description}</p>
                      {event.amount > 0 && (
                        <span className="event-amount">{formatCurrency(event.amount)}</span>
                      )}
                      <div className="event-meta">
                        <span className="event-date">{formatDate(event.date)}</span>
                        <span className="event-author">by {event.processedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="payment-actions">
              <button className="btn btn-secondary">
                <Send size={16} />
                Send Reminder
              </button>
              <button className="btn btn-secondary">
                <Receipt size={16} />
                Generate Receipt
              </button>
              <button className="btn btn-primary">
                <Edit size={16} />
                Edit Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="payment-tracker">
      {/* Header */}
      <div className="tracker-header">
        <div className="header-content">
          <h2>Payment Tracker</h2>
          <p>Manage rent collections and payment processing</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <Download size={16} />
            Export Report
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowRecordPaymentModal(true)}
          >
            <Plus size={16} />
            Record Payment
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="financial-overview">
        <div className="overview-card revenue">
          <div className="card-icon">
            <DollarSign size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{formatCurrency(financialMetrics.totalRevenue)}</span>
            <span className="card-label">Total Revenue</span>
            <div className="card-trend positive">
              <TrendingUp size={16} />
              <span>12.5% vs last month</span>
            </div>
          </div>
        </div>

        <div className="overview-card pending">
          <div className="card-icon">
            <Clock size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{formatCurrency(financialMetrics.pendingPayments)}</span>
            <span className="card-label">Pending Payments</span>
            <div className="card-trend negative">
              <TrendingDown size={16} />
              <span>8.2% overdue</span>
            </div>
          </div>
        </div>

        <div className="overview-card rate">
          <div className="card-icon">
            <BarChart3 size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{financialMetrics.collectionRate}%</span>
            <span className="card-label">Collection Rate</span>
            <div className="card-trend positive">
              <TrendingUp size={16} />
              <span>+3.1% improvement</span>
            </div>
          </div>
        </div>

        <div className="overview-card time">
          <div className="card-icon">
            <Calendar size={24} />
          </div>
          <div className="card-content">
            <span className="card-value">{financialMetrics.averagePaymentTime}d</span>
            <span className="card-label">Avg. Payment Time</span>
            <div className="card-trend positive">
              <TrendingDown size={16} />
              <span>-0.5 days faster</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tracker-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={16} />
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          <DollarSign size={16} />
          All Payments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'overdue' ? 'active' : ''}`}
          onClick={() => setActiveTab('overdue')}
        >
          <AlertCircle size={16} />
          Overdue
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <FileText size={16} />
          Reports
        </button>
      </div>

      {/* Content */}
      <div className="tracker-content">
        {/* Controls */}
        <div className="content-controls">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search payments..."
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
              <option value="paid">Paid</option>
              <option value="due">Due</option>
              <option value="overdue">Overdue</option>
              <option value="paid-late">Paid Late</option>
            </select>
            <button className="btn btn-secondary">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Payments Table */}
        {activeTab === 'payments' && (
          <div className="payments-table">
            <div className="table-header">
              <div className="col tenant">Tenant & Property</div>
              <div className="col period">Period</div>
              <div className="col amount">Amount</div>
              <div className="col due-date">Due Date</div>
              <div className="col paid-date">Paid Date</div>
              <div className="col status">Status</div>
              <div className="col actions">Actions</div>
            </div>

            <div className="table-body">
              {filteredPayments.map(payment => {
                const StatusIcon = getStatusIcon(payment.status);
                const MethodIcon = payment.method ? 
                  paymentMethods.find(m => m.id === payment.method)?.icon : null;

                return (
                  <div 
                    key={payment.id} 
                    className="table-row"
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <div className="col tenant">
                      <div className="tenant-info">
                        <User size={14} />
                        <div>
                          <div className="tenant-name">{payment.tenant}</div>
                          <div className="property-info">
                            <Building size={12} />
                            <span>{payment.property} • {payment.unit}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col period">
                      {payment.period}
                    </div>
                    <div className="col amount">
                      <div className="amount-info">
                        <span className="primary-amount">{formatCurrency(payment.amount)}</span>
                        {payment.lateFee > 0 && (
                          <span className="late-fee">+{formatCurrency(payment.lateFee)}</span>
                        )}
                      </div>
                    </div>
                    <div className="col due-date">
                      {formatDate(payment.dueDate)}
                    </div>
                    <div className="col paid-date">
                      {formatDate(payment.paidDate)}
                    </div>
                    <div className="col status">
                      <div className="status-info">
                        <StatusIcon size={14} />
                        <span style={{ color: getStatusColor(payment.status) }}>
                          {payment.status}
                        </span>
                        {MethodIcon && (
                          <MethodIcon 
                            size={12} 
                            style={{ color: getMethodColor(payment.method) }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col actions">
                      <button className="action-btn" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Send Reminder">
                        <Send size={16} />
                      </button>
                      <button className="action-btn" title="More">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="chart-card">
                <h4>Payment Status Distribution</h4>
                <div className="status-chart">
                  <div className="chart-item paid">
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                    <span>Paid</span>
                    <span>{financialMetrics.onTimePayments}</span>
                  </div>
                  <div className="chart-item due">
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <span>Due</span>
                    <span>{payments.filter(p => p.status === 'due').length}</span>
                  </div>
                  <div className="chart-item overdue">
                    <div className="chart-bar" style={{ height: '20%' }}></div>
                    <span>Overdue</span>
                    <span>{financialMetrics.latePayments}</span>
                  </div>
                  <div className="chart-item paid-late">
                    <div className="chart-bar" style={{ height: '10%' }}></div>
                    <span>Paid Late</span>
                    <span>{payments.filter(p => p.status === 'paid-late').length}</span>
                  </div>
                </div>
              </div>

              <div className="stats-card">
                <h4>Quick Actions</h4>
                <div className="quick-actions">
                  <button className="action-card">
                    <Send size={20} />
                    <span>Send Reminders</span>
                    <small>To overdue payments</small>
                  </button>
                  <button className="action-card">
                    <FileText size={20} />
                    <span>Generate Reports</span>
                    <small>Monthly financials</small>
                  </button>
                  <button className="action-card">
                    <Download size={20} />
                    <span>Export Data</span>
                    <small>CSV & PDF formats</small>
                  </button>
                  <button className="action-card">
                    <BarChart3 size={20} />
                    <span>View Analytics</span>
                    <small>Performance metrics</small>
                  </button>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h4>Recent Payment Activity</h4>
              <div className="activity-list">
                {payments
                  .filter(p => p.paidDate)
                  .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate))
                  .slice(0, 5)
                  .map(payment => (
                    <div key={payment.id} className="activity-item">
                      <div className="activity-info">
                        <div className="activity-main">
                          <span className="tenant">{payment.tenant}</span>
                          <span className="amount">{formatCurrency(payment.amount)}</span>
                        </div>
                        <div className="activity-meta">
                          <span className="property">{payment.property}</span>
                          <span className="date">{formatDate(payment.paidDate)}</span>
                        </div>
                      </div>
                      <div 
                        className="activity-status"
                        style={{ backgroundColor: getStatusColor(payment.status) }}
                      >
                        {payment.status}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPayments.length === 0 && activeTab === 'payments' && (
          <div className="empty-state">
            <DollarSign size={48} />
            <h3>No payments found</h3>
            <p>Try adjusting your search criteria or record new payments</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showRecordPaymentModal && (
        <RecordPaymentModal
          onClose={() => setShowRecordPaymentModal(false)}
          onRecord={(data) => console.log('Record payment:', data)}
        />
      )}

      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default PaymentTracker;