import React, { useState, useEffect } from 'react';
import { useTheme } from './contexts/ThemeContext';
import './index.css';
import AIChatInterface from './components/AI/AIChatInterface';
import AIRecommendationCard from './components/Cards/AIRecommendationCard';
import KPICard from './components/Cards/KPICard';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  const { colors } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [aiRecommendations, setAiRecommendations] = useState(() => {
    const saved = localStorage.getItem('tenantai-recommendations');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Rent Increase Opportunity',
        description: 'Consider 5% rent increase for Sunset Apartments based on market analysis',
        priority: 'medium',
        actions: [
          { label: 'Run Analysis', onClick: () => alert('Running market analysis...') },
          { label: 'Set Reminder', onClick: () => alert('Setting reminder...') }
        ]
      },
      {
        id: 2,
        title: 'Lease Renewal Strategy',
        description: 'Renew leases for top-performing tenants in Garden Complex',
        priority: 'high',
        actions: [
          { label: 'Send Offers', onClick: () => alert('Sending renewal offers...') }
        ]
      },
      {
        id: 3,
        title: 'Preventive Maintenance',
        description: 'Schedule HVAC maintenance for Skyline Towers before summer season',
        priority: 'medium',
        actions: [
          { label: 'Create Order', onClick: () => alert('Creating maintenance work order...') }
        ]
      }
    ];
  });

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save recommendations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tenantai-recommendations', JSON.stringify(aiRecommendations));
  }, [aiRecommendations]);

  const handleDismissRecommendation = (id) => {
    setAiRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  const appStyle = {
    padding: isMobile ? '1rem' : '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: colors.background,
    color: colors.text,
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  const cardStyle = {
    background: colors.surface,
    borderRadius: '0.75rem',
    padding: isMobile ? '1rem' : '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${colors.border}`
  };

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
    gap: isMobile ? '1rem' : '2rem',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const kpiGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
    gap: isMobile ? '1rem' : '1.5rem',
    marginBottom: isMobile ? '1.5rem' : '2rem'
  };

  return (
    <div style={appStyle}>
      <ThemeToggle />
      
      <h1 style={{ 
        color: colors.primary, 
        textAlign: 'center', 
        marginBottom: '0.5rem',
        fontSize: isMobile ? '1.5rem' : '2rem'
      }}>
        🚀 TenantAI Dashboard
      </h1>
      <p style={{ 
        color: colors.textSecondary, 
        textAlign: 'center', 
        marginBottom: isMobile ? '1.5rem' : '2rem',
        fontSize: isMobile ? '0.875rem' : '1rem'
      }}>
        Enterprise Property Management
      </p>
      
      {/* Mobile Indicator (for testing) */}
      {isMobile && (
        <div style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: colors.textSecondary,
          marginBottom: '1rem',
          fontStyle: 'italic'
        }}>
          📱 Mobile View
        </div>
      )}
      
      {/* Main Content Grid */}
      <div style={mainGridStyle}>
        
        {/* Left Column - Main Content */}
        <div>
          {/* KPI Cards */}
          <div style={kpiGridStyle}>
            <KPICard
              title="Monthly Revenue"
              value="R 187,500"
              change="+12.5%"
              trend="up"
              icon="💰"
            />
            <KPICard
              title="Occupancy Rate"
              value="85.2%"
              change="+3.2%"
              trend="up"
              icon="🏠"
            />
            <KPICard
              title="Collection Rate"
              value="98.2%"
              change="+1.8%"
              trend="up"
              icon="📊"
            />
            <KPICard
              title="Avg. Rent"
              value="R 15,300"
              change="+5.2%"
              trend="up"
              icon="📈"
            />
          </div>

          {/* AI Recommendations Section */}
          <div style={cardStyle}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center',
              marginBottom: '1rem',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '0.5rem' : '0'
            }}>
              <h2 style={{ 
                fontSize: isMobile ? '1rem' : '1.125rem',
                fontWeight: '600',
                color: colors.text,
                margin: 0
              }}>
                AI Recommendations
              </h2>
              <span style={{
                background: colors.primary,
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '500',
                alignSelf: isMobile ? 'flex-start' : 'center'
              }}>
                {aiRecommendations.length} Active
              </span>
            </div>
            
            <div>
              {aiRecommendations.map(rec => (
                <AIRecommendationCard
                  key={rec.id}
                  {...rec}
                  onDismiss={() => handleDismissRecommendation(rec.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar (hidden on mobile) */}
        {!isMobile && (
          <div>
            {/* AI Quick Actions */}
            <div style={{
              ...cardStyle,
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ 
                fontWeight: '600',
                color: colors.text,
                margin: '0 0 1rem 0',
                fontSize: '1rem'
              }}>
                AI Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem',
                  background: colors.surfaceSecondary,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}>
                  📊 Business Report
                </button>
                <button style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem',
                  background: colors.surfaceSecondary,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}>
                  💰 Financial Analysis
                </button>
                <button style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem',
                  background: colors.surfaceSecondary,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}>
                  📈 Performance Review
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div style={cardStyle}>
              <h3 style={{ 
                fontWeight: '600',
                color: colors.text,
                margin: '0 0 1rem 0',
                fontSize: '1rem'
              }}>
                AI Insights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{
                  padding: '0.75rem',
                  background: colors.surfaceSecondary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  <span style={{ fontWeight: '500', color: colors.success }}>High Satisfaction:</span> Garden Complex (4.8/5 rating)
                </div>
                <div style={{
                  padding: '0.75rem',
                  background: colors.surfaceSecondary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}>
                  <span style={{ fontWeight: '500', color: colors.primary }}>Improved Performance:</span> Rent collection rate +15% this month
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Replacement */}
      {isMobile && (
        <div style={{ marginTop: '1rem' }}>
          <details style={cardStyle}>
            <summary style={{
              fontWeight: '600',
              color: colors.text,
              cursor: 'pointer',
              fontSize: '1rem',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>📱 Quick Actions & Insights</span>
              <span style={{ fontSize: '0.875rem', color: colors.textSecondary }}>▼</span>
            </summary>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: colors.text }}>Quick Actions</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button style={{
                    padding: '0.5rem 0.75rem',
                    background: colors.surfaceSecondary,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}>
                    📊 Report
                  </button>
                  <button style={{
                    padding: '0.5rem 0.75rem',
                    background: colors.surfaceSecondary,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}>
                    💰 Finance
                  </button>
                  <button style={{
                    padding: '0.5rem 0.75rem',
                    background: colors.surfaceSecondary,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}>
                    📈 Performance
                  </button>
                </div>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: colors.text }}>Insights</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: colors.textSecondary }}>
                    ✅ High tenant satisfaction
                  </div>
                  <div style={{ fontSize: '0.75rem', color: colors.textSecondary }}>
                    📈 Collection rate improved
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* AI Chat Interface */}
      <AIChatInterface />
    </div>
  );
}

export default App;