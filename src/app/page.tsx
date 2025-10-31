'use client';

import React, { useState } from 'react';

export default function Home() {
  const [chatMessage, setChatMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 TenantAI Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Enterprise Property Management
          </p>
        </div>
        
        {/* Simple working version for now */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-gray-600">Dashboard is loading properly now...</p>
        </div>
      </div>
    </div>
  );
}
