import React, { useState } from 'react';

const SimpleChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle = {
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
    fontSize: '1.25rem'
  };

  if (!isOpen) {
    return (
      <button style={buttonStyle} onClick={() => setIsOpen(true)}>
        🤖
      </button>
    );
  }

  return (
    <button style={buttonStyle} onClick={() => setIsOpen(false)}>
      ✕
    </button>
  );
};

export default SimpleChat;
