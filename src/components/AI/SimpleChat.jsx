import React, { useState } from 'react';

const AIChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQueries = [
    "Show me all leases expiring in Q3",
    "Generate a profitability report for Garden Complex",
    "Why did maintenance efficiency drop last month?",
    "Show tenant satisfaction trends across properties",
    "Which properties have the highest ROI?",
    "Create a rent increase analysis report"
  ];

  const handleSubmit = async (query = input) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage = { 
      type: 'user', 
      content: query,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponses = {
        "Show me all leases expiring in Q3": "I found 12 leases expiring in Q3 across your portfolio. The Garden Complex has 4 renewals due, Skyline Towers has 3, and Riverfront Residences has 5. Would you like me to generate renewal offers?",
        "Generate a profitability report for Garden Complex": "Garden Complex profitability analysis:\n• Monthly Revenue: R32,000\n• Occupancy Rate: 98%\n• Operating Costs: R8,500\n• Net Profit: R23,500 (73.4% margin)\n• ROI: 14.2%\nThis property is performing above portfolio average.",
        "Why did maintenance efficiency drop last month?": "Maintenance efficiency decreased by 8% last month due to:\n• HVAC system overhaul at Skyline Towers (3 days)\n• Emergency plumbing repairs at Riverfront (2 properties)\n• Seasonal pool maintenance across all complexes\nEfficiency should return to normal this month.",
        "Show tenant satisfaction trends across properties": "Tenant Satisfaction Trends (Last 6 months):\n• Garden Complex: ⭐4.8/5 (Stable ↑)\n• Skyline Towers: ⭐4.9/5 (Improving ↑)\n• Riverfront Residences: ⭐4.6/5 (Stable →)\n• Sunset Apartments: ⭐4.2/5 (Needs attention ↓)\nOverall portfolio: ⭐4.6/5",
        "Which properties have the highest ROI?": "Top ROI Properties:\n1. Skyline Towers: 18.5% ROI\n2. Garden Complex: 14.2% ROI\n3. Riverfront Residences: 12.8% ROI\n4. Sunset Apartments: 9.3% ROI\nRecommendation: Consider strategic upgrades for Sunset Apartments to improve returns.",
        "Create a rent increase analysis report": "Rent Increase Analysis Ready:\n• Market Rate Comparison: +5-7% below market\n• Tenant Retention Risk: Low (92% retention rate)\n• Recommended Increase: 4-5% across portfolio\n• Expected Revenue Impact: +R45,000/month\n• Implementation Timeline: Next lease renewal cycle"
      };

      const aiMessage = { 
        type: 'ai', 
        content: aiResponses[query] || `I've analyzed your query about "${query}". Based on current data, I recommend reviewing the property performance metrics and market comparables. The data suggests this is a good opportunity for optimization.`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  // Chat bubble component
  const ChatBubble = ({ message }) => (
    <div style={{
      display: 'flex',
      justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
      marginBottom: '1rem'
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '0.75rem 1rem',
        borderRadius: '1rem',
        background: message.type === 'user' ? '#2563eb' : '#f1f5f9',
        color: message.type === 'user' ? 'white' : '#334155',
        border: message.type === 'user' ? 'none' : '1px solid #e2e8f0',
        position: 'relative'
      }}>
        <div style={{ 
          fontSize: '0.875rem',
          lineHeight: '1.4',
          whiteSpace: 'pre-line'
        }}>
          {message.content}
        </div>
        <div style={{
          fontSize: '0.75rem',
          opacity: 0.7,
          marginTop: '0.25rem',
          textAlign: message.type === 'user' ? 'right' : 'left'
        }}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );

  // Floating button style
  const floatingButtonStyle = {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '1rem',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    fontSize: '1.25rem',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Chat modal style
  const chatModalStyle = {
    position: 'fixed',
    bottom: '5rem',
    right: '1.5rem',
    width: '400px',
    height: '600px',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  if (!isOpen) {
    return (
      <button style={floatingButtonStyle} onClick={() => setIsOpen(true)}>
        🤖
      </button>
    );
  }

  return (
    <>
      {/* Floating button that stays visible */}
      <button style={floatingButtonStyle} onClick={() => setIsOpen(false)}>
        ✕
      </button>

      {/* Chat modal */}
      <div style={chatModalStyle}>
        {/* Header */}
        <div style={{
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>TenantAI Assistant</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>Ready to help</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={clearChat}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div style={{ 
          flex: 1, 
          padding: '1rem',
          overflowY: 'auto',
          backgroundColor: '#f8fafc'
        }}>
          {messages.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#64748b',
              marginTop: '2rem'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Ask me anything about your properties</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                Try one of these common queries or type your own question
              </p>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.5rem',
                marginTop: '1.5rem'
              }}>
                {predefinedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubmit(query)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem',
                      fontSize: '0.75rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f1f5f9';
                      e.target.style.borderColor = '#cbd5e1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatBubble key={index} message={message} />
              ))}
              
              {isLoading && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '1rem',
                    background: '#f1f5f9',
                    border: '1px solid '#e2e8f0',
                    color: '#64748b',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.25rem'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#64748b',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#64748b',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out',
                        animationDelay: '0.1s'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#64748b',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out',
                        animationDelay: '0.2s'
                      }}></div>
                    </div>
                    Analyzing your properties...
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input area */}
        <div style={{ 
          padding: '1rem',
          borderTop: '1px solid #e2e8f0',
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ask about your properties..."
              style={{
                flex: 1,
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={isLoading || !input.trim()}
              style={{
                background: isLoading || !input.trim() ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-4px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </>
  );
};

export default AIChatInterface;