import React from 'react';
import { Building, Home, TrendingUp, AlertCircle } from 'lucide-react';
import './PropertyOverview.css';

const PropertyOverview = () => {
  // Currency formatting configuration
  const currencyConfigs = {
    // African Countries
    ZAR: { code: 'ZAR', symbol: 'R', locale: 'en-ZA' }, // South Africa
    NGN: { code: 'NGN', symbol: '₦', locale: 'en-NG' }, // Nigeria
    EGP: { code: 'EGP', symbol: 'E£', locale: 'ar-EG' }, // Egypt
    KES: { code: 'KES', symbol: 'KSh', locale: 'en-KE' }, // Kenya
    GHS: { code: 'GHS', symbol: 'GH₵', locale: 'en-GH' }, // Ghana
    BWP: { code: 'BWP', symbol: 'P', locale: 'en-BW' }, // Botswana
    
    // Europe
    EUR: { code: 'EUR', symbol: '€', locale: 'de-DE' }, // Germany (represents EU format)
    GBP: { code: 'GBP', symbol: '£', locale: 'en-GB' }, // United Kingdom
    CHF: { code: 'CHF', symbol: 'CHF', locale: 'de-CH' }, // Switzerland
    CZK: { code: 'CZK', symbol: 'Kč', locale: 'cs-CZ' }, // Czech Republic
    
    // Americas
    USD: { code: 'USD', symbol: '$', locale: 'en-US' }, // United States
    CAD: { code: 'CAD', symbol: '$', locale: 'en-CA' }, // Canada (English)
    BRL: { code: 'BRL', symbol: 'R$', locale: 'pt-BR' }, // Brazil
    ARS: { code: 'ARS', symbol: '$', locale: 'es-AR' }, // Argentina
    
    // Other Regions
    CNY: { code: 'CNY', symbol: '¥', locale: 'zh-CN' }, // China
    AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU' }, // Australia
    RUB: { code: 'RUB', symbol: '₽', locale: 'ru-RU' }, // Russia
  };

  // Format currency based on selected country
  const formatCurrency = (amount, currencyCode = 'ZAR') => {
    const config = currencyConfigs[currencyCode];
    if (!config) return `R ${amount.toLocaleString()}`; // Fallback to ZAR
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      // Fallback formatting
      return `${config.symbol} ${amount.toLocaleString()}`;
    }
  };

  // Portfolio data with currency selection
  const [selectedCurrency, setSelectedCurrency] = React.useState('ZAR');
  const portfolioData = {
    totalProperties: 24,
    totalUnits: 187,
    portfolioValue: 45200000,
    activeIssues: 12,
    urgentIssues: 3,
    occupancyRate: 92,
    quarterlyGrowth: 3,
    valueGrowth: 8.7
  };

  return (
    <div className="property-overview">
      <div className="overview-header">
        <h2>Property Portfolio Overview</h2>
        <p>Real-time insights across your entire property portfolio</p>
        
        {/* Currency Selector */}
        <div className="currency-selector">
          <label htmlFor="currency-select">Display Currency: </label>
          <select 
            id="currency-select"
            value={selectedCurrency} 
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="currency-dropdown"
          >
            <option value="ZAR">South Africa (ZAR)</option>
            <option value="NGN">Nigeria (NGN)</option>
            <option value="BWP">Botswana (BWP)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="CNY">Chinese Yuan (CNY)</option>
            <option value="AUD">Australian Dollar (AUD)</option>
            <option value="RUB">Russian Ruble (RUB)</option>
          </select>
        </div>
      </div>

      <div className="portfolio-metrics">
        <div className="metric-card">
          <div className="metric-icon">
            <Building size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Properties</h3>
            <span className="value">{portfolioData.totalProperties}</span>
            <span className="change positive">+{portfolioData.quarterlyGrowth} this quarter</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Home size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Units</h3>
            <span className="value">{portfolioData.totalUnits}</span>
            <span className="change positive">{portfolioData.occupancyRate}% occupied</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <h3>Portfolio Value</h3>
            <span className="value">
              {formatCurrency(portfolioData.portfolioValue, selectedCurrency)}
            </span>
            <span className="change positive">+{portfolioData.valueGrowth}% YoY</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <AlertCircle size={24} />
          </div>
          <div className="metric-content">
            <h3>Active Issues</h3>
            <span className="value">{portfolioData.activeIssues}</span>
            <span className="change urgent">{portfolioData.urgentIssues} urgent</span>
          </div>
        </div>
      </div>

      {/* Currency Display Demo */}
      <div className="currency-demo">
        <h4>Multi-Currency Display</h4>
        <div className="currency-grid">
          {['ZAR', 'USD', 'EUR', 'GBP', 'NGN', 'BWP', 'CNY'].map(currency => (
            <div key={currency} className="currency-item">
              <span className="currency-code">{currency}:</span>
              <span className="currency-amount">
                {formatCurrency(portfolioData.portfolioValue, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;