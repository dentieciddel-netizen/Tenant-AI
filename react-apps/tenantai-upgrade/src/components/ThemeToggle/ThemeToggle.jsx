import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        background: colors.surface,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: '2rem',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 100
      }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span style={{ fontSize: '1.1rem' }}>
        {isDark ? '☀️' : '🌙'}
      </span>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
