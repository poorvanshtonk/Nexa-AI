import React from 'react';
import '../styles/TypingIndicator.css';

const TypingIndicator: React.FC = () => (
  <div className="message-row nexa-row">
    <div className="message-container nexa-container">
      <div className="message-avatar nexa-avatar" aria-hidden="true">N</div>
      <div className="message-content">
        <span className="message-author">Nexa AI</span>
        <div className="typing-indicator" aria-label="Nexa is typing">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  </div>
);

export default TypingIndicator;
