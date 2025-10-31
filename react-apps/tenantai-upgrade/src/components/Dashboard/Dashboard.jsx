import React, { useState } from 'react';
import KPICard from '../Cards/KPICard';
import AIRecommendationCard from '../Cards/AIRecommendationCard';
import AIChatInterface from '../AI/AIChatInterface';

const Dashboard = () => {
  const [kpiData] = useState({
    monthlyRevenue: { value: 'R 187,500', change: '+12.5%', trend: 'up' },
    occupancyRate: { value: '85.2%', change: '+3.2%', trend: 'up' },
    collectionRate: { value: '98.2%', change: '+1.8%', trend: 'up' },
    avgRent: { value: 'R 15,300', change: '+5.2%', trend: 'up' }
  });

  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 1,
      title: 'Rent Increase Opportunity',
      description: 'Consider 5% rent increase for Sunset Apartments based on market analysis',
      priority: 'medium',
      actions: [
        { label: 'Run Market Analysis', onClick: () => console.log('Running analysis...') },
        { label: 'Set Reminder', onClick: () => console.log('Setting reminder...') }
      ]
    },
    {
      id: 2,
      title: 'Lease Renewal Strategy',
      description: 'Renew leases for top-performing tenants in Garden Complex',
      priority: 'high',
      actions: [
        { label: 'Send Renewal Offers', onClick: () => console.log('Sending offers...') }
      ]
    }
  ]);

  const handleDismissRecommendation = (id) => {
    setAiRecommendations(prev => prev.filter(rec => rec.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin Executive</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Monthly Revenue"
            value={kpiData.monthlyRevenue.value}
            change={kpiData.monthlyRevenue.change}
            trend={kpiData.monthlyRevenue.trend}
            icon="💰"
          />
          <KPICard
            title="Occupancy Rate"
            value={kpiData.occupancyRate.value}
            change={kpiData.occupancyRate.change}
            trend={kpiData.occupancyRate.trend}
            icon="🏠"
          />
          <KPICard
            title="Collection Rate"
            value={kpiData.collectionRate.value}
            change={kpiData.collectionRate.change}
            trend={kpiData.collectionRate.trend}
            icon="📊"
          />
          <KPICard
            title="Avg. Rent"
            value={kpiData.avgRent.value}
            change={kpiData.avgRent.change}
            trend={kpiData.avgRent.trend}
            icon="📈"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
                <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                  {aiRecommendations.length} Active
                </span>
              </div>
              
              <div className="space-y-4">
                {aiRecommendations.map(rec => (
                  <AIRecommendationCard
                    key={rec.id}
                    {...rec}
                    onDismiss={() => handleDismissRecommendation(rec.id)}
                  />
                ))}
              </div>
            </div>

            {/* Property Portfolio Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Portfolio</h2>
              <div className="text-gray-500 text-center py-8">
                Property cards will be displayed here
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  📊 Business Report
                </button>
                <button className="w-full text-left p-3 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  💰 Financial Analysis
                </button>
                <button className="w-full text-left p-3 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  📈 Performance Review
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="font-medium">High Satisfaction:</span> Garden Complex (4.8/5 rating)
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="font-medium">Improved Performance:</span> Rent collection rate +15% this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Interface - ONLY ONCE */}
      <AIChatInterface />
    </div>
  );
};

export default Dashboard;