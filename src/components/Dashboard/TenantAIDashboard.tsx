'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const TenantAIDashboard = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [aiRecommendations] = useState([
    {
      id: 1,
      title: 'Rent Increase Opportunity',
      description: 'Consider 5% rent increase for Sunset Apartments based on market analysis',
      status: 'Active',
      actions: ['Run Analysis', 'Set Reminder', 'Snooze']
    },
    {
      id: 2,
      title: 'Lease Renewal Strategy',
      description: 'Renew leases for top-performing tenants in Garden Complex',
      status: 'Active', 
      actions: ['Send Offers', 'Snooze']
    },
    {
      id: 3,
      title: 'Preventive Maintenance',
      description: 'Schedule HVAC maintenance for Skyline Towers before summer season',
      status: 'Active',
      actions: ['Create Order', 'Snooze']
    }
  ]);

  const [quickStats] = useState([
    { icon: '💰', label: 'Monthly Revenue', value: 'R 187,500', change: '+12.5%', trend: 'up' },
    { icon: '🏠', label: 'Occupancy Rate', value: '85.2%', change: '+3.2%', trend: 'up' },
    { icon: '📊', label: 'Collection Rate', value: '98.2%', change: '+1.8%', trend: 'up' },
    { icon: '📈', label: 'Avg. Rent', value: 'R 15,300', change: '+5.2%', trend: 'up' }
  ]);

  const [aiQuickActions] = useState([
    { icon: '📊', label: 'Business Report' },
    { icon: '💰', label: 'Financial Analysis' }, 
    { icon: '📈', label: 'Performance Review' }
  ]);

  const [aiInsights] = useState([
    'High Satisfaction: Garden Complex (4.8/5 rating)',
    'Improved Performance: Rent collection rate +15% this month'
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Handle AI chat message
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 TenantAI Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Enterprise Property Management
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{stat.icon}</div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="mr-1">↗</span>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - AI Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  3 Active
                </div>
              </div>
              
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                    <div className="flex gap-2">
                      {rec.actions.map((action, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI Quick Actions</h2>
              <div className="grid grid-cols-3 gap-4">
                {aiQuickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="text-2xl mb-2 group-hover:text-blue-600">{action.icon}</div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Insights & Chat */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI Insights</h2>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant AI Assistant */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Tenant AI Assistant</h2>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600">
                  Welcome to Tenant AI. Ask me anything about your rental, maintenance, or tenant rights!
                </p>
              </div>

              <form onSubmit={handleSendMessage}>
                <div className="relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantAIDashboard;
