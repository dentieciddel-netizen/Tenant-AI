import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Eye,
  MoreVertical
} from 'lucide-react';
import './FinancialDashboard.css';

const FinancialDashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState('ZAR');

  // Currency configuration
  const currencyConfigs = {
    ZAR: { code: 'ZAR', symbol: 'R', locale: 'en-ZA' },
    USD: { code: 'USD', symbol: '$', locale: 'en-US' },
    EUR: { code: 'EUR', symbol: '€', locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£', locale: 'en-GB' }
  };

  const formatCurrency = (amount, currencyCode = selectedCurrency) => {
    const config = currencyConfigs[currencyCode];
    if (!config) return `R ${amount.toLocaleString()}`;
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      return `${config.symbol} ${amount.toLocaleString()}`;
    }
  };

  // Financial data
  const financialData = {
    overview: {
      totalRevenue: 2450000,
      totalExpenses: 1560000,
      netProfit: 890000,
      cashFlow: 734000,
      revenueGrowth: 12.5,
      expenseGrowth: 8.2,
      profitGrowth: 18.3
    },
    revenueByProperty: [
      { name: 'Sunset Apartments', revenue: 360000, growth: 8.2, occupancy: 92 },
      { name: 'Garden Complex', revenue: 288000, growth: 5.7, occupancy: 89 },
      { name: 'Skyline Towers', revenue: 624000, growth: 15.3, occupancy: 81 },
      { name: 'Mountain View', revenue: 735000, growth: 12.1, occupancy: 83 },
      { name: 'Riverside Villas', revenue: 240000, growth: -2.4, occupancy: 67 },
      { name: 'City Center Lofts', revenue: 560000, growth: 9.8, occupancy: 100 }
    ],
    expenseBreakdown: [
      { category: 'Maintenance', amount: 420000, percentage: 27, trend: 'up' },
      { category: 'Utilities', amount: 280000, percentage: 18, trend: 'down' },
      { category: 'Staff Salaries', amount: 450000, percentage: 29, trend: 'stable' },
      { category: 'Property Taxes', amount: 210000, percentage: 13, trend: 'stable' },
      { category: 'Insurance', amount: 120000, percentage: 8, trend: 'up' },
      { category: 'Other', amount: 80000, percentage: 5, trend: 'stable' }
    ],
    monthlyTrends: [
      { month: 'Jul', revenue: 2200000, expenses: 1450000, profit: 750000 },
      { month: 'Aug', revenue: 2280000, expenses: 1480000, profit: 800000 },
      { month: 'Sep', revenue: 2350000, expenses: 1520000, profit: 830000 },
      { month: 'Oct', revenue: 2420000, expenses: 1550000, profit: 870000 },
      { month: 'Nov', revenue: 2380000, expenses: 1570000, profit: 810000 },
      { month: 'Dec', revenue: 2450000, expenses: 1560000, profit: 890000 }
    ]
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#10b981' : '#ef4444';
  };

  return (
    <div className="financial-dashboard">
      {/* Header */}
      <div className="financial-header">
        <div className="header-content">
          <h2>Financial Analytics</h2>
          <p>Comprehensive financial overview and performance metrics</p>
        </div>
        <div className="header-controls">
          <select 
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="currency-select"
          >
            <option value="ZAR">ZAR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="financial-metrics">
        <div className="metric-card revenue">
          <div className="metric-icon">
            <DollarSign size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Revenue</h3>
            <span className="metric-value">
              {formatCurrency(financialData.overview.totalRevenue)}
            </span>
            <div className="metric-trend positive">
              <TrendingUp size={16} />
              <span>+{financialData.overview.revenueGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="metric-card expenses">
          <div className="metric-icon">
            <TrendingDown size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Expenses</h3>
            <span className="metric-value">
              {formatCurrency(financialData.overview.totalExpenses)}
            </span>
            <div className="metric-trend negative">
              <TrendingUp size={16} />
              <span>+{financialData.overview.expenseGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="metric-card profit">
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <h3>Net Profit</h3>
            <span className="metric-value">
              {formatCurrency(financialData.overview.netProfit)}
            </span>
            <div className="metric-trend positive">
              <TrendingUp size={16} />
              <span>+{financialData.overview.profitGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="metric-card cashflow">
          <div className="metric-icon">
            <BarChart3 size={24} />
          </div>
          <div className="metric-content">
            <h3>Cash Flow</h3>
            <span className="metric-value">
              {formatCurrency(financialData.overview.cashFlow)}
            </span>
            <div className="metric-trend positive">
              <TrendingUp size={16} />
              <span>Positive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="financial-details">
        {/* Revenue by Property */}
        <div className="detail-card">
          <div className="detail-header">
            <h3>Revenue by Property</h3>
            <button className="icon-btn">
              <MoreVertical size={16} />
            </button>
          </div>
          <div className="revenue-list">
            {financialData.revenueByProperty.map((property, index) => (
              <div key={index} className="revenue-item">
                <div className="property-info">
                  <span className="property-name">{property.name}</span>
                  <span className="occupancy">{property.occupancy}% occupied</span>
                </div>
                <div className="revenue-stats">
                  <span className="revenue-amount">
                    {formatCurrency(property.revenue)}
                  </span>
                  <div 
                    className={`revenue-growth ${property.growth >= 0 ? 'positive' : 'negative'}`}
                  >
                    {getTrendIcon(property.growth >= 0 ? 'up' : 'down')}
                    <span>{Math.abs(property.growth)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="detail-card">
          <div className="detail-header">
            <h3>Expense Breakdown</h3>
            <button className="icon-btn">
              <MoreVertical size={16} />
            </button>
          </div>
          <div className="expense-chart">
            {financialData.expenseBreakdown.map((expense, index) => (
              <div key={index} className="expense-item">
                <div className="expense-info">
                  <span className="expense-category">{expense.category}</span>
                  <span className="expense-amount">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                <div className="expense-bar">
                  <div 
                    className="expense-fill"
                    style={{ width: `${expense.percentage}%` }}
                  ></div>
                </div>
                <span className="expense-percentage">{expense.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="detail-card trend-card">
          <div className="detail-header">
            <h3>Monthly Trends</h3>
            <button className="icon-btn">
              <MoreVertical size={16} />
            </button>
          </div>
          <div className="trend-chart">
            {financialData.monthlyTrends.map((month, index) => (
              <div key={index} className="trend-item">
                <span className="month-label">{month.month}</span>
                <div className="trend-bars">
                  <div 
                    className="trend-bar revenue-bar"
                    style={{ height: `${(month.revenue / 2500000) * 100}%` }}
                    title={`Revenue: ${formatCurrency(month.revenue)}`}
                  ></div>
                  <div 
                    className="trend-bar expense-bar"
                    style={{ height: `${(month.expenses / 1600000) * 100}%` }}
                    title={`Expenses: ${formatCurrency(month.expenses)}`}
                  ></div>
                  <div 
                    className="trend-bar profit-bar"
                    style={{ height: `${(month.profit / 900000) * 100}%` }}
                    title={`Profit: ${formatCurrency(month.profit)}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="trend-legend">
            <div className="legend-item">
              <div className="legend-color revenue-color"></div>
              <span>Revenue</span>
            </div>
            <div className="legend-item">
              <div className="legend-color expense-color"></div>
              <span>Expenses</span>
            </div>
            <div className="legend-item">
              <div className="legend-color profit-color"></div>
              <span>Profit</span>
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="detail-card insights-card">
          <div className="detail-header">
            <h3>Financial Insights</h3>
            <button className="icon-btn">
              <Eye size={16} />
            </button>
          </div>
          <div className="insights-list">
            <div className="insight-item positive">
              <TrendingUp size={16} />
              <div>
                <strong>Revenue growth exceeding targets</strong>
                <span>12.5% vs projected 10%</span>
              </div>
            </div>
            <div className="insight-item warning">
              <TrendingDown size={16} />
              <div>
                <strong>Maintenance costs rising</strong>
                <span>Consider preventive maintenance schedule</span>
              </div>
            </div>
            <div className="insight-item positive">
              <DollarSign size={16} />
              <div>
                <strong>High occupancy driving profits</strong>
                <span>92% average occupancy rate</span>
              </div>
            </div>
            <div className="insight-item info">
              <BarChart3 size={16} />
              <div>
                <strong>Cash flow optimization opportunity</strong>
                <span>Review payment terms with vendors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;