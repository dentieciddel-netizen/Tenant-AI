import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  Users, 
  DollarSign, 
  Wrench, 
  TrendingUp, 
  AlertCircle,
  MessageCircle,
  FileText
} from 'lucide-react';

export const QuickStats = () => {
  const quickStats = [
    { 
      icon: Building, 
      label: 'Total Properties', 
      value: '24', 
      change: '+3', 
      trend: 'up',
      color: '#3b82f6',
      link: '/properties'
    },
    { 
      icon: Users, 
      label: 'Active Tenants', 
      value: '187', 
      change: '+12', 
      trend: 'up',
      color: '#10b981',
      link: '/tenants'
    },
    { 
      icon: DollarSign, 
      label: 'Monthly Revenue', 
      value: 'R 2.45M', 
      change: '+12.5%', 
      trend: 'up',
      color: '#8b5cf6',
      link: '/financial'
    },
    { 
      icon: Wrench, 
      label: 'Active Issues', 
      value: '12', 
      change: '3 urgent', 
      trend: 'warning',
      color: '#f59e0b',
      link: '/maintenance'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat, index) => (
        <Link key={index} href={stat.link} className="block">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              
              {stat.change && (
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 
                  stat.trend === 'warning' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {stat.trend === 'up' && <TrendingUp size={12} className="mr-1" />}
                  {stat.trend === 'warning' && <AlertCircle size={12} className="mr-1" />}
                  {stat.change}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
