import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';

const AIChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await simulateAIResponse(inputMessage);
      const aiMessage = { 
        text: response, 
        sender: 'ai', 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'ai', 
        timestamp: new Date(),
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = {
      greeting: "Hello! I'm your Tenant AI assistant. How can I help you with your rental questions today?",
      rent: "For rent-related inquiries, you can check your tenant portal or contact your property manager directly.",
      maintenance: "For maintenance requests, please use the maintenance request form in your tenant portal.",
      default: "I understand you're asking about: \"" + message + "\". As your AI assistant, I can help with general rental questions, but for specific account details, please check your tenant portal or contact support."
    };

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) return responses.greeting;
    if (lowerMessage.includes('rent')) return responses.rent;
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('repair')) return responses.maintenance;
    return responses.default;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Styles
  const styles = {
    chatInterface: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '600px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    chatHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    chatTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    chatTitleH2: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 600
    },
    chatStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '14px'
    },
    statusIndicator: {
      width: '8px',
      height: '8px',
      background: '#4ade80',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      background: '#f8fafc'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#64748b'
    },
    emptyIcon: {
      marginBottom: '16px',
      color: '#cbd5e1'
    },
    emptyStateH3: {
      margin: '0 0 8px 0',
      color: '#334155'
    },
    emptyStateP: {
      margin: 0,
      fontSize: '14px'
    },
    message: {
      display: 'flex',
      marginBottom: '16px',
      gap: '8px'
    },
    messageUser: {
      flexDirection: 'row-reverse'
    },
    messageAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    messageAvatarAi: {
      background: '#e2e8f0',
      color: '#475569'
    },
    messageAvatarUser: {
      background: '#667eea',
      color: 'white'
    },
    messageContent: {
      maxWidth: '70%'
    },
    messageContentUser: {
      textAlign: 'right'
    },
    messageText: {
      padding: '12px 16px',
      borderRadius: '16px',
      fontSize: '14px',
      lineHeight: 1.4,
      wordWrap: 'break-word'
    },
    messageTextAi: {
      background: 'white',
      color: '#334155',
      border: '1px solid #e2e8f0',
      borderBottomLeftRadius: '4px'
    },
    messageTextUser: {
      background: '#667eea',
      color: 'white',
      borderBottomRightRadius: '4px'
    },
    messageTextError: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    messageTime: {
      fontSize: '11px',
      color: '#94a3b8',
      marginTop: '4px',
      padding: '0 4px'
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      borderBottomLeftRadius: '4px',
      color: '#64748b',
      fontSize: '14px'
    },
    inputContainer: {
      padding: '16px 20px',
      background: 'white',
      borderTop: '1px solid #e2e8f0'
    },
    inputWrapper: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-end'
    },
    textarea: {
      flex: 1,
      border: '1px solid #d1d5db',
      borderRadius: '20px',
      padding: '12px 16px',
      fontSize: '14px',
      resize: 'none',
      maxHeight: '120px',
      outline: 'none',
      transition: 'border-color 0.2s',
      fontFamily: 'inherit'
    },
    textareaFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    textareaDisabled: {
      backgroundColor: '#f8fafc',
      cursor: 'not-allowed'
    },
    sendButton: {
      width: '44px',
      height: '44px',
      border: 'none',
      borderRadius: '50%',
      background: '#667eea',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      flexShrink: 0
    },
    sendButtonHover: {
      background: '#5a6fd8',
      transform: 'scale(1.05)'
    },
    sendButtonDisabled: {
      background: '#cbd5e1',
      cursor: 'not-allowed',
      transform: 'none'
    },
    inputHint: {
      fontSize: '11px',
      color: '#94a3b8',
      textAlign: 'center',
      marginTop: '8px'
    },
    spinner: {
      animation: 'spin 1s linear infinite'
    }
  };

  // CSS as string for keyframes
  const keyframesStyle = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  const getTextareaStyle = () => {
    let style = { ...styles.textarea };
    if (isLoading) style = { ...style, ...styles.textareaDisabled };
    return style;
  };

  const getSendButtonStyle = () => {
    let style = { ...styles.sendButton };
    if (!inputMessage.trim() || isLoading) {
      style = { ...style, ...styles.sendButtonDisabled };
    }
    return style;
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={styles.chatInterface}>
        {/* Chat Header */}
        <div style={styles.chatHeader}>
          <div style={styles.chatTitle}>
            <Bot size={20} />
            <h2 style={styles.chatTitleH2}>Tenant AI Assistant</h2>
          </div>
          <div style={styles.chatStatus}>
            <div style={styles.statusIndicator}></div>
            <span>Online</span>
          </div>
        </div>

        {/* Messages Container */}
        <div style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div style={styles.emptyState}>
              <Bot size={48} style={styles.emptyIcon} />
              <h3 style={styles.emptyStateH3}>Welcome to Tenant AI</h3>
              <p style={styles.emptyStateP}>Ask me anything about your rental, maintenance, or tenant rights!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(message.sender === 'user' ? styles.messageUser : {})
                }}
              >
                <div style={{
                  ...styles.messageAvatar,
                  ...(message.sender === 'ai' ? styles.messageAvatarAi : styles.messageAvatarUser)
                }}>
                  {message.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div style={{
                  ...styles.messageContent,
                  ...(message.sender === 'user' ? styles.messageContentUser : {})
                }}>
                  <div style={{
                    ...styles.messageText,
                    ...(message.sender === 'ai' ? styles.messageTextAi : styles.messageTextUser),
                    ...(message.isError ? styles.messageTextError : {})
                  }}>
                    {message.text}
                  </div>
                  <div style={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div style={styles.message}>
              <div style={{...styles.messageAvatar, ...styles.messageAvatarAi}}>
                <Bot size={16} />
              </div>
              <div style={styles.messageContent}>
                <div style={styles.typingIndicator}>
                  <Loader2 size={16} style={styles.spinner} />
                  <span>AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              rows="1"
              disabled={isLoading}
              style={getTextareaStyle()}
              onFocus={(e) => {
                e.target.style.borderColor = styles.textareaFocus.borderColor;
                e.target.style.boxShadow = styles.textareaFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.textarea.borderColor;
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim() || isLoading}
              style={getSendButtonStyle()}
              onMouseEnter={(e) => {
                if (!(!inputMessage.trim() || isLoading)) {
                  e.target.style.background = styles.sendButtonHover.background;
                  e.target.style.transform = styles.sendButtonHover.transform;
                }
              }}
              onMouseLeave={(e) => {
                if (!(!inputMessage.trim() || isLoading)) {
                  e.target.style.background = styles.sendButton.background;
                  e.target.style.transform = 'none';
                }
              }}
            >
              {isLoading ? <Loader2 size={18} style={styles.spinner} /> : <Send size={18} />}
            </button>
          </div>
          <div style={styles.inputHint}>
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatInterface;