import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const KPICard = ({ 
  title, 
  value, 
  change, 
  trend = 'up', 
  icon,
  onClick 
}) => {
  const { colors } = useTheme();

  const trendColors = {
    up: { text: colors.success, bg: '#dcfce7' },
    down: { text: colors.error, bg: '#fee2e2' },
    neutral: { text: colors.textSecondary, bg: colors.surfaceSecondary }
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };

  return (
    <div 
      style={{
        background: colors.surface,
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          color: colors.textSecondary, 
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {title}
        </div>
        <div style={{ fontSize: '1.5rem' }}>{icon}</div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end'
      }}>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: colors.text
        }}>
          {value}
        </div>
        
        {change && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '500',
            background: trendColors[trend].bg,
            color: trendColors[trend].text
          }}>
            <span style={{ marginRight: '0.25rem' }}>{trendIcons[trend]}</span>
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
