import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('tenantai-theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('tenantai-theme', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      background: isDark ? '#0f172a' : '#f8fafc',
      surface: isDark ? '#1e293b' : '#ffffff',
      surfaceSecondary: isDark ? '#334155' : '#f1f5f9',
      text: isDark ? '#f1f5f9' : '#0f172a',
      textSecondary: isDark ? '#cbd5e1' : '#64748b',
      primary: '#2563eb',
      border: isDark ? '#334155' : '#e2e8f0',
      success: isDark ? '#10b981' : '#059669',
      warning: isDark ? '#f59e0b' : '#d97706',
      error: isDark ? '#ef4444' : '#dc2626'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};