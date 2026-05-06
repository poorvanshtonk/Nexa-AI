import React from 'react';
import '../styles/ChatMessage.css';

interface ChatMessageProps {
  sender: 'user' | 'nexa';
  text: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  text,
  timestamp,
}) => {
  return (
    <div className={`message ${sender}`}>
      <div className="message-avatar">
        {sender === 'nexa' ? 'N' : 'U'}
      </div>

      <div className="message-body">
        <p>{text}</p>

        <span className="message-time">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;