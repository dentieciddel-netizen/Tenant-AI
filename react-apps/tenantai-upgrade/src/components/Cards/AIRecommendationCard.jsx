import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const AIRecommendationCard = ({ 
  title, 
  description, 
  priority = 'medium',
  actions = [],
  onDismiss 
}) => {
  const { colors } = useTheme();
  const [isDismissed, setIsDismissed] = useState(false);

  const priorityColors = {
    high: { border: colors.error, bg: '#fef2f2' },
    medium: { border: colors.warning, bg: '#fff7ed' },
    low: { border: colors.primary, bg: '#eff6ff' }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed) return null;

  return (
    <div style={{
      background: colors.surface,
      borderLeft: `4px solid ${priorityColors[priority].border}`,
      borderRadius: '0 0.5rem 0.5rem 0',
      padding: '1rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '0.75rem'
      }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            fontWeight: '600', 
            color: colors.text, 
            margin: '0 0 0.25rem 0',
            fontSize: '0.875rem'
          }}>
            {title}
          </h4>
          <p style={{ 
            color: colors.textSecondary, 
            margin: 0,
            fontSize: '0.75rem',
            lineHeight: '1.4'
          }}>
            {description}
          </p>
        </div>
        
        <button
          onClick={handleDismiss}
          style={{
            color: colors.textSecondary,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            marginLeft: '0.5rem'
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            style={{
              background: colors.primary,
              color: 'white',
              border: 'none',
              padding: '0.375rem 0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {action.label}
          </button>
        ))}
        
        <button
          onClick={() => console.log('Snoozed recommendation')}
          style={{
            background: 'transparent',
            color: colors.textSecondary,
            border: `1px solid ${colors.border}`,
            padding: '0.375rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          Snooze
        </button>
      </div>
    </div>
  );
};

export default AIRecommendationCard;
